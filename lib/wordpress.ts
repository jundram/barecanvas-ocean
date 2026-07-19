import { POSTS as FALLBACK_POSTS } from "@/lib/data";

// This blog is a free WordPress.com site — it doesn't expose the
// self-hosted `wp-json/wp/v2` REST route, only WordPress.com's own public
// API, which needs no key for a public blog.
const WP_BASE = "https://public-api.wordpress.com/rest/v1.1/sites/baredrafts.wordpress.com";

export interface BareDraftPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string; // plain text, HTML stripped
  contentHtml: string; // full rendered HTML — only used on the detail page
  link: string;
  featuredImage: string | null;
}

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&#8220;/g, "“")
    .replace(/&#8221;/g, "”")
    .replace(/&#8230;/g, "…")
    .replace(/&hellip;/g, "…")
    .replace(/&amp;/g, "&")
    .replace(/\[[^\]]*\]/g, "") // strips the "[…]" / "[read more]" leftover markup
    .trim();
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric",
  });
}

// This blog's posts never have WordPress's "featured image" field set, but
// some do have a photo embedded in the body — fall back to the first
// inline <img> in the post content so posts with real photos still show one.
function firstInlineImage(html: string): string | null {
  const match = /<img[^>]+src="([^"]+)"/.exec(html || "");
  return match ? match[1] : null;
}

function mapPost(p: any): BareDraftPost {
  return {
    slug: p.slug,
    title: stripHtml(p.title),
    date: formatDate(p.date),
    excerpt: stripHtml(p.excerpt),
    contentHtml: p.content,
    link: p.URL,
    featuredImage: p.featured_image || p.post_thumbnail?.URL || firstInlineImage(p.content) || null,
  };
}

/** List view — used on the BareDraft index and the Home page teaser. */
export async function getBareDraftPosts(limit = 10): Promise<BareDraftPost[]> {
  try {
    const res = await fetch(`${WP_BASE}/posts/?number=${limit}`, {
      next: { revalidate: 3600 }, // re-check WordPress at most once an hour
    });
    if (!res.ok) throw new Error(`WordPress API returned ${res.status}`);
    const data = await res.json();
    return (data.posts || []).map(mapPost);
  } catch (err) {
    console.warn("WordPress fetch failed, falling back to static posts:", err);
    return FALLBACK_POSTS.map((p) => ({
      slug: p.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      title: p.title,
      date: p.date,
      excerpt: p.excerpt,
      contentHtml: `<p>${p.excerpt}</p>`,
      link: "https://baredrafts.wordpress.com",
      featuredImage: null,
    }));
  }
}

/** Single post, for the /baredraft/[slug] detail page. */
export async function getBareDraftPostBySlug(slug: string): Promise<BareDraftPost | null> {
  try {
    const res = await fetch(`${WP_BASE}/posts/slug:${encodeURIComponent(slug)}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error(`WordPress API returned ${res.status}`);
    const p = await res.json();
    if (!p || p.error) return null;
    return mapPost(p);
  } catch (err) {
    console.warn("WordPress single-post fetch failed:", err);
    return null;
  }
}
