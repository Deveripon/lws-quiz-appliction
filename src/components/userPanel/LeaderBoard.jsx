const LeaderBoard = ({ children }) => {
    return (
        <div className='bg-white rounded-lg shadow-lg w-full max-w-4xl overflow-hidden'>
            <div className='p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8'>
                {children}
            </div>
        </div>
    );
};

export default LeaderBoard;
