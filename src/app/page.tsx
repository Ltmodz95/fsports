import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen relative">
      <div className="absolute top-0 left-0 w-full h-full z-10">
        <video src="/videos/landing_page_video.mp4" autoPlay muted loop className="w-full h-full object-cover" />
      </div>
      <div className="absolute z-20 inset-0 flex justify-center items-center flex-col" style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
        <div className="text-white text-center">
          <p className="text-5xl font-bold mb-4 italic">Gear Up, Go All Out!</p>
          <p className="text-3xl font-bold mb-4">Find Every Essential You Need to Conquer Your Next Challenge.</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <Link href="/products" className="mt-8 px-8 py-3 bg-white text-black rounded-full text-lg font-semibold hover:bg-black hover:text-white transition-all duration-300 hover:scale-105 hover:shadow-lg whitespace-nowrap">
            Check the Gear
          </Link>
        </div>
      </div>

    </div>
  );
}
