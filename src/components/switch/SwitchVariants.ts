import { cva, type VariantProps } from 'class-variance-authority'
import * as SwitchPrimitive from '@radix-ui/react-switch'

// ✅ 1. CVA Variants
export const switchVariants = cva(
  'peer inline-flex shrink-0 cursor-pointer items-center rounded-full ' +
    'border border-transparent transition-colors duration-300 ease-in-out ' +
    'focus-visible:outline-none focus-visible:ring-2 ' +
    'focus-visible:ring-[var(--atom-ring-color)] focus-visible:ring-offset-2 ' +
    'focus-visible:ring-offset-[var(--atom-ring-offset)] ' +
    'disabled:opacity-50 disabled:cursor-not-allowed ' +
    'relative overflow-visible bg-[var(--atom-theme-border-primary)] ' +
    'data-[state=checked]:bg-[var(--atom-primary)] ' +
    'data-[state=checked]:border-[var(--atom-primary)]',
  {
    variants: {
      variant: { default: '', theme: '' },
      size: {
        sm: 'h-4 w-7 p-0.5',
        md: 'h-5 w-9 p-0.5',
        lg: 'h-6 w-11 p-0.5',
      },
      fullWidth: { true: 'w-full', false: '' },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      fullWidth: false,
    },
  },
)

// ✅ 2. Type Definitions
export type SwitchVariant = 'default' | 'theme'
export type SwitchSize = 'sm' | 'md' | 'lg'
export type SwitchVariantProps = VariantProps<typeof switchVariants>

// ✅ 3. Thumb Configuration
export const thumbConfig: Record<SwitchSize, { size: string; translateX: number }> = {
  sm: { size: 'h-3 w-3', translateX: 12 },
  md: { size: 'h-4 w-4', translateX: 16 },
  lg: { size: 'h-5 w-5', translateX: 20 },
}

// ✅ 4. COMPLETE SwitchProps - FIXED
export interface SwitchProps
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>,
         SwitchVariantProps {
  // ✅ checked, defaultChecked, onCheckedChange now ALL available from Radix
}

// ✅ 5. Test helper type
export type SwitchTestProps = Partial<SwitchProps>
