import { Badge } from "../ui/badge.js";
import { useLanguage } from "../../contexts/LanguageContext.js";
import { localizePath } from "../../utils/routeHelpers.js";
import { Link } from "react-router-dom";
import { Articles } from "../data/ArticlesData.js";
import { ImageWithFallback } from "../figma/ImageWithFallback.js";

export function NewsSection() {
  const { t, language } = useLanguage();
  const isUk = language === "uk";

  const news = Articles(isUk);

  return (
    <section id="news" className="scroll-mt-[60px] py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-medium text-gray-900 mb-4">
            {t("news.title")}
          </h2>
          {/* <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t("news.subtitle")}
          </p> */}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Large featured news 
          {news[0] && (
            <Link
              to={localizePath(language, `/news/${news[0].slug}`)}
              className="lg:col-span-1 lg:row-span-2 relative h-[500px] lg:h-[600px] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <img
                src={news[0].image}
                alt={news[0].title ?? ""}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-xl font-medium leading-tight mb-3 group-hover:text-blue-300 transition-colors">
                  {news[0].title}
                </h3>

                <p className="text-white/80 text-sm mb-4">
                  {news[0].dateFull}
                </p>
                <div className="flex flex-wrap gap-2">
                  {news[0].tags?.map((tag, tagIndex) => (
                    <Badge
                      key={tagIndex}
                      variant="outline"
                      className="border-white/40 text-white/90 hover:bg-white/10 text-xs"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </Link>
          )}
          */}

          {/* Smaller news */}
          <div className="lg:col-span-3 flex justify-center">
            <div className="w-full max-w-[1030px] grid grid-rows-2 gap-6">

          {/* <div className="lg:col-span-2 grid grid-rows-2 gap-6 items-center"> 
                {[news.slice(1, 3), news.slice(3, 5)].map( */}

            {[news.slice(0, 2), news.slice(2, 4)].map(
              (group, gIndex) => (
                <div
                  key={gIndex}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  {group.map((news) => (
                    <Link
                      key={news.id}
                      to={localizePath(language, `/news/${news.slug}`)}
                      className="relative h-[285px] rounded-lg overflow-hidden shadow-primary/20 shadow-lg hover:shadow-primary/40 hover:shadow-xl transition-all duration-300 group"
                    >
                      <ImageWithFallback
                        src={news.image}
                        alt={news.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                      {/* <div className="absolute top-4 left-4">
                        <Badge
                          className={`text-white text-xs font-medium ${
                            news?.category?.toLowerCase().includes(
                              "policy"
                            ) ||
                            news?.category
                              ?.toLowerCase()
                              .includes("політична")
                              ? "bg-red-600 hover:bg-red-700"
                              : news?.category
                                  ?.toLowerCase()
                                  .includes("working") ||
                                news?.category
                                  ?.toLowerCase()
                                  .includes("робоча")
                              ? "bg-purple-600 hover:bg-purple-700"
                              : news?.category
                                  ?.toLowerCase()
                                  .includes("analysis") ||
                                news?.category
                                  ?.toLowerCase()
                                  .includes("аналіз")
                              ? "bg-green-600 hover:bg-green-700"
                              : news?.category
                                  ?.toLowerCase()
                                  .includes("report") ||
                                news?.category
                                  ?.toLowerCase()
                                  .includes("звіт")
                              ? "bg-orange-600 hover:bg-orange-700"
                              : "bg-blue-600 hover:bg-blue-700"
                          }`}
                        >
                          {news.category}
                        </Badge>
                      </div> */}

                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                        <h3 className="text-base font-medium leading-tight mb-2 group-hover:text-blue-200 transition-colors line-clamp-2">
                          {news.title}
                        </h3>
                        {/* <p className="text-white/90 text-xs mb-2">
                          {news.authors}
                        </p> */}
                        <p className="text-white/80 text-xs mb-3">
                          {news.dateFull}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {news.tags?.slice(0, 2).map((tag, tagIndex) => (
                            <Badge
                              key={tagIndex}
                              variant="outline"
                              className="border-white/40 text-white/90 hover:bg-white/10 text-xs"
                            >
                              {tag}
                            </Badge>
                          ))}
                          {news.tags && news.tags.length > 2 && (
                            <Badge
                              variant="outline"
                              className="border-white/40 text-white/90 hover:bg-white/10 text-xs"
                            >
                              ...
                            </Badge>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )
            )}
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
