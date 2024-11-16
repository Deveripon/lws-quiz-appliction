import AdminsQuizsetCard from "../../components/admin-panel/AdminsQuizsetCard";
import CreateNewQuizButton from "../../components/admin-panel/CreateNewQuizButton";
import Greetings from "../../components/admin-panel/Greetings";
import QuizsetList from "../../components/admin-panel/QuizsetList";

const DashboardPage = () => {
    return (
        <main className='flex-grow p-10'>
            <Greetings />
            <QuizsetList>
                <CreateNewQuizButton />
                <AdminsQuizsetCard />
                <AdminsQuizsetCard />
                <AdminsQuizsetCard />
            </QuizsetList>
        </main>
    );
};

export default DashboardPage;
