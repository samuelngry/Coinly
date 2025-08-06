import landingImage from "../../assets/landing.png"
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <div>
      <div className="flex flex-col lg:flex-row items-center gap-10">
        <div className="justify-center w-90 h-90 lg:w-170 lg:h-120">
            <motion.img
              src={landingImage}
              alt="Landing"
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 3, 
                repeat: Infinity, 
                ease: "easeInOut"
              }}
              className="w-full h-full object-contain"
            />
        </div>
        <div className="flex flex-col text-center">
            <h1 className="text-xl sm:text-2xl lg:text-4xl text-center tracking-wide">
              Build better money habits, one
              <strong className="bg-gradient-to-r from-orange-500 to-orange-800 text-transparent bg-clip-text">
                  {" "}
                  quest
                  {" "}
              </strong>
              at a time!
            </h1>
            <p className="mt-2 text-neutral-500">
              Level up your savings — fun, fast, and totally free.
            </p>
            <div className="flex justify-center my-10">
                <a href="/register" className="bg-gradient-to-r from-orange-500 to-orange-800 px-3 py-2 mx-3 rounded-md text-white font-bold">
                    Get Started
                </a>
            </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection
