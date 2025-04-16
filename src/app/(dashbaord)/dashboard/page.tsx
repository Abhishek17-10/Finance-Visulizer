import { Card } from '@/components/ui/card';
import SummaryCards from './components/SummaryCards';
import ExpenseChart from './components/ExpenseChart';
import CategoryChart from './components/CategoryChart';
import BudgetChart from './components/BudgetChart';
import RecentTransactions from './components/RecentTransactions';

export default function DashboardPage() {
  return (
    <div className="space-y-4">
      <SummaryCards />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <ExpenseChart />
        </Card>
        <Card className="col-span-3">
          <CategoryChart />
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <BudgetChart />
        </Card>
        <Card className="col-span-3">
          <RecentTransactions />
        </Card>
      </div>
    </div>
  );
}