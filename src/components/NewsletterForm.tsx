"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        setStatus("error");
        setMessage(data.error ?? "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      setMessage("You're in. Thanks for subscribing.");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  }

  return (
    <div className="newsletter">
      <h2>Subscribe to my newsletter for more exclusive content.</h2>
      <form className="newsletter-form" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          autoComplete="email"
          disabled={status === "loading"}
        />
        <button type="submit" disabled={status === "loading"}>
          {status === "loading" ? "Joining…" : "Join the newsletter"}
        </button>
      </form>
      {message && (
        <p
          className={`newsletter-message ${status === "error" ? "error" : "success"}`}
        >
          {message}
        </p>
      )}
      <Link href="/posts" className="newsletter-archive">
        You can read previous posts here →
      </Link>
    </div>
  );
}
