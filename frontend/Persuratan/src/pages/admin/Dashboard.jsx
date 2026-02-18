import React from "react";
import Navbar from "../../components/Navbar";
import SidebarAdmin from "../../components/SidebarAdmin";
import StatCard from "../../components/StatCard";
import LetterHistoryCard from "../../components/LetterHistoryCard";
import ActivityCard from "../../components/ActivityCard";

const Dashboard = () => {
    return (
        <div className="flex min-h-screen bg-[#EDFCF2]">
            <SidebarAdmin />

            <div className="flex-1 flex flex-col px-10 py-8">
                <Navbar />

                <div className="mt-6">
                    <h2 className="text-3xl font-bold text-green-900">
                        Selamat Datang, Gilang 👋
                    </h2>
                    <p className="text-green-700 text-sm mt-1 mb-6">
                        Ringkasan aktivitas persuratan HCDC hari ini
                    </p>

                    {/* Stat Cards */}
                    <div className="flex gap-6 mb-10">
                        <StatCard
                            icon={<img src="/IkonTotalSurat.png" alt="Total Surat" className="w-6 h-6" />}
                            title="Total Surat"
                            value="40"
                            subtitle="+8 bulan ini"
                            iconBg="bg-green-100"
                        />
                        <StatCard
                            icon={<img src="/IkonSuratHariIni.png" alt="Surat Hari Ini" className="w-6 h-6" />}
                            title="Surat Hari Ini"
                            value="5"
                            subtitle="2 menunggu approval"
                            iconBg="bg-yellow-100"
                        />
                        <StatCard
                            icon={<img src="/IkonSuratDisetujui.png" alt="Surat Disetujui" className="w-6 h-6" />}
                            title="Surat Disetujui"
                            value="28"
                            subtitle="3 selesai hari ini"
                            iconBg="bg-green-100"
                        />
                        <StatCard
                            icon={<img src="/IkonSuratDitolak.png" alt="Surat Ditolak" className="w-6 h-6" />}
                            title="Ditolak"
                            value="2"
                            subtitle="Perlu revisi"
                            iconBg="bg-red-100"
                        />
                    </div>

                    {/* Bottom Section */}
                    <div className="flex gap-6">
                        <LetterHistoryCard />
                        <ActivityCard />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
