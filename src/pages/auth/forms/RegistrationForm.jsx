import { Navigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

const RegistrationForm = () => {
    const { auth } = useAuth();
    if (auth.accessToken) {
        return <Navigate to='/' />;
    }
    return (
        <form className=''>
            <div className=''>
                <div className='mb-4'>
                    <label htmlFor='name' className='block mb-2'>
                        Full Name
                    </label>
                    <input
                        type='text'
                        id='name'
                        className='w-full px-4 py-3 rounded-lg border border-gray-300'
                        placeholder='John Doe'
                    />
                </div>
                <div className='mb-4'>
                    <label htmlFor='email' className='block mb-2'>
                        Email
                    </label>
                    <input
                        type='email'
                        id='email'
                        className='w-full px-4 py-3 rounded-lg border border-gray-300'
                        placeholder='Email address'
                    />
                </div>
            </div>
            <div className='flex  gap-4'>
                <div className='mb-6'>
                    <label htmlFor='password' className='block mb-2'>
                        Enter your Password
                    </label>
                    <input
                        type='password'
                        id='password'
                        className='w-full px-4 py-3 rounded-lg border border-gray-300'
                        placeholder='Password'
                    />
                </div>
                <div className='mb-6'>
                    <label htmlFor='password' className='block mb-2'>
                        Confirm Password
                    </label>
                    <input
                        type='password'
                        id='password'
                        className='w-full px-4 py-3 rounded-lg border border-gray-300'
                        placeholder='Confirm Password'
                    />
                </div>
            </div>
            <div className='mb-6 flex gap-2 items-center'>
                <input
                    type='checkbox'
                    id='admin'
                    className='px-4 py-3 rounded-lg border border-gray-300'
                />
                <label htmlFor='admin' className='block '>
                    Register as Admin
                </label>
            </div>
            <button
                type='submit'
                className='w-full bg-primary text-white py-3 rounded-lg mb-2'>
                Create Account
            </button>
        </form>
    );
};

export default RegistrationForm;
