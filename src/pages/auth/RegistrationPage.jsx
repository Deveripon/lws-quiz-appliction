import { Helmet } from "react-helmet";
import RegistrationPageInfo from "./components/RegistrationPageInfo";
import Logo from "../../components/userPanel/Logo";
import RegistrationForm from "./forms/RegistrationForm";
import { Link } from "react-router-dom";

const RegistrationPage = () => {
    return (
        <div className='bg-white text-gray-800 '>
            <Helmet>
                <title>Quizzes - Register New User</title>
            </Helmet>
            <div className='flex min-h-screen max-h-screen'>
                <RegistrationPageInfo />
                <div className='fixed right-0 top-0 w-full h-full lg:w-1/2 flex items-start xl:items-center justify-center p-6 lg:p-8 xl:p-12 overflow-y-auto xl:overflow-hidden'>
                    <div className='w-full max-w-lg '>
                        <h2 className='text-3xl font-bold mb-3 flex gap-2 items-center'>
                            <span>Welcome to</span>
                            <Logo />
                        </h2>
                        <h1 className='text-4xl font-bold mb-6'>Sign Up</h1>
                        <RegistrationForm />
                        <div className='mt-2 text-gray-400'>
                            <p className='text-center'>
                                Already have account ?{" "}
                                <Link to='/login' className='text-primary'>
                                    Sign In
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegistrationPage;
