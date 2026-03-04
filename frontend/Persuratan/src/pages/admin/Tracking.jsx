import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import SidebarAdmin from "../../components/SidebarAdmin";
import { Search, MapPin, CheckCircle2, Circle, Clock } from "lucide-react";

// ── Sample Data untuk Tracking ──
const sampleTrackingData = {
    "0263": {
        id: "#0263",
        nomor: "0263/HCDC/HK/KALLA-TOYOTA/2025",
        perihal: "Undangan Rapat Q4",
        dibuatOleh: "Gilang — Staff HCDC",
        tanggal: "5 Desember 2025, 09:15 WIB",
        tujuan: "Seluruh Divisi",
        posisi: "Di Meja Manager A — Budi Santoso",
        status: "Pending",
        timeline: [
            { id: 1, title: "Surat Dibuat", desc: "5 Des 2025, 09:15 — Gilang", state: "completed" },
            { id: 2, title: "Dikirim ke Manager A", desc: "5 Des 2025, 09:16 — Sistem otomatis", state: "completed" },
            { id: 3, title: "Menunggu Approval Manager A", desc: "Budi Santoso — belum ditindaklanjuti", state: "current" },
            { id: 4, title: "Approval Direktur", desc: "Hendra Kusuma — menunggu giliran", state: "pending" },
            { id: 5, title: "Surat Disetujui & PDF Generated", desc: "Menunggu proses sebelumnya", state: "pending" },
        ]
    },
    "0262": {
        id: "#0262",
        nomor: "0262/HCDC/HK/KALLA-TOYOTA/2025",
        perihal: "Training Skin Beauty",
        dibuatOleh: "Rani — Tim HC",
        tanggal: "4 Desember 2025, 10:00 WIB",
        tujuan: "Peserta training",
        posisi: "Selesai (Arsip)",
        status: "Disetujui",
        timeline: [
            { id: 1, title: "Surat Dibuat", desc: "4 Des 2025, 10:00 — Rani", state: "completed" },
            { id: 2, title: "Dikirim ke Manager A", desc: "4 Des 2025, 10:05 — Sistem otomatis", state: "completed" },
            { id: 3, title: "Approval Manager A", desc: "4 Des 2025, 13:20 — Budi Santoso (Disetujui)", state: "completed" },
            { id: 4, title: "Approval Direktur", desc: "5 Des 2025, 08:30 — Hendra Kusuma (Disetujui)", state: "completed" },
            { id: 5, title: "Surat Disetujui & PDF Generated", desc: "5 Des 2025, 08:35 — Sistem", state: "completed" },
        ]
    }
};

