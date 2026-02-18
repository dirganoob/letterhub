const ActivityCard = () => {
    const activities = [
        {
            text: "Surat #0263 dikirim ke Manager A",
            time: "2 menit lalu",
            meta: "Gilang",
            active: true,
        },
        {
            text: "Surat #0262 disetujui Manager B",
            time: "15 menit lalu",
        },
        {
            text: "PDF #0265 berhasil di-export",
            time: "1 jam lalu",
        },
        {
            text: 'User "Rina" ditambahkan',
            time: "5 jam lalu",
            meta: "Admin",
        },
    ];

    return (
        <div className="bg-white rounded-2xl border border-green-200 flex-1 overflow-hidden">

            {/* Header */}
            <div className="px-6 py-4 border-b border-green-100">
                <h3 className="text-base font-semibold text-green-900">
                    Aktivitas Terkini
                </h3>
            </div>

            {/* Timeline */}
            <div className="relative px-6 py-5">

                {/* Vertical Line */}
                <div className="absolute left-[30px] top-6 bottom-6 w-[2px] bg-green-100"></div>

                <div className="space-y-6">
                    {activities.map((item, index) => (
                        <div key={index} className="relative pl-12">

                            {/* Dot */}
                            <span
                                className={`
                                    absolute left-[22px] top-1.5 w-3.5 h-3.5 rounded-full
                                    ${item.active
                                    ? "bg-green-600 ring-4 ring-green-100"
                                    : "bg-green-600"}
                                `}
                            ></span>

                            {/* Text */}
                            <p className="text-sm font-medium text-green-900">
                                {item.text}
                            </p>

                            {/* Time + Meta */}
                            <p className="text-xs text-green-600 mt-1">
                                {item.time}
                                {item.meta && (
                                    <span className="text-green-400">
                                        {" "}– {item.meta}
                                    </span>
                                )}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ActivityCard;
