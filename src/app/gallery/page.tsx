import ForceRefresh from "@/components/force-refresh"
import cloudinary from "cloudinary"

import Gallery from "./gallery"

export type SearchResult = {
  public_id: string
  tags: string[]
}

export default async function GalleryPage() {
  const result = (await cloudinary.v2.search
    .expression("resource_type:image")
    .sort_by("created_at", "desc")
    .with_field("tags")
    .max_results(30)
    .execute()) as { resources: SearchResult[] }

  return (
    <section>
      {/* <ForceRefresh /> */}
      <Gallery imagedata={result.resources} />
    </section>
  )
}
