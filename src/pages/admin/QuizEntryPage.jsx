import { useLocation } from "react-router-dom";
import BreadCrumbs from "../../components/admin-panel/BreadCrumbs";
import QuizEntryList from "../../components/admin-panel/QuizEntryList";
import QuizsetInfo from "../../components/admin-panel/QuizsetInfo";
import useAdminApiHandlers from "../../hooks/useAdminApiHandlers";
import { useQuery } from "@tanstack/react-query";
import QuizSetEntryPageSkeliton from "../../components/skelitons/QuizSetEntryPageSkeliton";
import ErrorComponent from "../../components/common/ErrorComponent";
import QuizForm from "../../components/admin-panel/forms/QuizForm";
import { useState } from "react";
import QuizEntry from "../../components/admin-panel/QuizEntry";
import { getSortedQuestions } from "../../utils";
import NoData from "../../components/common/NoData";

const QuizEntryPage = () => {
    const { pathname } = useLocation();
    const quizsetId = pathname.split("/")[4];
    const { getAllQuizSet } = useAdminApiHandlers();
    const [dataToEdit, setDataToEdit] = useState(null);

    //get all quize sets
    const { isLoading, data, error } = useQuery({
        queryFn: getAllQuizSet,
        queryKey: ["admin", "quizzes"],
    });

    const thisQuizData = data && data?.find((quiz) => quiz.id === quizsetId);

    function handleDataToEdit(data) {
        setDataToEdit(data);
    }

    return isLoading ? (
        <QuizSetEntryPageSkeliton />
    ) : error ? (
        <ErrorComponent />
    ) : (
        <main className='md:flex-grow px-4 sm:px-6 lg:px-8 py-8'>
            <div>
                <BreadCrumbs />
                <div className='grid grid-cols-1 lg:grid-cols-2 md:gap-8 lg:gap-12'>
                    <div className=''>
                        <QuizsetInfo quiz={thisQuizData} />
                        <div className='space-y-4 mb-12'>
                            <QuizForm
                                quiz={thisQuizData}
                                initialData={dataToEdit}
                                setDataToEdit={setDataToEdit}
                            />
                        </div>
                    </div>

                    <QuizEntryList>
                        {thisQuizData?.Questions &&
                        thisQuizData?.Questions.length > 0 ? (
                            getSortedQuestions(thisQuizData.Questions).map(
                                (question, index) => (
                                    <QuizEntry
                                        key={question.id}
                                        index={index}
                                        question={question}
                                        handleDataToEdit={handleDataToEdit}
                                    />
                                )
                            )
                        ) : (
                            <div className='flex place-content-center'>
                                <NoData
                                    text={`You don't have added ant question yet.`}
                                />
                            </div>
                        )}
                    </QuizEntryList>
                </div>
            </div>
        </main>
    );
};

export default QuizEntryPage;
