'use client';

import {useRouter} from "next/navigation";
import React, {useTransition} from "react";
import Link from "next/link";

export default function AccountButton() {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  return (
    <div>
      <Link href="/protected/account">
      <button
        type="button"
        onClick={() => {
          startTransition(() => {
            router.push("/protected/account")
          })
        }}
        className="px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-600 transition-colors"
        >
          Account
        </button>
      </Link>
    </div>
  )
}