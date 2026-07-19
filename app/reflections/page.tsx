import Link from "next/link";
import { ArrowUpRight, PenLine } from "lucide-react";
import { TideCard, DriftHeading, TideDivider } from "@/components/ui";
import { getBareDraftPosts } from "@/lib/wordpress";

export const revalidate = 3600;

export default async function ReflectionsPage() {
  const posts = await getBareDraftPosts();

  return (
    <div className="pt-32 pb-24 px-5 sm:px-10 max-w-5xl mx-auto">
      <div className="panel-glass">
      <DriftHeading eyebrow="I · Tidepools of Thought">
        Reflections
      </DriftHeading>
      <p className="mt-8 text-lg sm:text-xl font-display italic font-light leading-[1.8] text-foam/90 max-w-xl mx-auto text-center">
        The first strokes on a blank canvas — raw thoughts, personal
        stories, and reflections washed ashore.
      </p>
      <TideDivider />
      <div className="grid sm:grid-cols-2 gap-6 mt-8">
        {posts.map((p) => (
          <TideCard key={p.slug} className="overflow-hidden h-full flex flex-col">
            {p.featuredImage && (
              <img src={p.featuredImage} alt={p.title} className="w-full h-40 object-cover" />
            )}
            <div className="p-7 flex flex-col flex-1">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] uppercase tracking-[0.3em] text-ink/50 dark:text-mist/50">{p.date}</span>
                <PenLine size={13} className="text-lagoon dark:text-cyanglow" />
              </div>
              <h3 className="text-2xl font-display font-light text-ink dark:text-foam">{p.title}</h3>
              <p className="text-sm mt-3 leading-relaxed flex-1 text-ink/70 dark:text-mist/70">
                {p.excerpt}
              </p>
              <Link
                href={`/reflections/${p.slug}`}
                className="mt-5 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-ink/70 dark:text-mist/70 hover:text-ink dark:hover:text-foam transition-colors"
              >
                Continue reading <ArrowUpRight size={14} />
              </Link>
            </div>
          </TideCard>
        ))}
      </div>
      </div>
    </div>
  );
}
