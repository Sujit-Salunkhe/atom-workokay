import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';

// Dialog Root
const Dialog = DialogPrimitive.Root;

// Dialog Trigger
const DialogTrigger = DialogPrimitive.Trigger;

// Dialog Portal - Modified to use atom-theme container
const DialogPortal = ({ children, ...props }: DialogPrimitive.DialogPortalProps) => {
  const [container, setContainer] = React.useState<HTMLElement | null>(null);

  React.useEffect(() => {
    // Find the atom-theme container
    const atomTheme = document.querySelector('.atom-theme') as HTMLElement;
    
    if (atomTheme) {
      setContainer(atomTheme);
    } else {
      // Fallback to body if atom-theme not found
      console.warn('atom-theme container not found, using document.body');
      setContainer(document.body);
    }
  }, []);

  if (!container) return null;

  return (
    <DialogPrimitive.Portal {...props} container={container}>
      {children}
    </DialogPrimitive.Portal>
  );
};
DialogPortal.displayName = 'DialogPortal';

// Dialog Overlay
const dialogOverlayVariants = cva(
  [
    'fixed inset-0 z-[9998]',
    'bg-black/50',
    'data-[state=open]:animate-in data-[state=closed]:animate-out',
    'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
  ].join(' ')
);

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={dialogOverlayVariants({ className })}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

// Dialog Content
const dialogContentVariants = cva(
  [
    'fixed left-[50%] top-[50%] z-[9999]',
    'translate-x-[-50%] translate-y-[-50%]',
    'w-full max-w-lg max-h-[90vh] overflow-y-auto',
    'bg-[var(--atom-theme-bg)] border border-[var(--atom-theme-border)]',
    'rounded-lg shadow-2xl',
    'flex flex-col',
    'data-[state=open]:animate-in data-[state=closed]:animate-out',
    'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
    'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
    'data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]',
    'data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]',
    'duration-200',
  ].join(' ')
);

interface DialogContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>,
    VariantProps<typeof dialogContentVariants> {
  showClose?: boolean;
}

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  DialogContentProps
>(({ className, children, showClose = true, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={dialogContentVariants({ className })}
      {...props}
    >
      {children}
      {showClose && (
        <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-[var(--atom-bg)] transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-[var(--atom-ring-color)] focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-[var(--atom-surface-alt)]">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      )}
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

// Dialog Header
const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={[
      'flex flex-col space-y-1.5 text-center sm:text-left',
      'px-6 pt-6',
      className,
    ]
      .filter(Boolean)
      .join(' ')}
    {...props}
  />
);
DialogHeader.displayName = 'DialogHeader';

// Dialog Footer
const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={[
      'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
      'px-6 pb-6',
      className,
    ]
      .filter(Boolean)
      .join(' ')}
    {...props}
  />
);
DialogFooter.displayName = 'DialogFooter';

// Dialog Title
const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={[
      'text-lg font-semibold leading-none tracking-tight',
      'text-[var(--atom-card-fg)]',
      className,
    ]
      .filter(Boolean)
      .join(' ')}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

// Dialog Description
const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={[
      'text-sm text-[var(--atom-text-muted)]',
      className,
    ]
      .filter(Boolean)
      .join(' ')}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

// Dialog Body (optional - for content padding)
const DialogBody = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={[
      'px-6 py-4',
      'text-[var(--atom-card-fg)]',
      className,
    ]
      .filter(Boolean)
      .join(' ')}
    {...props}
  />
);
DialogBody.displayName = 'DialogBody';

export {
  Dialog,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogBody,
};
