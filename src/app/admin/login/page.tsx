import type { Metadata } from "next";
import Link from "next/link";
import { signIn } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false },
};

type PageProps = {
  searchParams: Promise<{ error?: string; next?: string }>;
};

export default async function AdminLoginPage({ searchParams }: PageProps) {
  const { error, next } = await searchParams;

  return (
    <div className="admin-wrap">
      <div className="login-form">
        <h1>Admin</h1>
        <p className="post-meta">Sign in to manage posts.</p>
        {error && <p className="newsletter-message error">{error}</p>}
        <form action={signIn} className="admin-form">
          <input type="hidden" name="next" value={next ?? "/admin/posts"} />
          <label>
            Email
            <input type="text" name="email" required autoComplete="email" />
          </label>
          <label>
            Password
            <input
              type="password"
              name="password"
              required
              autoComplete="current-password"
            />
          </label>
          <button type="submit" className="admin-btn primary">
            Sign in
          </button>
        </form>
        <Link href="/" className="back-link">
          ← Back to site
        </Link>
      </div>
    </div>
  );
}
