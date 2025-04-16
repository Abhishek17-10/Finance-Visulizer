import mongoose, { Schema, Document } from 'mongoose';
import { CATEGORIES } from '../constants/categories';

export interface IBudget extends Document {
  category: string;
  amount: number;
  month: number;
  year: number;
  createdAt: Date;
  updatedAt: Date;
}

const BudgetSchema: Schema = new Schema(
  {
    category: { type: String, required: true, enum: Object.keys(CATEGORIES) },
    amount: { type: Number, required: true },
    month: { type: Number, required: true, min: 1, max: 12 },
    year: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Budget || mongoose.model<IBudget>('Budget', BudgetSchema);