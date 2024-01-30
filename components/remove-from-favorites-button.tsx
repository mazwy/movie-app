// 'use client';
//
// import React, {useState} from "react";
// import {db, favoritemovies} from "../drizzle/schema";
// import {eq} from "drizzle-orm";
//
// function RemoveFromFavorites({id} : {id: number}) {
//   const [buttonState, setButtonState] = useState('Remove');
//
//   return (
//     <form
//       action={async () => {
//         'use server';
//         await db.delete(favoritemovies).where(eq(favoritemovies.id, id));
//         setButtonState('Removed');
//       }}
//     >
//       <button
//         className="px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-600 transition-colors text-white"
//         type="submit"
//       >
//         {buttonState}
//       </button>
//     </form>
//   );
// }
