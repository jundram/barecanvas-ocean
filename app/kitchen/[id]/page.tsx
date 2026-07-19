import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ChefHat } from "lucide-react";
import { TideCard, Pill } from "@/components/ui";
import { getRecipeById, getRecipes } from "@/lib/notion";

export const revalidate = 3600;

export async function generateStaticParams() {
  const recipes = await getRecipes();
  return recipes.map((r) => ({ id: r.id }));
}

export default async function RecipeDetailPage({ params }: { params: { id: string } }) {
  const recipe = await getRecipeById(params.id);
  if (!recipe) notFound();

  return (
    <div className="pt-32 pb-24 px-5 sm:px-10 max-w-5xl mx-auto">
      <div className="panel-glass">
      <Link href="/kitchen" className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-foam/70 hover:text-foam transition-colors duration-200 mb-8">
        <ArrowLeft size={14} /> Back to Kitchen
      </Link>

      <div className="rounded-[28px] overflow-hidden">
        {recipe.imageUrl ? (
          <img src={recipe.imageUrl} alt={recipe.name} className="w-full h-[40vh] sm:h-[52vh] object-cover" />
        ) : (
          <div className="w-full h-[30vh] bg-lagoon/10 flex items-center justify-center">
            <ChefHat size={40} strokeWidth={1} className="text-lagoon/50" />
          </div>
        )}
      </div>

      <div className="max-w-2xl mx-auto text-center mt-10 mb-14 text-foam">
        {recipe.tag && (
          <span className="text-[11px] font-medium tracking-[0.16em] uppercase text-foam/70">{recipe.tag}</span>
        )}
        <h1 className="mt-4 text-4xl sm:text-5xl font-display font-light italic leading-tight text-foam text-shadow-soft">
          {recipe.name}
        </h1>
        <div className="flex flex-wrap items-center justify-center gap-3 mt-6 text-[11px] uppercase tracking-[0.3em] text-foam/70">
          {recipe.time && <span>{recipe.time}</span>}
          {recipe.time && recipe.diff && <span>·</span>}
          {recipe.diff && <span>{recipe.diff}</span>}
          {typeof recipe.rating === "number" && (
            <>
              <span>·</span>
              <span>{recipe.rating.toFixed(1)} ★</span>
            </>
          )}
        </div>
      </div>

      <div className="grid sm:grid-cols-[1fr_1.4fr] gap-10">
        <TideCard className="p-7 h-fit">
          <h2 className="text-xs font-medium uppercase tracking-wide mb-4 text-stone dark:text-mist/60">
            Ingredients
          </h2>
          {recipe.ingredients.length > 0 ? (
            <ul className="space-y-2.5">
              {recipe.ingredients.map((ing, i) => (
                <li key={i} className="text-sm flex items-start gap-2 text-ink/75 dark:text-mist/75">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-lagoon dark:bg-cyanglow shrink-0" />
                  {ing}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-ink/60 dark:text-mist/60">
              Not added yet — fill in the Ingredients field in Notion (one per line) to show them here.
            </p>
          )}
        </TideCard>
        <div className="text-foam">
          <h2 className="text-xs font-medium uppercase tracking-wide mb-4 text-foam/70">
            Instructions
          </h2>
          {recipe.steps.length > 0 ? (
            <ol className="space-y-5">
              {recipe.steps.map((step, i) => (
                <li key={i} className="text-sm flex gap-4 leading-relaxed text-foam/90 text-shadow-soft">
                  <span className="font-display italic text-lg text-foam/70 shrink-0 leading-none">{i + 1}.</span>
                  {step}
                </li>
              ))}
            </ol>
          ) : (
            <p className="text-sm text-foam/70">
              Not added yet — fill in the Steps field in Notion (one step per line) to show them here.
            </p>
          )}
        </div>
      </div>
      </div>
    </div>
  );
}
