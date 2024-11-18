import LeaderBoard from "../../components/userPanel/LeaderBoard";
import ScoreLeader from "../../components/userPanel/ScoreLeader";
import SelfResultCard from "../../components/userPanel/SelfResultCard";
import TopFives from "../../components/userPanel/TopFives";

const LeaderBoardPage = () => {
    return (
        <main className='min-h-[calc(100vh-140px)] flex items-center justify-center'>
            <LeaderBoard>
                <SelfResultCard />
                <TopFives>
                    <ScoreLeader highlight={true} />
                    <ScoreLeader />
                    <ScoreLeader />
                    <ScoreLeader />
                    <ScoreLeader />
                </TopFives>
            </LeaderBoard>
        </main>
    );
};

export default LeaderBoardPage;
