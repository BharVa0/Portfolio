import { Section } from "@/components/layout/Section";
import { PageContainer } from "@/components/layout/PageContainer";

const tokenSwatches = [
  { label: "ink", value: "var(--ink)", hex: "#0D0C0B" },
  { label: "paper", value: "var(--paper)", hex: "#F2EEE9" },
  { label: "muted", value: "var(--muted)", hex: "#91877F" },
  { label: "ember", value: "var(--ember)", hex: "#B84624" },
  { label: "ember-deep", value: "var(--ember-deep)", hex: "#7B2D17" },
  { label: "ember-bright", value: "var(--ember-bright)", hex: "#D35C34" },
] as const;

export default function Home() {
  return (
    <>
      <Section rhythm="major">
        <PageContainer variant="reading">
          <p className="demo-eyebrow mono">
            Migration foundation — temporary shell, not the homepage
          </p>
          <h1 className="demo-name">Bharat Vyas</h1>
          <p className="demo-statement">
            Designing interactive systems, playable worlds and research-led
            experiences.
          </p>
          <p className="demo-body">
            The approved static portfolio is being rebuilt as a reusable
            Next.js and TypeScript system. This page exists to prove the
            shared shell works — header, typography, design tokens, and
            layout components — before any real content moves over.
          </p>
        </PageContainer>
      </Section>

      <Section id="demo-shared-shell" rhythm="compact">
        <PageContainer variant="standard">
          <p className="demo-eyebrow mono">
            Demo 1 of 3 — Shared shell · PageContainer variant: standard
          </p>
          <h2 className="demo-heading">Shared shell</h2>
          <p className="demo-body">
            The header above this section (name, primary navigation, location)
            is <code>SiteHeader</code>, rendered once in the root layout and
            shared by every route. The skip link that appears on keyboard
            focus jumps straight to this page&apos;s <code>main</code>{" "}
            landmark. Neither ships any client-side JavaScript — both stay
            Server Components.
          </p>
        </PageContainer>
      </Section>

      <Section id="demo-design-tokens" rhythm="compact">
        <PageContainer variant="wide">
          <p className="demo-eyebrow mono">
            Demo 2 of 3 — Design tokens · PageContainer variant: wide
          </p>
          <h2 className="demo-heading">Design tokens</h2>
          <p className="demo-body">
            Every color below is read from{" "}
            <code>src/styles/tokens.css</code>, carried over from the
            approved static site&apos;s <code>:root</code> block, not
            reinvented for this page.
          </p>
          <ul className="demo-swatch-row">
            {tokenSwatches.map((swatch) => (
              <li key={swatch.label} className="demo-swatch">
                <span
                  className="demo-swatch-block"
                  style={{ background: swatch.value }}
                />
                <span className="demo-swatch-label mono">
                  {swatch.label}
                  <br />
                  {swatch.hex}
                </span>
              </li>
            ))}
          </ul>
        </PageContainer>
      </Section>

      <Section id="demo-component-architecture" rhythm="compact">
        <PageContainer variant="reading">
          <p className="demo-eyebrow mono">
            Demo 3 of 3 — Component architecture · PageContainer variant:
            reading
          </p>
          <h2 className="demo-heading">Component architecture</h2>
          <p className="demo-body">
            <code>SiteHeader</code>, <code>SiteNavigation</code>,{" "}
            <code>SkipLink</code>, <code>Section</code>, and{" "}
            <code>PageContainer</code> are all Server Components — none of
            them hold state, run effects, or touch a browser API, so none of
            them ship JavaScript to the browser. This paragraph itself sits
            inside the <code>reading</code> variant of{" "}
            <code>PageContainer</code>, the narrowest of its three widths,
            reserved for long-form text.
          </p>
        </PageContainer>
      </Section>
    </>
  );
}
