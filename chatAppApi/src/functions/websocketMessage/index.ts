import { formatJSONResponse } from '@libs/APIResponses';
import Dynamo from '@libs/Dynamo';
import { websocket } from '@libs/Websocket';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { MessageRecord, UserConnectionRecord, UserGroupRecord } from 'src/types/dynamo';
import { v4 as uuid } from 'uuid';

export const handler = async (event: APIGatewayProxyEvent) => {
  try {
    const tableName = process.env.singleTable;

    const { connectionId, domainName, stage } = event.requestContext;
    const { message, groupId } = JSON.parse(event.body);

    if (!message || !groupId) {
      await websocket.send({
        connectionId,
        domainName,
        stage,
        message: JSON.stringify({
          message: '"message" and "groupId" required on messages',
          type: 'err',
        }),
      });
      return;
    }

    const userConnection = await Dynamo.get<UserConnectionRecord>({
      pkValue: connectionId,
      tableName,
    });

    // check the user is part of the group
    const [userGroupConnection] = await Dynamo.query<UserGroupRecord>({
      tableName,
      index: 'index2',
      pkKey: 'pk2',
      pkValue: userConnection.userId,
      skKey: 'sk2',
      skValue: `group#${groupId}`,
    });
    if (!userGroupConnection) {
      await websocket.send({
        connectionId,
        domainName,
        stage,
        message: JSON.stringify({
          message: 'You are not part of this group',
          type: 'err',
        }),
      });
    }
    const dateNow = Date.now();

    const data: MessageRecord = {
      id: uuid(),
      pk: groupId,
      sk: `message#${dateNow}`,

      groupId,
      from: userConnection.userName,
      fromId: userConnection.userId,
      message,
      date: dateNow,
    };
    await Dynamo.write({ data, tableName });

    const groupUsers = await Dynamo.query<UserGroupRecord>({
      pkKey: 'pk',
      pkValue: groupId,
      skKey: 'sk',
      skBeginsWith: 'user#',
      tableName,
      index: 'index1',
    });

    const wsClient = websocket.createClient({ domainName, stage });

    const promiseArray = groupUsers
      .filter((user) => user.userId !== userConnection.userId)
      .map(async (user) => {
        const [destinationUserConnection] = await Dynamo.query<UserConnectionRecord>({
          pkValue: `connection#${user.userId}`,
          index: 'index1',
          tableName,
        });

        await websocket.send({
          connectionId: destinationUserConnection.id,
          wsClient,
          message: JSON.stringify({
            message,
            type: 'message',
            from: userConnection.userName,
            groupId,
            date: dateNow,
          }),
        });
      });

    await Promise.all(promiseArray);

    formatJSONResponse({ body: {} });
  } catch (error) {
    console.log(error);
    return;
  }
};
