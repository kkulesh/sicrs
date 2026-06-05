import { useLanguage } from "../../contexts/LanguageContext.js";

export function PartnershipsSection() {
  const { t } = useLanguage();

  // Логотипи партнерів
  const homePartnerships = [
    {
      name: "Partner 1",
      logo: "images/Partners/східниця1.png"
    },
    {
      name: "Partner 2",
      logo: "images/Partners/східниця2.png"
    },
    {
      name: "Partner 3",
      logo: "images/Partners/конгрес_місц_регіон_влад.svg"
    },
    {
      name: "Partner 4",
      logo: "images/Partners/го_академ_простір.jpg"
    },
    {
      name: "Partner 5",
      logo: "images/Partners/imt_lucca.png"
    },
    {
      name: "Partner 6",
      logo: "images/Partners/sobigdata.png"
    },
    {
      name: "Partner 7",
      logo: "images/Partners/ндц_іпр_нану.png"
    },
  ];

  return (
    <section id="partnerships" className="scroll-mt-[60px] py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-medium mb-4 text-gray-900">
            {t('homePartnerships.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('homePartnerships.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {homePartnerships.map((partner, index) => (
            <div
              key={index}
              className="flex items-center justify-center p-6 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-md"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="max-w-full h-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
                style={{ maxHeight: '70px' }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
