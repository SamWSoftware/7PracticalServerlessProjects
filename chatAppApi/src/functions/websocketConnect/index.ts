import { formatJSONResponse } from '@libs/APIResponses';
import { websocket } from '@libs/Websocket';
import { APIGatewayProxyEvent } from 'aws-lambda';
import * as Cognito from '@libs/Cognito';
import { UserConnectionRecord } from 'src/types/dynamo';
import Dynamo from '@libs/Dynamo';

export const handler = async (event: APIGatewayProxyEvent) => {
  try {
    const tableName = process.env.singleTable;

    const { connectionId, domainName, stage } = event.requestContext;
    const token = event.queryStringParameters?.token;

    if (!token) {
      return authFailed({ connectionId, domainName, stage });
    }

    const { userName, userId, isValid, error } = await Cognito.verifyToken({
      token,
    });

    if (!isValid || error) {
      console.log(error);
      return authFailed({ connectionId, domainName, stage });
    }

    const data: UserConnectionRecord = {
      id: connectionId,
      pk: `connection#${userId}`,
      sk: connectionId,

      userId,
      userName,
      domainName,
      stage,
    };

    await Dynamo.write({ data, tableName });

    return formatJSONResponse({ body: {} });
  } catch (error) {
    console.log(error);
    return formatJSONResponse({ body: {}, statusCode: 500 });
  }
};

const authFailed = async ({
  connectionId,
  domainName,
  stage,
}: {
  connectionId: string;
  domainName: string;
  stage: string;
}) => {
  await websocket.delete({
    connectionId,
    domainName,
    stage,
  });
  return formatJSONResponse({ body: {}, statusCode: 400 });
};
