'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
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

export default function IncompatibilityRulesPage() {
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
                fetch(`http://localhost:3000/api/v1/products/${productId}/incompatablity_rules`, {
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
        if (window.confirm('Are you sure you want to delete this rule?')) {
            try {
                await fetch(`http://localhost:3000/api/v1/products/${productId}/incompatablity_rules/${ruleId}`, {
                    method: 'DELETE',
                    headers: { 'Authorization': `Bearer ${token}` }
                })
                setRules(rules.filter(rule => rule.id !== ruleId))
            } catch (error) {
                console.error('Error deleting rule:', error)
            }
        }
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
                    <h2 className="text-xl font-semibold text-white">Incompatibility Rules</h2>
                    <p className="text-sm text-gray-300 mt-1">{product.name}</p>
                </div>
                <div className="flex space-x-4">
                    <Link
                        href={`/admin/products/${product.id}/edit`}
                        className="inline-flex items-center px-4 py-2 border border-white text-sm font-medium rounded-md text-white hover:bg-white hover:text-black transition-colors duration-200"
                    >
                        Back to Product
                    </Link>
                    <Link
                        href={`/admin/products/${product.id}/incompatibility-rules/create`}
                        className="inline-flex items-center px-4 py-2 border border-white text-sm font-medium rounded-md text-white hover:bg-white hover:text-black transition-colors duration-200"
                    >
                        Add New Rule
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
                                    <span className="mx-2">is incompatible with</span>
                                    <span className="font-medium">{rule.second_option.component.name}</span>
                                    <span className="mx-2">-</span>
                                    <span>{rule.second_option.name}</span>
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
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                            />
                        </svg>
                        <h3 className="mt-2 text-sm font-medium text-gray-900">No incompatibility rules</h3>
                        <p className="mt-1 text-sm text-gray-500">Get started by creating a new rule.</p>
                        <div className="mt-6">
                            <Link
                                href={`/admin/products/${product.id}/incompatibility-rules/create`}
                                className="inline-flex items-center px-4 py-2 border border-black text-sm font-medium rounded-md text-white bg-black hover:bg-white hover:text-black transition-colors duration-200"
                            >
                                Add New Rule
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
} 