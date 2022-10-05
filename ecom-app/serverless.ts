import type { AWS } from '@serverless/typescript';

import functions from './serverless/functions';
import DynamoResources from './serverless/dynamodb';
import CognitoResources from './serverless/cognitoResources';
import SecretsConfig from './serverless/secrets';

const serverlessConfiguration: AWS = {
  service: 'ecom-app',
  frameworkVersion: '3',

  useDotenv: true,

  plugins: ['serverless-esbuild', 'serverless-iam-roles-per-function'],
  custom: {
    tables: {
      productTable: '${sls:stage}-${self:service}-product-table',
      ordersTable: '${sls:stage}-${self:service}-orders-table',
    },
    profile: {
      dev: 'serverlessUser',
      int: 'int-serverlessUser',
      prod: 'prod-serverlessUser',
    },
    eventBrigeBusName: 'ordersEventBus',

    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node16',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
  provider: {
    name: 'aws',
    runtime: 'nodejs16.x',
    profile: '${self:custom.profile.${sls:stage}}',
    region: 'eu-central-1',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      productTable: '${self:custom.tables.productTable}',
      ordersTable: '${self:custom.tables.ordersTable}',
      region: '${self:provider.region}',
      eventBrigeBusName: '${self:custom.eventBrigeBusName}',
    },
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: 'dynamodb:*',
        Resource: [
          'arn:aws:dynamodb:${self:provider.region}:${aws:accountId}:table/${self:custom.tables.productTable}',
          'arn:aws:dynamodb:${self:provider.region}:${aws:accountId}:table/${self:custom.tables.productTable}/index/index1',
          'arn:aws:dynamodb:${self:provider.region}:${aws:accountId}:table/${self:custom.tables.ordersTable}',
          'arn:aws:dynamodb:${self:provider.region}:${aws:accountId}:table/${self:custom.tables.ordersTable}/index/index1',
        ],
      },
    ],
  },
  functions,

  resources: {
    Resources: {
      ...DynamoResources,
      ...CognitoResources,
      ...SecretsConfig,
    },
    Outputs: {
      ProductDynamoTableName: {
        Value: '${self:custom.tables.ordersTable}',
        Export: {
          Name: 'ProductDynamoTableName',
        },
      },
      OrderDynamoTableName: {
        Value: '${self:custom.tables.productTable}',
        Export: {
          Name: 'OrdersDynamoTableName',
        },
      },
      UserPoolId: {
        Value: { Ref: 'CognitoUserPool' },
        Export: {
          Name: 'ecom-UserPoolId',
        },
      },
    },
  },
};

module.exports = serverlessConfiguration;
