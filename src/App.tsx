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

export default function App() {
  return (
    <LanguageProvider>
      <Router>
        <AppContent />
      </Router>
    </LanguageProvider>
  );
}
