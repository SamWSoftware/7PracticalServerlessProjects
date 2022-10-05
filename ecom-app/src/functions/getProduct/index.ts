import { APIGatewayProxyEvent } from 'aws-lambda';
import { formatJSONResponse } from '@libs/APIResponses';
import Dynamo from '@libs/Dynamo';
import { ProductsRecord } from 'src/types/dynamo';

export const handler = async (event: APIGatewayProxyEvent) => {
  try {
    const productsTable = process.env.productTable;
    const productId = event.pathParameters.productId;

    const productData = await Dynamo.get<ProductsRecord>({
      pkValue: productId,
      tableName: productsTable,
    });

    const { pk, sk, ...responseData } = productData;

    return formatJSONResponse({ body: responseData });
  } catch (error) {
    console.error(error);
    return formatJSONResponse({ statusCode: 500, body: error.message });
  }
};
