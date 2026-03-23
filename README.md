# 💰 Expense Tracker

A full-stack expense tracking application that allows users to track, manage, and visualize personal spending.

## 🚀 Live Demo
https://pcun89.github.io/expense-tracker/

---

## 🧱 Tech Stack

### Frontend
- React
- Axios
- Recharts

### Backend
- .NET 8 Web API
- Entity Framework Core
- SQLite

### Cloud
- Google Cloud Run (Backend)
- GitHub Pages (Frontend)

---

## ✨ Features

- Add, edit, and delete expenses
- Real-time updates
- Pie chart visualization
- Bar chart visualization
- Toggle between:
  - Pie ↔ Bar chart
  - Grouped vs individual expenses
- Interactive hover animations
- Total expense calculation

---

## 📊 Data Structure

- Array of objects:
```js
{
  category: string,
  description: string,
  amount: number,
  date: string
}