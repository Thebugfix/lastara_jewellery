import React, { useState } from "react";

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(null);

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
      items: ["Today’s 22K Rate", "Today’s 24K Rate"],
      image: "/src/assets/images/goldrate.jpg",
    },
    {
      label: "Store",
      items: ["Locate Stores", "Book Appointment", "Contact Us"],
      image: "/src/assets/images/store.jpg",
    },
  ];

  return (
    <nav className="bg-[#f8f1e7] border-b border-gray-200 relative z-50">
      {/* Main Nav */}
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-3">
        <div className="flex items-center gap-2">
          <img src="/src/assets/logo.png" alt="Lastara" className="h-10" />
          {/* <span className="text-2xl font-serif tracking-wide text-[#162A5A]">
            LASTARA
          </span> */}
        </div>

        <ul className="flex gap-8 text-[#162A5A] font-medium">
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

      {/* Hover Dropdown */}
      {activeMenu && (
        <div
          className="absolute left-0 w-full bg-[#f8f1e7] bg-[url('/src/assets/10011.svg')] bg-cover bg-center border-t border-gray-200 shadow-lg animate-fadeIn"
          onMouseEnter={() => setActiveMenu(activeMenu)}
          onMouseLeave={() => setActiveMenu(null)}
        >
          <div className="max-w-7xl mx-auto px-8 py-8 flex justify-between">
            {/* Left: Menu items */}
            <ul className="flex flex-col gap-3 text-[#162A5A] w-1/2">
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

            {/* Right: Image */}
            <div className="w-1/2 flex justify-end">
              <img
                src={
                  menu.find((m) => m.label === activeMenu)?.image ||
                  "/src/assets/images/placeholder.jpg"
                }
                alt="submenu visual"
                className="w-72 h-48 object-cover rounded-md shadow-md"
              />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
