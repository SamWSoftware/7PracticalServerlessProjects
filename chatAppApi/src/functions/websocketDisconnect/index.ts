import { formatJSONResponse } from '@libs/APIResponses';
import Dynamo from '@libs/Dynamo';
import { APIGatewayProxyEvent } from 'aws-lambda';

export const handler = async (event: APIGatewayProxyEvent) => {
  try {
    const tableName = process.env.singleTable;

    const { connectionId } = event.requestContext;

    await Dynamo.delete({ pkKey: 'id', pkValue: connectionId, tableName });

    formatJSONResponse({ body: {} });
  } catch (error) {
    console.log(error);
    return;
  }
};
