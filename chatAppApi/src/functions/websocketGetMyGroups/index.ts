import { formatJSONResponse } from '@libs/APIResponses';
import Dynamo from '@libs/Dynamo';
import { websocket } from '@libs/Websocket';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { UserConnectionRecord, UserGroupRecord } from 'src/types/dynamo';

export const handler = async (event: APIGatewayProxyEvent) => {
  try {
    const tableName = process.env.singleTable;

    const { connectionId, domainName, stage } = event.requestContext;

    const { userId } = await Dynamo.get<UserConnectionRecord>({
      pkValue: connectionId,
      tableName,
    });

    const userGroups = await Dynamo.query<UserGroupRecord>({
      tableName,
      index: 'index2',
      pkKey: 'pk2',
      pkValue: userId,
      skKey: 'sk2',
      skBeginsWith: 'group#',
    });

    const responseData = userGroups.map(({ groupId, groupName }) => ({
      groupId,
      groupName,
    }));

    await websocket.send({
      connectionId,
      domainName,
      stage,
      message: JSON.stringify({
        data: responseData,
        type: 'groupData',
      }),
    });

    formatJSONResponse({ body: {} });
  } catch (error) {
    console.log(error);
    return;
  }
};
