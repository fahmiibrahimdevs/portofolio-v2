import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TechCategory, TechSkill } from "../../../types";
import { api } from "../../../api/client";
import { Modal } from "../../common/Modal";
import { ConfirmDialog } from "../../common/ConfirmDialog";
import { FileUpload } from "../../common/FileUpload";
import { SearchableSelect } from "../../common/SearchableSelect";
import { 
  Plus, 
  Edit3, 
  Trash2, 
  Cpu, 
  Layers, 
  Sparkles, 
  Loader2, 
  FolderPlus, 
  FolderEdit 
} from "lucide-react";

interface TechnologyTabProps {
  categories: TechCategory[];
}

export function TechnologyTab({ categories }: TechnologyTabProps) {
  const queryClient = useQueryClient();

  // Category Modal State
  const [catModalOpen, setCatModalOpen] = useState(false);
  const [editingCat, setEditingCat] = useState<TechCategory | null>(null);
  const [catFormData, setCatFormData] = useState({ name: "", order_index: 0 });
  const [deleteCatId, setDeleteCatId] = useState<string | null>(null);

  // Skill Modal State
  const [skillModalOpen, setSkillModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<TechSkill | null>(null);
  const [skillFormData, setSkillFormData] = useState({
    category_id: "",
    name: "",
    icon_url: "",
    order_index: 0,
  });
  const [deleteSkillId, setDeleteSkillId] = useState<string | null>(null);

  // Category Mutations
  const createCatMutation = useMutation({
    mutationFn: (data: any) => api.createTechCategory(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tech-stack"] });
      setCatModalOpen(false);
    },
  });

  const updateCatMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => api.updateTechCategory(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tech-stack"] });
      setCatModalOpen(false);
    },
  });

  const deleteCatMutation = useMutation({
    mutationFn: (id: string) => api.deleteTechCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tech-stack"] });
      setDeleteCatId(null);
    },
  });

  // Skill Mutations
  const createSkillMutation = useMutation({
    mutationFn: (data: any) => api.createTechSkill(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tech-stack"] });
      setSkillModalOpen(false);
    },
  });

  const updateSkillMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => api.updateTechSkill(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tech-stack"] });
      setSkillModalOpen(false);
    },
  });

  const deleteSkillMutation = useMutation({
    mutationFn: (id: string) => api.deleteTechSkill(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tech-stack"] });
      setDeleteSkillId(null);
    },
  });

  const openAddCategory = () => {
    setEditingCat(null);
    setCatFormData({ name: "", order_index: categories.length + 1 });
    setCatModalOpen(true);
  };

  const openEditCategory = (cat: TechCategory) => {
    setEditingCat(cat);
    setCatFormData({ name: cat.name, order_index: cat.order_index || 0 });
    setCatModalOpen(true);
  };

  const openAddSkill = (defaultCatId?: string) => {
    setEditingSkill(null);
    setSkillFormData({
      category_id: defaultCatId || categories[0]?.id || "",
      name: "",
      icon_url: "",
      order_index: 0,
    });
    setSkillModalOpen(true);
  };

  const openEditSkill = (skill: TechSkill) => {
    setEditingSkill(skill);
    setSkillFormData({
      category_id: skill.category_id,
      name: skill.name,
      icon_url: skill.icon_url || "",
      order_index: skill.order_index || 0,
    });
    setSkillModalOpen(true);
  };

  const handleCatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!catFormData.name.trim()) return;
    if (editingCat) {
      updateCatMutation.mutate({ id: editingCat.id, data: catFormData });
    } else {
      createCatMutation.mutate(catFormData);
    }
  };

  const handleSkillSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!skillFormData.name.trim() || !skillFormData.category_id) return;
    if (editingSkill) {
      updateSkillMutation.mutate({ id: editingSkill.id, data: skillFormData });
    } else {
      createSkillMutation.mutate(skillFormData);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-3">
        <div>
          <h3 className="text-base font-semibold text-slate-100">Technology Stack Management</h3>
          <p className="text-xs text-slate-400">
            Manage skill categories (Languages, Frameworks, etc.) and individual skills with icon uploads.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={openAddCategory}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700/80 text-xs font-semibold rounded-xl transition-all"
          >
            <FolderPlus className="w-3.5 h-3.5 text-cyan-400" />
            <span>Add Category</span>
          </button>
          <button
            type="button"
            onClick={() => openAddSkill()}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold rounded-xl shadow-lg shadow-cyan-950/40 transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Skill</span>
          </button>
        </div>
      </div>

      {categories.length === 0 ? (
        <div className="p-8 text-center bg-slate-950/40 border border-slate-800 rounded-2xl text-slate-400 text-xs">
          No categories found. Click "Add Category" to get started.
        </div>
      ) : (
        <div className="space-y-6">
          {categories.map((cat) => {
            const skills = cat.skills || [];

            return (
              <div
                key={cat.id}
                className="p-5 bg-slate-950/60 border border-slate-800/80 rounded-2xl space-y-4"
              >
                {/* Category Header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-800/60">
                  <div className="flex items-center gap-2.5">
                    <Layers className="w-4 h-4 text-cyan-400" />
                    <h4 className="text-sm font-semibold text-slate-100">{cat.name}</h4>
                    <span className="badge-soft-slate text-[10px] px-2 py-0.5 rounded-full">
                      {skills.length} {skills.length === 1 ? "skill" : "skills"}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => openAddSkill(cat.id)}
                      className="p-1.5 text-slate-400 hover:text-cyan-400 hover:bg-slate-900 rounded-lg text-xs inline-flex items-center gap-1"
                      title="Add Skill to this category"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline text-[11px]">Add Skill</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => openEditCategory(cat)}
                      className="p-1.5 text-slate-400 hover:text-cyan-400 hover:bg-slate-900 rounded-lg transition-colors"
                      title="Edit Category"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeleteCatId(cat.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-900 rounded-lg transition-colors"
                      title="Delete Category & Skills"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Skills Grid */}
                {skills.length === 0 ? (
                  <p className="text-xs text-slate-500 py-2">
                    No skills in this category yet.
                  </p>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {skills.map((skill) => (
                      <div
                        key={skill.id}
                        className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition-all group"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-7 h-7 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center p-1 shrink-0 overflow-hidden">
                            {skill.icon_url ? (
                              <img
                                src={skill.icon_url}
                                alt={skill.name}
                                className="w-full h-full object-contain"
                              />
                            ) : (
                              <Sparkles className="w-3.5 h-3.5 text-slate-500" />
                            )}
                          </div>
                          <span className="text-xs font-medium text-slate-200 truncate">
                            {skill.name}
                          </span>
                        </div>

                        <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100">
                          <button
                            type="button"
                            onClick={() => openEditSkill(skill)}
                            className="p-1 text-slate-400 hover:text-cyan-400 hover:bg-slate-800 rounded"
                            title="Edit"
                          >
                            <Edit3 className="w-3 h-3" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeleteSkillId(skill.id)}
                            className="p-1 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded"
                            title="Delete"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Category Modal */}
      <Modal
        isOpen={catModalOpen}
        onClose={() => setCatModalOpen(false)}
        title={editingCat ? "Edit Category" : "Add Category"}
        maxWidth="sm"
      >
        <form onSubmit={handleCatSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-300 uppercase">
              Category Name <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              value={catFormData.name}
              onChange={(e) => setCatFormData({ ...catFormData, name: e.target.value })}
              placeholder="e.g. Programming Languages"
              className="w-full px-3 py-2 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-300 uppercase">
              Order Index
            </label>
            <input
              type="number"
              value={catFormData.order_index}
              onChange={(e) => setCatFormData({ ...catFormData, order_index: Number(e.target.value) })}
              className="w-full px-3 py-2 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={() => setCatModalOpen(false)}
              className="px-4 py-2 text-xs text-slate-400 hover:text-slate-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={createCatMutation.isPending || updateCatMutation.isPending}
              className="px-5 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold rounded-xl"
            >
              {(createCatMutation.isPending || updateCatMutation.isPending) && (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              )}
              <span>{editingCat ? "Update Category" : "Create Category"}</span>
            </button>
          </div>
        </form>
      </Modal>

      {/* Skill Modal */}
      <Modal
        isOpen={skillModalOpen}
        onClose={() => setSkillModalOpen(false)}
        title={editingSkill ? "Edit Skill / Tool" : "Add Skill / Tool"}
        maxWidth="md"
      >
        <form onSubmit={handleSkillSubmit} className="space-y-4">
          <SearchableSelect
            label="Select Category"
            required
            value={skillFormData.category_id}
            onChange={(val) => setSkillFormData({ ...skillFormData, category_id: val })}
            options={categories.map((c) => ({
              value: c.id,
              label: c.name,
            }))}
            placeholder="Select Tech Category..."
            searchThreshold={5}
          />

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-300 uppercase">
              Skill / Tool Name <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              value={skillFormData.name}
              onChange={(e) => setSkillFormData({ ...skillFormData, name: e.target.value })}
              placeholder="e.g. React, TypeScript, ESP32"
              className="w-full px-3 py-2 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
              required
            />
          </div>

          <FileUpload
            label="Skill Icon / Image"
            value={skillFormData.icon_url}
            onChange={(url) => setSkillFormData({ ...skillFormData, icon_url: url })}
            accept="image/*"
            helperText="Upload SVG, PNG, or JPG icon for this technology"
            isImage
          />

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-300 uppercase">
              Order Index
            </label>
            <input
              type="number"
              value={skillFormData.order_index}
              onChange={(e) => setSkillFormData({ ...skillFormData, order_index: Number(e.target.value) })}
              className="w-full px-3 py-2 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={() => setSkillModalOpen(false)}
              className="px-4 py-2 text-xs text-slate-400 hover:text-slate-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={createSkillMutation.isPending || updateSkillMutation.isPending}
              className="px-5 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold rounded-xl"
            >
              {(createSkillMutation.isPending || updateSkillMutation.isPending) && (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              )}
              <span>{editingSkill ? "Update Skill" : "Create Skill"}</span>
            </button>
          </div>
        </form>
      </Modal>

      {/* Confirm Delete Category */}
      <ConfirmDialog
        isOpen={Boolean(deleteCatId)}
        onClose={() => setDeleteCatId(null)}
        onConfirm={() => deleteCatId && deleteCatMutation.mutate(deleteCatId)}
        title="Delete Category"
        message="Deleting this category will also remove all skills nested inside it. Are you sure?"
        confirmText="Delete Category"
        isLoading={deleteCatMutation.isPending}
      />

      {/* Confirm Delete Skill */}
      <ConfirmDialog
        isOpen={Boolean(deleteSkillId)}
        onClose={() => setDeleteSkillId(null)}
        onConfirm={() => deleteSkillId && deleteSkillMutation.mutate(deleteSkillId)}
        title="Delete Skill"
        message="Are you sure you want to remove this skill item?"
        confirmText="Delete Skill"
        isLoading={deleteSkillMutation.isPending}
      />
    </div>
  );
}
