export interface IOutgoingCreateBody {
  userId: number;
  userCardId: number;
  purchase_date: Date;
  total_amount: number;
  total_installment_count: number;
  is_paid?: boolean;
  paid_date?: Date;
}