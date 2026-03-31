# Applyza — Claude Code Implementation Prompts

These prompts should be run in order. Each one is self-contained and ready to paste into Claude Code. Before starting, make sure Claude Code has access to all research documents in the project folder:

- `applyza-seo-audit.html`
- `applyza-sitemap.html`
- `applyza-content-strategy.html`
- `applyza-schema-guide.html`
- `applyza-psychology-cro.html`
- `.agents/product-marketing-context.md`

---

## PHASE 1 — Critical Bug Fix
*Run this first. It is live in production and affecting real users.*

---

### Prompt 1 — Fix WhatsApp Number Bug

```
There is a critical bug in the BookConsultation page. The WhatsApp number is currently set to a placeholder value (447000000000) and needs to be updated to the real business number.

File to fix: src/pages/BookConsultation.tsx (or wherever the WhatsApp link is constructed — search for "447000000000" or "wa.me" across the entire codebase to find all instances).

Task:
1. Search the entire codebase for "447000000000", "wa.me", and "whatsapp" (case-insensitive) to find every place this number appears.
2. Replace the placeholder number with the correct Applyza WhatsApp business number: [INSERT REAL NUMBER HERE].
3. Ensure the wa.me link format is correct: https://wa.me/[countrycode][number] with no spaces, dashes, or plus signs.
4. If there are multiple WhatsApp numbers for different offices (Lagos, Accra, Nairobi, Doha, Istanbul), flag these locations so the correct regional numbers can be assigned.
5. After fixing, confirm all WhatsApp links are functional in format.

Do not change anything else in this file. This is a targeted bug fix only.
```

---

## PHASE 2 — SEO Foundation
*These changes affect the entire site. Run them before building new pages.*

---

### Prompt 2 — Improve SEO.tsx Meta Tag Coverage

```
The SEO component at src/components/SEO.tsx is missing several important meta tags that affect search engine and social media performance. Please review the file and add the missing tags.

Current state: The component accepts title, description, path, ogImage, and jsonLd props. It outputs basic og:title, og:description, og:url, og:image, and twitter:card tags.

Missing tags to add:

1. robots meta tag — default to "index, follow" but accept an optional `robots` prop so individual pages can override (e.g. admin pages can pass "noindex, nofollow")
2. og:locale — hardcode as "en_GB" (the site targets UK university admissions)
3. og:type — default "website", accept optional `ogType` prop (blog posts will need "article")
4. og:image:width and og:image:height — accept optional `ogImageWidth` and `ogImageHeight` props, default to "1200" and "630"
5. og:site_name — hardcode as "Applyza"
6. twitter:site — hardcode as "@applyzahq"
7. twitter:creator — accept optional `twitterCreator` prop, default to "@applyzahq"
8. canonical link tag — use the same path logic already used for og:url, output as <link rel="canonical" href="..."> (only if not already present)

Implementation notes:
- Keep all existing props and behaviour intact
- Add new props with sensible defaults so no existing page breaks
- The base URL should already be defined in the component — use the same constant for canonical
- Use react-helmet-async (already installed) as the component currently does

After making changes, check that the homepage (src/pages/Index.tsx) and at least two other pages still compile without errors.
```

---

### Prompt 3 — Fix Homepage Organization Schema

```
The Organization schema on the homepage (src/pages/Index.tsx) has incorrect social media URLs in the sameAs array. The social handles are @applyzahq but some URLs point to /applyza instead of /applyzahq.

Task:
1. Find the Organization JSON-LD schema in src/pages/Index.tsx (passed via the jsonLd prop on the SEO component).
2. Update all sameAs URLs to use the correct handle @applyzahq:
   - Facebook: https://www.facebook.com/applyzahq
   - Twitter/X: https://twitter.com/applyzahq
   - Instagram: https://www.instagram.com/applyzahq
   - LinkedIn: https://www.linkedin.com/company/applyzahq
   - TikTok: https://www.tiktok.com/@applyzahq
   - YouTube: https://www.youtube.com/@applyzahq
3. Ensure the Organization schema also includes:
   - "foundingDate": "2014"
   - "numberOfEmployees": not required — omit if not already present
   - "areaServed": ["Nigeria", "Ghana", "Kenya", "Egypt", "Morocco", "UAE", "Kuwait", "Turkey", "Eastern Europe"]
   - "slogan": "The Smartest Way to Study Abroad"
4. Do not change any other part of Index.tsx.
```

---

## PHASE 3 — Schema Markup Implementation
*Add structured data to key pages. Each prompt covers one schema type.*

---

### Prompt 4 — Add BreadcrumbList Schema to All Inner Pages

```
Please add BreadcrumbList JSON-LD schema to all inner pages of the site. The SEO component (src/components/SEO.tsx) already accepts a jsonLd prop that can take an array of schema objects — use this.

Pages to update and their breadcrumb paths:

- src/pages/About.tsx → Home > About Us
- src/pages/Services.tsx → Home > Our Services
- src/pages/VisaImmigration.tsx → Home > Our Services > Visa Support
- src/pages/UniversityApplications.tsx → Home > Our Services > University Applications
- src/pages/StudentCounselling.tsx → Home > Our Services > Student Counselling
- src/pages/Accommodation.tsx → Home > Our Services > Accommodation Support
- src/pages/Events.tsx → Home > Events
- src/pages/FAQ.tsx → Home > FAQ
- src/pages/ForInstitutions.tsx → Home > For Universities
- src/pages/ForPartners.tsx → Home > For Partners
- src/pages/Courses.tsx (if it exists) → Home > Find a Course
- src/pages/Blog.tsx (if it exists) → Home > Blog
- src/pages/BookConsultation.tsx → Home > Book a Free Consultation

BreadcrumbList schema format for each page:
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://applyza.com" },
    { "@type": "ListItem", "position": 2, "name": "[Section Name]", "item": "https://applyza.com/[path]" },
    // add position 3 for sub-pages (e.g. service sub-pages)
  ]
}

Implementation notes:
- If a page already passes a single schema object to jsonLd, change it to an array containing both the existing schema AND the new BreadcrumbList: jsonLd={[existingSchema, breadcrumbSchema]}
- If jsonLd is not currently set on a page, add it with just the BreadcrumbList
- Use the actual URL paths from src/App.tsx to ensure accuracy
- Do not change any page content or copy — only the SEO component's jsonLd prop
```

---

### Prompt 5 — Add Service Schema to Service Pages

```
Please add Service JSON-LD schema to Applyza's four service pages. This tells Google what services are being offered and improves rich result eligibility.

Pages to update:
- src/pages/VisaImmigration.tsx
- src/pages/UniversityApplications.tsx
- src/pages/StudentCounselling.tsx
- src/pages/Accommodation.tsx

Service schema template (customise name/description/url per page):
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "[Service Name]",
  "description": "[Service description — use the existing meta description from the page's SEO component]",
  "provider": {
    "@type": "Organization",
    "name": "Applyza",
    "url": "https://applyza.com"
  },
  "areaServed": "Worldwide",
  "audience": {
    "@type": "Audience",
    "audienceType": "International Students"
  },
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "GBP",
    "description": "Completely free for students"
  },
  "url": "https://applyza.com/[page-path]"
}

Values per page:
- VisaImmigration: name="Student Visa Support", url="/visa-immigration"
- UniversityApplications: name="University Application Support", url="/university-applications"
- StudentCounselling: name="International Student Counselling", url="/student-counselling"
- Accommodation: name="Student Accommodation Support", url="/accommodation"

Each page already has a BreadcrumbList from the previous step — make the jsonLd prop an array: [breadcrumbSchema, serviceSchema]
```

---

### Prompt 6 — Add FAQPage Schema to FAQ Page and Service Pages

