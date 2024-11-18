const TopFives = ({ children, quiz }) => {
    return (
        <div>
            <h1 className='text-2xl font-bold'>Leaderboard</h1>
            <p className='mb-6'>{quiz.title}</p>
            <ul className='space-y-4'>{children}</ul>
        </div>
    );
};

export default TopFives;
