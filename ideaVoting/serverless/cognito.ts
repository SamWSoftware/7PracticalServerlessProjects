import { AWS } from '@serverless/typescript';

const cognitoResources: AWS['resources']['Resources'] = {
  CognitoUserPool: {
    Type: 'AWS::Cognito::UserPool',
    Properties: {
      UserPoolName: '${sls:stage}-${self:service}-user-pool',
      UsernameAttributes: ['email'],
      AutoVerifiedAttributes: ['email'],
    },
  },

  CognitoUserPoolClient: {
    Type: 'AWS::Cognito::UserPoolClient',
    Properties: {
      ClientName: '${sls:stage}-${self:service}-user-pool-client',
      UserPoolId: {
        Ref: 'CognitoUserPool',
      },
      ExplicitAuthFlows: ['ADMIN_NO_SRP_AUTH'],
      GenerateSecret: false,
    },
  },
};

export default cognitoResources;
