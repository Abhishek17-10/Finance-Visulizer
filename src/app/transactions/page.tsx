import { Button } from '@/components/ui/button';
import TransactionList from './components/TransactionList';
import TransactionForm from './components/TransactionForm';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Plus } from 'lucide-react';

export default function TransactionsPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Transactions</h1>
        <Sheet>
          <SheetTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Transaction
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Add New Transaction</SheetTitle>
            </SheetHeader>
            <TransactionForm />
          </SheetContent>
        </Sheet>
      </div>
      <TransactionList />
    </div>
  );
}