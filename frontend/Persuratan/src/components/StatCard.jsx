import React from "react";

export const StatusBadge = ({ status }) => {
    const base =
        "inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium";

    const variants = {
        approved: "bg-green-100 text-green-700",
        pending: "bg-yellow-100 text-yellow-700",
        manager: "bg-blue-100 text-blue-700",
    };

    const labels = {
        approved: "Disetujui",
        pending: "Pending",
        manager: "Di Manager",
    };

    const dotColors = {
        approved: "bg-green-500",
        pending: "bg-yellow-500",
        manager: "bg-blue-500",
    };

    return (
        <span className={`${base} ${variants[status]}`}>
            <span
                className={`w-2 h-2 rounded-full ${dotColors[status]}`}
            ></span>
            {labels[status]}
        </span>
    );
};

const StatCard = ({ icon, title, value, subtitle, iconBg }) => {
    return (
        <div className="relative bg-white rounded-2xl border border-green-200 p-6 flex-1 overflow-hidden">
            <div className="absolute -top-16 -right-16 w-40 h-40 bg-gradient-to-br from-green-100 via-green-50 to-transparent rounded-full opacity-70"></div>
            <div className="relative z-10">
                <div className={`w-12 h-12 flex items-center justify-center rounded-xl mb-4 ${iconBg}`}>
                    {icon}
                </div>

                <h2 className="text-4xl font-bold text-green-950 leading-none">
                    {value}
                </h2>

                <p className="text-sm font-semibold text-green-800 mt-2">
                    {title}
                </p>

                <p className="text-xs text-green-600 mt-1">
                    {subtitle}
                </p>
            </div>
        </div>
    );
};

export default StatCard;
