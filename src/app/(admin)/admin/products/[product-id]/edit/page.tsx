'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import ComponentManager from '../../create/components/ComponentManager'

interface Category {
    id: number
    name: string
}

interface Component {
    id?: number
    name: string
    in_stock: boolean
    options: { id?: number; name: string; price: string }[]
}

interface Product {
    id: number
    name: string
    description: string
    base_price: number
    in_stock: boolean
    category_id: number
    components: Component[]
}

export default function EditProductPage({ params }: { params: { 'product-id': string } }) {
    const router = useRouter()
    const [categories, setCategories] = useState<Category[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [components, setComponents] = useState<Component[]>([])
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        base_price: '',
        in_stock: true,
        category_id: ''
    })
    const token = Cookies.get('session')

    useEffect(() => {
        Promise.all([fetchCategories(), fetchProduct()])
    }, [])

    const fetchCategories = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/v1/categories', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            const data = await response.json()
            setCategories(data)
        } catch (error) {
            console.error('Error fetching categories:', error)
        }
    }

    const fetchProduct = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/v1/products/${params['product-id']}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            const data: Product = await response.json()
            
            setFormData({
                name: data.name,
                description: data.description,
                base_price: data.base_price.toString(),
                in_stock: data.in_stock,
                category_id: data.category_id.toString()
            })
            
            setComponents(data.components.map(comp => ({
                ...comp,
                options: comp.options.map(opt => ({
                    ...opt,
                    price: opt.price.toString()
                }))
            })))
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
            const response = await fetch(`http://localhost:3000/api/v1/products/${params['product-id']}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    ...formData,
                    base_price: parseFloat(formData.base_price),
                    category_id: parseInt(formData.category_id),
                    components_attributes: components.map(comp => ({
                        ...comp,
                        options_attributes: comp.options.map(opt => ({
                            ...opt,
                            price: parseFloat(opt.price)
                        }))
                    }))
                })
            })

            if (response.ok) {
                router.push('/admin/products/list')
            } else {
                throw new Error('Failed to update product')
            }
        } catch (error) {
            console.error('Error updating product:', error)
            alert('Failed to update product. Please try again.')
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        }))
    }

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
            </div>
        )
    }

    return (
        <div className="max-w-2xl mx-auto p-6">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                {/* Form Header */}
                <div className="px-6 py-4 bg-black">
                    <h2 className="text-xl font-semibold text-white">Edit Product</h2>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Product Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={3}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="base_price" className="block text-sm font-medium text-gray-700">
                            Base Price
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <span className="text-gray-500 sm:text-sm">$</span>
                            </div>
                            <input
                                type="number"
                                id="base_price"
                                name="base_price"
                                value={formData.base_price}
                                onChange={handleChange}
                                step="0.01"
                                min="0"
                                className="pl-7 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="category_id" className="block text-sm font-medium text-gray-700">
                            Category
                        </label>
                        <select
                            id="category_id"
                            name="category_id"
                            value={formData.category_id}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
                            required
                        >
                            <option value="">Select a category</option>
                            {categories.map(category => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="in_stock"
                            name="in_stock"
                            checked={formData.in_stock}
                            onChange={handleChange}
                            className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                        />
                        <label htmlFor="in_stock" className="ml-2 block text-sm text-gray-700">
                            In Stock
                        </label>
                    </div>

                    {/* Components Section */}
                    <ComponentManager 
                        components={components}
                        onComponentsChange={setComponents}
                    />

                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={() => router.push('/admin/products/list')}
                            className="px-4 py-2 border border-black text-sm font-medium rounded-md text-black hover:bg-black hover:text-white transition-colors duration-200"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-4 py-2 border border-black text-sm font-medium rounded-md text-white bg-black hover:bg-white hover:text-black transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
} 