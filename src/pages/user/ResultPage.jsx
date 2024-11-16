import { Link } from "react-router-dom";
import whiteLogoImage from "../../assets/logo-white.svg";
import ResultSummery from "../../components/userPanel/ResultSummery";
import ResultDetails from "../../components/userPanel/ResultDetails";
import { Helmet } from "react-helmet";
import QuizWithAnswer from "../../components/common/QuizWithAnswer";

const ResultPage = () => {
    return (
        <div className='bg-background text-foreground min-h-screen'>
            <Helmet>
                <title>Quizzes - Result</title>
            </Helmet>
            <div className='flex min-h-screen overflow-hidden'>
                <Link to='/'>
                    <img
                        src={whiteLogoImage}
                        className='max-h-11 fixed left-6 top-6 z-50'
                    />
                </Link>

                <ResultSummery />
                <ResultDetails>
                    <QuizWithAnswer />
                    <QuizWithAnswer />
                    <QuizWithAnswer />
                </ResultDetails>
            </div>
        </div>
    );
};

export default ResultPage;
