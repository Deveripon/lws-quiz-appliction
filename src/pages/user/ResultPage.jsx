import { useQuery } from "@tanstack/react-query";
import { Link, useLocation, useNavigate } from "react-router-dom";
import whiteLogoImage from "../../assets/logo-white.svg";
import ErrorComponent from "../../components/common/ErrorComponent";
import PageTitle from "../../components/common/PageTitle";
import QuizWithAnswer from "../../components/common/QuizWithAnswer";
import ResultPageSkeliton from "../../components/skelitons/ResultPageSkeliton";
import ResultDetails from "../../components/userPanel/ResultDetails";
import ResultSummery from "../../components/userPanel/ResultSummery";
import useResult from "../../hooks/useResult";
import useUsersApiHandlers from "../../hooks/useUsersApiHandlers";
import useAuth from "../../hooks/useAuth";
import { useEffect } from "react";

const ResultPage = () => {
    const { pathname } = useLocation();
    const quizsetId = pathname.split("/")[2];
    const { auth } = useAuth();
    const navigate = useNavigate();

    const { getQuizById, getAttempts } = useUsersApiHandlers();

    //get quiz attempts by react query
    const { isLoading, data, error } = useQuery({
        queryFn: getAttempts,
        queryKey: ["quizzes", quizsetId, "attempts"],
    });

    //check that user already attemted this quiz or not
    const allAttempts = data?.data?.attempts;
    const isIattempted =
        allAttempts &&
        allAttempts.find((attemped) => attemped?.user?.id === auth?.user?.id);

    //return the user to home page if he directly hit this url without submitting answer
    useEffect(() => {
        if (!isIattempted) {
            navigate("/", { replace: true });
        }
    }, [isIattempted, navigate]);

    // get quizset by using react query
    const { data: quizzes, error: questionGetTimeError } = useQuery({
        queryFn: getQuizById,
        queryKey: ["quizzes", quizsetId],
    });

    const questionsList = quizzes?.data?.questions && quizzes?.data?.questions;

    //get computed result
    const { mySubmittedAnswers } = useResult(data?.data && data?.data);

    return isLoading ? (
        <ResultPageSkeliton />
    ) : error ? (
        <div className='!min-h-screen flex justify-center items-center bg-gray-200'>
            <ErrorComponent />
        </div>
    ) : (
        <div className='bg-background text-foreground min-h-screen '>
            <PageTitle title={`Quizzes - Result`} />
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
                                        mySubmittedAnswers={mySubmittedAnswers}
                                        key={ques.id}
                                        ques={ques}
                                    />
                                );
                            })
                        )}
                    </ResultDetails>
                </div>
            </div>
        </div>
    );
};

export default ResultPage;
