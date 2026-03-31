/**
 * /courses/[subject] — Programmatic subject guide pages
 *
 * React Server Component. Captures high-volume searches like
 * "study medicine abroad", "study law in the UK", "MBA abroad".
 *
 * Example URLs:
 *   /courses/medicine
 *   /courses/law
 *   /courses/mba
 *   /courses/computer-science
 *   /courses/nursing
 *
 * Data source: `course_subjects` Supabase table (new — see migration below).
 * Falls back to a generic template if no row exists for the slug.
 */

import type { Metadata } from "next";
import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";

interface SubjectData {
  slug: string;
  name: string;
  description: string;
  overview: string;
  why_study: string;
  top_countries: string[];
  top_universities: string[];
  career_outcomes: string[];
  average_duration: string | null;
  average_tuition_range: string | null;
  entry_requirements: string | null;
  faq: { question: string; answer: string }[] | null;
}

// ─── Static params ─────────────────────────────────────────────────────────

export async function generateStaticParams() {
  const supabase = createSupabaseServerClient();
  const { data } = await supabase.from("course_subjects").select("slug");
  return (data ?? []).map((row) => ({ subject: row.slug }));
}

// ─── Metadata ──────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: { subject: string };
}): Promise<Metadata> {
  const supabase = createSupabaseServerClient();
  const { data } = await supabase
    .from("course_subjects")
    .select("name, description")
    .eq("slug", params.subject)
    .single();

  const subjectName =
    data?.name ?? toTitleCase(params.subject.replace(/-/g, " "));
  const title = `Study ${subjectName} Abroad — University Courses, Entry Requirements & Costs`;
  const description =
    data?.description ??
    `Find the best universities to study ${subjectName} abroad. Compare courses, entry requirements, tuition fees and career outcomes — free advice from Applyza.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://applyza.com/courses/${params.subject}`,
    },
    alternates: {
      canonical: `https://applyza.com/courses/${params.subject}`,
    },
  };
}

// ─── Helpers ───────────────────────────────────────────────────────────────

function toTitleCase(str: string) {
  return str.replace(/\b\w/g, (c) => c.toUpperCase());
}

// ─── Page component ────────────────────────────────────────────────────────

