import { APIGatewayProxyEvent } from 'aws-lambda';

export const getUserId = (event: APIGatewayProxyEvent) => {
  return event.requestContext?.authorizer?.claims?.sub || 'unknown';
};
