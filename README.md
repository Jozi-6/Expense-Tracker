# Financial Tracker Web Application

A simple, clean financial tracking web application for business owners to track sales, expenses, and profit.

## Features

- **Daily Sales Tracker**: Input and track daily sales revenue with descriptions
- **Expense Input**: Log expenses with categories, dates, and descriptions
- **Profit Calculator**: Automatic real-time calculation of Net Profit (Total Revenue - Total Expenses)
- **Dashboard**: Visual summary with color-coded metrics cards (green for profit, red for loss)
- **PDF Report Export**: Download comprehensive financial reports as PDF files
- **Local Storage**: Data persists across page refreshes

## Tech Stack

- React 18
- Tailwind CSS
- Vite
- Lucide React (icons)
- jsPDF (PDF generation)

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser to the URL shown in the terminal (typically http://localhost:5173)

## Usage

### Adding Sales
1. Enter the amount in USD
2. Select a date
3. Optionally add a description
4. Click "Add Sale"

### Adding Expenses
1. Enter the amount in USD
2. Select a category (Rent, Utilities, Supplies, etc.)
3. Select a date
4. Optionally add a description
5. Click "Add Expense"

### Downloading Reports
Click the "Download PDF" button in the header to export a comprehensive financial report including:
- Summary of total sales, expenses, and net profit
- Complete sales history with dates and descriptions
- Complete expense history with categories, dates, and descriptions

## Project Structure

```
expense-tracker/
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── src/
    ├── main.jsx
    ├── index.css
    ├── App.jsx
    └── components/
        ├── Dashboard.jsx
        ├── SalesTracker.jsx
        └── ExpenseTracker.jsx
```

## Building for Production

```bash
npm run build
```

The optimized files will be in the `dist` directory.
