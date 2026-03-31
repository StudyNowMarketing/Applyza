/**
 * Upserts full enriched data for Japan, China, Russia, Hungary into study_destinations.
 * Run: node scripts/upsert-japan-china-russia-hungary.mjs
 */
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://tqmsrtqzeqlqxomkpxyj.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRxbXNydHF6ZXFscXhvbWtweHlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMxNTk4MTMsImV4cCI6MjA4ODczNTgxM30.mHMPWGsyfwhsQOtjjwo6ZqebvKioAl_eQxC7idbFvw0"
);

const destinations = [
  {
    slug: "japan",
    country: "Japan",
    status: "published",
    overview:
      "Japan offers a unique blend of ancient tradition and cutting-edge innovation, making it one of Asia's most exciting study destinations. Home to globally ranked universities, a world-class transport network, and an extraordinarily safe environment, Japan attracts over 300,000 international students each year. With the MEXT scholarship and a growing number of English-taught programmes, studying in Japan has never been more accessible.",
    language: "Japanese (English programmes available)",
    degree_duration: "Bachelor's: 4 years | Master's: 2 years | PhD: 3 years",
    tuition_range: "¥535,800–¥1,800,000/year (~£3,000–£10,000)",
    post_study_visa: "J-Find Visa (2 years) for graduates of top-ranked universities",
    top_cities: "Tokyo, Osaka, Kyoto, Nagoya, Fukuoka",
    why_study_here_1_title: "World-Class Universities",
    why_study_here_1_desc:
      "Japan is home to 5 universities in the QS World Top 100, led by the University of Tokyo (#32) and Kyoto University (#55). Japanese degrees are highly respected by employers globally.",
    why_study_here_2_title: "MEXT Government Scholarship",
    why_study_here_2_desc:
      "The Japanese government funds thousands of international students annually through the prestigious MEXT scholarship — covering full tuition, accommodation, and a monthly stipend.",
    why_study_here_3_title: "Safe, Affordable & Welcoming",
    why_study_here_3_desc:
      "Japan consistently ranks among the world's safest countries. Cost of living outside Tokyo can be surprisingly low, with student accommodation from ¥30,000–¥60,000/month.",
    why_study_here_4_title: "Post-Study Opportunities",
    why_study_here_4_desc:
      "Japan's J-Find Visa allows graduates of top-ranked global universities to stay for 2 years to explore job opportunities. Japan's ageing workforce is actively recruiting international talent.",
    visa_requirements:
      "Student Visa (留学ビザ): Certificate of Eligibility issued by university → apply at Japanese embassy/consulate. Processing: 2–3 months. Health insurance mandatory.",
    visa_fee: "Approx. ¥3,000 (~£16)",
    visa_work_rights: "Up to 28 hours/week during term; full-time during vacation",
    cost_city_1: "Tokyo | ¥120,000–¥200,000/month (~£650–£1,100)",
    cost_city_2: "Osaka | ¥90,000–¥150,000/month (~£490–£810)",
    cost_city_3: "Fukuoka | ¥70,000–¥110,000/month (~£380–£600)",
    partner_count: 12,
  },
  {
    slug: "china",
    country: "China",
    status: "published",
    overview:
      "China has rapidly emerged as one of the world's top study destinations, offering over 2,000 English-taught programmes, some of the lowest tuition fees globally, and a dynamic economy that rewards international graduates. With institutions like Tsinghua University (QS #14) and Peking University (QS #17), and a generous government scholarship programme reaching 50,000+ awards per year, China combines academic excellence with an unparalleled cultural experience.",
    language: "Mandarin Chinese (2,000+ English-taught programmes)",
    degree_duration: "Bachelor's: 4 years | Master's: 2–3 years | PhD: 3–4 years",
    tuition_range: "CNY 15,000–80,000/year (~£1,700–£9,000)",
    post_study_visa: "Work permit available; Q visa for alumni returning to work",
    top_cities: "Beijing, Shanghai, Guangzhou, Shenzhen, Chengdu",
    why_study_here_1_title: "Globally Ranked Universities",
    why_study_here_1_desc:
      "China has 6 universities in the QS World Top 50, including Tsinghua (#14) and Peking University (#17). Chinese degrees are internationally recognised and highly valued in business and tech sectors.",
    why_study_here_2_title: "Generous CSC Scholarship",
    why_study_here_2_desc:
      "The Chinese Government Scholarship (CSC) funds over 50,000 international students annually — covering tuition, accommodation and a monthly living stipend for the full duration of study.",
    why_study_here_3_title: "Affordable World-Class Education",
    why_study_here_3_desc:
      "Tuition fees in China are among the lowest of any major study destination, starting from just £1,700/year. Combined with affordable living costs, studying in China offers exceptional value.",
    why_study_here_4_title: "Career Access to the World's Largest Economy",
    why_study_here_4_desc:
      "Graduates with Chinese language skills and a Chinese degree are in high demand globally. China's Belt & Road Initiative creates career opportunities across 140+ partner countries.",
    visa_requirements:
      "Student Visa (X1/X2): Admission letter from university → JW201/JW202 form → apply at Chinese embassy. Processing: 4–6 weeks. Medical examination required for stays over 6 months.",
    visa_fee: "Approx. CNY 200–300 (~£22–£33)",
    visa_work_rights: "Off-campus work requires special permit; on-campus work permitted",
    cost_city_1: "Beijing | CNY 4,000–9,000/month (~£450–£1,000)",
    cost_city_2: "Shanghai | CNY 5,000–10,000/month (~£560–£1,120)",
    cost_city_3: "Chengdu | CNY 2,500–5,000/month (~£280–£560)",
    partner_count: 8,
  },
  {
    slug: "russia",
    country: "Russia",
    status: "published",
    overview:
      "Russia is home to some of the world's oldest and most respected universities, with a particularly strong tradition in STEM, medicine, and the arts. Offering over 30,000 fully funded government scholarship places per year and very low tuition fees, Russia provides accessible, high-quality education in a country with extraordinary cultural heritage. Moscow and St. Petersburg rank among Europe's most vibrant student cities.",
    language: "Russian (English-taught programmes available at top universities)",
    degree_duration: "Bachelor's: 4 years | Specialist: 5 years | Master's: 2 years | PhD: 3 years",
    tuition_range: "RUB 100,000–400,000/year (~£900–£3,600)",
    post_study_visa: "Work permit / temporary residence available after graduation",
    top_cities: "Moscow, St. Petersburg, Novosibirsk, Kazan, Tomsk",
    why_study_here_1_title: "World-Class STEM Education",
    why_study_here_1_desc:
      "Russia has produced more Fields Medal winners than any nation except the USA and France. Universities like MIPT and Lomonosov MSU are globally renowned for physics, mathematics and engineering.",
    why_study_here_2_title: "Russian Government Quota Scholarship",
    why_study_here_2_desc:
      "Russia allocates over 30,000 fully funded scholarship places annually to international students — covering full tuition fees and dormitory accommodation through the Rossotrudnichestvo agency.",
    why_study_here_3_title: "Very Affordable Cost of Living",
    why_study_here_3_desc:
      "Russia offers some of the lowest costs of living among major university destinations. Monthly expenses outside Moscow can be as low as £350–£600, making it highly accessible for students.",
    why_study_here_4_title: "Rich Culture & Artistic Heritage",
    why_study_here_4_desc:
      "Home to the Bolshoi Theatre, the Hermitage, and centuries of literary tradition, Russia offers an unparalleled cultural environment. Student life in Moscow and St. Petersburg is vibrant and diverse.",
    visa_requirements:
      "Student Visa: Invitation letter from university → apply at Russian embassy/consulate. Require registration at place of stay within 7 business days of arrival. Medical insurance required.",
    visa_fee: "Approx. £50–£100 depending on nationality",
    visa_work_rights: "Part-time work permitted with employer notification; internships allowed",
    cost_city_1: "Moscow | RUB 40,000–80,000/month (~£350–£700)",
    cost_city_2: "St. Petersburg | RUB 30,000–60,000/month (~£265–£530)",
    cost_city_3: "Novosibirsk | RUB 20,000–40,000/month (~£175–£350)",
    partner_count: 6,
  },
  {
    slug: "hungary",
    country: "Hungary",
    status: "published",
    overview:
      "Hungary is one of Central Europe's most popular and affordable study destinations, offering EU-standard education at a fraction of the cost. Budapest — one of Europe's most beautiful capital cities — is home to world-renowned medical and technical universities. The Stipendium Hungaricum scholarship programme funds over 5,000 international students per year, making Hungary an outstanding option for those seeking a European degree without the Western Europe price tag.",
    language: "Hungarian (wide range of English-taught programmes)",
    degree_duration: "Bachelor's: 3–4 years | Master's: 1.5–2 years | PhD: 3–4 years",
    tuition_range: "€1,500–€14,000/year (excl. Stipendium Hungaricum scholars)",
    post_study_visa: "EU Job Seeker Visa available; free movement within Schengen",
    top_cities: "Budapest, Debrecen, Pécs, Miskolc, Szeged",
    why_study_here_1_title: "EU Degree at Affordable Cost",
    why_study_here_1_desc:
      "Hungary offers EU-recognised degrees at significantly lower tuition fees than Western Europe. Graduates receive qualifications that are valid and respected across all 27 EU member states.",
    why_study_here_2_title: "Stipendium Hungaricum Scholarship",
    why_study_here_2_desc:
      "One of Europe's most generous scholarship programmes — funding 5,000+ international students per year with full tuition, free accommodation and health insurance for the entire degree.",
    why_study_here_3_title: "Budapest — Europe's Most Affordable Capital",
    why_study_here_3_desc:
      "Budapest consistently ranks among Europe's most liveable cities for students, with monthly living costs between €350–€700 — far lower than London, Paris or Amsterdam.",
    why_study_here_4_title: "Gateway to European Travel",
    why_study_here_4_desc:
      "Hungary's central location within the Schengen zone allows students to explore 26 European countries freely. Budget flights from Budapest connect to every major European city.",
    visa_requirements:
      "Non-EU students: National D-visa for studies → apply at Hungarian embassy. Require acceptance letter and proof of accommodation. Residence permit required within 30 days of arrival.",
    visa_fee: "Approx. €60–€110 depending on nationality",
    visa_work_rights: "Up to 24 hours/week during term; unrestricted during vacation periods",
    cost_city_1: "Budapest | €400–€800/month",
    cost_city_2: "Debrecen | €300–€600/month",
    cost_city_3: "Pécs | €280–€500/month",
    partner_count: 9,
  },
];

const { data, error } = await supabase
  .from("study_destinations")
  .upsert(destinations, { onConflict: "slug" });

if (error) {
  console.error("❌ Error:", error.message);
} else {
  console.log("✅ Upserted Japan, China, Russia, Hungary successfully.");
}

// Verify
const { data: verify } = await supabase
  .from("study_destinations")
  .select("slug, language, tuition_range, why_study_here_1_title")
  .in("slug", ["japan", "china", "russia", "hungary"]);

console.log("\nVerification:");
console.log(JSON.stringify(verify, null, 2));
