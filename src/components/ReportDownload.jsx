import { Download, Lock, Crown } from 'lucide-react'

function ReportDownload({ userTier, sales, expenses, totalSales, totalExpenses, netProfit }) {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount)
  }

  const downloadCSV = () => {
    const csvContent = [
      ['Financial Report', ''],
      ['Generated on', new Date().toLocaleDateString()],
      [''],
      ['Summary', ''],
      ['Total Sales', formatCurrency(totalSales)],
      ['Total Expenses', formatCurrency(totalExpenses)],
      ['Net Profit', formatCurrency(netProfit)],
      [''],
      ['Sales History', ''],
      ['Date', 'Amount', 'Description'],
      ...sales.map(sale => [
        sale.date,
        sale.amount.toFixed(2),
        sale.description
      ]),
      [''],
      ['Expense History', ''],
      ['Date', 'Category', 'Amount', 'Description'],
      ...expenses.map(expense => [
        expense.date,
        expense.category,
        expense.amount.toFixed(2),
        expense.description
      ])
    ]
      .map(row => row.join(','))
      .join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `financial-report-${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  if (userTier === 'student') {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gray-100 rounded-full">
              <Lock className="w-6 h-6 text-gray-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Download Report</h3>
              <p className="text-sm text-gray-500">Premium feature - Upgrade to Business Tier</p>
            </div>
          </div>
          <button
            disabled
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-400 rounded-lg cursor-not-allowed font-medium"
          >
            <Download className="w-5 h-5" />
            Download CSV
          </button>
        </div>
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start gap-3">
            <Crown className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-blue-900">Upgrade to Business Tier</p>
              <p className="text-sm text-blue-700 mt-1">
                Get access to premium reporting features including CSV exports, detailed analytics, and more.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-green-100 rounded-full">
            <Download className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Download Report</h3>
            <p className="text-sm text-gray-500">Export your financial data as CSV</p>
          </div>
        </div>
        <button
          onClick={downloadCSV}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
        >
          <Download className="w-5 h-5" />
          Download CSV
        </button>
      </div>
      <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
        <div className="flex items-start gap-3">
          <Crown className="w-5 h-5 text-green-600 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-green-900">Business Tier Active</p>
            <p className="text-sm text-green-700 mt-1">
              You have full access to premium reporting features.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReportDownload
