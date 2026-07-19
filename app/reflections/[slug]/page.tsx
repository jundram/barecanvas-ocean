import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { TideCard, Pill } from "@/components/ui";
import { getBareDraftPostBySlug, getBareDraftPosts } from "@/lib/wordpress";

export const revalidate = 3600;

export async function generateStaticParams() {
  const posts = await getBareDraftPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export default async function ReflectionArticlePage({ params }: { params: { slug: string } }) {
  const post = await getBareDraftPostBySlug(params.slug);
  if (!post) notFound();

  return (
    <div className="pt-32 pb-24 px-5 sm:px-10 max-w-5xl mx-auto">
      <div className="panel-glass">
      <Link href="/reflections" className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-foam/70 hover:text-foam transition-colors duration-200 mb-8">
        <ArrowLeft size={14} /> Back to Reflections
      </Link>
      <TideCard className="overflow-hidden max-w-2xl mx-auto">
        {post.featuredImage && (
          <img
            src={post.featuredImage}
            alt={post.title}
            className="w-full h-56 sm:h-80 object-cover"
          />
        )}
        <div className="p-8 sm:p-12">
          <Pill>{post.date}</Pill>
          <h1 className="mt-4 text-3xl sm:text-4xl font-medium font-display text-ink dark:text-foam">
            {post.title}
          </h1>
          <div
            className="prose prose-sm sm:prose-base max-w-none mt-8 text-ink dark:text-foam
                       prose-headings:font-display prose-p:leading-relaxed
                       prose-p:text-ink/75 dark:prose-p:text-mist/75
                       prose-a:text-lagoon dark:prose-a:text-cyanglow prose-strong:text-ink dark:prose-strong:text-foam"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />
        </div>
      </TideCard>
      </div>
    </div>
  );
}
