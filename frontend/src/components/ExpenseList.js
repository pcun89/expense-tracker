import React, { useState } from "react";
import api from "../api";

const ExpenseList = ({ expenses, refresh }) => {
    const [editingId, setEditingId] = useState(null);
    const [editData, setEditData] = useState({});

    const handleDelete = async (id) => {
        await api.delete(`/expense/${id}`);
        refresh();
    };

    const handleEdit = (expense) => {
        setEditingId(expense.id);
        setEditData({
            category: expense.category,
            description: expense.description,
            amount: expense.amount,
            date: expense.date.split("T")[0],
        });
    };

    const handleSave = async (id) => {
        await api.put(`/expense/${id}`, editData);
        setEditingId(null);
        refresh();
    };

    const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);

    return (
        <div>
            <h2>Expenses</h2>

            <ul style={{ listStyle: "none", padding: 0 }}>
                {expenses.map(exp => (
                    <li key={exp.id} className="card" style={{ padding: "10px" }}>
                        {editingId === exp.id ? (
                            <div>
                                <input value={editData.category}
                                    onChange={(e) => setEditData({ ...editData, category: e.target.value })}
                                />
                                <input value={editData.description}
                                    onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                                />
                                <input type="number" value={editData.amount}
                                    onChange={(e) => setEditData({ ...editData, amount: Number(e.target.value) })}
                                />
                                <input type="date" value={editData.date}
                                    onChange={(e) => setEditData({ ...editData, date: e.target.value })}
                                />

                                <button className="btn-primary" onClick={() => handleSave(exp.id)}>Save</button>
                                <button onClick={() => setEditingId(null)}>Cancel</button>
                            </div>
                        ) : (
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <span>
                                    <strong>{exp.category}</strong> - {exp.description} - ${exp.amount} -{" "}
                                    {new Date(exp.date).toLocaleDateString()}
                                </span>

                                <div>
                                    <button className="btn-edit" onClick={() => handleEdit(exp)}>Edit</button>
                                    <button className="btn-danger" onClick={() => handleDelete(exp.id)}>Delete</button>
                                </div>
                            </div>
                        )}
                    </li>
                ))}
            </ul>

            <div className="total">Total: ${total.toFixed(2)}</div>
        </div>
    );
};

export default ExpenseList;