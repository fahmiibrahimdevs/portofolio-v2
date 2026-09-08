import { join } from "path";
import { readdirSync, statSync, existsSync, mkdirSync } from "fs";
import { query, execute } from "../db/database";

export const SYNC_TABLES = [
  "users",
  "roles",
  "permissions",
  "role_user",
  "permission_role",
  "permission_user",
  "admin_users",
  "profile_settings",
  "tech_categories",
  "tech_skills",
  "work_experiences",
  "university_achievements",
  "credentials",
  "project_categories",
  "projects",
  "project_details",
  "project_tags",
  "project_images",
  "project_files",
  "project_boms",
  "article_categories",
  "article_sub_categories",
  "article_posts",
  "contact_messages",
];

export interface SyncExportData {
  success: boolean;
  timestamp: string;
  tables: Record<string, any[]>;
  files: { filename: string; size: number }[];
}

export interface SyncResult {
  success: boolean;
  offline: boolean;
  message: string;
  stats?: {
    tables_synced: number;
    rows_synced: number;
    files_checked: number;
    files_downloaded: number;
  };
}

export async function exportLocalData(uploadsDir: string): Promise<SyncExportData> {
  const tablesData: Record<string, any[]> = {};
  for (const table of SYNC_TABLES) {
    try {
      tablesData[table] = await query(`SELECT * FROM \`${table}\``);
    } catch {
      tablesData[table] = [];
    }
  }

  const filesList: { filename: string; size: number }[] = [];
  if (existsSync(uploadsDir)) {
    const files = readdirSync(uploadsDir);
    for (const file of files) {
      if (file === ".gitkeep") continue;
      const filePath = join(uploadsDir, file);
      try {
        const st = statSync(filePath);
        if (st.isFile()) {
          filesList.push({ filename: file, size: st.size });
        }
      } catch {}
    }
  }

  return {
    success: true,
    timestamp: new Date().toISOString(),
    tables: tablesData,
    files: filesList,
  };
}

export async function pullDataFromRemote(
  remoteUrl: string,
  syncToken: string,
  uploadsDir: string,
  onProgress?: (msg: string) => void
): Promise<SyncResult> {
  const cleanUrl = remoteUrl.replace(/\/$/, "");
  onProgress?.(`📡 Menghubungi API VPS di ${cleanUrl}...`);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);

  let res: Response;
  try {
    res = await fetch(`${cleanUrl}/api/sync/export`, {
      headers: {
        Authorization: `Bearer ${syncToken}`,
        "X-Sync-Token": syncToken,
      },
      signal: controller.signal,
    });
  } catch (netErr: any) {
    clearTimeout(timeout);
    return {
      success: false,
      offline: true,
      message: `VPS (${cleanUrl}) sedang offline atau tidak dapat dijangkau. Sistem tetap beroperasi menggunakan data lokal terakhir.`,
    };
  } finally {
    clearTimeout(timeout);
  }

  if (!res.ok) {
    const errText = await res.text();
    return {
      success: false,
      offline: false,
      message: `VPS menolak sinkronisasi (Status ${res.status}): ${errText}`,
    };
  }

  const contentType = res.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    return {
      success: false,
      offline: false,
      message: `VPS mengembalikan respons non-JSON (${res.status}). Pastikan endpoint sync di VPS telah terdeploy dan berjalan.`,
    };
  }

  const payload = (await res.json()) as SyncExportData;
  if (!payload.success || !payload.tables) {
    return {
      success: false,
      offline: false,
      message: "Format data yang diterima dari VPS tidak valid.",
    };
  }

  onProgress?.(`🗄️ Menerapkan data dari ${Object.keys(payload.tables).length} tabel...`);

  // 1. Database sync
  await execute("SET FOREIGN_KEY_CHECKS = 0;");
  let totalRowsUpdated = 0;

  for (const table of SYNC_TABLES) {
    const rows = payload.tables[table] || [];
    if (rows.length === 0) continue;

    const columns = Object.keys(rows[0]);
    const colList = columns.map((col) => `\`${col}\``).join(", ");
    const placeholders = columns.map(() => "?").join(", ");
    const insertSql = `REPLACE INTO \`${table}\` (${colList}) VALUES (${placeholders})`;

    for (const row of rows) {
      const values = columns.map((col) => row[col]);
      await execute(insertSql, values);
      totalRowsUpdated++;
    }
  }

  await execute("SET FOREIGN_KEY_CHECKS = 1;");

  // 2. Uploads sync
  onProgress?.(`📦 Memeriksa sinkronisasi berkas lampiran...`);
  if (!existsSync(uploadsDir)) {
    mkdirSync(uploadsDir, { recursive: true });
  }

  let downloadedFilesCount = 0;
  const remoteFiles = payload.files || [];

  for (const rf of remoteFiles) {
    const localFilePath = join(uploadsDir, rf.filename);
    let needDownload = true;

    if (existsSync(localFilePath)) {
      try {
        const st = statSync(localFilePath);
        if (st.size === rf.size) {
          needDownload = false;
        }
      } catch {}
    }

    if (needDownload) {
      try {
        const fileRes = await fetch(`${cleanUrl}/uploads/${rf.filename}`);
        if (fileRes.ok) {
          const buffer = await fileRes.arrayBuffer();
          await Bun.write(localFilePath, buffer);
          downloadedFilesCount++;
        }
      } catch (fErr) {
        console.warn(`Gagal mengunduh berkas ${rf.filename}:`, fErr);
      }
    }
  }

  return {
    success: true,
    offline: false,
    message: "Data database dan file lampiran berhasil disinkronkan dari VPS!",
    stats: {
      tables_synced: Object.keys(payload.tables).length,
      rows_synced: totalRowsUpdated,
      files_checked: remoteFiles.length,
      files_downloaded: downloadedFilesCount,
    },
  };
}
