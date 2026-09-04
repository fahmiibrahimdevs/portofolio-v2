import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ContactMessage } from "../../../types";
import { api } from "../../../api/client";
import { ConfirmDialog } from "../../common/ConfirmDialog";
import { 
  Mail, 
  MessageSquare, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  Reply, 
  Loader2 
} from "lucide-react";

interface ContactsTabProps {
  messages: ContactMessage[];
}

export function ContactsTab({ messages }: ContactsTabProps) {
  const queryClient = useQueryClient();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const toggleReadMutation = useMutation({
    mutationFn: ({ id, is_read }: { id: string; is_read: boolean }) =>
      api.markContactRead(id, is_read),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.deleteContactMessage(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
      setDeleteId(null);
    },
  });

  const unreadCount = messages.filter((m) => !m.is_read).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-semibold text-slate-100">Contact Inquiries</h3>
            {unreadCount > 0 && (
              <span className="badge-soft-emerald text-[10px] font-bold px-2 py-0.5 rounded-full">
                {unreadCount} new
              </span>
            )}
          </div>
          <p className="text-xs text-slate-400">View and respond to messages submitted via the contact form.</p>
        </div>
      </div>

      {messages.length === 0 ? (
        <div className="p-8 text-center bg-slate-950/40 border border-slate-800 rounded-2xl text-slate-400 text-xs">
          No contact messages received yet.
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`p-5 rounded-2xl border transition-all ${
                m.is_read
                  ? "bg-slate-950/40 border-slate-800/80"
                  : "bg-slate-900/80 border-emerald-500/40 shadow-lg shadow-emerald-950/20"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800/80">
                <div className="flex items-center gap-2.5">
                  <div className={`p-2 rounded-xl shrink-0 ${m.is_read ? "bg-slate-800 text-slate-400" : "bg-emerald-950/50 text-emerald-400 border border-emerald-800/50"}`}>
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-100">{m.name}</h4>
                    <p className="text-xs text-slate-400">{m.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    <span>{m.created_at || "Just now"}</span>
                  </span>
                </div>
              </div>

              {/* Subject & Body */}
              <div className="py-3 space-y-1.5">
                <p className="text-xs font-semibold text-slate-200">
                  Subject: <span className="text-slate-300 font-normal">{m.subject || "Portfolio Inquiry"}</span>
                </p>
                <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-wrap bg-slate-950/60 p-3 rounded-xl border border-slate-800/60">
                  {m.message}
                </p>
              </div>

              {/* Footer Actions */}
              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => toggleReadMutation.mutate({ id: m.id, is_read: !m.is_read })}
                  className="text-xs font-medium text-slate-400 hover:text-slate-200 flex items-center gap-1.5"
                >
                  <CheckCircle2 className={`w-3.5 h-3.5 ${m.is_read ? "text-emerald-400" : "text-slate-600"}`} />
                  <span>{m.is_read ? "Mark Unread" : "Mark as Read"}</span>
                </button>

                <div className="flex items-center gap-2">
                  <a
                    href={`mailto:${m.email}?subject=Re: ${encodeURIComponent(m.subject || "Portfolio Inquiry")}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-cyan-950/40 hover:bg-cyan-900/50 border border-cyan-800/40 text-cyan-300 text-xs font-semibold rounded-xl transition-colors"
                  >
                    <Reply className="w-3.5 h-3.5" />
                    <span>Reply</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => setDeleteId(m.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-900 rounded-lg transition-colors"
                    title="Delete Message"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Confirm Delete Dialog */}
      <ConfirmDialog
        isOpen={Boolean(deleteId)}
        onClose={() => setDeleteId(null)}
        onConfirm={() => deleteId && deleteMutation.mutate(deleteId)}
        title="Delete Message"
        message="Are you sure you want to delete this contact message?"
        confirmText="Delete"
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
}
