import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

// Card Root
const cardVariants = cva(
  [
    'rounded-lg',
    'bg-(--atom-theme-bg)',
    'border border-(--atom-theme-border)',
    'transition-all duration-200',
    'overflow-hidden',
  ].join(' '),
  {
    variants: {
      variant: {
        elevated: [
          'shadow-md',
          'hover:shadow-lg',
        ].join(' '),
        outlined: [
          'shadow-sm',
          'border-[var(--atom-theme-border)]',
        ].join(' '),
        flat: [
          'border-transparent',
          'shadow-none',
        ].join(' '),
      },
      hoverable: {
        true: [
          'hover:shadow-xl',
          'hover:scale-[1.02]',
          'cursor-pointer',
        ].join(' '),
        false: '',
      },
      clickable: {
        true: [
          'cursor-pointer',
          'focus:outline-none',
          'focus:ring-2',
          'focus:ring-[var(--atom-ring-color)]',
          'focus:ring-offset-2',
        ].join(' '),
        false: '',
      },
    },
    defaultVariants: {
      variant: 'elevated',
      hoverable: false,
      clickable: false,
    },
  }
);

interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, hoverable, clickable, ...props }, ref) => (
    <div
      ref={ref}
      className={cardVariants({ variant, hoverable, clickable, className })}
      tabIndex={clickable ? 0 : undefined}
      {...props}
    />
  )
);
Card.displayName = 'Card';

// Card Header
const cardHeaderVariants = cva(
  [
    'flex flex-col space-y-1.5',
    'px-6 pt-6',
  ].join(' '),
  {
    variants: {
      divider: {
        true: 'border-b border-[var(--atom-theme-border)] pb-4',
        false: '',
      },
      align: {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
      },
    },
    defaultVariants: {
      divider: false,
      align: 'left',
    },
  }
);

interface CardHeaderProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardHeaderVariants> {
  avatar?: React.ReactNode;
  action?: React.ReactNode;
}

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, divider, align, avatar, action, children, ...props }, ref) => {
    if (avatar || action) {
      return (
        <div
          ref={ref}
          className={cardHeaderVariants({ divider, className })}
          {...props}
        >
          <div className="flex items-start gap-4">
            {avatar && <div className="shrink-0">{avatar}</div>}
            <div className="flex-1 min-w-0">{children}</div>
            {action && <div className="shrink-0">{action}</div>}
          </div>
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cardHeaderVariants({ divider, align, className })}
        {...props}
      >
        {children}
      </div>
    );
  }
);
CardHeader.displayName = 'CardHeader';

// Card Title
const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={[
      'text-lg font-semibold leading-none tracking-tight',
      'text-(--atom-theme-text)',
      className,
    ]
      .filter(Boolean)
      .join(' ')}
    {...props}
  />
));
CardTitle.displayName = 'CardTitle';

// Card Subtitle
const CardSubtitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={[
      'text-sm text-(--atom-text-muted)',
      'mt-1',
      className,
    ]
      .filter(Boolean)
      .join(' ')}
    {...props}
  />
));
CardSubtitle.displayName = 'CardSubtitle';

// Card Body
const cardBodyVariants = cva(
  [
    'text-[var(--atom-card-fg)]',
  ].join(' '),
  {
    variants: {
      noPadding: {
        true: '',
        false: 'px-6 py-4',
      },
    },
    defaultVariants: {
      noPadding: false,
    },
  }
);

interface CardBodyProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardBodyVariants> {}

const CardBody = React.forwardRef<HTMLDivElement, CardBodyProps>(
  ({ className, noPadding, ...props }, ref) => (
    <div
      ref={ref}
      className={cardBodyVariants({ noPadding, className })}
      {...props}
    />
  )
);
CardBody.displayName = 'CardBody';

// Card Footer
const cardFooterVariants = cva(
  [
    'flex items-center gap-3',
    'px-6 pb-6',
  ].join(' '),
  {
    variants: {
      divider: {
        true: 'border-t border-[var(--atom-theme-border)] pt-4',
        false: '',
      },
      align: {
        left: 'justify-start',
        center: 'justify-center',
        right: 'justify-end',
        between: 'justify-between',
      },
    },
    defaultVariants: {
      divider: false,
      align: 'right',
    },
  }
);

interface CardFooterProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardFooterVariants> {}

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, divider, align, ...props }, ref) => (
    <div
      ref={ref}
      className={cardFooterVariants({ divider, align, className })}
      {...props}
    />
  )
);
CardFooter.displayName = 'CardFooter';

// Card Media
const cardMediaVariants = cva(
  [
    'w-full',
  ].join(' '),
  {
    variants: {
      size: {
        sm: 'h-32',
        md: 'h-48',
        lg: 'h-64',
        xl: 'h-80',
        auto: 'h-auto',
      },
      objectFit: {
        cover: 'object-cover',
        contain: 'object-contain',
        fill: 'object-fill',
        none: 'object-none',
      },
    },
    defaultVariants: {
      size: 'md',
      objectFit: 'cover',
    },
  }
);

interface CardMediaProps
  extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'height'>,
    VariantProps<typeof cardMediaVariants> {
  src: string;
  alt: string;
}

const CardMedia = React.forwardRef<HTMLImageElement, CardMediaProps>(
  ({ className, size, objectFit, ...props }, ref) => (
    <img
      ref={ref}
      className={cardMediaVariants({ size, objectFit, className })}
      {...props}
    />
  )
);
CardMedia.displayName = 'CardMedia';

export {
  Card,
  CardHeader,
  CardTitle,
  CardSubtitle,
  CardBody,
  CardFooter,
  CardMedia,
};
