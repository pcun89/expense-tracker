import React, { useState } from "react";
import api from "../api";

function ExpenseForm({ refresh }) {

    const [expense, setExpense] = useState({
        category: "",
        description: "",
        amount: "",
        date: ""
    });

    const handleChange = (e) => {
        setExpense({
            ...expense,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await api.post("/expense", expense);
        refresh();
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="category" placeholder="Category" onChange={handleChange} />
            <input name="description" placeholder="Description" onChange={handleChange} />
            <input name="amount" type="number" onChange={handleChange} />
            <input name="date" type="date" onChange={handleChange} />
            <button>Add Expense</button>
        </form>
    );
}

export default ExpenseForm;
