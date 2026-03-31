/**
 * /vs/[competitor] — Programmatic competitor comparison pages
 *
 * React Server Component. Captures high-intent searches like
 * "Applyza vs IDP" or "Applyza vs SI-UK" — queries from students
 * already evaluating their options.
 *
 * Example URLs:
 *   /vs/idp-education
 *   /vs/si-uk
 *   /vs/iec-abroad
 *   /vs/kaplan-international
 *
 * Data source: `competitor_comparisons` Supabase table.
 * If no row exists for the slug, a sensible generic template is rendered.
 */

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";

interface CompetitorData {
  slug: string;
  name: string;
  tagline: string | null;
  their_fee_model: string;
  our_fee_model: string;
  their_aqf: boolean;
  their_university_count: number | null;
  our_university_count: number | null;
  their_services: string[];
  our_services: string[];
  verdict: string;
  faq: { question: string; answer: string }[] | null;
}

const APPLYZA_DEFAULTS = {
  fee_model: "100% free for students — universities pay us a commission",
  aqf: true,
  university_count: 200,
  services: [
    "University application support",
    "Visa & immigration guidance",
    "Personal statement review",
    "Scholarship matching",
    "Accommodation assistance",
    "Student counselling",
    "Post-offer support",
  ],
};

// ─── Static params ─────────────────────────────────────────────────────────

export async function generateStaticParams() {
  const supabase = createSupabaseServerClient();
  const { data } = await supabase
    .from("competitor_comparisons")
    .select("slug");
  return (data ?? []).map((row) => ({ competitor: row.slug }));
}

// ─── Metadata ──────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: { competitor: string };
}): Promise<Metadata> {
  const supabase = createSupabaseServerClient();
  const { data } = await supabase
    .from("competitor_comparisons")
    .select("name")
    .eq("slug", params.competitor)
    .single();

  const competitorName = data?.name ?? toTitleCase(params.competitor.replace(/-/g, " "));
  const title = `Applyza vs ${competitorName} — Which Study Abroad Consultancy Is Right for You?`;
  const description = `Comparing Applyza and ${competitorName}: fees, AQF certification, university partners, services and student outcomes. Free, unbiased breakdown.`;

  return {
    title,
    description,
    openGraph: { title, description, url: `https://applyza.com/vs/${params.competitor}` },
    alternates: { canonical: `https://applyza.com/vs/${params.competitor}` },
  };
}

// ─── Helpers ───────────────────────────────────────────────────────────────

function toTitleCase(str: string) {
  return str.replace(/\b\w/g, (c) => c.toUpperCase());
}

// ─── Page component ────────────────────────────────────────────────────────

