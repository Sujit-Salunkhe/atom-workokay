import type { Meta, StoryObj } from '@storybook/react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardSubtitle,
  CardBody,
  CardFooter,
  CardMedia,
} from './Card';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['elevated', 'outlined', 'flat'],
      description: 'Visual style variant of the card',
    },
    hoverable: {
      control: 'boolean',
      description: 'Enable hover effect with scale',
    },
    clickable: {
      control: 'boolean',
      description: 'Make card clickable with focus styles',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

// Basic Card
export const Basic: Story = {
  render: () => (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardSubtitle>This is a card subtitle</CardSubtitle>
      </CardHeader>
      <CardBody>
        <p>
          This is the card body content. You can add any content here including
          text, images, or other components.
        </p>
      </CardBody>
      <CardFooter>
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Action
        </button>
      </CardFooter>
    </Card>
  ),
};

// Elevated Variant (Default)
export const Elevated: Story = {
  render: () => (
    <Card variant="elevated" className="w-96">
      <CardHeader>
        <CardTitle>Elevated Card</CardTitle>
        <CardSubtitle>Default shadow style</CardSubtitle>
      </CardHeader>
      <CardBody>
        This card has a shadow effect that increases on hover.
      </CardBody>
    </Card>
  ),
};

// Outlined Variant
export const Outlined: Story = {
  render: () => (
    <Card variant="outlined" className="w-96">
      <CardHeader>
        <CardTitle>Outlined Card</CardTitle>
        <CardSubtitle>Border style variant</CardSubtitle>
      </CardHeader>
      <CardBody>
        This card has a visible border instead of shadow.
      </CardBody>
    </Card>
  ),
};

// Flat Variant
export const Flat: Story = {
  render: () => (
    <Card variant="flat" className="w-96">
      <CardHeader>
        <CardTitle>Flat Card</CardTitle>
        <CardSubtitle>No shadow or border</CardSubtitle>
      </CardHeader>
      <CardBody>
        This card has no shadow or visible border.
      </CardBody>
    </Card>
  ),
};

// Hoverable Card
export const Hoverable: Story = {
  render: () => (
    <Card variant="elevated" hoverable className="w-96">
      <CardHeader>
        <CardTitle>Hoverable Card</CardTitle>
        <CardSubtitle>Hover over me!</CardSubtitle>
      </CardHeader>
      <CardBody>
        This card scales up and shows enhanced shadow on hover.
      </CardBody>
    </Card>
  ),
};

// Clickable Card
export const Clickable: Story = {
  render: () => (
    <Card
      variant="elevated"
      clickable
      className="w-96"
      onClick={() => alert('Card clicked!')}
    >
      <CardHeader>
        <CardTitle>Clickable Card</CardTitle>
        <CardSubtitle>Click anywhere on this card</CardSubtitle>
      </CardHeader>
      <CardBody>
        This entire card is clickable and has focus ring styles.
      </CardBody>
    </Card>
  ),
};

// Card with Dividers
export const WithDividers: Story = {
  render: () => (
    <Card className="w-96">
      <CardHeader divider>
        <CardTitle>Card with Dividers</CardTitle>
        <CardSubtitle>Separated sections</CardSubtitle>
      </CardHeader>
      <CardBody>
        Notice the divider lines separating header and footer.
      </CardBody>
      <CardFooter divider align="between">
        <button className="px-3 py-1 text-gray-600 hover:text-gray-900">
          Cancel
        </button>
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Save
        </button>
      </CardFooter>
    </Card>
  ),
};

// Card with Avatar and Action
export const WithAvatarAndAction: Story = {
  render: () => (
    <Card className="w-96">
      <CardHeader
        avatar={
          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
            JD
          </div>
        }
        action={
          <button className="text-gray-500 hover:text-gray-700">⋮</button>
        }
      >
        <CardTitle>John Doe</CardTitle>
        <CardSubtitle>@johndoe • 2 hours ago</CardSubtitle>
      </CardHeader>
      <CardBody>
        This card layout is perfect for social media posts or user profiles.
      </CardBody>
      <CardFooter align="left">
        <button className="text-sm text-gray-600 hover:text-gray-900">
          Like
        </button>
        <button className="text-sm text-gray-600 hover:text-gray-900">
          Comment
        </button>
        <button className="text-sm text-gray-600 hover:text-gray-900">
          Share
        </button>
      </CardFooter>
    </Card>
  ),
};

// Card with Media
export const WithMedia: Story = {
  render: () => (
    <Card className="w-96">
      <CardMedia
        src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop"
        alt="Mountain landscape"
        size="lg"
        objectFit="cover"
      />
      <CardHeader>
        <CardTitle>Beautiful Landscape</CardTitle>
        <CardSubtitle>Mountain views</CardSubtitle>
      </CardHeader>
      <CardBody>
        A stunning mountain landscape captured at golden hour.
      </CardBody>
      <CardFooter align="between">
        <span className="text-sm text-gray-600">1.2k views</span>
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          View
        </button>
      </CardFooter>
    </Card>
  ),
};

// Card with Different Media Sizes
export const MediaSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {(['sm', 'md', 'lg', 'xl'] as const).map((size) => (
        <Card key={size} className="w-96">
          <CardMedia
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop"
            alt={`${size} size media`}
            size={size}
          />
          <CardBody>
            <strong>Size: {size}</strong>
          </CardBody>
        </Card>
      ))}
    </div>
  ),
};

