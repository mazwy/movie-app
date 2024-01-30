import { auth, signOut } from 'app/auth';
import React from "react";
import {db, favoritemovies, genres} from "../../drizzle/schema";
import {movie, user} from "../../drizzle/migrations/schema";
import RefreshButton from "@/components/refresh-button";
import Link from "next/link";
import {desc, eq} from "drizzle-orm";
import FavoritesButton from "@/components/favorites-button";
import AccountButton from "@/components/account-button";


export default async function ProtectedPage() {
  let session = await auth();

  const sessionEmail: any = session?.user?.email;
  const userId = await db.select().from(user).where(eq(user.email, sessionEmail.toString()));

  let movies = await db.select().from(movie).innerJoin(genres, eq(movie.genreId, genres.id));

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
            <h2 className="text-xl font-semibold">Movie list</h2>
            <p className="text-sm text-gray-500">
              Fetched {movies.length} movies
            </p>
          </div>
          <RefreshButton/>
        </div>
        <div className="divide-y divide-gray-900/5">
          {movies.map((m) => (
            <div
              key={m.movie.id}
              className="flex items-center justify-between py-3"
            >
              <div className="space-y-1">
                <p className="font-medium leading-none">{m.movie.title}</p>
                <p className="text-sm text-gray-500">rated: {m.movie.rated}</p>
                <p className="text-sm text-gray-500">genre: {m.genre.name}</p>
              </div>
              <AddFavoriteMovie movieId={m.movie.id} userId={userId[0].id}/>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export function SignOut() {
  return (
    <form
      action={async () => {
        'use server';
        await signOut();
      }}
    >
      <button
        className="px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-600 transition-colors"
        type="submit">Sign out</button>
    </form>
  );
}

function AddFavoriteMovie({movieId, userId} : {movieId: number, userId: number}) {
  return (
    <form
      action={async () => {
        'use server';
        let maxId = await db.select({field1: favoritemovies.id})
          .from(favoritemovies)
          .orderBy(desc(favoritemovies.id))
          .limit(1);

        if (maxId.length === 0) {
          maxId = [{field1: 0}];
        }

        const newId = maxId[0].field1 + 1;

        try {
          await db.insert(favoritemovies).values({
            id: newId,
            userId: userId,
            movieId: movieId,
            added_at: new Date(),
          });
        } catch (e) {
        }
      }}
    >
      <button
        className="px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-600 transition-colors text-white"
        type="submit"
      >
        Add
      </button>
    </form>
  );
}