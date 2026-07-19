"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Sun, Moon, Palette, Bell, Shield, Check, Mail, LogOut, Loader2,
} from "lucide-react";
import { TideCard, SectionHeader } from "@/components/ui";
import { useTheme } from "@/components/ThemeProvider";
import { supabase, isSupabaseConfigured } from "@/lib/supabaseClient";
import type { User } from "@supabase/supabase-js";

function GoogleLogo() {
  return (
    <svg width="16" height="16" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.9-2.26 5.36-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
  );
}

function ToggleRow({ label, defaultOn }: { label: string; defaultOn?: boolean }) {
  const [on, setOn] = useState(!!defaultOn);
  return (
    <div className="flex items-center justify-between py-2.5">
      <span className="text-sm text-ink/75 dark:text-mist/75">{label}</span>
      <button
        onClick={() => setOn(!on)}
        className={`w-10 h-6 rounded-full relative ${on ? "bg-lagoon dark:bg-cyanglow" : "bg-ink/15 dark:bg-mist/15"}`}
      >
        <motion.div
          className="rounded-full absolute top-[3px] bg-white"
          style={{ width: 18, height: 18 }}
          animate={{ left: on ? 20 : 3 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      </button>
    </div>
  );
}

export default function AccountPage() {
  const { dark, setDark } = useTheme();
  const [user, setUser] = useState<User | null>(null);
  const [checkingSession, setCheckingSession] = useState(true);
  const [mode, setMode] = useState<"sign-in" | "sign-up">("sign-in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setCheckingSession(false);
      return;
    }
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
      setCheckingSession(false);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    if (!isSupabaseConfigured) {
      setMessage("Sign-in isn't connected yet.");
      return;
    }
    const { error } = await supabase.auth.signInWithOAuth({ provider: "google" });
    if (error) setMessage(error.message);
  };

  const handleEmailAuth = async () => {
    if (!isSupabaseConfigured || !email || !password) return;
    setLoading(true);
    setMessage(null);
    const { error } =
      mode === "sign-up"
        ? await supabase.auth.signUp({ email, password })
        : await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setMessage(error.message);
    } else if (mode === "sign-up") {
      setMessage("Check your email to confirm your account.");
    }
  };

  const signOut = async () => {
    if (!isSupabaseConfigured) return;
    await supabase.auth.signOut();
  };

  return (
    <div className="pt-32 pb-24 px-5 sm:px-10 max-w-5xl mx-auto">
      <div className="panel-glass">
      <SectionHeader
        eyebrow="Account"
        title="You"
        desc="Your own appearance and sign-in preferences — these don't affect what other visitors see."
      />
      <div className="grid sm:grid-cols-2 gap-5 mt-8">
        <TideCard className="p-7">
          <div className="flex items-center gap-2 mb-5">
            <Palette size={16} className="text-lagoon dark:text-cyanglow" />
            <h3 className="font-medium text-ink dark:text-foam">Appearance</h3>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setDark(false)}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-medium border text-ink dark:text-foam ${
                !dark ? "border-lagoon bg-lagoon/10" : "border-ink/15 dark:border-mist/15"
              }`}
            >
              <Sun size={15} /> Light {!dark && <Check size={13} />}
            </button>
            <button
              onClick={() => setDark(true)}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-medium border text-ink dark:text-foam ${
                dark ? "border-cyanglow bg-cyanglow/10" : "border-ink/15 dark:border-mist/15"
              }`}
            >
              <Moon size={15} /> Dark {dark && <Check size={13} />}
            </button>
          </div>

          <div className="flex items-center gap-2 mt-8 mb-4">
            <Bell size={16} className="text-lagoon dark:text-cyanglow" />
            <h3 className="font-medium text-ink dark:text-foam">Notifications</h3>
          </div>
          <ToggleRow label="Weekly Reflections digest" defaultOn />
          <ToggleRow label="Soul Blueprint transit updates" />
          <ToggleRow label="New recipe alerts" defaultOn />
        </TideCard>

        <TideCard className="p-7">
          <div className="flex items-center gap-2 mb-5">
            <Shield size={16} className="text-lagoon dark:text-cyanglow" />
            <h3 className="font-medium text-ink dark:text-foam">Sign in</h3>
          </div>

          {checkingSession ? (
            <p className="text-sm text-ink/60 dark:text-mist/60">Checking your session…</p>
          ) : user ? (
            <div>
              <p className="text-sm text-ink dark:text-foam">Signed in as</p>
              <p className="text-sm font-medium mt-1 text-ink/75 dark:text-mist/75">{user.email}</p>
              <button
                onClick={signOut}
                className="w-full flex items-center justify-center gap-2 mt-6 px-4 py-3 rounded-2xl text-sm font-medium text-coral"
              >
                <LogOut size={15} /> Sign out
              </button>
            </div>
          ) : (
            <div>
              <button
                onClick={signInWithGoogle}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl border border-ink/15 dark:border-mist/15 text-sm font-medium text-ink dark:text-foam"
              >
                <GoogleLogo />
                Continue with Google
              </button>

              <div className="flex items-center gap-3 my-5">
                <div className="flex-1 h-px bg-ink/[0.1] dark:bg-mist/[0.1]" />
                <span className="text-[11px] uppercase tracking-[0.14em] text-stone dark:text-mist/50">or</span>
                <div className="flex-1 h-px bg-ink/[0.1] dark:bg-mist/[0.1]" />
              </div>

              <div className="space-y-2.5">
                <label className="block">
                  <span className="text-xs text-ink/60 dark:text-mist/60">Email</span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="mt-1 w-full px-3 py-2.5 rounded-xl border border-ink/15 dark:border-mist/20 bg-transparent text-ink dark:text-foam text-sm"
                  />
                </label>
                <label className="block">
                  <span className="text-xs text-ink/60 dark:text-mist/60">Password</span>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="mt-1 w-full px-3 py-2.5 rounded-xl border border-ink/15 dark:border-mist/20 bg-transparent text-ink dark:text-foam text-sm"
                  />
                </label>
              </div>

              <button
                onClick={handleEmailAuth}
                disabled={loading || !email || !password}
                className="w-full flex items-center justify-center gap-2 mt-4 py-3 rounded-2xl text-sm font-medium bg-ink text-foam dark:bg-foam dark:text-ink disabled:opacity-40"
              >
                {loading && <Loader2 size={15} className="animate-spin" />}
                {mode === "sign-up" ? "Create account" : "Sign in"}
              </button>

              <button
                onClick={() => {
                  setMode(mode === "sign-up" ? "sign-in" : "sign-up");
                  setMessage(null);
                }}
                className="w-full text-center mt-3 text-xs text-stone dark:text-mist/60 hover:text-ink dark:hover:text-foam transition-colors"
              >
                {mode === "sign-up" ? "Already have an account? Sign in" : "New here? Create an account"}
              </button>

              {message && (
                <p className="text-xs mt-3 flex items-start gap-1.5 text-ink/60 dark:text-mist/60">
                  <Mail size={13} className="mt-0.5 shrink-0" /> {message}
                </p>
              )}
            </div>
          )}

          {!isSupabaseConfigured && (
            <p className="text-xs mt-4 text-ink/60 dark:text-mist/60">
              Sign-in isn't connected yet — this will work once Supabase is set up.
            </p>
          )}
        </TideCard>
      </div>
      </div>
    </div>
  );
}
