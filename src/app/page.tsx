import Link from "next/link";
import { PostsSection } from "@/components/PostsSection";
import { SiteFooter } from "@/components/SiteFooter";
import { TypedRole } from "@/components/TypedRole";
import { getPublishedPosts } from "@/lib/posts";

export default async function HomePage() {
  let posts: Awaited<ReturnType<typeof getPublishedPosts>> = [];

  try {
    if (
      process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    ) {
      posts = await getPublishedPosts(5);
    }
  } catch {
    posts = [];
  }

  return (
    <div className="wrap">
      <header className="hero">
        <h1 className="reveal d1">
          Barisuka
          <br />
          Turakpe
        </h1>
        <TypedRole />
        <p className="lede reveal d3">
          I build financial infrastructure for{" "}
          <em>Africa&apos;s digital economy</em> — payments, products, and
          distribution.
        </p>
      </header>

      <hr className="rule reveal d4" />

      <section className="bio">
        <p className="eyebrow">About</p>
        <p>
          <strong>Barisuka Turakpe</strong> is a Nigerian software engineer and
          founder building financial infrastructure for Africa&apos;s digital
          economy.
        </p>
        <p>
          He is the founder of{" "}
          <strong>
            <Link href="https://remotah.com" target="_blank">
              Remotah
            </Link>
          </strong>
          , which connects skilled African professionals with employers in the
          US, UK, and Canada — and handles the cross-border payments that get
          them paid. He also founded{" "}
          <strong>
            <Link href="https://atisah.com" target="_blank">
              Atisah
            </Link>
          </strong>
          , which lets African creators sell digital products worldwide, with
          storefront and cross-border payouts built in.
        </p>
        <p>
          A software engineer by training (BCA, Lovely Professional University,
          India), he holds the{" "}
          <strong>
            <Link
              href="https://www.linkedin.com/learning/certificates/5058c974d6314d28055453c23eafe27bf2a685b9ef222665b27cd76871043dd5"
              target="_blank"
              rel="noopener noreferrer"
            >
              Aha! Product Management Professional Certificate
            </Link>
          </strong>{" "}
          and the{" "}
          <strong>
            <Link
              href="https://www.linkedin.com/learning/certificates/902b3a2df1cbb5444bd97a3ed629062591811c1ada12b7a8603feb8e4d2f7f07"
              target="_blank"
              rel="noopener noreferrer"
            >
              Atlassian Agile Project Management Professional Certificate
            </Link>
          </strong>
          . He leads engineering and product across his companies and has shipped
          payment, wallet, and multi-currency systems both as standalone products
          and inside larger ones.
        </p>
        <p>
          He&apos;s also a distribution operator: Remotah reached{" "}
          <strong>20,000+ organic signups</strong> with zero paid advertising,
          and he has trained <strong>3,000+ people to code</strong> and another{" "}
          <strong>4,000–5,000 in sales and marketing</strong>.
        </p>
        <p>
          Alongside his companies, he runs a software, marketing and design
          agency where he has built products for clients that cut across
          healthcare, fintech, education and logistics. He also founded{" "}
          <strong>018</strong>, a residency for early-stage builders in Nigeria.
        </p>
        <p>
          His work sits at the intersection of fintech, product, and
          distribution — with a long-standing interest in philosophy and
          theology, and how they shape the way software and AI get built.
        </p>
      </section>

      <hr className="rule" />

      <section>
        <p className="eyebrow">Building</p>
        <div className="work">
          <div className="item">
            <div className="label">
              <Link href="https://remotah.com" target="_blank">
                Remotah
              </Link>
            </div>
            <div className="desc">
              Connects African professionals with US, UK &amp; Canada employers
              — with cross-border payments built in.
            </div>
          </div>
          <div className="item">
            <div className="label">
              <Link href="https://atisah.com" target="_blank">
                Atisah
              </Link>
            </div>
            <div className="desc">
              Storefront and cross-border payouts for African creators selling
              digital products worldwide.
            </div>
          </div>
          <div className="item">
            <div className="label">
              <Link href="https://rokochat.com" target="_blank">
                Roko
              </Link>
            </div>
            <div className="desc">
              Live chat with forever storage and unlimited messages on every
              plan.
            </div>
          </div>
          <div className="item">
            <div className="label">018</div>
            <div className="desc">
              A residency for early-stage builders in Nigeria.
            </div>
          </div>
          <div className="item">
            <div className="label">The Agency</div>
            <div className="desc">
              Software and design studio building products for clients across
              markets.
            </div>
          </div>
        </div>
        <p className="eyebrow">Side projects</p>
        <div className="work">
          <div className="item">
            <div className="label">
              <Link
                href="https://www.aiwebkits.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                AI Webkits
              </Link>
            </div>
            <div className="desc">
              Free online tools for text, code, SEO, and more.
            </div>
          </div>
        </div>
      </section>

      {posts.length > 0 && (
        <>
          <hr className="rule" />
          <PostsSection posts={posts} />
        </>
      )}

      <hr className="rule" />

      <section>
        <p className="eyebrow">Elsewhere</p>
        <div className="links">
          <Link
            href="https://wa.me/2348096398505"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm0 18.15c-1.52 0-3.01-.41-4.3-1.18l-.31-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.36c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.25 8.24zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.98-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.11-.22-.17-.47-.29z" />
            </svg>
            WhatsApp
          </Link>
          <Link href="mailto:barisukaturakpe@gmail.com" aria-label="Email">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              aria-hidden="true"
            >
              <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
              <path d="m3.5 6.5 8.5 6.5 8.5-6.5" />
            </svg>
            Email
          </Link>
          <Link
            href="https://x.com/barisukafx"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X (Twitter)"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            @barisukafx
          </Link>
          <Link
            href="https://www.linkedin.com/in/barisuka-turakpe-749159151"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M4.98 3.5C4.98 4.881 3.87 6 2.5 6S.02 4.881.02 3.5C.02 2.12 1.13 1 2.5 1s2.48 1.12 2.48 2.5zM.24 8h4.52v14H.24V8zm7.5 0h4.33v1.92h.06c.6-1.14 2.07-2.34 4.26-2.34 4.56 0 5.4 3 5.4 6.9V22h-4.52v-6.62c0-1.58-.03-3.6-2.2-3.6-2.2 0-2.54 1.72-2.54 3.49V22H7.74V8z" />
            </svg>
            LinkedIn
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