```
Please add FAQPage JSON-LD schema to the following pages. Use the actual FAQ content visible on each page — do not invent questions.

Pages to update:

1. src/pages/FAQ.tsx
   - Extract all existing question/answer pairs from the page's JSX and add them as FAQPage schema
   - This page likely already has FAQPage schema — if so, verify it matches the current content and update if needed

2. src/pages/VisaImmigration.tsx — add these FAQ items:
   - Q: "How long does a UK student visa take?" A: Use whatever answer is on the page, or: "UK student visa processing typically takes 3–4 weeks. We guide you through every step to ensure your application is complete and submitted on time."
   - Q: "What is Applyza's visa success rate?" A: "Applyza has a 99% visa success rate. Our counsellors review every application before submission to ensure it meets all Home Office requirements."
   - Q: "Is visa support free with Applyza?" A: "Yes. Visa support is completely free for all students — there are no fees at any stage."

3. src/pages/UniversityApplications.tsx — add these FAQ items:
   - Q: "How do I apply to a UK university as an international student?" A: Use existing page content or: "Applyza guides you through every stage: choosing eligible courses, preparing your personal statement, submitting your UCAS or direct application, and responding to offers."
   - Q: "Is university application help free?" A: "Yes. Applyza's application support is completely free for students."

FAQPage schema format:
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "[Question text]",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "[Answer text]"
      }
    }
  ]
}

Add to jsonLd array alongside existing BreadcrumbList and Service schemas.
```

---

### Prompt 7 — Add BlogPosting Schema to Blog Post Pages

```
Please add dynamic BlogPosting JSON-LD schema to the individual blog post page component.

First, find the blog post detail page — it's likely at src/pages/BlogPost.tsx or a similar path. Check src/App.tsx for the route pattern (something like /blog/:slug).

The page fetches post data from Supabase using TanStack Query. The blog_posts table has these fields (from the TypeScript types): id, title, slug, content, excerpt, author, published_at, updated_at, status, featured_image, category, tags.

Add the following schema using the live post data (not hardcoded values):

{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": post.title,
  "description": post.excerpt,
  "image": post.featured_image || "https://applyza.com/og-default.jpg",
  "datePublished": post.published_at,
  "dateModified": post.updated_at || post.published_at,
  "author": {
    "@type": "Person",
    "name": post.author || "Applyza Team"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Applyza",
    "logo": {
      "@type": "ImageObject",
      "url": "https://applyza.com/logo.png"
    }
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": `https://applyza.com/blog/${post.slug}`
  }
}

Notes:
- Pass this as jsonLd to the SEO component alongside a BreadcrumbList (Home > Blog > [Post Title])
- The schema should only render after the post data has loaded (guard with a conditional)
- If the blog post page doesn't exist yet or posts aren't implemented, note this and skip
```

---

## PHASE 4 — Trust & CRO Improvements
*Homepage and key conversion points.*

---

### Prompt 8 — Add "Why Is It Free?" Section to Homepage

```
Please add a "Why is it free?" trust section to the homepage (src/pages/Index.tsx).

Context: Applyza's service is completely free for students. Research shows this is the #1 objection and trust concern — students from Nigeria, Ghana, Kenya, UAE and other source markets are suspicious because free sounds too good to be true, and scam agencies are common. A brief, honest explanation near the hero significantly improves trust and conversion.

Where to place it: After the hero section and before the first features/services section. If there is a TrustStats bar (showing "3,000+ students placed", "99% visa success" etc.), place this new section immediately after it.

Section design requirements:
- Use existing shadcn/ui components and Tailwind classes consistent with the rest of the site
- Should feel calm and confident — not defensive
- Mobile responsive

Section content (use exactly this copy, adjust formatting as needed):

Headline: "Why Is Applyza Free?"

Body: Our service is free for students because we earn placement commissions from our partner universities when you successfully enrol — the same model used by all AQF-regulated education agents worldwide. Our guidance, your application, your visa support: none of it costs you anything. You will still need to fund your own tuition fees and living expenses, as you would with any route to studying abroad. But our expertise? That's on us.

Three supporting points (display as small cards or icon + text):
1. Icon: 🏛️ | Heading: "AQF Certified" | Text: "Regulated by the UK Agent Quality Framework — the government's quality standard for education agents."
2. Icon: 🎓 | Heading: "University-Funded" | Text: "Partner universities pay us a commission when you enrol. Your success is literally our business model."
3. Icon: ✅ | Heading: "No Hidden Fees" | Text: "No application fees, no consultation charges, no 'premium tier'. Free means free."

Optional CTA below: "Still have questions? Read our full FAQ →" linking to /faq#free-service
```

---

### Prompt 9 — Add AQF Trust Badge Component

```
Please create a reusable AQF certification badge component and add it to the site's key trust touchpoints.

Create file: src/components/AQFBadge.tsx

The badge should:
- Display "AQF Certified Agent" text
- Show a small shield or certificate icon (use a Lucide icon — Shield, Award, or BadgeCheck are good options)
- Link to the official UK government AQF page: https://www.gov.uk/government/publications/aqf-registered-agents (opens in new tab with rel="noopener noreferrer")
- Have a tooltip or small subtitle: "UK Agent Quality Framework — Government Regulated"
- Be available in two sizes: "sm" (for navbar/footer) and "md" (for hero/trust sections)
- Use the existing site's colour scheme (check tailwind.config.ts for brand colours)

Add the AQFBadge component in these locations:
1. src/components/Hero.tsx — below the subtitle text, before the CTA buttons (size="md")
2. src/components/Footer.tsx — in the trust/credentials section if one exists, otherwise near the copyright line (size="sm")
3. src/pages/About.tsx — in the stats/credentials row (size="md")

The badge must be accessible: include aria-label="Applyza is AQF Certified — click to verify on the UK Government website" on the link element.
```

---

## PHASE 5 — Authority & Trust Pages
*Build these after the SEO foundation (Phase 2–3) is in place. These pages capture comparison-intent search traffic and position Applyza as the trusted authority — without naming or linking to competitors.*

> **Note on approach:** Rather than building competitor comparison pages that name specific brands, Applyza will own the *category conversation* — publishing authoritative guides on how to choose a consultancy, what questions to ask, and what standards to look for. This positions Applyza as the confident market leader, avoids reputational and legal risk, and naturally surfaces every Applyza advantage (AQF certification, 99% visa success, free service, AI matching, local offices) without appearing defensive. It also captures the same comparison-intent search queries through category-level keywords rather than brand-level keywords.

---

### Prompt 10 — Create "How to Choose a Study Abroad Consultancy" Guide Page

```
Please create a new authoritative guide page for Applyza.

File to create: src/pages/HowToChooseConsultancy.tsx
Route to add in src/App.tsx: /how-to-choose-a-study-abroad-consultancy

This page serves two purposes: (1) it ranks for comparison-intent searches from students researching their options, and (2) it positions Applyza as the knowledgeable, trustworthy authority in the market. It does NOT name or link to any specific competitors.

SEO component:
- title: "How to Choose a Study Abroad Consultancy — What to Look For"
- description: "Not all study abroad consultancies are equal. Here's exactly what to check before you trust anyone with your university application and visa — from an AQF Certified expert."
- jsonLd: [BreadcrumbList (Home > Study Abroad Advice > How to Choose a Consultancy), FAQPage]

H1: "How to Choose a Study Abroad Consultancy: 7 Questions to Ask Before You Commit"

Page structure and content:

**Intro paragraph:**
Choosing the right study abroad consultancy is one of the most important decisions you'll make on your journey to university. The wrong choice can mean a delayed application, a visa refusal, or — in the worst cases — money lost to an unregulated agent. The right choice means expert guidance, a successful application, and a visa approval. Here is exactly what to look for.

**7 Questions section** (use numbered cards or accordion):
1. Are they AQF Certified or regulated by a recognised quality framework?
   Answer: The UK Agent Quality Framework (AQF) is the government-recognised standard for education agents. AQF-certified agents must meet strict ethical and quality requirements. Always ask to see proof of certification and verify it independently. Applyza is AQF Certified.

2. Is the service genuinely free — and if so, how do they earn?
   Answer: Regulated education agents earn placement commissions from universities when students successfully enrol. This means their guidance should be free for you. If a consultancy charges you fees on top of receiving university commissions, ask why. Applyza's service is completely free for students at every stage.

3. What is their visa success rate — and will they tell you?
   Answer: Any consultancy serious about its work should be able to tell you its visa success rate. If they cannot or will not, that tells you something. Applyza publishes its 99% visa success rate because we believe you have the right to this information before you commit.

4. Do they have a physical office you can visit?
   Answer: Local offices matter — especially for students in Nigeria, Ghana, Kenya, Egypt, UAE, Kuwait, Türkiye, and Eastern Europe. A physical presence means accountability, face-to-face meetings, and a local team who understands your market. Applyza has offices in Lagos, Accra, Nairobi, Doha, and Istanbul.

