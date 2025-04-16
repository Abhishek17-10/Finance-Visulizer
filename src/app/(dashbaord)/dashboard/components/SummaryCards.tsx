'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTransactions } from '@/lib/actions/transaction.actions';
import { useBudget } from '@/lib/actions/budget.actions';
import { DollarSign, TrendingUp, TrendingDown, Wallet } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from '@/components/ui/sonner';

export default function SummaryCards() {
  const { transactions } = useTransactions({ type: undefined });
  const { budgets } = useBudget();

  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  // Calculate totals
  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const monthlyBudget = budgets
    .filter(b => b.month === currentMonth && b.year === currentYear)
    .reduce((sum, b) => sum + b.amount, 0);

  const monthlySpent = transactions
    .filter(t => 
      t.type === 'expense' && 
      new Date(t.date).getMonth() + 1 === currentMonth &&
      new Date(t.date).getFullYear() === currentYear
    )
    .reduce((sum, t) => sum + t.amount, 0);

  const budgetRemaining = monthlyBudget - monthlySpent;

  const cards = [
    {
      title: "Total Income",
      value: totalIncome,
      change: "+12% from last month",
      icon: TrendingUp,
      color: "text-green-500",
    },
    {
      title: "Total Expenses",
      value: totalExpenses,
      change: "+5% from last month",
      icon: TrendingDown,
      color: "text-red-500",
    },
    {
      title: "Monthly Budget",
      value: monthlyBudget,
      change: `${format(new Date(), 'MMMM yyyy')}`,
      icon: Wallet,
      color: "text-blue-500",
    },
    {
      title: "Remaining Budget",
      value: budgetRemaining > 0 ? budgetRemaining : 0,
      change: budgetRemaining > 0 
        ? `${((budgetRemaining / monthlyBudget) * 100).toFixed(0)}% remaining` 
        : "Over budget",
      icon: DollarSign,
      color: budgetRemaining > 0 ? "text-green-500" : "text-red-500",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {card.title}
            </CardTitle>
            <card.icon className={`h-4 w-4 ${card.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${card.value.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              {card.change}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}