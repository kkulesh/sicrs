import { Card, CardContent, CardHeader, CardTitle } from "../ui/card.js";
import { Search, Users, BookOpen, Lightbulb } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext.js";
const GrainTexture = "/images/Textures/grain-texture.jpg";

export function AboutSection() {
  const { t } = useLanguage();

  return (
    <section className="relative py-16 bg-gray-50">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
          {/* <h2 className="text-3xl font-medium text-gray-900 mb-4">
            {t('homeAbout.title')}
          </h2> */}
          <blockquote className="border-l-4 border-primary pl-6 py-2 italic text-gray-700 mb-12">
            <p className="text-xl leading-relaxed text-center">
              {t('homeAbout.quote')}
            </p>

            <footer className="mt-4 text-lg not-italic text-gray-500">
              {t('homeAbout.author')}
            </footer>
          </blockquote>

          <div className="group flex">
          <div className="bg-white relative p-8 rounded-3xl bg-card/50 backdrop-blur-sm border border-border hover:border-primary/20 transition-all duration-500 shadow-lg shadow-primary/30 hover:shadow-2xl hover:shadow-primary/50 flex-1">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10 flex flex-col h-full">
              <p className="text-muted-foreground leading-relaxed text-lg flex-1 text-gray-700 text-justify indent-8 whitespace-pre-line">
                {t('homeAbout.text')}
              </p>
            </div>
          </div>
          </div>

        </div>
     
    </section>
  );
}