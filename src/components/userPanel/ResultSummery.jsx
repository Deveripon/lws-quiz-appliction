import { Link } from "react-router-dom";
import ProgressReport from "./ProgressReport";
import useResult from "../../hooks/useResult";

const ResultSummery = ({ data }) => {
    const { myCorrectAnswers, myIncorrectAnswers, totalCorrectMarks } =
        useResult(data);

    return (
        <div className='max-h-screen flex-1 overflow-hidden lg:flex pt-[100px] lg:pt-0  bg-primary dark:bg-dark-primary  flex-col justify-center p-12 relative'>
            <div>
                <div className='text-white dark:text-dark-textPrimary'>
                    <div>
                        <h2 className='text-4xl font-bold mb-2'>
                            {data?.quiz?.title}
                        </h2>
                        <p>{data?.quiz?.description}</p>
                    </div>
                    <div className='my-6 flex flex-col sm:flex-row items-center  '>
                        <div className='w-1/2 order-2 sm:order-1 '>
                            <div className='flex gap-6 my-6'>
                                <div>
                                    <p className='font-semibold text-2xl my-0'>
                                        {data?.quiz?.total_questions}
                                    </p>
                                    <p className='text-gray-300'>Questions</p>
                                </div>
                                <div>
                                    <p className='font-semibold text-2xl my-0'>
                                        {myCorrectAnswers.length}
                                    </p>
                                    <p className='text-gray-300'>Correct</p>
                                </div>
                                <div>
                                    <p className='font-semibold text-2xl my-0'>
                                        {myIncorrectAnswers.length}
                                    </p>
                                    <p className='text-gray-300'>Wrong</p>
                                </div>
                            </div>
                            <Link
                                to={`/leaderboard/${data?.quiz?.id}`}
                                className=' bg-secondary py-3 rounded-md hover:bg-secondary/90 transition-colors text-lg font-medium underline text-white'>
                                View Leaderboard
                            </Link>
                        </div>
                        <ProgressReport
                            totalCorrectMarks={totalCorrectMarks}
                            totalMarks={data?.quiz?.total_marks}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResultSummery;
