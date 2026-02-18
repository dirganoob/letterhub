import Navbar from "../../components/Navbar";
import SidebarAdmin from "../../components/SidebarAdmin";
import React from "react";

const ArchiveLetter = () => {
    return (
        <div className="flex min-h-screen bg-[#EDFCF2]">

            {/* Sidebar */}
            <SidebarAdmin />

            {/* Main Content */}
            <div className="flex-1 flex flex-col px-10 py-8">

                <Navbar />

                <div className="mt-6">

                </div>
            </div>
        </div>
    )
}
export default ArchiveLetter;