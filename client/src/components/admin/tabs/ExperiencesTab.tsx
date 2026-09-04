import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { WorkExperience } from "../../../types";
import { api } from "../../../api/client";
import { Modal } from "../../common/Modal";
import { ConfirmDialog } from "../../common/ConfirmDialog";
import { FileUpload } from "../../common/FileUpload";
import { SearchableSelect } from "../../common/SearchableSelect";
import { 
  Plus, 
  Edit3, 
  Trash2, 
  Briefcase, 
  Calendar, 
  ExternalLink, 
  Loader2, 
  X, 
  PlusCircle, 
  CheckCircle2 
} from "lucide-react";

interface ExperiencesTabProps {
  experiences: WorkExperience[];
}

export function ExperiencesTab({ experiences }: ExperiencesTabProps) {
  const queryClient = useQueryClient();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingExp, setEditingExp] = useState<WorkExperience | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const [formData, setFormData] = useState<{
    company_name: string;
    company_url: string;
    company_logo: string;
    role_title: string;
    employment_type: string;
    location: string;
    start_date: string;
    end_date: string;
    is_current: boolean;
    order_index: number;
    description_points: string[];
  }>({
    company_name: "",
    company_url: "",
    company_logo: "",
    role_title: "",
    employment_type: "Internship",
    location: "",
    start_date: "",
    end_date: "Present",
    is_current: false,
    order_index: 0,
    description_points: [],
  });

  const [newBullet, setNewBullet] = useState("");

  const openCreateModal = () => {
    setEditingExp(null);
    setFormData({
      company_name: "",
      company_url: "",
      company_logo: "",
      role_title: "",
      employment_type: "Internship",
      location: "",
      start_date: "",
      end_date: "Present",
      is_current: false,
      order_index: experiences.length + 1,
      description_points: [],
    });
    setNewBullet("");
    setModalOpen(true);
  };

  const openEditModal = (exp: WorkExperience) => {
    setEditingExp(exp);
    setFormData({
      company_name: exp.company_name,
      company_url: exp.company_url || "",
      company_logo: exp.company_logo || "",
      role_title: exp.role_title,
      employment_type: exp.employment_type || "Full-time",
      location: exp.location || "",
      start_date: exp.start_date,
      end_date: exp.end_date || "Present",
      is_current: Boolean(exp.is_current),
      order_index: exp.order_index || 0,
      description_points: Array.isArray(exp.description_points) ? [...exp.description_points] : [],
    });
    setNewBullet("");
    setModalOpen(true);
  };

  const createMutation = useMutation({
    mutationFn: (data: any) => api.createExperience(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["experiences"] });
      setModalOpen(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => api.updateExperience(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["experiences"] });
      setModalOpen(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.deleteExperience(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["experiences"] });
      setDeleteId(null);
    },
  });

  const handleAddBullet = () => {
    if (!newBullet.trim()) return;
    setFormData({
      ...formData,
      description_points: [...formData.description_points, newBullet.trim()],
    });
    setNewBullet("");
  };

  const handleRemoveBullet = (index: number) => {
    setFormData({
      ...formData,
      description_points: formData.description_points.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.company_name || !formData.role_title || !formData.start_date) return;

    if (editingExp) {
      updateMutation.mutate({ id: editingExp.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <h3 className="text-base font-semibold text-slate-100">Work Experience Management</h3>
          <p className="text-xs text-slate-400">Add, edit, and organize career roles and achievements.</p>
        </div>
        <button
          type="button"
          onClick={openCreateModal}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold rounded-xl shadow-lg shadow-cyan-950/40 transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Experience</span>
        </button>
      </div>

      {experiences.length === 0 ? (
        <div className="p-8 text-center bg-slate-950/40 border border-slate-800 rounded-2xl text-slate-400 text-xs">
          No experiences found. Click "Add Experience" to create one.
        </div>
      ) : (
        <div className="space-y-4">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="p-4 bg-slate-950/60 border border-slate-800/80 rounded-2xl flex items-start justify-between gap-4"
            >
              <div className="flex items-start gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center p-1.5 shrink-0 overflow-hidden">
                  {exp.company_logo ? (
                    <img
                      src={exp.company_logo}
                      alt={exp.company_name}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <Briefcase className="w-5 h-5 text-slate-500" />
                  )}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-semibold text-slate-100">{exp.role_title}</h4>
                    <span className="badge-soft-cyan text-[10px] font-medium px-2 py-0.5 rounded-md">
                      {exp.employment_type}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 font-medium">{exp.company_name}</p>
                  <p className="text-[11px] text-slate-400">
                    {exp.start_date} – {exp.is_current ? "Present" : exp.end_date}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={() => openEditModal(exp)}
                  className="p-1.5 text-slate-400 hover:text-cyan-400 hover:bg-slate-900 rounded-lg transition-colors"
                  title="Edit"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setDeleteId(exp.id)}
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
        title={editingExp ? "Edit Work Experience" : "Add Work Experience"}
        maxWidth="2xl"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-300 uppercase">
                Role Title <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                value={formData.role_title}
                onChange={(e) => setFormData({ ...formData, role_title: e.target.value })}
                placeholder="e.g. Intern - Mechatronics R&D"
                className="w-full px-3 py-2 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-300 uppercase">
                Company Name <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                value={formData.company_name}
                onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                placeholder="e.g. PT. Solusi Intek Indonesia"
                className="w-full px-3 py-2 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <SearchableSelect
              label="Employment Type"
              value={formData.employment_type}
              onChange={(val) => setFormData({ ...formData, employment_type: val })}
              options={[
                { value: "Internship", label: "Internship" },
                { value: "Full-time", label: "Full-time" },
                { value: "Part-time", label: "Part-time" },
                { value: "Contract", label: "Contract" },
                { value: "Freelance", label: "Freelance" },
              ]}
              placeholder="Select Employment Type..."
              searchThreshold={5}
            />

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-300 uppercase">
                Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="e.g. Jakarta, Indonesia"
                className="w-full px-3 py-2 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-300 uppercase">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-300 uppercase">
                Start Date <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                value={formData.start_date}
                onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                placeholder="e.g. 3 June 2022"
                className="w-full px-3 py-2 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-300 uppercase">
                End Date
              </label>
              <input
                type="text"
                disabled={formData.is_current}
                value={formData.is_current ? "Present" : formData.end_date}
                onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                placeholder="e.g. 10 February 2024"
                className="w-full px-3 py-2 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-cyan-500 disabled:opacity-50"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="is_current_role"
              checked={formData.is_current}
              onChange={(e) => setFormData({ ...formData, is_current: e.target.checked })}
              className="rounded bg-slate-950 border-slate-800 text-cyan-500 focus:ring-0"
            />
            <label htmlFor="is_current_role" className="text-xs text-slate-300 cursor-pointer">
              I am currently working in this role
            </label>
          </div>

          {/* Company Logo Upload & URL */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <FileUpload
              label="Company Logo"
              value={formData.company_logo}
              onChange={(url) => setFormData({ ...formData, company_logo: url })}
              accept="image/*"
              helperText="Upload company logo image"
              isImage
            />

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-300 uppercase">
                Company Website URL
              </label>
              <input
                type="url"
                value={formData.company_url}
                onChange={(e) => setFormData({ ...formData, company_url: e.target.value })}
                placeholder="https://company.com"
                className="w-full px-3 py-2 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          {/* Bullet Points / Responsibilities */}
          <div className="space-y-3 pt-3 border-t border-slate-800">
            <label className="block text-xs font-semibold text-slate-300 uppercase">
              Key Responsibilities / Bullet Points
            </label>

            <div className="flex items-center gap-2">
              <input
                type="text"
                value={newBullet}
                onChange={(e) => setNewBullet(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddBullet();
                  }
                }}
                placeholder="Type responsibility and click Add..."
                className="flex-1 px-3 py-2 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
              />
              <button
                type="button"
                onClick={handleAddBullet}
                className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl"
              >
                Add
              </button>
            </div>

            {formData.description_points.length > 0 && (
              <ul className="space-y-2 max-h-48 overflow-y-auto p-2 bg-slate-950/50 rounded-xl border border-slate-800/80">
                {formData.description_points.map((pt, idx) => (
                  <li key={idx} className="flex items-start justify-between gap-2 p-1.5 rounded-lg bg-slate-900/60 text-xs text-slate-300">
                    <span className="flex-1 leading-relaxed">{pt}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveBullet(idx)}
                      className="text-slate-400 hover:text-rose-400 p-1"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

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
              className="inline-flex items-center gap-2 px-5 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold rounded-xl shadow-lg shadow-cyan-950/40"
            >
              {(createMutation.isPending || updateMutation.isPending) && (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              )}
              <span>{editingExp ? "Update Experience" : "Create Experience"}</span>
            </button>
          </div>
        </form>
      </Modal>

      {/* Confirm Delete Dialog */}
      <ConfirmDialog
        isOpen={Boolean(deleteId)}
        onClose={() => setDeleteId(null)}
        onConfirm={() => deleteId && deleteMutation.mutate(deleteId)}
        title="Delete Experience"
        message="Are you sure you want to delete this work experience? This action cannot be undone."
        confirmText="Delete"
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
}
