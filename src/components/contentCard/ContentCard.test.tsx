// src/components/ui/content-card.test.tsx
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import * as React from 'react';
import { ContentCard } from './ContentCard';
import { Info, CheckCircle, AlertTriangle, XCircle, Bell } from 'lucide-react';


// Setup CSS variables for testing
beforeEach(() => {
  document.documentElement.style.setProperty('--atom-theme-bg', '#ffffff');
  document.documentElement.style.setProperty('--atom-theme-border', '#e5e7eb');
  document.documentElement.style.setProperty('--atom-theme-text', '#111827');
  document.documentElement.style.setProperty('--atom-info', '#3b82f6');
  document.documentElement.style.setProperty('--atom-success', '#10b981');
  document.documentElement.style.setProperty('--atom-warning', '#f59e0b');
  document.documentElement.style.setProperty('--atom-error', '#ef4444');
  document.documentElement.style.setProperty('--atom-badge-archived-border', '#d1d5db');
});


describe('ContentCard Component', () => {
  describe('Rendering', () => {
    it('should render with default props', () => {
      render(<ContentCard>Card content</ContentCard>);
      
      const card = screen.getByRole('region');
      expect(card).toBeInTheDocument();
      expect(screen.getByText('Card content')).toBeInTheDocument();
    });

    it('should render with custom className', () => {
      render(
        <ContentCard className="custom-card-class">
          Content
        </ContentCard>
      );
      
      const card = screen.getByRole('region');
      expect(card).toHaveClass('custom-card-class');
    });

    it('should apply data-slot attribute', () => {
      render(<ContentCard>Content</ContentCard>);
      
      const card = screen.getByRole('region');
      expect(card).toHaveAttribute('data-slot', 'content-card');
    });

    it('should forward ref correctly', () => {
      const ref = React.createRef<HTMLDivElement>();
      
      render(<ContentCard ref={ref}>Content</ContentCard>);
      
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
      expect(ref.current).toHaveAttribute('data-slot', 'content-card');
    });
  });

  describe('Variants', () => {
    it('should render with default variant', () => {
      render(<ContentCard>Default content</ContentCard>);
      
      const card = screen.getByRole('region');
      expect(card).toBeInTheDocument();
    });

    it('should render with info variant', () => {
      render(<ContentCard variant="info">Info message</ContentCard>);
      
      const card = screen.getByRole('region');
      expect(card).toBeInTheDocument();
      expect(screen.getByText('Info message')).toBeInTheDocument();
    });

    it('should render with success variant', () => {
      render(<ContentCard variant="success">Success message</ContentCard>);
      
      const card = screen.getByRole('region');
      expect(card).toBeInTheDocument();
      expect(screen.getByText('Success message')).toBeInTheDocument();
    });

    it('should render with warning variant', () => {
      render(<ContentCard variant="warning">Warning message</ContentCard>);
      
      const card = screen.getByRole('region');
      expect(card).toBeInTheDocument();
      expect(screen.getByText('Warning message')).toBeInTheDocument();
    });

    it('should render with error variant', () => {
      render(<ContentCard variant="error">Error message</ContentCard>);
      
      const card = screen.getByRole('region');
      expect(card).toBeInTheDocument();
      expect(screen.getByText('Error message')).toBeInTheDocument();
    });

    it('should render with neutral variant', () => {
      render(<ContentCard variant="neutral">Neutral message</ContentCard>);
      
      const card = screen.getByRole('region');
      expect(card).toBeInTheDocument();
      expect(screen.getByText('Neutral message')).toBeInTheDocument();
    });
  });

  describe('Sizes', () => {
    it('should render with small size', () => {
      render(<ContentCard size="sm">Small card</ContentCard>);
      
      const card = screen.getByRole('region');
      expect(card).toHaveClass('p-3', 'text-xs', 'gap-2');
    });

    it('should render with medium size (default)', () => {
      render(<ContentCard size="md">Medium card</ContentCard>);
      
      const card = screen.getByRole('region');
      expect(card).toHaveClass('p-4', 'text-sm', 'gap-3');
    });

    it('should render with large size', () => {
      render(<ContentCard size="lg">Large card</ContentCard>);
      
      const card = screen.getByRole('region');
      expect(card).toHaveClass('p-6', 'text-base', 'gap-4');
    });
  });

  describe('Title and Icon', () => {
    it('should render with title only', () => {
      render(
        <ContentCard title="Card Title">
          Content here
        </ContentCard>
      );
      
      const title = screen.getByRole('heading', { level: 3 });
      expect(title).toBeInTheDocument();
      expect(title).toHaveTextContent('Card Title');
      expect(title).toHaveClass('font-semibold');
    });

    it('should render with icon only', () => {
      render(
        <ContentCard icon={<Info data-testid="info-icon" />}>
          Content here
        </ContentCard>
      );
      
      const icon = screen.getByTestId('info-icon');
      expect(icon).toBeInTheDocument();
    });

    it('should render with both title and icon', () => {
      render(
        <ContentCard 
          title="Important Info" 
          icon={<Info data-testid="info-icon" />}
        >
          Content here
        </ContentCard>
      );
      
      const title = screen.getByRole('heading', { level: 3 });
      const icon = screen.getByTestId('info-icon');
      
      expect(title).toBeInTheDocument();
      expect(icon).toBeInTheDocument();
    });

    it('should not render header section when no title or icon', () => {
      render(<ContentCard>Content only</ContentCard>);
      
      const heading = screen.queryByRole('heading');
      expect(heading).not.toBeInTheDocument();
    });

    it('should apply aria-hidden to icon', () => {
      render(
        <ContentCard icon={<Info data-testid="info-icon" />}>
          Content
        </ContentCard>
      );
      
      const icon = screen.getByTestId('info-icon');
      const iconSpan = icon.parentElement;
      expect(iconSpan).toHaveAttribute('aria-hidden', 'true');
    });
  });

  describe('Icon Colors by Variant', () => {
    it('should apply info color to icon with info variant', () => {
      render(
        <ContentCard variant="info" icon={<Info data-testid="info-icon" />}>
          Info content
        </ContentCard>
      );
      
      const icon = screen.getByTestId('info-icon');
      const iconSpan = icon.parentElement;
      expect(iconSpan).toHaveClass('text-(--atom-info)');
    });

    it('should apply success color to icon with success variant', () => {
      render(
        <ContentCard variant="success" icon={<CheckCircle data-testid="success-icon" />}>
          Success content
        </ContentCard>
      );
      
      const icon = screen.getByTestId('success-icon');
      const iconSpan = icon.parentElement;
      expect(iconSpan).toHaveClass('text-(--atom-success)');
    });

    it('should apply warning color to icon with warning variant', () => {
      render(
        <ContentCard variant="warning" icon={<AlertTriangle data-testid="warning-icon" />}>
          Warning content
        </ContentCard>
      );
      
      const icon = screen.getByTestId('warning-icon');
      const iconSpan = icon.parentElement;
      expect(iconSpan).toHaveClass('text-(--atom-warning)');
    });

    it('should apply error color to icon with error variant', () => {
      render(
        <ContentCard variant="error" icon={<XCircle data-testid="error-icon" />}>
          Error content
        </ContentCard>
      );
      
      const icon = screen.getByTestId('error-icon');
      const iconSpan = icon.parentElement;
      expect(iconSpan).toHaveClass('text-(--atom-error)');
    });

    it('should apply neutral color to icon with neutral variant', () => {
      render(
        <ContentCard variant="neutral" icon={<Bell data-testid="neutral-icon" />}>
          Neutral content
        </ContentCard>
      );
      
      const icon = screen.getByTestId('neutral-icon');
      const iconSpan = icon.parentElement;
      expect(iconSpan).toHaveClass('text-muted-foreground');
    });

    it('should apply default color to icon with default variant', () => {
      render(
        <ContentCard variant="default" icon={<Info data-testid="default-icon" />}>
          Default content
        </ContentCard>
      );
      
      const icon = screen.getByTestId('default-icon');
      const iconSpan = icon.parentElement;
      expect(iconSpan).toHaveClass('text-(--atom-theme-text)');
    });
  });

  describe('Content', () => {
    it('should render children content', () => {
      render(
        <ContentCard>
          <p>This is the main content</p>
        </ContentCard>
      );
      
      expect(screen.getByText('This is the main content')).toBeInTheDocument();
    });

    it('should render complex children', () => {
      render(
        <ContentCard>
          <div>
            <p>Paragraph 1</p>
            <p>Paragraph 2</p>
            <ul>
              <li>Item 1</li>
              <li>Item 2</li>
            </ul>
          </div>
        </ContentCard>
      );
      
      expect(screen.getByText('Paragraph 1')).toBeInTheDocument();
      expect(screen.getByText('Paragraph 2')).toBeInTheDocument();
      expect(screen.getByText('Item 1')).toBeInTheDocument();
      expect(screen.getByText('Item 2')).toBeInTheDocument();
    });

    it('should apply proper content styling', () => {
      render(
        <ContentCard>
          <div data-testid="content-wrapper">Content text</div>
        </ContentCard>
      );
      
      const content = screen.getByTestId('content-wrapper');
      const contentDiv = content.parentElement;
      expect(contentDiv).toHaveClass('flex-1', 'leading-relaxed');
    });
  });

  describe('Footer', () => {
    it('should render footer when provided', () => {
      render(
        <ContentCard footer="Footer content">
          Main content
        </ContentCard>
      );
      
      expect(screen.getByText('Footer content')).toBeInTheDocument();
    });

    it('should not render footer when not provided', () => {
      render(<ContentCard>Main content</ContentCard>);
      
      const footer = screen.queryByText(/footer/i);
      expect(footer).not.toBeInTheDocument();
    });

    it('should render complex footer content', () => {
      render(
        <ContentCard 
          footer={
            <div>
              <span>Last updated: </span>
              <time>2024-01-15</time>
            </div>
          }
        >
          Main content
        </ContentCard>
      );
      
      expect(screen.getByText('Last updated:')).toBeInTheDocument();
      expect(screen.getByText('2024-01-15')).toBeInTheDocument();
    });

    it('should apply footer styling', () => {
      render(
        <ContentCard footer={<span data-testid="footer-text">Footer text</span>}>
          Content
        </ContentCard>
      );
      
      const footerText = screen.getByTestId('footer-text');
      const footer = footerText.parentElement;
      expect(footer).toHaveClass('text-xs', 'opacity-80', 'border-t', 'border-current/10', 'pt-2', 'mt-1');
    });
  });

  describe('Accessibility', () => {
    it('should have role="region"', () => {
      render(<ContentCard>Content</ContentCard>);
      
      const card = screen.getByRole('region');
      expect(card).toBeInTheDocument();
    });

    it('should have aria-live="polite" for error variant', () => {
      render(<ContentCard variant="error">Error message</ContentCard>);
      
      const card = screen.getByRole('region');
      expect(card).toHaveAttribute('aria-live', 'polite');
    });

    it('should have aria-live="polite" for warning variant', () => {
      render(<ContentCard variant="warning">Warning message</ContentCard>);
      
      const card = screen.getByRole('region');
      expect(card).toHaveAttribute('aria-live', 'polite');
    });

    it('should have aria-live="off" for info variant', () => {
      render(<ContentCard variant="info">Info message</ContentCard>);
      
      const card = screen.getByRole('region');
      expect(card).toHaveAttribute('aria-live', 'off');
    });

    it('should have aria-live="off" for success variant', () => {
      render(<ContentCard variant="success">Success message</ContentCard>);
      
      const card = screen.getByRole('region');
      expect(card).toHaveAttribute('aria-live', 'off');
    });

    it('should have aria-live="off" for neutral variant', () => {
      render(<ContentCard variant="neutral">Neutral message</ContentCard>);
      
      const card = screen.getByRole('region');
      expect(card).toHaveAttribute('aria-live', 'off');
    });

    it('should have aria-live="off" for default variant', () => {
      render(<ContentCard>Default message</ContentCard>);
      
      const card = screen.getByRole('region');
      expect(card).toHaveAttribute('aria-live', 'off');
    });

    it('should have accessible heading when title is provided', () => {
      render(
        <ContentCard title="Important Information">
          Content
        </ContentCard>
      );
      
      const heading = screen.getByRole('heading', { 
        level: 3, 
        name: 'Important Information' 
      });
      expect(heading).toBeInTheDocument();
    });
  });

  describe('HTML Attributes', () => {
    it('should accept and apply custom HTML attributes', () => {
      render(
        <ContentCard 
          id="custom-card" 
          data-testid="test-card"
          aria-label="Custom card label"
        >
          Content
        </ContentCard>
      );
      
      const card = screen.getByTestId('test-card');
      expect(card).toHaveAttribute('id', 'custom-card');
      expect(card).toHaveAttribute('aria-label', 'Custom card label');
    });

    it('should accept onClick handler', () => {
      const handleClick = vi.fn();
      
      render(
        <ContentCard onClick={handleClick}>
          Clickable content
        </ContentCard>
      );
      
      const card = screen.getByRole('region');
      card.click();
      
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('Combination Tests', () => {
    it('should render complete card with all props', () => {
      render(
        <ContentCard
          variant="info"
          size="lg"
          title="Information Card"
          icon={<Info data-testid="icon" />}
          footer="Last updated: Today"
          className="custom-class"
        >
          <p>This is the main content of the card.</p>
          <p>It can contain multiple paragraphs.</p>
        </ContentCard>
      );
      
      expect(screen.getByRole('region')).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: 'Information Card' })).toBeInTheDocument();
      expect(screen.getByTestId('icon')).toBeInTheDocument();
      expect(screen.getByText('This is the main content of the card.')).toBeInTheDocument();
      expect(screen.getByText('It can contain multiple paragraphs.')).toBeInTheDocument();
      expect(screen.getByText('Last updated: Today')).toBeInTheDocument();
    });

    it('should work with all size and variant combinations', () => {
      const sizes = ['sm', 'md', 'lg'] as const;
      const variants = ['default', 'info', 'success', 'warning', 'error', 'neutral'] as const;
      
      variants.forEach((variant) => {
        sizes.forEach((size) => {
          const { unmount } = render(
            <ContentCard variant={variant} size={size}>
              Content for {variant} {size}
            </ContentCard>
          );
          
          const card = screen.getByRole('region');
          expect(card).toBeInTheDocument();
          
          unmount();
        });
      });
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty string as children', () => {
      render(<ContentCard>{''}</ContentCard>);
      
      const card = screen.getByRole('region');
      expect(card).toBeInTheDocument();
    });

    it('should handle numeric children', () => {
      render(<ContentCard>{12345}</ContentCard>);
      
      expect(screen.getByText('12345')).toBeInTheDocument();
    });

    it('should handle boolean children', () => {
      render(
        <ContentCard>
          {true && <span>Conditional content</span>}
        </ContentCard>
      );
      
      expect(screen.getByText('Conditional content')).toBeInTheDocument();
    });

    it('should handle null icon gracefully', () => {
      render(
        <ContentCard icon={null}>
          Content
        </ContentCard>
      );
      
      const card = screen.getByRole('region');
      expect(card).toBeInTheDocument();
    });

    it('should handle empty title string', () => {
      render(
        <ContentCard title="">
          Content
        </ContentCard>
      );
      
      const heading = screen.queryByRole('heading');
      expect(heading).not.toBeInTheDocument();
    });
  });

  describe('Layout and Spacing', () => {
    it('should have proper flex layout', () => {
      render(
        <ContentCard title="Title" footer="Footer">
          Content
        </ContentCard>
      );
      
      const card = screen.getByRole('region');
      expect(card).toHaveClass('flex', 'flex-col');
    });

    it('should apply rounded corners', () => {
      render(<ContentCard>Content</ContentCard>);
      
      const card = screen.getByRole('region');
      expect(card).toHaveClass('rounded-md');
    });

    it('should apply border', () => {
      render(<ContentCard>Content</ContentCard>);
      
      const card = screen.getByRole('region');
      expect(card).toHaveClass('border');
    });

    it('should apply transition classes', () => {
      render(<ContentCard>Content</ContentCard>);
      
      const card = screen.getByRole('region');
      expect(card).toHaveClass('transition-[background-color,border-color,box-shadow]');
      expect(card).toHaveClass('duration-200');
    });
  });
});


describe('ContentCard TypeScript Types', () => {
  it('should accept valid variant types', () => {
    const variants: Array<'default' | 'info' | 'success' | 'warning' | 'error' | 'neutral'> = 
      ['default', 'info', 'success', 'warning', 'error', 'neutral'];
    
    variants.forEach((variant) => {
      const { unmount } = render(
        <ContentCard variant={variant}>Content</ContentCard>
      );
      unmount();
    });
    
    expect(true).toBe(true);
  });

  it('should accept valid size types', () => {
    const sizes: Array<'sm' | 'md' | 'lg'> = ['sm', 'md', 'lg'];
    
    sizes.forEach((size) => {
      const { unmount } = render(
        <ContentCard size={size}>Content</ContentCard>
      );
      unmount();
    });
    
    expect(true).toBe(true);
  });
});
