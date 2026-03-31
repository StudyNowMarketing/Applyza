/**
 * Deletes all courses that have no tuition_fee (null, empty string, or 0).
 * These are junk entries like application forms, guides, CTAs etc.
 * Run: node scripts/delete-no-fee-courses.mjs
 */
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://tqmsrtqzeqlqxomkpxyj.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRxbXNydHF6ZXFscXhvbWtweHlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMxNTk4MTMsImV4cCI6MjA4ODczNTgxM30.mHMPWGsyfwhsQOtjjwo6ZqebvKioAl_eQxC7idbFvw0"
);

async function fetchAll() {
  const PAGE = 1000;
  let all = [];
  let from = 0;
  while (true) {
    const { data, error } = await supabase
      .from("courses")
      .select("id, title, university_name, tuition_fee")
      .range(from, from + PAGE - 1)
      .order("id");
    if (error) { console.error("Fetch error:", error.message); break; }
    if (!data || data.length === 0) break;
    all = all.concat(data);
    console.log(`  Fetched ${all.length} so far...`);
    if (data.length < PAGE) break;
    from += PAGE;
  }
  return all;
}

const all = await fetchAll();
console.log(`\nTotal courses fetched: ${all.length}`);

// Find courses with no fee
const noFee = all.filter(c => {
  const fee = c.tuition_fee;
  return fee === null || fee === undefined || fee === "" || fee === 0 || fee === "0";
});

console.log(`\nCourses with NO tuition fee: ${noFee.length}`);

// Preview by university
const byUni = {};
for (const c of noFee) {
  const u = c.university_name || "Unknown";
  if (!byUni[u]) byUni[u] = [];
  byUni[u].push(c.title);
}
for (const [uni, titles] of Object.entries(byUni).sort()) {
  console.log(`\n${uni} (${titles.length}):`);
  titles.sort().forEach(t => console.log(`  • ${t}`));
}

if (noFee.length === 0) {
  console.log("\nNothing to delete.");
  process.exit(0);
}

// Delete in batches of 100
const ids = noFee.map(c => c.id);
const BATCH = 100;
let deleted = 0;
for (let i = 0; i < ids.length; i += BATCH) {
  const batch = ids.slice(i, i + BATCH);
  const { error } = await supabase.from("courses").delete().in("id", batch);
  if (error) {
    console.error(`\nDelete error on batch ${i}-${i + BATCH}:`, error.message);
  } else {
    deleted += batch.length;
    console.log(`\nDeleted batch ${i + 1}–${Math.min(i + BATCH, ids.length)} (${deleted}/${ids.length})`);
  }
}

// Verify final count
const { count } = await supabase.from("courses").select("*", { count: "exact", head: true });
console.log(`\n✅ Done. Deleted ${deleted} no-fee entries. Courses remaining: ${count}`);
