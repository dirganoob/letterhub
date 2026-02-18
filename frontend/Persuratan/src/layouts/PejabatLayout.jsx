import { Outlet } from "react-router-dom"

const PejabatLayout = () => {
    return (
        <div className="min-h-screen bg-[#E6E9DD] p-8">
            <Outlet />
        </div>
    )
}

export default PejabatLayout
