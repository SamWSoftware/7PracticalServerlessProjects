import { AWS } from '@serverless/typescript';

const SecretsConfig: AWS['resources']['Resources'] = {
  warehouseApiKey: {
    Type: 'AWS::SecretsManager::Secret',
    Properties: {
      Description: 'API key needed to call the warehouse',
      Name: 'warehouseApiKey',
      SecretString: '${env:warehouseApiKey}',
    },
  },
  orderpackeApiKeys: {
    Type: 'AWS::SecretsManager::Secret',
    Properties: {
      Description: 'API key passed by the warehouse',
      Name: 'auth-/orderpacked/_orderId_',
      SecretString: '${env:orderpackeApiKeys}',
    },
  },
  deliveryApiKey: {
    Type: 'AWS::SecretsManager::Secret',
    Properties: {
      Description: 'API key passed by the warehouse',
      Name: 'deliveryApiKey',
      SecretString: '${env:deliveryApiKey}',
    },
  },

  orderdeliveredApiKeys: {
    Type: 'AWS::SecretsManager::Secret',
    Properties: {
      Description: 'API key passed by the warehouse',
      Name: 'auth-/orderdelivered/_orderId_',
      SecretString: '${env:orderdeliveredApiKeys}',
    },
  },
};

export default SecretsConfig;
