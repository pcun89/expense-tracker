import React, { useEffect, useState } from "react";
import api from "./api";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import ExpenseChart from "./components/ExpenseChart";

function App() {
  const [expenses, setExpenses] = useState([]);

  const fetchExpenses = async () => {
    try {
      const res = await api.get("/expense");
      setExpenses(res.data);
    } catch (err) {
      console.error("Failed to fetch expenses:", err);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div style={{ maxWidth: "900px", margin: "auto", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center", color: "#333" }}>Expense Tracker</h1>

      <ExpenseForm refresh={fetchExpenses} />

      <div style={{ display: "flex", flexDirection: "row", marginTop: "20px", gap: "20px" }}>
        <div style={{ flex: 1 }}>
          <ExpenseList expenses={expenses} refresh={fetchExpenses} />
        </div>
        <div style={{ flex: 1 }}>
          <ExpenseChart expenses={expenses} />
        </div>
      </div>
    </div>
  );
}

export default App;