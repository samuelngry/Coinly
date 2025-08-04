import excitedPuppy from '../../assets/excited.png';
import happyPuppy from '../../assets/happy.png';
import neutralPuppy from '../../assets/neutral.png';
import sadPuppy from '../../assets/sad.png';
import angryPuppy from '../../assets/angry.png';
import { motion } from 'framer-motion';

const MoodPet = ( { mood } ) => {

    const moodConfig = {
        Excited: {
            image: excitedPuppy, 
            animation: {
                scale: [1, 1.08, 1, 1.06, 1],
                rotate: [0, -4, 4, -2, 2, 0],
                y: [0, -12, -5, -10, 0],
            },
            transition: {
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut"
            },
            color: "#FFD700"
        },
        Happy: {
            image: happyPuppy,
            animation: {
                scale: [1, 1.06, 1],
                rotate: [0, 2, -2, 0],
                y: [0, -8, 0],
            },
            transition: {
                duration: 1.7,
                repeat: Infinity,
                ease: "easeInOut"
            },
            color: "#90EE90"
        },
        Neutral: {
            image: neutralPuppy,
            animation: {
                y: [0, -5, 0],
                scale: [1, 1.02, 1],
            },
            transition: {
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut"
            },
            color: "#D3D3D3"
        },
        Sad: {
            image: sadPuppy,
            animation: {
                y: [0, 3, 0],
                rotate: [0, -1, 1, 0],
                scale: [1, 0.98, 1],
            },
            transition: {
                duration: 2.8,
                repeat: Infinity,
                ease: "easeInOut"
            },
            color: "#87CEEB"
        },
        Angry: {
            image: angryPuppy,
            animation: {
                x: [0, -2, 2, -1, 1, 0],
                scale: [1, 1.04, 1, 1.02, 1],
                rotate: [0, -1, 1, -0.5, 0.5, 0],
            },
            transition: {
                duration: 0.8,
                repeat: Infinity,
                ease: "easeInOut"
            },
            color: "#FF6347"
        }
    };

    const currentConfig = moodConfig[mood] || moodConfig.Neutral;

    if (!mood) {
        return (
            <div className='flex flex-col items-center gap-6 p-8'>
                <div className='w-[275px] h-[275px] bg-gray-200 rounded-[20px] animate-pulse flex items-center justify-center'>
                    <span className='text-gray-500'>Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className='flex flex-col items-center gap-6 p-1'>
            {/* Pet Animation */}
            <div className='relative'>
                <motion.img
                    key={mood}
                    src={currentConfig.image}
                    alt={`${mood} pet`}
                    style={{ 
                        width: 275, 
                        height: 275,
                        borderRadius: '20px',
                        objectFit: 'cover'
                    }}
                    animate={currentConfig.animation}
                    transition={currentConfig.transition}
                    whileHover={{ 
                        scale: 1.08,
                        transition: { duration: 0.3 }
                    }}
                    whileTap={{ scale: 0.95 }}
                />
                
                {/* Mood indicator glow effect */}
                <motion.div
                    className="absolute inset-0 rounded-full opacity-20 -z-10"
                    style={{ 
                        backgroundColor: currentConfig.color,
                        filter: 'blur(20px)',
                        transform: 'scale(1.1)'
                    }}
                    animate={{
                        opacity: [0.1, 0.25, 0.1],
                    }}
                    transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            </div>

        </div>
    );
};

export default MoodPet;