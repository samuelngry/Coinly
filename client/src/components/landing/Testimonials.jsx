import TestimonialCard from "./TestimonialCard"
import personImage1 from "../../assets/jean.jpeg"
import personImage2 from "../../assets/heidi.jpg"
import personImage3 from "../../assets/timothy.jpeg"

const Testimonials = () => {
  return (
    <div className="flex flex-col mt-35 items-center">
        <h1 className="text-3xl sm:text-5xl lg:text-6xl text-center tracking-wide">
            What Our Users Are Saying
        </h1>
        
        <div className="flex flex-col lg:flex-row justify-center items-center gap-6">
            <TestimonialCard 
                icon={personImage1}
                name="Jean Ng"
                description="I never thought saving money could feel like a game, but Coinly totally changed that. I check in daily just to feed my coin pet and somehow I've saved over $200 without even trying!"
            />
            <TestimonialCard 
                icon={personImage2}
                name="Gwyn Heidi"
                description="Saving used to feel like a chore, but now it's the most fun part of my day. The quests are weirdly satisfying and my coin pet? Adorable. 10/10 would recommend to anyone!"
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
