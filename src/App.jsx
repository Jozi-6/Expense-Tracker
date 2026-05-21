import { useState, useEffect } from 'react'
import jsPDF from 'jspdf'
import { Download, Sun, Moon } from 'lucide-react'
import Dashboard from './components/Dashboard'
import SalesTracker from './components/SalesTracker'
import ExpenseTracker from './components/ExpenseTracker'

function App() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme')
    if (saved) return saved
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })
  const [sales, setSales] = useState(() => {
    const saved = localStorage.getItem('sales')
    return saved ? JSON.parse(saved) : []
  })
  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem('expenses')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('theme', theme)
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  useEffect(() => {
    localStorage.setItem('sales', JSON.stringify(sales))
  }, [sales])

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses))
  }, [expenses])

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark')
  }

  const totalSales = sales.reduce((sum, sale) => sum + sale.amount, 0)
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0)
  const netProfit = totalSales - totalExpenses

  const addSale = (sale) => {
    setSales([...sales, { ...sale, id: Date.now() }])
  }

  const addExpense = (expense) => {
    setExpenses([...expenses, { ...expense, id: Date.now() }])
  }

  const deleteSale = (id) => {
    setSales(sales.filter(sale => sale.id !== id))
  }

  const deleteExpense = (id) => {
    setExpenses(expenses.filter(expense => expense.id !== id))
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount)
  }

  const downloadPDF = () => {
    const doc = new jsPDF()
    
    doc.setFontSize(20)
    doc.text('Financial Report', 20, 20)
    
    doc.setFontSize(12)
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 30)
    
    doc.setFontSize(14)
    doc.text('Summary', 20, 45)
    
    doc.setFontSize(12)
    doc.text(`Total Sales: ${formatCurrency(totalSales)}`, 20, 55)
    doc.text(`Total Expenses: ${formatCurrency(totalExpenses)}`, 20, 65)
    doc.text(`Net Profit: ${formatCurrency(netProfit)}`, 20, 75)
    
    doc.setFontSize(14)
    doc.text('Sales History', 20, 90)
    
    doc.setFontSize(10)
    let yPosition = 100
    sales.forEach((sale, index) => {
      if (yPosition > 270) {
        doc.addPage()
        yPosition = 20
      }
      doc.text(`${index + 1}. ${sale.date} - ${formatCurrency(sale.amount)} - ${sale.description}`, 20, yPosition)
      yPosition += 10
    })
    
    doc.setFontSize(14)
    doc.text('Expense History', 20, yPosition + 10)
    
    doc.setFontSize(10)
    yPosition += 20
    expenses.forEach((expense, index) => {
      if (yPosition > 270) {
        doc.addPage()
        yPosition = 20
      }
      doc.text(`${index + 1}. ${expense.date} - ${expense.category} - ${formatCurrency(expense.amount)} - ${expense.description}`, 20, yPosition)
      yPosition += 10
    })
    
    doc.save(`financial-report-${new Date().toISOString().split('T')[0]}.pdf`)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Financial Tracker</h1>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-slate-600 transition-colors"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              onClick={downloadPDF}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              <Download className="w-5 h-5" />
              Download PDF
            </button>
          </div>
        </div>

        <Dashboard
          totalSales={totalSales}
          totalExpenses={totalExpenses}
          netProfit={netProfit}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <SalesTracker
            sales={sales}
            onAddSale={addSale}
            onDeleteSale={deleteSale}
          />
          <ExpenseTracker
            expenses={expenses}
            onAddExpense={addExpense}
            onDeleteExpense={deleteExpense}
          />
        </div>
      </div>
    </div>
  )
}

export default App
