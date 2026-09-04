import React from "react";
import { 
  Profile, 
  WorkExperience, 
  UniversityAchievement, 
  TechCategory, 
  Credential, 
  Project, 
  Article 
} from "../types";
import { HeroSection } from "../components/home/HeroSection";
import { LatestProjectsSection } from "../components/home/LatestProjectsSection";
import { LatestArticlesSection } from "../components/home/LatestArticlesSection";
import { ExperienceSection } from "../components/home/ExperienceSection";
import { UniversitySection } from "../components/home/UniversitySection";
import { TechStackSection } from "../components/home/TechStackSection";
import { CredentialsSection } from "../components/home/CredentialsSection";

interface HomePageProps {
  profile: Profile | null;
  profileLoading: boolean;
  experiences: WorkExperience[];
  expLoading: boolean;
  universityAchievements: UniversityAchievement[];
  univLoading: boolean;
  techCategories: TechCategory[];
  techLoading: boolean;
  credentials: Credential[];
  credLoading: boolean;
  projects: Project[];
  projectsLoading: boolean;
  articles: Article[];
  articlesLoading: boolean;
  onNavigate: (page: "home" | "projects" | "articles" | "contact") => void;
  onSelectProject: (project: Project) => void;
  onSelectArticle: (article: Article) => void;
}

export function HomePage({
  profile,
  profileLoading,
  experiences,
  expLoading,
  universityAchievements,
  univLoading,
  techCategories,
  techLoading,
  credentials,
  credLoading,
  projects,
  projectsLoading,
  articles,
  articlesLoading,
  onNavigate,
  onSelectProject,
  onSelectArticle,
}: HomePageProps) {
  return (
    <div className="space-y-4">
      {/* 1. Hero */}
      <HeroSection profile={profile} isLoading={profileLoading} />

      {/* 2. Career Experience */}
      <ExperienceSection experiences={experiences} isLoading={expLoading} />

      {/* 3. University & Research */}
      <UniversitySection achievements={universityAchievements} isLoading={univLoading} />

      {/* 4. Technology Stack */}
      <TechStackSection categories={techCategories} isLoading={techLoading} />

      {/* 5. Credentials & Certifications */}
      <CredentialsSection credentials={credentials} isLoading={credLoading} />

      {/* 6. Latest Projects Preview */}
      <LatestProjectsSection
        projects={projects}
        isLoading={projectsLoading}
        onNavigateToProjects={() => onNavigate("projects")}
        onOpenDetail={(p) => onSelectProject(p)}
      />

      {/* 7. Latest Articles Preview */}
      <LatestArticlesSection
        articles={articles}
        isLoading={articlesLoading}
        onNavigateToArticles={() => onNavigate("articles")}
        onRead={(a) => onSelectArticle(a)}
      />
    </div>
  );
}
