export const getImgURL = (fileName) => {
    return new URL(`../assets/backgrounds/${fileName}`, import.meta.url).href;
};

export const getRightAndWrongAnswers = (correctAnswers, submittedAnswers) => {
    const correct = [];
    const incorrect = [];

    submittedAnswers.map((submittedAns) => {
        const correctAnswer = correctAnswers.find(
            (correct) => correct.question_id === submittedAns.question_id
        );

        if (correctAnswer) {
            if (correctAnswer.answer === submittedAns.answer) {
                correct.push({ ...submittedAns, marks: correctAnswer.marks });
            } else {
                incorrect.push({ ...submittedAns, marks: correctAnswer.marks });
            }
        }
    });

    // Calculate total marks
    const totalCorrectMarks = correct.reduce((sum, obj) => sum + obj.marks, 0);
    const totalIncorrectMarks = incorrect.reduce(
        (sum, obj) => sum + obj.marks,
        0
    );

    return { correct, incorrect, totalCorrectMarks, totalIncorrectMarks };
};
