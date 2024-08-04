import { expenseCategories, incomeCategories, resetCategories } from "../constants/categories"
import { ExpenseTrackerContext } from "../context/context";
import { useContext } from 'react';

export const useTransactions = (title: string) => {
    resetCategories();
    const { transactions } = useContext(ExpenseTrackerContext);
    const transactionsPerType = transactions.filter((tr) => tr.type === title);
    const total = transactionsPerType.reduce((acc, tr) => acc += tr.amount, 0);
    const categories = title === 'Income' ? incomeCategories : expenseCategories;

    transactionsPerType.forEach((tr) => {
        const category = categories.find((cat) => cat.type === tr.category);

        if (category) category.amount += tr.amount;
    })

    const filtered = categories.filter((cat) => cat.amount > 0);

    const chartData = {
        datasets: [{
            data: filtered.map((f) => f.amount),
            backgroundColor: filtered.map((f) => f.color),
        }],
        labels: filtered.map((f) => f.type),
    };

    return { total, chartData };
}
