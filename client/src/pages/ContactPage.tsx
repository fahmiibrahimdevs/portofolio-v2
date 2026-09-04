import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { 
  Mail, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  MapPin, 
  Github, 
  Linkedin, 
  Youtube, 
  Instagram, 
  MessageSquare, 
  Sparkles 
} from "lucide-react";
import { Profile } from "../types";
import { api } from "../api/client";

interface ContactPageProps {
  profile: Profile | null;
}

export function ContactPage({ profile }: ContactPageProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [notification, setNotification] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const contactMutation = useMutation({
    mutationFn: (data: { name: string; email: string; subject?: string; message: string }) =>
      api.submitContact(data),
    onSuccess: (res) => {
      setNotification({ type: "success", text: res.message });
      setFormData({ name: "", email: "", subject: "", message: "" });
    },
    onError: (err: any) => {
      setNotification({ type: "error", text: err.message || "Failed to send message." });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    contactMutation.mutate(formData);
  };

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-12">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold uppercase tracking-widest">
          <MessageSquare className="w-4 h-4" />
          <span>Get in Touch</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
          Contact & Collaboration
        </h1>
        <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">
          Have an interesting project, full-time/freelance opportunity, or IoT consulting in mind? Feel free to send a message or connect through my social channels.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Contact Information & Socials (1 Column) */}
        <div className="space-y-6">
          {/* Availability Card */}
          <div className="p-5 rounded-2xl glass-panel space-y-3 border-emerald-500/30">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                Availability Status
              </span>
            </div>
            <p className="text-sm font-bold text-slate-100">
              Open for Opportunities
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              Available for Full-time Roles, Freelance Development, and IoT Hardware Consulting.
            </p>
          </div>

          {/* Direct Info List */}
          <div className="p-5 rounded-2xl glass-panel space-y-4">
            <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Direct Contact
            </h3>

            <div className="space-y-3 text-xs">
              {profile?.email && (
                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 text-slate-300 hover:text-emerald-400 hover:border-emerald-500/30 transition-all"
                >
                  <div className="p-2 rounded-lg bg-emerald-950/40 text-emerald-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 font-medium">Email Address</p>
                    <p className="text-xs font-semibold text-slate-200">{profile.email}</p>
                  </div>
                </a>
              )}

              {profile?.location && (
                <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 text-slate-300">
                  <div className="p-2 rounded-lg bg-slate-800 text-slate-400">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 font-medium">Location</p>
                    <p className="text-xs font-semibold text-slate-200">{profile.location}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Social Presence Card */}
          <div className="p-5 rounded-2xl glass-panel space-y-3">
            <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Social Networks
            </h3>

            <div className="grid grid-cols-2 gap-2 text-xs">
              {profile?.github_url && (
                <a
                  href={profile.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-2 rounded-xl bg-slate-950/60 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-all"
                >
                  <Github className="w-4 h-4 text-slate-400" />
                  <span className="font-medium">GitHub</span>
                </a>
              )}

              {profile?.linkedin_url && (
                <a
                  href={profile.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-2 rounded-xl bg-slate-950/60 border border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/30 transition-all"
                >
                  <Linkedin className="w-4 h-4 text-cyan-400" />
                  <span className="font-medium">LinkedIn</span>
                </a>
              )}

              {profile?.youtube_url && (
                <a
                  href={profile.youtube_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-2 rounded-xl bg-slate-950/60 border border-slate-800 text-slate-300 hover:text-rose-400 hover:border-rose-500/30 transition-all"
                >
                  <Youtube className="w-4 h-4 text-rose-400" />
                  <span className="font-medium">YouTube</span>
                </a>
              )}

              {profile?.instagram_url && (
                <a
                  href={profile.instagram_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-2 rounded-xl bg-slate-950/60 border border-slate-800 text-slate-300 hover:text-pink-400 hover:border-pink-500/30 transition-all"
                >
                  <Instagram className="w-4 h-4 text-pink-400" />
                  <span className="font-medium">Instagram</span>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Message Form (2 Columns) */}
        <div className="lg:col-span-2 p-6 sm:p-8 rounded-2xl glass-panel space-y-6">
          <div className="space-y-1 pb-4 border-b border-slate-800">
            <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              <Send className="w-4 h-4 text-emerald-400" />
              <span>Send a Direct Message</span>
            </h2>
            <p className="text-xs text-slate-400">
              Fill in the form below and I'll get back to you as soon as possible.
            </p>
          </div>

          {notification && (
            <div
              className={`flex items-center gap-2 p-4 rounded-xl text-xs ${
                notification.type === "success"
                  ? "bg-emerald-950/50 border border-emerald-800/60 text-emerald-300"
                  : "bg-rose-950/50 border border-rose-800/60 text-rose-300"
              }`}
            >
              {notification.type === "success" ? (
                <CheckCircle2 className="w-4 h-4 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 shrink-0" />
              )}
              <span>{notification.text}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Your Name <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. John Doe"
                  className="w-full px-3.5 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Your Email <span className="text-rose-400">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. john@example.com"
                  className="w-full px-3.5 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Subject
              </label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="e.g. Collaboration on IoT Web Application"
                className="w-full px-3.5 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Message <span className="text-rose-400">*</span>
              </label>
              <textarea
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Write your project details, inquiry, or question..."
                className="w-full px-3.5 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-slate-100 placeholder-slate-500 leading-relaxed focus:outline-none focus:border-emerald-500 transition-colors"
                required
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={contactMutation.isPending}
                className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs font-semibold rounded-xl shadow-lg shadow-emerald-950/50 transition-all"
              >
                {contactMutation.isPending ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
                <span>Send Message</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