// Card with No Padding Body
export const NoPaddingBody: Story = {
  render: () => (
    <Card className="w-96">
      <CardHeader divider>
        <CardTitle>Data Table</CardTitle>
        <CardSubtitle>User statistics</CardSubtitle>
      </CardHeader>
      <CardBody noPadding>
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">John Doe</td>
              <td className="px-6 py-4 whitespace-nowrap">Active</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">Jane Smith</td>
              <td className="px-6 py-4 whitespace-nowrap">Inactive</td>
            </tr>
          </tbody>
        </table>
      </CardBody>
    </Card>
  ),
};

// Header Alignment
export const HeaderAlignment: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Card className="w-96">
        <CardHeader align="left">
          <CardTitle>Left Aligned</CardTitle>
          <CardSubtitle>Default alignment</CardSubtitle>
        </CardHeader>
      </Card>
      <Card className="w-96">
        <CardHeader align="center">
          <CardTitle>Center Aligned</CardTitle>
          <CardSubtitle>Centered content</CardSubtitle>
        </CardHeader>
      </Card>
      <Card className="w-96">
        <CardHeader align="right">
          <CardTitle>Right Aligned</CardTitle>
          <CardSubtitle>Right aligned content</CardSubtitle>
        </CardHeader>
      </Card>
    </div>
  ),
};

// Footer Alignment
export const FooterAlignment: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Card className="w-96">
        <CardBody>Left aligned footer</CardBody>
        <CardFooter align="left">
          <button className="px-4 py-2 bg-blue-500 text-white rounded">
            Action
          </button>
        </CardFooter>
      </Card>
      <Card className="w-96">
        <CardBody>Center aligned footer</CardBody>
        <CardFooter align="center">
          <button className="px-4 py-2 bg-blue-500 text-white rounded">
            Action
          </button>
        </CardFooter>
      </Card>
      <Card className="w-96">
        <CardBody>Right aligned footer (default)</CardBody>
        <CardFooter align="right">
          <button className="px-4 py-2 bg-blue-500 text-white rounded">
            Action
          </button>
        </CardFooter>
      </Card>
      <Card className="w-96">
        <CardBody>Space between footer</CardBody>
        <CardFooter align="between">
          <button className="px-3 py-1 text-gray-600">Cancel</button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded">
            Save
          </button>
        </CardFooter>
      </Card>
    </div>
  ),
};

// Product Card Example
export const ProductCard: Story = {
  render: () => (
    <Card className="w-80" hoverable>
      <CardMedia
        src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=400&fit=crop"
        alt="Headphones"
        size="md"
      />
      <CardHeader>
        <CardTitle>Premium Headphones</CardTitle>
        <CardSubtitle>High-quality audio experience</CardSubtitle>
      </CardHeader>
      <CardBody>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-gray-900">$299</span>
          <span className="text-sm text-gray-500 line-through">$399</span>
          <span className="text-sm text-green-600 font-medium">25% OFF</span>
        </div>
        <p className="mt-2 text-sm text-gray-600">
          Free shipping • In stock
        </p>
      </CardBody>
      <CardFooter>
        <button className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Add to Cart
        </button>
      </CardFooter>
    </Card>
  ),
};

// Blog Post Card Example
export const BlogPostCard: Story = {
  render: () => (
    <Card className="w-96" clickable>
      <CardMedia
        src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=400&fit=crop"
        alt="Blog post"
        size="md"
      />
      <CardHeader>
        <CardTitle>10 Tips for Better Code</CardTitle>
        <CardSubtitle>Web Development • 5 min read</CardSubtitle>
      </CardHeader>
      <CardBody>
        Learn essential coding practices that will improve your development
        workflow and code quality.
      </CardBody>
      <CardFooter align="between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-blue-500" />
          <span className="text-sm text-gray-600">John Doe</span>
        </div>
        <span className="text-sm text-gray-500">Dec 20, 2025</span>
      </CardFooter>
    </Card>
  ),
};

// Minimal Card
export const Minimal: Story = {
  render: () => (
    <Card variant="outlined" className="w-96">
      <CardBody>
        A minimal card with just body content. Perfect for simple layouts.
      </CardBody>
    </Card>
  ),
};

// Interactive Playground
export const Playground: Story = {
  args: {
    variant: 'elevated',
    hoverable: false,
    clickable: false,
  },
  render: (args) => (
    <Card {...args} className="w-96">
      <CardHeader divider>
        <CardTitle>Interactive Card</CardTitle>
        <CardSubtitle>Customize using controls</CardSubtitle>
      </CardHeader>
      <CardBody>
        Use the Storybook controls panel to change card properties and see
        how they affect the appearance and behavior.
      </CardBody>
      <CardFooter align="right">
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Action
        </button>
      </CardFooter>
    </Card>
  ),
};
