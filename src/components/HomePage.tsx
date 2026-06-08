import { NewsSection } from "./Homepage/NewsSection.js";
import { FormHero } from "./Homepage/FormHero.js";
import { AboutSection } from "./Homepage/AboutSection.js";
import { TasksSection } from "./Homepage/TasksSection.js";
import { InitiativesSection } from "./Homepage/InitiativesSection.js";
import { PartnershipsSection } from "./Homepage/PartnershipsSection.js";
import { ExpertsSection } from "./Homepage/ExpertsSection.js";
import { StatsSection } from "./Homepage/StatsSection.js";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  usePageTracking,
  useScrollTracking,
  useTimeTracking,
} from "../analytics/analytics.js";


export function HomePage() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [location.hash]);

  usePageTracking();
  useScrollTracking();
  useTimeTracking();

  return (
    <main>
      <AboutSection />
      <TasksSection />
      <NewsSection />
      <FormHero />
      <PartnershipsSection />
      <ExpertsSection />
    </main>
  );
}
// <InitiativesSection /> 
// <StatsSection /> 