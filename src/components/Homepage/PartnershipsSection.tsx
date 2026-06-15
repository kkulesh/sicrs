import { useCallback, useRef, useState, useEffect } from "react";
import { useLanguage } from "../../contexts/LanguageContext.js";
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

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
      url: "https://skhidnytsia-rada.gov.ua/"
    },
    {
      name: "Partner 2",
      logo: "images/Partners/imt_lucca.png",
      url: "https://welcome.imtlucca.it/"
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

  const [isPlaying, setIsPlaying] = useState(true);
  const isUserPaused = useRef(false);

  const toggleAutoplay = useCallback(() => {
    const autoplayPlugin = emblaApi?.plugins()?.autoplay;
    if (!autoplayPlugin) return;

    if (isPlaying) {
      autoplayPlugin.stop();
      setIsPlaying(false);
      isUserPaused.current = true;
    } else {
      autoplayPlugin.play();
      setIsPlaying(true);
      isUserPaused.current = false;
    }
  }, [emblaApi, isPlaying]);

  useEffect(() => {
    const autoplayPlugin = emblaApi?.plugins()?.autoplay;
    if (!autoplayPlugin) return;

    emblaApi.on('autoplay:play', () => setIsPlaying(true));
    emblaApi.on('autoplay:stop', () => setIsPlaying(false));
  }, [emblaApi]);

  const handleMouseEnter = useCallback(() => {
    const autoplayPlugin = emblaApi?.plugins()?.autoplay;
    if (autoplayPlugin && !isUserPaused.current) {
      autoplayPlugin.stop();
    }
  }, [emblaApi]);

  const handleMouseLeave = useCallback(() => {
    const autoplayPlugin = emblaApi?.plugins()?.autoplay;
    if (autoplayPlugin && !isUserPaused.current) {
      autoplayPlugin.play();
    }
  }, [emblaApi]);

  const resumeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const resetAutoplay = useCallback(() => {
    if (resumeTimeout.current) clearTimeout(resumeTimeout.current);
    resumeTimeout.current = setTimeout(() => {
      const autoplayPlugin = emblaApi?.plugins()?.autoplay;
      if (autoplayPlugin) {
        autoplayPlugin.reset();
        autoplayPlugin.play();
        setIsPlaying(true);
      }
    }, 5000);
  }, [emblaApi]);

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
          <div 
            className="overflow-hidden" 
            ref={emblaRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
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

        {/* Кнопка Pause / Play */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={toggleAutoplay}
            className="flex items-center gap-2 px-4 py-2 bg-white text-gray-700 rounded-full shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5" />
            ) : (
              <Play className="w-5 h-5 ml-0.5" />
            )}
          </button>
        </div>
      </div>
    </section>
  );
}