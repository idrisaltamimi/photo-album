"use client"
import { CldImage } from "next-cloudinary"
import { SearchResult } from "../gallery/page"

export default function AiImageEdit({
  imagedata
}: {
  imagedata: SearchResult
}) {
  return (
    <div>
      <CldImage
        src={imagedata.public_id}
        alt=""
        width={700}
        height={500}
        className="rounded-md"
        removeBackground={true}
      />
    </div>
  )
}
