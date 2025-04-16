'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useBudget } from '../../../../lib/actions/budget.actions';
import { useTransactions } from '@/lib/actions/transaction.actions';
import { toast } from '@/components/ui/sonner';

export default function BudgetChart() {
  const { budgets } = useBudget();
  const { transactions } = useTransactions({ type: 'expense' });

  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  const budgetData = budgets
    .filter(b => b.month === currentMonth && b.year === currentYear)
    .map(budget => {
      const spent = transactions
        .filter(t => t.category === budget.category)
        .reduce((sum, t) => sum + t.amount, 0);
      
      return {
        name: budget.category,
        budget: budget.amount,
        spent: spent,
        remaining: Math.max(0, budget.amount - spent),
      };
    });

  if (budgetData.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Budget vs Actual</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px] flex items-center justify-center">
          <p className="text-muted-foreground">No budget data available</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Budget vs Actual</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={budgetData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip 
                formatter={(value, name) => [`$${value}`, name === 'budget' ? 'Budget' : name === 'spent' ? 'Spent' : 'Remaining']}
              />
              <Legend />
              <Bar dataKey="budget" name="Budget" fill="#8884d8" />
              <Bar dataKey="spent" name="Spent" fill="#82ca9d" />
              <Bar dataKey="remaining" name="Remaining" fill="#ffc658" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}