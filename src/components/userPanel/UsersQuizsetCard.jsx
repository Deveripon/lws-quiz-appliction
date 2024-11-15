import { useState } from "react";
import bg1 from "../../assets/backgrounds/1.jpeg";
import bg2 from "../../assets/backgrounds/2.jpg";
import bg3 from "../../assets/backgrounds/3.jpg";
import bg4 from "../../assets/backgrounds/4.jpg";
import bg5 from "../../assets/backgrounds/5.jpg";
import bg6 from "../../assets/backgrounds/6.jpg";
import bg7 from "../../assets/backgrounds/7.jpg";
import bg8 from "../../assets/backgrounds/8.jpg";
import { useNavigate } from "react-router-dom";

const bgImage = [bg1, bg2, bg3, bg4, bg5, bg6, bg7, bg8];

const UsersQuizsetCard = () => {
    const [image] = useState(
        bgImage[Math.floor(Math.random() * bgImage.length)]
    );
    const navigate = useNavigate();

    const attemped = true;

    function handleClick() {
        if (!attemped) {
            navigate("/quiz/1");
        } else {
            navigate("/result/1");
        }
    }

    return (
        <div
            onClick={handleClick}
            className='rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow max-h-[450px] relative group cursor-pointer '>
            <div className='absolute transition-all text-white  text-center top-1/2 -translate-y-1/2 px-4'>
                <h1 className=' text-5xl' style={{ fontFamily: "Jaro" }}>
                    JavaScript Basic Quiz
                </h1>
                <p className='mt-2 text-lg'>
                    Test your knowledge of JavaScript basics with quizzes that
                    cover essential concepts, syntax, and foundational
                    programming skills
                </p>
            </div>
            <div className='hidden absolute transition-all bg-black/80 w-full h-full left-0 top-0 text-white group-hover:grid place-items-center'>
                <div>
                    <h1 className='text-3xl font-bold'>Already Participated</h1>
                    <p className='text-center'>You got 20 out of 50</p>
                </div>
            </div>
            <img
                src={image}
                alt='JavaScript Hoisting'
                className='w-full h-full object-cover rounded mb-4 '
            />
        </div>
    );
};

export default UsersQuizsetCard;
