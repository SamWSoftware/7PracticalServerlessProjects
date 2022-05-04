import type { AWS } from "@serverless/typescript";

const functions: AWS["functions"] = {
  setUrl: {
    handler: "src/functions/setUrl/index.handler",
    events: [
      {
        httpApi: {
          path: "/",
          method: "post",
        },
      },
    ],
  },
  getUrl: {
    handler: "src/functions/getUrl/index.handler",
    events: [
      {
        httpApi: {
          path: "/{code}",
          method: "get",
        },
      },
    ],
  },
};

export default functions;
