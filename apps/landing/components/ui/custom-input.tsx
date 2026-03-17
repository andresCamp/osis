import React from 'react'
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    variant?: 'dark' | 'light' | 'glass';
    error?: string;
    success?: boolean;
    containerClasses?: string;
}

const CustomInput = React.forwardRef<HTMLInputElement, CustomInputProps>(
    ({ label, className, variant = 'dark', error, success, containerClasses, ...props }, ref) => {
        const autoId = React.useId()
        const inputId = (props.id as string | undefined) ?? autoId
        const errorId = `${inputId}-error`
        const inputThemeVariants = {
            dark: 'text-white bg-black/40 border-zinc-700 focus-visible:bg-black',
            light: 'bg-white text-black  border-zinc-300 focus-visible:bg-white',
            glass: 'bg-background/10 text-foreground border-border/20 focus-visible:bg-background/15 backdrop-blur-sm'
        }

        const labelThemeVariants = {
            dark: 'text-muted-foreground',
            light: 'text-zinc-500',
            glass: 'text-foreground/60'
        }

        const inputClasses = cn(
            // Base styles
            'peer w-full h-[60px] !text-lg pt-7 pb-2 px-3.5 rounded-lg',
            'placeholder:opacity-0',
            'transition-shadow duration-300',
            
            // Prevent browser autofill styling
            '[&:-webkit-autofill]:!bg-[transparent]',
            '[&:-webkit-autofill]:!appearance-none',
            '[&:-webkit-autofill]:[background-clip:content-box]',
            '[&:-webkit-autofill]:[box-shadow:0_0_0px_1000px_transparent_inset]',
            '[&:-webkit-autofill:focus]:[box-shadow:0_0_0px_1000px_transparent_inset]',
            '[&:-webkit-autofill:hover]:[box-shadow:0_0_0px_1000px_transparent_inset]',
            '[&:-webkit-autofill:active]:[box-shadow:0_0_0px_1000px_transparent_inset]',
            
            // Theme variant
            inputThemeVariants[variant],
            
            // Focus and error/success states
            !error && !success && 'focus-visible:ring-2 focus-visible:border-0 focus-visible:ring-offset-0',
            error && 'ring-2 ring-red-500 border-0 focus-visible:ring-red-500',
            success && 'ring-2 ring-green-500 border-0 focus-visible:ring-green-500',
            
            // Additional classes
            className
        )

        const labelClasses = cn(
            // Base styles
            'absolute transform -translate-y-1/2 left-3.5',
            'transition-all duration-300 pointer-events-none',
            'peer-placeholder-shown:text-base peer-focus-visible:text-sm text-sm',
            'peer-placeholder-shown:top-1/2 peer-focus-visible:top-4 top-4',
            error && 'text-red-500 font-medium',
            success && 'text-green-500',
            
            // Theme variant
            labelThemeVariants[variant]
        )

        return (
            <div className='relative group flex items-start flex-col w-full'>
                <div className={`relative w-full ${containerClasses || ""}`}>
                    <Input 
                        {...props}
                        id={inputId}
                        aria-invalid={Boolean(error) || (props as Record<string, unknown>)["aria-invalid"] as boolean | undefined}
                        aria-describedby={error ? errorId : undefined}
                        ref={ref}
                        className={inputClasses}
                        autoComplete="off"
                        autoCorrect="off"
                        autoCapitalize="on"
                        spellCheck="false"
                        data-form-type="other"
                    />
                    
                    <label className={labelClasses} htmlFor={inputId}>
                        {error ? <span id={errorId} className="text-red-500 font-medium">{error}</span> : label}
                    </label>
                </div>
            </div>
        )
    }
)

CustomInput.displayName = 'CustomInput'

export default CustomInput