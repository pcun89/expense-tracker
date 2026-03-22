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
            date: expense.date.split("T")[0], // format yyyy-mm-dd
        });
    };

    const handleSave = async (id) => {
        await api.put(`/expense/${id}`, editData);
        setEditingId(null);
        refresh();
    };

    // ====== Add this: calculate total ======
    const total = expenses.reduce((sum, exp) => sum + Number(exp.amount), 0);

    return (
        <div>
            <h2>Expenses</h2>
            <ul style={{ listStyle: "disc", paddingLeft: "20px" }}>
                {expenses.map(exp => (
                    <li key={exp.id} style={{ marginBottom: "10px" }}>
                        {editingId === exp.id ? (
                            <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
                                <input
                                    type="text"
                                    value={editData.category}
                                    onChange={(e) => setEditData({ ...editData, category: e.target.value })}
                                    placeholder="Category"
                                />
                                <input
                                    type="text"
                                    value={editData.description}
                                    onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                                    placeholder="Description"
                                />
                                <input
                                    type="number"
                                    value={editData.amount}
                                    onChange={(e) => setEditData({ ...editData, amount: Number(e.target.value) })}
                                    placeholder="Amount"
                                />
                                <input
                                    type="date"
                                    value={editData.date}
                                    onChange={(e) => setEditData({ ...editData, date: e.target.value })}
                                />
                                <button onClick={() => handleSave(exp.id)}>Save</button>
                                <button onClick={() => setEditingId(null)}>Cancel</button>
                            </div>
                        ) : (
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <span>{exp.category} - {exp.description || ""} - ${Number(exp.amount).toFixed(2)} - {new Date(exp.date).toLocaleDateString()}</span>
                                <div>
                                    <button onClick={() => handleEdit(exp)} style={{ marginRight: "5px" }}>Edit</button>
                                    <button onClick={() => handleDelete(exp.id)}>Delete</button>
                                </div>
                            </div>
                        )}
                    </li>
                ))}
            </ul>

            {/* ====== Display total ====== */}
            <div style={{ marginTop: "15px", fontWeight: "bold", fontSize: "16px" }}>
                Total Expenses: ${total.toFixed(2)}
            </div>
        </div>
    );
};

export default ExpenseList;