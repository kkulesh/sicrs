import { NewsSection } from "./Homepage/NewsSection.js";
import { FormHero } from "./Homepage/FormHero.js";
import { TasksSection } from "./Homepage/TasksSection.js";
import { InitiativesSection } from "./Homepage/InitiativesSection.js";
import { PartnershipsSection } from "./Homepage/PartnershipsSection.js";
import { StatsSection } from "./Homepage/StatsSection.js";

export function HomePage() {
  return (
    <main>
      <NewsSection />
      <TasksSection />
      <FormHero />
      <PartnershipsSection />
    </main>
  );
}

// <InitiativesSection /> 
// <StatsSection /> 