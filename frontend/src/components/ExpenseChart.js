import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = [
    "#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28EFF", "#FF6F91",
    "#FF9F40", "#2ECC71", "#DFFF00", "#FF7F50", "#6495ED", "#FF69B4",
    "#BA55D3", "#87CEFA", "#20B2AA", "#FF6347", "#40E0D0", "#FFD700",
];

const ExpenseChart = ({ expenses }) => {
    // Handle empty data
    if (!expenses || expenses.length === 0) {
        return <div style={{ textAlign: "center" }}>No expenses to display</div>;
    }

    // Clean + format data safely
    const data = expenses
        .filter(e => e.amount != null && !isNaN(e.amount))
        .map((e, index) => ({
            name: `${e.category}${e.description ? " - " + e.description : ""}`,
            value: Number(e.amount),
        }));

    if (data.length === 0) {
        return <div style={{ textAlign: "center" }}>No valid expenses to display</div>;
    }

    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <PieChart width={500} height={400}>
                <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={130}
                    label={({ name, percent }) =>
                        percent > 0.05 ? `${name}` : "" // hide tiny labels
                    }
                >
                    {data.map((entry, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length] || "#8884d8"}
                        />
                    ))}
                </Pie>

                <Tooltip
                    formatter={(value) =>
                        typeof value === "number"
                            ? `$${value.toFixed(2)}`
                            : `$${Number(value || 0).toFixed(2)}`
                    }
                />

                <Legend />
            </PieChart>
        </div>
    );
};

export default ExpenseChart;