import Link from "next/link";

export default function Home() {
  return (
    <div className="w-screen h-screen bg-black flex justify-center items-center  text-white">
      <div className="w-full max-w-[600px] mx-auto">
        <h1 className="text-6xl mb-4"> Your ultimate journaling App .</h1>
        <p className="text-2xl  text-white/60 mb-4">
          this is the best app for tracking your mood ovetime .
        </p>
        <div>
          <Link href="/journal">
            <button className="bg-blue-600 px-4 py-2 rounded-lg text-xl">
              get Started
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}