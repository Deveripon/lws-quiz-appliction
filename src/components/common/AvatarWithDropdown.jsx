import { useRef } from "react";
import defaultAvatar from "../../assets/avater.webp";
import usePopup from "../../hooks/usePopup";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import cn from "../../utils/cn";
const AvatarWithDropdown = ({ showName = false, nameClass, placeLocation }) => {
    const navigate = useNavigate();
    const { setAuth, auth } = useAuth();
    const ref = useRef(null);
    const { isShow, togglePopup } = usePopup(ref);
    const { pathname } = useLocation();

    function handleLogout() {
        navigate("/login", { replace: true });
        localStorage.removeItem("auth");
        setAuth({});
    }
    return (
        <div className='relative inline-block text-left '>
            {/* Avatar */}
            <button
                onClick={togglePopup}
                className='flex ring-2 ring-offset-2 ring-purple-600 items-center justify-center w-10 h-10 rounded-full bg-gray-300 text-gray-700 focus:outline-none'>
                <img
                    src={defaultAvatar}
                    alt='User Avatar'
                    className='w-full h-full rounded-full object-cover'
                />
            </button>
            {showName && (
                <h3
                    className={cn(
                        `text-slate-200 absolute top-[11px] left-[50px] font-semibold`,
                        nameClass
                    )}>
                    {auth?.user?.full_name}
                </h3>
            )}

            {/* Dropdown */}
            {isShow && (
                <div
                    ref={ref}
                    className={cn(
                        `absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5`,
                        placeLocation === "dashboard" &&
                            "right-[30px] bottom-[50px] mt-2"
                    )}>
                    <div className='py-1'>
                        <Link
                            href='#myProfile'
                            className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200'>
                            My Profile
                        </Link>
                        {auth?.user?.role === "admin" && (
                            <div className='transition-all duration-300'>
                                {pathname.includes("admin") && (
                                    <Link
                                        to='/'
                                        className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200'>
                                        Go to Home Page
                                    </Link>
                                )}
                            </div>
                        )}

                        <Link
                            href='#settings'
                            className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200'>
                            Settings
                        </Link>
                        <button
                            onClick={handleLogout}
                            className='w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-200'>
                            Logout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AvatarWithDropdown;