5. Do they use technology to match you to courses you're actually eligible for?
   Answer: Many consultancies operate like a travel agent — they show you a catalogue and let you choose. A better approach uses AI-powered eligibility matching: you input your academic background and the system surfaces only the programmes you genuinely qualify for. This saves time and dramatically improves your chances of acceptance.

6. Will they support you through the visa process — not just the application?
   Answer: Getting into a university is only half the journey. The visa application is where many students encounter problems. Ask specifically whether visa guidance is included, what their process is, and who handles your visa documentation.

7. Are their counsellors named, qualified, and contactable?
   Answer: You should be able to find out who will be advising you before you commit. Named, qualified counsellors with published backgrounds are a sign of a transparent, accountable organisation. Be cautious of consultancies where "the team" is entirely anonymous.

**Standards checklist section:**
Headline: "What a Trustworthy Consultancy Looks Like — At a Glance"
Display as a visual checklist (green ticks):
- ✅ AQF Certified or equivalent regulated status
- ✅ Service is free for students (no consultancy or application fees)
- ✅ Published visa success rate
- ✅ Physical office in or near your home country
- ✅ AI-powered or eligibility-based course matching
- ✅ Named, qualified counsellors
- ✅ End-to-end support: applications, visas, and accommodation

**Why Applyza section:**
Headline: "How Applyza Measures Up"
Short paragraph confirming Applyza meets every standard above, with proof points. Link to /about and /book-a-consultation.

**FAQ Schema questions:**
- "How do I know if a study abroad consultancy is legitimate?"
- "Should I pay a study abroad consultancy?"
- "What is AQF certification?"
- "What visa success rate should I expect from a good consultancy?"

**CTA:**
"Ready to speak with an AQF Certified consultant? Book a free consultation — no fees, no commitment."
→ /book-a-consultation

Use existing shadcn/ui components and Tailwind. Do not introduce new dependencies.
```

---

### Prompt 11 — Create "Free vs Paid Study Abroad Consultancies" Page

```
Please create an informational guide page for Applyza.

File to create: src/pages/FreeVsPaidConsultancies.tsx
Route to add in src/App.tsx: /free-vs-paid-study-abroad-consultancies

This page targets students who have encountered paid consultancy services and are questioning whether they need to pay. It does NOT name any specific competitors — it addresses the category-level question honestly.

SEO component:
- title: "Free vs Paid Study Abroad Consultancies — Do You Need to Pay?"
- description: "Some study abroad consultancies charge hundreds of pounds. Others are completely free. Here's why — and what it means for you as a student."
- jsonLd: [BreadcrumbList (Home > Study Abroad Advice > Free vs Paid Consultancies), FAQPage]

H1: "Free vs Paid Study Abroad Consultancies: Do You Need to Pay for Expert Guidance?"

Page structure and content:

**Intro:**
If you've been researching study abroad consultancies, you've probably noticed that some charge fees and others don't. The difference can be significant — hundreds of pounds in some cases. Before you pay anything, it's worth understanding how the industry works and what you're actually entitled to expect for free.

**Section 1: How education consultancies earn money**
Regulated education agents earn placement commissions from universities when a student successfully enrols. This commission model is the global standard — it means universities fund the cost of finding and supporting students, not the students themselves. Under this model, there is no reason for a student to pay consultancy fees. The consultancy is already being compensated by the university.

**Section 2: Why some consultancies still charge fees**
Some consultancies charge students on top of receiving university commissions. They may argue their fees reflect a premium service level. In some cases this may be true. But it is worth asking: if the commission model already funds the service, what exactly are the fees for? And does paying upfront change the consultancy's incentives in any way?

**Section 3: What "free" should actually include**
A genuinely free consultancy service should cover: initial consultation and eligibility assessment, AI-powered course matching, personal statement guidance, full application preparation and submission, university offer management, visa application support and documentation, and accommodation guidance. If any of these are behind a paid tier, they are not a free service.

