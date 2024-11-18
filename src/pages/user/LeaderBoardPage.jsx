import { useLocation } from "react-router-dom";
import LeaderBoard from "../../components/userPanel/LeaderBoard";
import ScoreLeader from "../../components/userPanel/ScoreLeader";
import SelfResultCard from "../../components/userPanel/SelfResultCard";
import TopFives from "../../components/userPanel/TopFives";
import useAxios from "../../hooks/useAxios";
import { server_base_url } from "../../../constant";
import { useQuery } from "@tanstack/react-query";
import LeaderBoardPageSkeliton from "../../components/skelitons/LeaderBoardPageSkeliton";
import ErrorComponent from "../../components/common/ErrorComponent";
import useAuth from "../../hooks/useAuth";
import useResult from "../../hooks/useResult";
import { attempt } from "lodash";

const LeaderBoardPage = () => {
    const location = useLocation();
    const quizsetId = location.pathname.split("/")[2];
    const { api } = useAxios();
    const { auth } = useAuth();

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

    // attemps query with react query
    const { isLoading, data, error } = useQuery({
        queryFn: getAttempts,
        queryKey: ["leaderboard", quizsetId],
    });

    const {
        totalCorrectMarks,
        myIncorrectAnswers,
        myCorrectAnswers,
        leaderboard,
    } = useResult(data?.data && data?.data);

    console.log(leaderboard);
    const myPosition =
        leaderboard &&
        leaderboard.find((leader) => leader.userId === auth.user.id);

    console.log(myPosition);

    return isLoading ? (
        <LeaderBoardPageSkeliton />
    ) : error ? (
        <ErrorComponent />
    ) : (
        <main className='min-h-[calc(100vh-140px)] flex items-center justify-center'>
            <LeaderBoard>
                <SelfResultCard
                    user={auth.user}
                    myCorrectAnswers={myCorrectAnswers}
                    myIncorrectAnswers={myIncorrectAnswers}
                    totalCorrectMarks={totalCorrectMarks}
                    myPosition={myPosition}
                />
                <TopFives quiz={data?.data.quiz}>
                    {leaderboard &&
                        leaderboard
                            .slice(0, 5)
                            .map((leader, index) => (
                                <ScoreLeader
                                    key={leader.userId}
                                    highlight={
                                        leader.userId === auth.user.id &&
                                        leader.position <= 5
                                    }
                                    leader={leader}
                                />
                            ))}
                </TopFives>
            </LeaderBoard>
        </main>
    );
};

export default LeaderBoardPage;
