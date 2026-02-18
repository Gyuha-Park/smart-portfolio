import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ChatWidget } from "@/components/chat-widget";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Gyuha Park | Smart Portfolio",
    template: "%s | Gyuha Park Portfolio",
  },
  description: "Full Stack Developer Gyuha Park의 포트폴리오. AI 기반 RAG 챗봇으로 프로젝트와 경력을 탐색하세요.",
  keywords: ["포트폴리오", "풀스택 개발자", "Next.js", "React", "Supabase", "AI", "RAG", "Gyuha Park"],
  authors: [{ name: "Gyuha Park" }],
  creator: "Gyuha Park",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://smart-portfolio.vercel.app"),
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: "Gyuha Park Portfolio",
    title: "Gyuha Park | Smart Portfolio",
    description: "Full Stack Developer Gyuha Park의 포트폴리오. AI 기반 RAG 챗봇으로 프로젝트와 경력을 탐색하세요.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Gyuha Park Smart Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gyuha Park | Smart Portfolio",
    description: "Full Stack Developer의 AI 기반 포트폴리오",
    images: ["/og-image.png"],
  },
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased flex flex-col",
          inter.variable,
          robotoMono.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <ChatWidget />
        </ThemeProvider>
      </body>
    </html>
  );
}
