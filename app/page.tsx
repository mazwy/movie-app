import Link from 'next/link';

export default function Page() {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <div className="text-center max-w-screen-sm mb-10">
        <h1 className="text-stone-800 font-bold text-2xl">
          Movie app
        </h1>
      </div>
      <div className="flex space-x-3">
        <Link
          href="/protected"
          className="text-stone-400 underline hover:text-stone-200 transition-all justify-center items-center"
        >
          Login
        </Link>
      </div>
    </div>
  );
}
