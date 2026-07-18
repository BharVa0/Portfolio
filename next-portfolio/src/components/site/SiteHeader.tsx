import { SiteNavigation } from "@/components/site/SiteNavigation";

export function SiteHeader() {
  return (
    <header className="site-frame">
      <div className="frame-bar">
        <span className="frame-id">
          <strong>Bharat Vyas</strong> · Portfolio
        </span>
        <SiteNavigation />
        <span className="frame-loc">Edinburgh, UK · 2026</span>
      </div>
    </header>
  );
}
