import type { Metadata, Viewport } from "next";
import "./globals.css";
// import NavBar from "../components/nav-bar";
import { geistSans, geistMono, dmMono } from "./fonts";
import NavBar from "@/components/nav-bar";
import { metadata as exportedMetadata, viewport as exportedViewport } from "./metadata";
import { PostHogProvider } from "./providers";

export const metadata: Metadata = exportedMetadata;
export const viewport: Viewport = exportedViewport;

export default function RootLayout({
  children,
  waitlist,
}: Readonly<{
  children: React.ReactNode;
  waitlist: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${dmMono.variable} antialiased`}
      >
        <PostHogProvider>
          <NavBar />
          {children}
          {waitlist}
        </PostHogProvider>
      </body>
    </html>
  );
}
