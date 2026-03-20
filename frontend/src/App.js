import React, { useEffect, useState } from "react";
import api from "./api";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import ExpenseChart from "./components/ExpenseChart";

function App() {

  const [expenses, setExpenses] = useState([]);

  const fetchExpenses = async () => {
    const res = await api.get("/expense");
    setExpenses(res.data);
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div>
      <h1>Expense Tracker</h1>

      <ExpenseForm refresh={fetchExpenses} />

      <ExpenseList expenses={expenses} refresh={fetchExpenses} />

      <ExpenseChart expenses={expenses} />
    </div>
  );
}

export default App;
