import { ProductGroup, ProductsRecord } from '../src/types/dynamo';
import rawProductData from './rawData';

const seedDataGenerator = () => {
  const records: ProductsRecord[] = [];

  Object.entries(rawProductData).map(([group, groupData]) => {
    Object.entries(groupData).map(([category, categoryData]) => {
      Object.entries(categoryData as Record<string, ProductsRecord[]>).map(
        ([subcategory, productArray]) => {
          productArray.map((product) => {
            const fullProductData: ProductsRecord = {
              ...product,
              pk: group as ProductGroup,
              sk: `${category}#${subcategory}#${product.id}`,
            };

            records.push(fullProductData);
          });
        }
      );
    });
  });

  return records;
};

export default seedDataGenerator;
