import { NavLink } from "react-router-dom";
import { adminDashboardNavItems } from "../../data/data";
import UserProfileDisplayer from "../common/UserProfileDisplayer";
import LogoWhite from "./LogoWhite";

const Sidebar = () => {
    return (
        <aside className='w-64 bg-primary p-6 flex flex-col'>
            <div className='mb-10'>
                <LogoWhite />
            </div>
            <nav className='flex-grow'>
                <ul className='space-y-2'>
                    {adminDashboardNavItems.length > 0 &&
                        adminDashboardNavItems.map((item) => (
                            <li key={item.id}>
                                <NavLink
                                    to={item.path}
                                    className={({ isActive }) =>
                                        isActive
                                            ? "block py-2 px-4 rounded-lg bg-buzzr-purple bg-white text-primary font-bold"
                                            : "block py-2 px-4 rounded-lg text-gray-100 hover:bg-gray-100 hover:text-primary"
                                    }>
                                    {item.title}
                                </NavLink>
                            </li>
                        ))}
                </ul>
            </nav>
            <UserProfileDisplayer />
        </aside>
    );
};

export default Sidebar;
