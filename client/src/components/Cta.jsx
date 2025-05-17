const Cta = () => {
  return (
    <div className="flex flex-col mt-35 items-center w-full py-20">
        <h1 className="text-2xl sm:text-3xl lg:text-6xl tracking-wide text-center">Start Your Savings Journey</h1>  
        <p className="text-sm sm:text-md lg:text-lg mt-3 text-center">
            Join Coinly today and watch your savings grow while having fun!
        </p>
        <div className="flex justify-center mt-10">
            <a href='#' className="bg-gradient-to-r from-orange-500 to-orange-800 px-3 py-2 mx-3 rounded-md text-white">
                Sign Up
            </a>
        </div>
    </div>
  )
}

export default Cta
