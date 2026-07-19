import { DriftHeading, EditorialLink, TideDivider } from "@/components/ui";

// Everything below is set in the Home page's voice: display-light body,
// small-caps labels, one centered column, facts as quiet lines rather
// than cards, chips, or badges.
const FACTS: { label: string; line: string }[] = [
  { label: "Experience", line: "Tax Accountant · Analyst · General Accountant" },
  { label: "Workplaces", line: "Rio Tinto · H&R Block" },
  { label: "Education", line: "Master of Data Science · MBA" },
  { label: "Languages", line: "English · Russian · Mongolian" },
  {
    label: "Traveled",
    line: "Germany · United States · Singapore · Hong Kong · Thailand · Australia · South Korea · Tanzania · Türkiye · Japan",
  },
  { label: "Volunteer", line: "UN Women — Sydney International Women's Day, 2024" },
];

function Fact({ label, line }: { label: string; line: string }) {
  return (
    <div className="mt-10 first:mt-0">
      <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.42em] text-foam/70">{label}</p>
      <p className="mt-3 text-base sm:text-lg font-display font-light leading-[1.8] text-foam/90">
        {line}
      </p>
    </div>
  );
}

export default function JourneyPage() {
  return (
    <div className="pt-32 pb-24 px-5 sm:px-10 max-w-5xl mx-auto">
      <div className="panel-glass">
        <div className="max-w-2xl mx-auto text-center text-foam">
          <DriftHeading eyebrow="V · Where the Story Began">
            Bare<span className="italic">Canvas</span>
          </DriftHeading>

          <p className="mt-10 text-base sm:text-lg font-display font-light leading-[1.9] text-foam/90">
            Life begins as a blank canvas — an open space filled with endless
            possibilities. With every choice we make, every experience we
            embrace, and every moment we hold close, we slowly create the
            story that becomes our own.
          </p>
          <p className="mt-6 text-base sm:text-lg font-display font-light leading-[1.9] text-foam/90">
            BareCanvas is a space where curiosity meets creativity — where
            reflections, memories, nature, and imagination come together to
            explore the deeper beauty of being human.
          </p>
          <p className="mt-6 text-base sm:text-lg font-display font-light leading-[1.9] text-foam/90">
            Through words, images, flavours, and moments, this space
            celebrates the art of living consciously. It is a collection of
            thoughts, discoveries, journeys, and quiet reminders that even
            the smallest moments can carry meaning.
          </p>

          <p className="mt-10 text-lg sm:text-2xl font-display italic font-light leading-[1.7] text-foam">
            A space to pause, wander, and rediscover the beauty within
            everyday life.
          </p>
          <p className="mt-8 text-[10px] sm:text-[11px] uppercase tracking-[0.42em] text-foam/70">
            Welcome to BareCanvas
          </p>

          <TideDivider />

          <img
            src="https://res.cloudinary.com/bo2zndzt/image/upload/v1784291031/site-assets/journey-portrait.jpg"
            alt="Undram"
            className="rounded-[18px] w-full max-w-sm mx-auto aspect-[4/5] object-cover"
          />
          <p className="mt-5 text-[10px] sm:text-[11px] uppercase tracking-[0.42em] text-foam/70">
            Based in Sydney, Australia
          </p>

          <TideDivider />

          {FACTS.map((f) => (
            <Fact key={f.label} {...f} />
          ))}

          <div className="mt-10">
            <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.42em] text-foam/70">Research</p>
            <p className="mt-3 text-base sm:text-lg font-display font-light leading-[1.8] text-foam/90">
              Impact of Perceived Risk on Online Buying Behaviour, 2016
            </p>
            <EditorialLink
              href="/research/perceived-risk-online-buying-2016.pdf"
              external
              className="mt-5"
            >
              Read the paper
            </EditorialLink>
          </div>

          <TideDivider />

          <EditorialLink href="https://www.instagram.com/yndram?utm_source=qr" external>
            Instagram
          </EditorialLink>
        </div>
      </div>
    </div>
  );
}
