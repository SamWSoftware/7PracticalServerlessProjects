import { formatJSONResponse } from '@libs/APIResponses';
import Dynamo from '@libs/Dynamo';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { GroupDetailsResponse } from 'src/types/api';
import { GroupRecord, JoinGroupRequestRecord, UserGroupRecord } from 'src/types/dynamo';

export const handler = async (event: APIGatewayProxyEvent) => {
  try {
    const tableName = process.env.singleTable;
    // get user and the groupId
    const { groupId } = event.pathParameters;
    const userId = event.requestContext.authorizer?.claims?.sub;
    if (!groupId) {
      return formatJSONResponse({
        body: { message: 'missing "groupId' },
        statusCode: 400,
      });
    }

    // check user is part of the group
    const [userGroupConnection] = await Dynamo.query<UserGroupRecord>({
      tableName,
      index: 'index2',
      pkKey: 'pk2',
      pkValue: userId,
      skKey: 'sk2',
      skValue: `group#${groupId}`,
    });
    if (!userGroupConnection) {
      return formatJSONResponse({
        body: { message: 'You are not a member of this group' },
        statusCode: 401,
      });
    }

    // get the group details
    const [groupRecord, groupMembers] = await Promise.all([
      Dynamo.get<GroupRecord>({ pkValue: groupId, tableName }),
      Dynamo.query<UserGroupRecord>({
        tableName,
        index: 'index1',
        pkKey: 'pk',
        pkValue: groupId,
        skKey: 'sk',
        skBeginsWith: `user#`,
      }),
    ]);

    const groupResponse: GroupDetailsResponse = {
      ...groupRecord,
      members: groupMembers.map(({ userId, userName }) => ({ userId, userName })),
    };

    if (groupRecord.ownerId === userId) {
      const joinRequests = await Dynamo.query<JoinGroupRequestRecord>({
        tableName,
        index: 'index1',
        pkValue: groupId,
        skKey: 'sk',
        skBeginsWith: 'joinRequest#',
      });

      groupResponse.joinRequests = joinRequests.map(({ pk, sk, ...rest }) => rest);
    }

    return formatJSONResponse({ body: groupResponse });
  } catch (error) {
    console.log(error);
    return;
  }
};
