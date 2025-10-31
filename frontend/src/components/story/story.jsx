import React from 'react';

const Story = () => {
  return (
    <section className="relative py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8 lg:px-16 overflow-hidden bg-[url('/src/assets/10004.png')] bg-contain bg-no-repeat bg-[#FFF9F3] bg-left min-h-[400px] flex items-center">
      <div className="max-w-4xl mx-auto w-full flex justify-center flex-col items-center">
        <p className='text-center text-[#0d2844] font-700 text-2xl sm:text-3xl md:text-4xl begum leading-tight'>
          Shimmering <span className='text-[#0d2844] dancing-script text-3xl sm:text-4xl md:text-5xl'> jewels,</span> like the stars above;
          <br className="hidden sm:block" /> 
          Hear them whisper tales of <span className='text-[#0d2844] dancing-script text-3xl sm:text-4xl md:text-5xl'>endless</span> love
        </p>
        <img src="/src/assets/logo2.png" alt="Lastara" className="h-20 sm:h-15 md:h-15 mt-4 " />
      </div>
    </section>
  );
};

export default Story;