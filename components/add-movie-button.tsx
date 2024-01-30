// 'use client';
//
// import React, { useState } from 'react';
//
// const AddMovieButton = () => {
//   // State to track if button is expanded or not
//   const [isExpanded, setIsExpanded] = useState(false);
//
//   // Function to toggle the state
//   const toggleExpand = () => {
//     setIsExpanded(!isExpanded);
//   };
//
//   // Determine the button's class based on the state
//   const buttonClass = isExpanded
//     ? "fixed bottom-4 right-4 px-8 py-4 text-xl rounded-md bg-blue-600 hover:bg-blue-700 transition-all duration-300"
//     : "fixed bottom-4 right-4 px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-600 transition-all duration-300";
//
//   return (
//     <div>
//       <button
//         type="button"
//         onClick={toggleExpand} // Set the click handler
//         className={buttonClass} // Apply classes based on state
//       >
//         Add a Movie
//       </button>
//     </div>
//   );
// };
//
// export default AddMovieButton;
