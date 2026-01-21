import { Link, useLocation } from 'react-router-dom'
import { Home, FileText, FilePlus, FileSignature } from 'lucide-react'

function Sidebar() {
  const location = useLocation()
  
  const isActive = (path) => {
    return location.pathname === path
  }
  
  return (
    <>
      {/* Logo - di luar sidebar, transparan */}
      <div className="fixed left-0 top-0 w-64 p-6 pt-8 z-10">
        <h2 className="text-2xl font-bold">
          <span className="text-gray-800">Letter</span>
          <span className="text-green-600">Hub</span>
        </h2>
      </div>
      
      {/* Sidebar dengan background putih - mulai dari bawah logo */}
      <aside className="fixed left-0 top-32 h-full w-64 bg-white rounded-tl-3xl shadow-xl p-6 z-10">
        {/* Navigation Menu */}
        <nav className="space-y-3">
          <Link 
            to="/admin" 
            className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-200 ${
              isActive('/admin') 
                ? 'bg-teal-800 text-white shadow-lg' 
                : 'text-gray-800 hover:bg-gray-100'
            }`}
          >
            <Home size={24} strokeWidth={2.5} />
            <span className="font-bold text-lg">Dashboard</span>
          </Link>
          
          <Link 
            to="/admin/surat-keluar" 
            className={`relative flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-200 ${
              isActive('/admin/surat-keluar') 
                ? 'bg-teal-800 text-white shadow-lg' 
                : 'text-gray-800 hover:bg-gray-100'
            }`}
          >
            <FileText size={24} strokeWidth={2.5} />
            <span className="font-bold text-lg">Surat Keluar</span>
            {/* Notification Badge */}
            <div className="absolute top-2 left-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
              2
            </div>
          </Link>
          
          <Link 
            to="/admin/add-letter" 
            className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-200 ${
              isActive('/admin/add-letter') 
                ? 'bg-teal-800 text-white shadow-lg' 
                : 'text-gray-800 hover:bg-gray-100'
            }`}
          >
            <FilePlus size={24} strokeWidth={2.5} />
            <span className="font-bold text-lg">Add Letter</span>
          </Link>
          
          <Link 
            to="/admin/sign-letter" 
            className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-200 ${
              isActive('/admin/sign-letter') 
                ? 'bg-teal-800 text-white shadow-lg' 
                : 'text-gray-800 hover:bg-gray-100'
            }`}
          >
            <FileSignature size={24} strokeWidth={2.5} />
            <span className="font-bold text-lg">Sign Letter</span>
          </Link>
        </nav>
      </aside>
    </>
  )
}

export default Sidebar