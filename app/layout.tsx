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

export const metadata: Metadata = {
  title: "Data Annotation Specialist & Virtual Assistant | Everlyn Linda",
  description:
    "Hire Everlyn Linda for data annotation, image segmentation, AI training support, data entry, customer service, and virtual assistant services. Reliable remote support for growing teams.",
  keywords: [
    "data annotation",
    "virtual assistant",
    "image segmentation",
    "AI training",
    "data entry",
    "customer support",
    "remote assistant",
    "Everlyn Linda",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
