const TestimonialCard = ( {icon, name, description} ) => {
  return (
    <div className="flex flex-col bg-white shadow-md rounded-4xl w-full">
        <img src={icon} alt={name} className="w-30 h-30 mb-4 rounded-full" />
        <p className="text-neutral-400 text-sm mb-4">{description}</p>
        <h3 className="text-md font-bold">{name}</h3>
    </div>
  );
};

export default TestimonialCard
