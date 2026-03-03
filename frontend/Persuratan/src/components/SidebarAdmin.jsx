import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { LogOut, Menu, X } from "lucide-react";

const SidebarAdmin = ({ userName = "Gilang", role = "Administrator" }) => {
    const [expanded, setExpanded] = useState(false);

    const menuItems = [
        {
            section: "MENU UTAMA",
            items: [
                { label: "Dashboard", to: "/admin", icon: "/IkonDashboard.png", end: true },
                { label: "Surat Keluar", to: "/admin/outgoing-letter", icon: "/IkonOutgoingLetter.png" },
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
                { label: "Sign Letter", to: "/admin/sign-letter", icon: "/IkonSignLetter.png", badge: 3 },
                { label: "Tracking", to: "/admin/tracking", icon: "/IkonTracking.png" },
            ],
        },
        {
            section: "ARSIP & LAPORAN",
            items: [
                { label: "Arsip Surat", to: "/admin/archive-letter", icon: "/IkonArchiveLetter.png" },
                { label: "Export PDF", to: "/admin/export-pdf", icon: "/IkonExport.png" },
            ],
        },
        {
            section: "ADMIN",
            items: [
                { label: "Kelola User", to: "/admin/user-manage", icon: "/IkonUserManage.png" },
            ],
        },
    ];

    return (
        <div
            className="min-h-screen flex flex-col text-white relative overflow-hidden flex-shrink-0"
            style={{
                width: expanded ? 240 : 72,
                transition: "width 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
        >
            {/* ── Background ── */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#052E16] via-[#053820] to-[#042710]" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[250px] h-[150px] bg-emerald-500/[0.06] rounded-full blur-3xl pointer-events-none" />

            {/* ── Header: Toggle / Logo ── */}
            <div className="relative z-10 flex items-center px-4 h-16 flex-shrink-0">
                {expanded ? (
                    <div className="flex items-center justify-between w-full">
                        <img src="/LogoWebsite.png" alt="LetterHub" className="h-8 object-contain" />
                        <button
                            onClick={() => setExpanded(false)}
                            className="w-7 h-7 rounded-lg bg-white/[0.08] hover:bg-white/[0.15] flex items-center justify-center transition-colors"
                        >
                            <X size={14} className="text-white/60" />
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={() => setExpanded(true)}
                        className="w-10 h-10 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] flex items-center justify-center transition-colors mx-auto"
                    >
                        <Menu size={18} className="text-white/70" />
                    </button>
                )}
            </div>

            {/* Divider */}
            <div className="relative mx-3 h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />

            {/* ── Menu ── */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden pt-4 space-y-4 relative z-10 px-2">
                {menuItems.map((section, index) => (
                    <div key={index}>
                        {expanded && (
                            <p className="text-[10px] text-emerald-400/40 font-bold mb-2 tracking-[0.15em] uppercase pl-3 whitespace-nowrap overflow-hidden">
                                {section.section}
                            </p>
                        )}
                        {!expanded && index > 0 && (
                            <div className="mx-2 mb-2 h-px bg-white/[0.06]" />
                        )}
                        <div className="space-y-1">
                            {section.items.map((item, i) => (
                                <SidebarItem key={i} {...item} expanded={expanded} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* ── Footer User ── */}
            <div className="relative z-10 flex-shrink-0">
                <div className="mx-3 h-px bg-gradient-to-r from-transparent via-emerald-500/15 to-transparent" />
                <div className="p-2">
                    <div
                        className={`flex items-center gap-3 rounded-xl bg-white/[0.05] border border-white/[0.05] hover:bg-white/[0.1] transition-all duration-200 cursor-pointer ${expanded ? "p-2.5" : "p-2 justify-center"
                            }`}
                    >
                        <div className="relative flex-shrink-0">
                            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center font-bold text-xs shadow-lg shadow-emerald-500/20">
                                {userName.charAt(0)}
                            </div>
                            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 border-2 border-[#052E16] rounded-full" />
                        </div>
                        {expanded && (
                            <>
                                <div className="flex-1 min-w-0 overflow-hidden">
                                    <p className="font-semibold text-xs text-white/90 truncate">{userName}</p>
                                    <p className="text-[10px] text-emerald-300/35 font-medium truncate">{role}</p>
                                </div>
                                <LogOut size={14} className="text-white/20 hover:text-white/50 transition-colors flex-shrink-0" />
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

// ── Menu Item ──
const SidebarItem = ({ label, to, icon, end, badge, expanded }) => (
    <NavLink to={to} end={end}>
        {({ isActive }) => (
            <div className="relative group">
                {/* Active bar */}
                <div
                    className={`absolute left-0 top-1/2 -translate-y-1/2 w-[3px] rounded-r-full transition-all duration-300 ${isActive ? "h-5 bg-emerald-400 shadow-md shadow-emerald-400/40" : "h-0"
                        }`}
                />

                <div
                    className={`flex items-center gap-3 rounded-xl transition-all duration-200 relative overflow-hidden
                        ${expanded ? "px-3 py-2.5" : "px-0 py-2.5 justify-center"}
                        ${isActive
                            ? "bg-emerald-500/15 text-white"
                            : "text-white/45 hover:text-white/75 hover:bg-white/[0.05]"
                        }
                    `}
                >
                    {isActive && (
                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-transparent pointer-events-none" />
                    )}

                    <img
                        src={icon}
                        alt={label}
                        className={`w-[18px] h-[18px] flex-shrink-0 relative z-10 transition-all duration-200 ${isActive ? "opacity-100" : "opacity-45 group-hover:opacity-70"
                            }`}
                    />

                    {expanded && (
                        <span className={`text-[13px] font-medium relative z-10 whitespace-nowrap ${isActive ? "font-semibold" : ""}`}>
                            {label}
                        </span>
                    )}

                    {badge && expanded && (
                        <span className="ml-auto relative z-10 min-w-[18px] h-[18px] px-1 rounded-full bg-red-500 text-[9px] font-bold text-white flex items-center justify-center shadow-lg shadow-red-500/30">
                            {badge}
                        </span>
                    )}
                    {badge && !expanded && (
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 shadow-lg shadow-red-500/40 z-20" />
                    )}
                </div>

                {/* Tooltip (collapsed) */}
                {!expanded && (
                    <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-2.5 py-1.5 bg-gray-900 text-white text-xs font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 shadow-xl">
                        {label}
                        {badge && (
                            <span className="ml-1.5 px-1.5 py-0.5 bg-red-500 rounded-full text-[9px] font-bold">{badge}</span>
                        )}
                        <div className="absolute right-full top-1/2 -translate-y-1/2 border-t-4 border-b-4 border-r-4 border-transparent border-r-gray-900" />
                    </div>
                )}
            </div>
        )}
    </NavLink>
);

export default SidebarAdmin;