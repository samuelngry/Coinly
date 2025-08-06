import ctaImage from '../../assets/cta.png'
import { motion } from "framer-motion";

const Cta = () => {
  return (
    <div className="flex flex-col mt-20 lg:mt-35 items-center bg-white w-full py-20">
        <h1 className="text-xl sm:text-2xl lg:text-4xl tracking-wide font-bold text-center">Start Your Savings Journey!</h1>  
        <motion.img
          src={ctaImage}
          alt="Pet holding coin"
          className="w-70 h-70 lg:w-90 lg:h-90"
          animate={{ 
            y: [0, -10, 0], 
            rotate: [0, -3, 3, 0]
          }}
          transition={{
            duration: 2, 
            repeat: Infinity, 
            ease: "easeInOut"
          }}
        />
        <div className="flex justify-center mt-10">
            <a href='/register' className="bg-gradient-to-r from-orange-500 to-orange-800 px-20 lg:px-30 py-2 mx-3 rounded-md text-white font-bold">
                Get Started
            </a>
        </div>
    </div>
  )
}

export default Cta
