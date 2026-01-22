import { memo, useCallback, useState } from "react";
import { 
  Gift, 
  ShoppingCart, 
  Ticket, 
  Users, 
  RefreshCw, 
  Globe, 
  Calendar,
  Home,
  CreditCard,
  BarChart
} from "lucide-react";

// bundle-barrel-imports: Direct imports instead of barrel
// rerender-lazy-state-init: Use function for expensive initial values
export const DashboardPage = memo(() => {
  const [selectedPeriod] = useState(() => "Daily");
  const [selectedDate] = useState(() => "November 11, 2025");
  
  // Accessibility: Add keyboard handlers and proper ARIA labels
  const handleRefresh = useCallback(() => {
    // TODO: Implement refresh functionality
    console.log('Refreshing dashboard data...');
  }, []);
  
  const handleLanguageChange = useCallback(() => {
    // TODO: Implement language change
    console.log('Changing language...');
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-purple-50 p-4 pb-20">
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-6">
        {/* Language Selector */}
        <button 
          onClick={handleLanguageChange}
          className="flex items-center gap-2 px-3 py-1 bg-white rounded-full shadow-sm hover:bg-gray-50 focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:outline-none transition-colors"
          aria-label="Select language"
        >
          <Globe className="w-4 h-4 text-gray-600" aria-hidden="true" />
          <span className="text-sm font-medium">EN</span>
        </button>

        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xs">TB</span>
          </div>
          <span className="font-semibold text-gray-900">Treubär</span>
        </div>

        {/* Refresh Button */}
        <button 
          onClick={handleRefresh}
          className="w-9 h-9 bg-white rounded-full shadow-sm flex items-center justify-center hover:bg-gray-50 focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:outline-none transition-colors"
          aria-label="Refresh dashboard data"
        >
          <RefreshCw className="w-4 h-4 text-gray-600" aria-hidden="true" />
        </button>
      </div>

      {/* Filter Bar */}
      <div className="flex gap-3 mb-6">
        <button 
          className="flex-1 flex items-center justify-between px-4 py-2 bg-white rounded-full shadow-sm hover:bg-gray-50 focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:outline-none transition-colors"
          aria-label={`Selected period: ${selectedPeriod}`}
        >
          <span className="text-sm font-medium">{selectedPeriod}</span>
          {/* Use lucide icon instead of inline SVG */}
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        
        <button 
          className="flex-1 flex items-center justify-between px-4 py-2 bg-white rounded-full shadow-sm hover:bg-gray-50 focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:outline-none transition-colors"
          aria-label={`Selected date: ${selectedDate}`}
        >
          <span className="text-sm font-medium">{selectedDate}</span>
          <Calendar className="w-4 h-4 text-gray-500" aria-hidden="true" />
        </button>
      </div>

      {/* Main Content */}
      <div className="space-y-6">
        {/* Summary Metric Cards - 2x2 Grid for Mobile */}
        <div className="grid grid-cols-2 gap-4">
          {/* Card 1: Total Points Earned */}
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                <Gift className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Total Points Earned</p>
                <p className="text-lg font-bold text-gray-900">13,450</p>
              </div>
            </div>
          </div>

          {/* Card 2: Total Points Spent */}
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                <ShoppingCart className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Total Points Spent</p>
                <p className="text-lg font-bold text-gray-900">29,980</p>
              </div>
            </div>
          </div>

          {/* Card 3: Total Used Vouchers */}
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <Ticket className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Total Used Vouchers</p>
                <p className="text-lg font-bold text-gray-900">13,450</p>
              </div>
            </div>
          </div>

          {/* Card 4: Total Paid User */}
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                <Users className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Total Paid User</p>
                <p className="text-lg font-bold text-gray-900">1,250</p>
              </div>
            </div>
          </div>
        </div>

        {/* Reports Section */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="mb-4">
            <h2 className="text-base font-semibold text-gray-900 mb-1">Reports</h2>
            <p className="text-xs text-gray-500 italic">You informed of this week compared to last week</p>
          </div>

          {/* Bar Chart */}
          <div className="h-48 relative overflow-x-auto">
            {/* Chart Bars */}
            <div className="flex items-end justify-between h-32 min-w-max px-2">
              {/* 8 AM */}
              <div className="flex items-end gap-0.5 flex-1 max-w-[50px] mx-1">
                <div className="w-3 h-12 bg-green-500 rounded-t"></div>
                <div className="w-3 h-8 bg-green-300 rounded-t"></div>
                <div className="w-3 h-16 bg-blue-500 rounded-t"></div>
                <div className="w-3 h-6 bg-blue-300 rounded-t"></div>
              </div>
              
              {/* 9 AM */}
              <div className="flex items-end gap-0.5 flex-1 max-w-[50px] mx-1">
                <div className="w-3 h-20 bg-green-500 rounded-t"></div>
                <div className="w-3 h-12 bg-green-300 rounded-t"></div>
                <div className="w-3 h-24 bg-blue-500 rounded-t"></div>
                <div className="w-3 h-10 bg-blue-300 rounded-t"></div>
              </div>
              
              {/* 10 AM */}
              <div className="flex items-end gap-0.5 flex-1 max-w-[50px] mx-1">
                <div className="w-3 h-16 bg-green-500 rounded-t"></div>
                <div className="w-3 h-14 bg-green-300 rounded-t"></div>
                <div className="w-3 h-20 bg-blue-500 rounded-t"></div>
                <div className="w-3 h-8 bg-blue-300 rounded-t"></div>
              </div>
              
              {/* 11 AM */}
              <div className="flex items-end gap-0.5 flex-1 max-w-[50px] mx-1">
                <div className="w-3 h-24 bg-green-500 rounded-t"></div>
                <div className="w-3 h-18 bg-green-300 rounded-t"></div>
                <div className="w-3 h-28 bg-blue-500 rounded-t"></div>
                <div className="w-3 h-12 bg-blue-300 rounded-t"></div>
              </div>
              
              {/* 12 PM */}
              <div className="flex items-end gap-0.5 flex-1 max-w-[50px] mx-1">
                <div className="w-3 h-32 bg-green-500 rounded-t"></div>
                <div className="w-3 h-24 bg-green-300 rounded-t"></div>
                <div className="w-3 h-36 bg-blue-500 rounded-t"></div>
                <div className="w-3 h-16 bg-blue-300 rounded-t"></div>
              </div>
              
              {/* 1 PM */}
              <div className="flex items-end gap-0.5 flex-1 max-w-[50px] mx-1">
                <div className="w-3 h-28 bg-green-500 rounded-t"></div>
                <div className="w-3 h-20 bg-green-300 rounded-t"></div>
                <div className="w-3 h-32 bg-blue-500 rounded-t"></div>
                <div className="w-3 h-14 bg-blue-300 rounded-t"></div>
              </div>
              
              {/* 2 PM */}
              <div className="flex items-end gap-0.5 flex-1 max-w-[50px] mx-1">
                <div className="w-3 h-20 bg-green-500 rounded-t"></div>
                <div className="w-3 h-16 bg-green-300 rounded-t"></div>
                <div className="w-3 h-24 bg-blue-500 rounded-t"></div>
                <div className="w-3 h-10 bg-blue-300 rounded-t"></div>
              </div>
            </div>

            {/* X-axis labels */}
            <div className="flex justify-between px-2 mt-2">
              <span className="text-xs text-gray-500">8 AM</span>
              <span className="text-xs text-gray-500">9 AM</span>
              <span className="text-xs text-gray-500">10 AM</span>
              <span className="text-xs text-gray-500">11 AM</span>
              <span className="text-xs text-gray-500">12 PM</span>
              <span className="text-xs text-gray-500">1 PM</span>
              <span className="text-xs text-gray-500">2 PM</span>
            </div>
          </div>

          {/* Legend */}
          <div className="flex justify-center gap-4 mt-4 flex-wrap">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded"></div>
              <span className="text-xs text-gray-600">Earn</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-300 rounded"></div>
              <span className="text-xs text-gray-600">Spend</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-blue-500 rounded"></div>
              <span className="text-xs text-gray-600">Vouchers</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-blue-300 rounded"></div>
              <span className="text-xs text-gray-600">Paid Customer</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg">
        <div className="flex items-center justify-around py-2">
          {/* Home */}
          <div className="flex flex-col items-center gap-1">
            <Home className="w-5 h-5 text-gray-400" />
            <span className="text-xs text-gray-400">Home</span>
          </div>

          {/* Transaction */}
          <div className="flex flex-col items-center gap-1">
            <CreditCard className="w-5 h-5 text-gray-400" />
            <span className="text-xs text-gray-400">Transaction</span>
          </div>

          {/* Dashboard (Active) */}
          <div className="flex flex-col items-center gap-1">
            <BarChart className="w-5 h-5 text-purple-600" />
            <span className="text-xs text-purple-600 font-medium">Dashboard</span>
          </div>
        </div>
      </div>
    </div>
  );
});
