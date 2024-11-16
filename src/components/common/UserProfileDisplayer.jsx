import defaultAvater from "../../assets/avater.webp";

const UserProfileDisplayer = () => {
    return (
        <div className='mt-auto flex items-center'>
            <img
                src={defaultAvater}
                alt='Mr Hasan'
                className='w-10 h-10 rounded-full mr-3 object-cover'
            />
            <span className='text-white font-semibold'>Saad Hasan</span>
        </div>
    );
};

export default UserProfileDisplayer;
