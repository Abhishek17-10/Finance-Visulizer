import mongoose, { Schema, Document } from 'mongoose';
import { CATEGORIES } from '../constants/categories';

export interface ITransaction extends Document {
  amount: number;
  description: string;
  date: Date;
  category: string;
  type: 'expense' | 'income';
  createdAt: Date;
  updatedAt: Date;
}

const TransactionSchema: Schema = new Schema(
  {
    amount: { type: Number, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true, default: Date.now },
    category: { type: String, required: true, enum: Object.keys(CATEGORIES) },
    type: { type: String, required: true, enum: ['expense', 'income'] },
  },
  { timestamps: true }
);

export default mongoose.models.Transaction || mongoose.model<ITransaction>('Transaction', TransactionSchema);