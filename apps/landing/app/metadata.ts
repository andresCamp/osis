import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Osis | Build Products People Love Faster",
  description:
    "Automate product strategy and documentation using frameworks from the world's best companies. Osis maintains your living product wiki and provides rich integrations that transform your tool stack with always-current context. Get early access.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL!),
  applicationName: "Osis",
  keywords: [
    "Osis",
    "product strategy",
    "documentation automation",
    "living product wiki",
    "product management",
    "AI",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-32x32.png",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Osis | Build Products People Love Faster",
    description:
      "Automate product strategy and documentation using frameworks from the world's best companies. Osis maintains your living product wiki and provides rich integrations that transform your tool stack with always-current context. Get early access.",
    siteName: "Osis",
    type: "website",
    url: "/",
    images: [
      {
        url: "/osis-preview.png",
        alt: "Osis product preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Osis | Build Products People Love Faster",
    description:
      "Automate product strategy and documentation using frameworks from the world's best companies. Osis maintains your living product wiki and provides rich integrations that transform your tool stack with always-current context. Get early access.",
    site: "@AndresLCampos",
    creator: "@AndresLCampos",
    images: [
      {
        url: "/osis-preview.png",
        alt: "Osis product preview",
      },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};


