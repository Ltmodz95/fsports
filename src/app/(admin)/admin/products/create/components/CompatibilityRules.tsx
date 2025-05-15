'use client'

import { useState } from 'react'

interface Option {
    name: string
    price: string
}

interface Component {
    name: string
    options: Option[]
}

interface Rule {
    first_option_id: string
    second_option_id: string
}

interface CompatibilityRulesProps {
    components: Component[]
    onRulesChange: (rules: Rule[]) => void
}

export default function CompatibilityRules({ components, onRulesChange }: CompatibilityRulesProps) {
    const [rules, setRules] = useState<Rule[]>([])
    const [newRule, setNewRule] = useState<Rule>({
        first_option_id: '',
        second_option_id: ''
    })

    // Get all options from all components with their IDs
    const allOptions = components.flatMap(comp => 
        comp.options.map(opt => ({
            id: `${comp.name}-${opt.name}`,
            name: opt.name,
            component: comp.name
        }))
    )

    const handleRuleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target
        setNewRule(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const addRule = () => {
        if (newRule.first_option_id && newRule.second_option_id && newRule.first_option_id !== newRule.second_option_id) {
            const updatedRules = [...rules, { ...newRule }]
            setRules(updatedRules)
            onRulesChange(updatedRules)
            setNewRule({
                first_option_id: '',
                second_option_id: ''
            })
        }
    }

    const removeRule = (index: number) => {
        const updatedRules = rules.filter((_, i) => i !== index)
        setRules(updatedRules)
        onRulesChange(updatedRules)
    }

    // Get option details from ID
    const getOptionDetails = (optionId: string) => {
        const option = allOptions.find(opt => opt.id === optionId)
        return option || { name: '', component: '' }
    }

    return (
        <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Compatibility Rules</h3>

            {/* Rules List */}
            {rules.length > 0 && (
                <div className="mb-4 space-y-2">
                    {rules.map((rule, index) => {
                        const firstOption = getOptionDetails(rule.first_option_id)
                        const secondOption = getOptionDetails(rule.second_option_id)
                        return (
                            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                                <div className="text-sm">
                                    <span className="font-medium">{firstOption.component}</span>
                                    <span className="mx-2">-</span>
                                    <span>{firstOption.name}</span>
                                    <span className="mx-2">is incompatible with</span>
                                    <span className="font-medium">{secondOption.component}</span>
                                    <span className="mx-2">-</span>
                                    <span>{secondOption.name}</span>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => removeRule(index)}
                                    className="text-gray-400 hover:text-gray-500"
                                >
                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        )
                    })}
                </div>
            )}

            {/* Add Rule Form */}
            <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="first_option_id" className="block text-sm font-medium text-gray-700">
                            First Option
                        </label>
                        <select
                            id="first_option_id"
                            name="first_option_id"
                            value={newRule.first_option_id}
                            onChange={handleRuleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
                        >
                            <option value="">Select option</option>
                            {allOptions.map((opt, index) => (
                                <option 
                                    key={index} 
                                    value={opt.id}
                                    disabled={opt.id === newRule.second_option_id}
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
                            onChange={handleRuleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
                        >
                            <option value="">Select option</option>
                            {allOptions.map((opt, index) => (
                                <option 
                                    key={index} 
                                    value={opt.id}
                                    disabled={opt.id === newRule.first_option_id}
                                >
                                    {opt.component} - {opt.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={addRule}
                    disabled={!newRule.first_option_id || !newRule.second_option_id || newRule.first_option_id === newRule.second_option_id}
                    className="inline-flex items-center px-4 py-2 border border-black text-sm font-medium rounded-md text-black hover:bg-black hover:text-white transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Add Rule
                </button>
            </div>
        </div>
    )
} 