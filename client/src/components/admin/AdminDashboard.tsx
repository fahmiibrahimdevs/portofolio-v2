import React, { useState, useEffect } from "react";
import { 
  User, 
  Briefcase, 
  GraduationCap, 
  Cpu, 
  Award, 
  FolderKanban, 
  BookOpen, 
  MessageSquare, 
  ArrowLeft, 
  LogOut, 
  Shield, 
  Key, 
  CheckCircle2, 
  AlertCircle, 
  Loader2 
} from "lucide-react";
import { 
  Profile, 
  WorkExperience, 
  UniversityAchievement, 
  TechCategory, 
  Credential, 
  Project, 
  ProjectCategory, 
  ProjectTag, 
  Article, 
  ArticleCategory, 
  ContactMessage, 
  AdminUser 
} from "../../types";
import { ProfileTab } from "./tabs/ProfileTab";
import { ExperiencesTab } from "./tabs/ExperiencesTab";
import { UniversityTab } from "./tabs/UniversityTab";
import { TechnologyTab } from "./tabs/TechnologyTab";
import { CredentialsTab } from "./tabs/CredentialsTab";
import { ProjectsTab } from "./tabs/ProjectsTab";
import { ArticlesTab } from "./tabs/ArticlesTab";
import { ContactsTab } from "./tabs/ContactsTab";
import { Modal } from "../common/Modal";
import { api } from "../../api/client";

export type TabType = 
  | "profile" 
  | "projects" 
  | "articles" 
  | "experiences" 
  | "university" 
  | "technology" 
  | "credentials" 
  | "contacts";

interface AdminDashboardProps {
  currentUser: AdminUser;
  profile: Profile | null;
  experiences: WorkExperience[];
  universityAchievements: UniversityAchievement[];
  techCategories: TechCategory[];
  credentials: Credential[];
  projects: Project[];
  projectCategories: ProjectCategory[];
  projectTags: ProjectTag[];
  articles: Article[];
  articleCategories: ArticleCategory[];
  contactMessages: ContactMessage[];
  unreadContactCount: number;
  initialTab?: TabType;
  onTabChange?: (tab: TabType) => void;
  onBackToPublic: () => void;
  onLogout: () => void;
}

