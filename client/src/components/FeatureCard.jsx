const FeatureCard = ( {image, title, description} ) => {
  return (
    <div className="flex flex-col items-center bg-white shadow-md rounded-lg">
      <img src={image} alt={title} className="w-20 h-20 mb-4" />
      <h2 className="text-lg font-bold mb-2">{title}</h2>
      <p className="text-neutral-400 text-sm text-left">{description}</p>
    </div>
  );
};

export default FeatureCard
