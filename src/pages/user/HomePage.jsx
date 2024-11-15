import QuizListSection from "../../components/userPanel/QuizListSection";
import UserWelcomeSection from "../../components/userPanel/UserWelcomeSection";

const HomePage = () => {
    return (
        <>
            <UserWelcomeSection />
            <main className='bg-white p-6 rounded-md h-full'>
                <section>
                    <h3 className='text-2xl font-bold mb-6'>
                        Participate In Quizees
                    </h3>
                    <QuizListSection />
                </section>
            </main>
        </>
    );
};

export default HomePage;
