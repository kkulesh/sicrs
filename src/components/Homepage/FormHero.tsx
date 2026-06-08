import { Button } from "../ui/button.js";
import { useLanguage } from "../../contexts/LanguageContext.js";
import { localizePath } from "../../utils/routeHelpers.js";
import { Link } from "react-router-dom";

const BackgroundImage = "/images/HeaderBackgrounds/12.jpg";

export function FormHero() {
  const { t, language } = useLanguage();

  return (
    <section className="relative text-white overflow-hidden min-h-[50vh] flex items-center bg-primary1">
      {/* Background Image 
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url(${BackgroundImage})`,
          zIndex: 0
        }}
      /> */}
      
      {/* Subtle dark overlay for text readability only */}
      {/* <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" style={{ zIndex: 1 }} /> */}

      <div
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 
                  min-h-[60vh] flex items-center justify-center text-center"
        style={{ zIndex: 3 }}
      >
        <div className="flex flex-col items-center">
          <h1 className="text-3xl lg:text-3xl font-medium mb-6 leading-tight drop-shadow-lg">
            {t('formHero.title')}
          </h1>

          <p className="text-xl mb-8 text-gray-100 leading-relaxed drop-shadow-md max-w-3xl">
            {t('formHero.subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* <Link to={localizePath(language, "/googleform")}> */}
              <Button
                size="xl"
                variant="outline"
                className="text-lg text-gray-900 hover:bg-gray-300 hover:text-gray-900 shadow-md shadow-black/50 hover:shadow-lg hover:shadow-black/50 backdrop-blur-sm transfrom-shadow duration-500"
              >
                {t("formHero.form")}
              </Button>
            {/* </Link> */}
          </div>
        </div>
      </div>
    </section>
  );
}