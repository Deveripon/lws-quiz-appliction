const QuizActions = () => {
    return (
        <div className='flex space-x-4 bg-primary/10 px-6 py-2'>
            <button className='text-red-600 hover:text-red-800 font-medium'>
                Delete
            </button>
            <button className='text-primary hover:text-primary/80 font-medium'>
                Edit Question
            </button>
        </div>
    );
};

export default QuizActions;
