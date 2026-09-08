import { resolve } from "path";
import { pullDataFromRemote } from "../utils/syncEngine";

const remoteUrl = process.env.SYNC_REMOTE_URL || "https://fahmiibrahim.my.id";
const syncToken = process.env.SYNC_TOKEN || "portfolio_sync_7e3b91fa02c84d65";
const uploadsDir = resolve(import.meta.dir, "../../../server/uploads");

console.log("\n=======================================================");
console.log("🔄 Portfolio V2 - Automated API Sync Engine");
console.log(`🌐 Remote VPS : ${remoteUrl}`);
console.log("=======================================================\n");

const result = await pullDataFromRemote(remoteUrl, syncToken, uploadsDir, (msg) => {
  console.log(msg);
});

console.log("");
if (result.success) {
  console.log("🎉 SUCCESS:", result.message);
  if (result.stats) {
    console.log(`📊 Statistik Sinkronisasi:`);
    console.log(`   - Tabel Terupdate : ${result.stats.tables_synced}`);
    console.log(`   - Baris Data      : ${result.stats.rows_synced}`);
    console.log(`   - Total Berkas    : ${result.stats.files_checked}`);
    console.log(`   - Berkas Diunduh  : ${result.stats.files_downloaded}`);
  }
} else if (result.offline) {
  console.log("⚠️  OFFLINE NOTICE:", result.message);
} else {
  console.error("❌ ERROR:", result.message);
  process.exit(1);
}
console.log("=======================================================\n");
process.exit(0);
