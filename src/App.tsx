import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

import { LanguageProvider, useLanguage } from "./contexts/LanguageContext.js";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Header } from "./components/Header.js";
import { StickyHeader } from "./components/StickyHeader.js";
import { Footer } from "./components/Footer.js";
// import { CookieBanner } from "./components/CookieBanner.js";

import { HomePage } from "./components/HomePage.js";
import { ArticlesDetailPage } from "./components/ArticlesDetailPage.js";
import { AdminAnalytics } from "./components/AdminAnalytics.js";
import { ContactForm } from "./components/ContactForm.js";
import { AdminContacts } from "./components/AdminContacts.js";

// Змінна для контролю режиму "Сайт в розробці"
const UNDER_CONSTRUCTION = false; // Змінити на false, коли сайт буде готовий

function ScrollToHash() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) {
      return;
    }

    const id = location.hash.substring(1);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [location.hash]);

  return null;
}

function AppContent() {
  const location = useLocation();
  const { language, setLanguage } = useLanguage();

  useEffect(() => {
    const match = location.pathname.match(/^\/(en|uk)(?:\/|$)/);
    if (match && match[1] !== language) {
      setLanguage(match[1] as "uk" | "en");
    }
  }, [location.pathname, language, setLanguage]);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <StickyHeader />
      <ScrollToHash />

      <Routes>
        {/* Головна */}
        <Route path="/" element={<HomePage />} />
        <Route path="/:lang(en|uk)" element={<HomePage />} />

        {/* Новини */}
        <Route path="/news/:slug" element={<ArticlesDetailPage />} />
        <Route path="/:lang(en|uk)/news/:slug" element={<ArticlesDetailPage />} />

        {/* Форма зворотного зв'язку */}
        <Route path="/contact-form" element={<ContactForm />} />
        <Route path="/:lang(en|uk)/contact-form" element={<ContactForm />} />

        {/* Адмінка для звернень */}
        <Route path="/admin/contacts" element={<AdminContacts />} />
        <Route path="/:lang(en|uk)/admin/contacts" element={<AdminContacts />} />
        
        {/* Адмінка — аналітика */}
        <Route path="/admin/analytics" element={<AdminAnalytics />} />
        <Route path="/:lang(en|uk)/admin/analytics" element={<AdminAnalytics />} />
      </Routes>

      <Footer />
      {/* <CookieBanner /> */}
    </div>
  );
}

function UnderConstruction() {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/HeaderBackgrounds/18.png')" }}
      />
      <div className="absolute inset-0 z-0 bg-black/60" /> {/* Dark overlay for better text readability */}

      {/* Content Container */}
      <div className="z-10 flex flex-col items-center text-center p-8 md:p-12 bg-black/30 backdrop-blur-md rounded-3xl border border-white/10 shadow-2xl max-w-3xl transform transition-all">
        
        {/* Logo and Name block */}
        <a 
          href="https://sicrs.aprostir.org.ua/" 
          className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4 mb-8 group w-full"
        >
          {/* Center Logo */}
          <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center text-gray-900 group-hover:bg-gray-100 transition-colors shadow-lg">
            <img
              src="/images/Logos/L-100x100.png"
              alt="Logo"
              className="w-16 h-16 object-contain"
            />
          </div>

          {/* Title */}
          <div className="max-w-xs overflow-hidden font-sans text-center md:text-left">
            <h1 className="text-white text-2xl font-bold whitespace-pre-line leading-snug">
              SICRS
            </h1>
            <p className="text-white/80 text-lg whitespace-pre-line leading-tight">
              Society for industrial recovery{"\n"}& community resilience studies
            </p>
          </div>
        </a>

        {/* Message */}
        <p className="text-2xl md:text-3xl text-gray-200 mt-4 font-medium leading-relaxed">
          Сайт в розробці.
          <br className="hidden md:block" /> Перепрошуємо за незручності
        </p>

        {/* Decorative line */}
        <div className="w-24 h-1 bg-blue-600 rounded-full mt-10"></div>
      </div>
    </div>
  );
}

export default function App() {
  if (UNDER_CONSTRUCTION) {
    return <UnderConstruction />;
  }

  return (
    <LanguageProvider>
      <Router>
        <AppContent />
      </Router>
    </LanguageProvider>
  );
}
