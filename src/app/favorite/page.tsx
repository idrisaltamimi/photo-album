import GalleryImage from "@/components/gallery-image"
import cloudinary from "cloudinary"

export type SearchResult = {
  public_id: string
  tags: string[]
}

export default async function FavoritePage() {
  const result = (await cloudinary.v2.search
    .expression("resource_type:image AND tags=favorite")
    .sort_by("created_at", "desc")
    .with_field("tags")
    .max_results(30)
    .execute()) as { resources: SearchResult[] }

  return (
    <section>
      <div className="flex flex-col gap-8">
        <div className="flex justify-between">
          <h1 className="text-4xl font-bold">Favorites</h1>
        </div>

        <GalleryImage imagedata={result.resources} />
      </div>
    </section>
  )
}