export default async function VsCompetitorPage({
  params,
}: {
  params: { competitor: string };
}) {
  const supabase = createSupabaseServerClient();
  const { data: competitor } = await supabase
    .from("competitor_comparisons")
    .select("*")
    .eq("slug", params.competitor)
    .single<CompetitorData>();

  // Render generic template if no specific data — still great for SEO
  const competitorName =
    competitor?.name ?? toTitleCase(params.competitor.replace(/-/g, " "));

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://applyza.com" },
        {
          "@type": "ListItem",
          position: 2,
          name: `Applyza vs ${competitorName}`,
          item: `https://applyza.com/vs/${params.competitor}`,
        },
      ],
    },
    ...(competitor?.faq && competitor.faq.length > 0
      ? [
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: competitor.faq.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: { "@type": "Answer", text: item.answer },
            })),
          },
        ]
      : []),
  ];

  const theirServices = competitor?.their_services ?? [
    "University applications",
    "Visa support",
    "Counselling",
  ];
  const ourServices = APPLYZA_DEFAULTS.services;

  const comparisonRows = [
    {
      label: "Fee to students",
      applyza: "Free",
      them: competitor?.their_fee_model ?? "May charge service fees",
      applyzaGood: true,
    },
    {
      label: "AQF Certified",
      applyza: "Yes — UK Government regulated",
      them: competitor?.their_aqf ? "Yes" : "Not publicly confirmed",
      applyzaGood: !competitor?.their_aqf,
    },
    {
      label: "Partner universities",
      applyza: `${APPLYZA_DEFAULTS.university_count}+`,
      them: competitor?.their_university_count
        ? `${competitor.their_university_count}+`
        : "Varies",
      applyzaGood: false,
    },
    {
      label: "Personal statement support",
      applyza: "Included, free",
      them: "May cost extra",
      applyzaGood: true,
    },
    {
      label: "Visa guidance",
      applyza: "Included, free",
      them: "Often charged separately",
      applyzaGood: true,
    },
  ];

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
            background: "linear-gradient(135deg, #0a0a1a 0%, #1a0a2e 100%)",
            padding: "80px 24px",
            textAlign: "center",
          }}
        >
          <p
            style={{
              color: "#8B5CF6",
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            Consultancy Comparison
          </p>
          <h1
            style={{
              fontSize: "clamp(1.75rem, 5vw, 3rem)",
              fontWeight: 700,
              marginBottom: 20,
              lineHeight: 1.2,
            }}
          >
            Applyza vs{" "}
            <span style={{ color: "#8B5CF6" }}>{competitorName}</span>
          </h1>
          <p
            style={{
              color: "rgba(255,255,255,0.7)",
              fontSize: 17,
              maxWidth: 580,
              margin: "0 auto 32px",
              lineHeight: 1.7,
            }}
          >
            An honest, side-by-side comparison so you can choose the right
            study abroad partner for your situation — no fluff.
          </p>
        </section>

        {/* ── Comparison table ── */}
        <section style={{ maxWidth: 900, margin: "0 auto", padding: "60px 24px" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: 28 }}>
            Side-by-side comparison
          </h2>
          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: 15,
              }}
            >
              <thead>
                <tr>
                  <th
                    style={{
                      textAlign: "left",
                      padding: "12px 16px",
                      background: "#12121f",
                      color: "rgba(255,255,255,0.6)",
                      fontWeight: 600,
                      borderBottom: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    Feature
                  </th>
                  <th
                    style={{
                      textAlign: "center",
                      padding: "12px 16px",
                      background: "rgba(46,196,182,0.1)",
                      color: "#2EC4B6",
                      fontWeight: 700,
                      borderBottom: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    Applyza
                  </th>
                  <th
                    style={{
                      textAlign: "center",
                      padding: "12px 16px",
                      background: "#12121f",
                      color: "rgba(255,255,255,0.6)",
                      fontWeight: 600,
                      borderBottom: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    {competitorName}
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr
                    key={row.label}
                    style={{
                      background: i % 2 === 0 ? "#0d0d1f" : "#12121f",
                    }}
                  >
                    <td
                      style={{
                        padding: "14px 16px",
                        color: "rgba(255,255,255,0.8)",
                        borderBottom: "1px solid rgba(255,255,255,0.05)",
                        fontWeight: 500,
                      }}
                    >
                      {row.label}
                    </td>
                    <td
                      style={{
                        padding: "14px 16px",
                        textAlign: "center",
                        color: row.applyzaGood ? "#2EC4B6" : "#fff",
                        fontWeight: row.applyzaGood ? 600 : 400,
                        borderBottom: "1px solid rgba(255,255,255,0.05)",
                      }}
                    >
                      {row.applyzaGood ? "✅ " : ""}{row.applyza}
                    </td>
                    <td
                      style={{
                        padding: "14px 16px",
                        textAlign: "center",
                        color: "rgba(255,255,255,0.65)",
                        borderBottom: "1px solid rgba(255,255,255,0.05)",
                      }}
                    >
                      {row.them}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── Services comparison ── */}
        <section style={{ background: "#12121f", padding: "60px 24px" }}>
          <div
            style={{
              maxWidth: 900,
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: 32,
            }}
          >
            <div>
              <h3
                style={{
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  color: "#2EC4B6",
                  marginBottom: 16,
                }}
              >
                What Applyza includes (free)
              </h3>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                {ourServices.map((s) => (
                  <li key={s} style={{ color: "rgba(255,255,255,0.85)", fontSize: 15 }}>
                    ✅ {s}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3
                style={{
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  color: "rgba(255,255,255,0.5)",
                  marginBottom: 16,
                }}
              >
                {competitorName} typical services
              </h3>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                {theirServices.map((s) => (
                  <li key={s} style={{ color: "rgba(255,255,255,0.65)", fontSize: 15 }}>
                    • {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── Verdict ── */}
        <section style={{ maxWidth: 800, margin: "0 auto", padding: "60px 24px" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: 16 }}>
            Our verdict
          </h2>
          <p
            style={{
              fontSize: 17,
              color: "rgba(255,255,255,0.8)",
              lineHeight: 1.75,
            }}
          >
            {competitor?.verdict ??
              `Both Applyza and ${competitorName} can help you study abroad. The key difference is cost: Applyza is completely free for students, with no hidden charges at any stage. We're also AQF-certified — a UK Government-backed quality standard that ensures ethical, transparent practice. If you're looking for free, expert, regulated guidance, Applyza is the clear choice.`}
          </p>
        </section>

        {/* ── FAQ ── */}
        {competitor?.faq && competitor.faq.length > 0 && (
          <section style={{ background: "#12121f", padding: "60px 24px" }}>
            <div style={{ maxWidth: 800, margin: "0 auto" }}>
              <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: 28 }}>
                Common questions
              </h2>
              {competitor.faq.map((item) => (
                <div
                  key={item.question}
                  style={{
                    background: "#1a1a2e",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 12,
                    padding: "24px",
                    marginBottom: 16,
                  }}
                >
                  <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 10 }}>
                    {item.question}
                  </h3>
                  <p style={{ fontSize: 15, color: "rgba(255,255,255,0.75)", lineHeight: 1.7 }}>
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
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
            Try Applyza — it's completely free
          </h2>
          <p
            style={{
              color: "rgba(255,255,255,0.7)",
              fontSize: 17,
              maxWidth: 520,
              margin: "0 auto 32px",
            }}
          >
            AQF-certified consultants, 200+ university partners, and zero fees
            for students. Book your free consultation today.
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
          <div style={{ marginTop: 20 }}>
            <Link
              href="/free-vs-paid-study-abroad-consultancies"
              style={{ color: "#2EC4B6", fontSize: 14, fontWeight: 500 }}
            >
              Read: Free vs paid consultancies — what's the real difference? →
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
