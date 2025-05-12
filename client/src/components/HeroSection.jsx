import video1 from "../assets/video1.mp4";
import video2 from "../assets/video2.mp4";

const HeroSection = () => {
  return (
    <div>
      <div className="flex flex-col items-center mt-6 lg:mt-20">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl text-center tracking-wide">
            Save Money, Level Up, and Grow Your 
            <strong className="bg-gradient-to-r from-orange-500 to-orange-800 text-transparent bg-clip-text">
                {" "}
                Coin Pet
            </strong>
        </h1>
      </div>
    </div>
  )
}

export default HeroSection
