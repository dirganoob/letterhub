import { Outlet } from "react-router-dom";
import SidebarAdmin from "../components/SidebarAdmin";
import Navbar from "../components/Navbar";

const AdminLayout = () => {
    return (
        <div className="min-h-screen bg-[#F0FDF4] flex">
            {/* Sidebar — fixed left, full height */}
            <SidebarAdmin />

            {/* Right area: Navbar (sticky) + scrollable content */}
            <div className="flex-1 flex flex-col min-h-screen">
                {/* Navbar — sticky top, doesn't scroll */}
                <Navbar />

                {/* Scrollable content area */}
                <div className="flex-1 overflow-y-auto">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;