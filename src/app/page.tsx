"use client"

import { CldUploadButton } from "next-cloudinary"
import { CldImage } from "next-cloudinary"
import { useState } from "react"

export type UploadType = {
  info: {
    public_id: string
  }
  event: "success"
}

export default function Home() {
  const [imageId, setImageId] = useState("")

  return (
    <main className="flex min-h-screen flex-col items-center gap-8 p-24">
      <CldUploadButton
        onUpload={(result: UploadType | any) => {
          setImageId(result.info.public_id)
        }}
        uploadPreset="up0lliqg"
      />

      {imageId !== "" && (
        <CldImage
          width="900"
          height="600"
          src={imageId}
          sizes="100vw"
          alt="Description of my image"
        />
      )}
    </main>
  )
}
