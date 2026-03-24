import React, { useState } from "react";
import api from "../api";

const ExpenseList = ({ expenses, refresh }) => {
    const [editingId, setEditingId] = useState(null);
    const [editData, setEditData] = useState({});
    const [loadingId, setLoadingId] = useState(null);
    const [toast, setToast] = useState("");

    // 🔥 Show toast
    const showToast = (message) => {
        setToast(message);
        setTimeout(() => setToast(""), 2000);
    };

    // 🗑 Delete (Optimistic)
    const handleDelete = async (id) => {
        try {
            setLoadingId(id);

            // Optimistic UI
            const updated = expenses.filter(e => e.id !== id);
            refresh(updated);

            await api.delete(`/expense/${id}`);
            showToast("Deleted successfully");
        } catch (err) {
            console.error(err);
        } finally {
            setLoadingId(null);
        }
    };

    // ✏️ Start editing
    const handleEdit = (expense) => {
        setEditingId(expense.id);
        setEditData({
            category: expense.category,
            description: expense.description,
            amount: expense.amount,
            date: expense.date.split("T")[0],
        });
    };

    // 💾 Save (Optimistic + Loading + Toast)
    const handleSave = async (id) => {
        try {
            setLoadingId(id);

            const updatedExpense = {
                id,
                ...editData,
                amount: Number(editData.amount),
                date: new Date(editData.date).toISOString(),
            };

            // 🔥 Optimistic UI update
            const updatedList = expenses.map(e =>
                e.id === id ? updatedExpense : e
            );
            refresh(updatedList);

            await api.put(`/expense/${id}`, updatedExpense);

            setEditingId(null);
            showToast("Updated successfully");
        } catch (err) {
            console.error("Update failed:", err);
            showToast("Update failed");
        } finally {
            setLoadingId(null);
        }
    };

    const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);

    return (
        <div>
            <h2>Expenses</h2>

            {/* 🔥 Toast */}
            {toast && (
                <div style={{
                    background: "#4CAF50",
                    color: "white",
                    padding: "10px",
                    borderRadius: "8px",
                    marginBottom: "10px",
                    textAlign: "center"
                }}>
                    {toast}
                </div>
            )}

            <ul style={{ listStyle: "none", padding: 0 }}>
                {expenses.map(exp => (
                    <li key={exp.id} className="card" style={{ padding: "10px", marginBottom: "10px" }}>

                        {editingId === exp.id ? (
                            <div>
                                <input
                                    value={editData.category}
                                    onChange={(e) => setEditData({ ...editData, category: e.target.value })}
                                />
                                <input
                                    value={editData.description}
                                    onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                                />
                                <input
                                    type="number"
                                    value={editData.amount}
                                    onChange={(e) => setEditData({ ...editData, amount: e.target.value })}
                                />
                                <input
                                    type="date"
                                    value={editData.date}
                                    onChange={(e) => setEditData({ ...editData, date: e.target.value })}
                                />

                                <button
                                    className="btn-primary"
                                    onClick={() => handleSave(exp.id)}
                                    disabled={loadingId === exp.id}
                                >
                                    {loadingId === exp.id ? "Saving..." : "Save"}
                                </button>

                                <button onClick={() => setEditingId(null)}>Cancel</button>
                            </div>
                        ) : (
                            <div style={{ display: "flex", justifyContent: "space-between" }}>

                                <span>
                                    <strong>{exp.category}</strong> - {exp.description} - ${exp.amount} -{" "}
                                    {new Date(exp.date).toLocaleDateString()}
                                </span>

                                <div>
                                    <button
                                        className="btn-edit"
                                        onClick={() => handleEdit(exp)}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="btn-danger"
                                        onClick={() => handleDelete(exp.id)}
                                        disabled={loadingId === exp.id}
                                    >
                                        {loadingId === exp.id ? "Deleting..." : "Delete"}
                                    </button>
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