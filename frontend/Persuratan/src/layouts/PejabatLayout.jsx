import { Outlet } from 'react-router-dom'

function PejabatLayout() {
  return (
    <div className="min-h-screen bg-amber-50 p-6">
      <Outlet />
    </div>
  )
}

export default PejabatLayout