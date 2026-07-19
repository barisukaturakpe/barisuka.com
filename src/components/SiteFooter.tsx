import { NewsletterForm } from "@/components/NewsletterForm";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <>
      <NewsletterForm />
      <footer>
        <span>© {year} Barisuka Turakpe</span>
      </footer>
    </>
  );
}
