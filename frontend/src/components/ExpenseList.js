import React from "react";
import api from "../api";

function ExpenseList({ expenses, refresh }) {

    const deleteExpense = async (id) => {
        await api.delete(`/expense/${id}`);
        refresh();
    };

    return (
        <ul>
            {expenses.map(expense => (
                <li key={expense.id}>
                    {expense.category} - ${expense.amount}
                    <button onClick={() => deleteExpense(expense.id)}>Delete</button>
                </li>
            ))}
        </ul>
    );
}

export default ExpenseList;
