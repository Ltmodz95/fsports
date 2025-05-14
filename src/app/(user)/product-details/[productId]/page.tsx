'use client'

import Image from "next/image";
import { use, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
export default function ProductDetailsPage({ params }: { params: Promise<{ productId: string }> }) {
    const { productId } = use(params);
    const [product, setProduct] = useState<any>(null);
    const [price, setPrice] = useState<any>(null);
    const [selectedOptions, setSelectedOptions] = useState<any>({});
    const [compatibilityIssues, setCompatibilityIssues] = useState<any>([]);
    const [adjustments, setAdjustments] = useState<any>(null);
    const router = useRouter();
    const token = Cookies.get('session');
    useEffect(() => {
        const fetchProduct = async () => {
            const response = await fetch(`http://localhost:3000/api/v1/products/${productId}`,{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const product = await response.json();
            setProduct(product);
        };
        fetchProduct();
    }, []);

    useEffect(() => {
        checkCompatibility();
        calculatePrice();
    }, [selectedOptions]);

    const checkCompatibility = async () => {
        const response = await fetch(`http://localhost:3000/api/v1/options/check_compatibility`, {
            method: 'POST',
            body: JSON.stringify({
                selected_options: Object.values(selectedOptions)
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const inCompatibilityMessages = await response.json();
        setCompatibilityIssues(inCompatibilityMessages);
    }

    const handleOptionSelection = async (componentId: string, optionId: string) => {
        if (selectedOptions[componentId] === optionId) {
            const newSelectedOptions = { ...selectedOptions };
            delete newSelectedOptions[componentId];
            setSelectedOptions(newSelectedOptions);
            return;
        }
        setSelectedOptions({ ...selectedOptions, [componentId]: optionId });
    };

    const calculatePrice = async () => {
        const response = await fetch(`http://localhost:3000/api/v1/products/calculate_product_price`, {
            method: 'POST',
            body: JSON.stringify({
                product_id: productId,
                selected_options: Object.values(selectedOptions)
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        setPrice(data['total']);
        setAdjustments(data['adjustments']);
    }

    const handleAddToCart = async () => {
        if (compatibilityIssues.length > 0) return;

        const response = await fetch(`http://localhost:3000/api/v1/cart_items`, {
            method: 'POST',
            body: JSON.stringify({
                    product_id: productId,
                    selected_options: Object.values(selectedOptions)
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            router.push('/shopping-cart');
        }
        else {
            console.log("failed to add to cart");
        }
    };

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
                        {compatibilityIssues.length > 0 && <div className="bg-red-50 border border-red-200 rounded-md p-4">
                            <h3 className="text-red-800 font-medium mb-2">Compatibility Issues</h3>
                            <ul className="list-disc list-inside space-y-1">
                                {compatibilityIssues.map((issue: any, index: number) => (
                                    <li key={index} className="text-red-700 text-sm">{issue}</li>
                                ))}
                            </ul>
                        </div>}

                        {product?.components.map((component: any) => (
                            <div key={component.id} className="space-y-2">
                                <h3 className="text-lg font-medium text-neutral-900">{component.name}</h3>
                                <div className="flex flex-wrap gap-2">
                                    {component.options.map((opt: any) => (
                                        <div
                                            style={{
                                                backgroundColor: selectedOptions[component.id] === opt.id ? 'black' : 'white',
                                                color: selectedOptions[component.id] === opt.id ? 'white' : 'black',
                                            }}
                                            onClick={() => handleOptionSelection(component.id, opt.id)}
                                            key={opt.id}
                                            className="px-4 py-2 border border-neutral-300 rounded-md cursor-pointer hover:bg-neutral-100 transition-all duration-300"
                                        >
                                            {opt.name}
                                            <span className="ml-1 text-sm text-neutral-500" style={{
                                                color: selectedOptions[component.id] === opt.id ? 'white' : '',
                                            }}>
                                                (+${opt.price})
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    <button 
                        onClick={handleAddToCart}
                        disabled={compatibilityIssues.length > 0}
                        className={`w-full py-3 px-6 rounded-md flex items-center cursor-pointer justify-between mt-6 transition-colors ${
                            compatibilityIssues.length > 0 
                                ? 'bg-neutral-300 text-neutral-500 cursor-not-allowed' 
                                : 'bg-black text-white hover:bg-neutral-800'
                        }`}
                    >
                        <span>Add to Cart</span>
                        <span className="font-medium">${price || product?.base_price}</span>
                    </button>

                    <div className="mt-2 text-sm text-neutral-500 flex items-center justify-center gap-2">
                        { adjustments !== 0 && <span className="font-medium">* a total of {adjustments}$ is {adjustments > 0 ? 'added' : 'subtracted'} to the price, based on the selected options</span>}
                    </div>
                </div>
            </div>
        </main>
    )
}   