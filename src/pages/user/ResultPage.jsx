import { Link, useLocation } from "react-router-dom";
import whiteLogoImage from "../../assets/logo-white.svg";
import ResultSummery from "../../components/userPanel/ResultSummery";
import ResultDetails from "../../components/userPanel/ResultDetails";
import QuizWithAnswer from "../../components/common/QuizWithAnswer";
import useAxios from "../../hooks/useAxios";
import { server_base_url } from "../../../constant";
import { useQuery } from "@tanstack/react-query";
import ResultPageSkeliton from "../../components/skelitons/ResultPageSkeliton";
import ErrorComponent from "../../components/common/ErrorComponent";
import useResult from "../../hooks/useResult";

const ResultPage = () => {
    const { api } = useAxios();
    const { pathname } = useLocation();
    const quizsetId = pathname.split("/")[2];

    // get quizset by Id query Function
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

    //get Attemps query function
    const getAttempts = async ({ queryKey }) => {
        try {
            const response = await api.get(
                `${server_base_url}/quizzes/${queryKey[1]}/attempts`
            );
            if (response.status === 200) {
                return response.data;
            } else {
                throw new Error("There was an error while fatching result");
            }
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    };

    //get quiz attempts by react query
    const { isLoading, data, error } = useQuery({
        queryFn: getAttempts,
        queryKey: ["quizzes", quizsetId, "attempts"],
    });

    // get quizset by using react query
    const {
        isLoading: loading,
        data: quizzes,
        error: questionGetTimeError,
    } = useQuery({
        queryFn: getQuizById,
        queryKey: ["quizzes", quizsetId],
    });

    const questionsList = quizzes?.data?.questions && quizzes?.data?.questions;
    // get computed result
    const { mySubmittedAnswers } = useResult(data?.data && data?.data);

    console.log(`Mysubmitted`, mySubmittedAnswers);
    console.log(`questions`, quizzes);
    console.log(`attempted`, data);

    return (
        <div className='bg-background text-foreground min-h-screen'>
            {isLoading ? (
                <ResultPageSkeliton />
            ) : error ? (
                <ErrorComponent />
            ) : (
                <div className='flex min-h-screen overflow-hidden'>
                    <Link to='/'>
                        <img
                            src={whiteLogoImage}
                            className='max-h-11 fixed left-6 top-6 z-50'
                        />
                    </Link>

                    <div className='flex flex-col lg:flex-row'>
                        <ResultSummery data={data?.data} />
                        <ResultDetails>
                            {questionGetTimeError ? (
                                <h1>Loading ....</h1>
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
        </div>
    );
};

export default ResultPage;
