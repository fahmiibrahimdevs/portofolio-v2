import React from "react";
import { 
  FileDown, 
  MapPin, 
  Sparkles, 
  Github, 
  Linkedin, 
  Youtube, 
  Instagram, 
  Mail, 
  ArrowDown 
} from "lucide-react";
import { Profile } from "../../types";

interface HeroSectionProps {
  profile: Profile | null;
  isLoading: boolean;
}

export function HeroSection({ profile, isLoading }: HeroSectionProps) {
  if (isLoading) {
    return (
      <section className="pt-24 pb-8 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto animate-pulse">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-center">
          <div className="order-1 lg:order-2 w-48 h-48 sm:w-56 sm:h-56 bg-slate-800 rounded-full mx-auto"></div>
          <div className="order-2 lg:order-1 lg:col-span-2 space-y-4">
            <div className="h-4 w-32 bg-slate-800 rounded"></div>
            <div className="h-10 w-3/4 bg-slate-800 rounded"></div>
            <div className="h-6 w-1/2 bg-slate-800 rounded"></div>
            <div className="h-20 w-full bg-slate-800 rounded"></div>
          </div>
        </div>
      </section>
    );
  }

  const isAvailable = Boolean(profile?.available_for_work);

  return (
    <section className="pt-24 pb-8 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-center">
        {/* Bio & Info Column */}
        <div className="order-2 lg:order-1 lg:col-span-2 space-y-6">
          {/* Status Badges */}
          <div className="flex flex-wrap items-center gap-2.5">
            {isAvailable && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium badge-soft-emerald">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Available for Projects & Work
              </span>
            )}

            {profile?.location && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium badge-soft-slate">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                {profile.location}
              </span>
            )}
          </div>

          {/* Heading */}
          <div className="space-y-2">
            <p className="text-sm sm:text-base font-semibold text-cyan-400 tracking-wide flex items-center gap-2">
              <span>Hello Everyone, I am</span>
              <Sparkles className="w-4 h-4 text-cyan-400/70" />
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-100 tracking-tight leading-tight">
              {profile?.full_name || "Fahmi Ibrahim"}
            </h1>
            <p className="text-lg sm:text-xl font-semibold text-slate-300">
              {profile?.tagline || "Software Engineer & IoT Hardware Developer"}
            </p>
          </div>

          {/* Dynamic Bio Description */}
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl">
            {profile?.bio ||
              "Software Engineer with experience in developing applications integrated with IoT hardware. Adept in application design, server-side development, and technical problem-solving."}
          </p>

          {/* Action Buttons & Socials */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            {profile?.resume_url && (
              <a
                href={profile.resume_url}
                target="_blank"
                rel="noopener noreferrer"
                download={profile.resume_filename || "CV_Fahmi_Ibrahim.pdf"}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-sm font-semibold rounded-xl shadow-lg shadow-cyan-950/40 hover:shadow-cyan-900/60 transition-all transform hover:-translate-y-0.5"
              >
                <FileDown className="w-4 h-4" />
                <span>My Resume</span>
              </a>
            )}

            <a
              href="#technology"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-slate-200 text-sm font-semibold border border-slate-700/60 rounded-xl transition-all shadow-sm"
            >
              <span>Explore Tech Stack</span>
              <ArrowDown className="w-3.5 h-3.5 text-cyan-400" />
            </a>

            {/* Social icons */}
            <div className="flex items-center gap-2 pl-2">
              {profile?.github_url && (
                <a
                  href={profile.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-slate-400 hover:text-cyan-400 hover:bg-slate-900 rounded-lg transition-colors border border-transparent hover:border-slate-800"
                  title="GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>
              )}
              {profile?.linkedin_url && (
                <a
                  href={profile.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-slate-400 hover:text-cyan-400 hover:bg-slate-900 rounded-lg transition-colors border border-transparent hover:border-slate-800"
                  title="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
              {profile?.youtube_url && (
                <a
                  href={profile.youtube_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-slate-400 hover:text-rose-400 hover:bg-slate-900 rounded-lg transition-colors border border-transparent hover:border-slate-800"
                  title="YouTube"
                >
                  <Youtube className="w-4 h-4" />
                </a>
              )}
              {profile?.instagram_url && (
                <a
                  href={profile.instagram_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-slate-400 hover:text-pink-400 hover:bg-slate-900 rounded-lg transition-colors border border-transparent hover:border-slate-800"
                  title="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              )}
              {profile?.email && (
                <a
                  href={`mailto:${profile.email}`}
                  className="p-2 text-slate-400 hover:text-emerald-400 hover:bg-slate-900 rounded-lg transition-colors border border-transparent hover:border-slate-800"
                  title="Email"
                >
                  <Mail className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Avatar Photo Column */}
        <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
          <div className="relative group">
            {/* Subtle glow border background */}
            <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-cyan-500/20 via-blue-500/10 to-transparent blur-md opacity-80 group-hover:opacity-100 transition-opacity"></div>
            
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full overflow-hidden border-2 border-slate-700/80 bg-slate-900 shadow-2xl flex items-center justify-center">
              {profile?.avatar_url ? (
                <img
                  src={profile.avatar_url}
                  alt={profile.full_name}
                  className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = "none";
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-slate-900 text-3xl font-bold text-cyan-400">
                  {profile?.full_name?.slice(0, 2).toUpperCase() || "FI"}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
