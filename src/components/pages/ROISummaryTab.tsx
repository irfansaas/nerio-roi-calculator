import { Download, RefreshCw } from 'lucide-react';
import { Bar } from 'react-chartjs-2';
import { Card } from '../common/Card';
import { formatCurrency, formatPercent } from '../../utils/roiCalculations';

interface ROISummaryTabProps {
  results: any;
  customerName: string;
  setCustomerName: (value: string) => void;
  industry: string;
  setIndustry: (value: string) => void;
  userCount: number;
  setUserCount: (value: number) => void;
  currency: string;
  setCurrency: (value: string) => void;
  exportResults: () => void;
  resetCalculator: () => void;
}

export function ROISummaryTab({
  results,
  customerName,
  setCustomerName,
  industry,
  setIndustry,
  userCount,
  setUserCount,
  currency,
  setCurrency,
  exportResults,
  resetCalculator
}: ROISummaryTabProps) {
  const chartData = {
    labels: ['Current State', 'With Nerdio'],
    datasets: [{
      label: '3-Year Costs',
      data: [results.currentState.total, results.futureState.total],
      backgroundColor: ['#e74c3c', '#27ae60'],
      borderWidth: 0
    }]
  };

  const chartOptions = {
    plugins: {
      legend: { display: false },
      title: { 
        display: true, 
        text: `${formatPercent(results.savings.percentage)} Savings`, 
        font: { size: 18, weight: 'bold' as const }, 
        color: '#2ecc71' 
      }
    },
    scales: { y: { beginAtZero: true } }
  };

  return (
    <div className="space-y-6">
      <Card>
        <h3 className="text-xl font-semibold mb-4">Customer Information</h3>
        <div className="grid md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name</label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
              placeholder="Enter customer name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
            <select
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="">Select Industry</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Financial Services">Financial Services</option>
              <option value="Manufacturing">Manufacturing</option>
              <option value="Education">Education</option>
              <option value="Technology">Technology</option>
              <option value="Government">Government</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">User Count</label>
            <input
              type="number"
              value={userCount}
              onChange={(e) => setUserCount(parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
              min="1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
            </select>
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          <button
            onClick={exportResults}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            Export Results
          </button>
          <button
            onClick={resetCalculator}
            className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Reset
          </button>
        </div>
      </Card>

      <div className="grid md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-red-500 to-red-600 text-white p-6 rounded-lg shadow-lg">
          <h4 className="text-sm font-medium opacity-90">Current State 3-Year Cost</h4>
          <p className="text-2xl font-bold mt-2">{formatCurrency(results.currentState.total, currency)}</p>
          <p className="text-sm opacity-75 mt-1">Traditional Infrastructure</p>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-lg shadow-lg">
          <h4 className="text-sm font-medium opacity-90">Future State 3-Year Cost</h4>
          <p className="text-2xl font-bold mt-2">{formatCurrency(results.futureState.total, currency)}</p>
          <p className="text-sm opacity-75 mt-1">With Nerdio</p>
        </div>
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-lg shadow-lg">
          <h4 className="text-sm font-medium opacity-90">Total 3-Year Savings</h4>
          <p className="text-2xl font-bold mt-2">{formatCurrency(results.savings.total, currency)}</p>
          <p className="text-sm opacity-75 mt-1">{formatPercent(results.savings.percentage)} Reduction</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-lg shadow-lg">
          <h4 className="text-sm font-medium opacity-90">Monthly Savings Average</h4>
          <p className="text-2xl font-bold mt-2">{formatCurrency(results.savings.monthly, currency)}</p>
          <p className="text-sm opacity-75 mt-1">Per Month</p>
        </div>
      </div>

      <Card>
        <h3 className="text-xl font-semibold mb-4">Cost Comparison Chart</h3>
        <div className="h-64">
          <Bar data={chartData} options={chartOptions} />
        </div>
      </Card>

      <Card>
        <h3 className="text-xl font-semibold mb-4">Year-over-Year Comparison</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-2">Metric</th>
                <th className="text-right py-3 px-2">Year 1</th>
                <th className="text-right py-3 px-2">Year 2</th>
                <th className="text-right py-3 px-2">Year 3</th>
                <th className="text-right py-3 px-2 font-bold">3-Year Total</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b hover:bg-gray-50">
                <td className="py-3 px-2 font-medium">Current State Costs</td>
                <td className="text-right py-3 px-2">{formatCurrency(results.currentState.year1, currency)}</td>
                <td className="text-right py-3 px-2">{formatCurrency(results.currentState.year2, currency)}</td>
                <td className="text-right py-3 px-2">{formatCurrency(results.currentState.year3, currency)}</td>
                <td className="text-right py-3 px-2 font-semibold">{formatCurrency(results.currentState.total, currency)}</td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="py-3 px-2 font-medium">Future State Costs</td>
                <td className="text-right py-3 px-2">{formatCurrency(results.futureState.year1, currency)}</td>
                <td className="text-right py-3 px-2">{formatCurrency(results.futureState.year2, currency)}</td>
                <td className="text-right py-3 px-2">{formatCurrency(results.futureState.year3, currency)}</td>
                <td className="text-right py-3 px-2 font-semibold">{formatCurrency(results.futureState.total, currency)}</td>
              </tr>
              <tr className="bg-green-50">
                <td className="py-3 px-2 font-medium text-green-700">Annual Savings</td>
                <td className="text-right py-3 px-2 text-green-700 font-semibold">{formatCurrency(results.savings.year1, currency)}</td>
                <td className="text-right py-3 px-2 text-green-700 font-semibold">{formatCurrency(results.savings.year2, currency)}</td>
                <td className="text-right py-3 px-2 text-green-700 font-semibold">{formatCurrency(results.savings.year3, currency)}</td>
                <td className="text-right py-3 px-2 text-green-700 font-bold">{formatCurrency(results.savings.total, currency)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>

      <div className="grid md:grid-cols-3 gap-4">
        <Card className="text-center">
          <h4 className="font-semibold text-purple-700 mb-2">Payback Period</h4>
          <p className="text-3xl font-bold text-purple-600">{Math.round(results.paybackMonths)} months</p>
          <p className="text-sm text-gray-600 mt-1">Time to recover investment</p>
        </Card>
        <Card className="text-center">
          <h4 className="font-semibold text-purple-700 mb-2">3-Year NPV</h4>
          <p className="text-3xl font-bold text-purple-600">{formatCurrency(results.npv, currency)}</p>
          <p className="text-sm text-gray-600 mt-1">Net Present Value @ 8%</p>
        </Card>
        <Card className="text-center">
          <h4 className="font-semibold text-purple-700 mb-2">3-Year ROI</h4>
          <p className="text-3xl font-bold text-purple-600">{formatPercent(results.roi)}</p>
          <p className="text-sm text-gray-600 mt-1">Return on Investment</p>
        </Card>
      </div>

      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
        <h4 className="font-semibold text-blue-900 mb-2">Executive Summary</h4>
        <p className="text-blue-800">
          By migrating to Nerdio-optimized Azure, {customerName ? ` ${customerName}` : ' your organization'} can achieve a {formatPercent(results.savings.percentage)} reduction in total costs over 3 years, saving {formatCurrency(results.savings.total, currency)} with a payback period of {Math.round(results.paybackMonths)} months.
        </p>
      </div>
    </div>
  );
}
