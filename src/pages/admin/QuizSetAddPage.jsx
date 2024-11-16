import BreadCrumbs from "../../components/admin-panel/BreadCrumbs";
import QuizsetCreateForm from "../../components/admin-panel/forms/QuizsetCreateForm";

const QuizSetAddPage = () => {
    return (
        <main className='md:flex-grow px-4 sm:px-6 lg:px-8 py-8'>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                {/* Left Column */}
                <div>
                    <BreadCrumbs />
                    <h2 className='text-3xl font-bold mb-6'>
                        Give your quiz title and description
                    </h2>
                    <QuizsetCreateForm />
                </div>
            </div>
        </main>
    );
};

export default QuizSetAddPage;