**Section 4: What to watch out for**
The risk of "free" services from unregulated agents is real — particularly in markets like Nigeria, Ghana, Kenya, and Egypt where unregistered agents operate without quality standards. The answer is not to pay fees; it is to verify certification. AQF-certified agents (regulated by the UK government's Agent Quality Framework) are free for students AND held to strict quality and ethical standards.

**Checklist: Signs you're getting genuine free service:**
- ✅ No invoice at any stage — not for consultation, applications, or visas
- ✅ AQF or equivalent certification you can verify independently
- ✅ Named counsellors with contactable details
- ✅ Published visa success rate
- ✅ Physical office presence in your region

**CTA:**
"Applyza is AQF Certified and completely free for students at every stage. Book a consultation and see the difference."
→ /book-a-consultation

FAQ Schema questions:
- "Do study abroad consultancies charge fees?"
- "Why is Applyza free?"
- "Is it safe to use a free study abroad consultancy?"
- "What is the difference between a free and paid study abroad consultancy?"

Use existing shadcn/ui components and Tailwind.
```

---

### Prompt 12 — Create "What is AQF Certification?" Explainer Page

```
Please create a short but authoritative explainer page about AQF certification.

File to create: src/pages/AQFCertification.tsx
Route to add in src/App.tsx: /aqf-certified-education-agent

This page targets students and parents who encounter the term "AQF Certified" and want to understand what it means. It establishes Applyza's legitimacy through the certification and earns E-E-A-T signals by being a genuinely useful reference.

SEO component:
- title: "What Is AQF Certification? Why It Matters for International Students"
- description: "AQF stands for UK Agent Quality Framework — the government's official quality standard for education agents. Here's what it means and why it matters when choosing a consultancy."
- jsonLd: [BreadcrumbList (Home > Study Abroad Advice > AQF Certification), FAQPage]

H1: "What Is AQF Certification — and Why Should International Students Care?"

Page structure:

**What is the AQF?**
The UK Agent Quality Framework (AQF) is an initiative led by the UK government and the international education sector to improve the quality and ethical standards of education agents working in the UK student recruitment market. AQF-certified agents must demonstrate compliance with a rigorous set of criteria covering student welfare, ethical practice, staff training, and transparent operating standards.

**Why it matters to you as a student**
When you work with an AQF-certified agent, you have a government-backed guarantee that the organisation you're trusting has met an independently assessed quality standard. This matters particularly in markets where unregulated agents are common — because AQF certification is not self-declared. It is verified.

**What AQF agents commit to:**
- Honest, accurate information about courses, universities, and visa requirements
- No undisclosed financial incentives that could influence recommendations
- Trained staff who understand UK immigration rules
- Clear processes for handling complaints
- Student welfare as a primary consideration

**How to verify AQF certification:**
Any AQF-certified agent should be able to provide you with their registration details. You can also verify agents directly on the UK government's published AQF register. [Add link: https://www.gov.uk/government/publications/aqf-registered-agents]

**Applyza and AQF:**
Applyza is AQF Certified. You can verify our registration through the official UK government AQF register. Our certification means you are protected by the standards above from the moment you first speak with us — at no cost to you.

**CTA:**
"Speak with an AQF Certified counsellor — free."
→ /book-a-consultation

FAQ Schema:
- "What does AQF certified mean?"
- "How do I check if an education agent is AQF certified?"
- "Is AQF certification a government standard?"
- "Does AQF certification mean the service is free?"

Use existing shadcn/ui components and Tailwind.
```

---

### Prompt 13 — Add "Study Abroad Advice" Section to Navigation and Link Trust Pages

```
The three new informational pages created in Prompts 10, 11, and 12 need to be surfaced in the site navigation and internally linked to drive SEO value.

Files to update: src/components/Navbar.tsx, src/components/Footer.tsx, and relevant existing pages.

Task 1 — Navigation:
Check if the Navbar already has a dropdown menu pattern. If yes, add a "Study Abroad Advice" or "Useful Guides" dropdown containing:
- "How to Choose a Consultancy" → /how-to-choose-a-study-abroad-consultancy
- "Free vs Paid Consultancies" → /free-vs-paid-study-abroad-consultancies
- "What Is AQF Certification?" → /aqf-certified-education-agent

If the Navbar doesn't have dropdowns, add these three links to the Footer instead, under a new "Guides & Advice" section.

Task 2 — Internal links from existing pages:
Add the following contextual links in existing pages (do not change any other copy — only add the linked text where it fits naturally):

- src/pages/About.tsx: In the AQF certification mention, add a link to /aqf-certified-education-agent with text "Learn what AQF certification means →"
- src/pages/FAQ.tsx: In the answer to "Why is it free?", add a link to /free-vs-paid-study-abroad-consultancies with text "Read: Free vs paid study abroad consultancies →"
- src/pages/Services.tsx: After the services overview intro, add a subtle text link: "Not sure what to look for in a consultancy? Read our guide →" linking to /how-to-choose-a-study-abroad-consultancy
- src/pages/Index.tsx (homepage): In the "Why is it free?" section added in Prompt 8, add a link to /free-vs-paid-study-abroad-consultancies

Task 3 — Cross-linking between the three new pages:
At the bottom of each new page, add a "Related Guides" section linking to the other two guides. Use a simple card or text list — keep it minimal.

Do not change any page content or copy beyond what is specified above.
```

---

## PHASE 6 — Blog Content Publishing
*Write and seed the priority blog posts into Supabase. Run after Phase 2–3 so the BlogPosting schema is already in place.*

---

### Prompt 15 — Write and Publish Quick-Win Blog Posts

```
Your task is to write and seed 9 priority blog posts into the Applyza Supabase database. These are the "quick-win" posts from the content strategy (applyza-content-strategy.html) — the highest-traffic, highest-intent articles for Applyza's core source markets.

Work through this in four stages:

---

STAGE 1 — UNDERSTAND THE CONTENT FORMAT
Before writing anything, do the following:
1. Open src/pages/BlogPost.tsx (or whichever file renders individual blog posts — check src/App.tsx for the route). Look at how the `content` field from the database is rendered: is it used inside dangerouslySetInnerHTML (HTML), a markdown renderer, or plain text? This determines what format to write in.
2. Check src/integrations/supabase/types.ts for the exact blog_posts table schema — confirm field names (title, slug, content, excerpt, author, published_at, status, category, tags, featured_image).
3. If any blog posts already exist in the database, fetch one via the Supabase client to inspect the content format used in practice.

---

STAGE 2 — WRITE ALL 9 POSTS
Write full content for each post listed below. Each post must be:
- 1,500–2,200 words of genuine, useful content (not padded filler)
- Written in the format confirmed in Stage 1 (HTML or markdown)
- SEO-optimised: the primary keyword appears in the first 100 words, H2/H3 subheadings are keyword-rich, and the content directly answers the search intent
- Honest and accurate — no invented statistics; use only facts established in the product marketing context (.agents/product-marketing-context.md)
- Branded to Applyza's voice: warm, confident, expert, never pushy
- Ends with a CTA paragraph linking to /book-a-consultation

Write each post to a temporary file at /tmp/posts/post-[n].json in this exact structure:
{
  "title": "...",
  "slug": "...",
  "excerpt": "...(150–160 chars, reads as a compelling meta description)...",
  "content": "...(full HTML or markdown content)...",
  "author": "Applyza Team",
  "category": "...",
  "tags": ["tag1", "tag2", "tag3"],
  "status": "draft",
  "published_at": null
}

THE 9 POSTS TO WRITE:

Post 1
- Title: How to Study in the UK from Nigeria — Complete 2026 Guide
- Slug: how-to-study-in-uk-from-nigeria
- Primary keyword: study in UK from Nigeria
- Category: Source Market Guides
- Tags: Nigeria, UK universities, student visa, study abroad
- Content outline: Introduction (validate the dream); Step 1 — choosing your course and university (mention AI matching, eligibility); Step 2 — meeting entry requirements (A-levels/WAEC/NECO equivalencies for UK unis); Step 3 — applying (UCAS vs direct, personal statement); Step 4 — UK Student Visa from Nigeria (documents, timeline, common refusal reasons to avoid); Step 5 — preparing to arrive (accommodation, finances, what to bring); How Applyza helps Nigerian students specifically; FAQ section (5 questions); CTA

Post 2
- Title: UK Student Visa for Nigerian Students — Requirements, Process & Success Tips
- Slug: uk-student-visa-nigeria
- Primary keyword: UK student visa Nigeria
- Category: Visas & Immigration
- Tags: Nigeria, UK student visa, visa requirements, CAS
- Content outline: Who needs a UK student visa; Documents required (CAS, financial evidence, English language, TB test, biometrics); How much money you need to show in your bank account; The online application process step by step; Common reasons Nigerian students are refused (and how to avoid them); How long it takes; Applyza's 99% visa success rate — what we do differently; FAQ; CTA

Post 3
- Title: How to Study in the UK from Ghana — Your Complete Step-by-Step Guide
- Slug: how-to-study-in-uk-from-ghana
- Primary keyword: study in UK from Ghana
- Category: Source Market Guides
- Tags: Ghana, UK universities, student visa, study abroad
- Content outline: Mirror structure of Post 1, adapted specifically for Ghana (WAEC equivalencies, Ghana High Commission visa process specifics, Accra office mention, prominent Ghanaian student success context)

Post 4
- Title: How to Study Abroad from Kenya — UK and European Universities
- Slug: how-to-study-abroad-from-kenya
- Primary keyword: study abroad from Kenya
- Category: Source Market Guides
- Tags: Kenya, UK universities, Europe, study abroad, Nairobi
- Content outline: Introduction; Why UK and European universities for Kenyan students; Entry requirements (KCSE equivalencies); Application process; Kenyan student visa specifics; Cost of studying in the UK vs Europe comparison; Nairobi office mention; FAQ; CTA

Post 5
- Title: How Much Does It Cost to Study in the UK as an International Student?
- Slug: cost-of-studying-in-uk-international-students
- Primary keyword: cost of studying in UK international students
- Category: Student Life Abroad
- Tags: UK tuition fees, cost of living, international student finances, scholarships
- Content outline: Introduction (the honest answer — it depends); Tuition fees by degree level and university type (ranges, not exact fees — use publicly known ranges like £10,000–£26,000/year); Living costs by city (London vs other cities); Total annual budget example for a Nigerian/Ghanaian/Kenyan student; Scholarships that can reduce costs (Chevening, Commonwealth, university scholarships); How to plan financially; What Applyza's free service saves you vs paid consultants; FAQ; CTA

Post 6
- Title: UCAS Personal Statement Guide for International Students — 2026
- Slug: ucas-personal-statement-guide-international-students
- Primary keyword: UCAS personal statement international students
- Category: University Applications
- Tags: personal statement, UCAS, university application, international students
- Content outline: What is a personal statement and why it matters; The UCAS word/character limit; Structure: opening, academic interest, relevant experience, skills, why this course; Common mistakes international students make; What admissions tutors actually look for; How to write authentically about your background and ambitions; The role of Applyza counsellors in personal statement preparation; Example paragraph frameworks (not example text — frameworks); FAQ; CTA

Post 7
- Title: UK vs Germany for International Students — Which Should You Choose?
- Slug: uk-vs-germany-international-students
- Primary keyword: UK vs Germany international students
- Category: Study Destinations
- Tags: UK universities, Germany, study abroad comparison, tuition fees, post-study work visa
- Content outline: Introduction (both are excellent choices — this guide helps you decide); Tuition fees comparison; Language of instruction; Quality of universities; Post-study work visa rights (UK Graduate Route vs Germany's 18-month job-seeker); Cost of living; Which source markets find Germany a stronger fit; Which source markets find UK a stronger fit; Applyza's portfolio covers both; FAQ; CTA

Post 8
- Title: Top Scholarships for African Students at UK Universities — 2026 Guide
- Slug: scholarships-for-african-students-uk-universities
- Primary keyword: scholarships for African students UK universities
- Category: University Applications
- Tags: scholarships, Africa, UK universities, Chevening, Commonwealth, funding
- Content outline: Introduction (scholarships exist — here's where to find them); Chevening Scholarships (who qualifies from Africa, application timeline); Commonwealth Scholarship; University-specific scholarships (refer to "many UK universities offer scholarships" without naming specific amounts); Country-specific scholarships (Nigerian, Ghanaian, Kenyan government funding programmes where applicable); Tips for a strong scholarship application; How Applyza helps with scholarship applications; FAQ; CTA

Post 9
- Title: Student Accommodation in the UK — What International Students Need to Know
- Slug: student-accommodation-uk-international-students
- Primary keyword: student accommodation UK international students
- Category: Student Life Abroad
- Tags: student accommodation, UK, university halls, private housing, international students
- Content outline: Introduction; University halls of residence (pros, cons, how to apply, deadlines); Private student accommodation (how to search, what to expect); What to look for in a contract; Average costs by city; Tips for students from Nigeria, Ghana, Kenya, UAE arriving for the first time; How Applyza's accommodation support works; FAQ; CTA

---

STAGE 3 — SEED INTO SUPABASE
After all 9 JSON files are written:
1. Read the Supabase URL and key from the .env file (VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY).
2. Write a Node.js seed script at /tmp/seed-blog-posts.mjs that:
   - Imports @supabase/supabase-js (check if it's in node_modules, install if not)
   - Reads all 9 /tmp/posts/post-[n].json files
   - Checks if a post with that slug already exists (to avoid duplicates)
   - Inserts each post with status: "draft" and published_at: null
   - Logs success/failure for each post
3. Run the script with: node /tmp/seed-blog-posts.mjs
4. Report which posts were inserted successfully and which (if any) already existed or failed.

---

STAGE 4 — VERIFY
After seeding:
1. Run a quick query against the Supabase database to confirm all 9 posts are present with status "draft".
2. List the slug and title of each confirmed post.
3. Note: Posts are seeded as drafts. To publish them, the marketing manager should log into the Applyza admin panel at /admin/blog, review each post, and change status to "published".

Do not publish any post automatically — leave all as status: "draft" for review.
```

---

## PHASE 7 — SSR / Pre-rendering Migration
*This is the largest architectural change. Run this last, in a separate branch.*

---

### Prompt 16 — Evaluate and Plan SSR Migration

```
The Applyza site is currently a React SPA (Client-Side Rendered) built with Vite. This is the #1 SEO technical risk: programmatic pages — destination pages (/study-in/[country]), source market pages (/study-abroad/[country]), course category pages (/courses/[subject]), and competitor pages (/vs/[competitor]) — will not be reliably indexed by Googlebot without server-side rendering or static pre-rendering.

Please evaluate the codebase and produce a migration plan with the following information:

1. Current setup: Confirm the build tool (Vite), router (React Router), and any existing SSR configuration.

2. Recommended approach: Assess the two main options:
   a. Vite SSR (vite-plugin-ssr or vike) — stays within current stack
   b. Migration to Next.js — industry standard, better long-term SEO support

   Recommend one option based on codebase complexity, existing dependencies, and Supabase integration patterns.

3. Complexity estimate: How many files would need to change? What are the highest-risk parts of the migration (auth context, TanStack Query setup, Supabase client)?

4. Phased plan: Propose a phased approach where static/pre-rendered pages can be added incrementally without rewriting the whole app at once.

5. Quick win alternative: If a full SSR migration is too large to do immediately, assess whether a static pre-render approach (e.g. using @prerenderer/plugin-vite or similar) could provide 80% of the SEO benefit for 20% of the effort — as a bridge solution.

Do not make any code changes in this step. Produce a written assessment and recommendation only.
```

---

## Prompt Reference Summary

| # | What it does | Phase | Risk |
|---|---|---|---|
| 1 | Fix WhatsApp placeholder bug | Critical Bug | None |
| 2 | Add missing meta tags to SEO.tsx | SEO Foundation | Low |
| 3 | Fix Organization schema handles | SEO Foundation | Low |
| 4 | Add BreadcrumbList to all inner pages | Schema | Low |
| 5 | Add Service schema to service pages | Schema | Low |
| 6 | Add FAQPage schema to FAQ + service pages | Schema | Low |
| 7 | Add BlogPosting schema to blog posts | Schema | Low |
| 8 | Add "Why is it free?" section to homepage | Trust/CRO | Low |
| 9 | Create AQF Trust Badge component | Trust/CRO | Low |
| 10 | Build "How to Choose a Consultancy" guide page | Authority Pages | Medium |
| 11 | Build "Free vs Paid Consultancies" guide page | Authority Pages | Medium |
| 12 | Build "What is AQF Certification?" explainer page | Authority Pages | Medium |
| 13 | Add guide pages to nav + internal linking | Navigation | Low |
| 14 | Evaluate SSR migration options | Architecture | High |
| 15 | Write and seed 9 quick-win blog posts to Supabase | Blog Content | Medium |
| 16 | Evaluate SSR migration options | Architecture | High |
| 17 | Remove all AQF references + fix UK-only positioning | Compliance/Brand | Medium |
| 18 | Remove WhyFree section + tone down commission language | Brand/Copy | Low |

## Prompt 17 — Remove All AQF References & Fix UK-Only Positioning

```
We need to make two categories of changes across the entire codebase. Please make every change listed below precisely — do not skip any file, and do not add any new AQF references.

---

### BACKGROUND

**Why remove AQF:** We are not permitted to display AQF (UK Agent Quality Framework) certification on the website. Every reference to AQF, the UK Agent Quality Framework, and related certification claims must be removed.

**Why fix UK-only positioning:** Applyza places students in universities across multiple countries (UK, Germany, France, Ireland, Malta, Netherlands, Canada, USA, and more). Some copy incorrectly implies we are a UK-only agency. Any copy that presents us as UK-exclusive must be made destination-neutral or multi-destination.

**What to KEEP:** "UK" as a listed destination in dropdowns, filters, scholarship listings, and PartnerUniversities data is fine — the UK is a legitimate destination. "UKVI" references in legal compliance disclaimers (VisaImmigration.tsx, TermsConditions.tsx) are legally required and must stay. "UK GDPR" in PrivacyPolicy.tsx is legally required and must stay.

---

### PART 1 — DELETE THESE FILES ENTIRELY

**1a. Delete `src/components/AQFBadge.tsx`**
This component exists solely to display the AQF badge. It must be deleted.

**1b. Delete `src/pages/AQFCertification.tsx`**
This entire page is about AQF certification. Delete it.

After deleting both files, open `src/App.tsx` and:
- Remove the import line: `import AQFCertification from "./pages/AQFCertification.tsx";`
- Replace the route `<Route path="/aqf-certified-education-agent" element={<P><AQFCertification /></P>} />` with a redirect: `<Route path="/aqf-certified-education-agent" element={<Navigate to="/how-to-choose-a-study-abroad-consultancy" replace />} />`
- Make sure `Navigate` is imported from `react-router-dom` — check the existing imports in App.tsx; if it's not there, add it to the existing react-router-dom import line.

---

### PART 2 — EDIT THESE FILES (exact changes listed per file)

---

**2a. `src/components/GenuineStudentBanner.tsx`**

Find:
```
Applyza is committed to supporting genuine students with legitimate educational intent. We do not facilitate immigration without genuine educational purpose. We comply with the UK Agent Quality Framework (AQF) and work only with accredited educational institutions.
```

Replace with:
```
Applyza is committed to supporting genuine students with legitimate educational intent. We do not facilitate immigration without genuine educational purpose. We work only with accredited educational institutions and certified education professionals.
```

---

**2b. `src/components/Hero.tsx`**

Step 1 — Remove the AQFBadge import:
Find: `import AQFBadge from "@/components/AQFBadge";`
Delete this line entirely.

Step 2 — Remove "AQF Certified Agent" from the trust badges array. The array currently contains:
```
"AQF Certified Agent",
```
Delete just this item from the array (keep the other trust badge strings).

Step 3 — Remove the AQFBadge JSX block. Find the comment and component:
```
{/* AQF Badge */}
```
and the `<AQFBadge size="md" />` line. Delete both the comment and the component.

---

**2c. `src/components/WhyFree.tsx`**

Find the first card object:
```
heading: "AQF Certified",
```
```
text: "Regulated by the UK Agent Quality Framework — the government's quality standard for education agents.",
```

Replace the heading with:
```
heading: "Professionally Certified",
```

Replace the text with:
```
text: "Our counsellors hold professional certifications in international student advising and adhere to the National Code of Ethical Practice for Education Agents.",
```

Also find this sentence in the body copy:
```
model used by all AQF-regulated education agents worldwide. Our
```
Replace with:
```
model used by internationally certified education agents worldwide. Our
```

---

**2d. `src/components/Footer.tsx`**

Step 1 — Remove the AQFBadge import:
Find: `import AQFBadge from "@/components/AQFBadge";`
Delete this line entirely.

Step 2 — Remove the AQFBadge component from the footer JSX:
Find: `<AQFBadge size="sm" />`
Delete this line entirely.

Step 3 — Remove the "What Is AQF Certification?" link:
Find:
```
<Link to="/aqf-certified-education-agent" className="text-primary-foreground/50 hover:text-primary-foreground text-sm transition-colors">
                  What Is AQF Certification?
                </Link>
```
Delete these 3 lines entirely.

---

**2e. `src/components/UpcomingEvents.tsx`**

Find:
```
"Meet top UK university representatives, attend expert panels on study abroad options, and get one-on-one guidance from our counsellors."
```

Replace with:
```
"Meet university representatives from the UK, Europe, and North America, attend expert panels on study abroad options, and get one-on-one guidance from our counsellors."
```

---

**2f. `src/pages/Index.tsx`**

Find in the SEO meta description:
```
AQF Certified.
```
Delete just this phrase (including the trailing space before it if any) so the description reads cleanly without that claim.

---

**2g. `src/pages/About.tsx`**

Step 1 — Remove the AQFBadge import:
Find: `import AQFBadge from "@/components/AQFBadge";`
Delete this line entirely.

Step 2 — Update the SEO title. Find:
```
title="About Applyza | Global Education Consultancy | AQF Certified"
```
Replace with:
```
title="About Applyza | Global Education Consultancy | 10+ Years' Experience"
```

Step 3 — Update the SEO meta description. Find:
```
description="Applyza is a global education consultancy helping international students access world-class universities — transparently, freely, and with expert guidance. AQF Certified."
```
Replace with:
```
description="Applyza is a global education consultancy helping international students access world-class universities — transparently, freely, and with expert guidance. 3,000+ students placed. 99% visa success rate."
```

Step 4 — Remove "AQF Certified ·" from the page subtitle. Find:
```
AQF Certified · 3,000+ Students Placed
```
Replace with:
```
3,000+ Students Placed
```

Step 5 — Replace the AQF paragraph in the Ethics/Standards section. Find:
```
Applyza operates within the UK Agent Quality Framework (AQF) and adheres to the National Code of Ethical Practice for Education Agents. Our counsellors are trained and certified through recognised professional programmes.
```
Replace with:
```
Applyza adheres to the National Code of Ethical Practice for Education Agents, established by leading international education bodies. Our counsellors are trained and certified through recognised professional development programmes.
```

Step 6 — Remove the "What AQF certification means →" link. Find:
```
to="/aqf-certified-education-agent"
```
and the surrounding Link element that contains `What AQF certification means →`. Delete the entire Link component (opening tag, content, closing tag).

Step 7 — Also remove the gov.uk external link that points to the UK government's AQF publications page. Find:
```
href="https://www.gov.uk/government/publications/student-agents-and-advisers"
```
and delete the entire anchor element it belongs to, along with its label text.

Step 8 — Remove the `<AQFBadge size="md" />` line near the bottom of the page.

---

**2h. `src/pages/Services.tsx`**

Find:
```
Our counsellors are trained and certified under the UK Agent Quality Framework. We provide impartial advice based on each student's individual circumstances — not on commission targets.
```
Replace with:
```
Our counsellors hold professional certifications in international student advising and adhere to the National Code of Ethical Practice for Education Agents. We provide impartial advice based on each student's individual circumstances — not on commission targets.
```

---

**2i. `src/pages/UniversityApplications.tsx`**

Find the trust card with:
```
title: "UK Agent Quality Framework",
```
```
desc: "Our counsellors are certified under the UQAF — the gold standard for international student advisors in the UK. You're in trained, accountable hands.",
```

Replace the title with:
```
title: "Certified International Advisors",
```

Replace the desc with:
```
desc: "Our counsellors hold internationally recognised certifications in student advising and adhere to the National Code of Ethical Practice for Education Agents. You're in trained, accountable hands.",
```

---

**2j. `src/pages/FAQ.tsx`**

Find the FAQ answer about regulation:
```
{ q: "Is Applyza a regulated education agent?", a: "Yes. Applyza operates within the UK Agent Quality Framework (AQF) and adheres to the National Code of Ethical Practice for Education Agents, established by leading international education bodies. Our counsellors are trained and certified through recognized professional programmes." },
```

Replace the answer text with:
```
{ q: "Is Applyza a regulated education agent?", a: "Yes. Applyza adheres to the National Code of Ethical Practice for Education Agents, established by leading international education bodies including the British Council and Universities UK International. Our counsellors hold professional certifications in international student advising and are trained through recognised professional development programmes." },
```

---

**2k. `src/pages/FindACourse.tsx`**

Find in the SEO description:
```
Expert guidance from AQF certified counsellors.
```
Replace with:
```
Expert guidance from certified international education counsellors.
```

---

**2l. `src/pages/ForInstitutions.tsx`**

Find in the SEO meta description:
```
AQF Certified. 3,000+ placements. 99% visa success.
```
Replace with:
```
Professionally certified advisors. 3,000+ placements. 99% visa success.
```

---

**2m. `src/pages/CourseDetail.tsx`**

Step 1 — Replace "AQF certified counsellors" in the trust bullet list:
Find:
```
"AQF certified counsellors",
```
Replace with:
```
"Certified education counsellors",
```

Step 2 — Replace the "Why a UK Qualification?" sidebar section. This section is UK-specific and implies all courses lead to UK qualifications, which is not true for multi-destination listings. Find:
```
<h3 className="text-sm font-bold text-primary mb-3 uppercase tracking-wide">Why a UK Qualification?</h3>
```
Replace with:
```
<h3 className="text-sm font-bold text-primary mb-3 uppercase tracking-wide">Why Study Abroad?</h3>
```

Then update the four bullet items inside this section. Find each and replace as follows:

Find:
```
{ icon: <Globe size={16} />, title: "Global Recognition", desc: "UK degrees are recognised by employers and institutions in 180+ countries worldwide." },
```
Replace with:
```
{ icon: <Globe size={16} />, title: "Global Recognition", desc: "Internationally accredited degrees are recognised by employers and institutions in 180+ countries worldwide." },
```

Find:
```
{ icon: <TrendingUp size={16} />, title: "Career Advancement", desc: "International graduates from UK universities report significantly higher starting salaries." },
```
Replace with:
```
{ icon: <TrendingUp size={16} />, title: "Career Advancement", desc: "International graduates report significantly higher career prospects and starting salaries in their home markets." },
```

Find:
```
{ icon: <Users size={16} />, title: "Graduate Visa", desc: "Work in the UK for 2–3 years post-graduation on the Graduate Route visa." },
```
Replace with:
```
{ icon: <Users size={16} />, title: "Post-Study Pathways", desc: "Many destinations offer post-study work routes, letting you gain international work experience after graduation." },
```

Find:
```
{ icon: <Award size={16} />, title: "Academic Prestige", desc: "UK universities consistently rank among the world's best for teaching quality and research." },
```
Replace with:
```
{ icon: <Award size={16} />, title: "Academic Prestige", desc: "Our partner universities consistently rank among the world's best for teaching quality, research, and graduate outcomes." },
```

---

**2n. `src/pages/BlogPost.tsx`**

Find:
```
<p className="text-white font-semibold text-sm truncate">Ready to apply to a UK university?</p>
```
Replace with:
```
<p className="text-white font-semibold text-sm truncate">Ready to apply to your dream university?</p>
```

---

**2o. `src/pages/HowToChooseConsultancy.tsx`**

Step 1 — Remove the AQFBadge import:
Find: `import AQFBadge from "@/components/AQFBadge";`
Delete this line entirely.

Step 2 — Update the SEO meta description. Find:
```
description="Not all study abroad consultancies are equal. Here's exactly what to check before you trust anyone with your university application and visa — from an AQF Certified expert."
```
Replace with:
```
description="Not all study abroad consultancies are equal. Here's exactly what to check before you trust anyone with your university application and visa — from internationally certified education advisors."
```

Step 3 — Replace the FAQ answer about certification. Find:
```
text: "Check whether the consultancy holds AQF certification (UK Agent Quality Framework) or is regulated by an equivalent recognised quality framework. Legitimate consultancies will have a physical office, named counsellors with verifiable credentials, a published visa success rate, and a transparent explanation of how their free service is funded. Be cautious of any agent who cannot answer these questions clearly.",
```
Replace with:
```
text: "Check whether the consultancy is regulated by a recognised international education quality framework or professional body. Legitimate consultancies will have a physical office, named counsellors with verifiable credentials, a published visa success rate, and a transparent explanation of how their free service is funded. Be cautious of any agent who cannot answer these questions clearly.",
```

Step 4 — Replace the FAQ answer "What is AQF certification?". Find the FAQ item:
```
name: "What is AQF certification?",
```
and its answer:
```
text: "The AQF (UK Agent Quality Framework) is the UK government's recognised quality standard for international student recruitment agents. AQF-certified agents must meet strict ethical, professional, and quality requirements set by the British Council, English UK, Universities UK International, and other leading education bodies. You can verify an agent's AQF status on the official British Council agent register.",
```

Replace the question name with:
```
name: "What certifications should a legitimate education consultancy have?",
```

Replace the answer with:
```
text: "A legitimate education consultancy should hold certifications from recognised international education bodies such as the British Council, Universities UK International, or regional equivalents. These bodies set ethical and quality standards for international student advising. Always ask to see proof of certification and verify it independently.",
```

Step 5 — Replace the checklist question about AQF. Find:
```
question: "Are they AQF Certified or regulated by a recognised quality framework?",
```
Replace with:
```
question: "Are they certified by a recognised international education body?",
```

Find the answer to this question:
```
"The UK Agent Quality Framework (AQF) is the government-recognised standard for education agents. AQF-certified agents must meet strict ethical and quality requirements. Always ask to see proof of certification and verify it independently. Applyza is AQF Certified.",
```
Replace with:
```
"Reputable education consultancies are certified by recognised international education bodies that set ethical and quality standards. Always ask to see proof of certification and verify it independently. Applyza's counsellors hold professional certifications in international student advising.",
```

Step 6 — Replace the checklist item in the "look for" array. Find:
```
"AQF Certified or equivalent regulated status",
```
Replace with:
```
"Certified by a recognised international education body",
```

Step 7 — Replace the "proof" row in the Applyza credentials table. Find:
```
{ proof: "AQF Certified Agent", detail: "Verified on the British Council register." },
```
Replace with:
```
{ proof: "Professionally Certified Advisors", detail: "Our counsellors hold internationally recognised education advising certifications." },
```

Step 8 — Remove the `<AQFBadge size="md" />` line in the page body.

Step 9 — Remove the internal link to /aqf-certified-education-agent. Find the Link component that contains:
```
to="/aqf-certified-education-agent"
```
and the text "What Is AQF Certification?". Delete the entire Link block (opening tag, all contents, closing tag) including any surrounding wrapper div if it only contains this link.

Step 10 — Replace the CTA heading. Find:
```
Ready to speak with an AQF Certified consultant?
```
Replace with:
```
Ready to speak with a certified education consultant?
```

---

**2p. `src/pages/FreeVsPaidConsultancies.tsx`**

Step 1 — Remove the AQFBadge import:
Find: `import AQFBadge from "@/components/AQFBadge";`
Delete this line entirely.

Step 2 — Replace AQF references in FAQ answers. Find:
```
text: "Applyza earns placement commissions from partner universities when students successfully enrol. This is the standard model for AQF-regulated education agents. Because universities fund the service, we never charge students — not for consultations, applications, visa support, or accommodation guidance.",
```
Replace `AQF-regulated education agents` with `internationally certified education agents`.

Step 3 — Find:
```
text: "Yes — provided the consultancy is AQF Certified or regulated by an equivalent recognised quality framework. The AQF (UK Agent Quality Framework) is the government's standard for education agents and requires strict ethical, professional, and quality compliance. An AQF-certified consultancy being free is not a red flag; it is the expected model. The risk lies in using unregulated agents, not free ones.",
```
Replace with:
```
text: "Yes — provided the consultancy is certified by a recognised international education body or professional quality framework. A certified consultancy being free is not a red flag; it is the expected model under the commission structure. The risk lies in using unregulated agents who lack professional oversight, not in using free services that operate transparently.",
```

Step 4 — Find in the risk section body copy:
```
body: "The risk of 'free' services from unregulated agents is real — particularly in markets like Nigeria, Ghana, Kenya, and Egypt where unregistered agents operate without quality standards. The answer is not to pay fees; it is to verify certification. AQF-certified agents (regulated by the UK government's Agent Quality Framework) are free for students AND held to strict quality and ethical standards.",
```
Replace with:
```
body: "The risk of 'free' services from unregulated agents is real — particularly in markets like Nigeria, Ghana, Kenya, and Egypt where unregistered agents operate without quality standards. The answer is not to pay fees; it is to verify certification. Certified agents (regulated by internationally recognised education bodies) are free for students AND held to strict quality and ethical standards.",
```

Step 5 — Find in the checklist:
```
"AQF or equivalent certification you can verify independently",
```
Replace with:
```
"Certification from a recognised international education body you can verify independently",
```

Step 6 — Find the section heading and body:
```
Applyza: AQF Certified and Free at Every Stage
```
Replace with:
```
Applyza: Professionally Certified and Free at Every Stage
```

Step 7 — Find:
```
is the standard AQF-regulated model — it means our guidance, your application, and your visa
```
Replace `AQF-regulated model` with `commission-based model`.

Step 8 — Replace the credentials row. Find:
```
{ icon: BadgeCheck, label: "AQF Certified", detail: "Regulated by the UK Agent Quality Framework." },
```
Replace with:
```
{ icon: BadgeCheck, label: "Professionally Certified", detail: "Our counsellors hold internationally recognised education advising certifications." },
```

Step 9 — Remove the `<AQFBadge size="md" />` line.

Step 10 — Remove the internal link to /aqf-certified-education-agent. Find the Link component containing:
```
to="/aqf-certified-education-agent"
```
and the text "What Is AQF Certification?". Delete the entire Link block and any surrounding wrapper element that only contains this link.

---

### PART 3 — VERIFY YOUR WORK

After making all changes:

1. Run: `grep -r "AQF\|aqf\|Agent Quality Framework\|AqfBadge\|aqf-certified" src/ --include="*.tsx" --include="*.ts"`
   — The only remaining results should be inside `src/pages/AQFCertification.tsx` if that file still exists (it should have been deleted). If any other files still contain AQF references, fix them.

2. Run: `npm run build`
   — The build must succeed with no errors. Fix any TypeScript errors caused by missing imports (AQFBadge no longer exists).

3. Run: `grep -r "AQFBadge" src/ --include="*.tsx" --include="*.ts"`
   — This should return zero results. If any remain, the import or usage was missed.

4. Run: `grep -r "aqf-certified-education-agent" src/ --include="*.tsx" --include="*.ts"`
   — The only result should be the redirect in App.tsx. Any other links to this route should have been removed.

Report which files were changed and confirm the build passed.
```

---

*Generated March 2026 · Based on full SEO & marketing audit of applyza.com codebase*
---

## Prompt 18 — Remove WhyFree Section & Tone Down Commission Language

```
We need to make two related changes:

1. Remove the "WhyFree" section from the homepage entirely — the three-card block showing "Professionally Certified", "University-Funded", and "No Hidden Fees".
2. Across all student-facing pages, remove or soften any copy that explicitly explains the commission payment mechanism (e.g. "Partner universities pay us a commission when you enrol", "we earn placement commissions", "funded by our partner universities", "not on commission targets"). The fact that the service is free should still be stated clearly wherever it appears — just without framing it in terms of financial compensation from universities.

### WHAT TO KEEP UNCHANGED
- `src/pages/ForPartners.tsx` — Commission language is appropriate here; this page targets education agents, not students. Leave it completely untouched.
- `src/pages/TermsConditions.tsx` — The line "Applyza earns commission from partner universities upon successful student enrolment. This commission structure does not affect the advice or recommendations we provide to students." is a legal disclosure and must remain exactly as written.
- Any use of the word "commission" inside `PrivacyPolicy.tsx` or legal pages — leave untouched.
- The word "commission" in `PartnerLogos.tsx` ("European Commission") — unrelated, leave untouched.
- `src/components/EligibilityQuizCTA.tsx` — no changes needed.

### REPLACEMENT PRINCIPLE
Wherever student-facing copy currently explains the commission mechanism, replace it with one of these framings depending on context:
- Short form: "completely free for students" / "free at every stage" / "no fees, no charges, no hidden costs"
- Medium form: "Our service is completely free — no consultation fees, no application charges, no hidden costs at any stage."
- When a brief explanation is needed: "We work in partnership with universities to provide this service at no cost to you."

Do NOT use "funded by universities", "universities pay us", "we earn from universities", or any variation that surfaces the financial relationship.

---

### PART 1 — Remove the WhyFree homepage section

**`src/pages/Index.tsx`**

Step 1 — Remove the import:
Find: `import WhyFree from "@/components/WhyFree";`
Delete this line.

Step 2 — Remove the section block:
Find:
```
      <div className="scroll-section" data-section="why-free">
        <WhyFree />
      </div>
```
Delete these 3 lines entirely.

**`src/components/WhyFree.tsx`**
Delete this file entirely.

---

### PART 2 — Edit student-facing pages

---

**`src/pages/Services.tsx`**

The "Why Is It Free?" section (lines starting with `{/* Why Free? */}`) needs its body copy updated.

Find:
```
            Our partner universities fund our services because we deliver qualified, well-prepared students who are ready to succeed. That means you get expert guidance, application support, and visa assistance — at absolutely no cost to you, at any stage.
```
Replace with:
```
            Our service is completely free for students at every stage — no consultation fees, no application charges, and no hidden costs. Expert guidance, application support, and visa assistance, all included.
```

Find:
```
            Our counsellors hold professional certifications in international student advising and adhere to the National Code of Ethical Practice for Education Agents. We provide impartial advice based on each student's individual circumstances — not on commission targets.
```
Replace with:
```
            Our counsellors hold professional certifications in international student advising and adhere to the National Code of Ethical Practice for Education Agents. We provide impartial, personalised advice based on each student's individual circumstances and goals.
```

---

**`src/pages/VisaImmigration.tsx`**

Find:
```
Our service is funded by our partner universities, not by students.
```
Replace with:
```
Our service is completely free — no upfront fees, no success fees, no hidden charges at any stage.
```

---

**`src/pages/UniversityApplications.tsx`**

Find:
```
We are funded by our partner universities, not by students. You will never be asked to pay a fee — not at the start, not at any stage.
```
Replace with:
```
Our service is completely free. You will never be asked to pay a fee — not at the start, not at any stage.
```

---

**`src/pages/Accommodation.tsx`**

Find:
```
We're funded by our partner universities — not by students or landlords.
```
Replace with:
```
We never charge students for accommodation guidance — it's part of our free end-to-end service.
```

---

**`src/pages/FAQ.tsx`**

Find:
```
Our services are funded by our university partners.
```
Replace with:
```
Our service is completely free for every student, at every stage — no exceptions.
```

---

**`src/pages/StudentCounselling.tsx`**

Find:
```
We give you our honest recommendation — not based on commission, but on what we believe gives you the best chance of a fulfilling study experience.
```
Replace with:
```
We give you our honest recommendation — based entirely on what we believe gives you the best chance of a fulfilling study experience.
```

---

**`src/pages/HowToChooseConsultancy.tsx`**

Find the FAQ answer that starts with "No. Regulated education agents earn placement commissions...":
```
text: "No. Regulated education agents earn placement commissions from universities when students successfully enrol — this is the industry standard model. This means their guidance, application support, and visa help should be completely free for students. If a consultancy charges you fees on top of receiving university commissions, ask specifically why — and consider whether it is worth it.",
```
Replace with:
```
text: "No. Applyza's service is completely free for students at every stage — consultations, applications, and visa support are all included at no cost. If any consultancy asks you to pay fees, ask specifically what those fees are for and whether the level of service genuinely justifies the charge.",
```

Also find the checklist answer about fees:
```
"Regulated education agents earn placement commissions from universities when students successfully enrol. This means their guidance should be free for you. If a consultancy charges you fees on top of receiving university commissions, ask why. Applyza's service is completely free for students at every stage.",
```
Replace with:
```
"A reputable consultancy's service should be completely free for students. If a consultancy charges you fees, ask specifically what those fees cover and whether the service level justifies them. Applyza's service is completely free at every stage.",
```

---

**`src/pages/FreeVsPaidConsultancies.tsx`**

This page specifically explains the free vs paid model so some explanation is necessary — but rephrase to avoid explicit commission language.

Find the FAQ answer "Why is Applyza free?":
```
text: "Applyza earns placement commissions from partner universities when students successfully enrol. This is the standard model for internationally certified education agents. Because universities fund the service, we never charge students — not for consultations, applications, visa support, or accommodation guidance.",
```
Replace with:
```
text: "Applyza works in partnership with universities to provide its service at no cost to students. This is the standard model for internationally certified education consultancies. We never charge students — not for consultations, applications, visa support, or accommodation guidance.",
```

Find the FAQ answer about whether free services can be trusted:
```
text: "Yes — provided the consultancy is certified by a recognised international education body or professional quality framework. A certified consultancy being free is not a red flag; it is the expected model under the commission structure. The risk lies in using unregulated agents who lack professional oversight, not in using free services that operate transparently.",
```
Replace with:
```
text: "Yes — provided the consultancy is certified by a recognised international education body or professional quality framework. A certified consultancy being free is not a red flag; it is the standard operating model. The risk lies in using unregulated agents who lack professional oversight, not in using free services that operate transparently.",
```

Find the FAQ answer about the core difference:
```
text: "The core difference is not service quality — it is business model. Free consultancies (under the commission model) earn from universities; paid consultancies charge students directly, sometimes in addition to earning commissions. A genuinely free, AQF-certified service should include initial consultation, course matching, application preparation, visa support, and accommodation guidance — all at no cost to the student.",
```
Replace with:
```
text: "The core difference is not service quality — it is who pays. Some consultancies charge students directly; others operate under a partnership model that allows them to offer the service for free. A genuinely free consultancy service should include initial consultation, course matching, application preparation, visa support, and accommodation guidance — all at no cost to the student.",
```

Find section body copy starting "Regulated education agents earn placement commissions...":
```
    body: "Regulated education agents earn placement commissions from universities when a student successfully enrols. This commission model is the global standard — it means universities fund the cost of finding and supporting students, not the students themselves. Under this model, there is no reason for a student to pay consultancy fees. The consultancy is already being compensated by the university.",
```
Replace with:
```
    body: "Many certified education consultancies operate under a university partnership model — meaning the cost of the service is covered through institutional partnerships, not by students. Under this model, there is no reason for a student to pay consultancy fees. The service is funded through the consultancy's university relationships.",
```

Find the section about why some consultancies still charge:
```
    body: "Some consultancies charge students on top of receiving university commissions. They may argue their fees reflect a premium service level. In some cases this may be true. But it is worth asking: if the commission model already funds the service, what exactly are the fees for? And does paying upfront change the consultancy's incentives in any way?",
```
Replace with:
```
    body: "Some consultancies charge students directly for their services. They may argue their fees reflect a premium service level, and in some cases this may be true. But it is worth asking: what specifically do the fees cover that a free service does not? And does paying upfront change the consultancy's incentives in any way?",
```

Find the Applyza credentials section body:
```
              Applyza earns placement commissions from partner universities when students successfully enrol. This
              is the standard commission-based model — it means our guidance, your application, and your visa
```
Replace with:
```
              Applyza works in partnership with universities to deliver its service at no cost to students. This
              is the standard partnership model — it means our guidance, your application, and your visa
```

---

### PART 3 — Verify

After all changes:

1. Run: `grep -r "commission\|university-funded\|universities fund\|universities pay\|funded by our" src/ --include="*.tsx" --include="*.ts" | grep -v "ForPartners\|TermsConditions\|PrivacyPolicy\|European Commission"`
   — This should return zero results. Any remaining hits outside those exempt files need to be addressed.

2. Run: `grep -r "WhyFree" src/ --include="*.tsx"`
   — Should return zero results.

3. Run: `npm run build`
   — Must pass with no errors. Fix any TypeScript errors from missing imports.

Report every file changed and confirm the build passed.
```

---

