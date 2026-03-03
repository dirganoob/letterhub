import React, { useState, useEffect } from "react";

// ── Animated Counter ──
const AnimatedNumber = ({ target, duration = 1200 }) => {
    const [count, setCount] = useState(0);
    useEffect(() => {
        let start = 0;
        const increment = target / (duration / 16);
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                setCount(target);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, 16);
        return () => clearInterval(timer);
    }, [target, duration]);
    return <span>{count}</span>;
};

// ── Stat Card ──
const StatCard = ({ icon, title, value, subtitle, gradient, delay = 0 }) => {
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const t = setTimeout(() => setVisible(true), delay);
        return () => clearTimeout(t);
    }, [delay]);

    return (
        <div
            className="relative flex-1 min-w-[180px] rounded-2xl p-5 overflow-hidden group cursor-default"
            style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(16px)",
                transition: `all 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
            }}
        >
            <div className="absolute inset-0 bg-white/70 backdrop-blur-sm border border-white/60 rounded-2xl shadow-sm group-hover:shadow-md group-hover:shadow-emerald-100/40 transition-shadow duration-300" />
            <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl" style={{ background: gradient }} />
            <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full opacity-0 group-hover:opacity-15 transition-opacity duration-500 blur-2xl" style={{ background: gradient }} />

            <div className="relative z-10">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg mb-3 bg-white/80 shadow-sm border border-white/50">
                    {icon}
                </div>
                <p className="text-[38px] font-extrabold text-gray-800 leading-none tracking-tight">
                    <AnimatedNumber target={parseInt(value)} />
                </p>
                <p className="text-sm font-semibold text-gray-600 mt-1">{title}</p>
                <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>
            </div>
        </div>
    );
};

// ── Status Badge ──
const StatusBadge = ({ status }) => {
    const styles = {
        Disetujui: "bg-emerald-50 text-emerald-600 ring-emerald-500/20",
        Pending: "bg-amber-50 text-amber-600 ring-amber-500/20",
        "Di Manager": "bg-blue-50 text-blue-600 ring-blue-500/20",
        Ditolak: "bg-red-50 text-red-600 ring-red-500/20",
    };
    const dotStyles = {
        Disetujui: "bg-emerald-500",
        Pending: "bg-amber-500",
        "Di Manager": "bg-blue-500",
        Ditolak: "bg-red-500",
    };
    return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold ring-1 ${styles[status] || styles.Pending}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${dotStyles[status] || dotStyles.Pending}`} />
            {status}
        </span>
    );
};

// ── Letter History ──
const letters = [
    { nomor: "0262/HCDC/HK/2025", perihal: "Training Skin Beauty", status: "Disetujui" },
    { nomor: "0263/HCDC/HK/2025", perihal: "Undangan Rapat Q4", status: "Pending" },
    { nomor: "0264/HCDC/HK/2025", perihal: "Surat Tugas Dinas", status: "Di Manager" },
    { nomor: "0265/HCDC/HK/2025", perihal: "Memo Cuti Bersama", status: "Disetujui" },
    { nomor: "0266/HCDC/HK/2025", perihal: "Permohonan Anggaran", status: "Pending" },
];

