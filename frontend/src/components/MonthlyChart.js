import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer
} from "recharts";

const MonthlyChart = ({ expenses }) => {
    if (!expenses || expenses.length === 0) {
        return <div style={{ textAlign: "center" }}>No data available</div>;
    }

    // 🔥 GROUP BY MONTH
    const monthlyMap = {};

    expenses.forEach((exp) => {
        if (!exp.date || isNaN(exp.amount)) return;

        const date = new Date(exp.date);
        const key = date.toLocaleString("default", {
            month: "short",
            year: "numeric",
        });

        if (!monthlyMap[key]) {
            monthlyMap[key] = 0;
        }

        monthlyMap[key] += Number(exp.amount);
    });

    // 🔥 CONVERT TO ARRAY
    const data = Object.keys(monthlyMap).map((month) => ({
        month,
        total: monthlyMap[month],
    }));

    return (
        <div>
            <h2 style={{ textAlign: "center" }}>📊 Monthly Spending</h2>

            <ResponsiveContainer width="100%" height={400}>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
                    <Bar dataKey="total" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default MonthlyChart;