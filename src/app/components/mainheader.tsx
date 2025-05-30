


import Link from 'next/link';
import { ShoppingCartIcon, UserIcon } from '@heroicons/react/24/outline';
import { cookies } from 'next/headers';

export default  async function MainHeader() {
  const cookieStore = await cookies();  
  const response =  await fetch('http://localhost:3000/api/v1/categories',{
    headers: {
      'Authorization': `Bearer ${cookieStore.get('session')?.value}`
    }
  });
  console.log(response)
  const categories = await response.json();

  return (
    <header className="z-50 py-4 sticky top-0 bg-white/90 backdrop-blur-xs nav-border-reveal">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 flex-row sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <Link className="text-2xl font-bold mr-6 py-4" href="/products">Fsport</Link>
          <nav className="flex flex-row items-center justify-center">
            <Link className="px-2 py-2 relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-black after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left" href="/products">Home</Link>
          </nav>
          {categories.map((category: any) => (
            <Link key={category.id} className="px-2 py-2 relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-black after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
              href={`/products/${category.id}`}>
              {category.name}
            </Link>
          ))}
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