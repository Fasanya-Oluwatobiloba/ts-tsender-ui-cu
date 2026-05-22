"use client"

import React from "react"

export interface InputFieldProps {
    label: string
    placeholder: string
    value?: string
    type?: string
    large?: boolean

    onChange?: (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement
        >
    ) => void
}

export default function InputField({
    label,
    placeholder,
    value = "",
    type = "text",
    large = false,
    onChange,
}: InputFieldProps) {

    return (
        <div className="flex flex-col gap-2">

            <label className="text-sm font-medium text-gray-300">
                {label}
            </label>

            {large ? (
                <textarea
                    className="
                        w-full h-28
                        rounded-2xl
                        border border-white/10
                        bg-white/5
                        px-4 py-3
                        text-white
                        placeholder:text-gray-500
                        focus:outline-none
                        focus:ring-2
                        focus:ring-blue-500/50
                        resize-none
                    "
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                />
            ) : (
                <input
                    className="
                        w-full
                        rounded-2xl
                        border border-white/10
                        bg-white/5
                        px-4 py-3
                        text-white
                        placeholder:text-gray-500
                        focus:outline-none
                        focus:ring-2
                        focus:ring-blue-500/50
                    "
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                />
            )}
        </div>
    )
}