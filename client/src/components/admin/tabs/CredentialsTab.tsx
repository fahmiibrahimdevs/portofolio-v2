import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Credential } from "../../../types";
import { api } from "../../../api/client";
import { Modal } from "../../common/Modal";
import { ConfirmDialog } from "../../common/ConfirmDialog";
import { FileUpload } from "../../common/FileUpload";
import { 
  Plus, 
  Edit3, 
  Trash2, 
  Award, 
  Calendar, 
  ExternalLink, 
  FileText, 
  Loader2 
} from "lucide-react";

interface CredentialsTabProps {
  credentials: Credential[];
}

export function CredentialsTab({ credentials }: CredentialsTabProps) {
  const queryClient = useQueryClient();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCred, setEditingCred] = useState<Credential | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const [formData, setFormData] = useState<{
    title: string;
    issuer: string;
    issue_date: string;
    expiry_date: string;
    credential_url: string;
    file_url: string;
    logo_url: string;
    order_index: number;
  }>({
    title: "",
    issuer: "",
    issue_date: "",
    expiry_date: "No Expired",
    credential_url: "",
    file_url: "",
    logo_url: "",
    order_index: 0,
  });

  const openCreateModal = () => {
    setEditingCred(null);
    setFormData({
      title: "",
      issuer: "",
      issue_date: "",
      expiry_date: "No Expired",
      credential_url: "",
      file_url: "",
      logo_url: "",
      order_index: credentials.length + 1,
    });
    setModalOpen(true);
  };

  const openEditModal = (cred: Credential) => {
    setEditingCred(cred);
    setFormData({
      title: cred.title,
      issuer: cred.issuer,
      issue_date: cred.issue_date || "",
      expiry_date: cred.expiry_date || "No Expired",
      credential_url: cred.credential_url || "",
      file_url: cred.file_url || "",
      logo_url: cred.logo_url || "",
      order_index: cred.order_index || 0,
    });
    setModalOpen(true);
  };

  const createMutation = useMutation({
    mutationFn: (data: any) => api.createCredential(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["credentials"] });
      setModalOpen(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => api.updateCredential(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["credentials"] });
      setModalOpen(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.deleteCredential(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["credentials"] });
      setDeleteId(null);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.issuer) return;

    if (editingCred) {
      updateMutation.mutate({ id: editingCred.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <h3 className="text-base font-semibold text-slate-100">Credentials & Certifications</h3>
          <p className="text-xs text-slate-400">Add and manage courses, competition honors, and licenses.</p>
        </div>
        <button
          type="button"
          onClick={openCreateModal}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold rounded-xl shadow-lg shadow-amber-950/40 transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Credential</span>
        </button>
      </div>

      {credentials.length === 0 ? (
        <div className="p-8 text-center bg-slate-950/40 border border-slate-800 rounded-2xl text-slate-400 text-xs">
          No credentials found. Click "Add Credential" to create one.
        </div>
      ) : (
        <div className="space-y-4">
          {credentials.map((cred) => (
            <div
              key={cred.id}
              className="p-4 bg-slate-950/60 border border-slate-800/80 rounded-2xl flex items-start justify-between gap-4"
            >
              <div className="flex items-start gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center p-1.5 shrink-0 overflow-hidden">
                  {cred.logo_url ? (
                    <img
                      src={cred.logo_url}
                      alt={cred.issuer}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <Award className="w-5 h-5 text-amber-400" />
                  )}
                </div>

                <div className="space-y-1">
                  <h4 className="text-sm font-semibold text-slate-100">{cred.title}</h4>
                  <p className="text-xs text-slate-300 font-medium">{cred.issuer}</p>
                  <div className="flex items-center gap-2 text-[11px] text-slate-400">
                    <span>{cred.issue_date}</span>
                    <span>•</span>
                    <span className="badge-soft-emerald px-1.5 py-0.2 rounded text-[10px]">
                      {cred.expiry_date}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={() => openEditModal(cred)}
                  className="p-1.5 text-slate-400 hover:text-cyan-400 hover:bg-slate-900 rounded-lg transition-colors"
                  title="Edit"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setDeleteId(cred.id)}
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
        title={editingCred ? "Edit Credential / Certificate" : "Add Credential / Certificate"}
        maxWidth="2xl"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-300 uppercase">
                Certificate Title <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. NodeJS Course PZN"
                className="w-full px-3 py-2 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-300 uppercase">
                Issuer / Organization <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                value={formData.issuer}
                onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
                placeholder="e.g. Udemy, PT. Solusi Intek Indonesia"
                className="w-full px-3 py-2 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-300 uppercase">
                Issue Date
              </label>
              <input
                type="text"
                value={formData.issue_date}
                onChange={(e) => setFormData({ ...formData, issue_date: e.target.value })}
                placeholder="e.g. August 2023"
                className="w-full px-3 py-2 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-300 uppercase">
                Expiry Date
              </label>
              <input
                type="text"
                value={formData.expiry_date}
                onChange={(e) => setFormData({ ...formData, expiry_date: e.target.value })}
                placeholder="e.g. No Expired or May 2026"
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <FileUpload
              label="Issuer Logo"
              value={formData.logo_url}
              onChange={(url) => setFormData({ ...formData, logo_url: url })}
              accept="image/*"
              helperText="Upload issuer brand or institute logo"
              isImage
            />

            <FileUpload
              label="Certificate Document (PDF/Image)"
              value={formData.file_url}
              onChange={(url) => setFormData({ ...formData, file_url: url })}
              accept="application/pdf,image/*"
              helperText="Upload certificate PDF or scanned image"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-300 uppercase">
              External Verification / Credential URL
            </label>
            <input
              type="url"
              value={formData.credential_url}
              onChange={(e) => setFormData({ ...formData, credential_url: e.target.value })}
              placeholder="https://..."
              className="w-full px-3 py-2 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
            />
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
              className="inline-flex items-center gap-2 px-5 py-2 bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold rounded-xl shadow-lg shadow-amber-950/40"
            >
              {(createMutation.isPending || updateMutation.isPending) && (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              )}
              <span>{editingCred ? "Update Credential" : "Create Credential"}</span>
            </button>
          </div>
        </form>
      </Modal>

      {/* Confirm Delete Dialog */}
      <ConfirmDialog
        isOpen={Boolean(deleteId)}
        onClose={() => setDeleteId(null)}
        onConfirm={() => deleteId && deleteMutation.mutate(deleteId)}
        title="Delete Credential"
        message="Are you sure you want to delete this credential entry?"
        confirmText="Delete"
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
}
