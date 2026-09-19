import type { Metadata } from "next";
import { DriftHeading, EditorialLink } from "@/components/ui";
import TaxLensFrame from "@/components/TaxLensFrame";

export const metadata: Metadata = {
  title: "TaxLens — BareCanvas",
  description:
    "An unsupervised anomaly-detection model for tax returns: K-Means peer groups, per-group Isolation Forests and SHAP explanations on the ATO 2022–23 individual sample file. Master of Data Science capstone.",
};

// Set in the Home page's voice: one centered column, display-light ledes,
// small-caps labels. The research itself is a self-contained document
// (charts and an in-browser scorer) embedded below the introduction.
const NUMBERS: { value: string; label: string }[] = [
  { value: "321,890", label: "tax returns, ATO 2022–23 sample" },
  { value: "8", label: "peer groups found by K-Means" },
  { value: "6,442", label: "flagged — the 2% least like their peers" },
  { value: "3", label: "named items explain every flag" },
];

export default function TaxLensPage() {
  return (
    <div className="pt-32 pb-24 px-5 sm:px-10 max-w-6xl mx-auto">
      <div className="panel-glass">
        <div className="max-w-2xl mx-auto text-center text-foam">
          <DriftHeading eyebrow="V · The Ledger Beneath the Tide">
            Tax<span className="italic">Lens</span>
          </DriftHeading>

          <p className="mt-10 text-base sm:text-lg font-display font-light leading-[1.9] text-foam/90">
            Which tax returns deserve a closer look? Not the largest, and not
            the rarest kind — the ones that don&rsquo;t look like their peers.
            TaxLens is a Master of Data Science capstone: an unsupervised
            anomaly-detection model trained on the ATO 2022–23 individual
            sample file. It sorts taxpayers into peer groups, scores each return
            against its own group, and explains every score in the
            return&rsquo;s own items.
          </p>

          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {NUMBERS.map((n) => (
              <div key={n.label}>
                <p className="font-display font-light text-3xl sm:text-4xl tracking-[-0.01em] text-foam text-shadow-soft">
                  {n.value}
                </p>
                <p className="mt-2 text-[10px] sm:text-[11px] uppercase tracking-[0.3em] leading-[1.7] text-foam/70">
                  {n.label}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-12 text-lg sm:text-2xl font-display italic font-light leading-[1.7] text-foam">
            A flag is a statistical signal for human review — never evidence of
            anything.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            <EditorialLink href="/taxlens/index.html" external>
              Open the research on its own page
            </EditorialLink>
            <EditorialLink
              href="https://github.com/jundram/Research/raw/main/research_paper/Capstone_Report_real_only_draft.pdf"
              external
            >
              Read the paper
            </EditorialLink>
          </div>
        </div>

        <div className="mt-16">
          <TaxLensFrame />
        </div>
      </div>
    </div>
  );
}
