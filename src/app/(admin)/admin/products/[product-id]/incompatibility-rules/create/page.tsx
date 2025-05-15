'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
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

interface Product {
    id: number
    name: string
    components: Component[]
}

interface NewRule {
    first_option_id: string
    second_option_id: string
}

export default function CreateIncompatibilityRulePage({ params }: { params: { 'product-id': string } }) {
    const router = useRouter()
    const [product, setProduct] = useState<Product | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [newRule, setNewRule] = useState<NewRule>({
        first_option_id: '',
        second_option_id: ''
    })
    const token = Cookies.get('session')

    useEffect(() => {
        fetchProduct()
    }, [])

    const fetchProduct = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/v1/products/${params['product-id']}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            })
            const data = await response.json()
            setProduct(data)
        } catch (error) {
            console.error('Error fetching product:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target
        setNewRule(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            const response = await fetch(`http://localhost:3000/api/v1/products/${params['product-id']}/incompatablity_rules`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    incompatablity_rule: {
                        first_option_id: parseInt(newRule.first_option_id),
                        second_option_id: parseInt(newRule.second_option_id)
                    }
                })
            })

            if (response.ok) {
                router.push(`/admin/products/${params['product-id']}/incompatibility-rules`)
            } else {
                throw new Error('Failed to create rule')
            }
        } catch (error) {
            console.error('Error creating rule:', error)
            alert('Failed to create rule. Please try again.')
        } finally {
            setIsSubmitting(false)
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

    // Get all options from all components
    const allOptions = product.components.flatMap(comp => 
        comp.options.map(opt => ({
            id: opt.id,
            name: opt.name,
            component: comp.name
        }))
    )

    return (
        <div className="max-w-2xl mx-auto p-6">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                {/* Form Header */}
                <div className="px-6 py-4 bg-black">
                    <h2 className="text-xl font-semibold text-white">Create Incompatibility Rule</h2>
                    <p className="text-sm text-gray-300 mt-1">{product.name}</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="first_option_id" className="block text-sm font-medium text-gray-700">
                                First Option
                            </label>
                            <select
                                id="first_option_id"
                                name="first_option_id"
                                value={newRule.first_option_id}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
                                required
                            >
                                <option value="">Select option</option>
                                {allOptions.map((opt) => (
                                    <option 
                                        key={opt.id} 
                                        value={opt.id}
                                        disabled={opt.id.toString() === newRule.second_option_id}
                                    >
                                        {opt.component} - {opt.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="second_option_id" className="block text-sm font-medium text-gray-700">
                                Second Option
                            </label>
                            <select
                                id="second_option_id"
                                name="second_option_id"
                                value={newRule.second_option_id}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
                                required
                            >
                                <option value="">Select option</option>
                                {allOptions.map((opt) => (
                                    <option 
                                        key={opt.id} 
                                        value={opt.id}
                                        disabled={opt.id.toString() === newRule.first_option_id}
                                    >
                                        {opt.component} - {opt.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="flex justify-end space-x-4">
                        <Link
                            href={`/admin/products/${product.id}/incompatibility-rules`}
                            className="px-4 py-2 border border-black text-sm font-medium rounded-md text-black hover:bg-black hover:text-white transition-colors duration-200"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            disabled={isSubmitting || !newRule.first_option_id || !newRule.second_option_id || newRule.first_option_id === newRule.second_option_id}
                            className="px-4 py-2 border border-black text-sm font-medium rounded-md text-white bg-black hover:bg-white hover:text-black transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? 'Creating...' : 'Create Rule'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
} 