import cloudinary from "cloudinary"
import CloudinaryImage from "../gallery/CloudinaryImage"

export type SearchResult = {
  public_id: string
  tags: string[]
}

export default async function GalleryPage() {
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
          <h1 className="text-4xl font-bold">Gallery</h1>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {result.resources.map((result) => (
            <CloudinaryImage
              key={result.public_id}
              imageData={result}
              width="400"
              height="300"
              alt="cloudinary image"
            />
          ))}
        </div>
      </div>
    </section>
  )
}
