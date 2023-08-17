"use client"
import { useTransition } from "react"

import Heart from "@/components/icons/Heart"
import { Button } from "@/components/ui/button"
import { CldImage } from "next-cloudinary"
import { setAsFavoriteAction } from "./actions"
import { type SearchResult } from "./page"
import FullHeart from "@/components/icons/FullHeart"

export default function CloudinaryImage(
  props: any & { imageData: SearchResult }
) {
  const { imageData } = props
  const [transition, startTransition] = useTransition()

  const isFavorite = imageData.tags.includes("favorite")

  return (
    <div className="relative">
      <CldImage {...props} src={imageData.public_id} />
      <Button
        className="absolute top-2 right-2 bg-transparent border-none text-white hover:text-red-500 hover:bg-transparent focus-visible:text-red-500 "
        onClick={() => {
          startTransition(() => {
            setAsFavoriteAction(imageData.public_id, isFavorite ? true : false)
          })
        }}
      >
        {isFavorite ? <FullHeart className="text-red-500" /> : <Heart />}
      </Button>
    </div>
  )
}
