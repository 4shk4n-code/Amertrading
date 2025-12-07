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
                const originalLog = console.log;
                const shouldSuppress = function() {
                  for (let i = 0; i < arguments.length; i++) {
                    const m = String(arguments[i] || '').toLowerCase();
                    // Zustand deprecation warnings - catch all variations
                    if ((m.includes('deprecated') && m.includes('zustand')) ||
                        (m.includes('default export') && m.includes('deprecated') && m.includes('zustand')) ||
                        (m.includes('default export is deprecated') && (m.includes('create') || m.includes('zustand'))) ||
                        (m.includes('import') && m.includes('create') && m.includes('zustand'))) {
                      return true;
                    }
                    // Dialog accessibility warnings
                    if ((m.includes('dialogcontent') && (m.includes('dialogtitle') || m.includes('requires'))) ||
                        (m.includes('missing') && (m.includes('description') || m.includes('aria-describedby'))) ||
                        (m.includes('dialog') && m.includes('accessible'))) {
                      return true;
                    }
                    // CSS preload warnings
                    if (m.includes('was preloaded using link preload but not used') ||
                        m.includes('preloaded using link preload')) {
                      return true;
                    }
                  }
                  return false;
                };
                console.warn = function() { if (!shouldSuppress.apply(null, arguments)) originalWarn.apply(console, arguments); };
                console.error = function() { if (!shouldSuppress.apply(null, arguments)) originalError.apply(console, arguments); };
                console.log = function() { if (!shouldSuppress.apply(null, arguments)) originalLog.apply(console, arguments); };
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
