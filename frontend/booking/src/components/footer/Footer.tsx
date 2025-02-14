import "./footer.css";

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
    <section className="footer-container">
      <div className="link-container">
        {links.map((item, i) => (
          <p key={i}>{item}</p>
        ))}
      </div>
    </section>
  );
};

export default Footer;
