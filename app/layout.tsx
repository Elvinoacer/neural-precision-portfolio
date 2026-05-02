import type { Metadata } from "next";
import { Space_Grotesk, Manrope } from "next/font/google";
import "./globals.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const SITE_URL = "https://neuralprecision.co.ke";
const SITE_NAME = "Neural Precision by Everlyn Linda";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Data Annotation, Data Entry & Virtual Assistant Services | Everlyn Linda — Neural Precision",
    template: "%s | Neural Precision",
  },
  description:
    "Hire Everlyn Linda for accurate data annotation, data entry & management, image segmentation, AI training support, customer service, and virtual assistant services. Reliable remote support for growing teams in Kenya and worldwide.",
  keywords: [
    "data annotation specialist",
    "data entry services",
    "data entry specialist Kenya",
    "virtual assistant Kenya",
    "image segmentation services",
    "AI training support",
    "spreadsheet data entry",
    "database management",
    "customer support outsourcing",
    "remote virtual assistant",
    "Everlyn Linda",
    "CVAT annotation",
    "Labelbox annotation",
    "LLM training data",
    "data labeling",
    "bounding box annotation",
    "semantic segmentation",
    "hire data entry specialist",
    "hire virtual assistant",
    "remote data annotator",
    "Neural Precision",
  ],
  authors: [{ name: "Everlyn Linda", url: SITE_URL }],
  creator: "Everlyn Linda",
  publisher: SITE_NAME,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "Data Annotation, Data Entry & Virtual Assistant | Everlyn Linda",
    description:
      "Hire Everlyn Linda for accurate data annotation, data entry, image segmentation, AI training support, and virtual assistant services. Reliable remote support for growing teams.",
    images: [
      {
        url: "/images/everlyn_linda_photo.webp",
        width: 1200,
        height: 630,
        alt: "Everlyn Linda — Data Annotation Specialist & Virtual Assistant",
        type: "image/webp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Data Annotation, Data Entry & Virtual Assistant | Everlyn Linda",
    description:
      "Hire Everlyn Linda for accurate data annotation, data entry, image segmentation, AI training support, and virtual assistant services.",
    images: ["/images/everlyn_linda_photo.webp"],
    creator: "@everlynlinda",
  },
  category: "Professional Services",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: SITE_NAME,
    url: SITE_URL,
    description:
      "Accurate data annotation, data entry & management, image segmentation, AI training support, and virtual assistant services by Everlyn Linda.",
    founder: {
      "@type": "Person",
      name: "Everlyn Linda",
      jobTitle: "Data Annotation Specialist, Data Entry Expert & Virtual Assistant",
      url: SITE_URL,
      address: {
        "@type": "PostalAddress",
        addressCountry: "KE",
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+254-792-038496",
        email: "lindahlish18@gmail.com",
        contactType: "customer service",
        availableLanguage: "English",
      },
      sameAs: ["https://www.linkedin.com/in/lindahlish2043"],
    },
    areaServed: {
      "@type": "GeoCircle",
      geoMidpoint: { "@type": "GeoCoordinates", latitude: 0, longitude: 37 },
      geoRadius: "20000",
    },
    serviceType: [
      "Data Annotation",
      "Data Entry & Management",
      "Image Segmentation",
      "Virtual Assistance",
      "Customer Support",
      "AI Training Support",
      "Spreadsheet Management",
      "Database Management",
    ],
    knowsAbout: [
      "CVAT",
      "Labelbox",
      "Appen",
      "Google Workspace",
      "Trello",
      "Asana",
      "Semantic Segmentation",
      "Bounding Box Annotation",
      "LLM Training",
      "RLHF",
    ],
    priceRange: "$$",
    image: `${SITE_URL}/images/everlyn_linda_photo.webp`,
  };

  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${manrope.variable} dark`}
    >
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0a0f11" />
        <link rel="canonical" href={SITE_URL} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-surface-container-lowest text-on-surface font-body-md antialiased min-h-screen flex flex-col selection:bg-primary-container selection:text-on-primary-container">
        <NavBar />
        <main className="flex-grow w-full relative z-10 flex flex-col items-center">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
