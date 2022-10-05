import { APIGatewayProxyEvent } from 'aws-lambda';
import { formatJSONResponse } from '@libs/APIResponses';
import Dynamo from '@libs/Dynamo';
import { OrderRecord } from 'src/types/dynamo';
import Authorisation from '@libs/Authorisation';

export const handler = async (event: APIGatewayProxyEvent) => {
  try {
    await Authorisation.apiKeyAuth(event);
  } catch (error) {
    console.log(error);
    return formatJSONResponse({
      statusCode: 401,
      body: { message: 'API Key auth failed' },
    });
  }

  try {
    const ordersTableName = process.env.ordersTable;
    const orderId = event.pathParameters.orderId;
    const order = await Dynamo.get<OrderRecord>({
      pkValue: orderId,
      tableName: ordersTableName,
    });

    if (!order || !order.id) {
      return formatJSONResponse({ statusCode: 404, body: {} });
    }

    const updatedOrder: OrderRecord = {
      ...order,
      status: 'packed',
      dateUpdated: Date.now(),
    };

    await Dynamo.write({
      data: updatedOrder,
      tableName: ordersTableName,
    });

    return formatJSONResponse({ body: { message: 'order packing accepted' } });
  } catch (error) {
    return formatJSONResponse({ statusCode: 500, body: error.message });
  }
};
