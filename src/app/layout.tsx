import type { Metadata } from "next";
import { Inter as FontInter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { buildMetadata } from "@/lib/seo";
import { SmoothScrollProvider } from "@/components/layout/smooth-scroll";
import ConditionalAnalyticsWrapper from "@/components/layout/conditional-analytics-wrapper";
import { SuppressWarnings } from "@/components/layout/suppress-warnings";


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
        suppressHydrationWarning
      >
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                if (typeof window === 'undefined') return;
                const originalWarn = console.warn;
                const originalError = console.error;
                const shouldSuppress = function(m) {
                  if (!m) return false;
                  const msg = String(m).toLowerCase();
                  return (msg.includes('deprecated') && msg.includes('zustand')) ||
                         (msg.includes('default export is deprecated') && msg.includes('create')) ||
                         (msg.includes('dialogcontent') && msg.includes('dialogtitle')) ||
                         (msg.includes('missing') && (msg.includes('description') || msg.includes('aria-describedby'))) ||
                         msg.includes('was preloaded using link preload but not used') ||
                         msg.includes('preloaded using link preload');
                };
                console.warn = function() { if (!shouldSuppress(arguments[0])) originalWarn.apply(console, arguments); };
                console.error = function() { if (!shouldSuppress(arguments[0])) originalError.apply(console, arguments); };
              })();
            `,
          }}
        />
        <SuppressWarnings />
        <ThemeProvider>
          <SmoothScrollProvider>{children}</SmoothScrollProvider>
          <ConditionalAnalyticsWrapper />
        </ThemeProvider>
      </body>
    </html>
  );
}
