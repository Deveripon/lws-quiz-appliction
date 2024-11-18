import useAuth from "./useAuth";

const useResult = (data) => {
    const { auth } = useAuth();

    // find the attempts of logged in user
    const myAttempts = data?.attempts?.find(
        (attempt) => attempt?.user?.id === auth?.user?.id
    );
    const mySubmittedAnswers = myAttempts?.submitted_answers;
    const correctAnswers = myAttempts?.correct_answers;

    const myCorrectAnswers = [];
    const myIncorrectAnswers = [];
    const getRightAndWrongAnswers = (correctAnswers, submittedAnswers) => {
        submittedAnswers &&
            submittedAnswers.forEach((submittedAns) => {
                // check that is I perticipate the question
                const correctAnswer = correctAnswers.find(
                    (correct) =>
                        correct.question_id === submittedAns.question_id
                );

                // if I perticipate than what my answer wrong or right
                if (correctAnswer) {
                    if (correctAnswer.answer === submittedAns.answer) {
                        myCorrectAnswers.push({
                            ...submittedAns,
                            marks: correctAnswer.marks,
                        });
                    } else {
                        myIncorrectAnswers.push({
                            ...submittedAns,
                            marks: correctAnswer.marks,
                        });
                    }
                }
            });

        return { myCorrectAnswers, myIncorrectAnswers };
    };

    getRightAndWrongAnswers(correctAnswers, mySubmittedAnswers);

    // Calculate total marks
    const totalCorrectMarks = myCorrectAnswers.reduce(
        (sum, obj) => sum + obj.marks,
        0
    );
    const totalIncorrectMarks = myIncorrectAnswers.reduce(
        (sum, obj) => sum + obj.marks,
        0
    );
    return {
        mySubmittedAnswers,
        correctAnswers,
        myCorrectAnswers,
        myIncorrectAnswers,
        totalCorrectMarks,
        totalIncorrectMarks,
        getRightAndWrongAnswers,
    };
};

export default useResult;
