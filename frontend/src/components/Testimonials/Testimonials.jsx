import { useEffect, useState } from 'react';
import { Star, Quote } from 'lucide-react';
import api from '../../lib/api';

const TestimonialCarousel = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  const fallbackTestimonials = [
    {
      _id: '1',
      name: 'Priya Sharma',
      message: 'Absolutely stunning jewelry! The craftsmanship is exceptional and the designs are timeless. I purchased a gold necklace and it exceeded all my expectations.',
      image: { url: 'https://i.pravatar.cc/150?img=1' }
    },
    {
      _id: '2',
      name: 'Rajesh Kumar',
      message: 'Best jewelry store in the city! The staff is knowledgeable and helpful. Got my wife a beautiful diamond ring for our anniversary.',
      image: { url: 'https://i.pravatar.cc/150?img=2' }
    },
    {
      _id: '3',
      name: 'Anita Desai',
      message: 'Traditional designs with modern elegance. Lastara has become my go-to place for all special occasions. Highly recommended!',
      image: { url: 'https://i.pravatar.cc/150?img=3' }
    },
    {
      _id: '4',
      name: 'Vikram Singh',
      message: 'Excellent quality and fair pricing. The gold purity is certified and the customer service is outstanding. Will definitely shop again.',
      image: { url: 'https://i.pravatar.cc/150?img=4' }
    },
    {
      _id: '5',
      name: 'Meera Patel',
      message: 'Love the variety and designs! From traditional to contemporary, they have it all. The online shopping experience was seamless.',
      image: { url: 'https://i.pravatar.cc/150?img=5' }
    }
  ];

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await api.get('/api/testimonials');
        if (response.data && response.data.length > 0) {
          setTestimonials(response.data);
        } else {
          setTestimonials(fallbackTestimonials);
        }
      } catch (error) {
        console.error('Error fetching testimonials:', error);
        setTestimonials(fallbackTestimonials);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  const duplicatedTestimonials = [...testimonials, ...testimonials];

  if (loading) {
    return (
      <section className="py-16 bg-[#FFF9F3]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-white/20 rounded w-64 mx-auto" />
            <div className="flex gap-6 overflow-hidden">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="min-w-[350px] h-64 bg-white/90 rounded-lg border border-[#e8d8b8]" />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-[#FFF9F3] overflow-hidden relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[#c9a341]/30 to-transparent"></div>
      <div className="max-w-7xl mx-auto px-4 mb-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#5a3d2a] mb-4">What Our Customers Say</h2>
          <p className="text-[#c9a341] text-lg font-semibold">
            Trusted by thousands of happy customers
          </p>
        </div>
      </div>

      <div className="relative">
        <div className="flex gap-6 animate-scroll hover:pause">
          {duplicatedTestimonials.map((testimonial, index) => (
            <div
              key={`${testimonial._id}-${index}`}
              className="min-w-[350px] md:min-w-[400px] bg-white/90 rounded-lg p-6 shrink-0 hover:shadow-lg transition-all duration-300 border border-[#e8d8b8]"
            >
              <div className="mb-4">
                <Quote className="text-[#c9a341]" size={40} />
              </div>

              <p className="text-[#5a3d2a] text-base leading-relaxed mb-6 min-h-[120px]">
                "{testimonial.message}"
              </p>

              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className="fill-[#c9a341] text-[#c9a341]"
                  />
                ))}
              </div>

              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image?.url || `https://ui-avatars.com/api/?name=${testimonial.name}&background=c9a341&color=fff`}
                  alt={testimonial.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-[#c9a341] shadow-md"
                />
                <div>
                  <h4 className="text-[#5a3d2a] font-semibold text-lg">
                    {testimonial.name}
                  </h4>
                  <p className="text-[#c9a341] text-sm">Verified Customer</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="absolute top-0 left-0 w-32 h-full bg-linear-to-r from-[#FFF9F3] to-transparent pointer-events-none" />
        <div className="absolute top-0 right-0 w-32 h-full bg-linear-to-l from-[#FFF9F3] to-transparent pointer-events-none" />
      </div>
    </section>
  );
};

export default TestimonialCarousel;