export default async function CoursesSubjectPage({
  params,
}: {
  params: { subject: string };
}) {
  const supabase = createSupabaseServerClient();
  const { data: subject } = await supabase
    .from("course_subjects")
    .select("*")
    .eq("slug", params.subject)
    .single<SubjectData>();

  const subjectName =
    subject?.name ?? toTitleCase(params.subject.replace(/-/g, " "));

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://applyza.com" },
        {
          "@type": "ListItem",
          position: 2,
          name: "Find a Course",
          item: "https://applyza.com/find-a-course",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: `Study ${subjectName} Abroad`,
          item: `https://applyza.com/courses/${params.subject}`,
        },
      ],
    },
    ...(subject?.faq && subject.faq.length > 0
      ? [
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: subject.faq.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: { "@type": "Answer", text: item.answer },
            })),
          },
        ]
      : []),
  ];

  const topCountries = subject?.top_countries ?? [
    "United Kingdom",
    "United States",
    "Canada",
    "Australia",
    "Germany",
  ];

  const careerOutcomes = subject?.career_outcomes ?? [];

  return (
    <>
      {jsonLd.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <main>
        {/* ── Hero ── */}
        <section
          style={{
            background: "linear-gradient(135deg, #0a0a1a 0%, #0a1a2e 100%)",
            padding: "80px 24px",
            textAlign: "center",
          }}
        >
          <p
            style={{
              color: "#2EC4B6",
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            Subject Guide
          </p>
          <h1
            style={{
              fontSize: "clamp(2rem, 5vw, 3.25rem)",
              fontWeight: 700,
              lineHeight: 1.15,
              marginBottom: 20,
            }}
          >
            Study{" "}
            <span style={{ color: "#2EC4B6" }}>{subjectName}</span> Abroad
          </h1>
          <p
            style={{
              fontSize: 18,
              color: "rgba(255,255,255,0.72)",
              maxWidth: 620,
              margin: "0 auto 32px",
              lineHeight: 1.7,
            }}
          >
            {subject?.description ??
              `Explore the best universities, entry requirements, costs, and career outcomes for studying ${subjectName} abroad. Free guidance from our AQF-certified consultants.`}
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              href="/find-a-course"
              style={{
                background: "#2EC4B6",
                color: "#0a0a1a",
                padding: "14px 32px",
                borderRadius: 8,
                fontWeight: 700,
                fontSize: 16,
              }}
            >
              Browse {subjectName} Courses
            </Link>
            <Link
              href="/book-a-consultation"
              style={{
                border: "1px solid rgba(255,255,255,0.2)",
                color: "#fff",
                padding: "14px 32px",
                borderRadius: 8,
                fontWeight: 600,
                fontSize: 16,
              }}
            >
              Get Free Advice
            </Link>
          </div>
        </section>

        {/* ── Overview ── */}
        {subject?.overview && (
          <section style={{ maxWidth: 800, margin: "0 auto", padding: "60px 24px" }}>
            <h2 style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: 16 }}>
              What is {subjectName}?
            </h2>
            <p style={{ fontSize: 17, color: "rgba(255,255,255,0.8)", lineHeight: 1.75 }}>
              {subject.overview}
            </p>
          </section>
        )}

        {/* ── Key facts ── */}
        <section style={{ background: "#12121f", padding: "60px 24px" }}>
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <h2 style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: 28 }}>
              Key facts
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: 20,
              }}
            >
              {[
                { label: "Typical duration", value: subject?.average_duration },
                { label: "Tuition range", value: subject?.average_tuition_range },
                { label: "Entry requirements", value: subject?.entry_requirements },
              ].map(
                (fact) =>
                  fact.value && (
                    <div
                      key={fact.label}
                      style={{
                        background: "#1a1a2e",
                        border: "1px solid rgba(255,255,255,0.08)",
                        borderRadius: 12,
                        padding: "24px 20px",
                      }}
                    >
                      <p
                        style={{
                          color: "#2EC4B6",
                          fontSize: 12,
                          fontWeight: 600,
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                          marginBottom: 8,
                        }}
                      >
                        {fact.label}
                      </p>
                      <p style={{ fontSize: 16, fontWeight: 600 }}>{fact.value}</p>
                    </div>
                  )
              )}
            </div>
          </div>
        </section>

        {/* ── Top destinations ── */}
        <section style={{ maxWidth: 900, margin: "0 auto", padding: "60px 24px" }}>
          <h2 style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: 24 }}>
            Best countries to study {subjectName}
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
              gap: 14,
            }}
          >
            {topCountries.map((country) => (
              <Link
                key={country}
                href={`/study-in/${country.toLowerCase().replace(/\s+/g, "-")}`}
                style={{
                  display: "block",
                  background: "#12121f",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 10,
                  padding: "16px 18px",
                  fontSize: 15,
                  color: "rgba(255,255,255,0.85)",
                  transition: "border-color 0.2s",
                }}
              >
                🌍 {country}
              </Link>
            ))}
          </div>
        </section>

        {/* ── Top universities ── */}
        {subject?.top_universities && subject.top_universities.length > 0 && (
          <section style={{ background: "#12121f", padding: "60px 24px" }}>
            <div style={{ maxWidth: 900, margin: "0 auto" }}>
              <h2 style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: 24 }}>
                Top universities for {subjectName}
              </h2>
              <ul
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                  gap: 12,
                  listStyle: "none",
                }}
              >
                {subject.top_universities.map((uni) => (
                  <li
                    key={uni}
                    style={{
                      background: "#1a1a2e",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: 8,
                      padding: "12px 16px",
                      fontSize: 15,
                      color: "rgba(255,255,255,0.85)",
                    }}
                  >
                    🎓 {uni}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* ── Career outcomes ── */}
        {careerOutcomes.length > 0 && (
          <section style={{ maxWidth: 900, margin: "0 auto", padding: "60px 24px" }}>
            <h2 style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: 24 }}>
              Career outcomes
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                gap: 12,
              }}
            >
              {careerOutcomes.map((outcome) => (
                <div
                  key={outcome}
                  style={{
                    background: "#12121f",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 8,
                    padding: "14px 16px",
                    fontSize: 14,
                    color: "rgba(255,255,255,0.8)",
                  }}
                >
                  💼 {outcome}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── Why study section ── */}
        {subject?.why_study && (
          <section style={{ background: "#12121f", padding: "60px 24px" }}>
            <div style={{ maxWidth: 800, margin: "0 auto" }}>
              <h2 style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: 16 }}>
                Why study {subjectName} abroad?
              </h2>
              <p style={{ fontSize: 17, color: "rgba(255,255,255,0.8)", lineHeight: 1.75 }}>
                {subject.why_study}
              </p>
            </div>
          </section>
        )}

        {/* ── FAQ ── */}
        {subject?.faq && subject.faq.length > 0 && (
          <section style={{ maxWidth: 800, margin: "0 auto", padding: "60px 24px" }}>
            <h2 style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: 28 }}>
              Frequently asked questions
            </h2>
            {subject.faq.map((item) => (
              <div
                key={item.question}
                style={{
                  background: "#12121f",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 12,
                  padding: "24px",
                  marginBottom: 16,
                }}
              >
                <h3 style={{ fontSize: 17, fontWeight: 600, marginBottom: 10 }}>
                  {item.question}
                </h3>
                <p style={{ fontSize: 15, color: "rgba(255,255,255,0.75)", lineHeight: 1.7 }}>
                  {item.answer}
                </p>
              </div>
            ))}
          </section>
        )}

        {/* ── CTA ── */}
        <section
          style={{
            textAlign: "center",
            padding: "80px 24px",
            background: "linear-gradient(135deg, #0a0a1a, #12121f)",
          }}
        >
          <h2 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: 16 }}>
            Ready to study {subjectName} abroad?
          </h2>
          <p
            style={{
              color: "rgba(255,255,255,0.7)",
              fontSize: 17,
              maxWidth: 520,
              margin: "0 auto 32px",
            }}
          >
            Our AQF-certified consultants will match you with the best{" "}
            {subjectName} programmes for your grades, budget and goals — free.
          </p>
          <Link
            href="/book-a-consultation"
            style={{
              display: "inline-block",
              background: "#2EC4B6",
              color: "#0a0a1a",
              padding: "14px 36px",
              borderRadius: 8,
              fontWeight: 700,
              fontSize: 16,
            }}
          >
            Book Free Consultation
          </Link>
        </section>
      </main>
    </>
  );
}
