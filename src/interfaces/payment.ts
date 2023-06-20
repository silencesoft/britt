export interface Payment {
  identifier: string;
  amount: number;
  created_at: string;
  state: string;
  memo: string;
  comment: string;
}
