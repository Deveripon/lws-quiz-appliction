import { useState } from "react";
import { createPortal } from "react-dom";
import { ArrowLeft, ArrowRight, Save } from "react-feather";
import ConfirmationPopup from "../common/ConfirmationPopup";
import { useMutation } from "@tanstack/react-query";
import { server_base_url } from "../../../constant";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Alert from "../common/Alert";

const Quiz = ({ quiz, showingIndex, setShowingIndex, answers, setAnswers }) => {
    const [alert, setAlert] = useState({
        status: false,
        text: "",
    });
    const { api } = useAxios();
    const [showPopup, setShowPopup] = useState(false);
    const { auth } = useAuth();
    const currentQuestion = quiz && quiz?.questions[showingIndex];
    const totalAnswer = Object.keys(answers).length;
    const navigate = useNavigate();

    // Submit Quiz mutation function
    const submitQuizAnswer = async (answers) => {
        try {
            const response = await api.post(
                `${server_base_url}/quizzes/${quiz?.id}/attempt`,
                { answers },
                {
                    headers: {
                        Authorization: `Bearer ${auth.accessToken}`,
                    },
                }
            );
            console.log(response);

            if (response.status === 200) {
                return response.data;
            } else {
                throw new Error("There was an error while submitting the quiz");
            }
        } catch (error) {
            console.log(error);

            throw new Error(error);
        }
    };

    // mutation to submit quiz
    const { mutate, data, isPending } = useMutation({
        mutationFn: submitQuizAnswer,
        mutationKey: ["quizzes", quiz?.id, "attempt"],
        onSuccess: (response) => {
            console.log(response);
            navigate(`/result/${quiz.id}`, { replace: true });
        },
    });

    // handle submittion confirm
    function onConfirm() {
        setShowPopup(false);
        mutate(answers);
    }

    // handle submittion cancel
    function onCancel() {
        setShowPopup(false);
    }

    console.log(`getting aswers`, answers);

    return (
        <div className='bg-white p-6 !pb-2 rounded-md'>
            {showPopup &&
                createPortal(
                    <ConfirmationPopup
                        onConfirm={onConfirm}
                        onCancel={onCancel}>
                        <h4>
                            Are you sure you want to submit the quiz? you
                            answered{" "}
                            <span className='font-semibold'>{totalAnswer}</span>{" "}
                            questions out of{" "}
                            <span className='font-semibold'>
                                {quiz.questions.length}
                            </span>{" "}
                            questions. Once you submitted the quiz, you will not
                            be able to re-submit.
                        </h4>
                    </ConfirmationPopup>,
                    document.body
                )}
            <div className='flex justify-between items-center mb-4'>
                <h3 className='text-2xl font-semibold'>
                    {showingIndex + 1}. {currentQuestion.question}
                </h3>
            </div>
            <div className='grid grid-cols-2 gap-4'>
                {currentQuestion?.options
                    .sort(() => Math.random() - 0.9)
                    .map((option, index) => (
                        <label
                            key={index}
                            className='flex items-center space-x-3 py-3 px-4 bg-primary/5 rounded-md text-lg'>
                            <input
                                onChange={(e) => {
                                    setAnswers((prevAnswers) => {
                                        // If checked, add the answer; if unchecked, remove it
                                        if (e.target.checked) {
                                            return {
                                                ...prevAnswers,
                                                [currentQuestion?.id]: option,
                                            };
                                        } else {
                                            // Remove the answer when unchecked
                                            const updatedData = { ...answers };
                                            delete updatedData[
                                                currentQuestion.id
                                            ];
                                            return updatedData;
                                        }
                                    });
                                }}
                                type='checkbox'
                                name={currentQuestion?.id}
                                className='form-radio text-buzzr-purple'
                                checked={answers[currentQuestion.id] === option}
                            />
                            <span>{option}</span>
                        </label>
                    ))}
            </div>
            <p className='text-gray-500 text-sm mt-5'>
                ℹ️ Only one correct option, if you select more than one, it will
                be counted as wrong.
            </p>
            {alert.status && <Alert text={alert.text} setState={setAlert} />}

            {/*   buttons for navigate between quizes */}
            <div className='flex items-center w-full'>
                {/*  Previous button to navigate previous Quiz */}
                {showingIndex > 0 && (
                    <button
                        onClick={() => {
                            setShowingIndex(showingIndex - 1);
                        }}
                        disabled={showingIndex === 0}
                        className='pagination-button flex gap-2'>
                        <ArrowLeft /> Previous
                    </button>
                )}

                <div className='flex ml-auto'>
                    {/*  Next button to navigate Next Quiz */}
                    {showingIndex + 1 < quiz?.questions?.length && (
                        <button
                            onClick={() => {
                                if (
                                    currentQuestion.id in answers &&
                                    answers[currentQuestion.id] !== ""
                                ) {
                                    setShowingIndex(showingIndex + 1);
                                } else {
                                    setAlert({
                                        status: true,
                                        text: "You have to answer this question before go to next question ",
                                    });
                                }
                            }}
                            disabled={
                                showingIndex + 1 === quiz?.questions?.length
                            }
                            className='pagination-button flex gap-2 w-[100px]'>
                            Next <ArrowRight />
                        </button>
                    )}

                    {/*  submit button to Submit all answers */}
                    {showingIndex + 1 === quiz?.questions?.length && (
                        <button
                            onClick={() => {
                                if (
                                    currentQuestion.id in answers &&
                                    answers[currentQuestion.id] !== ""
                                ) {
                                    setShowPopup(true);
                                } else {
                                    setAlert({
                                        status: true,
                                        text: "You have to answer all the questions before submit",
                                    });
                                }
                            }}
                            className='pagination-button flex gap-2 w-[140px]'>
                            <Save /> Submit
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Quiz;