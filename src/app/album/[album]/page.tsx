import { SearchResult } from "@/app/gallery/page"
import GalleryImage from "@/components/gallery-image"
import cloudinary from "cloudinary"

export default async function AlbumPage({
  params
}: {
  params: { album: string }
}) {
  const result = (await cloudinary.v2.search
    .expression(`resource_type:image AND folder=${params.album}`)
    .sort_by("created_at", "desc")
    .with_field("tags")
    .max_results(30)
    .execute()) as { resources: SearchResult[] }

  return (
    <section>
      <div className="flex flex-col gap-8">
        <div className="flex justify-between">
          <h1 className="text-4xl font-bold capitalize">{params.album}</h1>
        </div>

        <GalleryImage imagedata={result.resources} />
      </div>
    </section>
  )
}
