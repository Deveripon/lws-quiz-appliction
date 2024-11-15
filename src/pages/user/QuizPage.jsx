import { Helmet } from "react-helmet";
import QuizsetDetails from "../../components/userPanel/QuizsetDetails";
import QuizArea from "../../components/userPanel/QuizArea";
import Quiz from "../../components/userPanel/Quiz";

const QuizPage = () => {
    return (
        <main className='max-w-8xl mt-[-16px]  mx-auto h-[calc(100vh-10rem)]'>
            <Helmet>
                <title>Quizzes - React Hooks Quiz </title>
            </Helmet>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-10 h-full'>
                <QuizsetDetails />
                <QuizArea>
                    <Quiz />
                </QuizArea>
            </div>
        </main>
    );
};

export default QuizPage;