export function AdminDashboard({
  currentUser,
  profile,
  experiences,
  universityAchievements,
  techCategories,
  credentials,
  projects,
  projectCategories,
  projectTags,
  articles,
  articleCategories,
  contactMessages,
  unreadContactCount,
  initialTab = "profile",
  onTabChange,
  onBackToPublic,
  onLogout,
}: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<TabType>(initialTab);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    if (initialTab && initialTab !== activeTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  const handleTabClick = (tabId: TabType) => {
    setActiveTab(tabId);
    if (onTabChange) {
      onTabChange(tabId);
    }
  };

  const tabs: { id: TabType; label: string; icon: React.ElementType; count?: number; highlight?: boolean }[] = [
    { id: "profile", label: "Profile & Bio", icon: User },
    { id: "projects", label: "Projects", icon: FolderKanban, count: projects.length },
    { id: "articles", label: "Articles", icon: BookOpen, count: articles.length },
    { id: "contacts", label: "Messages", icon: MessageSquare, count: unreadContactCount, highlight: unreadContactCount > 0 },
    { id: "experiences", label: "Work Experience", icon: Briefcase, count: experiences.length },
    { id: "university", label: "University & Research", icon: GraduationCap, count: universityAchievements.length },
    { id: "technology", label: "Technology Stack", icon: Cpu, count: techCategories.length },
    { id: "credentials", label: "Credentials & Honors", icon: Award, count: credentials.length },
  ];

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setPasswordMessage({ type: "error", text: "New passwords do not match." });
      return;
    }
    if (newPassword.length < 6) {
      setPasswordMessage({ type: "error", text: "New password must be at least 6 characters." });
      return;
    }

    setPasswordLoading(true);
    setPasswordMessage(null);

    try {
      await api.changePassword(currentPassword, newPassword);
      setPasswordMessage({ type: "success", text: "Password changed successfully!" });
      setTimeout(() => {
        setPasswordModalOpen(false);
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setPasswordMessage(null);
      }, 2000);
    } catch (err: any) {
      setPasswordMessage({ type: "error", text: err.message || "Failed to update password." });
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pt-20 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Top Header Card */}
        <div className="p-6 bg-slate-900/80 border border-slate-800 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-cyan-950/60 border border-cyan-800/60 text-cyan-400 flex items-center justify-center font-bold text-base shadow-inner">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-bold text-slate-100">
                  Portfolio CMS Dashboard
                </h1>
                <span className="badge-soft-cyan text-[10px] font-semibold px-2 py-0.5 rounded-md">
                  Administrator
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Logged in as <strong className="text-slate-200">{currentUser.name}</strong> ({currentUser.username})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => setPasswordModalOpen(true)}
              className="px-3 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-950 border border-slate-800 rounded-xl hover:bg-slate-800 transition-colors flex items-center gap-1.5"
              title="Change Password"
            >
              <Key className="w-3.5 h-3.5 text-amber-400" />
              <span>Password</span>
            </button>

            <button
              type="button"
              onClick={onBackToPublic}
              className="px-3.5 py-2 text-xs font-semibold text-cyan-300 hover:text-cyan-200 bg-cyan-950/40 border border-cyan-800/40 rounded-xl hover:bg-cyan-900/50 transition-colors flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Public View</span>
            </button>

            <button
              type="button"
              onClick={onLogout}
              className="p-2 text-slate-400 hover:text-rose-400 hover:bg-slate-950 border border-slate-800 rounded-xl transition-colors"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-slate-800">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                  isActive
                    ? "bg-slate-900 text-cyan-400 border border-cyan-800/50 shadow-sm"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/50 border border-transparent"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {typeof tab.count === "number" && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      tab.highlight
                        ? "bg-emerald-500 text-white font-bold animate-pulse"
                        : isActive
                        ? "bg-cyan-950 text-cyan-300"
                        : "bg-slate-800 text-slate-400"
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tab Content Box */}
        <div className="p-6 bg-slate-900/70 border border-slate-800 rounded-2xl shadow-xl">
          {activeTab === "profile" && <ProfileTab profile={profile} />}
          {activeTab === "projects" && (
            <ProjectsTab
              projects={projects}
              categories={projectCategories}
              tags={projectTags}
            />
          )}
          {activeTab === "articles" && (
            <ArticlesTab
              articles={articles}
              categories={articleCategories}
            />
          )}
          {activeTab === "contacts" && <ContactsTab messages={contactMessages} />}
          {activeTab === "experiences" && <ExperiencesTab experiences={experiences} />}
          {activeTab === "university" && <UniversityTab achievements={universityAchievements} />}
          {activeTab === "technology" && <TechnologyTab categories={techCategories} />}
          {activeTab === "credentials" && <CredentialsTab credentials={credentials} />}
        </div>
      </div>

      {/* Change Password Modal */}
      <Modal
        isOpen={passwordModalOpen}
        onClose={() => setPasswordModalOpen(false)}
        title="Change Admin Password"
        maxWidth="sm"
      >
        <form onSubmit={handlePasswordChange} className="space-y-4">
          {passwordMessage && (
            <div
              className={`flex items-center gap-2 p-3 rounded-xl text-xs ${
                passwordMessage.type === "success"
                  ? "bg-emerald-950/40 border border-emerald-800/40 text-emerald-300"
                  : "bg-rose-950/40 border border-rose-800/40 text-rose-300"
              }`}
            >
              {passwordMessage.type === "success" ? (
                <CheckCircle2 className="w-4 h-4 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 shrink-0" />
              )}
              <span>{passwordMessage.text}</span>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-300 uppercase">
              Current Password
            </label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-300 uppercase">
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Minimum 6 characters"
              className="w-full px-3 py-2 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-300 uppercase">
              Confirm New Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
              required
            />
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={() => setPasswordModalOpen(false)}
              className="px-4 py-2 text-xs text-slate-400 hover:text-slate-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={passwordLoading}
              className="px-5 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold rounded-xl"
            >
              {passwordLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : "Update Password"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
