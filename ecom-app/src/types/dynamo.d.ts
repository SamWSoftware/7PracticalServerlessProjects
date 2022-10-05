type ProductId = string;
export type ProductGroup = 'clothing' | 'climbing' | 'cycling';
type Category = string;
type Subcategory = string;

export interface ProductsRecord {
  id: ProductId;
  pk: ProductGroup;
  sk: `${Category}#${Subcategory}#${ProductId}`;

  title: string;
  description: string;
  colour: string;
  sizesAvailable?: {
    sizeCode: number;
    displayValue: string;
  }[];
}
type Timestamp = number;

export type OrderStatus = 'placed' | 'packed' | 'delivered' | 'error';

export interface OrderRecord {
  id: string;
  pk: string;
  sk: `order#${Timestamp}`;

  userId: string;
  userEmail: string;
  dateCreated: Timestamp;
  dateUpdated?: Timestamp;
  status: OrderStatus;
  items: { id: ProductId; count: number; size?: number }[];
}
