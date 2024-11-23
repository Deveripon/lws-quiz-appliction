import { useQuery } from "@tanstack/react-query";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import whiteLogoImage from "../../assets/logo-white.svg";
import ErrorComponent from "../../components/common/ErrorComponent";
import QuizWithAnswer from "../../components/common/QuizWithAnswer";
import ResultPageSkeliton from "../../components/skelitons/ResultPageSkeliton";
import ResultDetails from "../../components/userPanel/ResultDetails";
import ResultSummery from "../../components/userPanel/ResultSummery";
import useResult from "../../hooks/useResult";
import useUsersApiHandlers from "../../hooks/useUsersApiHandlers";
import PageTitle from "../../components/common/PageTitle";
import { AnimatePresence, easeIn, motion } from "motion/react";
import { easeOut } from "motion";
const ResultPage = () => {
    const { pathname } = useLocation();
    const quizsetId = pathname.split("/")[2];
    const navigate = useNavigate();

    const { getQuizById, getAttempts } = useUsersApiHandlers();

    //get quiz attempts by react query
    const { isLoading, data, error } = useQuery({
        queryFn: getAttempts,
        queryKey: ["quizzes", quizsetId, "attempts"],
    });

    // get quizset by Id using react query
    const { data: quizzes, error: questionGetTimeError } = useQuery({
        queryFn: getQuizById,
        queryKey: ["quizzes", quizsetId],
    });

    const questionsList = quizzes?.data?.questions && quizzes?.data?.questions;
    const isIattempedted = quizzes?.data?.user_attempt?.attempted;
    console.log(`isAttempted`, isIattempedted);

    //get computed result
    const { mySubmittedAnswers } = useResult(data?.data && data?.data);

    !isIattempedted && navigate(`/quizzes/${quizsetId}`);

    return (
        <motion.div
            animate={{
                opacity: [0, 1],
                y: [-10, 0],
                transition: { duration: 0.3, ease: easeOut },
            }}
            className='bg-background text-foreground min-h-screen '>
            <PageTitle title='Quizzes - Result' />

            {isLoading ? (
                <ResultPageSkeliton />
            ) : error ? (
                <div className='!min-h-screen flex justify-center items-center bg-gray-200'>
                    <ErrorComponent />
                </div>
            ) : (
                <div className='min-h-screen'>
                    <Link to='/'>
                        <img
                            src={whiteLogoImage}
                            className='max-h-11 fixed left-6 top-6 z-50'
                        />
                    </Link>

                    <div className='flex flex-col lg:flex-row min-w-screen '>
                        <ResultSummery data={data?.data} />
                        <ResultDetails>
                            {questionGetTimeError ? (
                                <div className='flex justify-center items-center bg-gray-200 p-3'>
                                    <ErrorComponent />
                                </div>
                            ) : (
                                questionsList &&
                                questionsList.map((ques, index) => {
                                    return (
                                        <QuizWithAnswer
                                            index={index}
                                            mySubmittedAnswers={
                                                mySubmittedAnswers
                                            }
                                            key={ques.id}
                                            ques={ques}
                                        />
                                    );
                                })
                            )}
                        </ResultDetails>
                    </div>
                </div>
            )}
        </motion.div>
    );
};

export default ResultPage;
