import React, { useState } from "react";
import { 
  FileText, 
  Lock, 
  Menu, 
  X, 
  Home, 
  FolderKanban, 
  BookOpen, 
  MessageSquare, 
  Settings, 
  LogOut 
} from "lucide-react";
import { Profile } from "../../types";
import { ThemeToggle } from "../common/ThemeToggle";

interface NavbarProps {
  profile: Profile | null;
  isAdmin: boolean;
  currentPage: "home" | "projects" | "articles" | "contact" | "admin" | "project-detail" | "article-detail";
  onNavigate: (page: "home" | "projects" | "articles" | "contact") => void;
  onOpenAdminModal: () => void;
  onLogout: () => void;
  isAdminDashboardView?: boolean;
  onToggleView?: () => void;
}

export function Navbar({
  profile,
  isAdmin,
  currentPage,
  onNavigate,
  onOpenAdminModal,
  onLogout,
  isAdminDashboardView,
  onToggleView,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { id: "home" | "projects" | "articles" | "contact"; label: string; icon: React.ElementType }[] = [
    { id: "home", label: "Home", icon: Home },
    { id: "projects", label: "Projects", icon: FolderKanban },
    { id: "articles", label: "Articles", icon: BookOpen },
    { id: "contact", label: "Contact Us", icon: MessageSquare },
  ];

  const handleNavClick = (page: "home" | "projects" | "articles" | "contact") => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80 transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Brand */}
          <button 
            type="button"
            onClick={() => handleNavClick("home")}
            className="flex items-center gap-3 group text-left"
          >
            <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-700/60 flex items-center justify-center text-cyan-400 font-black text-sm tracking-wider shadow-inner group-hover:border-cyan-500/50 transition-colors">
              FI
            </div>
            <div>
              <span className="font-bold text-sm sm:text-base text-slate-100 tracking-tight group-hover:text-cyan-400 transition-colors">
                {profile?.full_name || "Fahmi Ibrahim"}
              </span>
              <p className="text-[11px] text-slate-400 font-mono tracking-wide -mt-0.5">
                @fahmiibrahimdevs
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          {!isAdminDashboardView ? (
            <div className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1 rounded-2xl border border-slate-800/80">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive =
                  currentPage === link.id ||
                  (link.id === "projects" && currentPage === "project-detail") ||
                  (link.id === "articles" && currentPage === "article-detail");

                return (
                  <button
                    key={link.id}
                    type="button"
                    onClick={() => handleNavClick(link.id)}
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-all ${
                      isActive
                        ? "bg-slate-800 text-cyan-400 shadow-sm border border-slate-700/60"
                        : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/40"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{link.label}</span>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <span className="badge-soft-cyan text-xs font-semibold px-2.5 py-1 rounded-md">
                Admin Mode
              </span>
            </div>
          )}

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-3">
            {profile?.resume_url && !isAdminDashboardView && (
              <a
                href={profile.resume_url}
                target="_blank"
                rel="noopener noreferrer"
                download={profile.resume_filename || "CV_Fahmi_Ibrahim.pdf"}
                className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-cyan-400 border border-slate-700/70 hover:border-cyan-500/40 rounded-xl transition-all shadow-sm"
              >
                <FileText className="w-3.5 h-3.5 text-cyan-400" />
                <span>My Resume</span>
              </a>
            )}

            {/* Theme Toggle Button */}
            <ThemeToggle />

            {isAdmin ? (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onToggleView}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold badge-soft-cyan hover:opacity-90 rounded-xl transition-colors shadow-sm"
                >
                  <Settings className="w-3.5 h-3.5" />
                  <span>{isAdminDashboardView ? "Public View" : "CMS Dashboard"}</span>
                </button>
                <button
                  type="button"
                  onClick={onLogout}
                  className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-900 rounded-lg transition-colors"
                  title="Logout Admin"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={onOpenAdminModal}
                className="p-2 text-slate-500 hover:text-slate-300 hover:bg-slate-900/80 rounded-lg transition-colors"
                title="Admin Login"
              >
                <Lock className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Mobile menu toggle */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />

            {profile?.resume_url && !isAdminDashboardView && (
              <a
                href={profile.resume_url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-slate-300 bg-slate-900 border border-slate-800 rounded-lg"
              >
                <FileText className="w-4 h-4 text-cyan-400" />
              </a>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white bg-slate-900 border border-slate-800 rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-slate-950/95 px-4 pt-2 pb-5 space-y-3">
          {!isAdminDashboardView && (
            <div className="space-y-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive =
                  currentPage === link.id ||
                  (link.id === "projects" && currentPage === "project-detail") ||
                  (link.id === "articles" && currentPage === "article-detail");

                return (
                  <button
                    key={link.id}
                    type="button"
                    onClick={() => handleNavClick(link.id)}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 text-sm rounded-lg transition-colors text-left ${
                      isActive
                        ? "bg-slate-800 text-cyan-400 font-semibold"
                        : "text-slate-300 hover:text-cyan-400 hover:bg-slate-800/60"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{link.label}</span>
                  </button>
                );
              })}
            </div>
          )}

          <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
            {isAdmin ? (
              <div className="flex items-center justify-between w-full">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onToggleView?.();
                  }}
                  className="flex items-center gap-2 text-xs text-cyan-400 font-semibold py-1.5"
                >
                  <Settings className="w-4 h-4" />
                  <span>{isAdminDashboardView ? "Back to Public View" : "CMS Dashboard"}</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onLogout();
                  }}
                  className="text-xs text-rose-400 hover:underline py-1.5 font-medium"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdminModal();
                }}
                className="flex items-center gap-2 text-xs text-slate-400 hover:text-slate-100 py-1"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Admin Login</span>
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
