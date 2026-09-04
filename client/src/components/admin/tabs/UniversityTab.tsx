import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  UniversityAchievement, 
  OrgInvolvement, 
  ResearchExp, 
  KeyProjectCategory, 
  SkillGainedItem 
} from "../../../types";
import { api } from "../../../api/client";
import { Modal } from "../../common/Modal";
import { ConfirmDialog } from "../../common/ConfirmDialog";
import { FileUpload } from "../../common/FileUpload";
import { 
  Plus, 
  Edit3, 
  Trash2, 
  GraduationCap, 
  Calendar, 
  Loader2, 
  X, 
  Users, 
  FlaskConical, 
  FolderKanban, 
  Sparkles,
  PlusCircle
} from "lucide-react";

interface UniversityTabProps {
  achievements: UniversityAchievement[];
}

export function UniversityTab({ achievements }: UniversityTabProps) {
  const queryClient = useQueryClient();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingAch, setEditingAch] = useState<UniversityAchievement | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const [formData, setFormData] = useState<{
    institution_name: string;
    institution_logo: string;
    degree: string;
    period: string;
    order_index: number;
    organizational_involvement: OrgInvolvement[];
    research_experience: ResearchExp[];
    key_projects: KeyProjectCategory[];
    skills_gained: SkillGainedItem[];
  }>({
    institution_name: "",
    institution_logo: "",
    degree: "",
    period: "",
    order_index: 0,
    organizational_involvement: [],
    research_experience: [],
    key_projects: [],
    skills_gained: [],
  });

  const openCreateModal = () => {
    setEditingAch(null);
    setFormData({
      institution_name: "",
      institution_logo: "",
      degree: "",
      period: "",
      order_index: achievements.length + 1,
      organizational_involvement: [],
      research_experience: [],
      key_projects: [],
      skills_gained: [],
    });
    setModalOpen(true);
  };

  const openEditModal = (ach: UniversityAchievement) => {
    setEditingAch(ach);
    setFormData({
      institution_name: ach.institution_name,
      institution_logo: ach.institution_logo || "",
      degree: ach.degree,
      period: ach.period,
      order_index: ach.order_index || 0,
      organizational_involvement: Array.isArray(ach.organizational_involvement) 
        ? JSON.parse(JSON.stringify(ach.organizational_involvement)) 
        : [],
      research_experience: Array.isArray(ach.research_experience) 
        ? JSON.parse(JSON.stringify(ach.research_experience)) 
        : [],
      key_projects: Array.isArray(ach.key_projects) 
        ? JSON.parse(JSON.stringify(ach.key_projects)) 
        : [],
      skills_gained: Array.isArray(ach.skills_gained) 
        ? JSON.parse(JSON.stringify(ach.skills_gained)) 
        : [],
    });
    setModalOpen(true);
  };

  const createMutation = useMutation({
    mutationFn: (data: any) => api.createUniversity(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["university"] });
      setModalOpen(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => api.updateUniversity(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["university"] });
      setModalOpen(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.deleteUniversity(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["university"] });
      setDeleteId(null);
    },
  });

  // --- Handlers for Organizational Involvement ---
  const handleAddOrg = () => {
    setFormData({
      ...formData,
      organizational_involvement: [
        ...formData.organizational_involvement,
        { name: "", role: "", link: "", description: "" },
      ],
    });
  };

  const handleUpdateOrg = (index: number, field: keyof OrgInvolvement, value: string) => {
    const updated = [...formData.organizational_involvement];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, organizational_involvement: updated });
  };

  const handleRemoveOrg = (index: number) => {
    setFormData({
      ...formData,
      organizational_involvement: formData.organizational_involvement.filter((_, i) => i !== index),
    });
  };

  // --- Handlers for Research Experience ---
  const handleAddResearch = () => {
    setFormData({
      ...formData,
      research_experience: [
        ...formData.research_experience,
        { title: "", supervisor: "", supervisor_link: "", description: "" },
      ],
    });
  };

  const handleUpdateResearch = (index: number, field: keyof ResearchExp, value: string) => {
    const updated = [...formData.research_experience];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, research_experience: updated });
  };

  const handleRemoveResearch = (index: number) => {
    setFormData({
      ...formData,
      research_experience: formData.research_experience.filter((_, i) => i !== index),
    });
  };

  // --- Handlers for Key Projects ---
  const handleAddProjectCategory = () => {
    setFormData({
      ...formData,
      key_projects: [
        ...formData.key_projects,
        { category: "New Category", items: [] },
      ],
    });
  };

  const handleUpdateProjectCategoryName = (catIndex: number, value: string) => {
    const updated = [...formData.key_projects];
    updated[catIndex].category = value;
    setFormData({ ...formData, key_projects: updated });
  };

  const handleRemoveProjectCategory = (catIndex: number) => {
    setFormData({
      ...formData,
      key_projects: formData.key_projects.filter((_, i) => i !== catIndex),
    });
  };

  const handleAddProjectItem = (catIndex: number) => {
    const updated = [...formData.key_projects];
    updated[catIndex].items.push({ title: "", url: "", description: "" });
    setFormData({ ...formData, key_projects: updated });
  };

  const handleUpdateProjectItem = (
    catIndex: number,
    itemIndex: number,
    field: "title" | "url" | "description",
    value: string
  ) => {
    const updated = [...formData.key_projects];
    updated[catIndex].items[itemIndex][field] = value;
    setFormData({ ...formData, key_projects: updated });
  };

  const handleRemoveProjectItem = (catIndex: number, itemIndex: number) => {
    const updated = [...formData.key_projects];
    updated[catIndex].items = updated[catIndex].items.filter((_, i) => i !== itemIndex);
    setFormData({ ...formData, key_projects: updated });
  };

  // --- Handlers for Skills Gained ---
  const handleAddSkillGroup = () => {
    setFormData({
      ...formData,
      skills_gained: [
        ...formData.skills_gained,
        { title: "Skill Group", items: [] },
      ],
    });
  };

  const handleUpdateSkillTitle = (index: number, value: string) => {
    const updated = [...formData.skills_gained];
    updated[index].title = value;
    setFormData({ ...formData, skills_gained: updated });
  };

  const handleUpdateSkillItems = (index: number, commaSeparatedString: string) => {
    const updated = [...formData.skills_gained];
    updated[index].items = commaSeparatedString
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    setFormData({ ...formData, skills_gained: updated });
  };

  const handleRemoveSkillGroup = (index: number) => {
    setFormData({
      ...formData,
      skills_gained: formData.skills_gained.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.institution_name || !formData.degree || !formData.period) return;

    if (editingAch) {
      updateMutation.mutate({ id: editingAch.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <h3 className="text-base font-semibold text-slate-100">University & Academic Achievements</h3>
          <p className="text-xs text-slate-400">Manage academic milestones, student organizations, research, and campus projects.</p>
        </div>
        <button
          type="button"
          onClick={openCreateModal}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl shadow-lg shadow-indigo-950/40 transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Education / Achievement</span>
        </button>
      </div>

      {achievements.length === 0 ? (
        <div className="p-8 text-center bg-slate-950/40 border border-slate-800 rounded-2xl text-slate-400 text-xs">
          No achievements found. Click "Add Education / Achievement" to create one.
        </div>
      ) : (
        <div className="space-y-4">
          {achievements.map((ach) => (
            <div
              key={ach.id}
              className="p-4 bg-slate-950/60 border border-slate-800/80 rounded-2xl flex items-start justify-between gap-4"
            >
              <div className="flex items-start gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center p-1.5 shrink-0 overflow-hidden">
                  {ach.institution_logo ? (
                    <img
                      src={ach.institution_logo}
                      alt={ach.institution_name}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <GraduationCap className="w-5 h-5 text-slate-500" />
                  )}
                </div>

                <div className="space-y-1">
                  <h4 className="text-sm font-semibold text-slate-100">{ach.institution_name}</h4>
                  <p className="text-xs text-slate-300 font-medium">{ach.degree}</p>
                  <p className="text-[11px] text-slate-400">{ach.period}</p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={() => openEditModal(ach)}
                  className="p-1.5 text-slate-400 hover:text-cyan-400 hover:bg-slate-900 rounded-lg transition-colors flex items-center gap-1 text-xs"
                  title="Edit All Details"
                >
                  <Edit3 className="w-4 h-4" />
                  <span className="hidden sm:inline">Edit</span>
                </button>
                <button
                  type="button"
                  onClick={() => setDeleteId(ach.id)}
                  className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-900 rounded-lg transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingAch ? "Edit University Achievement & Details" : "Add University Achievement"}
        maxWidth="3xl"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Base Info */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              General Academic Information
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-300">
                  Institution Name <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  value={formData.institution_name}
                  onChange={(e) => setFormData({ ...formData, institution_name: e.target.value })}
                  placeholder="e.g. Politeknik Negeri Jakarta"
                  className="w-full px-3 py-2 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-300">
                  Degree / Major <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  value={formData.degree}
                  onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                  placeholder="e.g. Associate’s Degree – Industrial Electronics Engineering"
                  className="w-full px-3 py-2 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-300">
                  Period <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  value={formData.period}
                  onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                  placeholder="e.g. Aug 2024 – Present"
                  className="w-full px-3 py-2 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-300">
                  Order Index
                </label>
                <input
                  type="number"
                  value={formData.order_index}
                  onChange={(e) => setFormData({ ...formData, order_index: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <FileUpload
              label="Institution Logo"
              value={formData.institution_logo}
              onChange={(url) => setFormData({ ...formData, institution_logo: url })}
              accept="image/*"
              helperText="Upload university / school logo"
              isImage
            />
          </div>

          {/* 1. Organizational Involvement */}
          <div className="space-y-3 pt-4 border-t border-slate-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                <Users className="w-3.5 h-3.5" />
                <span>Organizational Involvement</span>
              </div>
              <button
                type="button"
                onClick={handleAddOrg}
                className="inline-flex items-center gap-1 px-3 py-1 bg-cyan-950/50 hover:bg-cyan-900/60 border border-cyan-800/40 text-cyan-300 text-xs font-semibold rounded-lg transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Organization</span>
              </button>
            </div>

            {formData.organizational_involvement.length === 0 ? (
              <p className="text-xs text-slate-500 italic p-3 bg-slate-950/40 rounded-xl border border-slate-800/80">
                No organizations added. Click "+ Add Organization" to add one.
              </p>
            ) : (
              <div className="space-y-3">
                {formData.organizational_involvement.map((org, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-semibold text-slate-400 uppercase">
                        Organization #{idx + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveOrg(idx)}
                        className="p-1 text-slate-400 hover:text-rose-400 rounded transition-colors"
                        title="Delete Organization"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <input
                        type="text"
                        placeholder="Organization Name (e.g. KSM Psychorobotic)"
                        value={org.name}
                        onChange={(e) => handleUpdateOrg(idx, "name", e.target.value)}
                        className="px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
                      />
                      <input
                        type="text"
                        placeholder="Role (e.g. Active Member)"
                        value={org.role || ""}
                        onChange={(e) => handleUpdateOrg(idx, "role", e.target.value)}
                        className="px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
                      />
                    </div>

                    <input
                      type="url"
                      placeholder="Link / Instagram Profile URL (optional)"
                      value={org.link || ""}
                      onChange={(e) => handleUpdateOrg(idx, "link", e.target.value)}
                      className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
                    />

                    <textarea
                      placeholder="Organization description / activities..."
                      rows={2}
                      value={org.description || ""}
                      onChange={(e) => handleUpdateOrg(idx, "description", e.target.value)}
                      className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 2. Research Experience (Fully Editable) */}
          <div className="space-y-3 pt-4 border-t border-slate-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-400 uppercase tracking-wider">
                <FlaskConical className="w-3.5 h-3.5" />
                <span>Research Experience</span>
              </div>
              <button
                type="button"
                onClick={handleAddResearch}
                className="inline-flex items-center gap-1 px-3 py-1 bg-amber-950/50 hover:bg-amber-900/60 border border-amber-800/40 text-amber-300 text-xs font-semibold rounded-lg transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Research Item</span>
              </button>
            </div>

            {formData.research_experience.length === 0 ? (
              <p className="text-xs text-slate-500 italic p-3 bg-slate-950/40 rounded-xl border border-slate-800/80">
                No research experience added yet. Click "+ Add Research Item" to create one.
              </p>
            ) : (
              <div className="space-y-3.5">
                {formData.research_experience.map((res, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-semibold text-amber-400/90 uppercase">
                        Research Project #{idx + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveResearch(idx)}
                        className="p-1 text-slate-400 hover:text-rose-400 rounded transition-colors"
                        title="Delete Research"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[11px] font-medium text-slate-400">
                        Research Title
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. SIMONLE – IoT-Based Smart Catfish Pond Monitoring"
                        value={res.title}
                        onChange={(e) => handleUpdateResearch(idx, "title", e.target.value)}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs font-semibold text-slate-100 focus:outline-none focus:border-amber-500"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="block text-[11px] font-medium text-slate-400">
                          Supervisor / Lecturer Name
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Dr. Devi Handaya"
                          value={res.supervisor || ""}
                          onChange={(e) => handleUpdateResearch(idx, "supervisor", e.target.value)}
                          className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-100 focus:outline-none focus:border-amber-500"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[11px] font-medium text-slate-400">
                          Supervisor Profile Link / URL
                        </label>
                        <input
                          type="url"
                          placeholder="https://..."
                          value={res.supervisor_link || ""}
                          onChange={(e) => handleUpdateResearch(idx, "supervisor_link", e.target.value)}
                          className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-100 focus:outline-none focus:border-amber-500"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[11px] font-medium text-slate-400">
                        Detailed Description / Research Summary
                      </label>
                      <textarea
                        placeholder="Explain research objectives, sensors (pH, TDS, DS18B20), automation, calibration, and findings..."
                        rows={3}
                        value={res.description || ""}
                        onChange={(e) => handleUpdateResearch(idx, "description", e.target.value)}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-100 leading-relaxed focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 3. Key Projects (Fully Editable) */}
          <div className="space-y-3 pt-4 border-t border-slate-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                <FolderKanban className="w-3.5 h-3.5" />
                <span>Key Projects</span>
              </div>
              <button
                type="button"
                onClick={handleAddProjectCategory}
                className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-950/50 hover:bg-emerald-900/60 border border-emerald-800/40 text-emerald-300 text-xs font-semibold rounded-lg transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Category</span>
              </button>
            </div>

            {formData.key_projects.length === 0 ? (
              <p className="text-xs text-slate-500 italic p-3 bg-slate-950/40 rounded-xl border border-slate-800/80">
                No project categories added. Click "+ Add Category" to create one.
              </p>
            ) : (
              <div className="space-y-4">
                {formData.key_projects.map((cat, catIdx) => (
                  <div key={catIdx} className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between gap-3 pb-2 border-b border-slate-800/80">
                      <div className="flex-1 flex items-center gap-2">
                        <label className="text-[11px] font-semibold text-emerald-400 uppercase">
                          Category:
                        </label>
                        <input
                          type="text"
                          value={cat.category}
                          onChange={(e) => handleUpdateProjectCategoryName(catIdx, e.target.value)}
                          placeholder="Category Name (e.g. Paid Projects, Campus Projects)"
                          className="flex-1 px-3 py-1 bg-slate-900 border border-slate-800 rounded-lg text-xs font-semibold text-slate-100 focus:outline-none focus:border-emerald-500"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleAddProjectItem(catIdx)}
                          className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg flex items-center gap-1"
                        >
                          <Plus className="w-3 h-3 text-emerald-400" />
                          <span>Add Item</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleRemoveProjectCategory(catIdx)}
                          className="p-1 text-slate-400 hover:text-rose-400 rounded"
                          title="Delete Category"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Items within Category */}
                    <div className="space-y-2.5">
                      {cat.items.map((item, itemIdx) => (
                        <div key={itemIdx} className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800/80 space-y-2">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-[10px] font-medium text-slate-500">Item #{itemIdx + 1}</span>
                            <button
                              type="button"
                              onClick={() => handleRemoveProjectItem(catIdx, itemIdx)}
                              className="p-0.5 text-slate-400 hover:text-rose-400 rounded"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <input
                              type="text"
                              placeholder="Project Title"
                              value={item.title}
                              onChange={(e) => handleUpdateProjectItem(catIdx, itemIdx, "title", e.target.value)}
                              className="px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
                            />
                            <input
                              type="url"
                              placeholder="Project URL (optional)"
                              value={item.url || ""}
                              onChange={(e) => handleUpdateProjectItem(catIdx, itemIdx, "url", e.target.value)}
                              className="px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
                            />
                          </div>

                          <input
                            type="text"
                            placeholder="Short description / tech notes..."
                            value={item.description || ""}
                            onChange={(e) => handleUpdateProjectItem(catIdx, itemIdx, "description", e.target.value)}
                            className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-300 focus:outline-none focus:border-emerald-500"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 4. Skills Gained (Fully Editable) */}
          <div className="space-y-3 pt-4 border-t border-slate-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-indigo-400 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Skills Gained Groups</span>
              </div>
              <button
                type="button"
                onClick={handleAddSkillGroup}
                className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-950/50 hover:bg-indigo-900/60 border border-indigo-800/40 text-indigo-300 text-xs font-semibold rounded-lg transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Skill Group</span>
              </button>
            </div>

            {formData.skills_gained.length === 0 ? (
              <p className="text-xs text-slate-500 italic p-3 bg-slate-950/40 rounded-xl border border-slate-800/80">
                No skill groups added. Click "+ Add Skill Group" to add.
              </p>
            ) : (
              <div className="space-y-3">
                {formData.skills_gained.map((sg, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-semibold text-indigo-400 uppercase">
                        Group #{idx + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveSkillGroup(idx)}
                        className="p-1 text-slate-400 hover:text-rose-400 rounded"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      <div className="space-y-1">
                        <label className="block text-[11px] font-medium text-slate-400">Group Name</label>
                        <input
                          type="text"
                          placeholder="e.g. Electronics fundamentals"
                          value={sg.title}
                          onChange={(e) => handleUpdateSkillTitle(idx, e.target.value)}
                          className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs font-semibold text-slate-100 focus:outline-none focus:border-indigo-500"
                        />
                      </div>

                      <div className="sm:col-span-2 space-y-1">
                        <label className="block text-[11px] font-medium text-slate-400">
                          Skills / Tags (separated by comma)
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. PCB Design, Basic Logic Gates, MQTT"
                          value={sg.items.join(", ")}
                          onChange={(e) => handleUpdateSkillItems(idx, e.target.value)}
                          className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Form Actions */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="px-4 py-2 text-xs text-slate-400 hover:text-slate-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={createMutation.isPending || updateMutation.isPending}
              className="inline-flex items-center gap-2 px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl shadow-lg shadow-indigo-950/40"
            >
              {(createMutation.isPending || updateMutation.isPending) && (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              )}
              <span>{editingAch ? "Update Achievement & Save" : "Create Achievement"}</span>
            </button>
          </div>
        </form>
      </Modal>

      {/* Confirm Delete Dialog */}
      <ConfirmDialog
        isOpen={Boolean(deleteId)}
        onClose={() => setDeleteId(null)}
        onConfirm={() => deleteId && deleteMutation.mutate(deleteId)}
        title="Delete Education / Achievement"
        message="Are you sure you want to delete this education entry? This action cannot be undone."
        confirmText="Delete"
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
}
