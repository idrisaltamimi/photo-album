"use client"
import { ChangeEvent, FormEvent, useState, useTransition } from "react"
import { usePathname } from "next/navigation"
import { CldImage } from "next-cloudinary"

import FullHeart from "@/components/icons/full-heart"
import { Button } from "@/components/ui/button"
import { setAlbumAction, setAsFavoriteAction } from "../actions/actions"
import { type SearchResult } from "../app/gallery/page"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export default function CloudinaryImage(
  props: any & { imagedata: SearchResult }
) {
  const { imagedata } = props
  const checkFavoriteImage = imagedata.tags.includes("favorite")

  const [transition, startTransition] = useTransition()
  const [isFavorite, setIsFavorite] = useState(checkFavoriteImage)
  const pathname = usePathname()
  const [openDialog, setOpenDialog] = useState(false)
  const [albumName, setAlbumName] = useState("")

  const handleFavoriteAction = () => {
    setIsFavorite((prev: boolean) => !prev)
    startTransition(() => {
      setAsFavoriteAction(imagedata.public_id, isFavorite ? true : false)
    })
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAlbumName(e.target.value)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    await setAlbumAction(albumName, imagedata.public_id)
    setOpenDialog(false)
  }

  if (pathname === "/favorite" && !isFavorite) return <></>
  return (
    <div className="relative">
      <CldImage {...props} src={imagedata.public_id} className="rounded-md" />
      <div className="absolute top-2 right-2 flex items-center justify-between w-full">
        <Button
          className="bg-transparent border-none text-white hover:text-red-500 hover:bg-transparent focus-visible:text-red-500 "
          onClick={handleFavoriteAction}
        >
          <FullHeart
            className={`hover:text-white transition-colors ${
              isFavorite ? "text-red-500" : "text-transparent stroke-white"
            }  transition-colors`}
          />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">{burgerIcon}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuGroup>
              <DropdownMenuItem
                className="flex items-center gap-4 py-2 cursor-pointer"
                onClick={() => setOpenDialog(true)}
              >
                {albumIcon}
                <span>Add to Album</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="flex items-center gap-4 py-2 cursor-pointer"
                asChild
              >
                <Link href={`/${imagedata.asset_id}`}>
                  {editIcon}
                  <span>Edit Photo</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <Dialog
          open={openDialog}
          onOpenChange={() => {
            setOpenDialog(false)
          }}
        >
          <DialogContent className="sm:max-w-[425px]">
            <form onSubmit={handleSubmit}>
              <DialogHeader>
                <DialogTitle>Add to Album</DialogTitle>
                <DialogDescription>
                  Type an album you want to move this image into.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Album
                  </Label>
                  <Input
                    id="name"
                    value={albumName}
                    onChange={handleChange}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Add to Album</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

const burgerIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-6 h-6"
  >
    <path
      fillRule="evenodd"
      d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
      clipRule="evenodd"
    />
  </svg>
)

const albumIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-6 h-6"
  >
    <path
      fillRule="evenodd"
      d="M19.5 21a3 3 0 003-3V9a3 3 0 00-3-3h-5.379a.75.75 0 01-.53-.22L11.47 3.66A2.25 2.25 0 009.879 3H4.5a3 3 0 00-3 3v12a3 3 0 003 3h15zm-6.75-10.5a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V10.5z"
      clipRule="evenodd"
    />
  </svg>
)

const editIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-6 h-6"
  >
    <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
  </svg>
)
