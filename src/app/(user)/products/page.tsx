import Image from 'next/image'
import Link from 'next/link'
import { cookies } from 'next/headers'

export default async function ProductsPage() {
    const cookieStore = await cookies();
    const token = cookieStore.get('session')?.value;
    const response = await fetch('http://localhost:3000/products',{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    const products = await response.json();

    return (
        <main className="container mx-auto max-w-7xl grid grid-cols-1 sm:grid-cols-2 gap-6 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
            {products.map((product: any) => (
                <Link key={product.id} href={`/product-details/${product.id}`}>
                    <article className="hover:scale-95 transition-all duration-300 cursor-pointer">
                        <div className="relative rounded-lg aspect-square w-full overflow-hidden bg-neutral-100">
                    <Image src="/images/product-placeholder.svg"
                        alt="product"
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                        className="object-cover object-center transition-opacity group-hover:opacity-75" />
                </div>
                <div className="p-2">
                    <h2 className="text-xl font-bold text-neutral-700">{product.name}</h2>
                    <footer className="text-base font-normal text-neutral-900">
                        <p>{product.base_price}</p></footer>
                            </div>
                    </article>
                </Link>
            ))}
        </main>
    )
}
