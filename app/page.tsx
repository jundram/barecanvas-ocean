import { getBareDraftPosts } from "@/lib/wordpress";
import { getRecipes } from "@/lib/notion";
import { getPhotos } from "@/lib/cloudinary";
import { QUOTES } from "@/lib/data";
import HomeJourney from "@/components/HomeJourney";

export const revalidate = 3600;

export default async function HomePage() {
  const [posts, recipes, photos] = await Promise.all([getBareDraftPosts(1), getRecipes(), getPhotos()]);
  const quote = QUOTES[Math.floor(Math.random() * QUOTES.length)];

  return (
    <HomeJourney
      post={posts[0]}
      recipe={recipes[0]}
      photo={photos[0]}
      quote={quote}
    />
  );
}
