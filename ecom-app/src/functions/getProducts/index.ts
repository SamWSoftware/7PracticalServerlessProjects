import { APIGatewayProxyEvent } from 'aws-lambda';
import { formatJSONResponse } from '@libs/APIResponses';
import Dynamo from '@libs/Dynamo';
import { ProductsRecord } from 'src/types/dynamo';

export const handler = async (event: APIGatewayProxyEvent) => {
  try {
    const productsTable = process.env.productTable;
    const { group, category, subcategory } = event.queryStringParameters || {};
    if (!group) {
      return formatJSONResponse({
        statusCode: 400,
        body: { message: 'missing "group" query string parameter' },
      });
    }

    let sk = undefined;
    if (category) {
      sk = category;
      if (subcategory) {
        sk = `${category}#${subcategory}`;
      }
    }

    console.log(sk);

    const productsResponse = await Dynamo.query<ProductsRecord>({
      tableName: productsTable,
      index: 'index1',
      pkValue: group,
      skBeginsWith: sk,
      skKey: sk ? 'sk' : undefined,
    });

    const productData = productsResponse.map(({ pk, sk, ...rest }) => rest);

    return formatJSONResponse({ body: productData });
  } catch (error) {
    console.error(error);
    return formatJSONResponse({ statusCode: 500, body: error.message });
  }
};
