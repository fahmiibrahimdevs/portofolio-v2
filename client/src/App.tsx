import React, { useState, useEffect, useCallback } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { api, getToken, removeToken } from "./api/client";
import { AdminUser } from "./types";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { HomePage } from "./pages/HomePage";
import { ProjectsPage } from "./pages/ProjectsPage";
import { ArticlesPage } from "./pages/ArticlesPage";
import { ContactPage } from "./pages/ContactPage";
import { ProjectDetailPage } from "./pages/ProjectDetailPage";
import { ArticleDetailPage } from "./pages/ArticleDetailPage";
import { AdminDashboard, TabType } from "./components/admin/AdminDashboard";
import { AdminLoginModal } from "./components/admin/AdminLoginModal";
import { Project, Article } from "./types";

export function App() {
  const queryClient = useQueryClient();
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(null);
  const [currentPage, setCurrentPage] = useState<"home" | "projects" | "articles" | "contact" | "project-detail" | "article-detail">("home");
  const [selectedProjectIdentifier, setSelectedProjectIdentifier] = useState<string>("");
  const [cachedProject, setCachedProject] = useState<Project | null>(null);
  const [selectedArticleIdentifier, setSelectedArticleIdentifier] = useState<string>("");
  const [cachedArticle, setCachedArticle] = useState<Article | null>(null);
  const [viewMode, setViewMode] = useState<"public" | "admin">("public");
  const [adminTab, setAdminTab] = useState<TabType>("profile");
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  // Sync state from current URL
  const syncStateFromLocation = useCallback(() => {
    const path = window.location.pathname.toLowerCase();
    const searchParams = new URLSearchParams(window.location.search);
    const tabParam = searchParams.get("tab") as TabType | null;

    if (path.startsWith("/admin")) {
      setViewMode("admin");
      if (tabParam) {
        setAdminTab(tabParam);
      }
    } else if (path.startsWith("/projects/")) {
      const slugOrId = window.location.pathname.substring("/projects/".length).trim();
      if (slugOrId) {
        setSelectedProjectIdentifier(slugOrId);
        setCurrentPage("project-detail");
        setViewMode("public");
      } else {
        setCurrentPage("projects");
        setViewMode("public");
      }
    } else if (path === "/projects" || path === "/projects/") {
      setCurrentPage("projects");
      setViewMode("public");
    } else if (path.startsWith("/articles/")) {
      const slugOrId = window.location.pathname.substring("/articles/".length).trim();
      if (slugOrId) {
        setSelectedArticleIdentifier(slugOrId);
        setCurrentPage("article-detail");
        setViewMode("public");
      } else {
        setCurrentPage("articles");
        setViewMode("public");
      }
    } else if (path === "/articles" || path === "/articles/") {
      setCurrentPage("articles");
      setViewMode("public");
    } else if (path.startsWith("/contact")) {
      setCurrentPage("contact");
      setViewMode("public");
    } else {
      setCurrentPage("home");
      setViewMode("public");
    }
  }, []);

  // Initial load URL routing & popstate listener
  useEffect(() => {
    syncStateFromLocation();

    const handlePopState = () => {
      syncStateFromLocation();
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [syncStateFromLocation]);

  // Check auth token session on load
  useEffect(() => {
    const token = getToken();
    if (token) {
      api.getMe()
        .then((res) => {
          setCurrentUser(res.user);
        })
        .catch(() => {
          removeToken();
          setCurrentUser(null);
        });
    }
  }, []);

  // Navigation helpers that update URL history
  const navigateToPage = (page: "home" | "projects" | "articles" | "contact", push = true) => {
    setCurrentPage(page);
    setViewMode("public");
    const targetUrl = page === "home" ? "/" : `/${page}`;
    if (push && window.location.pathname !== targetUrl) {
      window.history.pushState(null, "", targetUrl);
    }
  };

  const navigateToProjectDetail = (p: Project | string, push = true) => {
    const identifier = typeof p === "string" ? p : p.slug || String(p.id);
    setCachedProject(typeof p === "object" ? p : null);
    setSelectedProjectIdentifier(identifier);
    setCurrentPage("project-detail");
    setViewMode("public");
    const targetUrl = `/projects/${identifier}`;
    if (push && window.location.pathname !== targetUrl) {
      window.history.pushState(null, "", targetUrl);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navigateToArticleDetail = (a: Article | string, push = true) => {
    const identifier = typeof a === "string" ? a : a.slug || String(a.id);
    setCachedArticle(typeof a === "object" ? a : null);
    setSelectedArticleIdentifier(identifier);
    setCurrentPage("article-detail");
    setViewMode("public");
    const targetUrl = `/articles/${identifier}`;
    if (push && window.location.pathname !== targetUrl) {
      window.history.pushState(null, "", targetUrl);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navigateToAdmin = (tab: TabType = "profile", push = true) => {
    setViewMode("admin");
    setAdminTab(tab);
    const targetUrl = `/admin?tab=${tab}`;
    if (push && (window.location.pathname + window.location.search) !== targetUrl) {
      window.history.pushState(null, "", targetUrl);
    }
  };

  const handleBackToPublic = () => {
    navigateToPage("projects", true);
  };

  // TanStack Queries for dynamic content
  const { data: profileData, isLoading: profileLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: api.getProfile,
    staleTime: 1000 * 60 * 5,
  });

  const { data: expData, isLoading: expLoading } = useQuery({
    queryKey: ["experiences"],
    queryFn: api.getExperiences,
    staleTime: 1000 * 60 * 5,
  });

  const { data: univData, isLoading: univLoading } = useQuery({
    queryKey: ["university"],
    queryFn: api.getUniversity,
    staleTime: 1000 * 60 * 5,
  });

  const { data: techData, isLoading: techLoading } = useQuery({
    queryKey: ["tech-stack"],
    queryFn: api.getTechStack,
    staleTime: 1000 * 60 * 5,
  });

  const { data: credData, isLoading: credLoading } = useQuery({
    queryKey: ["credentials"],
    queryFn: api.getCredentials,
    staleTime: 1000 * 60 * 5,
  });

  // Projects queries
  const { data: projectsData, isLoading: projectsLoading } = useQuery({
    queryKey: ["projects", Boolean(currentUser)],
    queryFn: () => api.getProjects({ all: Boolean(currentUser) }),
    staleTime: 1000 * 60 * 5,
  });

  const { data: projCatsData } = useQuery({
    queryKey: ["project-categories"],
    queryFn: api.getProjectCategories,
    staleTime: 1000 * 60 * 10,
  });

  const { data: projTagsData } = useQuery({
    queryKey: ["project-tags"],
    queryFn: api.getProjectTags,
    staleTime: 1000 * 60 * 10,
  });

  // Articles queries
  const { data: articlesData, isLoading: articlesLoading } = useQuery({
    queryKey: ["articles", Boolean(currentUser)],
    queryFn: () => api.getArticles({ all: Boolean(currentUser) }),
    staleTime: 1000 * 60 * 5,
  });

  const { data: artCatsData } = useQuery({
    queryKey: ["article-categories"],
    queryFn: api.getArticleCategories,
    staleTime: 1000 * 60 * 10,
  });

  // Contact queries (only when logged in)
  const { data: contactsData } = useQuery({
    queryKey: ["contacts"],
    queryFn: api.getContactMessages,
    enabled: Boolean(currentUser),
  });

  const handleLoginSuccess = (user: AdminUser) => {
    setCurrentUser(user);
    queryClient.invalidateQueries({ queryKey: ["projects"] });
    queryClient.invalidateQueries({ queryKey: ["articles"] });
    navigateToAdmin("profile", true);
  };

  const handleLogout = () => {
    api.logout();
    setCurrentUser(null);
    queryClient.invalidateQueries({ queryKey: ["projects"] });
    queryClient.invalidateQueries({ queryKey: ["articles"] });
    navigateToPage("home", true);
  };

  const profile = profileData?.profile || null;
  const experiences = expData?.experiences || [];
  const universityAchievements = univData?.achievements || [];
  const techCategories = techData?.categories || [];
  const credentials = credData?.credentials || [];
  const projects = projectsData?.projects || [];
  const projectCategories = projCatsData?.categories || [];
  const projectTags = projTagsData?.tags || [];
  const articles = articlesData?.articles || [];
  const articleCategories = artCatsData?.categories || [];
  const contactMessages = contactsData?.messages || [];
  const unreadContactCount = contactsData?.unreadCount || 0;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-cyan-500/20 selection:text-cyan-300">
      {/* Universal Top Navbar */}
      <Navbar
        profile={profile}
        isAdmin={Boolean(currentUser)}
        currentPage={currentPage}
        onNavigate={(page) => {
          navigateToPage(page, true);
        }}
        onOpenAdminModal={() => setLoginModalOpen(true)}
        onLogout={handleLogout}
        isAdminDashboardView={viewMode === "admin"}
        onToggleView={() => {
          if (viewMode === "public") {
            navigateToAdmin("profile", true);
          } else {
            handleBackToPublic();
          }
        }}
      />

      {/* Main View Area */}
      <main className="flex-grow">
        {viewMode === "admin" && currentUser ? (
          <AdminDashboard
            currentUser={currentUser}
            profile={profile}
            experiences={experiences}
            universityAchievements={universityAchievements}
            techCategories={techCategories}
            credentials={credentials}
            projects={projects}
            projectCategories={projectCategories}
            projectTags={projectTags}
            articles={articles}
            articleCategories={articleCategories}
            contactMessages={contactMessages}
            unreadContactCount={unreadContactCount}
            initialTab={adminTab}
            onTabChange={(tab) => {
              setAdminTab(tab);
              window.history.pushState(null, "", `/admin?tab=${tab}`);
            }}
            onBackToPublic={handleBackToPublic}
            onLogout={handleLogout}
          />
        ) : (
          <div>
            {currentPage === "home" && (
              <HomePage
                profile={profile}
                profileLoading={profileLoading}
                experiences={experiences}
                expLoading={expLoading}
                universityAchievements={universityAchievements}
                univLoading={univLoading}
                techCategories={techCategories}
                techLoading={techLoading}
                credentials={credentials}
                credLoading={credLoading}
                projects={projects}
                projectsLoading={projectsLoading}
                articles={articles}
                articlesLoading={articlesLoading}
                onNavigate={(page) => {
                  navigateToPage(page, true);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                onSelectProject={navigateToProjectDetail}
                onSelectArticle={navigateToArticleDetail}
              />
            )}

            {currentPage === "projects" && (
              <ProjectsPage
                projects={projects}
                categories={projectCategories}
                isLoading={projectsLoading}
                onSelectProject={navigateToProjectDetail}
              />
            )}

            {currentPage === "project-detail" && (
              <ProjectDetailPage
                identifier={selectedProjectIdentifier}
                cachedProject={cachedProject}
                allProjects={projects}
                onBack={() => navigateToPage("projects", true)}
                onSelectProject={navigateToProjectDetail}
              />
            )}

            {currentPage === "articles" && (
              <ArticlesPage
                articles={articles}
                categories={articleCategories}
                isLoading={articlesLoading}
                onSelectArticle={navigateToArticleDetail}
              />
            )}

            {currentPage === "article-detail" && (
              <ArticleDetailPage
                identifier={selectedArticleIdentifier}
                cachedArticle={cachedArticle}
                allArticles={articles}
                onBack={() => navigateToPage("articles", true)}
                onSelectArticle={navigateToArticleDetail}
              />
            )}

            {currentPage === "contact" && (
              <ContactPage profile={profile} />
            )}
          </div>
        )}
      </main>

      {/* Universal Footer */}
      <Footer profile={profile} />

      {/* Admin Login Dialog */}
      <AdminLoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
}
