import {
  ApiGatewayManagementApiClient,
  DeleteConnectionCommand,
  PostToConnectionCommand,
  PostToConnectionCommandInput,
} from '@aws-sdk/client-apigatewaymanagementapi';

export const websocket = {
  createClient: ({ domainName, stage }: { domainName: string; stage: string }) => {
    const endpoint = `https://${domainName}/${stage}`;
    return new ApiGatewayManagementApiClient({
      endpoint,
    });
  },

  send: ({
    connectionId,
    message,
    domainName,
    stage,
    wsClient,
  }: {
    connectionId: string;
    message: any;
    domainName?: string;
    stage?: string;
    wsClient?: ApiGatewayManagementApiClient;
  }) => {
    if (!wsClient) {
      if (!domainName || !stage) {
        throw Error('missing domainName and stage if no wsClient is provided');
      }

      wsClient = websocket.createClient({ domainName, stage });
    }

    const postParams: PostToConnectionCommandInput = {
      Data: message,
      ConnectionId: connectionId,
    };
    const command = new PostToConnectionCommand(postParams);

    return wsClient.send(command);
  },

  delete: async ({
    connectionId,
    domainName,
    stage,
    wsClient,
  }: {
    connectionId: string;
    domainName?: string;
    stage?: string;
    wsClient?: ApiGatewayManagementApiClient;
  }) => {
    if (!wsClient) {
      if (!domainName || !stage) {
        throw Error('missing domainName and stage if no wsClient is provided');
      }

      wsClient = websocket.createClient({ domainName, stage });
    }
    const command = new DeleteConnectionCommand({ ConnectionId: connectionId });

    await wsClient.send(command);
    return;
  },
};
