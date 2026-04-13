export interface Product {
  _id: string;
  name: string;
  price: number;
  images: string[];
  description: string;
  category?: string;
  featured?: boolean;
}
