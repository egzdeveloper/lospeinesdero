export interface Article {
  id: string;
  name: string;
  category: Category;
  uds: number;
  observations?: string;
}

export interface Category {
  name: string;
}
