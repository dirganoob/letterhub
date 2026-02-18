import React from "react";
import { useLocation } from "react-router-dom";
import { Search, Bell } from "lucide-react";

const Navbar = ({
                    userName = "Gilang",
                    profileImage = null
                }) => {
    const location = useLocation();

    const breadcrumbMap = {
        "/admin": "Overview",
        "/admin/outgoing-letter": "Outgoing Letter",
        "/admin/add-letter": "Add Letter",
        "/admin/sign-letter": "Sign Letter",
        "/admin/tracking": "Tracking",
        "/admin/archive-letter": "Archive Letter",
        "/admin/export-pdf": "Export PDF",
        "/admin/user-manage": "User Manage",
    };

    const currentPath = location.pathname;
    const currentPage = breadcrumbMap[currentPath] || "Overview";

    return (
        <div className="w-full bg-white rounded-2xl px-10 py-5 flex items-center justify-between border-2 border-[#D1FAE5]">

            {/* LEFT SIDE - Breadcrumb */}
            <div className="text-sm">
                <span className="text-gray-500 font-medium">
                    Dashboard &gt;
                </span>
                <span className="text-green-900 font-bold ml-1">
                    {currentPage}
                </span>
            </div>

            {/* RIGHT SIDE */}
            <div className="flex items-center gap-5 ">

                {/* Search Bar */}
                <div className="relative w-80 ">
                    <Search
                        size={16}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <input
                        type="text"
                        placeholder="Cari surat, perihal, tujuan..."
                        className="
                            w-full
                            bg-[#EDFCF2]
                            rounded-full
                            pl-10 pr-5 py-2.5
                            text-black
                            outline-none
                            focus:ring-2
                            focus:ring-green-500
                            placeholder-gray-500
                        "
                    />
                </div>

                {/* Notification */}
                <div className="relative cursor-pointer ">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition">
                        <Bell size={18} className="text-gray-600" />
                    </div>

                    {/* Notification Badge */}
                    <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center">
                        3
                    </span>
                </div>

                {/* User Badge */}
                <div className="flex items-center gap-3 bg-[#16A34A] text-white px-4 py-2 rounded-full cursor-pointer hover:opacity-90 transition">

                    {/* Profile Circle */}
                    <div className="w-8 h-8 rounded-full bg-white text-[#16A34A] flex items-center justify-center font-semibold text-sm overflow-hidden">
                        {profileImage ? (
                            <img
                                src={profileImage}
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            userName.charAt(0).toUpperCase()
                        )}
                    </div>

                    {/* Name */}
                    <span className="font-semibold text-sm">
                        {userName}
                    </span>
                </div>

            </div>
        </div>
    );
};

export default Navbar;
