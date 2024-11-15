import defaultAvatar from "../../assets/avater.webp";
import cn from "../../utils/cn";

const ScoreLeader = ({ highlight }) => {
    return (
        <li
            className={cn(
                `flex items-center justify-between`,
                highlight &&
                    " ring-2 ring-purple-600 ring-offset-4 rounded-lg bg-purple-500/50"
            )}>
            <div className='flex items-center'>
                <img
                    src={defaultAvatar}
                    alt='SPD Smith'
                    className='object-cover w-10 h-10 rounded-full mr-4'
                />
                <div>
                    <h3 className='font-semibold'>SPD Smith</h3>
                    <p className='text-sm text-gray-500'>1st</p>
                </div>
            </div>
            <div className='flex items-center'>
                <span className='mr-2'>2,340</span>
            </div>
        </li>
    );
};

export default ScoreLeader;
