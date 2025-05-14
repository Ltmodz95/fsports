'use client'

import { useState } from 'react'
import Cookies from 'js-cookie'
export default function CategoriesPage() {
    const [categoryName, setCategoryName] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    const token = Cookies.get('session')
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        // TODO: Add API call to create category
        console.log('Category name:', categoryName)
        // Simulate API call
        const response = await fetch('http://localhost:3000/api/v1/categories', {
            method: 'POST',
            body: JSON.stringify({ name: categoryName }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })  
        const data = await response.json()
        console.log(data)
        setIsSubmitting(false)
        setCategoryName('')
    }

    return (
        <div className="max-w-2xl mx-auto">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                {/* Form Header */}
                <div className="px-6 py-4 bg-gradient-to-r from-indigo-600 to-indigo-700">
                    <h2 className="text-xl font-semibold text-white">Add New Category</h2>
                    <p className="mt-1 text-sm text-indigo-100">Create a new category for your products</p>
                </div>

                {/* Form Body */}
                <div className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-1">
                            <label 
                                htmlFor="categoryName" 
                                className="block text-sm font-medium text-gray-700"
                            >
                                Category Name
                            </label>
                            <div className="relative mt-1">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg 
                                        className="h-5 w-5 text-gray-400" 
                                        fill="none" 
                                        stroke="currentColor" 
                                        viewBox="0 0 24 24"
                                    >
                                        <path 
                                            strokeLinecap="round" 
                                            strokeLinejoin="round" 
                                            strokeWidth="2" 
                                            d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" 
                                        />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    name="categoryName"
                                    id="categoryName"
                                    value={categoryName}
                                    onChange={(e) => setCategoryName(e.target.value)}
                                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out"
                                    placeholder="Enter category name"
                                    required
                                />
                            </div>
                            <p className="mt-2 text-sm text-gray-500">
                                Choose a descriptive name for your category
                            </p>
                        </div>

                        <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200">
                            <button
                                type="button"
                                onClick={() => setCategoryName('')}
                                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
                            >
                                Clear
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out ${
                                    isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                                }`}
                            >
                                {isSubmitting ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Adding...
                                    </>
                                ) : (
                                    'Add Category'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}