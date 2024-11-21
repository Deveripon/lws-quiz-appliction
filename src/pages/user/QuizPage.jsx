import QuizsetDetails from "../../components/userPanel/QuizsetDetails";
import QuizArea from "../../components/userPanel/QuizArea";
import Quiz from "../../components/userPanel/Quiz";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import QuizPageSkeliton from "../../components/skelitons/quizPageSkeliton";
import { useState } from "react";
import ErrorComponent from "../../components/common/ErrorComponent";
import useUsersApiHandlers from "../../hooks/useUsersApiHandlers";
import PageTitle from "../../components/common/PageTitle";

const QuizPage = () => {
    const { pathname } = useLocation();
    const quizsetId = pathname.split("/")[2];
    const [answers, setAnswers] = useState({});
    const { getQuizById } = useUsersApiHandlers();

    // get quiz by id using react query
    const { isLoading, data, error } = useQuery({
        queryFn: getQuizById,
        queryKey: ["quizzes", quizsetId],
    });

    return (
        <>
            <PageTitle title={`Quizzes - ${data?.data?.title}`} />
            <main className='max-w-8xl mx-auto lg:h-[calc(100vh-10rem)]'>
                {isLoading ? (
                    <QuizPageSkeliton />
                ) : error ? (
                    <ErrorComponent />
                ) : (
                    <div className='grid grid-cols-1 lg:grid-cols-3 gap-10 h-full '>
                        <QuizsetDetails
                            answers={answers}
                            quizset={data?.data}
                        />
                        <QuizArea>
                            <Quiz
                                answers={answers}
                                setAnswers={setAnswers}
                                quiz={data?.data}
                            />
                        </QuizArea>
                    </div>
                )}
            </main>
        </>
    );
};

export default QuizPage;
