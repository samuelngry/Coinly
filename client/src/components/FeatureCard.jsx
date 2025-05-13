const FeatureCard = () => {
  return (
    <div className={`flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg: flex-row'} items-center my-10`}>
        <img src={image} alt={title} className="w-full lg: w-1/2 rounded-lg"/>
        <div className="lg:w-1/2 text-center lg:text-left">
            <h2 className="text-2xl font-bold mb-4">{title}</h2>
            <p className="text-neutral-400">{description}</p>
        </div>
    </div>
  );
};

export default FeatureCard
