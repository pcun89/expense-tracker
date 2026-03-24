import React, { useEffect, useState } from "react";
import api from "./api";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import ExpenseChart from "./components/ExpenseChart";
import "./styles.css";

function App() {
  const [expenses, setExpenses] = useState([]);

  const fetchExpenses = async (overrideData = null) => {
    if (overrideData) {
      setExpenses(overrideData);
      return;
    }

    const res = await api.get("/expense");
    setExpenses(res.data);
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div className="container">
      <h1>💰 Expense Tracker</h1>

      <div className="card">
        <ExpenseForm refresh={fetchExpenses} />
      </div>

      <div className="card">
        <ExpenseList expenses={expenses} refresh={fetchExpenses} />
      </div>

      <div className="card">
        <ExpenseChart expenses={expenses} />
      </div>
    </div>
  );
}

export default App;