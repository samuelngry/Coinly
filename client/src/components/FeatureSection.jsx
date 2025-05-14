import FeatureCard from "./FeatureCard"
import featureImage1 from "../assets/feature1.png"
import featureImage2 from "../assets/feature2.png"
import featureImage3 from "../assets/feature3.png"

const FeatureSection = () => {
  return (
    <div className="flex flex-col mt-35 items-center">
      <h1 className="text-2xl sm:text-3xl lg:text-6xl tracking-wide text-center">So simple, it's fun.</h1>
      <p className="text-sm sm:text-md lg:text-lg mt-3 text-center mb-10">
        It's just how you've always wanted saving to work.
      </p>

      <div className="flex flex-col lg:flex-row justify-center items-center gap-6">
        <FeatureCard
            image={featureImage1}
            title="Quests, Not Budgets"
            description="Saving goals feel like mini-games — simple, doable, and kind of addictive."
        />
        <FeatureCard
            image={featureImage2}
            title="Your Coin Pet"
            description="Every quest feeds your pet. Save more, grow more, love more!"
        />
        <FeatureCard
            image={featureImage3}
            title="Level Up"
            description="Track your streaks, earn XP, and hit new highs - without even noticing."
        />

      </div>
    </div>
  )
}

export default FeatureSection