const Tracking = () => {
    const [searchQuery, setSearchQuery] = useState("0263"); // Default to 0263 for preview
    const [trackedData, setTrackedData] = useState(sampleTrackingData["0263"]);
    const [errorMsg, setErrorMsg] = useState("");

    const handleSearch = (e) => {
        e.preventDefault();
        const id = searchQuery.replace("#", "").trim();
        if (sampleTrackingData[id]) {
            setTrackedData(sampleTrackingData[id]);
            setErrorMsg("");
        } else {
            setTrackedData(null);
            setErrorMsg("Surat tidak ditemukan. Gunakan nomor seperti '0263' atau '0262'.");
        }
    };

    return (
        <div className="flex min-h-screen bg-[#EDFCF2]">
            {/* Sidebar */}
            {/* <SidebarAdmin /> */}

            {/* Main Content */}
            <div className="flex-1 flex flex-col pt-0 w-full overflow-hidden">
                {/* <Navbar /> */}

                <div className="px-8 py-6 relative flex-1 overflow-auto">
                    {/* Background blobs */}
                    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-emerald-200/15 blur-3xl" />
                        <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] rounded-full bg-green-200/10 blur-3xl" />
                    </div>

                    <div className="relative z-10 max-w-6xl mx-auto">

                        {/* ── Header & Search ── */}
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                            <div>
                                <h1 className="text-2xl font-extrabold text-gray-800 tracking-tight">Tracking Surat</h1>
                                <p className="text-sm text-gray-500 mt-1">Lacak posisi & status surat secara real-time</p>
                            </div>

                            {/* Search Box */}
                            <form onSubmit={handleSearch} className="flex items-center gap-2">
                                <div className="relative w-72">
                                    <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Cari ID Surat... (mis: 0263)"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-700 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/10 shadow-sm transition-all"
                                    />
                                </div>
                                <button type="submit" className="bg-[#16A34A] hover:bg-emerald-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-md shadow-emerald-500/20">
                                    Cari
                                </button>
                            </form>
                        </div>

                        {errorMsg && (
                            <div className="mb-6 p-4 rounded-xl bg-red-50 text-red-600 border border-red-100 text-sm font-medium">
                                {errorMsg}
                            </div>
                        )}

                        {trackedData && (
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                                {/* ── LEFT PANEL: DETAIL SURAT ── */}
                                <div className="bg-white/90 backdrop-blur-md rounded-2xl border border-green-50 shadow-sm p-6">
                                    <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-5">
                                        <h2 className="text-[15px] font-bold text-gray-800">Detail Surat {trackedData.id}</h2>

                                        {/* Status Badge */}
                                        <div className={`px-3 py-1 rounded-full text-[11px] font-bold inline-flex items-center gap-1.5 ring-1
                                            ${trackedData.status === 'Disetujui' ? 'bg-emerald-50 text-emerald-600 ring-emerald-500/20' :
                                                trackedData.status === 'Pending' ? 'bg-[#FFF9E6] text-[#D97706] ring-[#F59E0B]/20' :
                                                    'bg-gray-50 text-gray-600 ring-gray-500/20'}`}>
                                            <span className={`w-1.5 h-1.5 rounded-full 
                                                ${trackedData.status === 'Disetujui' ? 'bg-emerald-500' :
                                                    trackedData.status === 'Pending' ? 'bg-[#F59E0B]' : 'bg-gray-400'}`} />
                                            {trackedData.status}
                                        </div>
                                    </div>

                                    <div className="space-y-5">
                                        <div>
                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Nomor Surat</p>
                                            <p className="text-[14px] font-medium text-gray-800">{trackedData.nomor}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Perihal</p>
                                            <p className="text-[14px] font-medium text-gray-800">{trackedData.perihal}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Dibuat Oleh</p>
                                            <p className="text-[14px] font-medium text-gray-800">{trackedData.dibuatOleh}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Tanggal</p>
                                            <p className="text-[14px] font-medium text-gray-800">{trackedData.tanggal}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Tujuan</p>
                                            <p className="text-[14px] font-medium text-gray-800">{trackedData.tujuan}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Posisi Saat Ini</p>
                                            <div className="flex items-center gap-2 mt-1">
                                                <MapPin size={16} strokeWidth={2.5} className="text-pink-600" />
                                                <p className="text-[14px] font-bold text-[#16A34A]">{trackedData.posisi}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* ── RIGHT PANEL: TIMELINE STATUS ── */}
                                <div className="bg-white/90 backdrop-blur-md rounded-2xl border border-green-50 shadow-sm p-6">
                                    <div className="border-b border-gray-100 pb-4 mb-6">
                                        <h2 className="text-[15px] font-bold text-gray-800">Timeline Status</h2>
                                    </div>

                                    <div className="relative pl-3">
                                        {/* Activity List */}
                                        <div className="space-y-6 relative">
                                            {trackedData.timeline.map((step, idx) => {
                                                const isLast = idx === trackedData.timeline.length - 1;
                                                const nextStep = trackedData.timeline[idx + 1];

                                                // Determine connection line color based on next step's state
                                                let lineColor = "bg-gray-200";
                                                if (!isLast) {
                                                    if (nextStep.state === "completed" || nextStep.state === "current") {
                                                        lineColor = "bg-emerald-400"; // Solid green line if progressing
                                                    } else if (step.state === "current" && nextStep.state === "pending") {
                                                        lineColor = "bg-[#D97706]/40"; // Orange-ish line connecting current to pending
                                                    } else if (step.state === "pending" && nextStep.state === "pending") {
                                                        lineColor = "bg-[#D97706]/20"; // very light line for pending to pending
                                                    }
                                                }

                                                return (
                                                    <div key={idx} className="relative flex items-start gap-4">
                                                        {/* Line connecting nodes */}
                                                        {!isLast && (
                                                            <div className={`absolute top-6 bottom-0 left-[11px] w-[2px] -mb-6 ${lineColor}`} />
                                                        )}

                                                        {/* Node Icon */}
                                                        <div className="relative z-10 bg-white mt-0.5">
                                                            {step.state === "completed" && (
                                                                <div className="w-6 h-6 rounded-full bg-emerald-500 border-[3px] border-white ring-2 ring-emerald-100 flex items-center justify-center">
                                                                </div>
                                                            )}
                                                            {step.state === "current" && (
                                                                <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center border-2 border-emerald-400 ring-2 ring-emerald-50 shadow-sm">
                                                                    <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full" />
                                                                </div>
                                                            )}
                                                            {step.state === "pending" && (
                                                                <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center border-[2.5px] border-[#D97706] ring-2 ring-orange-50">
                                                                </div>
                                                            )}
                                                        </div>

                                                        {/* Content */}
                                                        <div>
                                                            <h3 className={`text-[14px] font-bold ${step.state === "completed" ? "text-gray-800" :
                                                                step.state === "current" ? "text-gray-800" :
                                                                    "text-gray-500"
                                                                }`}>
                                                                {step.title}
                                                            </h3>
                                                            <p className={`text-[12px] mt-0.5 font-medium ${step.state === "completed" ? "text-gray-400" :
                                                                step.state === "current" ? "text-gray-400" :
                                                                    "text-gray-400"
                                                                }`}>
                                                                {step.desc}
                                                            </p>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>

                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Tracking;