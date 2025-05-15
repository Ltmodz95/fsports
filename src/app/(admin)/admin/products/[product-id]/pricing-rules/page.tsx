'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import Cookies from 'js-cookie'

interface Component {
    id: number
    name: string
    options: {
        id: number
        name: string
        price: number
    }[]
}

interface Rule {
    id: number
    first_option_id: number
    second_option_id: number
    price: number
    first_option: {
        name: string
        component: {
            name: string
        }
    }
    second_option: {
        name: string
        component: {
            name: string
        }
    }
}

interface Product {
    id: number
    name: string
    components: Component[]
}

export default function PriceAdjustmentsPage() {
    const router = useRouter()
    const [product, setProduct] = useState<Product | null>(null)
    const [rules, setRules] = useState<Rule[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const token = Cookies.get('session')
    const { 'product-id': productId } = useParams()

    useEffect(() => {
        fetchProductAndRules()
    }, [])

    const fetchProductAndRules = async () => {
        try {
            const [productResponse, rulesResponse] = await Promise.all([
                fetch(`http://localhost:3000/api/v1/products/${productId}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                }),
                fetch(`http://localhost:3000/api/v1/products/${productId}/price_adjustments`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                })
            ])

            const productData = await productResponse.json()
            const rulesData = await rulesResponse.json()
            console.log(rulesData)
            setProduct(productData)
            setRules(rulesData)
        } catch (error) {
            console.error('Error fetching data:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleDelete = async (ruleId: number) => {
        if (window.confirm('Are you sure you want to delete this adjustment?')) {
            try {
                await fetch(`http://localhost:3000/api/v1/price_adjustments/${ruleId}`, {
                    method: 'DELETE',
                    headers: { 'Authorization': `Bearer ${token}` }
                })
                setRules(rules.filter(rule => rule.id !== ruleId))
            } catch (error) {
                console.error('Error deleting adjustment:', error)
            }
        }
    }

    const formatAdjustment = (rule: Rule) => {
        const amount = rule.price
        return `${amount.toFixed(2)}`
    }

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
            </div>
        )
    }

    if (!product) {
        return (
            <div className="text-center py-12">
                <h3 className="text-lg font-medium text-gray-900">Product not found</h3>
                <Link
                    href="/admin/products/list"
                    className="mt-4 inline-flex items-center px-4 py-2 border border-black text-sm font-medium rounded-md text-white bg-black hover:bg-white hover:text-black transition-colors duration-200"
                >
                    Back to Products
                </Link>
            </div>
        )
    }

    return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            {/* Header */}
            <div className="px-6 py-4 bg-black flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-semibold text-white">Price Adjustments</h2>
                    <p className="text-sm text-gray-300 mt-1">{product.name}</p>
                </div>
                <div className="flex space-x-4">
                    <Link
                        href={`/admin/products/${productId}/edit`}
                        className="inline-flex items-center px-4 py-2 border border-white text-sm font-medium rounded-md text-white hover:bg-white hover:text-black transition-colors duration-200"
                    >
                        Back to Product
                    </Link>
                    <Link
                        href={`/admin/products/${productId}/pricing-rules/create`}
                        className="inline-flex items-center px-4 py-2 border border-white text-sm font-medium rounded-md text-white hover:bg-white hover:text-black transition-colors duration-200"
                    >
                        Add New Adjustment
                    </Link>
                </div>
            </div>

            {/* Rules List */}
            <div className="p-6">
                {rules.length > 0 ? (
                    <div className="space-y-4">
                        {rules.map((rule) => (
                            <div key={rule.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                <div className="text-sm">
                                    <span className="font-medium">{rule.first_option.component.name}</span>
                                    <span className="mx-2">-</span>
                                    <span>{rule.first_option.name}</span>
                                    <span className="mx-2">with</span>
                                    <span className="font-medium">{rule.second_option.component.name}</span>
                                    <span className="mx-2">-</span>
                                    <span>{rule.second_option.name}</span>
                                    <span className="mx-2">adjusts price by</span>
                                    <span className="font-medium">{rule.price}</span>
                                </div>
                                <button
                                    onClick={() => handleDelete(rule.id)}
                                    className="text-red-600 hover:text-red-900"
                                >
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        <h3 className="mt-2 text-sm font-medium text-gray-900">No price adjustments</h3>
                        <p className="mt-1 text-sm text-gray-500">Get started by creating a new adjustment.</p>
                        <div className="mt-6">
                            <Link
                                href={`/admin/products/${productId}/price-adjustments/create`}
                                className="inline-flex items-center px-4 py-2 border border-black text-sm font-medium rounded-md text-white bg-black hover:bg-white hover:text-black transition-colors duration-200"
                            >
                                Add New Adjustment
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
} 