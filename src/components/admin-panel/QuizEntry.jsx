import QuizActions from "./QuizActions";

const QuizEntry = ({ quizSet, question, index, handleDataToEdit }) => {
    return (
        <div className='rounded-lg overflow-hidden shadow-sm mb-4'>
            <div className='bg-white p-6 !pb-2'>
                <div className='flex justify-between items-center mb-4'>
                    <h3 className='text-lg font-semibold'>
                        {index + 1}. {question.question} ?
                    </h3>
                </div>
                <div className='space-y-2'>
                    {question.options.map((option, i) => (
                        <label key={i} className='flex items-center space-x-3'>
                            <input
                                type='radio'
                                readOnly
                                disabled={option !== question.correctAnswer}
                                className='form-radio text-buzzr-purple'
                                checked={option === question.correctAnswer}
                            />
                            <span>{option}</span>
                        </label>
                    ))}
                </div>
            </div>
            <QuizActions
                quizSet={quizSet}
                handleDataToEdit={handleDataToEdit}
                question={question}
            />
        </div>
    );
};

export default QuizEntry;
