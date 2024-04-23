export interface Article {
  id: string;
  name: string;
  category: Category;
  uds: number;
}

export interface Category {
  name: string;
}
