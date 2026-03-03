import React, { useState } from "react";
import { Eye, Download, Plus, ChevronLeft, ChevronRight, Search } from "lucide-react";

// ── Sample Data ──
const allLetters = [
    { id: 1, nomor: "0262/HCDC/HK/KALLA-TOYOTA/2025", perihal: "Training Skin Beauty", tujuan: "Peserta training", tanggal: "5/12/2025", status: "Disetujui" },
    { id: 2, nomor: "0263/HCDC/HK/KALLA-TOYOTA/2025", perihal: "Undangan Rapat Q4", tujuan: "Seluruh Divisi", tanggal: "5/12/2025", status: "Pending" },
    { id: 3, nomor: "0264/HCDC/HK/KALLA-TOYOTA/2025", perihal: "Surat Tugas Dinas", tujuan: "Andi Prasetya", tanggal: "4/12/2025", status: "Di Manager" },
    { id: 4, nomor: "0265/HCDC/HK/KALLA-TOYOTA/2025", perihal: "Pemberitahuan Cuti", tujuan: "Semua Karyawan", tanggal: "3/12/2025", status: "Disetujui" },
    { id: 5, nomor: "0266/HCDC/HK/KALLA-TOYOTA/2025", perihal: "Permohonan Anggaran IT", tujuan: "Div. Keuangan", tanggal: "2/12/2025", status: "Ditolak" },
    { id: 6, nomor: "0267/HCDC/HK/KALLA-TOYOTA/2025", perihal: "Memo WFH Policy", tujuan: "Seluruh Divisi", tanggal: "1/12/2025", status: "Disetujui" },
    { id: 7, nomor: "0268/HCDC/HK/KALLA-TOYOTA/2025", perihal: "Renovasi Kantor Lt.2", tujuan: "GA Dept", tanggal: "30/11/2025", status: "Pending" },
    { id: 8, nomor: "0269/HCDC/HK/KALLA-TOYOTA/2025", perihal: "Surat Keterangan Kerja", tujuan: "Dimas Aditya", tanggal: "28/11/2025", status: "Disetujui" },
    { id: 9, nomor: "0270/HCDC/HK/KALLA-TOYOTA/2025", perihal: "Pengajuan Lembur", tujuan: "HRD Manager", tanggal: "27/11/2025", status: "Pending" },
    { id: 10, nomor: "0271/HCDC/HK/KALLA-TOYOTA/2025", perihal: "Surat Peringatan", tujuan: "Staff Operasional", tanggal: "26/11/2025", status: "Di Manager" },
    { id: 11, nomor: "0272/HCDC/HK/KALLA-TOYOTA/2025", perihal: "Undangan Workshop", tujuan: "Tim IT", tanggal: "25/11/2025", status: "Draft" },
    { id: 12, nomor: "0273/HCDC/HK/KALLA-TOYOTA/2025", perihal: "Laporan Bulanan", tujuan: "Direktur", tanggal: "24/11/2025", status: "Disetujui" },
];

const ITEMS_PER_PAGE = 8;

const tabs = ["Semua", "Draft", "Pending", "Disetujui", "Ditolak"];

// ── Status Badge ──
const StatusBadge = ({ status }) => {
    const config = {
        Disetujui: { bg: "bg-emerald-50", text: "text-emerald-600", dot: "bg-emerald-500", ring: "ring-emerald-500/20" },
        Pending: { bg: "bg-amber-50", text: "text-amber-600", dot: "bg-amber-500", ring: "ring-amber-500/20" },
        "Di Manager": { bg: "bg-blue-50", text: "text-blue-600", dot: "bg-blue-500", ring: "ring-blue-500/20" },
        Ditolak: { bg: "bg-red-50", text: "text-red-600", dot: "bg-red-500", ring: "ring-red-500/20" },
        Draft: { bg: "bg-gray-50", text: "text-gray-500", dot: "bg-gray-400", ring: "ring-gray-400/20" },
    };
    const c = config[status] || config.Pending;

    return (
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold ring-1 ${c.bg} ${c.text} ${c.ring}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
            {status}
        </span>
    );
};

