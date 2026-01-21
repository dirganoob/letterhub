import { Search } from 'lucide-react'

function Navbar() {
  return (
    <header className="bg-amber-50 p-6 sticky top-0 z-5 border-b border-amber-100">
      <div className="flex items-center justify-between">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Cari Surat....." 
            className="w-full pl-12 pr-4 py-3 bg-white border-2 border-gray-200 rounded-full focus:outline-none focus:border-green-600 transition-colors"
          />
        </div>
        
        {/* User Profile */}
        <div className="flex items-center gap-3">
          <span className="text-base font-bold text-gray-800">Admin 1</span>
          <div className="w-12 h-12 bg-green-700 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
            A1
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar