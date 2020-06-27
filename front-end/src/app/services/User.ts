export class User {

    id: number;
    name: string;
    balance: number;
    cost: number;
    stocks: Item [];
}

export class Item {
    symbol: string;
  name: string;
  price: number;
  changes: number;
  cost: number
}

