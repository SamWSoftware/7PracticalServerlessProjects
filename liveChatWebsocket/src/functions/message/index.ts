import { formatJSONResponse } from "@libs/apiGateway";
import { dynamo } from "@libs/dynamo";
import { websocket } from "@libs/websocket";
import { APIGatewayProxyEvent } from "aws-lambda";
import { UserConnectionRecord } from "src/types/dynamo";
import { v4 as uuid } from "uuid";

export const handler = async (event: APIGatewayProxyEvent) => {
  try {
    const { message } = JSON.parse(event.body);
    const tableName = process.env.roomConnectionTable;

    const { connectionId, domainName, stage } = event.requestContext;

    if (!message) {
      await websocket.send({
        data: {
          message: 'You needs a "message" on message actions',
          type: "err",
        },
        connectionId,
        domainName,
        stage,
      });
      return formatJSONResponse({});
    }

    const existingUser = await dynamo.get<UserConnectionRecord>(
      connectionId,
      tableName
    );

    if (!existingUser) {
      await websocket.send({
        data: {
          message: "You need to create or join a room",
          type: "err",
        },
        connectionId,
        domainName,
        stage,
      });
      return formatJSONResponse({});
    }

    const { roomCode } = existingUser;

    const roomUsers = await dynamo.query<UserConnectionRecord>({
      pkValue: roomCode,
      tableName,
      index: "index1",
    });

    const websocketClient = websocket.createClient({ domainName, stage });

    const messagePromiseArray = roomUsers
      .filter((targetUser) => {
        return targetUser.id !== existingUser.id;
      })
      .map((user) => {
        const { id: connectionId } = user;
        return websocket.send({
          data: {
            message,
            from: existingUser.name,
          },
          connectionId,
          client: websocketClient,
        });
      });

    await Promise.all(messagePromiseArray);

    return formatJSONResponse({});
  } catch (error) {
    console.log("error", error);
    return formatJSONResponse({
      statusCode: 502,
      data: {
        message: error.message,
      },
    });
  }
};
