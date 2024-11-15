import { Navigate, Outlet, useLocation } from "react-router-dom";

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
        <>
            <div className='header h-96'>Header</div>
            <Outlet />
            <div className='footer mt-96'>Footer</div>
        </>
    );
};

export default AdminPageLayout;
