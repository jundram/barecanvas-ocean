import { v2 as cloudinary } from "cloudinary";
import { PHOTOS as FALLBACK_PHOTOS } from "@/lib/data";

const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const API_KEY = process.env.CLOUDINARY_API_KEY;
const API_SECRET = process.env.CLOUDINARY_API_SECRET;
const FOLDER = process.env.CLOUDINARY_FOLDER || "photos";

export const isCloudinaryConfigured = Boolean(CLOUD_NAME && API_KEY && API_SECRET);

if (isCloudinaryConfigured) {
  cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key: API_KEY,
    api_secret: API_SECRET,
    secure: true,
  });
}

export interface Photo {
  url: string;
  caption: string;
  tag: string;
  width: number;
  height: number;
  h: number; // display height for the masonry column layout
}

// Turns a Cloudinary public_id like "photos/dawn-swim-rockpool" into a
// readable caption — "Dawn swim rockpool" — since we don't ask the owner
// to fill in a separate caption field per photo.
function captionFromPublicId(publicId: string): string {
  const base = publicId.split("/").pop() || publicId;
  const words = base.replace(/[-_]+/g, " ").trim();
  return words.charAt(0).toUpperCase() + words.slice(1);
}

function mapResource(r: any): Photo {
  const displayHeight = Math.round(220 + (r.height / Math.max(r.width, 1)) * 120);
  return {
    url: r.secure_url,
    caption: r.context?.custom?.caption || r.context?.caption || captionFromPublicId(r.public_id),
    tag: (r.tags && r.tags[0]) || "Nature",
    width: r.width,
    height: r.height,
    h: Math.min(Math.max(displayHeight, 200), 420),
  };
}

const FALLBACK_AS_PHOTOS: Photo[] = FALLBACK_PHOTOS.map((p) => ({
  url: `https://picsum.photos/seed/${p.seed}/400/${p.h * 2}`,
  caption: p.caption,
  tag: p.tag,
  width: 400,
  height: p.h * 2,
  h: p.h,
}));

/** All photos in the configured Cloudinary folder, newest first. */
export async function getPhotos(): Promise<Photo[]> {
  if (!isCloudinaryConfigured) {
    return FALLBACK_AS_PHOTOS;
  }
  try {
    const result = await cloudinary.search
      .expression(`folder:${FOLDER}/*`)
      .sort_by("created_at", "desc")
      .with_field("context")
      .with_field("tags")
      .max_results(100)
      .execute();

    const photos = (result.resources || []).map(mapResource);
    return photos.length > 0 ? photos : FALLBACK_AS_PHOTOS;
  } catch (err) {
    console.warn("Cloudinary fetch failed, falling back to static photos:", err);
    return FALLBACK_AS_PHOTOS;
  }
}
