"use client"
import { type SearchResult } from "../app/gallery/page"
import CloudinaryImage from "./cloudinary-image"

type GalleryImageType = {
  imagedata: SearchResult[]
}

export default function GalleryImage({ imagedata }: GalleryImageType) {
  const MAX_COLS = 4

  const getColumns = (columnIndex: number) => {
    return imagedata.filter((_, index) => index % MAX_COLS === columnIndex)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {[getColumns(0), getColumns(1), getColumns(2), getColumns(3)].map(
        (column) => (
          <div className="flex flex-col gap-4" key={crypto.randomUUID()}>
            {column.map((result) => (
              <CloudinaryImage
                key={result.public_id}
                imagedata={result}
                width="400"
                height="300"
                loading="lazy"
                alt="cloudinary image"
              />
            ))}
          </div>
        )
      )}
    </div>
  )
}
