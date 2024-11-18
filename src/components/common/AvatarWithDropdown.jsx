import { useRef } from "react";
import defaultAvatar from "../../assets/avater.webp";
import usePopup from "../../hooks/usePopup";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
const AvatarWithDropdown = () => {
    const navigate = useNavigate();
    const { setAuth } = useAuth();
    const ref = useRef(null);
    const { isShow, togglePopup } = usePopup(ref);

    function handleLogout() {
        navigate("/login");
        localStorage.removeItem("auth");
        setAuth({});
    }
    return (
        <div className='relative inline-block text-left'>
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

            {/* Dropdown */}
            {isShow && (
                <div
                    ref={ref}
                    className='absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5'>
                    <div className='py-1'>
                        <Link
                            href='#myProfile'
                            className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>
                            My Profile
                        </Link>
                        <Link
                            href='#settings'
                            className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>
                            Settings
                        </Link>
                        <button
                            onClick={handleLogout}
                            className='w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>
                            Logout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AvatarWithDropdown;
