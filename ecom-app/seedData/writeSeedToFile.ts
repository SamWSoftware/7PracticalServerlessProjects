import { writeFile } from 'fs/promises';
import seedDataGenerator from './generateProductJson';

const writeSeedToFile = () => {
  const records = seedDataGenerator();

  writeFile('./seedData/products.json', JSON.stringify(records));
};

writeSeedToFile();
