import { StatusBadge } from "./StatCard";

const LetterHistoryCard = () => {
    const data = [
        {
            nomor: "0262/HCDC/HK/2025",
            perihal: "Training Skin Beauty",
            status: "approved",
        },
        {
            nomor: "0263/HCDC/HK/2025",
            perihal: "Undangan Rapat Q4",
            status: "pending",
        },
        {
            nomor: "0264/HCDC/HK/2025",
            perihal: "Surat Tugas Dinas",
            status: "manager",
        },
        {
            nomor: "0265/HCDC/HK/2025",
            perihal: "Memo Cuti Bersama",
            status: "approved",
        },
    ];

    return (
        <div className="bg-white rounded-2xl border-2 border-[#D1FAE5] flex-1 overflow-hidden">

            {/* Header Title */}
            <div className="px-6 py-4">
                <h3 className="font-semibold text-green-900">
                    Riwayat Surat Terbaru
                </h3>
            </div>

            {/* Table */}
            <table className="w-full text-sm">
                <thead className="bg-[#ECFDF5] text-green-800 text-xs uppercase tracking-wide">
                <tr>
                    <th className="text-left px-6 py-3">Nomor</th>
                    <th className="text-left px-6 py-3">Perihal</th>
                    <th className="text-left px-6 py-3">Status</th>
                </tr>
                </thead>

                <tbody>
                {data.map((item, index) => (
                    <tr
                        key={index}
                        className="border-t border-[#E5F7ED] hover:bg-[#F6FEF9] transition"
                    >
                        <td className="px-6 py-4 font-medium text-green-900">
                            {item.nomor}
                        </td>

                        <td className="px-6 py-4 text-green-800">
                            {item.perihal}
                        </td>

                        <td className="px-6 py-4 text-left">
                            <StatusBadge status={item.status} />
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default LetterHistoryCard;
