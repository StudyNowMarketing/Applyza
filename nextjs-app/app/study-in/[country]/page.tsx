/**
 * /study-in/[country] — Programmatic country guide pages
 *
 * React Server Component. Each country slug maps to a row in the
 * `study_destinations` Supabase table. Googlebot sees fully server-rendered
 * HTML with correct title, meta description, JSON-LD, and body copy
 * — no JavaScript required.
 *
 * Example URLs:
 *   /study-in/united-kingdom
 *   /study-in/united-states
 *   /study-in/canada
 *   /study-in/australia
 *   /study-in/germany
 */

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";

interface CountryData {
  id: string;
  slug: string;
  name: string;
  description: string;
  overview: string;
  why_study_here: string;
  top_universities: string[];
  popular_courses: string[];
  average_tuition_range: string;
  average_living_cost: string;
  visa_requirements: string;
  ielts_requirement: string;
  featured_image_url: string | null;
  faq: { question: string; answer: string }[] | null;
}

// ─── Static params for build-time generation ──────────────────────────────────

export async function generateStaticParams() {
  const supabase = createSupabaseServerClient();
  const { data } = await supabase
    .from("study_destinations")
    .select("slug")
    .eq("status", "published");
  return (data ?? []).map((row) => ({ country: row.slug }));
}

// ─── Per-page metadata ────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: { country: string };
}): Promise<Metadata> {
  const supabase = createSupabaseServerClient();
  const { data } = await supabase
    .from("study_destinations")
    .select("name, description, featured_image_url")
    .eq("slug", params.country)
    .eq("status", "published")
    .single();

  if (!data) return { title: "Not Found" };

  const title = `Study in ${data.name} — Free Advice from AQF-Certified Consultants`;
  const description =
    data.description ||
    `Everything you need to know about studying in ${data.name}: universities, courses, visas, costs & scholarships. Free guidance from Applyza.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://applyza.com/study-in/${params.country}`,
      images: data.featured_image_url
        ? [{ url: data.featured_image_url, width: 1200, height: 630 }]
        : undefined,
    },
    alternates: {
      canonical: `https://applyza.com/study-in/${params.country}`,
    },
  };
}

// ─── JSON-LD helpers ──────────────────────────────────────────────────────────

