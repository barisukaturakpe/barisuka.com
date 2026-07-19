import type { Metadata } from "next";
import { IBM_Plex_Mono, Newsreader } from "next/font/google";
import "./globals.css";

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Barisuka Turakpe — Software Engineer & Founder",
  description:
    "Barisuka Turakpe is a Nigerian software engineer and founder building financial infrastructure for Africa's digital economy. Founder of Remotah and Atisah.",
  metadataBase: new URL("https://barisuka.com"),
  alternates: { canonical: "/" },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
  },
  openGraph: {
    type: "profile",
    title: "Barisuka Turakpe — Software Engineer & Founder",
    description:
      "Nigerian software engineer and founder building financial infrastructure for Africa's digital economy. Founder of Remotah and Atisah.",
    url: "https://barisuka.com/",
  },
  twitter: {
    card: "summary",
    creator: "@barisukafx",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Barisuka Turakpe",
              jobTitle: "Software Engineer & Founder",
              nationality: "Nigerian",
              address: {
                "@type": "PostalAddress",
                addressCountry: "Nigeria",
              },
              url: "https://barisuka.com/",
              worksFor: [
                { "@type": "Organization", name: "Remotah" },
                { "@type": "Organization", name: "Atisah" },
                { "@type": "Organization", name: "018" },
              ],
              sameAs: [
                "https://x.com/barisukafx",
                "https://www.linkedin.com/in/barisuka-turakpe-749159151",
              ],
            }),
          }}
        />
      </head>
      <body className={`${newsreader.variable} ${ibmPlexMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
