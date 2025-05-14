const FeatureCard = ( {image, title, description} ) => {
  return (
    <div className="flex flex-col bg-white shadow-md rounded-4xl w-full max-w-sm gap-5 p-10 justify-between">
      <img src={image} alt={title} className="w-40 h-40 mb-4" />
      <h2 className="text-lg font-bold mb-2">{title}</h2>
      <p className="text-neutral-500 text-sm text-left">{description}</p>
    </div>
  );
};

export default FeatureCard