function buildJsonLd(country: CountryData) {
  const base = "https://applyza.com";
  const url = `${base}/study-in/${country.slug}`;

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: base },
      {
        "@type": "ListItem",
        position: 2,
        name: "Study Destinations",
        item: `${base}/study-destinations`,
      },
      { "@type": "ListItem", position: 3, name: `Study in ${country.name}`, item: url },
    ],
  };

  const faqSchema =
    country.faq && country.faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: country.faq.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: { "@type": "Answer", text: item.answer },
          })),
        }
      : null;

  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Study in ${country.name} — Free Consultancy`,
    provider: {
      "@type": "Organization",
      name: "Applyza",
      url: base,
    },
    areaServed: country.name,
    description: `Free, AQF-certified advice on studying in ${country.name}: universities, visas, scholarships and applications.`,
    url,
  };

  return [breadcrumb, service, ...(faqSchema ? [faqSchema] : [])];
}

// ─── Page component ───────────────────────────────────────────────────────────

export default async function StudyInCountryPage({
  params,
}: {
  params: { country: string };
}) {
  const supabase = createSupabaseServerClient();
  const { data: country } = await supabase
    .from("study_destinations")
    .select("*")
    .eq("slug", params.country)
    .eq("status", "published")
    .single<CountryData>();

  if (!country) notFound();

  const jsonLd = buildJsonLd(country);

  return (
    <>
      {/* JSON-LD structured data */}
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
            background:
              "linear-gradient(135deg, #0a0a1a 0%, #12121f 50%, #1a0a2e 100%)",
            padding: "80px 24px",
            textAlign: "center",
          }}
        >
          <div style={{ maxWidth: 800, margin: "0 auto" }}>
            <p
              style={{
                color: "#2EC4B6",
                fontSize: 14,
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: 16,
              }}
            >
              Study Destination Guide
            </p>
            <h1
              style={{
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                fontWeight: 700,
                lineHeight: 1.15,
                marginBottom: 20,
              }}
            >
              Study in{" "}
              <span style={{ color: "#2EC4B6" }}>{country.name}</span>
            </h1>
            <p
              style={{
                fontSize: 18,
                color: "rgba(255,255,255,0.72)",
                maxWidth: 600,
                margin: "0 auto 32px",
                lineHeight: 1.7,
              }}
            >
              {country.description}
            </p>
            <Link
              href="/book-a-consultation"
              style={{
                display: "inline-block",
                background: "#2EC4B6",
                color: "#0a0a1a",
                padding: "14px 32px",
                borderRadius: 8,
                fontWeight: 700,
                fontSize: 16,
              }}
            >
              Get Free Advice →
            </Link>
          </div>
        </section>

        {/* ── Overview ── */}
        {country.overview && (
          <section
            style={{
              maxWidth: 800,
              margin: "0 auto",
              padding: "60px 24px",
            }}
          >
            <h2
              style={{
                fontSize: "1.75rem",
                fontWeight: 700,
                marginBottom: 16,
              }}
            >
              Overview
            </h2>
            <p
              style={{
                fontSize: 17,
                color: "rgba(255,255,255,0.8)",
                lineHeight: 1.75,
              }}
            >
              {country.overview}
            </p>
          </section>
        )}

        {/* ── Why Study Here ── */}
        {country.why_study_here && (
          <section
            style={{
              background: "#12121f",
              padding: "60px 24px",
            }}
          >
            <div style={{ maxWidth: 800, margin: "0 auto" }}>
              <h2
                style={{
                  fontSize: "1.75rem",
                  fontWeight: 700,
                  marginBottom: 16,
                }}
              >
                Why Study in {country.name}?
              </h2>
              <p
                style={{
                  fontSize: 17,
                  color: "rgba(255,255,255,0.8)",
                  lineHeight: 1.75,
                }}
              >
                {country.why_study_here}
              </p>
            </div>
          </section>
        )}

        {/* ── Key Facts ── */}
        <section style={{ maxWidth: 900, margin: "0 auto", padding: "60px 24px" }}>
          <h2 style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: 32 }}>
            Key Facts
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: 20,
            }}
          >
            {[
              { label: "Average Tuition", value: country.average_tuition_range },
              { label: "Living Costs / year", value: country.average_living_cost },
              { label: "IELTS Requirement", value: country.ielts_requirement },
            ].map(
              (fact) =>
                fact.value && (
                  <div
                    key={fact.label}
                    style={{
                      background: "#12121f",
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
                    <p style={{ fontSize: 18, fontWeight: 600 }}>{fact.value}</p>
                  </div>
                )
            )}
          </div>
        </section>

        {/* ── Top Universities ── */}
        {country.top_universities && country.top_universities.length > 0 && (
          <section style={{ background: "#12121f", padding: "60px 24px" }}>
            <div style={{ maxWidth: 900, margin: "0 auto" }}>
              <h2 style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: 24 }}>
                Top Universities in {country.name}
              </h2>
              <ul
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
                  gap: 12,
                  listStyle: "none",
                }}
              >
                {country.top_universities.map((uni) => (
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

        {/* ── Visa Requirements ── */}
        {country.visa_requirements && (
          <section style={{ maxWidth: 800, margin: "0 auto", padding: "60px 24px" }}>
            <h2 style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: 16 }}>
              Visa Requirements
            </h2>
            <p
              style={{
                fontSize: 17,
                color: "rgba(255,255,255,0.8)",
                lineHeight: 1.75,
              }}
            >
              {country.visa_requirements}
            </p>
            <Link
              href="/services/visa-immigration"
              style={{
                display: "inline-block",
                marginTop: 20,
                color: "#2EC4B6",
                fontWeight: 600,
                fontSize: 15,
              }}
            >
              Get help with your visa application →
            </Link>
          </section>
        )}

        {/* ── FAQ ── */}
        {country.faq && country.faq.length > 0 && (
          <section style={{ background: "#12121f", padding: "60px 24px" }}>
            <div style={{ maxWidth: 800, margin: "0 auto" }}>
              <h2 style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: 32 }}>
                Frequently Asked Questions
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {country.faq.map((item) => (
                  <div
                    key={item.question}
                    style={{
                      background: "#1a1a2e",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: 12,
                      padding: "24px",
                    }}
                  >
                    <h3
                      style={{
                        fontSize: 17,
                        fontWeight: 600,
                        marginBottom: 10,
                        color: "#fff",
                      }}
                    >
                      {item.question}
                    </h3>
                    <p
                      style={{
                        fontSize: 15,
                        color: "rgba(255,255,255,0.75)",
                        lineHeight: 1.7,
                      }}
                    >
                      {item.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── CTA ── */}
        <section
          style={{
            textAlign: "center",
            padding: "80px 24px",
            background:
              "linear-gradient(135deg, #0a0a1a 0%, #12121f 60%, #0a1a2e 100%)",
          }}
        >
          <h2 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: 16 }}>
            Ready to Study in {country.name}?
          </h2>
          <p
            style={{
              color: "rgba(255,255,255,0.7)",
              fontSize: 17,
              marginBottom: 32,
              maxWidth: 520,
              margin: "0 auto 32px",
            }}
          >
            Our AQF-certified consultants will guide you from shortlisting
            universities to submitting your visa — completely free.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              href="/book-a-consultation"
              style={{
                background: "#2EC4B6",
                color: "#0a0a1a",
                padding: "14px 32px",
                borderRadius: 8,
                fontWeight: 700,
                fontSize: 16,
              }}
            >
              Book Free Consultation
            </Link>
            <Link
              href="/find-a-course"
              style={{
                border: "1px solid rgba(255,255,255,0.2)",
                color: "#fff",
                padding: "14px 32px",
                borderRadius: 8,
                fontWeight: 600,
                fontSize: 16,
              }}
            >
              Browse Courses
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
