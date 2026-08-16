import type { Metadata } from "next";
import { ContactPage } from "@/components/contact/ContactPage";
import { SiteFooter } from "@/components/site/SiteFooter";

export const metadata: Metadata = {
  title: "Contact | Bharat Vyas Kodamana",
  description:
    "Get in touch with Bharat Vyas Kodamana — interaction design, UX research, 3D worlds, and coded interfaces.",
};

export default function Page() {
  return (
    <>
      <main id="content">
        <ContactPage />
      </main>
      <SiteFooter />
    </>
  );
}
