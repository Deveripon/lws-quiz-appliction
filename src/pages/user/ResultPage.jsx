import { Link } from "react-router-dom";
import whiteLogoImage from "../../assets/logo-white.svg";
import ResultSummery from "../../components/userPanel/ResultSummery";
import ResultDetails from "../../components/userPanel/ResultDetails";
import QuestionWithAnswer from "../../components/userPanel/QuestionWithAnswer";
const ResultPage = () => {
    return (
        <div className='bg-background text-foreground min-h-screen'>
            <div className='flex min-h-screen overflow-hidden'>
                <Link to='/'>
                    <img
                        src={whiteLogoImage}
                        className='max-h-11 fixed left-6 top-6 z-50'
                    />
                </Link>

                <ResultSummery />
                <ResultDetails>
                    <QuestionWithAnswer />
                    <QuestionWithAnswer />
                    <QuestionWithAnswer />
                    <QuestionWithAnswer />
                </ResultDetails>
            </div>
        </div>
    );
};

export default ResultPage;
