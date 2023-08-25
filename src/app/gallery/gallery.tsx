"use client"
import { FormEvent, useRef, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import UploadButton from "./upload-button"
import GalleryImage from "@/components/gallery-image"
import { type SearchResult } from "./page"
import { Label } from "@/components/ui/label"

export default function Gallery({ imagedata }: { imagedata: SearchResult[] }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    router.replace(
      `/gallery?search_tags=${inputRef.current ? inputRef.current.value : ""}`
    )
  }

  const searchTags = searchParams.get("search_tags") || ""

  const data =
    searchTags === ""
      ? imagedata
      : imagedata.filter((image) => image.tags.includes(searchTags))

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between">
        <h1 className="text-4xl font-bold">Gallery</h1>
        <UploadButton />
      </div>

      <form onSubmit={handleSubmit}>
        <Label htmlFor="search">Search images by tags</Label>
        <div className="flex items-center gap-4 mt-2">
          <Input id="search" type="text" ref={inputRef} />
          <Button type="submit">Search</Button>
        </div>
      </form>

      <GalleryImage imagedata={data} />
    </div>
  )
}