// ══════════════════════════════
// ── OUTGOING LETTER PAGE ──
// ══════════════════════════════
const OutgoingLetter = () => {
    const [activeTab, setActiveTab] = useState("Semua");
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");

    // Filter by tab
    const filteredByTab = activeTab === "Semua"
        ? allLetters
        : allLetters.filter((l) => l.status === activeTab);

    // Filter by search
    const filtered = filteredByTab.filter((l) =>
        l.nomor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        l.perihal.toLowerCase().includes(searchQuery.toLowerCase()) ||
        l.tujuan.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Pagination
    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
    const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginated = filtered.slice(startIdx, startIdx + ITEMS_PER_PAGE);

    // Reset page when filter changes
    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setCurrentPage(1);
    };

    const canDownload = (status) => status === "Disetujui";

    return (
        <div className="px-8 py-6 relative">
            {/* Background blobs */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-emerald-200/15 blur-3xl" />
                <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] rounded-full bg-green-200/10 blur-3xl" />
            </div>

            <div className="relative z-10">
                {/* ── Header ── */}
                <div className="flex items-start justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-extrabold text-gray-800 tracking-tight">Surat Keluar</h1>
                        <p className="text-sm text-gray-500 mt-0.5">Daftar seluruh surat keluar yang telah dibuat</p>
                    </div>
                    <button className="flex items-center gap-2 bg-[#16A34A] hover:bg-emerald-600 text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30">
                        <Plus size={16} strokeWidth={2.5} />
                        Buat Surat
                    </button>
                </div>

                {/* ── Filter Tabs + Search ── */}
                <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-1 bg-white/60 backdrop-blur-sm border border-white/50 rounded-xl p-1">
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => handleTabChange(tab)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${activeTab === tab
                                    ? "bg-[#16A34A] text-white shadow-md shadow-emerald-500/20"
                                    : "text-gray-500 hover:text-gray-700 hover:bg-white/60"
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {/* Inline search */}
                    <div className="relative w-64">
                        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                            placeholder="Filter surat..."
                            className="w-full pl-9 pr-4 py-2 rounded-xl bg-white/60 border border-white/50 text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-emerald-300 focus:ring-2 focus:ring-emerald-500/10 transition-all"
                        />
                    </div>
                </div>

                {/* ── Table ── */}
                <div className="bg-white/70 backdrop-blur-sm border border-white/60 rounded-2xl shadow-sm overflow-hidden">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-emerald-100/60">
                                <th className="text-left text-[10px] font-bold text-emerald-700 uppercase tracking-wider py-4 pl-6 w-12">No</th>
                                <th className="text-left text-[10px] font-bold text-emerald-700 uppercase tracking-wider py-4">Nomor Surat</th>
                                <th className="text-left text-[10px] font-bold text-emerald-700 uppercase tracking-wider py-4">Perihal</th>
                                <th className="text-left text-[10px] font-bold text-emerald-700 uppercase tracking-wider py-4">Tujuan</th>
                                <th className="text-left text-[10px] font-bold text-emerald-700 uppercase tracking-wider py-4">Tanggal</th>
                                <th className="text-center text-[10px] font-bold text-emerald-700 uppercase tracking-wider py-4">Status</th>
                                <th className="text-center text-[10px] font-bold text-emerald-700 uppercase tracking-wider py-4 pr-6">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginated.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="text-center py-16 text-gray-400 text-sm">
                                        Tidak ada surat ditemukan
                                    </td>
                                </tr>
                            ) : (
                                paginated.map((letter, idx) => (
                                    <tr
                                        key={letter.id}
                                        className="border-b border-gray-100/60 last:border-0 hover:bg-emerald-50/30 transition-colors group"
                                    >
                                        <td className="py-4 pl-6 text-sm text-gray-400 font-medium">
                                            {startIdx + idx + 1}
                                        </td>
                                        <td className="py-4">
                                            <span className="text-sm font-mono font-semibold text-gray-700 group-hover:text-emerald-700 transition-colors">
                                                {letter.nomor.length > 30
                                                    ? letter.nomor.substring(0, 30) + "..."
                                                    : letter.nomor}
                                            </span>
                                        </td>
                                        <td className="py-4">
                                            <span className="text-sm font-medium text-gray-700">{letter.perihal}</span>
                                        </td>
                                        <td className="py-4">
                                            <span className="text-sm text-gray-500">{letter.tujuan}</span>
                                        </td>
                                        <td className="py-4">
                                            <span className="text-sm text-gray-500">{letter.tanggal}</span>
                                        </td>
                                        <td className="py-4 text-center">
                                            <StatusBadge status={letter.status} />
                                        </td>
                                        <td className="py-4 pr-6">
                                            <div className="flex items-center justify-center gap-2">
                                                {/* View button */}
                                                <button
                                                    className="w-8 h-8 rounded-lg bg-gray-50 hover:bg-emerald-50 flex items-center justify-center text-gray-400 hover:text-emerald-600 transition-all duration-200"
                                                    title="Lihat"
                                                >
                                                    <Eye size={15} />
                                                </button>
                                                {/* Download button — only for Disetujui */}
                                                {canDownload(letter.status) && (
                                                    <button
                                                        className="w-8 h-8 rounded-lg bg-emerald-50 hover:bg-emerald-100 flex items-center justify-center text-emerald-500 hover:text-emerald-700 transition-all duration-200"
                                                        title="Download PDF"
                                                    >
                                                        <Download size={15} />
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>

                    {/* ── Pagination ── */}
                    {filtered.length > 0 && (
                        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100/60">
                            <p className="text-sm text-gray-400">
                                Menampilkan {startIdx + 1}–{Math.min(startIdx + ITEMS_PER_PAGE, filtered.length)} dari {filtered.length} surat
                            </p>
                            <div className="flex items-center gap-1.5">
                                {/* Prev */}
                                <button
                                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                    disabled={currentPage === 1}
                                    className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                                >
                                    <ChevronLeft size={16} />
                                </button>

                                {/* Page numbers */}
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                    <button
                                        key={page}
                                        onClick={() => setCurrentPage(page)}
                                        className={`w-8 h-8 rounded-lg text-sm font-semibold flex items-center justify-center transition-all duration-200 ${currentPage === page
                                            ? "bg-[#16A34A] text-white shadow-md shadow-emerald-500/20"
                                            : "text-gray-500 hover:bg-gray-100"
                                            }`}
                                    >
                                        {page}
                                    </button>
                                ))}

                                {/* Next */}
                                <button
                                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                                    disabled={currentPage === totalPages}
                                    className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                                >
                                    <ChevronRight size={16} />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OutgoingLetter;