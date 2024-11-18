import { Link, useLocation } from "react-router-dom";
import whiteLogoImage from "../../assets/logo-white.svg";
import ResultSummery from "../../components/userPanel/ResultSummery";
import ResultDetails from "../../components/userPanel/ResultDetails";
import QuizWithAnswer from "../../components/common/QuizWithAnswer";
import useAxios from "../../hooks/useAxios";
import { server_base_url } from "../../../constant";
import { useQuery } from "@tanstack/react-query";
import ResultPageSkeliton from "../../components/skelitons/ResultPageSkeliton";

const ResultPage = () => {
    const { api } = useAxios();
    const { pathname } = useLocation();
    const quizsetId = pathname.split("/")[2];

    //get quiz result by using react query
    const getQuizById = async ({ queryKey }) => {
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

    const { isLoading, data, error } = useQuery({
        queryFn: getQuizById,
        queryKey: ["quizzes", quizsetId, "attempts"],
    });

    return (
        <div className='bg-background text-foreground min-h-screen'>
            {isLoading ? (
                <ResultPageSkeliton />
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
                            <QuizWithAnswer />
                            <QuizWithAnswer />
                            <QuizWithAnswer />
                        </ResultDetails>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ResultPage;
