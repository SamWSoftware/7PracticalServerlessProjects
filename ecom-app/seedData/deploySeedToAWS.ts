import seedDataGenerator from './generateProductJson';
import { Converter } from 'aws-sdk/clients/dynamodb';
import { fromIni } from '@aws-sdk/credential-providers';
import {
  BatchWriteItemCommand,
  BatchWriteItemCommandInput,
  DynamoDBClient,
} from '@aws-sdk/client-dynamodb';

const saveToDynamo = async ({ data, tableName }: { data: any[]; tableName: string }) => {
  const env = process.env.environment;

  if (!env) {
    throw Error('missing environemnt parameter');
  }

  const profile = {
    dev: 'serverlessUser',
    int: 'int-serverlessUser',
    prod: 'prod-serverlessUser',
  }[env];

  if (!profile) {
    throw Error('incorrect environemnt parameter');
  }

  await batch({
    data,
    tableName,
    profile,
  });
};

const batch = async ({
  data,
  tableName,
  profile,
}: {
  data: any[];
  tableName: string;
  profile: string;
}) => {
  const requestData = data.map((item) => ({
    PutRequest: {
      Item: Converter.marshall(item),
    },
  }));

  const config = {
    convertEmptyValues: true,
    region: 'eu-central-1',
    credential: fromIni({ profile }),
  };
  const dynamodbClient = new DynamoDBClient(config);

  let batchNo = 0;

  while (requestData.length > 0) {
    console.log('requestData.length', requestData.length);
    batchNo += 1;
    console.log({ batchNo });
    const batch = requestData.splice(0, 15);

    const params: BatchWriteItemCommandInput = {
      RequestItems: {
        [tableName]: batch as any[],
      },
    };

    try {
      const batchWriteCommand = new BatchWriteItemCommand(params);
      await dynamodbClient.send(batchWriteCommand);
      console.log('batch done');
    } catch (err) {
      console.log('error', err);
    }
  }

  console.log('all Done!');
  return;
};

const deployToAWS = async () => {
  const records = seedDataGenerator();

  await saveToDynamo({
    data: records,
    tableName: `${process.env.environment}-ecom-app-product-table`,
  });
};

deployToAWS();