const LetterHistoryCard = () => (
    <div className="flex-[1.2] bg-white/70 backdrop-blur-sm border border-white/60 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-gray-800">Riwayat Surat Terbaru</h3>
            <button className="text-xs text-emerald-600 font-semibold hover:text-emerald-700 transition-colors px-2 py-1 rounded-lg hover:bg-emerald-50">
                Lihat Semua →
            </button>
        </div>
        <table className="w-full">
            <thead>
                <tr>
                    <th className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider pb-3 pl-3 text-left">Nomor</th>
                    <th className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider pb-3 text-left">Perihal</th>
                    <th className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider pb-3 pr-3 text-right">Status</th>
                </tr>
            </thead>
            <tbody>
                {letters.map((l, i) => (
                    <tr key={i} className="group cursor-pointer hover:bg-emerald-50/40 transition-colors">
                        <td className="py-2.5 pl-3 rounded-l-xl">
                            <span className="text-xs font-mono font-semibold text-gray-700 group-hover:text-emerald-700 transition-colors">
                                {l.nomor}
                            </span>
                        </td>
                        <td className="py-2.5">
                            <span className="text-sm text-gray-600">{l.perihal}</span>
                        </td>
                        <td className="py-2.5 text-right pr-3 rounded-r-xl">
                            <StatusBadge status={l.status} />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

// ── Activity Feed ──
const activities = [
    { text: "Surat #0263 dikirim ke Manager A", time: "2 menit lalu", by: "Gilang", icon: "📤" },
    { text: "Surat #0262 disetujui Manager B", time: "15 menit lalu", by: null, icon: "✅" },
    { text: "PDF #0265 berhasil di-export", time: "1 jam lalu", by: null, icon: "📄" },
    { text: 'User "Rina" ditambahkan', time: "3 jam lalu", by: "Admin", icon: "👤" },
    { text: "Surat #0261 ditolak Manager C", time: "5 jam lalu", by: null, icon: "❌" },
];

const ActivityCard = () => (
    <div className="flex-[0.8] bg-white/70 backdrop-blur-sm border border-white/60 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-gray-800">Aktivitas Terkini</h3>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        </div>
        <div className="space-y-0.5">
            {activities.map((a, i) => (
                <div key={i} className="flex items-start gap-3 p-2 rounded-xl hover:bg-gray-50/60 transition-colors cursor-default group">
                    <div className="flex flex-col items-center mt-0.5">
                        <span className="text-sm leading-none">{a.icon}</span>
                        {i < activities.length - 1 && <div className="w-px h-5 bg-gray-200 mt-1" />}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-700 font-medium leading-snug group-hover:text-gray-900 transition-colors">{a.text}</p>
                        <p className="text-[11px] text-gray-400 mt-0.5">
                            {a.time}
                            {a.by && <span className="text-gray-300"> — <span className="text-gray-500">{a.by}</span></span>}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

// ══════════════════════════════
// ── DASHBOARD PAGE ──
// ══════════════════════════════
const Dashboard = () => {
    const today = new Date().toLocaleDateString("id-ID", {
        weekday: "long", day: "numeric", month: "long", year: "numeric",
    });

    return (
        <div className="px-8 py-6 relative">
            {/* Background blobs */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-emerald-200/15 blur-3xl" />
                <div className="absolute bottom-0 right-1/3 w-[300px] h-[300px] rounded-full bg-green-200/15 blur-3xl" />
            </div>

            <div className="relative z-10">
                {/* Header */}
                <div className="flex items-end justify-between mb-1">
                    <div>
                        <h2 className="text-2xl font-extrabold text-gray-800 tracking-tight">
                            Selamat Datang, Gilang <span className="inline-block animate-bounce">👋</span>
                        </h2>
                        <p className="text-gray-500 text-sm mt-0.5">Ringkasan aktivitas persuratan HCDC hari ini</p>
                    </div>
                    <p className="text-xs text-gray-400 font-medium">{today}</p>
                </div>

                {/* Stat Cards */}
                <div className="flex gap-4 mt-6 mb-8">
                    <StatCard icon="📋" title="Total Surat" value="40" subtitle="+8 bulan ini" gradient="linear-gradient(135deg, #10b981, #059669)" delay={0} />
                    <StatCard icon="📨" title="Surat Hari Ini" value="5" subtitle="2 menunggu approval" gradient="linear-gradient(135deg, #f59e0b, #d97706)" delay={100} />
                    <StatCard icon="✅" title="Surat Disetujui" value="28" subtitle="3 selesai hari ini" gradient="linear-gradient(135deg, #22c55e, #16a34a)" delay={200} />
                    <StatCard icon="❌" title="Ditolak" value="2" subtitle="Perlu revisi" gradient="linear-gradient(135deg, #ef4444, #dc2626)" delay={300} />
                </div>

                {/* Bottom Section */}
                <div className="flex gap-5">
                    <LetterHistoryCard />
                    <ActivityCard />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;