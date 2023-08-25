"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { Button } from "@/components/ui/button"
import { type FolderDataType } from "./layout"
import Heart from "../components/icons/heart"

export function SideMenu({ result }: { result: FolderDataType }) {
  const [toggleAlbum, setToggleAlbum] = useState(false)
  const pathname = usePathname()
  const [currentPath, setCurrentPath] = useState("")

  const activePath = (path: string) => {
    if (currentPath !== "") {
      return currentPath === path ? "secondary" : "ghost"
    }
    return pathname === path ? "secondary" : "ghost"
  }

  return (
    <div className="pb-12 w-1/5">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Manage
          </h2>
          <div className="space-y-1">
            <Button
              asChild
              variant={activePath("/gallery")}
              className="w-full justify-start gap-2"
              onClick={() => setCurrentPath("/gallery")}
            >
              <Link href="/gallery">
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
                    d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                  />
                </svg>
                Gallery
              </Link>
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start gap-2"
              onClick={() => setToggleAlbum((prev) => !prev)}
            >
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
                  d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
                />
              </svg>
              Albums
            </Button>
            <ul
              className={`${
                toggleAlbum ? "h-full" : "h-0"
              } overflow-hidden transition-all`}
            >
              {result.folders.map((folder) => (
                <li
                  key={folder.path}
                  className="pl-8 relative before:absolute before:top-0 before:left-[22px] before:h-full before:w-[1px] before:bg-white before:opacity-20 after:opacity-20 last:before:h-[53%] last:before:rounded-b-full first:before:rounded-t-full after:absolute after:top-1/2 after:left-[22px] after:h-[1px] after:w-[10px] after:bg-white"
                >
                  <Button
                    asChild
                    variant={activePath(`/album/${folder.path}`)}
                    className="w-full justify-start gap-2"
                    onClick={() => setCurrentPath(`/album/${folder.path}`)}
                  >
                    <Link href={`/album/${folder.path}`}>{folder.name}</Link>
                  </Button>
                </li>
              ))}
            </ul>
            <Button
              asChild
              variant={activePath("/favorite")}
              className="w-full justify-start gap-2"
              onClick={() => setCurrentPath("/favorite")}
            >
              <Link href="/favorite">
                <Heart />
                Favorites
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
