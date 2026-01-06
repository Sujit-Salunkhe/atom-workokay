import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  Card,
  CardHeader,
  CardTitle,
  CardSubtitle,
  CardBody,
  CardFooter,
  CardMedia,
} from './Card';

describe('Card', () => {
  describe('Card Root', () => {
    it('should render children correctly', () => {
      render(<Card>Test Content</Card>);
      expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    it('should apply elevated variant by default', () => {
      const { container } = render(<Card>Content</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass('shadow-md');
    });

    it('should apply outlined variant', () => {
      const { container } = render(<Card variant="outlined">Content</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass('shadow-sm');
    });

    it('should apply flat variant', () => {
      const { container } = render(<Card variant="flat">Content</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass('border-transparent');
      expect(card).toHaveClass('shadow-none');
    });

    it('should apply hoverable styles', () => {
      const { container } = render(<Card hoverable>Content</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass('hover:shadow-xl');
      expect(card).toHaveClass('cursor-pointer');
    });

    it('should apply clickable styles and tabIndex', () => {
      const { container } = render(<Card clickable>Content</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass('cursor-pointer');
      expect(card).toHaveAttribute('tabIndex', '0');
    });

    it('should not have tabIndex when not clickable', () => {
      const { container } = render(<Card>Content</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card).not.toHaveAttribute('tabIndex');
    });

    it('should handle onClick event when clickable', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(
        <Card clickable onClick={handleClick}>
          Content
        </Card>
      );
      const card = screen.getByText('Content').parentElement as HTMLElement;
      await user.click(card);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should forward ref correctly', () => {
      const ref = vi.fn();
      render(<Card ref={ref}>Content</Card>);
      expect(ref).toHaveBeenCalled();
    });

    it('should merge custom className', () => {
      const { container } = render(
        <Card className="custom-class">Content</Card>
      );
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass('custom-class');
      expect(card).toHaveClass('rounded-lg');
    });
  });

  describe('CardHeader', () => {
    it('should render children correctly', () => {
      render(
        <Card>
          <CardHeader>Header Content</CardHeader>
        </Card>
      );
      expect(screen.getByText('Header Content')).toBeInTheDocument();
    });

    it('should apply divider class when divider prop is true', () => {
      render(
        <Card>
          <CardHeader divider>Header</CardHeader>
        </Card>
      );
      const header = screen.getByText('Header').parentElement as HTMLElement;
      expect(header).toHaveClass('border-b');
    });

    it('should apply left alignment by default', () => {
      render(
        <Card>
          <CardHeader>Header</CardHeader>
        </Card>
      );
      const header = screen.getByText('Header').parentElement as HTMLElement;
      expect(header).toHaveClass('text-left');
    });

    it('should apply center alignment', () => {
      render(
        <Card>
          <CardHeader align="center">Header</CardHeader>
        </Card>
      );
      const header = screen.getByText('Header').parentElement as HTMLElement;
      expect(header).toHaveClass('text-center');
    });

    it('should render avatar when provided', () => {
      render(
        <Card>
          <CardHeader avatar={<div>Avatar</div>}>Header</CardHeader>
        </Card>
      );
      expect(screen.getByText('Avatar')).toBeInTheDocument();
    });

    it('should render action when provided', () => {
      render(
        <Card>
          <CardHeader action={<button>Action</button>}>Header</CardHeader>
        </Card>
      );
      expect(screen.getByRole('button', { name: 'Action' })).toBeInTheDocument();
    });

    it('should use flex layout when avatar or action is provided', () => {
      const { container } = render(
        <Card>
          <CardHeader avatar={<div>Avatar</div>}>Header</CardHeader>
        </Card>
      );
      const flexContainer = container.querySelector('.flex.items-start.gap-4');
      expect(flexContainer).toBeInTheDocument();
    });
  });

  describe('CardTitle', () => {
    it('should render title text', () => {
      render(
        <Card>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
          </CardHeader>
        </Card>
      );
      expect(screen.getByText('Card Title')).toBeInTheDocument();
    });

    it('should render as h3 element', () => {
      render(
        <Card>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
          </CardHeader>
        </Card>
      );
      const title = screen.getByText('Card Title');
      expect(title.tagName).toBe('H3');
    });

    it('should apply correct styling classes', () => {
      render(
        <Card>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
          </CardHeader>
        </Card>
      );
      const title = screen.getByText('Card Title');
      expect(title).toHaveClass('text-lg');
      expect(title).toHaveClass('font-semibold');
    });
  });

  describe('CardSubtitle', () => {
    it('should render subtitle text', () => {
      render(
        <Card>
          <CardHeader>
            <CardSubtitle>Card Subtitle</CardSubtitle>
          </CardHeader>
        </Card>
      );
      expect(screen.getByText('Card Subtitle')).toBeInTheDocument();
    });

    it('should render as p element', () => {
      render(
        <Card>
          <CardHeader>
            <CardSubtitle>Card Subtitle</CardSubtitle>
          </CardHeader>
        </Card>
      );
      const subtitle = screen.getByText('Card Subtitle');
      expect(subtitle.tagName).toBe('P');
    });

    it('should apply correct styling classes', () => {
      render(
        <Card>
          <CardHeader>
            <CardSubtitle>Card Subtitle</CardSubtitle>
          </CardHeader>
        </Card>
      );
      const subtitle = screen.getByText('Card Subtitle');
      expect(subtitle).toHaveClass('text-sm');
      expect(subtitle).toHaveClass('mt-1');
    });
  });

  describe('CardBody', () => {
    it('should render body content', () => {
      render(
        <Card>
          <CardBody>Body Content</CardBody>
        </Card>
      );
      expect(screen.getByText('Body Content')).toBeInTheDocument();
    });

    it('should apply padding by default', () => {
      render(
        <Card>
          <CardBody>Body</CardBody>
        </Card>
      );
      const body = screen.getByText('Body').parentElement as HTMLElement;
      expect(body).toHaveClass('px-6');
      expect(body).toHaveClass('py-4');
    });

    it('should remove padding when noPadding is true', () => {
      render(
        <Card>
          <CardBody noPadding>Body</CardBody>
        </Card>
      );
      const body = screen.getByText('Body').parentElement as HTMLElement;
      expect(body).not.toHaveClass('px-6');
      expect(body).not.toHaveClass('py-4');
    });
  });

  describe('CardFooter', () => {
    it('should render footer content', () => {
      render(
        <Card>
          <CardFooter>Footer Content</CardFooter>
        </Card>
      );
      expect(screen.getByText('Footer Content')).toBeInTheDocument();
    });

    it('should apply divider when divider prop is true', () => {
      render(
        <Card>
          <CardFooter divider>Footer</CardFooter>
        </Card>
      );
      const footer = screen.getByText('Footer').parentElement as HTMLElement;
      expect(footer).toHaveClass('border-t');
    });

    it('should apply right alignment by default', () => {
      render(
        <Card>
          <CardFooter>Footer</CardFooter>
        </Card>
      );
      const footer = screen.getByText('Footer').parentElement as HTMLElement;
      expect(footer).toHaveClass('justify-end');
    });

    it('should apply left alignment', () => {
      render(
        <Card>
          <CardFooter align="left">Footer</CardFooter>
        </Card>
      );
      const footer = screen.getByText('Footer').parentElement as HTMLElement;
      expect(footer).toHaveClass('justify-start');
    });

    it('should apply between alignment', () => {
      render(
        <Card>
          <CardFooter align="between">Footer</CardFooter>
        </Card>
      );
      const footer = screen.getByText('Footer').parentElement as HTMLElement;
      expect(footer).toHaveClass('justify-between');
    });
  });

  describe('CardMedia', () => {
    it('should render image with src and alt', () => {
      render(
        <Card>
          <CardMedia src="/test.jpg" alt="Test Image" />
        </Card>
      );
      const image = screen.getByAltText('Test Image');
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('src', '/test.jpg');
    });

    it('should apply md size by default', () => {
      render(
        <Card>
          <CardMedia src="/test.jpg" alt="Test" />
        </Card>
      );
      const image = screen.getByAltText('Test');
      expect(image).toHaveClass('h-48');
    });

    it('should apply custom size', () => {
      render(
        <Card>
          <CardMedia src="/test.jpg" alt="Test" size="lg" />
        </Card>
      );
      const image = screen.getByAltText('Test');
      expect(image).toHaveClass('h-64');
    });

    it('should apply cover object fit by default', () => {
      render(
        <Card>
          <CardMedia src="/test.jpg" alt="Test" />
        </Card>
      );
      const image = screen.getByAltText('Test');
      expect(image).toHaveClass('object-cover');
    });

    it('should apply custom object fit', () => {
      render(
        <Card>
          <CardMedia src="/test.jpg" alt="Test" objectFit="contain" />
        </Card>
      );
      const image = screen.getByAltText('Test');
      expect(image).toHaveClass('object-contain');
    });

    it('should forward ref correctly', () => {
      const ref = vi.fn();
      render(
        <Card>
          <CardMedia ref={ref} src="/test.jpg" alt="Test" />
        </Card>
      );
      expect(ref).toHaveBeenCalled();
    });
  });

  describe('Complete Card Composition', () => {
    it('should render all card components together', () => {
      render(
        <Card>
          <CardHeader divider>
            <CardTitle>Title</CardTitle>
            <CardSubtitle>Subtitle</CardSubtitle>
          </CardHeader>
          <CardBody>Body content</CardBody>
          <CardFooter divider>
            <button>Action</button>
          </CardFooter>
        </Card>
      );

      expect(screen.getByText('Title')).toBeInTheDocument();
      expect(screen.getByText('Subtitle')).toBeInTheDocument();
      expect(screen.getByText('Body content')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Action' })).toBeInTheDocument();
    });

    it('should work with only body', () => {
      render(
        <Card>
          <CardBody>Simple card</CardBody>
        </Card>
      );
      expect(screen.getByText('Simple card')).toBeInTheDocument();
    });

    it('should work with media and content', () => {
      render(
        <Card>
          <CardMedia src="/image.jpg" alt="Card image" size="lg" />
          <CardHeader>
            <CardTitle>Image Card</CardTitle>
          </CardHeader>
          <CardBody>Description</CardBody>
        </Card>
      );

      expect(screen.getByAltText('Card image')).toBeInTheDocument();
      expect(screen.getByText('Image Card')).toBeInTheDocument();
      expect(screen.getByText('Description')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should be keyboard accessible when clickable', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(
        <Card clickable onClick={handleClick}>
          <CardBody>Clickable Card</CardBody>
        </Card>
      );

      const card = screen.getByText('Clickable Card').closest('div');
      card?.focus();
      expect(card).toHaveFocus();
      
      await user.keyboard('{Enter}');
      expect(handleClick).toHaveBeenCalled();
    });

    it('should have proper image alt text', () => {
      render(
        <Card>
          <CardMedia src="/test.jpg" alt="Descriptive alt text" />
        </Card>
      );
      const image = screen.getByAltText('Descriptive alt text');
      expect(image).toBeInTheDocument();
    });
  });

  describe('Variant Combinations', () => {
    it('should support elevated + hoverable', () => {
      const { container } = render(
        <Card variant="elevated" hoverable>
          Content
        </Card>
      );
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass('shadow-md');
      expect(card).toHaveClass('hover:shadow-xl');
    });

    it('should support outlined + clickable', () => {
      const { container } = render(
        <Card variant="outlined" clickable>
          Content
        </Card>
      );
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass('shadow-sm');
      expect(card).toHaveClass('cursor-pointer');
      expect(card).toHaveAttribute('tabIndex', '0');
    });
  });
});
