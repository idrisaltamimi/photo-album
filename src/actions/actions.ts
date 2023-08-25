"use server"

import cloudinary from "cloudinary"

export async function setAsFavoriteAction(
  publicId: string,
  isFavorite: boolean
) {
  if (isFavorite) {
    await cloudinary.v2.uploader.remove_tag("favorite", [publicId])
  } else {
    await cloudinary.v2.uploader.add_tag("favorite", [publicId])
  }
}

export async function setAlbumAction(album: string, publicId: string) {
  await cloudinary.v2.api.create_folder(album)
  cloudinary.v2.uploader.rename(publicId, `${album}/${publicId}`)
}
