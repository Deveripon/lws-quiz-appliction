import { Link } from "react-router-dom";
import QuizIcon from "../../svg/QuizIcon";
import cn from "../../utils/cn";

const AdminsQuizsetCard = ({ quizCard }) => {
    return (
        <Link to={`/admin/dashboard/quizzes/${quizCard?.id}`}>
            <div
                className={cn(
                    `bg-white ring-primary p-6 rounded-lg shadow-sm border  border-gray-200 group cursor-pointer`,
                    quizCard.status === "draft" && "bg-gray-400/50",
                    quizCard.status === "published" && "bg-yellow-400"
                )}>
                <div className='text-buzzr-purple mb-4 group-hover:scale-105 transition-all'>
                    <QuizIcon />
                </div>
                <h3 className='font-semibold text-lg mb-2 group-hover:scale-105 transition-all'>
                    {quizCard?.title}
                </h3>
                <p className='text-gray-600 text-sm group-hover:scale-105 truncate  text-clip transition-all'>
                    {quizCard?.description}
                </p>
            </div>
        </Link>
    );
};

export default AdminsQuizsetCard;
