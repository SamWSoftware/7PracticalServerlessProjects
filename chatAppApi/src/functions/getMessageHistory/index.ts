import { formatJSONResponse } from '@libs/APIResponses';
import Dynamo from '@libs/Dynamo';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { MessageRecord } from 'src/types/dynamo';

export const handler = async (event: APIGatewayProxyEvent) => {
  try {
    const tableName = process.env.singleTable;
    const { groupId } = event.pathParameters;
    const { beforedate, startid } = event.queryStringParameters || {};
    const userId = event.requestContext.authorizer?.claims?.sub;
    // querying for old messages on the group
    const messages = await Dynamo.query<MessageRecord>({
      tableName,
      pkValue: groupId,
      skKey: 'sk',
      skBeginsWith: 'message#',
      index: 'index1',
      limit: 20,
      scanForwards: false,
      startFromRecord:
        beforedate && startid
          ? {
              pk: groupId,
              sk: `message#${beforedate}`,
              id: startid,
            }
          : undefined,
    });

    const formattedMessages = messages.map(({ pk, sk, ...rest }) => {
      return {
        ...rest,
        mine: rest.fromId === userId,
        type: 'message',
      };
    });

    return formatJSONResponse({ body: { messages: formattedMessages } });
  } catch (error) {
    console.log(error);
    return formatJSONResponse({ body: { message: error.message }, statusCode: 500 });
  }
};
