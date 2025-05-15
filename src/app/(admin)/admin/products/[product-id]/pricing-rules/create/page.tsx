'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import Cookies from 'js-cookie'

interface Component {
    id: number
    name: string
    options: {
        price: number
        id: number
        name: string
    }[]
}

interface Product {
    id: number
    name: string
    components: Component[]
}

export default function CreatePriceAdjustmentPage({ params }: { params: { 'product-id': string } }) {
    const router = useRouter()
    const [product, setProduct] = useState<Product | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formData, setFormData] = useState({
        first_option_id: '',
        second_option_id: '',
        price: ''
    })
    const token = Cookies.get('session')
    const { 'product-id': productId } = useParams()
    useEffect(() => {
        fetchProduct()
    }, [])

    const fetchProduct = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/v1/products/${productId}`, {
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            const response = await fetch(`http://localhost:3000/api/v1/products/${productId}/price_adjustments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    ...formData,
                    first_option_id: parseInt(formData.first_option_id),
                    second_option_id: parseInt(formData.second_option_id),
                    price: parseFloat(formData.price)
                })
            })

            if (response.ok) {
                router.push(`/admin/products/${productId}/price-adjustments`)
            } else {
                throw new Error('Failed to create adjustment')
            }
        } catch (error) {
            console.error('Error creating adjustment:', error)
            alert('Failed to create adjustment. Please try again.')
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
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
            {/* Form Header */}
            <div className="px-6 py-4 bg-black flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-semibold text-white">Create Price Adjustment</h2>
                    <p className="text-sm text-gray-300 mt-1">{product.name}</p>
                </div>
                <Link
                    href={`/admin/products/${product.id}/price-adjustments`}
                    className="inline-flex items-center px-4 py-2 border border-white text-sm font-medium rounded-md text-white hover:bg-white hover:text-black transition-colors duration-200"
                >
                    Back to Adjustments
                </Link>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div>
                    <label htmlFor="first_option_id" className="block text-sm font-medium text-gray-700">
                        First Option
                    </label>
                    <select
                        id="first_option_id"
                        name="first_option_id"
                        value={formData.first_option_id}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
                        required
                    >
                        <option value="">Select an option</option>
                        {product.components.map(component => (
                            <optgroup key={component.id} label={component.name}>
                                {component.options.map(option => (
                                    <option key={option.id} value={option.id}>
                                        {option.name} (${option.price})
                                    </option>
                                ))}
                            </optgroup>
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
                        value={formData.second_option_id}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
                        required
                    >
                        <option value="">Select an option</option>
                        {product.components.map(component => (
                            <optgroup key={component.id} label={component.name}>
                                {component.options.map(option => (
                                    <option key={option.id} value={option.id}>
                                        {option.name} (${option.price})
                                    </option>
                                ))}
                            </optgroup>
                        ))}
                    </select>
                </div>

                <div>
                    <label htmlFor="adjustment_amount" className="block text-sm font-medium text-gray-700">
                        Adjustment Amount
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm`}
                            required
                        />
                    </div>
                </div>

                <div className="flex justify-end space-x-4">
                    <button
                        type="button"
                        onClick={() => router.push(`/admin/products/${product.id}/price-adjustments`)}
                        className="px-4 py-2 border border-black text-sm font-medium rounded-md text-black hover:bg-black hover:text-white transition-colors duration-200"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-4 py-2 border border-black text-sm font-medium rounded-md text-white bg-black hover:bg-white hover:text-black transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? 'Creating...' : 'Create Adjustment'}
                    </button>
                </div>
            </form>
        </div>
    )
} 