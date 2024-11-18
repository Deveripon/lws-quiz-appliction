import { Helmet } from "react-helmet";
import QuizsetDetails from "../../components/userPanel/QuizsetDetails";
import QuizArea from "../../components/userPanel/QuizArea";
import Quiz from "../../components/userPanel/Quiz";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import { server_base_url } from "../../../constant";
import QuizPageSkeliton from "../../components/skelitons/quizPageSkeliton";
import { useState } from "react";
import ErrorComponent from "../../components/common/ErrorComponent";

const QuizPage = () => {
    const { api } = useAxios();
    const { pathname } = useLocation();
    const quizsetId = pathname.split("/")[2];
    const [showingIndex, setShowingIndex] = useState(0);
    const [answers, setAnswers] = useState({});

    // get quizset by Id query function
    const getQuizById = async ({ queryKey }) => {
        try {
            const response = await api.get(
                `${server_base_url}/quizzes/${queryKey[1]}`
            );
            if (response.status === 200) {
                return response.data;
            }
        } catch (error) {
            throw new Error(error);
        }
    };

    // get quiz by using react query
    const { isLoading, data, error } = useQuery({
        queryFn: getQuizById,
        queryKey: ["quizzes", quizsetId],
    });

    return (
        <main className='max-w-8xl mx-auto lg:h-[calc(100vh-10rem)]'>
            {isLoading ? (
                <QuizPageSkeliton />
            ) : error ? (
                <ErrorComponent />
            ) : (
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-10 h-full '>
                    <QuizsetDetails answers={answers} quizset={data?.data} />
                    <QuizArea>
                        <Quiz
                            showingIndex={showingIndex}
                            setShowingIndex={setShowingIndex}
                            answers={answers}
                            setAnswers={setAnswers}
                            quiz={data?.data}
                        />
                    </QuizArea>
                </div>
            )}
        </main>
    );
};

export default QuizPage;
