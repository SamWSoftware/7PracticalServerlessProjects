import { formatJSONResponse } from '@libs/APIResponses';
import Dynamo from '@libs/Dynamo';
import { websocket } from '@libs/Websocket';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { GroupRecord, UserConnectionRecord, UserGroupRecord } from 'src/types/dynamo';
import { v4 as uuid } from 'uuid';

export const handler = async (event: APIGatewayProxyEvent) => {
  try {
    const tableName = process.env.singleTable;

    const { connectionId, domainName, stage } = event.requestContext;

    const { groupName } = JSON.parse(event.body);
    if (!groupName) {
      await websocket.send({
        connectionId,
        domainName,
        stage,
        message: JSON.stringify({
          message: 'Please pass up "groupName" with create group request',
          type: 'err',
        }),
      });
      return formatJSONResponse({ body: {} });
    }

    const { userId, userName } = await Dynamo.get<UserConnectionRecord>({
      pkValue: connectionId,
      tableName,
    });

    const groupId = uuid().slice(0, 8);
    const groupData: GroupRecord = {
      id: groupId,
      ownerId: userId,
      groupName,
    };
    await Dynamo.write({ data: groupData, tableName });

    createUserGroupConection: {
      const data: UserGroupRecord = {
        id: uuid(),
        pk: groupId,
        sk: `user#${userId}`,
        pk2: userId,
        sk2: `group#${groupId}`,

        userId,
        groupId,
        userName,
        groupName,
      };
      await Dynamo.write({ data, tableName });
    }

    await websocket.send({
      connectionId,
      domainName,
      stage,
      message: JSON.stringify({
        message: `You are now conected to group ${groupName}:${groupId}`,
        type: 'info',
      }),
    });

    formatJSONResponse({ body: {} });
  } catch (error) {
    console.log(error);
    return;
  }
};
