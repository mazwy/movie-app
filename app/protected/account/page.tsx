import {auth, signIn, signOut} from "@/app/auth";
import {db, favoritemovies, movies} from "../../../drizzle/schema";
import RefreshButton from "@/components/refresh-button";
import {eq} from "drizzle-orm";
import {user} from "../../../drizzle/migrations/schema";
import Link from "next/link";
import FavoritesButton from "@/components/favorites-button";
import {SignOut} from "@/app/protected/page";
import {Form} from "@/app/form";
import {SubmitButton} from "@/components/submit-button";
import {EmailChangeForm} from "@/app/email-change-form";
import {router} from "next/client";

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
        <SignOut/>
      </div>

      <div
        className="bg-white/30 items-center p-12 shadow-xl ring-1 ring-gray-900/5 rounded-lg backdrop-blur-lg max-w-xl mx-auto w-full">
        <div className="flex justify-between items-center mb-4">
          <div className="space-y-1">
            <h2 className="text-xl font-semibold">{sessionEmail}</h2>
          </div>
          <RefreshButton/>
        </div>
        <div className="divide-y divide-gray-900/5">
          <div
            key={session?.user?.id}
            className="flex items-center justify-between py-3"
          >
            <div className="space-y-1">
              <p className="font-medium leading-none">email: {session?.user?.email}</p>
              <p className="font-medium leading-none">user id: {userId[0].id}</p>
            </div>
          </div>
      </div>
      </div>
      <div className="bg-white/30 items-center p-12 shadow-xl ring-1 ring-gray-900/5 rounded-lg backdrop-blur-lg max-w-xl mx-auto w-full">
        <EmailChangeForm
          action={async (formData: FormData) => {
            'use server';
            await db.update(user).set({email: formData.get("email")!.toString()}).where(eq(user.id, userId[0].id));
            await signOut();
          }}
        >
          <SubmitButton>Change email</SubmitButton>
        </EmailChangeForm>
      </div>
    </>
  );
}
