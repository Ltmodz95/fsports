'use client'

import Image from "next/image"
import Link from "next/link"
import Cookies from "js-cookie"
import { useEffect, useState } from "react"

export default function ShoppingCartPage() {
    const [cartItems, setCartItems] = useState<any>([])
    const [totalPrice, setTotalPrice] = useState<number>(0)

    const token = Cookies.get('session')
    useEffect(() => {
        fetchCartItems()
    }, [])

    const fetchCartItems = async () => {
        const response = await fetch('http://localhost:3000/api/v1/cart', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        const data = await response.json()
        console.log(data["items"])
        setCartItems(data["items"])
        setTotalPrice(data["total_price"])
    }
    return (
        <main className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold text-neutral-900 mb-8">Shopping Cart</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {cartItems.map((item: any) => (
                    <div key={item.id} className="lg:col-span-2">
                        <div className="space-y-6">
                            <div className="border border-neutral-200 rounded-lg overflow-hidden">
                                <div className="p-4 bg-neutral-50 border-b border-neutral-200">
                                    <h3 className="font-medium text-neutral-900">{item.product.name}</h3>
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
                                                        {(JSON.parse(item.selected_options)||[]).map ((option: any) => (
                                                            <p className="text-sm text-neutral-600">{option[1]}: <span className="text-neutral-900">{option[2]}</span></p>
                                                        ))}
                                                    </div>
                                                    <button className="text-red-600 hover:text-red-700 text-sm">
                                                        Remove
                                                    </button>
                                                </div>
                                                <div className="flex justify-end">
                                                    <div className="text-right">
                                                        <p className="text-sm text-neutral-600">Total price: <span className="text-neutral-900 font-medium">${item.total_price}</span></p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}


                {/* Order Summary */}
                <div className="lg:col-span-1">
                    <div className="border border-neutral-200 rounded-lg p-6">
                        <h2 className="text-lg font-medium text-neutral-900 mb-4">Order Summary</h2>

                        <button className="w-full bg-black text-white py-3 px-6 rounded-md hover:bg-neutral-800 transition-colors mt-6">
                            Place Order ({totalPrice}$)    
                        </button>

                        <div className="mt-4 text-center">
                            <Link
                                href="/products"
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