import BreadCrumbs from "../../components/admin-panel/BreadCrumbs";
import CreateQuizForm from "../../components/admin-panel/forms/CreateQuizForm";
import QuizActions from "../../components/admin-panel/QuizActions";
import QuizEntryList from "../../components/admin-panel/QuizEntryList";
import QuizsetInfo from "../../components/admin-panel/QuizsetInfo";
import QuizWithAnswer from "../../components/common/QuizWithAnswer";

const QuizEntryPage = () => {
    return (
        <main className='md:flex-grow px-4 sm:px-6 lg:px-8 py-8'>
            <div>
                <BreadCrumbs />
                <div className='grid grid-cols-1 lg:grid-cols-2 md:gap-8 lg:gap-12'>
                    <div className=''>
                        <QuizsetInfo />
                        <div className='space-y-4'>
                            <h2 className='text-xl font-bold text-foreground'>
                                Create Quiz
                            </h2>
                            <CreateQuizForm />
                        </div>
                    </div>

                    <QuizEntryList>
                        <QuizWithAnswer>
                            <QuizActions />
                        </QuizWithAnswer>{" "}
                        <QuizWithAnswer>
                            <QuizActions />
                        </QuizWithAnswer>{" "}
                        <QuizWithAnswer>
                            <QuizActions />
                        </QuizWithAnswer>
                    </QuizEntryList>
                </div>
            </div>
        </main>
    );
};

export default QuizEntryPage;
