import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAdminApiHandlers from "../../hooks/useAdminApiHandlers";
import { createPortal } from "react-dom";
import ConfirmationPopup from "../common/ConfirmationPopup";
import { useState } from "react";

const QuizActions = ({ handleDataToEdit, question, quizSet }) => {
    const [isShow, setIsShow] = useState(false);
    const queryClient = useQueryClient();
    const { deleteQuestion, updateQuizSet } = useAdminApiHandlers();

    // mutation to delete question
    const { mutate } = useMutation({
        mutationFn: (questionId) => deleteQuestion(questionId),
        onSuccess: () => {
            queryClient.invalidateQueries(["admin", "quizzes"]);
        },
    });

    const { mutate: updateQuiz } = useMutation({
        mutationFn: ({ quizSetId, data }) => updateQuizSet(quizSetId, data),
        onSuccess: () => {
            queryClient.invalidateQueries(["admin", "quizzes"]);
        },
    });

    // handle delete confirm
    function onConfirm() {
        // if this is the last question than change quiz to draft before delete last quiz
        if (quizSet?.Questions.length === 1) {
            const quizSetId = quizSet?.id;
            const data = {
                status: "draft",
            };
            updateQuiz({ quizSetId, data });
        }
        mutate(question?.id);
    }

    // handle delete cofirm cancel
    function onCancel() {
        setIsShow(false);
        return false;
    }

    return (
        <div className='flex space-x-4 dark:text-dark-textPrimary dark:bg-gray-800 bg-primary/10 px-6 py-2 min-h-[40px]'>
            {isShow &&
                createPortal(
                    <ConfirmationPopup
                        onCancel={onCancel}
                        onConfirm={onConfirm}>
                        Are You Sure, you going to delete this question. This
                        process can not be undone.
                    </ConfirmationPopup>,
                    document.body
                )}
            <button
                onClick={() => setIsShow(true)}
                className='text-red-600 hover:text-red-800 font-medium'>
                Delete
            </button>
            <button
                onClick={() => handleDataToEdit(question)}
                className='text-primary dark:text-dark-textPrimary dark:hover:text-gray-500  hover:text-primary/60 duration-200 font-medium'>
                Edit Question
            </button>
        </div>
    );
};

export default QuizActions;
