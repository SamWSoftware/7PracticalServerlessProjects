import seedDataGenerator from './generateProductJson';
import * as AWS from 'aws-sdk';

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
  AWS.config.credentials = new AWS.SharedIniFileCredentials({
    profile,
  });
  const config = {
    region: 'eu-central-1',
    convertEmptyValues: true,
  };

  const documentClient = new AWS.DynamoDB.DocumentClient(config);

  const formattedRecords = data.map((record) => {
    return {
      PutRequest: {
        Item: record,
      },
    };
  });

  try {
    while (formattedRecords.length > 0) {
      const batch = formattedRecords.splice(0, 15);

      const params = {
        RequestItems: {
          [tableName]: batch,
        },
      };

      await documentClient.batchWrite(params).promise();
      console.log('batch written');
      console.log(`remaining items = ${formattedRecords.length}`);
    }

    console.log('all done');
  } catch (error) {
    console.log('error batch writing to AWS');
    console.log(error);
  }
};

const deployToAWS = async () => {
  const records = seedDataGenerator();

  await saveToDynamo({
    data: records,
    tableName: `${process.env.environment}-ecom-app-product-table`,
  });
};

deployToAWS();
