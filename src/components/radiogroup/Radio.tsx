import * as React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { Circle } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';

// RadioGroup Root
const radioGroupVariants = cva(['flex', 'gap-2'].join(' '), {
  variants: {
    direction: {
      vertical: 'flex-col',
      horizontal: 'flex-row flex-wrap',
    },
  },
  defaultVariants: {
    direction: 'vertical',
  },
});

interface RadioGroupProps
  extends Omit<
      React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>,
      'orientation'
    >,
    VariantProps<typeof radioGroupVariants> {
  orientation?: 'horizontal' | 'vertical' | undefined;
}

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  RadioGroupProps
>(({ className, direction, orientation, ...props }, ref) => {
  // Map direction to Radix's orientation prop
  const radixOrientation = direction || orientation;
  
  return (
    <RadioGroupPrimitive.Root
      ref={ref}
      orientation={radixOrientation}
      className={radioGroupVariants({ direction: direction || orientation, className })}
      {...props}
    />
  );
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

// RadioGroup Item
const radioGroupItemVariants = cva(
  [
    'aspect-square h-4 w-4 rounded-full',
    'border border-[var(--atom-theme-border)]',
    'bg-[var(--atom-theme-bg)]',
    'text-[var(--atom-primary)]',
    'focus:outline-none  ',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'transition-colors cursor-pointer',
  ].join(' ')
);

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => (
  <RadioGroupPrimitive.Item
    ref={ref}
    className={radioGroupItemVariants({ className })}
    {...props}
  >
    <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
      <Circle className="h-2.5 w-2.5 fill-current text-current" />
    </RadioGroupPrimitive.Indicator>
  </RadioGroupPrimitive.Item>
));
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

// RadioGroup Label (helper component for better composition)
const RadioGroupLabel = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => (
  <label
    ref={ref}
    className={[
      'text-sm font-medium leading-none',
      'text-[var(--atom-card-fg)]',
      'peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
      'cursor-pointer',
      className,
    ]
      .filter(Boolean)
      .join(' ')}
    {...props}
  />
));
RadioGroupLabel.displayName = 'RadioGroupLabel';

// RadioGroup Option (wrapper for Item + Label)
const RadioGroupOption = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={['flex items-center space-x-2', className]
      .filter(Boolean)
      .join(' ')}
    {...props}
  />
));
RadioGroupOption.displayName = 'RadioGroupOption';

// RadioGroup Description (for additional context)
const RadioGroupDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={['text-sm text-(--atom-text-muted)', className]
      .filter(Boolean)
      .join(' ')}
    {...props}
  />
));
RadioGroupDescription.displayName = 'RadioGroupDescription';

export {
  RadioGroup,
  RadioGroupItem,
  RadioGroupLabel,
  RadioGroupOption,
  RadioGroupDescription,
};
