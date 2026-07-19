import { Client } from "@notionhq/client";
import { RECIPES as FALLBACK_RECIPES } from "@/lib/data";

const NOTION_API_KEY = process.env.NOTION_API_KEY;
export const NOTION_RECIPES_DATABASE_ID = process.env.NOTION_RECIPES_DATABASE_ID;

export const isNotionConfigured = Boolean(NOTION_API_KEY && NOTION_RECIPES_DATABASE_ID);

export const notion = NOTION_API_KEY ? new Client({ auth: NOTION_API_KEY }) : null;

export interface Recipe {
  id: string; // Notion page ID — used as the URL slug for the detail page
  name: string;
  time: string;
  diff: string;
  tag: string;
  imageUrl?: string;
  rating?: number;
  ingredients: string[]; // one line per ingredient
  steps: string[]; // one line per step
}

function mapPageToRecipe(page: any): Recipe {
  const props = page.properties;
  const photoFiles = props.Photo?.files ?? [];
  const firstPhoto = photoFiles[0];
  const imageUrl =
    firstPhoto?.type === "file" ? firstPhoto.file?.url : firstPhoto?.external?.url;

  const ingredientsRaw = props.Ingredients?.rich_text?.[0]?.plain_text ?? "";
  const stepsRaw = props.Steps?.rich_text?.[0]?.plain_text ?? "";

  return {
    id: page.id,
    name: props.Name?.title?.[0]?.plain_text ?? "Untitled recipe",
    time: props.Time?.rich_text?.[0]?.plain_text ?? "",
    diff: props.Difficulty?.select?.name ?? "Easy",
    tag: props.Tag?.multi_select?.[0]?.name ?? "",
    imageUrl,
    rating: typeof props.Rating?.number === "number" ? props.Rating.number : undefined,
    ingredients: ingredientsRaw.split("\n").map((s: string) => s.trim()).filter(Boolean),
    steps: stepsRaw.split("\n").map((s: string) => s.trim()).filter(Boolean),
  };
}

const FALLBACK_AS_RECIPE: Recipe[] = FALLBACK_RECIPES.map((r, i) => ({
  id: `fallback-${i}`,
  name: r.name,
  time: r.time,
  diff: r.diff,
  tag: r.tag,
  ingredients: [],
  steps: [],
}));

export async function getRecipes(): Promise<Recipe[]> {
  if (!isNotionConfigured || !notion) {
    return FALLBACK_AS_RECIPE;
  }

  try {
    // NOTE: photos uploaded directly into Notion (type "file") get a
    // temporary signed URL that expires after roughly an hour — that's
    // why Cookbook re-fetches from Notion every hour (see `revalidate`
    // in app/cookbook/page.tsx), so the displayed image link stays fresh
    // rather than going stale between refreshes.
    const response = await notion.databases.query({
      database_id: NOTION_RECIPES_DATABASE_ID as string,
      filter: { property: "Published", checkbox: { equals: true } },
    });

    const recipes = response.results.map(mapPageToRecipe);
    return recipes.length > 0 ? recipes : FALLBACK_AS_RECIPE;
  } catch (err) {
    console.warn("Notion recipe fetch failed, falling back to static list:", err);
    return FALLBACK_AS_RECIPE;
  }
}

/** Single recipe, for the /cookbook/[id] detail page. */
export async function getRecipeById(id: string): Promise<Recipe | null> {
  if (!isNotionConfigured || !notion) {
    return FALLBACK_AS_RECIPE.find((r) => r.id === id) ?? null;
  }
  try {
    const page = await notion.pages.retrieve({ page_id: id });
    return mapPageToRecipe(page);
  } catch (err) {
    console.warn("Notion single-recipe fetch failed:", err);
    return null;
  }
}
