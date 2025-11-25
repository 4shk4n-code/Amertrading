import type { Metadata } from "next";
import { Inter as FontInter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { buildMetadata } from "@/lib/seo";
import { SmoothScrollProvider } from "@/components/layout/smooth-scroll";
// Only import analytics on Vercel
const ConditionalAnalytics = 
  process.env.VERCEL || process.env.NEXT_PUBLIC_VERCEL_ENV
    ? require("@/components/layout/conditional-analytics").ConditionalAnalytics
    : () => null;

const inter = FontInter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
});

export const metadata: Metadata = buildMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} bg-background text-foreground antialiased`}
        style={{
          fontFamily:
            "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
        }}
      >
        <ThemeProvider>
          <SmoothScrollProvider>{children}</SmoothScrollProvider>
          <ConditionalAnalytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
