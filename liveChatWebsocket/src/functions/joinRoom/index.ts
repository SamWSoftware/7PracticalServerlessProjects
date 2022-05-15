import { formatJSONResponse } from "@libs/apiGateway";
import { dynamo } from "@libs/dynamo";
import { websocket } from "@libs/websocket";
import { APIGatewayProxyEvent } from "aws-lambda";
import { UserConnectionRecord } from "src/types/dynamo";
import { v4 as uuid } from "uuid";

export const handler = async (event: APIGatewayProxyEvent) => {
  try {
    const { name, roomCode } = JSON.parse(event.body);
    const tableName = process.env.roomConnectionTable;

    const { connectionId, domainName, stage } = event.requestContext;

    if (!name) {
      await websocket.send({
        data: {
          message: 'You needs a "name" on joinRoom',
          type: "err",
        },
        connectionId,
        domainName,
        stage,
      });
      return formatJSONResponse({});
    }
    if (!roomCode) {
      await websocket.send({
        data: {
          message: 'You needs a "roomCode" on joinRoom',
          type: "err",
        },
        connectionId,
        domainName,
        stage,
      });
      return formatJSONResponse({});
    }

    const roomUsers = await dynamo.query({
      pkValue: roomCode,
      tableName,
      index: "index1",
      limit: 1,
    });

    if (roomUsers.length == 0) {
      await websocket.send({
        data: {
          message: "No room with that code exists. Please create a room",
          type: "err",
        },
        connectionId,
        domainName,
        stage,
      });
      return formatJSONResponse({});
    }

    const data: UserConnectionRecord = {
      id: connectionId,
      pk: roomCode,
      sk: connectionId,

      roomCode,
      name,
      domainName,
      stage,
    };

    await dynamo.write(data, tableName);

    await websocket.send({
      data: {
        message: `You are now connected to room ${roomCode}`,
        type: "info",
      },
      connectionId,
      domainName,
      stage,
    });

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
