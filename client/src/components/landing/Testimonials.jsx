import TestimonialCard from "./TestimonialCard"
import personImage1 from "../../assets/jean.jpeg"
import personImage2 from "../../assets/heidi.jpg"
import personImage3 from "../../assets/timothy.jpeg"

const Testimonials = () => {
  return (
    <div className="flex flex-col mt-35 items-center">
        <h1 className="text-xl sm:text-2xl lg:text-4xl font-bold text-center tracking-wide">
            What Our Users Are Saying
        </h1>
        
        <div className="flex flex-col lg:flex-row justify-center items-center gap-6">
            <TestimonialCard 
                icon={personImage1}
                name="Jean Ng"
                description="I used Coinly for a month and the daily quests nudged me to cut small impulse buys. The streaks keep me honest, and the Pet Insights made it obvious where my money leaks were."
            />
            <TestimonialCard 
                icon={personImage2}
                name="Gwyn Heidi"
                description="Saving used to feel like a chore, but now it's the most fun part of my day. The quests are weirdly satisfying and my pet? Adorable!"
            />
            <TestimonialCard 
                icon={personImage3}
                name="Timothy Ng"
                description="I’ve tried budgeting apps before and always gave up. Coinly makes it feel like I’m playing a game and I actually want to keep going. Seeing my progress grow is super motivating."
            />
        </div>
    </div>
  )
}

export default Testimonials
