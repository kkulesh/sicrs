import React from "react";
import { Home, Users, BookOpen, FileText, Database, Mic, Calendar, Handshake, Phone, Info, Megaphone } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext.js";
import { Link, useLocation } from "react-router-dom";
import { Avatar } from "@radix-ui/react-avatar";

interface SideMenuProps {
  onNavigate?: (page: string) => void;
  onCloseMenu?: () => void;
}

export function SideMenu({ onNavigate, onCloseMenu }: SideMenuProps) {
  const { t } = useLanguage();
  const location = useLocation();

  const handleNavigation = (page?: string) => {
    if (onCloseMenu) {
      onCloseMenu();
    }

    if (page && onNavigate) {
      onNavigate(page);
    }
  };

  // Меню розбите на секції
  type MenuItem = {
    label: string;
    icon: React.ReactNode;
    to: string;
    page?: string;
  };

  const sections: MenuItem[][] = [
    [
      {
        label: t("header.nav.home"),
        icon: <Home className="w-4 h-4 mr-3" />,
        to: "/",
        page: "home",
      },
    ],
    [
      {
        label: t("header.topNav.about"),
        icon: <Info className="w-4 h-4 mr-3" />,
        to: "/#about-us",
      },
      {
        label: t("header.topNav.news"),
        icon: <Megaphone className="w-4 h-4 mr-3" />,
        to: "/#news",
      }
    ],
    [
      {
        label: t("header.topNav.partnership"),
        icon: <Handshake className="w-4 h-4 mr-3" />,
        to: "/#partners",
      },
      {
        label: t("header.topNav.experts"),
        icon: <Users className="w-4 h-4 mr-3" />,
        to: "/#experts",
      },
    ],
    [
      {
        label: t("header.topNav.contacts"),
        icon: <FileText className="w-4 h-4 mr-3" />,
        to: "/#footer",
      }
    ]
  ];

  return (
    <div className="flex-1 overflow-y-auto mx-4">
      {sections.map((section, secIdx) => (
        <div key={secIdx} className="space-y-2">
          {section.map((item, idx) => {
  const hashLinkActive =
    item.to.startsWith("/#") &&
    location.pathname === "/" &&
    location.hash === item.to.slice(1);

  const isActive =
    item.to === "/"
      ? location.pathname === "/" && !location.hash
      : location.pathname === item.to || hashLinkActive;

            return (
              <Link
                key={idx}
                to={item.to}
                onClick={() => handleNavigation(item.page)}
                className={`w-full flex items-center justify-start text-left text-[15px] h-11 px-4 rounded-full ${
  isActive
    ? "bg-white text-gray-900 font-medium"
    : "text-white/90 hover:text-white hover:bg-gradient-to-r from-white/30 to-transparent"
}`}
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}

          {/* Divider після секції, крім останньої */}
          {secIdx < sections.length - 1 && (
            <div className="border-t border-gray-300 pb-2 my-4"></div>
          )}
        </div>
      ))}
    </div>
  );
}
