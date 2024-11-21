const QuizsetInfo = ({ quiz }) => {
    return (
        <>
            <h2 className='text-3xl font-bold mb-4'>{quiz?.title}</h2>
            <div className='bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded-full inline-block mb-4'>
                Total number of questions : {quiz?.Questions?.length}
            </div>
            <p className='text-gray-600 mb-4'>{quiz?.description}</p>
        </>
    );
};

export default QuizsetInfo;
