import React from "react";
import { NavLink } from "react-router-dom";

const SidebarAdmin = ({ userName = "Gilang", role = "Administrator" }) => {
    const menuItems = [
        {
            section: "MENU UTAMA",
            items: [
                { label: "Dashboard", to: "/admin", icon: "/IkonDashboard.png", end: true },
                { label: "Outgoing Letter", to: "/admin/outgoing-letter", icon: "/IkonOutgoingLetter.png" },
            ],
        },
        {
            section: "BUAT SURAT",
            items: [
                { label: "Add Letter", to: "/admin/add-letter", icon: "/IkonAddLetter.png" },
            ],
        },
        {
            section: "APPROVAL",
            items: [
                { label: "Sign Letter", to: "/admin/sign-letter", icon: "/IkonSignLetter.png" },
                { label: "Tracking", to: "/admin/tracking", icon: "/IkonTracking.png" },
            ],
        },
        {
            section: "ARSIP & LAPORAN",
            items: [
                { label: "Archive Letter", to: "/admin/archive-letter", icon: "/IkonArchiveLetter.png" },
                { label: "Export PDF", to: "/admin/export-pdf", icon: "/IkonExport.png" },
            ],
        },
        {
            section: "ADMIN",
            items: [
                { label: "User Manage", to: "/admin/user-manage", icon: "/IkonUserManage.png" },
            ],
        },
    ];

    return (
        <div className="w-72 min-h-screen bg-[#052E16] flex flex-col text-white">

            {/* Logo */}
            <div className="relative px-6 pt-8 pb-6 flex justify-center">
                <img
                    src="/LogoWebsite.png"
                    alt="Logo Website"
                    className="
            w-50 h-auto object-contain relative top-0 left-0"/>
            </div>

            {/* Menu */}
            <div className="flex-1 overflow-y-auto px-6 space-y-6">

                {menuItems.map((section, index) => (
                    <div key={index}>
                        <p className="text-xs text-gray-400 font-semibold mb-3 tracking-wider">
                            {section.section}
                        </p>

                        <div className="space-y-2">
                            {section.items.map((item, i) => (
                                <SidebarItem key={i} {...item} />
                            ))}
                        </div>
                    </div>
                ))}

            </div>

            {/* Footer User Info */}
            <div className="border-t border-green-900 px-6 py-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#16A34A] flex items-center justify-center font-bold">
                    {userName.charAt(0)}
                </div>
                <div>
                    <p className="font-semibold">{userName}</p>
                    <p className="text-sm text-gray-400">{role}</p>
                </div>
            </div>

        </div>
    );
};

const SidebarItem = ({ label, to, icon, end }) => {
    return (
        <NavLink to={to} end={end}>
            {({ isActive }) => (
                <div
                    className={`group flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200
                    ${isActive 
                    ? "bg-[#16A34A] text-white "
                    : "text-gray-300 hover:bg-[#064E2A]"
                    }`}
                >

                <img
                        src={icon}
                        alt={label}
                        className={`w-5 h-5 transition 
                        ${isActive ? "opacity-100" : "opacity-70"}`}
                    />
                    <span className="text-sm font-medium">
                        {label}
                    </span>
                </div>
            )}
        </NavLink>
    );
};

export default SidebarAdmin;