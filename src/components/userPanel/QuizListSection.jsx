import UsersQuizsetCard from "./UsersQuizsetCard";

const QuizListSection = () => {
    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6'>
            <UsersQuizsetCard />
            <UsersQuizsetCard />
            <UsersQuizsetCard />
            <UsersQuizsetCard />
        </div>
    );
};

export default QuizListSection;
