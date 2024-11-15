import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
    const auth = {
        user: "SomeOne",
        accessToken: true,
    };
    if (!auth.accessToken) {
        return <Navigate to='/login' />;
    }
    return <Outlet />;
};

export default PrivateRoute;
