import { useState, useMemo } from 'react';
import { useLanguage } from "../contexts/LanguageContext.js";
import { Articles } from "../components/data/ArticlesData.js";

interface SearchResult {
  id: string;
  slug: string;
  type: 'news' ;
  title: string;
  description?: string;
  category?: string;
  author?: string;
  date?: string;
  tags?: string[];
  image?: string;
}

export function useSearch() {
  const { t, language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data, API or database
  const searchData = useMemo((): SearchResult[] => {
    const isUk = language === "uk";
    const news = Articles(isUk);

    return news.map(news => {
      const item: SearchResult = {
        id: news.id,
        slug: news.slug,
        type: "news",
        title: news.title,
        description: news.description ?? "",
        category: news.category,
        author: news.authors,
        tags: news.tags,
        image: news.image
      };

      if (news.dateTime) {
        item.date = news.dateTime;
      }

      return item;
    });
  }, [t]);
    

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];

    const lowercaseSearchQuery = searchQuery.toLowerCase();
    
    return searchData.filter(item => {
      const searchString = `${item.title} ${item.description || ''} ${item.author || ''} ${item.category || ''} ${item.tags?.join(' ') || ''}`.toLowerCase();
      return searchString.includes(lowercaseSearchQuery);
    }).slice(0, 10); // Limit to 10 results
  }, [searchQuery, searchData]);

  return {
    searchQuery,
    setSearchQuery,
    searchResults,
    searchData
  };
}