import QuizActions from "../admin-panel/QuizActions";

const QuizWithAnswer = ({ children }) => {
    return (
        <div className='rounded-lg border border-gray-200 overflow-hidden shadow-sm mb-4'>
            <div className='bg-white p-6 md:w-[450px] lg:w-[600px] !pb-2'>
                <div className='flex justify-between items-center mb-4'>
                    <h3 className='text-lg text-wrap lg:w-[400px] xl:w-[550px] font-semibold'>
                        1. Which of the following is NOT a binary tree traversal
                        method?
                    </h3>
                </div>
                <div className='space-y-2'>
                    <label className='flex items-center space-x-3'>
                        <input
                            type='radio'
                            name='answer1'
                            className='form-radio text-buzzr-purple'
                            defaultChecked=''
                        />
                        <span>Inorder</span>
                    </label>
                    <label className='flex items-center space-x-3'>
                        <input
                            type='radio'
                            name='answer1'
                            className='form-radio text-buzzr-purple'
                        />
                        <span>Preorder</span>
                    </label>
                    <label className='flex items-center space-x-3'>
                        <input
                            type='radio'
                            name='answer1'
                            className='form-radio text-buzzr-purple'
                        />
                        <span>Postorder</span>
                    </label>
                    <label className='flex items-center space-x-3'>
                        <input
                            type='radio'
                            name='answer1'
                            className='form-radio text-buzzr-purple'
                        />
                        <span>Crossorder</span>
                    </label>
                </div>
            </div>
            {children}
        </div>
    );
};

export default QuizWithAnswer;
