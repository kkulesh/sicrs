import React, { useState, useEffect } from 'react';
import { Button } from "./ui/button.js";
import { Input } from "./ui/input.js";
import { Globe, Search, Menu, X } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "./ui/sheet.js";
import { useLanguage } from "../contexts/LanguageContext.js";
import { localizePath, stripLangPrefix } from "../utils/routeHelpers.js";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { HeaderContent } from "./data/HeaderContent.js";
import { SideMenu } from "./SideMenu.js";
import { useSearch } from "../hooks/useSearch.js";
import { SearchResults } from "./SearchResults.js";


export function Header() {
  const { language, setLanguage, t } = useLanguage();
  const isUk = language === "uk";
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { searchQuery, setSearchQuery, searchResults } = useSearch();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  // Мапимо URL на ключ для HeaderContent основних сторінок
  const routeToPage: Record<string, string> = {
    "/": "home",
    "/contacts": "contacts",
    "/publications": "publications",
    "/events": "events",
    "/experts": "experts",
    "/partnership": "partnership",
    "/about-us": "about"
  };

  // Детальні сторінки з окремим ключем
  const detailRoutes: Record<string, string> = {
    "/publications/": "publicationDetail",
    "/events/": "eventDetail",
    "/experts/": "expertDetail",
    "/news/": "articleDetail",
    "/about-us/team/": "teamMemberDetail"
  };

  const normalizedPath = location.pathname.replace(/^\/(en|uk)(?=\/|$)/, '') || '/';

  // Перевіряємо спочатку детальні маршрути
  const detailPage = Object.entries(detailRoutes).find(([prefix]) =>
    normalizedPath.startsWith(prefix)
  )?.[1];

  // Якщо це детальна сторінка — використовуємо окремий фон
  const currentPage = detailPage ?? routeToPage[normalizedPath] ?? "home";

  const pageData = HeaderContent[currentPage] ?? HeaderContent.fallback ?? {
    background: "",
    height: ""
  };

  const navigate = useNavigate();

  const handleNavigation = (page: string) => {
    setIsMenuOpen(false);
    const target = localizePath(language, page ? `/${page}` : '/');
    navigate(target);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleLanguage = () => {
    const nextLanguage = language === "uk" ? "en" : "uk";

    // Only switch the language in state — do not change the URL (remove /en /uk prefixes)
    setLanguage(nextLanguage);
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is handled by the useSearch hook automatically
  };

  return (
    <header
      className="relative w-full"
      style={{ height: pageData.height || "560px" }}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={pageData.background}
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20"></div>
      </div> 

      {/* Header Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full pt-12">
        <div className="flex items-start justify-between h-full">

          {/* Logo Section */}
          <div className="flex-shrink-0 font-sans">
            <Link to={localizePath(language, "/")} className="flex items-center space-x-4 cursor-pointer group">
            
            {/* Center Logo */}
            <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center text-gray-900 group-hover:bg-gray-100 transition-colors shadow-lg">
              <img
                src="/images/Logos/L-100x100.png"
                alt="Logo"
                className="w-16 h-16 object-contain"
              />
            </div>

            {/* Title - Hidden on mobile */}
            <div
              className={`hidden sm:block max-w-xs overflow-hidden font-sans${
                isUk ? "leading-tight" : "leading-tight"
              }`}
            >
              <h1 className={`text-white text-2xl font-medium whitespace-pre-line ${
                isUk ? "leading-snug" : "leading-snug"
              }`}>
                {t("header.title")}
              </h1>
              <p className={`text-white/80 text-lg whitespace-pre-line ${
                isUk ? "leading-tight" : "leading-tight"
              }`}>
                {t("header.subtitle")}
              </p>
            </div>
          </Link>
          </div>

          {/* Navigation Section */}
          <div className="hidden xl:flex flex-col items-end justify-center space-y-6 flex-1 ml-8">

            <div className="relative flex items-center justify-end">
              {/* Top navigation row */}
              <div className={`flex items-center justify-between w-full transition-all duration-300 ${isSearchOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                <div className="flex items-center space-x-8 text-lg">

                  <Link to="#about-us" className="px-3 py-2 rounded-full text-white/90 hover:text-white hover:bg-white/10 transition-all">
                    {t('header.topNav.about')}
                  </Link>
                  
                  <Link to="#news" className="px-3 py-2 rounded-full text-white/90 hover:text-white hover:bg-white/10 transition-all">
                    {t('header.topNav.news')}
                  </Link>

                  <Link to="#partners" className="px-3 py-2 rounded-full text-white/90 hover:text-white hover:bg-white/10 transition-all">
                    {t('header.topNav.partnership')}
                  </Link>

                  <Link to="#experts" className="px-3 py-2 rounded-full text-white/90 hover:text-white hover:bg-white/10 transition-all">
                    {t('header.topNav.experts')}
                  </Link>

                  <Link to="#footer" className="px-3 py-2 rounded-full text-white/90 hover:text-white hover:bg-white/10 transition-all">
                    {t('header.topNav.contacts')}
                  </Link>

                  <Button onClick={toggleLanguage} variant="ghost" size="sm" className="text-white/90 hover:text-white hover:bg-white/10 h-10 px-4 rounded-full flex items-center">
                    <Globe className="w-5 h-5 mr-2" />
                    {language === "uk" ? "EN" : "UA"}
                  </Button>
                </div>

                {/* Search button */}
                <Button
                  onClick={() => setIsSearchOpen(true)}
                  variant="ghost"
                  size="sm"
                  className="text-white/90 hover:text-white hover:bg-white/10 h-10 w-10 p-0 mr-1 rounded-full"
                >
                  <Search className="w-5 h-5" />
                </Button>
              </div>

              {/* Search bar */}
              {isSearchOpen && (
                <form
                  onSubmit={handleSearchSubmit}
                  className="absolute inset-x-0 top-0 z-50 flex items-center justify-start"
                >
                  <Input
                    type="text"
                    placeholder={t('search.placeholder')}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full max-w-[200rem] h-10 bg-white/90 border border-gray-300 text-gray-900 placeholder:text-gray-500 pl-10 pr-12 rounded-lg focus:bg-white focus:border-blue-500 focus:ring-blue-500"
                    autoFocus
                  />

                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-600" />

                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-gray-100 rounded-lg "
                    onClick={() => {
                      setIsSearchOpen(false);
                      setSearchQuery('');
                    }}
                  >
                    <X className="w-4 h-4 text-gray-600 hover:text-gray-400" />
                  </Button>
                </form>
              )}
            
            {/* Search results */}
            {isSearchOpen && searchQuery && (
              <SearchResults
                searchQuery={searchQuery}
                results={searchResults}
                onClose={() => {
                  setIsSearchOpen(false);
                  setSearchQuery('');
                }}
              />
            )}
          </div>


            {/*
            Bottom Navigation Row 
            <div className="flex items-center space-x-8 text-lg">
              <Link
                to="/publications"
                className={`font-bold transition-colors px-3 py-2 rounded-full ${
                  currentPage === "publications"
                    ? "text-white bg-white/20 shadow-lg"
                    : "text-white/90 hover:text-white hover:bg-white/10"
                }`}
              >
                {t("header.bottomNav.publications")}
              </Link>
              <Link
                to="/events"
                className={`font-bold transition-colors px-3 py-2 rounded-full ${
                  currentPage === "events"
                    ? "text-white bg-white/20 shadow-lg"
                    : "text-white/90 hover:text-white hover:bg-white/10"
                }`}
              >
                {t("header.bottomNav.events")}
              </Link>
              <Link
                to="/experts"
                className={`font-bold transition-colors px-3 py-2 rounded-full ${
                  currentPage === "experts"
                    ? "text-white bg-white/20 shadow-lg"
                    : "text-white/90 hover:text-white hover:bg-white/10"
                }`}
              >
                {t("header.bottomNav.experts")}
              </Link>
            </div>
            */}
          </div>
          

          {/* Mobile Menu with SideMenu */}
            <div className="xl:hidden">
              <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="2xl"
                    className="text-white hover:bg-white/10 p-10 h-8 w-8 rounded-full"
                  >
                    <Menu className="h-8 w-10" />
                  </Button>
                </SheetTrigger>

                <SheetContent
                  side="right"
                  className={`
                    w-80 sm:w-96 bg-gray-900 text-white
                    ${isMenuOpen ? 'slide-in' : 'slide-out'}
                  `}
                  >

                  <SheetHeader className="pb-2">
                    <div>
                      <SheetTitle className="text-left text-2xl font-medium text-white/90">
                        {t('header.nav.menu')}
                      </SheetTitle>
                    </div>
                  </SheetHeader>

                  <div className="flex-1 overflow-y-auto">
                    <SideMenu onNavigate={handleNavigation} onCloseMenu={() => setIsMenuOpen(false)} />
                  </div>
                </SheetContent>
              </Sheet>
            </div>


          {/* Bottom text section */}
            {(() => {
              // Отримуємо тексти: або переклад, або pageData, або undefined
              const bottomText1 = t(`header.bottomText1.${currentPage}`) !== `header.bottomText1.${currentPage}`
                ? t(`header.bottomText1.${currentPage}`)
                : pageData.bottomText1;

              const bottomText2 = t(`header.bottomText2.${currentPage}`) !== `header.bottomText2.${currentPage}`
                ? t(`header.bottomText2.${currentPage}`)
                : pageData.bottomText2;

              // Якщо немає жодного тексту, нічого не рендеримо
              if (!bottomText1 && !bottomText2) return null;

              return (
                <div className="absolute bottom-12 text-left space-y-4">
                  {bottomText1 && (
                    <p className="text-white text-3xl font-bold max-w-4xl leading-snug whitespace-pre-line">
                      {bottomText1}
                    </p> // 4.75xl
                  )}
                  {bottomText2 && (
                    <p className="text-white text-xl font-medium max-w-lg leading-relaxed whitespace-pre-line">
                      {bottomText2}
                    </p>
                  )}
                </div>
              );
            })()}
          </div>
        </div>
      </header>
    );
  }
