import { useLocation } from "react-router-dom";
import BreadCrumbs from "../../components/admin-panel/BreadCrumbs";
import QuizEntryList from "../../components/admin-panel/QuizEntryList";
import QuizsetInfo from "../../components/admin-panel/QuizsetInfo";
import useAdminApiHandlers from "../../hooks/useAdminApiHandlers";
import { useQuery } from "@tanstack/react-query";
import QuizSetEntryPageSkeliton from "../../components/skelitons/QuizSetEntryPageSkeliton";
import ErrorComponent from "../../components/common/ErrorComponent";
import QuizForm from "../../components/admin-panel/forms/QuizForm";
import { useState } from "react";
import QuizEntry from "../../components/admin-panel/QuizEntry";
import { getSortedByUpdatedAt } from "../../utils";
import NoData from "../../components/common/NoData";
import PublishAction from "../../components/admin-panel/PublishAction";
import { motion } from "motion/react";
import { easeIn } from "motion";

const QuizEntryPage = () => {
    const { pathname } = useLocation();
    const quizsetId = pathname.split("/")[4];
    const { getAllQuizSet } = useAdminApiHandlers();
    const [dataToEdit, setDataToEdit] = useState(null);

    //get all quize sets
    const { isLoading, data, error } = useQuery({
        queryFn: getAllQuizSet,
        queryKey: ["admin", "quizzes"],
    });

    const thisQuizData = data && data?.find((quiz) => quiz.id === quizsetId);

    function handleDataToEdit(data) {
        setDataToEdit(data);
    }

    return isLoading ? (
        <QuizSetEntryPageSkeliton />
    ) : error ? (
        <ErrorComponent />
    ) : (
        <main className='md:flex-grow px-4 sm:px-6 lg:px-8 py-8'>
            <div>
                <BreadCrumbs />
                <div className=' dark:text-dark-textPrimary grid grid-cols-1 lg:grid-cols-2 md:gap-8 lg:gap-12'>
                    <motion.div
                        animate={{
                            opacity: [0, 1],
                            y: [-10, 0],
                            transition: { duration: 0.3, ease: easeIn },
                        }}
                        className=''>
                        <QuizsetInfo quiz={thisQuizData} />
                        <div className='space-y-4 mb-12'>
                            {!dataToEdit &&
                            thisQuizData?.status === "published" ? (
                                <div className='flex items-center p-4 mb-4 text-sm text-red-800 bg-red-100 border border-red-300 rounded-lg'>
                                    <svg
                                        className='w-5 h-5 mr-2 text-red-600'
                                        fill='currentColor'
                                        viewBox='0 0 20 20'
                                        xmlns='http://www.w3.org/2000/svg'>
                                        <path
                                            fillRule='evenodd'
                                            d='M8.257 3.099c.765-1.36 2.721-1.36 3.486 0l6.671 11.87c.748 1.33-.21 3-1.742 3H3.328c-1.532 0-2.49-1.67-1.742-3l6.671-11.87zM11 14a1 1 0 10-2 0 1 1 0 002 0zm-1-6a1 1 0 00-.993.883L9 9v3a1 1 0 001.993.117L11 12V9a1 1 0 00-1-1z'
                                            clipRule='evenodd'></path>
                                    </svg>
                                    <span className='font-normal'>
                                        You Can not add question to a already
                                        published Quiz. If you really want to do
                                        this, you need to unpublish the quiz
                                        first.
                                    </span>
                                </div>
                            ) : (
                                <QuizForm
                                    quiz={thisQuizData}
                                    initialData={dataToEdit}
                                    setDataToEdit={setDataToEdit}
                                />
                            )}
                        </div>
                    </motion.div>
                    <PublishAction
                        status={thisQuizData?.status}
                        quiz={thisQuizData}
                    />
                    <QuizEntryList>
                        {thisQuizData?.Questions &&
                        thisQuizData?.Questions.length > 0 ? (
                            getSortedByUpdatedAt(thisQuizData.Questions).map(
                                (question, index) => (
                                    <QuizEntry
                                        quizSet={thisQuizData}
                                        key={question.id}
                                        index={index}
                                        question={question}
                                        handleDataToEdit={handleDataToEdit}
                                    />
                                )
                            )
                        ) : (
                            <div className='flex place-content-center'>
                                <NoData
                                    text={`You don't have added ant question yet.`}
                                />
                            </div>
                        )}
                    </QuizEntryList>
                </div>
            </div>
        </main>
    );
};

export default QuizEntryPage;
