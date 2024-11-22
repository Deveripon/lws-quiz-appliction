import { motion } from "motion/react";
const MotionTesting = () => {
    return (
        <div className='flex justify-center items-center w-full flex-col'>
            <h1>Motion Testing Page</h1>

            <motion.div
                animate={{
                    borderRadius: ["10%", "20%", "50%", "80%", "100%"],
                    rotate: [40, 60, 100, 180, 300],
                    scale: [1, 2, 3, 2, 3, 2, 1, 3],
                }}
                transition={{ duration: 8 }}
                className='bg-teal-500 h-44 w-44'></motion.div>
        </div>
    );
};

export default MotionTesting;
