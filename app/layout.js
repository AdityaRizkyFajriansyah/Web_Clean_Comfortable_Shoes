import "./globals.css";
import { Manrope } from "next/font/google";
import Chatbot from "../components/Chatbot";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: "Clean Comfortable Shoes | Company Profile",
  description:
    "Clean Comfortable Shoes - layanan cuci sepatu profesional, cepat, dan aman.",
  keywords: [
    "cuci sepatu",
    "clean comfortable shoes",
    "laundry sepatu",
    "jasa cuci sepatu",
    "cleaning sepatu",
  ],
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/logo.jpeg",
  },
  openGraph: {
    title: "Clean Comfortable Shoes | Company Profile",
    description:
      "Clean Comfortable Shoes - layanan cuci sepatu profesional, cepat, dan aman.",
    url: "/",
    siteName: "Clean Comfortable Shoes",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "/logo.jpeg",
        width: 800,
        height: 800,
        alt: "Clean Comfortable Shoes logo",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Clean Comfortable Shoes | Company Profile",
    description:
      "Clean Comfortable Shoes - layanan cuci sepatu profesional, cepat, dan aman.",
    images: ["/logo.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={manrope.className}>
      <body>
        {children}
        <Chatbot />
      </body>
    </html>
  );
}
