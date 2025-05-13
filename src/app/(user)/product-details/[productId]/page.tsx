'use client'

import Image from "next/image";
import { useEffect, useState } from "react";

interface Option {
    id: string;
    name: string;
    price: number;
}

interface ProductOption {
    id: string;
    name: string;
    options: Option[];
}

const productOptions: ProductOption[] = [
    {
        id: 'material',
        name: 'Material',
        options: [
            { id: 'cotton', name: 'Cotton', price: 0 },
            { id: 'polyester', name: 'Polyester', price: 0 },
            { id: 'wool', name: 'Wool', price: 10 },
            { id: 'linen', name: 'Linen', price: 15 },
            { id: 'silk', name: 'Silk', price: 20 },
        ]
    }
];

const basePrice = 299.99;

export default function ProductDetailsPage({ params }: { params: { productId: string } }) {
    const { productId } = params;
    console.log(productId);
    const [product, setProduct] = useState<any>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            const response = await fetch(`http://localhost:3000/products/${productId}`);
            const product = await response.json();
            setProduct(product);
        };
        fetchProduct();
    }, []);

    return (
        <main className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="relative aspect-square rounded-lg overflow-hidden bg-neutral-100">
                    <Image
                        src="/images/product-placeholder.svg"
                        alt="Product"
                        fill
                        className="object-cover"
                    />
                </div>

                <div className="flex flex-col h-full">
                    <div className="space-y-6">
                        <h1 className="text-3xl font-bold text-neutral-900">{product?.name}</h1>
                        <div className="space-y-1">
                            <p className="text-sm text-neutral-500">Base Price</p>
                            <p className="text-2xl font-semibold text-neutral-700">${product?.base_price}</p>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto mt-6">
                        <div className="border-t border-neutral-200 pt-6">
                            <h2 className="text-xl font-semibold text-neutral-900 mb-4">Description</h2>
                            <div className="prose prose-neutral">
                                <p className="text-neutral-600 mb-4">
                                    {product?.description}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6 mt-6">
                        <div className="bg-red-50 border border-red-200 rounded-md p-4">
                            <h3 className="text-red-800 font-medium mb-2">Compatibility Issues</h3>
                            <ul className="list-disc list-inside space-y-1">
                                <li className="text-red-700 text-sm">Silk material is not compatible with Wool material</li>
                                <li className="text-red-700 text-sm">Linen material is not compatible with Cotton material</li>
                            </ul>
                        </div>

                        {product?.components.map((component: any) => (
                            <div key={component.id} className="space-y-2">
                                <h3 className="text-lg font-medium text-neutral-900">{component.name}</h3>
                                <div className="flex flex-wrap gap-2">
                                    {/* {option.options.map((opt) => (
                                        <div
                                            key={opt.id}
                                            className="px-4 py-2 border border-neutral-300 rounded-md"
                                        >
                                            {opt.name}
                                            {opt.price > 0 && (
                                                <span className="ml-1 text-sm text-neutral-500">
                                                    (+${opt.price})
                                                </span>
                                            )}
                                        </div>
                                    ))} */}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="w-full bg-black text-white py-3 px-6 rounded-md flex items-center justify-between mt-6">
                        <span>Add to Cart</span>
                        <span className="font-medium">${basePrice}</span>
                    </div>
                </div>
            </div>
        </main>
    )
}   