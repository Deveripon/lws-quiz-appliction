import { useQuery } from "@tanstack/react-query";
import QuizListSection from "../../components/userPanel/QuizListSection";
import UsersQuizsetCard from "../../components/userPanel/UsersQuizsetCard";
import UserWelcomeSection from "../../components/userPanel/UserWelcomeSection";
import useAuth from "../../hooks/useAuth";
import { getQuizsetList } from "../../api/public";
import QuizCardSkeleton from "../../components/skelitons/QuizCardSkeliton";
import ErrorComponent from "../../components/common/ErrorComponent";
import { server_base_url } from "../../../constant";
import useAxios from "../../hooks/useAxios";

const HomePage = () => {
    const { auth } = useAuth();
    const { api } = useAxios();

    //Get quiz set list query function
    const getQuizsetList = async () => {
        try {
            const response = await api.get(`${server_base_url}/quizzes`);
            if (response.status === 200) {
                return response.data;
            } else {
                throw new Error(
                    "There was an error while fatching quizset list"
                );
            }
        } catch (error) {
            throw new Error(error);
        }
    };

    //get quiz list by React Query
    const { isLoading, data, error } = useQuery({
        queryFn: getQuizsetList,
        queryKey: ["quizzes"],
    });
    const quizList = data?.data;

    return (
        <>
            {auth?.user && <UserWelcomeSection />}
            <main className='bg-white p-6 rounded-md h-full'>
                <section>
                    <h3 className='text-2xl font-bold mb-6'>
                        Participate In Quizees
                    </h3>

                    {isLoading ? (
                        <QuizCardSkeleton />
                    ) : error ? (
                        <ErrorComponent />
                    ) : (
                        <QuizListSection>
                            {quizList &&
                                quizList.length > 0 &&
                                quizList.map((quizSet) => (
                                    <UsersQuizsetCard
                                        key={quizSet?.id}
                                        quizSet={quizSet}
                                    />
                                ))}
                        </QuizListSection>
                    )}
                </section>
            </main>
        </>
    );
};

export default HomePage;
