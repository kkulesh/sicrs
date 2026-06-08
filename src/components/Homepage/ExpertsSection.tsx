import { Card, CardContent } from "../ui/card.js";
import { ImageWithFallback } from "../figma/ImageWithFallback.js";
import { Users, Mail, Calendar } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext.js";
import { expertsData } from "../data/ExpertsData.js";
import { Link } from "react-router-dom";


export function ExpertsSection() {
  const { language } = useLanguage();
  const isUk = language === "uk";
  const { t } = useLanguage();

  const experts = expertsData(isUk);

  // const opportunities = [
  //   {
  //     icon: Calendar,
  //     title: isUk ? "Стажування" : "Internship",
  //     description: isUk ? "Програми для студентів" : "Programs for students",
  //     details: isUk ? "3-6 місяців практичного досвіду" : "3-6 months of practical experience"
  //   },
  //   {
  //     icon: Users,
  //     title: isUk ? "Дослідження" : "Research",
  //     description: isUk ? "Позиції для PhD" : "PhD positions",
  //     details: isUk ? "Участь у міжнародних проектах" : "Participation in international projects"
  //   },
  //   {
  //     icon: Mail,
  //     title: isUk ? "Експертиза" : "Expertise",
  //     description: isUk ? "Консультанти та ментори" : "Consultants and mentors",
  //     details: isUk ? "Гнучкий графік співпраці" : "Flexible collaboration schedule"
  //   }
  // ];


  return (
    <section id="experts" className="scroll-mt-[60px] py-16 bg-white">
      <div className="text-center mb-12">
          <h2 className="text-3xl font-medium mb-4 text-gray-900">
            {t('homeExperts.title')}
          </h2>
        </div>
      {/* Experts Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-10">
            {experts.map((expert) => (
                
                <div className="flex flex-col items-center text-center group">
                    
                    {/* Round photo */}
                    <div className="w-32 h-32 rounded-full overflow-hidden mb-4 shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/50 transition-shadow duration-500">
                    <ImageWithFallback
                        src={expert.image}
                        alt={expert.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    </div>

                    {/* Text */}
                    <h3 className="text-lg font-medium text-gray-900 py-2">
                    {expert.name}
                    </h3>

                    <p className="text-sm text-gray-600">
                    {expert.position}
                    </p>
                </div>
                ))}
            </div>
        </div>
    </section>
  );
}

