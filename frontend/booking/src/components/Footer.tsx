const Footer = () => {
  const links = [
    "Countries",
    "Regions",
    "Cities",
    " Districts",
    "Airports",
    " Hotels",
    " Homes",
    " Apartments",
    " Resorts",
    " Villas",
    " Hostels",
    " Guest houses",
    "  Unique places to stay",
    " Reviews",
    " Unpacked: Travel articles",
    "  Travel communities",
    "  Seasonal and holiday deals",
    "  Car rental",
    "  Flight Finder",
    "   Restaurant reservations",
    "  Travel Agents",
    " Curtomer Service",
    "  Partner Help",
    " Careers",
    " Sustainability",
    "  Press center",
    " Safety Resource Center",
    " Investor relations",
    " Terms & conditions]",
  ];
  return (
    <section className="bg-blue-800 text-white">
      <div className="max-w-6xl m-auto p-4">
        <div className="flex flex-wrap gap-1 ">
          {links.map((item, i) => (
            <p key={i} className="w-60 line-clamp-1">
              {item}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Footer;
