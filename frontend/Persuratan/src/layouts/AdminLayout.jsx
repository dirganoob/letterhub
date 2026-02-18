import { Outlet } from "react-router-dom"

const AdminLayout = () => {
    return (
        <div className="min-h-screen bg-[#EDFCF2]">
            <Outlet />
        </div>
    )
}

export default AdminLayout