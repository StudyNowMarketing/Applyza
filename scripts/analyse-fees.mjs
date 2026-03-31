/**
 * Fetches all courses and analyses tuition fees to flag likely home-student fees.
 * UK home undergraduate fee cap = £9,250 (or £9,535 from 2025/26)
 * Run: node scripts/analyse-fees.mjs
 */
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://tqmsrtqzeqlqxomkpxyj.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRxbXNydHF6ZXFscXhvbWtweHlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMxNTk4MTMsImV4cCI6MjA4ODczNTgxM30.mHMPWGsyfwhsQOtjjwo6ZqebvKioAl_eQxC7idbFvw0"
);

async function fetchAll() {
  let all = [], from = 0;
  while (true) {
    const { data, error } = await supabase
      .from("courses")
      .select("id, title, university_name, study_level, tuition_fee, country")
      .not("tuition_fee", "is", null)
      .range(from, from + 999);
    if (error || !data?.length) break;
    all = all.concat(data);
    if (data.length < 1000) break;
    from += 1000;
  }
  return all;
}

const all = await fetchAll();
console.log(`Total courses with fees: ${all.length}\n`);

// UK home fee thresholds
const HOME_UG_FEE   = 9250;  // pre-2025 cap
const HOME_UG_NEW   = 9535;  // 2025/26 cap
const HOME_PG_LOW   = 8000;  // some PG home fees this low
const INTL_MIN_UG   = 10000; // minimum expected intl UG fee
const INTL_MIN_PG   = 12000; // minimum expected intl PG fee

function likelyHomeOrLow(course) {
  const fee = course.tuition_fee;
  const lvl = (course.study_level || "").toLowerCase();
  const isUG = lvl.includes("undergraduate") || lvl.includes("foundation") || lvl.includes("top-up");
  const isPG = lvl.includes("postgraduate");

  if (fee <= HOME_UG_NEW) return `£${fee.toLocaleString()} — at or below home UG cap`;
  if (isUG && fee < INTL_MIN_UG) return `£${fee.toLocaleString()} — suspiciously low for intl UG`;
  if (isPG && fee < INTL_MIN_PG) return `£${fee.toLocaleString()} — suspiciously low for intl PG`;
  return null;
}

const suspicious = all.filter(c => likelyHomeOrLow(c));

// Group by university
const byUni = {};
for (const c of suspicious) {
  if (!byUni[c.university_name]) byUni[c.university_name] = [];
  byUni[c.university_name].push(c);
}

console.log(`=== SUSPICIOUS FEES (${suspicious.length} courses) ===\n`);
for (const [uni, courses] of Object.entries(byUni).sort()) {
  console.log(`\n${uni}:`);
  for (const c of courses.sort((a,b) => a.tuition_fee - b.tuition_fee)) {
    const reason = likelyHomeOrLow(c);
    console.log(`  [${c.id}] ${c.study_level} | "${c.title}" — ${reason}`);
  }
}

// Fee distribution summary
console.log("\n=== FEE DISTRIBUTION BY UNIVERSITY ===");
const uniStats = {};
for (const c of all) {
  if (!uniStats[c.university_name]) uniStats[c.university_name] = { min: Infinity, max: 0, fees: [] };
  uniStats[c.university_name].fees.push(c.tuition_fee);
  uniStats[c.university_name].min = Math.min(uniStats[c.university_name].min, c.tuition_fee);
  uniStats[c.university_name].max = Math.max(uniStats[c.university_name].max, c.tuition_fee);
}
for (const [uni, s] of Object.entries(uniStats).sort()) {
  const avg = Math.round(s.fees.reduce((a,b)=>a+b,0)/s.fees.length);
  console.log(`  ${uni}: min=£${s.min.toLocaleString()} max=£${s.max.toLocaleString()} avg=£${avg.toLocaleString()} (${s.fees.length} courses)`);
}
