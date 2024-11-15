import { Outlet } from "react-router-dom";

const UsersPageLayout = () => {
    return (
        <>
            <div className='header h-96'>Header</div>
            <Outlet />
            <div className='footer mt-96'>Footer</div>
        </>
    );
};

export default UsersPageLayout;
