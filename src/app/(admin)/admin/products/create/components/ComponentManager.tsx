'use client'

import { useState } from 'react'

interface Option {
    name: string
    price: string
}

interface Component {
    id?: number
    name: string
    in_stock: boolean
    options: Option[]
}

interface ComponentManagerProps {
    components: Component[]
    onComponentsChange: (components: Component[]) => void
}

export default function ComponentManager({ components, onComponentsChange }: ComponentManagerProps) {
    const [newComponent, setNewComponent] = useState<Component>({
        name: '',
        in_stock: true,
        options: []
    })

    const [newOption, setNewOption] = useState<Option>({
        name: '',
        price: ''
    })

    const handleComponentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, type, checked } = e.target
        setNewComponent(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : e.target.value
        }))
    }

    const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setNewOption(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const addOption = () => {
        if (newOption.name && newOption.price) {
            setNewComponent(prev => ({
                ...prev,
                options: [...prev.options, { ...newOption }]
            }))
            setNewOption({
                name: '',
                price: ''
            })
        }
    }

    const removeOption = (index: number) => {
        setNewComponent(prev => ({
            ...prev,
            options: prev.options.filter((_, i) => i !== index)
        }))
    }

    const addComponent = () => {
        if (newComponent.name) {
            onComponentsChange([...components, { ...newComponent }])
            setNewComponent({
                name: '',
                in_stock: true,
                options: []
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
                        <div key={index} className="p-3 bg-gray-50 rounded-md">
                            <div className="flex items-center justify-between mb-2">
                                <div>
                                    <span className="font-medium">{component.name}</span>
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
                            {component.options.length > 0 && (
                                <div className="ml-4 space-y-1">
                                    {component.options.map((option, optIndex) => (
                                        <div key={optIndex} className="text-sm text-gray-600">
                                            • {option.name}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* Add Component Form */}
            <div className="space-y-4">
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

                {/* Options Section */}
                <div className="border-t border-gray-200 pt-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Options</h4>
                    
                    {/* Options List */}
                    {newComponent.options.length > 0 && (
                        <div className="mb-3 space-y-2">
                            {newComponent.options.map((option, index) => (
                                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                                    <div>
                                        <span className="font-medium">{option.name}</span>
                                        <span className="ml-2 text-gray-500">+${option.price}</span>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => removeOption(index)}
                                        className="text-gray-400 hover:text-gray-500"
                                    >
                                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Add Option Form */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="option-name" className="block text-sm font-medium text-gray-700">
                                Option Name
                            </label>
                            <input
                                type="text"
                                id="option-name"
                                name="name"
                                value={newOption.name}
                                onChange={handleOptionChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
                            />
                        </div>
                        <div>
                            <label htmlFor="option-price" className="block text-sm font-medium text-gray-700">
                                Additional Price
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <span className="text-gray-500 sm:text-sm">$</span>
                                </div>
                                <input
                                    type="number"
                                    id="option-price"
                                    name="price"
                                    value={newOption.price}
                                    onChange={handleOptionChange}
                                    step="0.01"
                                    min="0"
                                    className="pl-7 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
                                />
                            </div>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={addOption}
                        className="mt-2 inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                    >
                        Add Option
                    </button>
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