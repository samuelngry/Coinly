import video1 from "../../assets/video1.mp4";

const HeroSection = () => {
  return (
    <div>
      <div className="flex flex-col items-center mt-6 lg:mt-20">
        <h1 className="text-2xl sm:text-3xl lg:text-6xl text-center tracking-wide">
            Start Saving, Level Up, and Grow Your 
            <strong className="bg-gradient-to-r from-orange-500 to-orange-800 text-transparent bg-clip-text">
                {" "}
                Coin Pet
            </strong>
        </h1>
        <p className="text-sm sm:text-md lg:text-lg text-center mt-6 max-w-4xl">
            Turn saving into a fun, rewarding game — complete quests, watch your savings grow, and care for your coin buddy.
        </p>
        <div className="flex justify-center my-10">
            <a href="#" className="bg-gradient-to-r from-orange-500 to-orange-800 px-3 py-2 mx-3 rounded-md text-white">
                Get Started
            </a>
        </div>
        <div className="flex mt-10 justify-center">
            <video autoPlay loop muted className="w-full rounded-lg">
                <source src={video1} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
      </div>
    </div>
  );
};

export default HeroSection
