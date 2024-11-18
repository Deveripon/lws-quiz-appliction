import ProgressBarImage from "../../assets/icons/circular-progressbar.svg";

const ProgressReport = ({ totalCorrectMarks, totalMarks }) => {
    return (
        <div className='order-1 sm:order-2 w-2/3 sm:w-1/2  bg-primary/80 rounded-md border border-white/20 flex items-center p-4'>
            <div className='flex-1'>
                <p className='text-2xl font-bold'>
                    {totalCorrectMarks}/{totalMarks}
                </p>

                <p>Your Mark</p>
            </div>
            <div>
                <img src={ProgressBarImage} className='h-20' />
            </div>
        </div>
    );
};

export default ProgressReport;
