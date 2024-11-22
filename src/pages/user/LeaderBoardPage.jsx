import { useLocation, useNavigate } from "react-router-dom";
import LeaderBoard from "../../components/userPanel/LeaderBoard";
import ScoreLeader from "../../components/userPanel/ScoreLeader";
import SelfResultCard from "../../components/userPanel/SelfResultCard";
import TopFives from "../../components/userPanel/TopFives";
import { useQuery } from "@tanstack/react-query";
import LeaderBoardPageSkeliton from "../../components/skelitons/LeaderBoardPageSkeliton";
import ErrorComponent from "../../components/common/ErrorComponent";
import useAuth from "../../hooks/useAuth";
import useResult from "../../hooks/useResult";
import useUsersApiHandlers from "../../hooks/useUsersApiHandlers";
import PageTitle from "../../components/common/PageTitle";

const LeaderBoardPage = () => {
    const location = useLocation();
    const quizsetId = location.pathname.split("/")[2];
    const { auth } = useAuth();
    const { getAttempts } = useUsersApiHandlers();
    const navigate = useNavigate();

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

    console.log(`loggedInUser`, auth?.user);

    console.log(`attempted users`, data);

    const myPosition =
        leaderboard &&
        leaderboard.find((leader) => leader.userId === auth.user.id);
    const allAttempts = data && data?.data?.attempts;

    const isUserAttempts =
        allAttempts &&
        allAttempts.find((attempt) => attempt?.user?.id === auth?.user?.id);

    return isLoading ? (
        <LeaderBoardPageSkeliton />
    ) : error ? (
        <ErrorComponent />
    ) : !isUserAttempts ? (
        navigate(`/quizzes/${quizsetId}`)
    ) : (
        <>
            <PageTitle title={"Qizzes - Leaderboard"} />
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
                        {/*    */}
                        {leaderboard &&
                            leaderboard
                                .slice(0, 5)
                                .map((leader) => (
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
        </>
    );
};

export default LeaderBoardPage;
