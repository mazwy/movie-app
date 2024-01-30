'use client';

import {useRouter} from "next/navigation";
import React, {useTransition} from "react";
import Link from "next/link";

export default function FavoritesButton() {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  return (
    <div>
      <Link href="/protected/favorite">
        <button
          type="button"
          onClick={() => {
            startTransition(() => {
              router.push("/protected/favorite")
            })
          }}
          className="px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-600 transition-colors"
        >
          Favorites
        </button>
      </Link>
    </div>
  )
}