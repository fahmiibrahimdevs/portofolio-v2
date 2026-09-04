import React from "react";
import { Github, Linkedin, Youtube, Instagram, Mail, Heart } from "lucide-react";
import { Profile } from "../../types";

interface FooterProps {
  profile: Profile | null;
}

export function Footer({ profile }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-800/80 bg-slate-950 py-10 px-4 sm:px-6 lg:px-8 mt-12">
      <div className="max-w-6xl mx-auto flex flex-col items-center justify-between gap-6 sm:flex-row">
        {/* Left info */}
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
          <p className="text-sm font-semibold text-slate-200">
            {profile?.full_name || "Fahmi Ibrahim"}
          </p>
          <p className="text-xs text-slate-400 mt-0.5">
            {profile?.tagline || "Software Engineer & IoT Hardware Developer"}
          </p>
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-3">
          {profile?.github_url && (
            <a
              href={profile.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-slate-400 hover:text-cyan-400 hover:bg-slate-900 border border-slate-800 rounded-xl transition-colors"
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
              className="p-2 text-slate-400 hover:text-cyan-400 hover:bg-slate-900 border border-slate-800 rounded-xl transition-colors"
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
              className="p-2 text-slate-400 hover:text-rose-400 hover:bg-slate-900 border border-slate-800 rounded-xl transition-colors"
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
              className="p-2 text-slate-400 hover:text-pink-400 hover:bg-slate-900 border border-slate-800 rounded-xl transition-colors"
              title="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
          )}
          {profile?.email && (
            <a
              href={`mailto:${profile.email}`}
              className="p-2 text-slate-400 hover:text-emerald-400 hover:bg-slate-900 border border-slate-800 rounded-xl transition-colors"
              title="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          )}
        </div>

        {/* Copyright */}
        <p className="text-xs text-slate-400 text-center sm:text-right">
          &copy; {currentYear} {profile?.full_name || "Fahmi Ibrahim"}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
