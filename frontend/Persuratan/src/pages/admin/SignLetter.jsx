import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import SidebarAdmin from "../../components/SidebarAdmin";
import { ChevronLeft, ChevronRight, Check, Pen } from "lucide-react";

// ── Sample Data ──
const signLetters = [
    { id: 1, nomor: "0262/HCDC/HK/KALLA-TOYOTA/2025", perihal: "Training Skin Beauty", tujuan: "Peserta training", tanggal: "5/12/2025", status: "Ditandatangani" },
    { id: 2, nomor: "0263/HCDC/HK/KALLA-TOYOTA/2025", perihal: "Undangan Rapat Q4", tujuan: "Seluruh Divisi", tanggal: "5/12/2025", status: "Belum ditandatangani" },
    { id: 3, nomor: "0264/HCDC/HK/KALLA-TOYOTA/2025", perihal: "Surat Tugas Dinas", tujuan: "Andi Prasetya", tanggal: "5/12/2025", status: "Ditandatangani" },
    { id: 4, nomor: "0265/HCDC/HK/KALLA-TOYOTA/2025", perihal: "Pemberitahuan Cuti", tujuan: "Semua Karyawan", tanggal: "5/12/2025", status: "Ditandatangani" },
    { id: 5, nomor: "0266/HCDC/HK/KALLA-TOYOTA/2025", perihal: "Permohonan Anggaran", tujuan: "Div. Keuangan", tanggal: "5/12/2025", status: "Belum ditandatangani" },
    { id: 6, nomor: "0267/HCDC/HK/KALLA-TOYOTA/2025", perihal: "Memo WFH Policy", tujuan: "Seluruh Divisi", tanggal: "5/12/2025", status: "Belum ditandatangani" },
    { id: 7, nomor: "0268/HCDC/HK/KALLA-TOYOTA/2025", perihal: "Renovasi Kantor", tujuan: "GA Dept", tanggal: "5/12/2025", status: "Ditandatangani" },
    { id: 8, nomor: "0269/HCDC/HK/KALLA-TOYOTA/2025", perihal: "Surat Keterangan", tujuan: "Dimas Aditya", tanggal: "5/12/2025", status: "Ditandatangani" },
];

const ITEMS_PER_PAGE = 8;

// ── Status Badge ──
const StatusBadge = ({ status }) => {
    const isSigned = status === "Ditandatangani";

    return (
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold ring-1 
            ${isSigned ? "bg-emerald-50 text-emerald-600 ring-emerald-500/20" : "bg-amber-50 text-amber-600 ring-amber-500/20"}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${isSigned ? "bg-emerald-500" : "bg-amber-500"}`} />
            {status}
        </span>
    );
};

const SignLetter = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(signLetters.length / ITEMS_PER_PAGE);
    const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginated = signLetters.slice(startIdx, startIdx + ITEMS_PER_PAGE);

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

                    <div className="relative z-10">
                        {/* ── Table Container ── */}
                        <div className="bg-white/70 backdrop-blur-sm border border-white/60 rounded-2xl shadow-sm overflow-hidden mt-2">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-emerald-100/60 bg-emerald-50/30">
                                        <th className="text-left text-[10px] font-bold text-emerald-700 uppercase tracking-wider py-4 pl-6 w-12">No</th>
                                        <th className="text-left text-[10px] font-bold text-emerald-700 uppercase tracking-wider py-4">Nomor Surat</th>
                                        <th className="text-left text-[10px] font-bold text-emerald-700 uppercase tracking-wider py-4">Perihal</th>
                                        <th className="text-left text-[10px] font-bold text-emerald-700 uppercase tracking-wider py-4">Tujuan</th>
                                        <th className="text-left text-[10px] font-bold text-emerald-700 uppercase tracking-wider py-4">Tanggal Keluar</th>
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
                                                {/* ── AKSI COLUMN ── */}
                                                <td className="py-4 pr-6">
                                                    <div className="flex items-center justify-center gap-2">
                                                        {/* View Button */}
                                                        <button
                                                            className="w-[34px] h-[34px] rounded-xl border border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-center transition-all duration-200 cursor-pointer shadow-sm hover:shadow"
                                                            title="Lihat Surat"
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                                                                <circle cx="12" cy="12" r="3" />
                                                            </svg>
                                                        </button>

                                                        {/* Dynamic Button (Sign / Check) */}
                                                        {letter.status === "Ditandatangani" ? (
                                                            <button
                                                                className="w-[34px] h-[34px] rounded-xl border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 flex items-center justify-center transition-all duration-200 cursor-pointer shadow-sm"
                                                                title="Sudah Ditandatangani"
                                                            >
                                                                <Check size={16} className="text-emerald-500" strokeWidth={3} />
                                                            </button>
                                                        ) : (
                                                            <button
                                                                className="w-[34px] h-[34px] rounded-xl bg-[#16A34A] hover:bg-emerald-700 flex items-center justify-center transition-all duration-200 cursor-pointer shadow-sm shadow-emerald-500/20"
                                                                title="Tandatangani Surat"
                                                            >
                                                                <Pen size={14} className="text-orange-300" strokeWidth={2.5} />
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
                            {signLetters.length > 0 && (
                                <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100/60 bg-white/40">
                                    <p className="text-sm text-gray-500">
                                        Menampilkan {startIdx + 1}–{Math.min(startIdx + ITEMS_PER_PAGE, signLetters.length)} dari {signLetters.length} surat
                                    </p>
                                    <div className="flex items-center gap-1.5">
                                        <button
                                            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                            disabled={currentPage === 1}
                                            className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                                        >
                                            <ChevronLeft size={16} />
                                        </button>

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
            </div>
        </div>
    );
};

export default SignLetter;