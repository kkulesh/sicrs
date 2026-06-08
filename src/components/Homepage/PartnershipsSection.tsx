import { useCallback, useRef } from "react";
import { useLanguage } from "../../contexts/LanguageContext.js";
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight } from "lucide-react";

export function PartnershipsSection() {
  const { t } = useLanguage();

  const originalPartners = [
    {
      name: "Partner 0",
      logo: "images/Partners/го_академ_простір.jpg",
      url: "https://aprostir.org.ua/"
    },
    {
      name: "Partner 1",
      logo: "images/Partners/shidnytsya.png",
      url: "https://skhidnytsia-rada.gov.ua/?fbclid=IwY2xjawSSl3pleHRuA2FlbQIxMABicmlkETEydVBzSWVXSkVkakJoZ01Uc3J0YwZhcHBfaWQQMjIyMDM5MTc4ODIwMDg5MgABHm77S7wdKJzAY_YLyf3UpwDKsNs7yt3p9phZ-4_74VuEa7UnMfzLNUBtGKJR_aem_4WF7LSN6vQlM0KUFNEXJoA"
    },
    {
      name: "Partner 2",
      logo: "images/Partners/imt_lucca.png",
      url: "https://welcome.imtlucca.it/"
    },
    {
      name: "Partner 3",
      logo: "images/Partners/sobigdata.png",
      url: "https://www.sobigdata.eu/"
    },
    {
      name: "Partner 4",
      logo: "images/Partners/ндц_іпр_нану.png",
      url: "https://ndc-ipr.org/"
    },
    {
      name: "Partner 5",
      logo: "images/Partners/science_at_risk.svg",
      url: "https://scienceatrisk.org/"
    },
    {
      name: "Partner 6",
      logo: "images/Partners/kunsht.png",
      url: "https://www.kunsht.com.ua/"
    }
  ];

  const partners = [...originalPartners, ...originalPartners];

  const autoplay = useRef(Autoplay({ delay: 3000, stopOnInteraction: true }));

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, dragFree: false, align: 'start' },
    [autoplay.current]
  );

  const resumeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const resetAutoplay = useCallback(() => {
    if (resumeTimeout.current) clearTimeout(resumeTimeout.current);
    resumeTimeout.current = setTimeout(() => {
      autoplay.current.reset();
      autoplay.current.play();
    }, 5000);
  }, []);

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollTo(emblaApi.selectedScrollSnap() - 3);
    resetAutoplay();
  }, [emblaApi, resetAutoplay]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollTo(emblaApi.selectedScrollSnap() + 3);
    resetAutoplay();
  }, [emblaApi, resetAutoplay]);

  return (
    <section id="partners" className="scroll-mt-[60px] py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-medium mb-4 text-gray-900">
            {t('homePartnerships.title')}
          </h2>
        </div>

        <div className="relative px-12">
          {/* Стрілка ліворуч */}
          <button
            onClick={scrollPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 transition-all duration-300 hover:scale-110"
            aria-label="Previous"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>

          {/* Карусель */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex items-center">
              {partners.map((partner, index) => (
                <div key={index} className="flex-none px-4">
                  {partner.url ? (
                    <a href={partner.url} target="_blank" rel="noopener noreferrer">
                      <img
                        src={partner.logo}
                        alt={partner.name}
                        className="h-16 w-auto min-w-[60px] max-w-[240px] object-contain grayscale hover:grayscale-0 transition-all duration-300"
                      />
                    </a>
                  ) : (
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="h-16 w-auto min-w-[60px] max-w-[240px] object-contain grayscale hover:grayscale-0 transition-all duration-300"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Стрілка праворуч */}
          <button
            onClick={scrollNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 transition-all duration-300 hover:scale-110"
            aria-label="Next"
          >
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>
        </div>
      </div>
    </section>
  );
}