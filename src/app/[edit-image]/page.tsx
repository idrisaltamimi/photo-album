import cloudinary from "cloudinary"

import { SearchResult } from "../gallery/page"
import AiImageEdit from "./ai-image-edit"

export default async function EditImage({
  params
}: {
  params: { ["edit-image"]: string }
}) {
  const result = (
    await cloudinary.v2.search
      .expression(`resource_type:image AND asset_id=${params["edit-image"]}`)
      .sort_by("created_at", "desc")
      .with_field("tags")
      .max_results(30)
      .execute()
  ).resources[0] as SearchResult

  return (
    <section>
      <div className="flex flex-col gap-8">
        <div className="flex justify-between">
          <h1 className="text-4xl font-bold">Edit Image</h1>
        </div>

        <AiImageEdit imagedata={result} />
      </div>
    </section>
  )
}
