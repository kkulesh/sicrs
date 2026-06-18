import { Button } from "./ui/button.js";
import { Badge } from "./ui/badge.js";
import { Card } from "./ui/card.js";
import { ArrowLeft, Calendar, Clock, User, Share2, BookOpen, Tag } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback.js";
import { useLanguage } from "../contexts/LanguageContext.js";
import { localizePath, stripLangPrefix } from "../utils/routeHelpers.js";
import { Link, useParams, useLocation } from "react-router-dom";
import { Articles } from "./data/ArticlesData.js";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  usePageTracking,
  useScrollTracking,
  useTimeTracking,
  useArticleTracking
} from "../analytics/analytics.js";

export function ArticlesDetailPage() {
  const { slug } = useParams();
  const { t, language } = useLanguage();
  const isUk = language === "uk";

  const location = useLocation();

  // Robust slug extraction: prefer param, otherwise strip lang prefix and take last segment
  const resolvedSlug = slug ?? (() => {
    const path = stripLangPrefix(location.pathname);
    const segments = path.split('/').filter(Boolean);
    // if path is like /news/some-slug, last segment is the slug
    return segments.length ? segments[segments.length - 1] : undefined;
  })();

  const articles = Articles(isUk);
  const article =
    articles.find(item => item.slug === resolvedSlug) ??
    articles.find(item => item.id === resolvedSlug) ??
    articles.find(item => item.id === "featured") ??
    articles[0];

  const normalizedContent = article?.content
    ? article.content.replace(/^\s{4}/gm, "").trim()
    : "";

  usePageTracking();
  useScrollTracking();
  useTimeTracking();
  useArticleTracking(article?.id);

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
          <Button 
            variant="ghost" 
            className="text-primary hover:text-primary-dark"
            onClick={() => {
              window.location.href = localizePath(language, '/#news');
            }}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {isUk ? 'Назад до новин' : 'Back to News'}
          </Button>
        </div>
      </div>

      {/* Article Header */}
      <section className="py-4 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div>
            {article.image && (
              <div className="mb-8 w-full flex justify-center">
                <img
                  src={article.image}
                  alt={article.title}
                  className="max-w-full w-full object-contain rounded-2xl shadow-lg border border-gray-100"
                  style={{ maxHeight: "80vh" }}
                />
              </div>
            )}

            {/* <Badge className="mb-4 bg-blue-600 text-white">
              {article.category}
            </Badge> */}
            
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
                <Badge key={index} variant="secondary" className="bg-gray-100 text-gray-800 text-lg">
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


       {/* Article Image 
      <section className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative h-72 sm:h-96 md:h-128 lg:h-256 rounded-lg overflow-hidden shadow-lg"> {/* h-64 md:h-96 
            {/* <ImageWithFallback
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section> */}

      {/* Article Content */}
      <section className="pt-4 pb-8 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-gray-900">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                img: ({ src, alt, ...props }) => (
                  <div className="my-6 overflow-hidden rounded-lg h-[400px]">
                    <img
                      src={src}
                      alt={alt}
                      {...props}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                ),

                p: ({ children }) => (
                  <p className="text-lg font-normal text-gray-900 leading-relaxed mb-6">
                    {children}
                  </p>
                ),

                strong: ({ children }) => (
                  <strong className="font-semibold text-gray-900">
                    {children}
                  </strong>
                ),

                em: ({ children }) => (
                  <em className="italic text-gray-900">{children}</em>
                ),

                ul: ({ children }) => (
                  <ul className="list-disc pl-6 mb-6 text-base text-gray-900">
                    {children}
                  </ul>
                ),

                ol: ({ children }) => (
                  <ol className="list-decimal pl-6 mb-6 text-base text-gray-900">
                    {children}
                  </ol>
                ),

                li: ({ children }) => (
                  <li className="text-base text-gray-900 leading-relaxed mb-2">
                    {children}
                  </li>
                ),

                h2: ({ children }) => (
                  <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">
                    {children}
                  </h2>
                ),
              }}
            >
              {normalizedContent}
            </ReactMarkdown>
          </div>
        </div>
      </section>
      
    </div>
  );
}