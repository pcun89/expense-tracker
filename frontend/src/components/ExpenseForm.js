import React, { useState } from "react";
import api from "../api";

const ExpenseForm = ({ refresh }) => {
    const [expense, setExpense] = useState({ category: "", description: "", amount: "", date: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await api.post("/expense", {
            ...expense,
            amount: Number(expense.amount),
        });
        setExpense({ category: "", description: "", amount: "", date: "" });
        refresh();
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "20px" }}>
            <input
                type="text"
                value={expense.category}
                onChange={(e) => setExpense({ ...expense, category: e.target.value })}
                placeholder="Category"
                required
            />
            <input
                type="text"
                value={expense.description}
                onChange={(e) => setExpense({ ...expense, description: e.target.value })}
                placeholder="Description"
            />
            <input
                type="number"
                value={expense.amount}
                onChange={(e) => setExpense({ ...expense, amount: e.target.value })}
                placeholder="Amount"
                required
            />
            <input
                type="date"
                value={expense.date}
                onChange={(e) => setExpense({ ...expense, date: e.target.value })}
                required
            />
            <button type="submit">Add Expense</button>
        </form>
    );
};

export default ExpenseForm;