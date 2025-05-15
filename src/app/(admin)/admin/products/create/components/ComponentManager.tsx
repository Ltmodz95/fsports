'use client'

import { useState } from 'react'

interface Component {
    id?: number
    name: string
    price: string
    in_stock: boolean
}

interface ComponentManagerProps {
    components: Component[]
    onComponentsChange: (components: Component[]) => void
}

export default function ComponentManager({ components, onComponentsChange }: ComponentManagerProps) {
    const [newComponent, setNewComponent] = useState<Component>({
        name: '',
        price: '',
        in_stock: true
    })

    const handleComponentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target
        setNewComponent(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }))
    }

    const addComponent = () => {
        if (newComponent.name && newComponent.price) {
            onComponentsChange([...components, { ...newComponent }])
            setNewComponent({
                name: '',
                price: '',
                in_stock: true
            })
        }
    }

    const removeComponent = (index: number) => {
        onComponentsChange(components.filter((_, i) => i !== index))
    }

    return (
        <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Components</h3>
            
            {/* Component List */}
            {components.length > 0 && (
                <div className="mb-4 space-y-2">
                    {components.map((component, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                            <div>
                                <span className="font-medium">{component.name}</span>
                                <span className="ml-2 text-gray-500">${component.price}</span>
                                <span className="ml-2 text-sm text-gray-500">
                                    {component.in_stock ? '(In Stock)' : '(Out of Stock)'}
                                </span>
                            </div>
                            <button
                                type="button"
                                onClick={() => removeComponent(index)}
                                className="text-gray-400 hover:text-gray-500"
                            >
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* Add Component Form */}
            <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="component-name" className="block text-sm font-medium text-gray-700">
                            Component Name
                        </label>
                        <input
                            type="text"
                            id="component-name"
                            name="name"
                            value={newComponent.name}
                            onChange={handleComponentChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="component-price" className="block text-sm font-medium text-gray-700">
                            Price
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <span className="text-gray-500 sm:text-sm">$</span>
                            </div>
                            <input
                                type="number"
                                id="component-price"
                                name="price"
                                value={newComponent.price}
                                onChange={handleComponentChange}
                                step="0.01"
                                min="0"
                                className="pl-7 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
                            />
                        </div>
                    </div>
                </div>
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="component-in-stock"
                        name="in_stock"
                        checked={newComponent.in_stock}
                        onChange={handleComponentChange}
                        className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                    />
                    <label htmlFor="component-in-stock" className="ml-2 block text-sm text-gray-700">
                        In Stock
                    </label>
                </div>
                <button
                    type="button"
                    onClick={addComponent}
                    className="inline-flex items-center px-4 py-2 border border-black text-sm font-medium rounded-md text-black hover:bg-black hover:text-white transition-colors duration-200"
                >
                    Add Component
                </button>
            </div>
        </div>
    )
} 