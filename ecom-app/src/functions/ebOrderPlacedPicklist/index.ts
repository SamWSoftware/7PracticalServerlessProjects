import { EventBridgeEvent } from 'aws-lambda';

import Dynamo from '@libs/Dynamo';
import { OrderRecord, ProductsRecord } from 'src/types/dynamo';
import axios from 'axios';
import Secrets from '@libs/secrets';

export const handler = async (event: EventBridgeEvent<'string', OrderRecord>) => {
  try {
    const details = event.detail;

    const authKey = await Secrets.getSecret('warehouseApiKey');

    await axios.post(
      'https://httpstat.us/201',
      {
        ...details,
      },
      {
        headers: {
          authorization: authKey,
        },
      }
    );

    console.log('warehouse API called');

    return;
  } catch (error) {
    console.error(error);
  }
};
