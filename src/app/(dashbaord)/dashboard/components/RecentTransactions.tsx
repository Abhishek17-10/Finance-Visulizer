'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useTransactions } from '@/lib/actions/transaction.actions';
import { format } from 'date-fns';
import { CATEGORIES } from '@/constants/categories';
import { toast } from '@/components/ui/sonner';

export default function RecentTransactions() {
  const { transactions } = useTransactions({ type: undefined });

  const recentTransactions = transactions.slice(0, 5);

  if (recentTransactions.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px] flex items-center justify-center">
          <p className="text-muted-foreground">No transactions yet</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentTransactions.map((transaction) => (
              <TableRow key={transaction._id as string}>
                <TableCell className="font-medium">
                  {format(new Date(transaction.date), 'MMM dd, yyyy')}
                </TableCell>
                <TableCell>{transaction.description}</TableCell>
                <TableCell>
                  {CATEGORIES[transaction.category as keyof typeof CATEGORIES]}
                </TableCell>
                <TableCell className={`text-right ${transaction.type === 'expense' ? 'text-red-500' : 'text-green-500'}`}>
                  {transaction.type === 'expense' ? '-' : ''}${transaction.amount.toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}