import {auth} from "@/app/auth";
import {db, favoritemovies, movies} from "../../../drizzle/schema";
import RefreshButton from "@/components/refresh-button";
import {eq} from "drizzle-orm";
import {user} from "../../../drizzle/migrations/schema";
import Link from "next/link";
import FavoritesButton from "@/components/favorites-button";
import {SignOut} from "@/app/protected/page";
import AccountButton from "@/components/account-button";
import React from "react";

export default async function FavoritePage() {
  let session = await auth();

  const sessionEmail: any = session?.user?.email;
  const userId = await db.select().from(user).where(eq(user.email, sessionEmail.toString()));

  console.log(userId[0].id);

  let moviesData = await db
    .select()
    .from(favoritemovies)
    .where(eq(favoritemovies.userId, userId[0].id))
    .innerJoin(movies, eq(favoritemovies.movieId, movies.id));

  console.log(moviesData);

  return (
    <>
      <div className="bg-gray-800 p-4 flex justify-between items-center text-white">
        <Link href={"/protected"}>
          <h1 className="text-lg font-semibold">Movie App</h1>
        </Link>
        <FavoritesButton/>
        <AccountButton/>
        <SignOut/>
      </div>

      <div
        className="bg-white/30 p-12 shadow-xl ring-1 ring-gray-900/5 rounded-lg backdrop-blur-lg max-w-xl mx-auto w-full">
        <div className="flex justify-between items-center mb-4">
          <div className="space-y-1">
            <h2 className="text-xl font-semibold">{sessionEmail}&apos;s favorites</h2>
            <p className="text-sm text-gray-500">
              Fetched {moviesData.length} movies
            </p>
          </div>
          <RefreshButton/>
        </div>
        <div className="divide-y divide-gray-900/5">
          {moviesData.map((m) => (
            <div
              key={m.movie.id}
              className="flex items-center justify-between py-3"
            >
              <div className="space-y-1">
                <p className="font-medium leading-none">{m.movie.title}</p>
                <p className="text-sm text-gray-500">rated: {m.movie.rated}</p>
                <p className="text-sm text-gray-500">added: {m.favoritemovie.added_at?.toDateString()}</p>
              </div>
              <RemoveFromFavorites id={m.favoritemovie.id} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function RemoveFromFavorites({id} : {id: number}) {
  return (
    <form
      action={async () => {
        'use server';
          await db.delete(favoritemovies).where(eq(favoritemovies.id, id));
      }}
    >
      <button
        className="px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-600 transition-colors text-white"
        type="submit"
      >
        Remove
      </button>
    </form>
  );
}
