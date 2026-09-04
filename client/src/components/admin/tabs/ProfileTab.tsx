import React, { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Profile } from "../../../types";
import { api } from "../../../api/client";
import { FileUpload } from "../../common/FileUpload";
import { Save, Loader2, CheckCircle2, AlertCircle } from "lucide-react";

interface ProfileTabProps {
  profile: Profile | null;
}

export function ProfileTab({ profile }: ProfileTabProps) {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState<Partial<Profile>>({
    full_name: "",
    tagline: "",
    bio: "",
    avatar_url: "",
    resume_url: "",
    resume_filename: "CV_Fahmi_Ibrahim.pdf",
    email: "",
    github_url: "",
    linkedin_url: "",
    youtube_url: "",
    instagram_url: "",
    location: "Jakarta, Indonesia",
    available_for_work: 1,
  });

  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);

  useEffect(() => {
    if (profile) {
      setFormData({
        full_name: profile.full_name || "",
        tagline: profile.tagline || "",
        bio: profile.bio || "",
        avatar_url: profile.avatar_url || "",
        resume_url: profile.resume_url || "",
        resume_filename: profile.resume_filename || "CV_Fahmi_Ibrahim.pdf",
        email: profile.email || "",
        github_url: profile.github_url || "",
        linkedin_url: profile.linkedin_url || "",
        youtube_url: profile.youtube_url || "",
        instagram_url: profile.instagram_url || "",
        location: profile.location || "Jakarta, Indonesia",
        available_for_work: profile.available_for_work ? 1 : 0,
      });
    }
  }, [profile]);

  const updateMutation = useMutation({
    mutationFn: (data: Partial<Profile>) => api.updateProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      setNotification({ type: "success", message: "Profile updated successfully!" });
      setTimeout(() => setNotification(null), 3000);
    },
    onError: (err: any) => {
      setNotification({ type: "error", message: err.message || "Failed to update profile." });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateMutation.mutate(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-4">
        <div>
          <h3 className="text-base font-semibold text-slate-100">
            Profile Information & Resume
          </h3>
          <p className="text-xs text-slate-400">
            Manage your personal identity, tagline, bio, downloadable CV, and contact details.
          </p>
        </div>

        <button
          type="submit"
          disabled={updateMutation.isPending}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white text-xs font-semibold rounded-xl shadow-lg shadow-cyan-950/40 transition-all self-start sm:self-auto"
        >
          {updateMutation.isPending ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Save className="w-3.5 h-3.5" />
          )}
          <span>Save Changes</span>
        </button>
      </div>

      {notification && (
        <div
          className={`flex items-center gap-2 p-3 rounded-xl text-xs ${
            notification.type === "success"
              ? "bg-emerald-950/40 border border-emerald-800/40 text-emerald-300"
              : "bg-rose-950/40 border border-rose-800/40 text-rose-300"
          }`}
        >
          {notification.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 shrink-0" />
          )}
          <span>{notification.message}</span>
        </div>
      )}

      {/* Grid: Name & Tagline */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
            Full Name <span className="text-rose-400">*</span>
          </label>
          <input
            type="text"
            value={formData.full_name || ""}
            onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
            className="w-full px-3.5 py-2 bg-slate-950/80 border border-slate-800 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
            required
          />
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
            Tagline / Title
          </label>
          <input
            type="text"
            value={formData.tagline || ""}
            onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
            placeholder="e.g. Software Engineer & IoT Hardware Developer"
            className="w-full px-3.5 py-2 bg-slate-950/80 border border-slate-800 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
          />
        </div>
      </div>

      {/* Bio */}
      <div className="space-y-1.5">
        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
          Bio / Summary
        </label>
        <textarea
          rows={4}
          value={formData.bio || ""}
          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
          placeholder="Brief description about your experience, focus, and passion..."
          className="w-full px-3.5 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
        />
      </div>

      {/* Uploads: Avatar & CV PDF */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
        <FileUpload
          label="Profile Photo / Avatar"
          value={formData.avatar_url}
          onChange={(url) => setFormData({ ...formData, avatar_url: url })}
          accept="image/*"
          helperText="Upload PNG, JPG, or WEBP photo"
          isImage
        />

        <div className="space-y-3">
          <FileUpload
            label="Upload CV / Resume (PDF)"
            value={formData.resume_url}
            onChange={(url, filename) =>
              setFormData({
                ...formData,
                resume_url: url,
                resume_filename: filename || formData.resume_filename,
              })
            }
            accept="application/pdf,.doc,.docx"
            helperText="Upload your latest resume file (PDF recommended)"
          />

          <div className="space-y-1">
            <label className="block text-[11px] font-medium text-slate-400">
              Downloadable File Name
            </label>
            <input
              type="text"
              value={formData.resume_filename || ""}
              onChange={(e) => setFormData({ ...formData, resume_filename: e.target.value })}
              placeholder="e.g. CV_Fahmi_Ibrahim.pdf"
              className="w-full px-3 py-1.5 bg-slate-950/80 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>
      </div>

      {/* Contact & Social Links */}
      <div className="pt-4 border-t border-slate-800 space-y-4">
        <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
          Contact & Social Presence
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-slate-400">Email Address</label>
            <input
              type="email"
              value={formData.email || ""}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3.5 py-2 bg-slate-950/80 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-slate-400">Location</label>
            <input
              type="text"
              value={formData.location || ""}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-3.5 py-2 bg-slate-950/80 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-slate-400">GitHub Profile URL</label>
            <input
              type="url"
              value={formData.github_url || ""}
              onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
              placeholder="https://github.com/..."
              className="w-full px-3.5 py-2 bg-slate-950/80 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-slate-400">LinkedIn Profile URL</label>
            <input
              type="url"
              value={formData.linkedin_url || ""}
              onChange={(e) => setFormData({ ...formData, linkedin_url: e.target.value })}
              placeholder="https://linkedin.com/in/..."
              className="w-full px-3.5 py-2 bg-slate-950/80 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-slate-400">YouTube Channel URL</label>
            <input
              type="url"
              value={formData.youtube_url || ""}
              onChange={(e) => setFormData({ ...formData, youtube_url: e.target.value })}
              placeholder="https://youtube.com/@..."
              className="w-full px-3.5 py-2 bg-slate-950/80 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-slate-400">Instagram Profile URL</label>
            <input
              type="url"
              value={formData.instagram_url || ""}
              onChange={(e) => setFormData({ ...formData, instagram_url: e.target.value })}
              placeholder="https://instagram.com/..."
              className="w-full px-3.5 py-2 bg-slate-950/80 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>
      </div>

      {/* Available for work toggle */}
      <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-slate-200">Available for Work Badge</p>
          <p className="text-[11px] text-slate-400">Display "Available for Projects & Work" badge in hero section</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={Boolean(formData.available_for_work)}
            onChange={(e) => setFormData({ ...formData, available_for_work: e.target.checked ? 1 : 0 })}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div>
        </label>
      </div>
    </form>
  );
}
