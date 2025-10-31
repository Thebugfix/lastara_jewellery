import React from 'react';

const Masterpeace = () => {
  return (
    <section className="min-h-[500px] md:min-h-[600px] bg-[url('/src/assets/bgdesign.png')] bg-no-repeat bg-[#FFF9F3] bg-right bg-cover border border-e-amber-300">
      <div className="container mx-auto h-full px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="flex flex-col md:flex-row items-center h-full">
          {/* Image - shown first on mobile, second on desktop */}
          <div className="w-full md:w-1/2 order-1 md:order-2 flex justify-center items-center mb-8 md:mb-0">
            <img 
              src="https://s7ap1.scene7.com/is/image/noveljewelsprod/VJ-Talent?qlt=85&wid=1600&ts=1758270913547&fit=wrap&fmt=webp&dpr=off" 
              alt="masterpiece jewelry" 
              className="max-h-[250px] sm:max-h-[350px] md:max-h-[500px] w-auto object-contain"
            />
          </div>
          
          {/* Content - shown second on mobile, first on desktop */}
          <div className="w-full md:w-1/2 order-2 md:order-1 flex flex-col justify-center gap-4 md:pr-8 text-center md:text-left">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0d2844] leading-tight">
              Lastara Special
            </h1>
            <p className="text-gray-700 text-base sm:text-lg md:text-xl mb-4 md:mb-6">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt unde architecto aperiam deleniti error ad totam explicabo itaque maxime reprehenderit.
            </p>
            <div className="flex justify-center md:justify-start">
              <button className="px-6 py-3 bg-[#0d2844] text-white rounded-lg hover:bg-opacity-90 transition-colors text-sm sm:text-base md:text-lg cursor-pointer hover:text-[#0d2844] hover:bg-[#c9a341]">
                Explore Collection
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Masterpeace;