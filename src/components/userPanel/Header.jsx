import { Link } from "react-router-dom";
import Logo from "../../components/userPanel/Logo";
import useAuth from "../../hooks/useAuth";
import AvatarWithDropdown from "../common/AvatarWithDropdown";

const Header = () => {
    const { auth } = useAuth();
    return (
        <header className='flex justify-between items-center mb-12'>
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
                    <AvatarWithDropdown />
                )}
            </div>
        </header>
    );
};

export default Header;
