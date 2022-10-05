import { APIGatewayProxyEvent } from 'aws-lambda';
import { formatJSONResponse } from '@libs/APIResponses';
import Dynamo from '@libs/Dynamo';
import { OrderRecord } from 'src/types/dynamo';
import { v4 as uuid } from 'uuid';

export const handler = async (event: APIGatewayProxyEvent) => {
  try {
    const ordersTableName = process.env.ordersTable;
    const order = JSON.parse(event.body);
    const userId = event.requestContext?.authorizer?.claims?.sub;
    const userEmail = event.requestContext?.authorizer?.claims?.email;

    const timestamp = Date.now();
    const fullOrder: OrderRecord = {
      id: uuid(),
      pk: userId,
      sk: `order#${timestamp}`,

      userId,
      userEmail,
      dateCreated: timestamp,
      status: 'placed',
      items: order.items,
    };

    await Dynamo.write({
      data: fullOrder,
      tableName: ordersTableName,
    });

    return formatJSONResponse({ body: { message: 'order placed' } });
  } catch (error) {
    return formatJSONResponse({ statusCode: 500, body: error.message });
  }
};
