'use client'

import Image from "next/image"
import Link from "next/link"

export default function ShoppingCartPage() {
    return (
        <main className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold text-neutral-900 mb-8">Shopping Cart</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2">
                    <div className="space-y-6">
                        {/* Cart Item 1 */}
                        <div className="border border-neutral-200 rounded-lg overflow-hidden">
                            <div className="p-4 bg-neutral-50 border-b border-neutral-200">
                                <h3 className="font-medium text-neutral-900">Classic T-Shirt</h3>
                            </div>
                            
                            <div className="p-4">
                                <div className="flex gap-4">
                                    <div className="relative w-24 h-24 rounded-md overflow-hidden bg-neutral-100">
                                        <Image
                                            src="/images/product-placeholder.svg"
                                            alt="Classic T-Shirt"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    
                                    <div className="flex-1">
                                        <div className="space-y-2">
                                            <div className="flex justify-between items-start">
                                                <div className="space-y-1">
                                                    <p className="text-sm text-neutral-600">Material: <span className="text-neutral-900">Cotton</span></p>
                                                    <p className="text-sm text-neutral-600">Size: <span className="text-neutral-900">Medium</span></p>
                                                    <p className="text-sm text-neutral-600">Color: <span className="text-neutral-900">Black</span></p>
                                                    <p className="text-sm text-neutral-600">Style: <span className="text-neutral-900">Classic</span></p>
                                                    <p className="text-sm text-neutral-600">Fit: <span className="text-neutral-900">Regular</span></p>
                                                </div>
                                                <button className="text-red-600 hover:text-red-700 text-sm">
                                                    Remove
                                                </button>
                                            </div>
                                            
                                            <div className="flex items-center justify-between pt-2">
                                                <div className="flex items-center border border-neutral-200 rounded-md">
                                                    <button className="px-3 py-1 text-neutral-600 hover:bg-neutral-100">
                                                        -
                                                    </button>
                                                    <span className="px-3 py-1">1</span>
                                                    <button className="px-3 py-1 text-neutral-600 hover:bg-neutral-100">
                                                        +
                                                    </button>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-sm text-neutral-600">Price per item</p>
                                                    <p className="font-medium text-neutral-900">$299.99</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Cart Item 2 */}
                        <div className="border border-neutral-200 rounded-lg overflow-hidden">
                            <div className="p-4 bg-neutral-50 border-b border-neutral-200">
                                <h3 className="font-medium text-neutral-900">Premium Hoodie</h3>
                            </div>
                            
                            <div className="p-4">
                                <div className="flex gap-4">
                                    <div className="relative w-24 h-24 rounded-md overflow-hidden bg-neutral-100">
                                        <Image
                                            src="/images/product-placeholder.svg"
                                            alt="Premium Hoodie"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    
                                    <div className="flex-1">
                                        <div className="space-y-2">
                                            <div className="flex justify-between items-start">
                                                <div className="space-y-1">
                                                    <p className="text-sm text-neutral-600">Material: <span className="text-neutral-900">Wool</span></p>
                                                    <p className="text-sm text-neutral-600">Size: <span className="text-neutral-900">Large</span></p>
                                                    <p className="text-sm text-neutral-600">Color: <span className="text-neutral-900">Navy</span></p>
                                                    <p className="text-sm text-neutral-600">Style: <span className="text-neutral-900">Slim Fit</span></p>
                                                    <p className="text-sm text-neutral-600">Fit: <span className="text-neutral-900">Custom Tailored</span></p>
                                                </div>
                                                <button className="text-red-600 hover:text-red-700 text-sm">
                                                    Remove
                                                </button>
                                            </div>
                                            
                                            <div className="flex items-center justify-between pt-2">
                                                <div className="flex items-center border border-neutral-200 rounded-md">
                                                    <button className="px-3 py-1 text-neutral-600 hover:bg-neutral-100">
                                                        -
                                                    </button>
                                                    <span className="px-3 py-1">2</span>
                                                    <button className="px-3 py-1 text-neutral-600 hover:bg-neutral-100">
                                                        +
                                                    </button>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-sm text-neutral-600">Price per item</p>
                                                    <p className="font-medium text-neutral-900">$399.99</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                    <div className="border border-neutral-200 rounded-lg p-6">
                        <h2 className="text-lg font-medium text-neutral-900 mb-4">Order Summary</h2>
                        
                        <div className="space-y-4">
                            <div className="flex justify-between text-sm">
                                <span className="text-neutral-600">Subtotal</span>
                                <span className="text-neutral-900">$1,099.97</span>
                            </div>
                            
                            <div className="flex justify-between text-sm">
                                <span className="text-neutral-600">Shipping</span>
                                <span className="text-neutral-900">$15.00</span>
                            </div>
                            
                            <div className="border-t border-neutral-200 pt-4">
                                <div className="flex justify-between font-medium">
                                    <span className="text-neutral-900">Total</span>
                                    <span className="text-neutral-900">$1,114.97</span>
                                </div>
                            </div>
                        </div>

                        <button className="w-full bg-black text-white py-3 px-6 rounded-md hover:bg-neutral-800 transition-colors mt-6">
                            Proceed to Checkout
                        </button>

                        <div className="mt-4 text-center">
                            <Link 
                                href="/"
                                className="text-sm text-neutral-600 hover:text-neutral-900"
                            >
                                Continue Shopping
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}