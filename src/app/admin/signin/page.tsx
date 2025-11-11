"use client";

import { useCallback, useEffect, useState } from "react";
import { signIn, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function AdminSignIn() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const session = await getSession();
      if (session) {
        router.replace("/admin/dashboard");
      }
    })();
  }, [router]);

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setIsLoading(true);
      setError(null);

      const existingSession = await getSession();
      if (existingSession) {
        router.replace("/admin/dashboard");
        return;
      }

      const result = await signIn("credentials", {
        redirect: false,
        username,
        password,
        callbackUrl: "/admin/dashboard",
      });

      if (result?.error) {
        const message =
          result.error === "CredentialsSignin"
            ? "Invalid administrator credentials. Please verify your ID and passphrase."
            : result.error;
        setError(message);
        setIsLoading(false);
        return;
      }

      if (result?.ok) {
        router.push("/admin/dashboard");
      } else {
        setIsLoading(false);
      }
    },
    [password, router, username],
  );

  return (
    <div className="flex min-h-screen flex-col bg-[var(--background)] text-[var(--foreground)] lg:flex-row">
      <div className="relative hidden flex-1 items-center justify-center overflow-hidden lg:flex">
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(199,138,26,0.14),_transparent_60%)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        />
        <div className="relative z-10 max-w-xl space-y-10 px-14 py-24">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.45em] text-gold-600">
              AMER GENERAL TRADING L.L.C
            </p>
            <h1 className="font-display text-4xl text-[var(--foreground)]">
              Secure Operations Console
            </h1>
            <p className="text-sm leading-relaxed text-[var(--foreground)]/75">
              Access strategic dashboards, portfolio intelligence, and
              real-time alerts. All authentication events are encrypted and
              monitored by our Security Operations Center.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-6 text-sm text-[var(--foreground)]/70">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-gold-600">
                Divisions
              </p>
              <p className="mt-2 text-2xl font-semibold">12</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-gold-600">
                Regions
              </p>
              <p className="mt-2 text-2xl font-semibold">28</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-gold-600">
                Strategic Partners
              </p>
              <p className="mt-2 text-2xl font-semibold">120+</p>
            </div>
          </div>
          <div className="space-y-3 text-xs uppercase tracking-[0.35em] text-[var(--foreground)]/60">
            <p>24/7 Security Operations Center • ISO 27001 Certified</p>
            <p>Contact: security@amertrading.com • +971 4 123 4567</p>
          </div>
        </div>
      </div>

      <div className="flex min-h-screen w-full flex-1 items-center justify-center px-6 py-20 lg:px-16">
        <div className="w-full max-w-md rounded-[2.5rem] border border-[rgba(28,26,23,0.12)] bg-white/95 p-12 shadow-[0_45px_110px_-70px_rgba(28,26,23,0.55)]">
          <div className="mb-10 space-y-3 text-left">
            <p className="text-xs uppercase tracking-[0.45em] text-gold-600">
              Credential Checkpoint
            </p>
            <h2 className="font-display text-3xl text-[var(--foreground)]">
              Admin Sign In
            </h2>
            <p className="text-sm text-[var(--foreground)]/70">
              Use your administrator ID and passphrase. All sessions are
              recorded for compliance.
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <label className="block text-left text-xs uppercase tracking-[0.32em] text-[var(--foreground)]/70">
              Admin ID
              <input
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                required
                autoComplete="username"
                className="mt-2 w-full rounded-xl border border-[rgba(28,26,23,0.12)] bg-white px-4 py-3 text-sm text-[var(--foreground)] focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-200/70"
                placeholder="id@example.com"
              />
            </label>

            <label className="block text-left text-xs uppercase tracking-[0.32em] text-[var(--foreground)]/70">
              Passphrase
              <div className="relative mt-2">
                <input
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  autoComplete="current-password"
                  type={showPassword ? "text" : "password"}
                  className="w-full rounded-xl border border-[rgba(28,26,23,0.12)] bg-white px-4 py-3 pr-14 text-sm text-[var(--foreground)] focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-200/70"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-2 flex w-10 items-center justify-center rounded-full text-sm transition hover:bg-[rgba(28,26,23,0.05)]"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </label>

            <div className="flex items-center justify-between text-xs text-[var(--foreground)]/60">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="h-3.5 w-3.5 rounded border border-[rgba(28,26,23,0.3)] accent-gold-500"
                />
                <span className="uppercase tracking-[0.3em]">
                  Remember device
                </span>
              </label>
              <a
                href="#"
                className="uppercase tracking-[0.3em] text-gold-600 hover:text-gold-500"
              >
                Forgot?
              </a>
            </div>

            {error && (
              <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-600">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="w-full rounded-full bg-gradient-to-r from-[#f9e6c3] via-[#d9a93a] to-[#b47a16] px-6 py-3 text-sm font-semibold uppercase tracking-[0.28em] text-[#1c1a17] shadow-[0_15px_35px_-20px_rgba(180,122,22,0.65)] transition hover:translate-y-[-1px] hover:shadow-[0_18px_40px_-20px_rgba(180,122,22,0.75)] disabled:cursor-not-allowed disabled:opacity-60"
              disabled={isLoading}
            >
              {isLoading ? "Verifying…" : "Access Console"}
            </button>
          </form>

          <div className="mt-10 space-y-3 text-xs uppercase tracking-[0.3em] text-[var(--foreground)]/55">
            <div className="flex items-center justify-between rounded-2xl border border-[rgba(28,26,23,0.08)] px-4 py-3">
              <span>Last maintenance window</span>
              <span className="text-[var(--foreground)]/70">12 Aug 2025</span>
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-[rgba(28,26,23,0.08)] px-4 py-3">
              <span>Status</span>
              <span className="text-emerald-500">Systems nominal</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

