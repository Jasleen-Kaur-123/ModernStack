export type Product = {
  _id: string;
  name: string;
  price: number;
};

export type CartItem = {
  product: Product;
  quantity: number;
};

export type Cart = {
  items: CartItem[];
  totalPrice: number;
};
