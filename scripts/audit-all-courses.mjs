/**
 * Scans ALL courses in the database (paginated) and deletes junk entries.
 * Run: node scripts/audit-all-courses.mjs
 */
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://tqmsrtqzeqlqxomkpxyj.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRxbXNydHF6ZXFscXhvbWtweHlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMxNTk4MTMsImV4cCI6MjA4ODczNTgxM30.mHMPWGsyfwhsQOtjjwo6ZqebvKioAl_eQxC7idbFvw0";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Patterns that indicate a non-genuine course entry
const JUNK_PATTERNS = [
  // Exact matches (case-insensitive)
  /^courses?$/i,
  /^home$/i,
  /^about( us)?$/i,
  /^contact( us)?$/i,
  /^search$/i,
  /^find a course$/i,
  /^find courses?$/i,
  /^apply( now)?$/i,
  /^register( now)?$/i,
  /^sign up$/i,
  /^sign-up$/i,
  /^enquire( now)?$/i,
  /^enquiry$/i,
  /^book( a)? (consultation|appointment|session)$/i,
  /^download( a)? (brochure|prospectus)$/i,
  /^request (a )?(brochure|prospectus|info|information)$/i,
  /^our statement of service$/i,
  /^statement of service$/i,
  /^cookies?( policy)?$/i,
  /^privacy( policy)?$/i,
  /^terms( (and|&) conditions?)?$/i,
  /^accessibility$/i,
  /^sitemap$/i,
  /^newsletter$/i,
  /^subscribe$/i,
  /^unsubscribe$/i,
  /^test$/i,
  /^sample course$/i,
  /^example course$/i,
  /^placeholder$/i,
  /^lorem ipsum/i,
  /^n\/a$/i,
  /^tbc$/i,
  /^tbd$/i,
  /^coming soon$/i,
  /^untitled/i,

  // People's names masquerading as courses (short, no degree keywords)
  /^[A-Z][a-z]+ [A-Z][a-z]+$/, // "First Last" — evaluated below with extra check

  // Registration / CTA phrases
  /register your interest/i,
  /sign up for/i,
  /open day/i,
  /sqe newsletter/i,
  /brochure/i,
  /prospectus/i,

  // Navigation / web-page titles
  /^(undergraduate|postgraduate|international) (courses?|programmes?|students?)$/i,
  /^study (abroad|in the uk|at)$/i,
  /^why (study|choose)/i,
  /^how to apply$/i,
  /^entry requirements?$/i,
  /^tuition fees?$/i,
  /^scholarship/i, // bare word "scholarship" / "scholarships"

  // Anything with URL-like patterns
  /https?:\/\//i,
  /www\./i,
];

// Additional check: short "First Last" names should only be flagged if they
// have no degree-level keywords in the title
const NAME_PATTERN = /^[A-Z][a-z]{1,20} [A-Z][a-z]{1,20}$/;
const DEGREE_KEYWORDS =
  /\b(BSc|BA|MSc|MA|MBA|PhD|BEng|MEng|LLB|LLM|PGCE|HND|HNC|Foundation|Diploma|Certificate|Degree|Engineering|Science|Arts|Law|Medicine|Nursing|Education|Management|Business|Computing|Psychology|History|Geography|Chemistry|Physics|Biology|Economics|Finance|Marketing|Accounting|Sociology|Philosophy|Politics|English|Maths|Mathematics|Music|Design|Architecture|Media|Film|Sport|Health|Social|Civil|Mechanical|Electrical|Computer|Software|Data|AI|Machine)\b/i;

function isJunk(title) {
  if (!title || title.trim() === "") return true;
  const t = title.trim();

  for (const pattern of JUNK_PATTERNS) {
    if (pattern === NAME_PATTERN) continue; // handled separately
    if (pattern.test(t)) return true;
  }

  // Flag "First Last" names that have no degree keywords
  if (NAME_PATTERN.test(t) && !DEGREE_KEYWORDS.test(t)) return true;

  return false;
}

async function fetchAllCourses() {
  const PAGE = 1000;
  let all = [];
  let from = 0;

  while (true) {
    const { data, error } = await supabase
      .from("courses")
      .select("id, title, university_name")
      .range(from, from + PAGE - 1)
      .order("id");

    if (error) {
      console.error("Fetch error:", error.message);
      break;
    }
    if (!data || data.length === 0) break;

    all = all.concat(data);
    console.log(`  Fetched rows ${from + 1}–${from + data.length} (total so far: ${all.length})`);

    if (data.length < PAGE) break;
    from += PAGE;
  }

  return all;
}

async function main() {
  console.log("Fetching all courses...");
  const all = await fetchAllCourses();
  console.log(`\nTotal courses fetched: ${all.length}`);

  const junk = all.filter((c) => isJunk(c.title));

  if (junk.length === 0) {
    console.log("\nNo junk entries found. Database looks clean!");
    return;
  }

  console.log(`\nFound ${junk.length} junk entries:`);
  junk.forEach((c) =>
    console.log(`  [${c.id}] "${c.title}" — ${c.university_name || "no uni"}`)
  );

  const ids = junk.map((c) => c.id);

  console.log(`\nDeleting ${ids.length} junk entries...`);
  const { error } = await supabase.from("courses").delete().in("id", ids);

  if (error) {
    console.error("Delete error:", error.message);
    return;
  }

  // Verify
  const { count } = await supabase
    .from("courses")
    .select("*", { count: "exact", head: true });

  console.log(`Done. Deleted ${ids.length} entries. Remaining courses: ${count}`);
}

main();
