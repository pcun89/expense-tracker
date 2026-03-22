import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = [
    "#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28EFF", "#FF6F91",
    "#FF9F40", "#2ECC71", "#DFFF00", "#FF7F50", "#6495ED", "#FF69B4",
    "#BA55D3", "#87CEFA", "#20B2AA", "#FF6347", "#40E0D0", "#FFD700",
];

const ExpenseChart = ({ expenses }) => {
    if (!expenses || expenses.length === 0) return <div>No expenses to display</div>;

    const data = expenses
        .filter(e => e.amount != null && !isNaN(e.amount))
        .map((e, i) => ({
            name: `${e.category} - ${e.description || ""}`,
            value: Number(e.amount),
        }));

    if (data.length === 0) return <div>No valid expenses to display</div>;

    return (
        <PieChart width={500} height={400}>
            <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={120}
                label={({ name }) => name}
            >
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>
            <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
            <Legend />
        </PieChart>
    );
};

export default ExpenseChart;