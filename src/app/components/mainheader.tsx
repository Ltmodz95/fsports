import Link from 'next/link';
import { ShoppingCartIcon, UserIcon } from '@heroicons/react/24/outline';

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
        <Link className="p-2 relative group" href="/products">
          <ShoppingCartIcon className="h-6 w-6 transition-all duration-300 hover:stroke-2" />
          <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">3</span>
          <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs py-1.5 px-2.5 rounded opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 whitespace-nowrap">
            Total: $299.99
          </span>
        </Link>
        <Link className="p-2" href="/products">
          <UserIcon className="h-6 w-6 transition-all duration-300 hover:stroke-2" />
        </Link>
      </div>
    </div>
   </header>
  );
}