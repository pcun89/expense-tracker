import React from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

function ExpenseChart({ expenses }) {

    const categoryTotals = {};

    expenses.forEach(exp => {
        categoryTotals[exp.category] =
            (categoryTotals[exp.category] || 0) + exp.amount;
    });

    const data = Object.keys(categoryTotals).map(key => ({
        name: key,
        value: categoryTotals[key]
    }));

    return (
        <PieChart width={400} height={400}>
            <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                outerRadius={150}
                label
            >
                {data.map((entry, index) => (
                    <Cell key={index} />
                ))}
            </Pie>
            <Tooltip />
        </PieChart>
    );
}

export default ExpenseChart;