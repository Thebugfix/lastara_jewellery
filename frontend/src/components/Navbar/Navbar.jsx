import React, { useState, useEffect } from "react";

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const menu = [
    {
      label: "Brand",
      items: [
        "About Lastara",
        "Our Craftsmanship",
        "The Lastara Promise",
        "Design Philosophy",
        "Our Legacy",
        "Blogs by Lastara",
      ],
      image: "/src/assets/images/brand.jpg",
    },
    {
      label: "Collections",
      items: ["Necklaces", "Earrings", "Rings", "Bangles", "Bracelets"],
      image: "/src/assets/images/collection.jpg",
    },
    {
      label: "Jewellery",
      items: ["Gold", "Diamond", "Platinum", "Silver"],
      image: "/src/assets/images/jewellery.jpg",
    },
    {
      label: "Weddings",
      items: ["Bridal Sets", "Engagement Rings", "Couple Bands"],
      image: "/src/assets/images/wedding.jpg",
    },
    {
      label: "Occasions",
      items: ["Festive", "Daily Wear", "Office Wear", "Special Events"],
      image: "/src/assets/images/occasion.jpg",
    },
    {
      label: "Gold Rates",
      items: ["Today's 22K Rate", "Today's 24K Rate"],
      image: "/src/assets/images/goldrate.jpg",
    },
    {
      label: "Store",
      items: ["Locate Stores", "Book Appointment", "Contact Us"],
      image: "/src/assets/images/store.jpg",
    },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleSubMenu = (label) => {
    if (isMobile) {
      setActiveMenu(activeMenu === label ? null : label);
    }
  };

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-[#ECE5DB] '}`}
        style={{
          backdropFilter: scrolled ? 'blur(8px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(8px)' : 'none',
          transition: 'all 0.3s ease-in-out'
        }}
      >
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between px-4 py-3">        
        <img src="/src/assets/logo.png" alt="Lastara" className="h-15" />
        <button 
          onClick={toggleMobileMenu}
          className="text-[#0d2844] focus:outline-none"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Desktop Menu */}
      <div className="max-w-7xl mx-auto hidden md:flex items-center justify-around px-8 py-3">
        <div className="flex items-center gap-2">
          <img src="/src/assets/logo.png" alt="Lastara" className="h-15 z-50" />
        </div>

        <ul className="flex gap-8 text-[#0d2844] font-semibold text-xl">
          {menu.map((m, i) => (
            <li
              key={i}
              className="relative cursor-pointer"
              onMouseEnter={() => setActiveMenu(m.label)}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <span
                className={`pb-1 border-b-2 transition-all ${
                  activeMenu === m.label
                    ? "border-[#c9a341] text-[#c9a341]"
                    : "border-transparent"
                }`}
              >
                {m.label}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 shadow-lg bg-[#ECE5DB]">
          <ul className="py-2 px-4 space-y-2">
            {menu.map((m, i) => (
              <li key={i} className="border-b border-gray-200">
                <button
                  onClick={() => toggleSubMenu(m.label)}
                  className="w-full text-left py-3 px-2 flex justify-between items-center text-[#0d2844] font-medium"
                >
                  <span>{m.label}</span>
                  <svg 
                    className={`w-4 h-4 transition-transform ${activeMenu === m.label ? 'transform rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {activeMenu === m.label && (
                  <ul className="pl-4 pb-2 space-y-2">
                    {m.items.map((item, idx) => (
                      <li key={idx} className="py-1">
                        <a href="#" className="block py-1 text-gray-700 hover:text-[#c9a341] transition-colors">
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Desktop Hover Dropdown */}
      {activeMenu && !isMobile && (
        <div
          className="hidden md:block absolute left-0 w-full top-15 bg-[#ECE5DB] bg-[url('/src/assets/10011.svg')] bg-contain bg-no-repeat bg-left border-gray-200 shadow-lg animate-fadeIn min-h-[200px]"
          onMouseEnter={() => setActiveMenu(activeMenu)}
          onMouseLeave={() => setActiveMenu(null)}
        >
          <div className="max-w-7xl mx-40 px-8 py-8 flex justify-between">
            {/* Left: Menu items */}
            <ul className="flex flex-col gap-3 text-[#0d2844] w-1/2 text-xl font-semibold">
              {menu
                .find((m) => m.label === activeMenu)
                ?.items.map((item, idx) => (
                  <li
                    key={idx}
                    className="cursor-pointer hover:text-[#c9a341] transition-colors"
                  >
                    {item}
                  </li>
                ))}
            </ul>
            <div className="w-1/2 flex justify-end">
              <img
                src={
                  menu.find((m) => m.label === activeMenu)?.image ||
                  "/src/assets/images/placeholder.jpg"
                }
                alt="submenu visual"
                className="w-72 h-48 object-cover"
              />
            </div>
          </div>
        </div>
      )}
      </nav>
      {/* Add padding to the content below the fixed navbar */}
      <div className="h-16"></div>
    </>
  );
};

export default Navbar;
