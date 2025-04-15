export interface IProduct {
  id: number;
  name: string;
  categoryId: number;
  amount: number | null;
  status?: string;
}

export interface ICategory {
  id: number;
  name: string;
  categories?: ICategory[];
  products?: IProduct[];
}
