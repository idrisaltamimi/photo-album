"use client"

import { useState } from "react"
import { CldUploadButton } from "next-cloudinary"

import { UploadType } from "../page"
import { Button } from "@/components/ui/button"

export default function GalleryPage() {
  const [imageId, setImageId] = useState("")

  return (
    <section>
      <div className="flex justify-between">
        <h1 className="text-4xl font-bold">Gallery</h1>

        <Button asChild>
          <div className="flex gap-2 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
              />
            </svg>

            <CldUploadButton
              onUpload={(result: UploadType | any) => {
                setImageId(result.info.public_id)
              }}
              uploadPreset="up0lliqg"
            />
          </div>
        </Button>
      </div>
    </section>
  )
}
