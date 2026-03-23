import React, { useState } from "react";
import api from "../api";

const ExpenseForm = ({ refresh }) => {
    const [form, setForm] = useState({
        category: "",
        description: "",
        amount: "",
        date: ""
    });

    const onSubmit = async (e) => {
        e.preventDefault();

        await api.post("/expense", {
            ...form,
            amount: Number(form.amount)
        });

        setForm({ category: "", description: "", amount: "", date: "" });
        refresh();
    };

    return (
        <form onSubmit={onSubmit} style={{ textAlign: "center" }}>
            <h2>Add Expense</h2>

            <input placeholder="Category"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
            />

            <input placeholder="Description"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
            />

            <input type="number" placeholder="Amount"
                value={form.amount}
                onChange={(e) => setForm({ ...form, amount: e.target.value })}
            />

            <input type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
            />

            <br />
            <button className="btn-primary">Add</button>
        </form>
    );
};

export default ExpenseForm;