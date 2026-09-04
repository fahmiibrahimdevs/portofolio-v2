import React, { useState } from "react";
import { Award, ExternalLink, Calendar, ShieldCheck, FileText, Eye } from "lucide-react";
import { Credential } from "../../types";
import { Modal } from "../common/Modal";

interface CredentialsSectionProps {
  credentials: Credential[];
  isLoading: boolean;
}

export function CredentialsSection({ credentials, isLoading }: CredentialsSectionProps) {
  const [previewCred, setPreviewCred] = useState<Credential | null>(null);

  const isPdf = (url?: string) => {
    return url?.toLowerCase().endsWith(".pdf");
  };

  return (
    <section id="credentials" className="py-8 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-slate-800/80">
      <div className="space-y-2 mb-5">
        <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-widest">
          <Award className="w-4 h-4" />
          <span>Certifications & Honors</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 tracking-tight">
          Credentials & Certificates
        </h2>
        <p className="text-xs sm:text-sm text-slate-400">
          Industry courses, internship certificates, competitions, and professional certifications.
        </p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="p-6 bg-slate-900/60 border border-slate-800 rounded-2xl h-40"></div>
          ))}
        </div>
      ) : credentials.length === 0 ? (
        <div className="p-8 text-center bg-slate-900/40 border border-slate-800/80 rounded-2xl text-slate-400 text-sm">
          No credentials added yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {credentials.map((cred) => (
            <div
              key={cred.id}
              className="glass-panel glass-panel-hover rounded-2xl p-5 flex flex-col justify-between space-y-4 transition-all"
            >
              <div className="space-y-3">
                {/* Header: Logo + Title */}
                <div className="flex items-start gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center p-1.5 shrink-0 overflow-hidden">
                    {cred.logo_url ? (
                      <img
                        src={cred.logo_url}
                        alt={cred.issuer}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = "none";
                        }}
                      />
                    ) : (
                      <Award className="w-6 h-6 text-amber-400/80" />
                    )}
                  </div>

                  <div className="space-y-1 min-w-0">
                    <h3 className="text-sm sm:text-base font-semibold text-slate-100 leading-snug line-clamp-2">
                      {cred.title}
                    </h3>
                    <p className="text-xs font-medium text-slate-300">
                      {cred.issuer}
                    </p>
                  </div>
                </div>

                {/* Details */}
                <div className="flex flex-wrap items-center gap-2 text-xs pt-1">
                  {cred.issue_date && (
                    <span className="inline-flex items-center gap-1 text-slate-400">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" />
                      <span>{cred.issue_date}</span>
                    </span>
                  )}

                  {cred.expiry_date && (
                    <span className="badge-soft-emerald text-[10px] font-medium px-2 py-0.5 rounded-md">
                      {cred.expiry_date}
                    </span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2">
                <span className="text-[11px] text-slate-500 font-mono flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Verified</span>
                </span>

                <div className="flex items-center gap-2">
                  {cred.file_url && (
                    <button
                      type="button"
                      onClick={() => setPreviewCred(cred)}
                      className="inline-flex items-center gap-1 text-xs font-semibold badge-soft-slate hover:opacity-90 px-2.5 py-1 rounded-xl transition-colors shadow-sm"
                    >
                      <Eye className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Preview</span>
                    </button>
                  )}

                  {(cred.credential_url || cred.file_url) && (
                    <a
                      href={cred.credential_url || cred.file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-semibold badge-soft-cyan hover:opacity-90 px-2.5 py-1 rounded-xl transition-colors shadow-sm"
                    >
                      <span>Show Credential</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Credential File Preview Modal */}
      {previewCred && (
        <Modal
          isOpen={Boolean(previewCred)}
          onClose={() => setPreviewCred(null)}
          title={previewCred.title}
          maxWidth="3xl"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-slate-800">
              <span>Issuer: <strong className="text-slate-200">{previewCred.issuer}</strong></span>
              <span>Date: <strong className="text-slate-200">{previewCred.issue_date}</strong></span>
            </div>

            <div className="w-full bg-slate-950 rounded-xl overflow-hidden border border-slate-800 flex items-center justify-center min-h-[350px]">
              {previewCred.file_url && isPdf(previewCred.file_url) ? (
                <iframe
                  src={previewCred.file_url}
                  title={previewCred.title}
                  className="w-full h-[550px] border-0"
                />
              ) : previewCred.file_url ? (
                <img
                  src={previewCred.file_url}
                  alt={previewCred.title}
                  className="max-w-full max-h-[550px] object-contain"
                />
              ) : (
                <p className="text-slate-500 text-sm">No preview available.</p>
              )}
            </div>

            <div className="flex justify-end pt-2">
              <a
                href={previewCred.file_url || previewCred.credential_url}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold rounded-xl transition-all"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Open in New Tab</span>
              </a>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
}
