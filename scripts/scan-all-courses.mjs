/**
 * Fetches all remaining courses (respecting current active filters) and prints
 * every title so we can spot junk patterns.
 * Run: node scripts/scan-all-courses.mjs
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
      .select("id, title, university_name")
      .range(from, from + PAGE - 1)
      .order("university_name,title");
    if (error) { console.error(error.message); break; }
    if (!data || data.length === 0) break;
    all = all.concat(data);
    if (data.length < PAGE) break;
    from += PAGE;
  }
  return all;
}

// Patterns that indicate a non-genuine course title
const JUNK = [
  // Guides / brochures / prospectuses
  /guide/i,
  /prospectus/i,
  /brochure/i,
  /mini.?guide/i,

  // Forms / applications
  /application form/i,
  /apply online/i,
  /how to apply/i,

  // Year/intake labels masquerading as titles
  /\b20\d\d\/\d\d\b/,        // "2025/26"
  /\b20\d\d-\d\d\b/,         // "2025-26"

  // CTAs / sign-up
  /sign.?up/i,
  /register your interest/i,
  /open day/i,
  /newsletter/i,

  // Generic navigation / content pages
  /^courses?$/i,
  /^home$/i,
  /^about/i,
  /statement of service/i,

  // Short courses generic labels
  /^short courses?$/i,

  // People's names (First Last, no degree keyword)
  // handled separately below

  // Abroad programmes (non-course descriptors)
  /\babroad\b/i,

  // Year-only titles
  /^\d{4}\/\d{2,4}$/,
];

const DEGREE_KEYWORDS = /\b(BSc|BA|MSc|MA|MBA|PhD|BEng|MEng|LLB|LLM|PGCE|HND|HNC|Foundation|Diploma|Certificate|Degree|Engineering|Science|Arts|Law|Medicine|Nursing|Education|Management|Business|Computing|Psychology|History|Geography|Chemistry|Physics|Biology|Economics|Finance|Marketing|Accounting|Sociology|Philosophy|Politics|English|Maths|Mathematics|Music|Design|Architecture|Media|Film|Sport|Health|Social|Civil|Mechanical|Electrical|Computer|Software|Data|AI|Machine|Technology|Studies|Research|Practice|Theory|Analysis|Leadership|Communication|Development|Security|Networks|Systems|Care|Therapy|Surgery|Dental|Medical|Clinical|Nursing|Midwifery|Physiotherapy|Radiography|Pharmacology|Forensic|Criminal|Justice|Policy|International|Global|Digital|Innovation|Entrepreneurship|Sustainability|Environment|Urban|Rural|Cultural|Creative|Performance|Production|Animation|Photography|Fashion|Textile|Interior|Landscape|Planning)\b/i;

const NAME_PATTERN = /^[A-Z][a-z]{1,20} [A-Z][a-z]{1,20}$/;

function isJunk(title) {
  if (!title || title.trim() === "") return true;
  const t = title.trim();
  for (const p of JUNK) {
    if (p.test(t)) return true;
  }
  if (NAME_PATTERN.test(t) && !DEGREE_KEYWORDS.test(t)) return true;
  return false;
}

const all = await fetchAll();
console.log(`Total fetched: ${all.length}\n`);

const junk = all.filter(c => isJunk(c.title));
const clean = all.filter(c => !isJunk(c.title));

console.log(`=== SUSPECTED JUNK (${junk.length}) ===`);
// Group by university
const byUni = {};
for (const c of junk) {
  const u = c.university_name || "unknown";
  if (!byUni[u]) byUni[u] = [];
  byUni[u].push(c.title);
}
for (const [uni, titles] of Object.entries(byUni).sort()) {
  console.log(`\n${uni}:`);
  titles.sort().forEach(t => console.log(`  • ${t}`));
}

console.log(`\n=== CLEAN courses: ${clean.length} ===`);
