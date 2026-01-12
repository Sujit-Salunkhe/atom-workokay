// Paper.test.tsx
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import * as React from 'react';
import { Paper } from './Paper';

// Setup CSS variables for testing
beforeEach(() => {
  document.documentElement.style.setProperty('--atom-theme-bg', '#ffffff');
  document.documentElement.style.setProperty('--atom-theme-border', '#e5e7eb');
  document.documentElement.style.setProperty('--atom-border-xs2', '0 1px 2px 0 rgb(0 0 0 / 0.05)');
  document.documentElement.style.setProperty('--atom-border', '#d1d5db');
});

describe('Paper Component', () => {
  describe('Rendering', () => {
    it('should render with default props', () => {
      render(<Paper data-testid="paper">Content</Paper>);
      
      const paper = screen.getByTestId('paper');
      expect(paper).toBeInTheDocument();
      expect(paper.tagName).toBe('DIV');
      expect(paper).toHaveTextContent('Content');
    });

    it('should render children correctly', () => {
      render(
        <Paper>
          <p>Paragraph content</p>
          <span>Span content</span>
        </Paper>
      );

      expect(screen.getByText('Paragraph content')).toBeInTheDocument();
      expect(screen.getByText('Span content')).toBeInTheDocument();
    });

    it('should apply data-slot attribute', () => {
      render(<Paper data-testid="paper">Content</Paper>);
      
      const paper = screen.getByTestId('paper');
      expect(paper).toHaveAttribute('data-slot', 'paper');
    });

    it('should forward ref to the element', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<Paper ref={ref}>Content</Paper>);

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
      expect(ref.current).toHaveTextContent('Content');
    });
  });

  describe('Variant Props', () => {
    it('should render outlined variant by default', () => {
      render(<Paper data-testid="paper">Content</Paper>);
      
      const paper = screen.getByTestId('paper');
      expect(paper).toHaveClass('border');
      expect(paper).toHaveClass('border-[var(--atom-theme-border)]');
    });

    it('should render outlined variant when explicitly set', () => {
      render(
        <Paper variant="outlined" data-testid="paper">
          Content
        </Paper>
      );
      
      const paper = screen.getByTestId('paper');
      expect(paper).toHaveClass('border');
      expect(paper).toHaveClass('border-[var(--atom-theme-border)]');
    });

    it('should render flat variant', () => {
      render(
        <Paper variant="flat" data-testid="paper">
          Content
        </Paper>
      );
      
      const paper = screen.getByTestId('paper');
      expect(paper).not.toHaveClass('border');
    });

    it('should render dashed variant', () => {
      render(
        <Paper variant="dashed" data-testid="paper">
          Content
        </Paper>
      );
      
      const paper = screen.getByTestId('paper');
      expect(paper).toHaveClass('bg-transparent');
      expect(paper).toHaveClass('border');
      expect(paper).toHaveClass('border-dashed');
      expect(paper).toHaveClass('border-[var(--atom-border)]');
    });
  });

  describe('Size Props', () => {
    it('should render with medium size by default', () => {
      render(<Paper data-testid="paper">Content</Paper>);
      
      const paper = screen.getByTestId('paper');
      expect(paper).toHaveClass('text-base');
    });

    it('should render with small size', () => {
      render(
        <Paper size="sm" data-testid="paper">
          Content
        </Paper>
      );
      
      const paper = screen.getByTestId('paper');
      expect(paper).toHaveClass('text-sm');
    });

    it('should render with medium size', () => {
      render(
        <Paper size="md" data-testid="paper">
          Content
        </Paper>
      );
      
      const paper = screen.getByTestId('paper');
      expect(paper).toHaveClass('text-base');
    });

    it('should render with large size', () => {
      render(
        <Paper size="lg" data-testid="paper">
          Content
        </Paper>
      );
      
      const paper = screen.getByTestId('paper');
      expect(paper).toHaveClass('text-lg');
    });

    it('should render with no size', () => {
      render(
        <Paper size="none" data-testid="paper">
          Content
        </Paper>
      );
      
      const paper = screen.getByTestId('paper');
      expect(paper).not.toHaveClass('text-sm');
      expect(paper).not.toHaveClass('text-base');
      expect(paper).not.toHaveClass('text-lg');
    });
  });

  describe('Padding Props', () => {
    it('should render with medium padding by default', () => {
      render(<Paper data-testid="paper">Content</Paper>);
      
      const paper = screen.getByTestId('paper');
      expect(paper).toHaveClass('p-6');
    });

    it('should render with no padding', () => {
      render(
        <Paper padding="none" data-testid="paper">
          Content
        </Paper>
      );
      
      const paper = screen.getByTestId('paper');
      expect(paper).toHaveClass('p-0');
    });

    it('should render with small padding', () => {
      render(
        <Paper padding="sm" data-testid="paper">
          Content
        </Paper>
      );
      
      const paper = screen.getByTestId('paper');
      expect(paper).toHaveClass('p-4');
    });

    it('should render with medium padding', () => {
      render(
        <Paper padding="md" data-testid="paper">
          Content
        </Paper>
      );
      
      const paper = screen.getByTestId('paper');
      expect(paper).toHaveClass('p-6');
    });

    it('should render with large padding', () => {
      render(
        <Paper padding="lg" data-testid="paper">
          Content
        </Paper>
      );
      
      const paper = screen.getByTestId('paper');
      expect(paper).toHaveClass('p-8');
    });
  });

  describe('Radius Props', () => {
    it('should render with medium radius by default', () => {
      render(<Paper data-testid="paper">Content</Paper>);
      
      const paper = screen.getByTestId('paper');
      expect(paper).toHaveClass('rounded-md');
    });

    it('should render with no radius', () => {
      render(
        <Paper radius="none" data-testid="paper">
          Content
        </Paper>
      );
      
      const paper = screen.getByTestId('paper');
      expect(paper).toHaveClass('rounded-none');
    });

    it('should render with small radius', () => {
      render(
        <Paper radius="sm" data-testid="paper">
          Content
        </Paper>
      );
      
      const paper = screen.getByTestId('paper');
      expect(paper).toHaveClass('rounded-sm');
    });

    it('should render with medium radius', () => {
      render(
        <Paper radius="md" data-testid="paper">
          Content
        </Paper>
      );
      
      const paper = screen.getByTestId('paper');
      expect(paper).toHaveClass('rounded-md');
    });

    it('should render with large radius', () => {
      render(
        <Paper radius="lg" data-testid="paper">
          Content
        </Paper>
      );
      
      const paper = screen.getByTestId('paper');
      expect(paper).toHaveClass('rounded-lg');
    });
  });

  describe('Combined Variants', () => {
    it('should apply multiple variant props together', () => {
      render(
        <Paper
          variant="dashed"
          size="lg"
          padding="sm"
          radius="lg"
          data-testid="paper"
        >
          Content
        </Paper>
      );
      
      const paper = screen.getByTestId('paper');
      
      // Variant
      expect(paper).toHaveClass('border-dashed');
      
      // Size
      expect(paper).toHaveClass('text-lg');
      
      // Padding
      expect(paper).toHaveClass('p-4');
      
      // Radius
      expect(paper).toHaveClass('rounded-lg');
    });

    it('should handle all none values', () => {
      render(
        <Paper
          variant="flat"
          size="none"
          padding="none"
          radius="none"
          data-testid="paper"
        >
          Content
        </Paper>
      );
      
      const paper = screen.getByTestId('paper');
      expect(paper).toHaveClass('p-0');
      expect(paper).toHaveClass('rounded-none');
    });
  });

  describe('Base Styling', () => {
    it('should always apply base transition classes', () => {
      render(<Paper data-testid="paper">Content</Paper>);
      
      const paper = screen.getByTestId('paper');
      expect(paper).toHaveClass('transition-colors');
      expect(paper).toHaveClass('duration-200');
    });

    it('should always apply background color variable', () => {
      render(<Paper data-testid="paper">Content</Paper>);
      
      const paper = screen.getByTestId('paper');
      expect(paper).toHaveClass('bg-[var(--atom-theme-bg)]');
    });

    it('should always apply shadow variable', () => {
      render(<Paper data-testid="paper">Content</Paper>);
      
      const paper = screen.getByTestId('paper');
      expect(paper).toHaveClass('shadow-[var(--atom-border-xs2)]');
    });
  });

  describe('Custom className', () => {
    it('should accept and apply custom className', () => {
      render(
        <Paper className="custom-class" data-testid="paper">
          Content
        </Paper>
      );
      
      const paper = screen.getByTestId('paper');
      expect(paper).toHaveClass('custom-class');
    });

    it('should merge custom className with default classes', () => {
      render(
        <Paper className="custom-class" data-testid="paper">
          Content
        </Paper>
      );
      
      const paper = screen.getByTestId('paper');
      expect(paper).toHaveClass('custom-class');
      expect(paper).toHaveClass('p-6'); // default padding
      expect(paper).toHaveClass('rounded-md'); // default radius
    });

    it('should allow custom className to override styles', () => {
      render(
        <Paper className="p-12" data-testid="paper">
          Content
        </Paper>
      );
      
      const paper = screen.getByTestId('paper');
      expect(paper).toHaveClass('p-12');
    });
  });

  describe('HTML Attributes', () => {
    it('should forward standard HTML attributes', () => {
      render(
        <Paper
          id="custom-id"
          role="region"
          aria-label="Custom paper"
          data-custom="value"
          data-testid="paper"
        >
          Content
        </Paper>
      );
      
      const paper = screen.getByTestId('paper');
      expect(paper).toHaveAttribute('id', 'custom-id');
      expect(paper).toHaveAttribute('role', 'region');
      expect(paper).toHaveAttribute('aria-label', 'Custom paper');
      expect(paper).toHaveAttribute('data-custom', 'value');
    });

    it('should handle onClick event', () => {
      let clicked = false;
      const handleClick = () => {
        clicked = true;
      };

      render(
        <Paper onClick={handleClick} data-testid="paper">
          Content
        </Paper>
      );
      
      const paper = screen.getByTestId('paper');
      paper.click();
      
      expect(clicked).toBe(true);
    });

    it('should support style prop', () => {
      render(
        <Paper style={{ color: 'red' }} data-testid="paper">
          Content
        </Paper>
      );
      
      const paper = screen.getByTestId('paper');
      expect(paper).toHaveStyle({ color: 'red' });
    });
  });

  describe('asChild Prop', () => {
    it('should render as div when asChild is false', () => {
      render(
        <Paper asChild={false} data-testid="paper">
          Content
        </Paper>
      );
      
      const paper = screen.getByTestId('paper');
      expect(paper.tagName).toBe('DIV');
    });

    it('should render as div by default when asChild not provided', () => {
      render(<Paper data-testid="paper">Content</Paper>);
      
      const paper = screen.getByTestId('paper');
      expect(paper.tagName).toBe('DIV');
    });

    it('should render as child element when asChild is true', () => {
      render(
        <Paper asChild>
          <button data-testid="paper-button">Click me</button>
        </Paper>
      );
      
      const button = screen.getByTestId('paper-button');
      expect(button.tagName).toBe('BUTTON');
      expect(button).toHaveTextContent('Click me');
    });

    it('should merge Paper classes with child element when asChild is true', () => {
      render(
        <Paper asChild variant="outlined" padding="lg">
          <button data-testid="paper-button" className="custom-btn">
            Click me
          </button>
        </Paper>
      );
      
      const button = screen.getByTestId('paper-button');
      
      // Should have Paper classes
      expect(button).toHaveClass('border');
      expect(button).toHaveClass('p-8');
      expect(button).toHaveClass('rounded-md');
      
      // Should preserve child's original class
      expect(button).toHaveClass('custom-btn');
    });

    it('should work with asChild and custom link element', () => {
      render(
        <Paper asChild variant="flat" padding="sm">
          <a href="#test" data-testid="paper-link">
            Link text
          </a>
        </Paper>
      );
      
      const link = screen.getByTestId('paper-link');
      expect(link.tagName).toBe('A');
      expect(link).toHaveAttribute('href', '#test');
      expect(link).toHaveClass('p-4');
    });

    it('should forward props to child when using asChild', () => {
      const handleClick = vi.fn();
      
      render(
        <Paper asChild onClick={handleClick}>
          <button data-testid="paper-button">Click me</button>
        </Paper>
      );
      
      const button = screen.getByTestId('paper-button');
      button.click();
      
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should merge child event handlers with Paper props when using asChild', () => {
      const paperClick = vi.fn();
      const buttonClick = vi.fn();
      
      render(
        <Paper asChild onClick={paperClick}>
          <button onClick={buttonClick} data-testid="paper-button">
            Click me
          </button>
        </Paper>
      );
      
      const button = screen.getByTestId('paper-button');
      button.click();
      
      // Both handlers should be called
      expect(paperClick).toHaveBeenCalledTimes(1);
      expect(buttonClick).toHaveBeenCalledTimes(1);
    });

    it('should maintain data-slot attribute when using asChild', () => {
      render(
        <Paper asChild>
          <button data-testid="paper-button">Click me</button>
        </Paper>
      );
      
      const button = screen.getByTestId('paper-button');
      expect(button).toHaveAttribute('data-slot', 'paper');
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty children', () => {
      render(<Paper data-testid="paper" />);
      
      const paper = screen.getByTestId('paper');
      expect(paper).toBeInTheDocument();
      expect(paper).toBeEmptyDOMElement();
    });

    it('should handle null children', () => {
      render(<Paper data-testid="paper">{null}</Paper>);
      
      const paper = screen.getByTestId('paper');
      expect(paper).toBeInTheDocument();
      expect(paper).toBeEmptyDOMElement();
    });

    it('should handle conditional rendering of children', () => {
      const showContent = true;
      
      render(
        <Paper data-testid="paper">
          {showContent && <p>Conditional content</p>}
        </Paper>
      );
      
      expect(screen.getByText('Conditional content')).toBeInTheDocument();
    });

    it('should handle multiple children with fragments', () => {
      render(
        <Paper data-testid="paper">
          <>
            <p>First</p>
            <p>Second</p>
          </>
        </Paper>
      );
      
      expect(screen.getByText('First')).toBeInTheDocument();
      expect(screen.getByText('Second')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should support ARIA attributes', () => {
      render(
        <Paper
          role="article"
          aria-label="Main content"
          aria-describedby="description"
          data-testid="paper"
        >
          Content
        </Paper>
      );
      
      const paper = screen.getByTestId('paper');
      expect(paper).toHaveAttribute('role', 'article');
      expect(paper).toHaveAttribute('aria-label', 'Main content');
      expect(paper).toHaveAttribute('aria-describedby', 'description');
    });

    it('should be accessible by role when role is provided', () => {
      render(
        <Paper role="region" aria-label="Content area">
          Content
        </Paper>
      );
      
      const paper = screen.getByRole('region', { name: 'Content area' });
      expect(paper).toBeInTheDocument();
    });
  });

  describe('Type Exports', () => {
    it('should export PaperVariant type', () => {
      const variants: Array<'outlined' | 'flat' | 'dashed'> = [
        'outlined',
        'flat',
        'dashed',
      ];
      
      variants.forEach((variant) => {
        render(
          <Paper variant={variant} data-testid={`paper-${variant}`}>
            {variant}
          </Paper>
        );
        
        expect(screen.getByTestId(`paper-${variant}`)).toBeInTheDocument();
      });
    });

    it('should export PaperSize type', () => {
      const sizes: Array<'none' | 'sm' | 'md' | 'lg'> = ['none', 'sm', 'md', 'lg'];
      
      sizes.forEach((size) => {
        render(
          <Paper size={size} data-testid={`paper-${size}`}>
            {size}
          </Paper>
        );
        
        expect(screen.getByTestId(`paper-${size}`)).toBeInTheDocument();
      });
    });

    it('should export PaperPadding type', () => {
      const paddings: Array<'none' | 'sm' | 'md' | 'lg'> = [
        'none',
        'sm',
        'md',
        'lg',
      ];
      
      paddings.forEach((padding) => {
        render(
          <Paper padding={padding} data-testid={`paper-${padding}`}>
            {padding}
          </Paper>
        );
        
        expect(screen.getByTestId(`paper-${padding}`)).toBeInTheDocument();
      });
    });

    it('should export PaperRadius type', () => {
      const radiuses: Array<'none' | 'sm' | 'md' | 'lg'> = [
        'none',
        'sm',
        'md',
        'lg',
      ];
      
      radiuses.forEach((radius) => {
        render(
          <Paper radius={radius} data-testid={`paper-${radius}`}>
            {radius}
          </Paper>
        );
        
        expect(screen.getByTestId(`paper-${radius}`)).toBeInTheDocument();
      });
    });
  });

  describe('Real World Usage Examples', () => {
    it('should work as a card container', () => {
      render(
        <Paper variant="outlined" padding="lg" radius="lg" data-testid="card">
          <h2>Card Title</h2>
          <p>Card description</p>
          <button>Action</button>
        </Paper>
      );
      
      const card = screen.getByTestId('card');
      expect(card).toHaveClass('border', 'p-8', 'rounded-lg');
      expect(screen.getByText('Card Title')).toBeInTheDocument();
    });

    it('should work as a dashed upload area', () => {
      render(
        <Paper
          variant="dashed"
          padding="lg"
          radius="md"
          role="button"
          aria-label="Upload area"
          data-testid="upload"
        >
          <p>Drop files here</p>
        </Paper>
      );
      
      const upload = screen.getByTestId('upload');
      expect(upload).toHaveClass('border-dashed', 'bg-transparent');
      expect(upload).toHaveAttribute('role', 'button');
    });

    it('should work with asChild for clickable card', () => {
      const handleClick = vi.fn();
      
      render(
        <Paper asChild variant="outlined" padding="md">
          <button onClick={handleClick} data-testid="clickable-card">
            <h3>Clickable Card</h3>
            <p>Click anywhere</p>
          </button>
        </Paper>
      );
      
      const card = screen.getByTestId('clickable-card');
      expect(card.tagName).toBe('BUTTON');
      
      card.click();
      expect(handleClick).toHaveBeenCalled();
    });

    it('should work as a section wrapper with semantic HTML', () => {
      render(
        <Paper asChild variant="flat" padding="lg">
          <section aria-labelledby="section-title" data-testid="section">
            <h2 id="section-title">Section Title</h2>
            <p>Section content</p>
          </section>
        </Paper>
      );
      
      const section = screen.getByTestId('section');
      expect(section.tagName).toBe('SECTION');
      expect(section).toHaveAttribute('aria-labelledby', 'section-title');
    });
  });
});

