export interface ProductType {
  _id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  image: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}
