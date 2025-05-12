import Link from 'next/link';

export default function MainHeader() {
  return (
   <header className="py-4 h-16">
    <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-4 flex-row sm:px-6 lg:px-8">
      <div className="flex items-center gap-4">
        <Link className="text-2xl font-bold px-6 py-4" href="/products">Fsport</Link>
        <nav className="flex flex-row items-center justify-center">
          <Link className="px-2 py-2 relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-black after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left" href="/products">Home</Link>
        </nav>
      </div>

      <div className="flex flex-row items-center gap-4">
        <Link className="px-2 py-2 relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-black after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left" href="/products">Cart</Link>
        <Link className="px-2 py-2 relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-black after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left" href="/products">Account</Link>
      </div>
    </div>
   </header>
  );
}