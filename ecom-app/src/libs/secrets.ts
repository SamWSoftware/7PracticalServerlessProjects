import {
  GetSecretValueCommand,
  GetSecretValueCommandInput,
  SecretsManagerClient,
} from '@aws-sdk/client-secrets-manager';

const client = new SecretsManagerClient({});

const getSecret = async (secretId: string) => {
  const params: GetSecretValueCommandInput = {
    SecretId: secretId,
  };

  const command = new GetSecretValueCommand(params);
  const response = await client.send(command);

  return response.SecretString;
};

const Secrets = {
  getSecret,
};

export default Secrets;
