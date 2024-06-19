export interface Transaction {
    _id?: string;
    user_id: string;
    type: string;
    amount: number;
    date: string;
    description: string;
    category: string;
    account: string;
    comments?: string;
  }