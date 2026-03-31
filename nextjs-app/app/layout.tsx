import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://applyza.com"),
  title: {
    template: "%s | Applyza — Free Study Abroad Consultancy",
    default: "Applyza — Free AQF-Certified Study Abroad Consultancy",
  },
  description:
    "Applyza is a free, AQF-certified study abroad consultancy. We help students apply to UK, US, Canada, Australia & more — at zero cost.",
  openGraph: {
    siteName: "Applyza",
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: "/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Applyza — Free Study Abroad Consultancy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@applyzahq",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-GB">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#0a0a1a] text-white antialiased">{children}</body>
    </html>
  );
}
