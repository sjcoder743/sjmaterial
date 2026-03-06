export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  featured: boolean;
  category: string;
  stock: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductQueryResult {
  products: Product[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
