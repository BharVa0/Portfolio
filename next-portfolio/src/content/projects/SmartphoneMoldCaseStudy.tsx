import Link from "next/link";
import { MediaFigure, MediaDuo } from "@/components/projects/MediaFigure";
import { ProjectPageShell } from "@/components/projects/ProjectPageShell";
import { ProjectOpening } from "@/components/projects/ProjectOpening";
import { ProjectSection } from "@/components/projects/ProjectSection";
import { ProjectBackground } from "@/components/projects/ProjectBackground";
import { ProjectScrollProgress } from "@/components/projects/ProjectScrollProgress";
import "./SmartphoneMoldCaseStudy.css";

export function SmartphoneMoldCaseStudy() {
  return (
    <ProjectPageShell accent="smartphone-mold">
      <ProjectBackground accent="#38bdf8" motif="glyph-matrix" />
      <ProjectScrollProgress label="06 / 07 · Breaking the Smartphone Mold" />

      <header className="proj-frame">
        <div className="proj-frame-bar">
          <Link href="/work">← All Work</Link>
          <span className="proj-frame-count mono">
            06 / 07 · Breaking the Smartphone Mold
          </span>
          <Link href="/projects/playing-freedom">
            Next: Playing Freedom →
          </Link>
        </div>
      </header>

      <ProjectOpening
        variant="balanced"
        eyebrow="design research, cultural analysis"
        title="Breaking the Smartphone Mold"
        thesis="Strip the logos off ten flagship phones and most people couldn't tell you which is which. This is a case study on why that happened, using Nothing and CMF by Nothing as the test case, grounded in an actual interview with someone who works there."
        ownership="Design research · Industry interview · Media & culture"
      >
        <MediaFigure
          src="/assets/smartphone/convergence-figure1.jpeg"
          width={670}
          height={882}
          alt="Comparison of iPhone camera designs from 2019 to 2024 alongside competitor phones, showing visual convergence across the smartphone market"
          caption="Visual convergence across flagship smartphones. Strip the branding and most devices share the same silhouette and camera arrangement."
          treatment="spotlight"
          loading="eager"
        />
      </ProjectOpening>

      <ProjectSection number="01" title="The actual question">
        <p className="smartphone-body">
          Smartphones are some of the most visible objects in daily life,
          photographed, shared, and seen constantly in public. That should
          make them rich territory for personal expression. Instead, the
          market has drifted toward visual sameness: remove the branding and
          most flagship devices share the same silhouette, the same camera
          cluster, the same sealed, minimal surface. Research on smartphone
          identity suggests this matters more than it sounds: when device
          variation narrows, so does one of the ways people signal taste and
          identity through an object they carry everywhere.
        </p>
        <p className="smartphone-body">
          Nothing and CMF by Nothing position themselves against that drift,
          transparency instead of sealed surfaces, accessible customisation
          instead of one fixed finish. This case study asks whether
          that&apos;s meaningful cultural resistance or mostly a branding
          narrative wrapped around the same commercial logic as everyone
          else. The answer, working through it honestly, turned out to be
          both at once.
        </p>
      </ProjectSection>

      <ProjectSection number="02" title="Why everything looks the same">
        <p className="smartphone-body">
          Institutional isomorphism gives the clearest explanation for why
          an entire industry converges visually. Mimetic isomorphism: firms
          copy competitors when facing uncertainty because similarity feels
          safer than risk. Coercive isomorphism: legal requirements, shared
          supply chains, and material standards push designs toward the same
          constraints. Normative isomorphism: designers trained in similar
          institutions tend to share the same instincts about minimalism and
          restraint. A senior CMF marketing professional I interviewed for
          this project put it plainly: even a small design risk can feel
          destabilising, because consumers expect a certain layout, size,
          and proportion, and companies converge on whatever feels safe
          rather than risk that expectation.
        </p>
        <div className="smartphone-frame-grid">
          <div className="smartphone-frame-card">
            <h3>Mimetic</h3>
            <p>
              Firms copy competitors under uncertainty. Similarity feels
              safer than differentiation.
            </p>
          </div>
          <div className="smartphone-frame-card">
            <h3>Coercive</h3>
            <p>
              Shared supply chains and material standards push designs
              toward the same physical constraints.
            </p>
          </div>
          <div className="smartphone-frame-card">
            <h3>Normative</h3>
            <p>
              Designers trained in similar institutions converge on the same
              beliefs about minimalism.
            </p>
          </div>
        </div>
      </ProjectSection>

      <ProjectSection
        number="03"
        title="Transparency as both rebellion and brand"
        rhythm="feature"
      >
        <p className="smartphone-body">
          Nothing&apos;s signature move is exposing what every other
          manufacturer hides: coils, screws, structural grids, arranged
          deliberately rather than concealed behind a sealed back. The Glyph
          interface extends the same logic into light, turning notifications
          and charging states into something the device communicates
          visually rather than hides. CMF by Nothing applies the same
          philosophy more broadly, offering interchangeable cases, textures,
          and finishes at a price point built for a wider audience.
        </p>
        <MediaDuo
          aspectRatio="16/10"
          left={{
            src: "/assets/smartphone/nothing-transparent.jpeg",
            width: 1235,
            height: 926,
            alt: "Transparent back panel of Nothing Phone showing exposed internal components and structural design",
          }}
          right={{
            src: "/assets/smartphone/cmf-product.jpeg",
            width: 1164,
            height: 655,
            alt: "CMF by Nothing accessories in orange, showing accessible customisation options",
          }}
        />
        <blockquote className="smartphone-quote">
          Transparency was chosen because it communicates a design
          philosophy, but also because it builds a strong, recognisable brand
          identity.
        </blockquote>
        <p className="smartphone-body smartphone-body-muted">
          That&apos;s the honest complication. Authenticity research is clear
          that authenticity isn&apos;t an inherent property of a material
          choice, it&apos;s constructed through narrative and interpretation.
          Transparency reads as openness and mechanical honesty, but
          it&apos;s also doing branding work at the same time. Both things are
          true; neither cancels the other out.
        </p>
      </ProjectSection>

      <ProjectSection number="04" title="How durable is any of this">
        <p className="smartphone-body">
          A Verge report surfaced a leak suggesting a future Nothing model
          might drop the Glyph interface entirely. Speculative, but a useful
          pressure test on the whole argument: even a brand built around
          expressive design has to weigh that expression against production
          cost and broader market appeal as it scales. Rebellious design
          features tend to simplify or disappear under exactly that kind of
          commercial pressure, which is the less comfortable but more
          accurate way to think about how long any &quot;different&quot; design
          language actually survives contact with a mass market.
        </p>
        <div className="smartphone-shot-grid">
          <MediaFigure
            src="/assets/smartphone/glyph-leak.jpeg"
            width={1346}
            height={576}
            alt="News headline reporting a leak that the Nothing Phone 3 may remove the Glyph lighting interface"
            treatment="spotlight"
          />
          <div className="smartphone-shot smartphone-quote-shot">
            <p>
              &quot;The challenge lies in maintaining expressive features
              while ensuring the product remains commercially viable.&quot;
            </p>
          </div>
        </div>
      </ProjectSection>

      <ProjectSection number="05" title="What I'd still push on">
        <div className="smartphone-reflection">
          <p className="smartphone-body">
            CMF&apos;s personalisation model is real, but it&apos;s curated
            personalisation, not unlimited choice. Users select within a
            structured palette the brand defines, which is genuine
            expressive agency, just bounded agency. I think that&apos;s the
            most honest place to land on this whole question: Nothing and
            CMF do meaningfully widen the expressive range available in a
            flooded, homogenous market, without escaping the commercial
            logic that produced that homogeneity in the first place. Neither
            claim cancels the other. If I extended this, I&apos;d want a
            second interview, ideally with someone on the industrial design
            side rather than marketing, to see whether the internal account
            of &quot;why transparency&quot; matches the external one I was given.
          </p>
        </div>
        <div className="smartphone-refs">
          Cardona Mejía, L.M., Pardo del Val, M. and Dasí Coscollar, M.
          (2020) The institutional isomorphism in the context of
          organizational changes in higher education institutions.
          <br />
          Li, X., Wang, H. and Choi, Y. (2024) Brand authenticity.{" "}
          <em>SAGE Open</em>.
          <br />
          Lou, J., Han, N., Wang, D. and Pei, X. (2022) Effects of mobile
          identity on smartphone symbolic use.
          <br />
          The Verge (2025) Nothing Phone 3 leak shows the Glyph lights might
          be gone.
          <br />
          Xu, Y., Wang, S., Song, Y. and Wang, Z. (2021) Untying the influence
          of brand authenticity on electronic word of mouth.{" "}
          <em>Frontiers in Psychology</em>.
        </div>
      </ProjectSection>

      <div className="proj-footer-nav">
        <Link className="proj-nav-back" href="/work">
          ← Back to all work
        </Link>
        <Link
          className="proj-nav-next"
          href="/projects/playing-freedom"
        >
          <span className="proj-next-label">Next project</span>
          Playing Freedom →
        </Link>
      </div>
    </ProjectPageShell>
  );
}
