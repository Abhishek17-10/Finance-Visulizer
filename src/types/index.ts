// Base types for the application

// Transaction types
export type TransactionType = 'income' | 'expense';

export interface Transaction {
  _id: string;
  amount: number;
  description: string;
  date: Date;
  category: Category;
  type: TransactionType;
  createdAt: Date;
  updatedAt: Date;
}

export interface TransactionFormValues {
  amount: number;
  description: string;
  date: Date;
  category: Category;
  type: TransactionType;
}

// Budget types
export interface Budget {
  _id: string;
  category: Category;
  amount: number;
  month: number;
  year: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface BudgetFormValues {
  category: Category;
  amount: number;
  month: number;
  year: number;
}

// Category types (from constants)
export type Category = keyof typeof import('@/constants/categories').CATEGORIES;

// Chart data types
export interface MonthlyChartData {
  name: string; // Month-Year (e.g. "Jan 2023")
  income: number;
  expenses: number;
  savings: number;
}

export interface CategoryChartData {
  name: string;
  value: number;
  color?: string;
}

export interface BudgetComparisonData {
  name: string;
  budget: number;
  spent: number;
  remaining: number;
}

// API response types
export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

// Form props
export interface FormProps<T> {
  initialData?: T;
  onSuccess?: () => void;
  onCancel?: () => void;
}

// Dashboard summary types
export interface SummaryCard {
  title: string;
  value: number;
  change: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

// Utility types
export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;
export type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = {
  [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>;
}[Keys];