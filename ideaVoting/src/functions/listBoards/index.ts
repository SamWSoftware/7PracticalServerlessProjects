import { APIGatewayProxyEvent } from 'aws-lambda';
import { formatJSONResponse } from '@libs/APIResponses';
import Dynamo from '@libs/Dynamo';
import { BoardRecord } from 'src/types/dyanmo';

export const handler = async (event: APIGatewayProxyEvent) => {
  try {
    const tableName = process.env.singleTable;

    const boards = await Dynamo.query<BoardRecord>({
      tableName,
      index: 'index1',
      pkKey: 'pk',
      pkValue: 'board',
      limit: 10,
    });

    const responseData = boards
      .map(({ pk, sk, ...rest }) => rest)
      .filter((board) => board.isPublic);

    return formatJSONResponse({ body: responseData });
  } catch (error) {
    return formatJSONResponse({ statusCode: 500, body: error.message });
  }
};
