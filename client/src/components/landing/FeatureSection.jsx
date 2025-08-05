import FeatureCard from "./FeatureCard"
import featureImage1 from "../../assets/feature1.png"
import featureImage2 from "../../assets/feature2.png"
import featureImage3 from "../../assets/feature3.png"

const FeatureSection = () => {
  return (
    <div className="flex flex-col mt-35 items-center">
      <h1 className="text-2xl sm:text-3xl lg:text-6xl tracking-wide text-center">How</h1>
      <p className="text-sm sm:text-md lg:text-lg mt-3 text-center mb-10">
         Save with quests, pets, and progress that feels good.
      </p>

      <div className="flex flex-col lg:flex-row justify-center items-center gap-6">
        <FeatureCard
            image={featureImage1}
            title="Quests, Not Budgets"
            description="Forget spreadsheets. Save with fun, bite-sized quests that actually feel doable — and even a little addictive."
        />
        <FeatureCard
            image={featureImage2}
            title="Meet Your Coin Pet"
            description="Your savings buddy! Every completed quest keeps it growing strong. It’s cute. It’s needy. It’s yours."
        />
        <FeatureCard
            image={featureImage3}
            title="XP & Streaks"
            description="Earn XP, build streaks, and unlock rewards — all without stressing about the numbers. Progress has never felt this good."
        />
      </div>
    </div>
  )
}

export default FeatureSection
