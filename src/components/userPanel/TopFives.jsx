const TopFives = ({ children }) => {
    return (
        <div>
            <h1 className='text-2xl font-bold'>Leaderboard</h1>
            <p className='mb-6'>React Hooks Quiz</p>
            <ul className='space-y-4'>{children}</ul>
        </div>
    );
};

export default TopFives;
