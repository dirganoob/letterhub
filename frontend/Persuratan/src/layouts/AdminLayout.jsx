import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'

function AdminLayout() {
  return (
    <div className="min-h-screen bg-amber-50">
      <Sidebar />
      
      {/* Ganti ml-52 jadi ml-64 karena sidebar lebih lebar */}
      <div className="ml-64">
        <Navbar />
        
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminLayout