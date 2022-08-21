import type { AWS } from '@serverless/typescript';

import functions from './serverless/functions';
import DynamoResources from './serverless/dynamodb';
import CognitoResources from './serverless/cognitoResources';

const serverlessConfiguration: AWS = {
  service: 'chatAppApi',
  frameworkVersion: '3',

  plugins: ['serverless-esbuild'],
  custom: {
    tables: {
      singleTable: '${sls:stage}-${self:service}-single-table',
    },
    profile: {
      dev: 'serverlessUser',
      int: 'int-profile',
      prod: 'prod-profile',
    },

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
      singleTable: '${self:custom.tables.singleTable}',
      region: '${self:provider.region}',
      COGNITO_POOL_ID: { Ref: 'CognitoUserPool' },
    },
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: 'dynamodb:*',
        Resource: [
          'arn:aws:dynamodb:${self:provider.region}:${aws:accountId}:table/${self:custom.tables.singleTable}',
          'arn:aws:dynamodb:${self:provider.region}:${aws:accountId}:table/${self:custom.tables.singleTable}/index/index1',
          'arn:aws:dynamodb:${self:provider.region}:${aws:accountId}:table/${self:custom.tables.singleTable}/index/index2',
        ],
      },
    ],
  },
  functions,

  resources: {
    Resources: {
      ...DynamoResources,
      ...CognitoResources,
    },
    Outputs: {
      DynamoTableName: {
        Value: '${self:custom.tables.singleTable}',
        Export: {
          Name: 'ChatAppDynamoTableName',
        },
      },
      UserPoolId: {
        Value: { Ref: 'CognitoUserPool' },
        Export: {
          Name: 'ChatAppUserPoolId',
        },
      },
    },
  },
};

module.exports = serverlessConfiguration;
