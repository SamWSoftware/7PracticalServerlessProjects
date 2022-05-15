import type { AWS } from "@serverless/typescript";

const functions: AWS["functions"] = {
  createRoom: {
    handler: "src/functions/createRoom/index.handler",
    events: [
      {
        websocket: {
          route: "createRoom",
        },
      },
    ],
  },
  joinRoom: {
    handler: "src/functions/joinRoom/index.handler",
    events: [
      {
        websocket: {
          route: "joinRoom",
        },
      },
    ],
  },
  message: {
    handler: "src/functions/message/index.handler",
    events: [
      {
        websocket: {
          route: "message",
        },
      },
    ],
  },
  disconnect: {
    handler: "src/functions/disconnect/index.handler",
    events: [
      {
        websocket: {
          route: "$disconnect",
        },
      },
    ],
  },
};

export default functions;
