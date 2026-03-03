import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Search, Bell, X, ChevronRight } from "lucide-react";

const Navbar = ({ userName = "Gilang", profileImage = null }) => {
    const location = useLocation();
    const [searchFocused, setSearchFocused] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [showNotif, setShowNotif] = useState(false);
    const notifRef = useRef(null);

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

    const currentPage = breadcrumbMap[location.pathname] || "Overview";

    useEffect(() => {
        const handler = (e) => {
            if (notifRef.current && !notifRef.current.contains(e.target)) setShowNotif(false);
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const notifications = [
        { text: "Surat #0263 menunggu approval", time: "2 menit lalu", unread: true },
        { text: "Manager B menyetujui surat #0262", time: "15 menit lalu", unread: true },
        { text: "Export PDF #0265 selesai", time: "1 jam lalu", unread: false },
    ];

    return (
        <div className="sticky top-0 z-40 w-full h-16 flex items-center justify-between px-8 bg-white/80 backdrop-blur-md border-b border-emerald-100/60">
            {/* ── Breadcrumb ── */}
            <div className="flex items-center gap-1.5 text-sm">
                <span className="text-gray-400 font-medium">Dashboard</span>
                <ChevronRight size={13} className="text-gray-300" />
                <span className="text-emerald-700 font-bold">{currentPage}</span>
            </div>

            {/* ── Right side ── */}
            <div className="flex items-center gap-3">
                {/* Search */}
                <div className={`relative transition-all duration-300 ${searchFocused ? "w-80" : "w-64"}`}>
                    <Search
                        size={14}
                        className={`absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors ${searchFocused ? "text-emerald-500" : "text-gray-400"
                            }`}
                    />
                    <input
                        type="text"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        onFocus={() => setSearchFocused(true)}
                        onBlur={() => setSearchFocused(false)}
                        placeholder="Cari surat, perihal, tujuan..."
                        className={`w-full rounded-xl pl-9 pr-9 py-2 text-sm text-gray-700 placeholder-gray-400 outline-none transition-all duration-300 ${searchFocused
                            ? "bg-white border-emerald-300 ring-2 ring-emerald-500/10 border"
                            : "bg-[#EDFCF2] border border-transparent hover:bg-emerald-50"
                            }`}
                    />
                    {searchValue && (
                        <button
                            onMouseDown={(e) => { e.preventDefault(); setSearchValue(""); }}
                            className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                        >
                            <X size={9} className="text-gray-500" />
                        </button>
                    )}
                </div>

                {/* Notification */}
                <div className="relative" ref={notifRef}>
                    <button
                        onClick={() => setShowNotif(!showNotif)}
                        className={`relative w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 ${showNotif ? "bg-emerald-50 text-emerald-600" : "bg-gray-50 text-gray-500 hover:bg-gray-100"
                            }`}
                    >
                        <Bell size={17} />
                        <span className="absolute -top-1 -right-1 min-w-[16px] h-[16px] px-1 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center shadow-sm">
                            3
                        </span>
                    </button>

                    {showNotif && (
                        <div className="absolute right-0 top-11 w-72 bg-white rounded-xl shadow-xl shadow-gray-200/50 border border-gray-100 z-50 overflow-hidden">
                            <div className="px-4 py-2.5 border-b border-gray-100 flex items-center justify-between">
                                <p className="text-xs font-bold text-gray-800">Notifikasi</p>
                                <button className="text-[10px] text-emerald-600 font-semibold hover:text-emerald-700">
                                    Tandai dibaca
                                </button>
                            </div>
                            <div className="max-h-56 overflow-y-auto">
                                {notifications.map((n, i) => (
                                    <div key={i} className={`px-4 py-2.5 flex items-start gap-2.5 hover:bg-gray-50 cursor-pointer ${n.unread ? "bg-emerald-50/30" : ""}`}>
                                        {n.unread ? (
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                                        ) : (
                                            <span className="w-1.5 flex-shrink-0" />
                                        )}
                                        <div>
                                            <p className={`text-xs ${n.unread ? "text-gray-800 font-medium" : "text-gray-500"}`}>{n.text}</p>
                                            <p className="text-[10px] text-gray-400 mt-0.5">{n.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="px-4 py-2 border-t border-gray-100 text-center">
                                <button className="text-[11px] text-emerald-600 font-semibold hover:text-emerald-700">
                                    Lihat semua →
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Divider */}
                <div className="w-px h-7 bg-gray-200/80" />

                {/* User Badge */}
                <div className="flex items-center gap-2.5 bg-[#16A34A] text-white pl-3 pr-4 py-1.5 rounded-full cursor-pointer hover:bg-emerald-600 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-white text-[#16A34A] flex items-center justify-center font-bold text-sm overflow-hidden">
                        {profileImage ? (
                            <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                            userName.charAt(0).toUpperCase()
                        )}
                    </div>
                    <span className="font-semibold text-sm">{userName}</span>
                </div>
            </div>
        </div>
    );
};

export default Navbar;