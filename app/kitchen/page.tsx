import { DriftHeading, TideDivider } from "@/components/ui";
import { getRecipes } from "@/lib/notion";
import KitchenList from "@/components/KitchenList";

export const revalidate = 3600;

export default async function KitchenPage() {
  const recipes = await getRecipes();

  return (
    <div className="pt-32 pb-24 px-5 sm:px-10 max-w-5xl mx-auto">
      <div className="panel-glass">
      <DriftHeading eyebrow="II · The Hearth Hour">
        Kitchen
      </DriftHeading>
      <p className="mt-8 text-lg sm:text-xl font-display italic font-light leading-[1.8] text-foam/90 max-w-xl mx-auto text-center">
        Every dish is a small ritual — a way to slow down, nourish your
        body, and create moments worth remembering.
      </p>
      <TideDivider />
      <KitchenList recipes={recipes} />
      </div>
    </div>
  );
}
