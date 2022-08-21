import { formatJSONResponse } from '@libs/APIResponses';
import Dynamo from '@libs/Dynamo';
import { websocket } from '@libs/Websocket';
import { APIGatewayProxyEvent } from 'aws-lambda';
import {
  GroupRecord,
  JoinGroupRequestRecord,
  UserConnectionRecord,
  UserGroupRecord,
} from 'src/types/dynamo';
import { v4 as uuid } from 'uuid';

export const handler = async (event: APIGatewayProxyEvent) => {
  try {
    const tableName = process.env.singleTable;

    const { connectionId, domainName, stage } = event.requestContext;

    const { groupId } = JSON.parse(event.body);

    if (!groupId) {
      await websocket.send({
        connectionId,
        domainName,
        stage,
        message: JSON.stringify({
          message: 'Please pass up "groupId" with join group request',
          type: 'err',
        }),
      });
      return;
    }

    const userConnection = await Dynamo.get<UserConnectionRecord>({
      pkValue: connectionId,
      tableName,
    });

    const group = await Dynamo.get<GroupRecord>({
      pkValue: groupId,
      tableName,
    });
    if (!group) {
      await websocket.send({
        connectionId,
        domainName,
        stage,
        message: JSON.stringify({
          message: 'invalid groupId',
          type: 'err',
        }),
      });
      return;
    }

    const [userGroupConnection] = await Dynamo.query<UserGroupRecord>({
      tableName,
      index: 'index2',
      pkKey: 'pk2',
      pkValue: userConnection.userId,
      skKey: 'sk2',
      skValue: `group#${groupId}`,
    });
    if (userGroupConnection) {
      await websocket.send({
        connectionId,
        domainName,
        stage,
        message: JSON.stringify({
          message: 'You are already a memeber of this group',
          type: 'err',
        }),
      });
      return;
    }

    const data: JoinGroupRequestRecord = {
      id: uuid(),
      pk: groupId,
      sk: `joinRequest#${userConnection.userId}`,

      userId: userConnection.userId,
      groupId,
      userName: userConnection.userName,
    };
    await Dynamo.write({
      data,
      tableName,
    });

    await websocket.send({
      connectionId,
      domainName,
      stage,
      message: JSON.stringify({
        message: 'Group Request created. The group admin need approve the request',
        type: 'info',
      }),
    });

    formatJSONResponse({ body: {} });
  } catch (error) {
    console.log(error);
    return;
  }
};
