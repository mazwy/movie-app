import {db, users} from "../drizzle/schema";

export default async function MoviesTable() {
  let movies = await db.select().from(users);

  return (
    <div className="divide-y divide-gray-900/5">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="flex items-center justify-between py-3">
          <div className="flex items-center space-x-4">
            <div className="h-12 w-12 rounded-full bg-gray-200 animate-pulse"/>
            <div className="space-y-1">
              <div className="h-6 w-28 rounded-md bg-gray-200 animate-pulse"/>
              <div className="h-4 w-24 rounded-md bg-gray-200 animate-pulse"/>
            </div>
          </div>
          <div className="h-4 w-12 rounded-md bg-gray-200 animate-pulse"/>
        </div>
      ))}
    </div>
  );
};
