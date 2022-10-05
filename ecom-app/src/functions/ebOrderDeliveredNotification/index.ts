import { EventBridgeEvent } from 'aws-lambda';

import Dynamo from '@libs/Dynamo';
import { OrderRecord, ProductsRecord } from 'src/types/dynamo';
import SES from '@libs/SES';

export const handler = async (event: EventBridgeEvent<'string', OrderRecord>) => {
  try {
    const productsTable = process.env.productTable;

    const details = event.detail;

    const itemPromises = details.items.map(async (item) => {
      const itemData = await Dynamo.get<ProductsRecord>({
        tableName: productsTable,
        pkValue: item.id,
      });
      return {
        count: item.count,
        title: itemData.title,
        size: itemData.sizesAvailable.find((size) => size.sizeCode == item.size),
      };
    });
    const itemDetails = await Promise.all(itemPromises);

    await SES.sendEmail({
      email: details.userEmail,
      subject: 'Your order has been delivered',
      text: `Your order has been delivered. We hope you enjoy our products.
      
Your order is for 
${itemDetails.map(itemToRow)}

We hope to hear from you soon. Enjoy your adventuring!
`,
    });
    console.log('sent email');
    return;
  } catch (error) {
    console.error(error);
  }
};

const itemToRow = ({
  count,
  title,
  size,
}: {
  count: number;
  title: string;
  size?: { sizeCode: number; displayValue: string };
}) => {
  return `${count} ${title} ${size ? `in size ${size.displayValue}` : null}
`;
};
