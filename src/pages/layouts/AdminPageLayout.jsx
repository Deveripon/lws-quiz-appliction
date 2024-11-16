import { Navigate, Outlet, useLocation } from "react-router-dom";
import Sidebar from "../../components/admin-panel/Sidebar";

const AdminPageLayout = () => {
    const location = useLocation();

    if (location?.pathname === "/admin") {
        return <Navigate to='/admin/dashboard' />;
    }

    const auth = {
        role: "admin",
    };

    if (auth?.role !== "admin") {
        return <Navigate to='/login' />;
    }
    return (
        <div className='bg-gray-100 min-h-screen flex'>
            <Sidebar />
            <Outlet />
        </div>
    );
};

export default AdminPageLayout;
