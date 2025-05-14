const TestimonialCard = ( {icon, name, description} ) => {
  return (
    <div className="relative flex flex-col bg-white shadow-md rounded-lg w-full items-center p-10">
        <img src={icon} alt={name} className="w-30 h-30 mb-4 rounded-full absolute -top-15" />
        <p className="text-neutral-500 text-sm mb-4 mt-10">{description}</p>
        <h3 className="text-md font-bold">{name}</h3>
        <div className="flex mt-2">
            <span className="text-yellow-500 text-lg">★</span>
            <span className="text-yellow-500 text-lg">★</span>
            <span className="text-yellow-500 text-lg">★</span>
            <span className="text-yellow-500 text-lg">★</span>
            <span className="text-yellow-500 text-lg">★</span>
        </div>
    </div>
  );
};

export default TestimonialCard
