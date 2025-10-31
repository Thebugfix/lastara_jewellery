import React from 'react';

const BackgroundBg = () => {
    return (
    <section className="sticky top-0 bottom-0 -z-10 w-full h-[400px] overflow-hidden">
            {/* Background Image */}
            <img 
                src="/src/assets/fixedbg.jpeg" 
                alt="elegant jewelry background" 
                className="absolute inset-0 w-full h-full object-cover"
            />
            
            {/* Text Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center px-4">
                    <p className='text-white font-bold text-2xl sm:text-3xl md:text-4xl leading-tight mb-2 begum'>
                        Every <span className='dancing-script text-3xl sm:text-4xl md:text-5xl'>jewel</span> tells a story,
                    </p>
                    <p className='text-white font-bold text-2xl sm:text-3xl md:text-4xl begum'>
                        which one will you choose?
                    </p>
                </div>
            </div>
        </section>
    );
};

export default BackgroundBg;