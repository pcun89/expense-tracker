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
      console.error("Error fetching expenses:", err);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Expense Tracker</h1>

      <ExpenseForm refresh={fetchExpenses} />
      <ExpenseList expenses={expenses} refresh={fetchExpenses} />
      <ExpenseChart expenses={expenses} />
    </div>
  );
}

export default App;