import defaultAvatar from "../../assets/avater.webp";
import cn from "../../utils/cn";

const ScoreLeader = ({ highlight, leader }) => {
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
                    <h3 className='font-semibold'>{leader.full_name}</h3>
                    <p className='text-sm text-gray-500'>{leader.position}</p>
                </div>
            </div>
            <div className='flex items-center'>
                <span className='mr-2'>{leader.score}</span>
            </div>
        </li>
    );
};

export default ScoreLeader;
