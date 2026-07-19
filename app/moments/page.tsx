import { DriftHeading, TideDivider } from "@/components/ui";
import { getPhotos } from "@/lib/cloudinary";
import MomentsGallery from "@/components/MomentsGallery";

export const revalidate = 300;

export default async function MomentsPage() {
  const photos = await getPhotos();

  return (
    <div className="pt-32 pb-24 px-5 sm:px-10 max-w-5xl mx-auto">
      <div className="panel-glass">
      <DriftHeading eyebrow="III · The Shoreline of Memory">
        Moments
      </DriftHeading>
      <p className="mt-8 text-lg sm:text-xl font-display italic font-light leading-[1.8] text-foam/90 max-w-xl mx-auto text-center">
        Quiet fragments of life, captured in light and colour. Places
        visited, memories held, and stories that words cannot tell.
      </p>
      <TideDivider />
      <MomentsGallery photos={photos} />
      </div>
    </div>
  );
}
