import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getImgURL } from "../../utils";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { server_base_url } from "../../../constant";
import useAxios from "../../hooks/useAxios";
import useResult from "../../hooks/useResult";

const bgImage = [1, 2, 3, 4, 5, 6, 7, 8];

// get dynamic image url
const UsersQuizsetCard = ({ quizSet }) => {
    const { auth } = useAuth();
    const { api } = useAxios();
    const [image] = useState(
        bgImage[Math.floor(Math.random() * bgImage.length)]
    );
    const navigate = useNavigate();

    //get quiz atttempts to calculate logic
    const getAttempts = async ({ queryKey }) => {
        try {
            const response = await api.get(
                `${server_base_url}/quizzes/${queryKey[1]}/attempts`
            );
            if (response.status === 200) {
                return response.data;
            } else {
                throw new Error("There was an error while fatching result");
            }
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    };

    //attempt query
    const { isLoading, data, error } = useQuery({
        queryFn: getAttempts,
        queryKey: ["quizzes", quizSet.id, "attempts"],
    });

    //check that user already attemted this quiz or not
    const allAttempts = data?.data?.attempts;
    const isIattempted =
        allAttempts &&
        allAttempts.find((attemped) => attemped.user.id === auth.user.id);

    //get users result on this quiz
    const { totalCorrectMarks } = useResult(data?.data);

    // handle quiz click
    function handleClick() {
        if (!isIattempted) {
            navigate(`/quizzes/${quizSet.id}`);
        } else {
            navigate(`/result/${quizSet.id}`);
        }
    }

    return (
        <div
            onClick={handleClick}
            className='rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow max-h-[450px] relative group cursor-pointer '>
            <div className='absolute transition-all text-white  text-center top-1/2 -translate-y-1/2 px-4'>
                <h1 className=' text-5xl' style={{ fontFamily: "Jaro" }}>
                    {quizSet.title}
                </h1>
                <p className='mt-2 text-lg'>{quizSet.description}</p>
            </div>
            <div className='hidden absolute transition-all bg-black/80 w-full h-full left-0 top-0 text-white group-hover:grid place-items-center'>
                <div>
                    {auth.user ? (
                        isIattempted ? (
                            <>
                                <h1 className='text-3xl font-bold'>
                                    Already Participated
                                </h1>
                                <p className='text-center'>
                                    You got{" "}
                                    {totalCorrectMarks && totalCorrectMarks} out
                                    of {data?.data?.quiz?.total_marks}
                                </p>
                            </>
                        ) : (
                            <h1 className='text-3xl font-bold'>
                                Ready To Take Quiz
                            </h1>
                        )
                    ) : (
                        <h1 className='text-3xl font-bold'>
                            Sign in To Take Quiz
                        </h1>
                    )}
                </div>
            </div>
            <img
                src={getImgURL(`${image}.jpg`)}
                alt='JavaScript Hoisting'
                className='w-full h-full object-cover rounded mb-4 '
            />
        </div>
    );
};

export default UsersQuizsetCard;
