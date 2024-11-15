import { Link } from "react-router-dom";
import Logo from "../../components/userPanel/Logo";

const Header = () => {
    return (
        <header className='flex bg-transparent justify-between items-center mb-12'>
            <Link to='/'>
                <Logo />
            </Link>
            <div>
                <button
                    className='px-4 py-2 rounded hover:bg-primary hover:text-white transition-colors'
                    style={{ fontFamily: "Jaro" }}>
                    Login
                </button>
                <button
                    className='px-4 py-2 rounded hover:bg-primary hover:text-white transition-colors'
                    style={{ fontFamily: "Jaro" }}>
                    Logout
                </button>
            </div>
        </header>
    );
};

export default Header;
