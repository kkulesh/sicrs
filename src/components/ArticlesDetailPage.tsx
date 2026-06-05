import { Button } from "./ui/button.js";
import { Badge } from "./ui/badge.js";
import { Card } from "./ui/card.js";
import { ArrowLeft, Calendar, Clock, User, Share2, BookOpen, Tag } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback.js";
import { useLanguage } from "../contexts/LanguageContext.js";
import { Link, useParams } from "react-router-dom";
import { Articles } from "./data/ArticlesData.js";

export function ArticlesDetailPage() {
  const { id } = useParams();
  const { t, language } = useLanguage();
  const isUk = language === "uk";

  // Отримуємо дані статті на основі ID
  const articles = Articles(isUk);

  const article =
    articles.find(item => item.id === id) ??
    articles.find(item => item.id === "featured") ??
    articles[0];

  if (!article) {
    return (
      <div className="p-10 text-center">
        Article not found
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/">
            <Button 
              variant="ghost" 
              className=" text-primary hover:text-primary-dark"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {isUk ? 'Назад до новин' : 'Back to News'}
            </Button>
          </Link>
        </div>
      </div>

      {/* Article Header */}
      <section className="py-4 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div>
            <Badge className="mb-4 bg-blue-600 text-white">
              {article.category}
            </Badge>
            
            <h1 className="text-3xl lg:text-4xl font-medium text-gray-900 mb-6 leading-tight">
              {article.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-6">
              <div className="flex items-center">
                <User className="w-4 h-4 mr-2" />
                <span>{article.authors}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                <span>{article.dateTime}</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                <span>{article.readTime} min</span>
              </div>
            </div>

            <p className="text-xl text-gray-800 leading-relaxed mb-8">
              {article.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="bg-gray-100 text-gray-700">
                  <Tag className="w-3 h-3 mr-1" />
                  {tag}
                </Badge>
              ))}
            </div>

            {/* <div className="flex items-center gap-4">
                  <Button size="sm" variant="outline">
                    <Share2 className="w-4 h-4 mr-2" />
                    {isUk ? 'Поділитися' : 'Share'}
                  </Button>
                </div>
            */}

              {/*
              <Button size="sm" variant="outline">
                <BookOpen className="w-4 h-4 mr-2" />
                {isUk ? 'Зберегти' : 'Save'}
              </Button>
            */}

            
          </div>
        </div>
      </section>


      {/* Article Image */}
      <section className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative h-72 sm:h-96 md:h-128 lg:h-256 rounded-lg overflow-hidden shadow-lg"> {/* h-64 md:h-96 */}
            <ImageWithFallback
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="pt-4 pb-8 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            {(article.content ?? []).map((paragraph, index) => (
              <div key={index} className="mb-6">
                {paragraph.startsWith('•') ? (
                  <div className="ml-4 text-base text-gray-800 leading-relaxed">
                    {paragraph}
                  </div>
                ) : (
                  <p className="text-gray-800 leading-relaxed">
                    {paragraph}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Articles */}

      {/*
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-medium text-gray-900 mb-8">
            {isUk ? "Схожі статті" : "Related Articles"}
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="overflow-hidden border shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="relative h-48">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=250&fit=crop"
                  alt="Ukraine Joins Global AI Ethics Initiative"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3">
                  <Badge variant="secondary" className="bg-white/90 text-gray-700">
                    {isUk ? 'Етика' : 'Ethics'}
                  </Badge>
                </div>
              </div>
              <div className="p-6">
                <h4 className="font-medium text-gray-900 mb-2 leading-tight">
                  {isUk
                    ? "Україна приєднується до глобальної ініціативи з етики ШІ"
                    : "Ukraine Joins Global AI Ethics Initiative"
                  }
                </h4>
                <p className="text-gray-600 text-sm mb-4">
                  {isUk
                    ? "Нове міжнародне партнерство має на меті встановити етичні керівні принципи для розвитку ШІ"
                    : "New international partnership aims to establish ethical guidelines for AI development"
                  }
                </p>
                <div className="flex items-center text-xs text-gray-500">
                  <Calendar className="w-3 h-3 mr-1" />
                  2024-11-08
                </div>
              </div>
            </Card>

            <Card className="overflow-hidden border shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="relative h-48">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=250&fit=crop"
                  alt="Breakthrough in Quantum AI Computing"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3">
                  <Badge variant="secondary" className="bg-white/90 text-gray-700">
                    {isUk ? 'Технології' : 'Technology'}
                  </Badge>
                </div>
              </div>
              <div className="p-6">
                <h4 className="font-medium text-gray-900 mb-2 leading-tight">
                  {isUk
                    ? "Прорив у квантових обчисленнях ШІ"
                    : "Breakthrough in Quantum AI Computing"
                  }
                </h4>
                <p className="text-gray-600 text-sm mb-4">
                  {isUk
                    ? "Українські дослідники досягають значної віхи в алгоритмах квантового машинного навчання"
                    : "Ukrainian researchers achieve significant milestone in quantum machine learning algorithms"
                  }
                </p>
                <div className="flex items-center text-xs text-gray-500">
                  <Calendar className="w-3 h-3 mr-1" />
                  2024-11-05
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      */}
        
      
    </div>
  );
}