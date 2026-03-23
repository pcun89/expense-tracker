import React, { useState } from "react";
import {
    PieChart, Pie, Cell, Tooltip, Legend,
    BarChart, Bar, XAxis, YAxis, CartesianGrid
} from "recharts";

const COLORS = [
    "#0088FE", "#00C49F", "#FFBB28", "#FF8042",
    "#A28EFF", "#FF6F91", "#FF9F40", "#2ECC71"
];

const ExpenseChart = ({ expenses }) => {
    const [chartType, setChartType] = useState("pie");
    const [grouped, setGrouped] = useState(false);
    const [activeIndex, setActiveIndex] = useState(null);

    if (!expenses || expenses.length === 0) {
        return <div style={{ textAlign: "center" }}>No expenses to display</div>;
    }

    // Clean data
    const cleaned = expenses.filter(
        e => e.amount != null && !isNaN(e.amount)
    );

    // Group by category
    let data;
    if (grouped) {
        const map = {};
        cleaned.forEach(e => {
            if (!map[e.category]) map[e.category] = 0;
            map[e.category] += Number(e.amount);
        });

        data = Object.keys(map).map(key => ({
            name: key,
            value: map[key],
        }));
    } else {
        data = cleaned.map(e => ({
            name: `${e.category}${e.description ? " - " + e.description : ""}`,
            value: Number(e.amount),
        }));
    }

    if (data.length === 0) {
        return <div style={{ textAlign: "center" }}>No valid expenses</div>;
    }

    return (
        <div style={{ textAlign: "center" }}>

            {/* 🔥 Controls */}
            <div style={{ marginBottom: "15px" }}>
                <button onClick={() => setChartType("pie")}>Pie</button>
                <button onClick={() => setChartType("bar")}>Bar</button>
                <button onClick={() => setGrouped(!grouped)}>
                    {grouped ? "Ungroup" : "Group by Category"}
                </button>
            </div>

            {/* 🔥 PIE CHART */}
            {chartType === "pie" && (
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <PieChart width={500} height={400}>
                        <Pie
                            data={data}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={130}
                            onMouseEnter={(_, index) => setActiveIndex(index)}
                            onMouseLeave={() => setActiveIndex(null)}
                        >
                            {data.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={COLORS[index % COLORS.length]}
                                    style={{
                                        transform: activeIndex === index ? "scale(1.08)" : "scale(1)",
                                        transformOrigin: "center",
                                        transition: "0.2s"
                                    }}
                                />
                            ))}
                        </Pie>

                        <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
                        <Legend />
                    </PieChart>
                </div>
            )}

            {/* 📊 BAR CHART */}
            {chartType === "bar" && (
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <BarChart width={600} height={400} data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" hide={!grouped} />
                        <YAxis />
                        <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
                        <Bar dataKey="value">
                            {data.map((entry, index) => (
                                <Cell key={index} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Bar>
                    </BarChart>
                </div>
            )}
        </div>
    );
};

export default ExpenseChart;