export interface Iproduct {
  _id?: string;
  name: string;
  categoryId: string;
  description: string;
  price: number;
  picture: number;
}

export interface ICategories {
  _id?: string;
  name?: string;
}
