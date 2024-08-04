import { PropsWithChildren, createContext, useEffect, useState } from "react";

export interface ITransaction {
    id: string,
    type: string,
    category: string,
    amount: number,
    date: string | Date,
}

export interface IInitialState {
    transactions: ITransaction[] | [],
    deleteTransaction: (id: string) => void,
    addTransaction: (transaction: ITransaction) => void,
}

const initialState = {
    transactions: [],
    deleteTransaction: () => {},
    addTransaction: () => {},
};

export const ExpenseTrackerContext = createContext<IInitialState>(initialState);

export const ContextProvider = ({ children }: PropsWithChildren) => {
    const [transactions, setTransactions] = useState<ITransaction[] | []>(
        // @ts-ignore
        JSON.parse(localStorage.getItem('transactions')) || initialState.transactions
    );

    const deleteTransaction = (id: string | undefined) => {
        if (!id) return;
        const newArray = transactions.filter((tr) => tr.id !== id);
        setTransactions(newArray);
    }

    const addTransaction = (transaction: ITransaction) => {
        setTransactions((prev) => [transaction, ...prev]);
    }

    useEffect(() => {
        localStorage.setItem('transactions', JSON.stringify(transactions));
    }, [transactions])

    return (
        <ExpenseTrackerContext.Provider value={{
            transactions,
            addTransaction,
            deleteTransaction
        }}>
            {children}
        </ExpenseTrackerContext.Provider>
    )
}
