import { companyLogos } from "../constants";

const CompanyLogos = ({ className }) => {
  return (
    <div className={`${className} border-l-0`}>
      <h5 className="tagline mb-6 text-center text-n-1/50">
        Helping people create beautiful content at
      </h5>
      <div className="overflow-hidden relative">
        {/* Container for the sliding animation */}
        <ul className="flex animate-slide">
          {/* Original logos */}
          {companyLogos.map((logo, index) => (
            <li
              className="flex items-center justify-center flex-1 h-[8.5rem] min-w-[134px]"
              key={index}
            >
              <div
                className="p-4 rounded-full backdrop-blur-sm"
                style={{
                  background: `radial-gradient(circle, rgba(255, 255, 255, 0.2) 10%, rgba(255, 255, 255, 0) 50%)`,
                }}
              >
                <img src={logo} width={134} height={28} alt={logo} />
              </div>
            </li>
          ))}
          {/* Duplicate the logos for seamless looping */}
          {companyLogos.map((logo, index) => (
            <li
              className="flex items-center justify-center flex-1 h-[8.5rem] min-w-[134px]"
              key={`duplicate-${index}`}
            >
              <div
                className="p-4 rounded-full backdrop-blur-sm"
                style={{
                  background: `radial-gradient(circle, rgba(255, 255, 255, 0.2) 10%, rgba(255, 255, 255, 0) 50%)`,
                }}
              >
                <img src={logo} width={134} height={28} alt={logo} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CompanyLogos;
