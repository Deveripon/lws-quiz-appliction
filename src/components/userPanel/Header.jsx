import { Link, useLocation } from "react-router-dom";
import Logo from "../../components/userPanel/Logo";
import useAuth from "../../hooks/useAuth";
import AvatarWithDropdown from "../common/AvatarWithDropdown";

const Header = () => {
    const { auth } = useAuth();
    const { pathname } = useLocation();
    return (
        <header className='flex justify-between items-center mb-12 sticky top-4'>
            <Link to='/'>
                <Logo />
            </Link>
            <div>
                {!auth.accessToken ? (
                    <>
                        <Link
                            to='/login'
                            className='px-4 py-2 rounded hover:bg-primary hover:text-white transition-colors'
                            style={{ fontFamily: "Jaro" }}>
                            Sign In
                        </Link>
                        <Link
                            to='/register'
                            className='px-4 py-2 rounded hover:bg-primary hover:text-white transition-colors'
                            style={{ fontFamily: "Jaro" }}>
                            Sign Up
                        </Link>
                    </>
                ) : (
                    <div className='flex'>
                        {auth.user?.role === "admin" &&
                            !pathname.includes("admin") && (
                                <Link
                                    to='/admin/dashboard/quizzes'
                                    className='px-6 mr-8 py-2 bg-indigo-800 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200'>
                                    Go to Dashboard
                                </Link>
                            )}
                        <AvatarWithDropdown />
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
