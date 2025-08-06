import featureImage1 from "../../assets/feature1.png";
import featureImage2 from "../../assets/feature2.png";
import featureImage3 from "../../assets/feature3.png";

const features = [
  {
    image: featureImage1,
    title: "Game Your Savings",
    description:
      "Take on daily and bonus quests that make saving money feel like a game you can’t stop playing.",
  },
  {
    image: featureImage2,
    title: "Raise Your Pet",
    description:
      "Every quest you complete keeps your pet happy, healthy, and evolving. Neglect your savings, and your pet might just pout at you.",
  },
  {
    image: featureImage3,
    title: "Climb the Ranks",
    description:
      "Earn XP, keep your streak alive, and climb the leaderboard. Saving isn’t just a habit anymore — it’s a competition you can win.",
  },
  {
    image: featureImage3,
    title: "Progress, Made Fun",
    description:
      "See where you shine and where to grow, straight from your pet.",
  },
];

const FeatureSection = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-35">
      <h1 className="text-xl sm:text-3xl lg:text-5xl tracking-wide text-center mb-20">
        How Coinly Works
      </h1>

      <div className="space-y-20">
        {features.map((feature, index) => (
          <div
            key={index}
            className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-16 ${
              index % 2 !== 0 ? "lg:flex-row-reverse" : ""
            }`}
          >
            {/* Text Content */}
            <div className="flex-1 text-center lg:text-left max-w-lg">
              <h2 className="text-2xl lg:text-4xl font-bold mb-6 text-orange-500">
                {feature.title}
              </h2>
              <p className="text-neutral-500 text-md lg:text-md leading-relaxed">
                {feature.description}
              </p>
            </div>

            {/* Image Content */}
            <div className="flex-1 flex justify-center">
              <div className="relative">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-80 h-80 lg:w-96 lg:h-96 object-contain drop-shadow-lg hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureSection;
