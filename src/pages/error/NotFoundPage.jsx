import { Link } from "react-router-dom";
import notFoundSvg from "../../assets/notFound.svg";
const NotFoundPage = () => {
    return (
        <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800'>
            <div className='text-center'>
                <h1 className='text-9xl font-bold text-primary'>404</h1>
                <h2 className='mt-4 text-3xl font-semibold'>Page Not Found</h2>
                <p className='mt-2 text-lg text-gray-600'>
                    Sorry, the page you are looking for does not exist or has
                    been moved.
                </p>
                <Link
                    to='/'
                    className='mt-6 inline-block px-6 py-3 text-white bg-primary rounded-lg shadow-md hover:bg-indigo-600 transition'>
                    Go Back Home
                </Link>
            </div>
            <div className='mt-8'>
                <img
                    src={notFoundSvg}
                    alt='Not Found Illustration'
                    className='max-w-full h-auto'
                />
            </div>
        </div>
    );
};

export default NotFoundPage;
