// src/components/ui/Skeleton.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { Skeleton } from './Skeleton'

const meta: Meta<typeof Skeleton> = {
  title: 'Components/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Skeleton loading component used to indicate content loading. Creates better perceived performance by showing content structure while data loads.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'rounded', 'card', 'circle'],
      description: 'Visual variant of the skeleton',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'full'],
      description: 'Predefined size variants',
    },
    animate: {
      control: 'boolean',
      description: 'Enable/disable shimmer animation',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Skeleton>

// ============================================================================
// BASIC EXAMPLES
// ============================================================================

export const Default: Story = {
  args: {
    variant: 'default',
    size: 'md',
    animate: true,
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-semibold mb-3">Default</h3>
        <Skeleton variant="default" size="md" />
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-3">Rounded</h3>
        <Skeleton variant="rounded" size="md" />
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-3">Card</h3>
        <Skeleton variant="card" className="h-32 w-64" />
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-3">Circle</h3>
        <Skeleton variant="circle" className="w-16 h-16" />
      </div>
    </div>
  ),
}

export const WithoutAnimation: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <p className="text-sm text-gray-600 mb-2">With Animation (Default)</p>
        <Skeleton animate={true} className="h-4 w-64" />
      </div>
      <div>
        <p className="text-sm text-gray-600 mb-2">Without Animation</p>
        <Skeleton animate={false} className="h-4 w-64" />
      </div>
    </div>
  ),
}

// ============================================================================
// REAL-WORLD USE CASES
// ============================================================================

export const UserProfileCard: Story = {
  render: () => (
    <div className="max-w-sm border border-(--atom-card-border) rounded-lg p-6 bg-(--atom-card-bg)">
      {/* Header with avatar and name */}
      <div className="flex items-center gap-4 mb-4">
        <Skeleton variant="circle" className="w-16 h-16" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
      
      {/* Bio */}
      <div className="space-y-2 mb-4">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-3/4" />
      </div>
      
      {/* Stats */}
      <div className="flex justify-around pt-4 border-t border-(--atom-card-border)">
        <div className="text-center space-y-2">
          <Skeleton className="h-6 w-12 mx-auto" />
          <Skeleton className="h-3 w-16" />
        </div>
        <div className="text-center space-y-2">
          <Skeleton className="h-6 w-12 mx-auto" />
          <Skeleton className="h-3 w-16" />
        </div>
        <div className="text-center space-y-2">
          <Skeleton className="h-6 w-12 mx-auto" />
          <Skeleton className="h-3 w-16" />
        </div>
      </div>
    </div>
  ),
}

export const BlogPostList: Story = {
  render: () => (
    <div className="max-w-2xl space-y-6">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="border border-(--atom-card-border) rounded-lg p-4 bg-(--atom-card-bg)"
        >
          {/* Featured Image */}
          <Skeleton variant="card" className="h-48 w-full mb-4" />
          
          {/* Title and meta */}
          <div className="space-y-3">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            
            {/* Excerpt */}
            <div className="space-y-2 pt-2">
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-5/6" />
            </div>
            
            {/* Author and read time */}
            <div className="flex items-center gap-3 pt-3">
              <Skeleton variant="circle" className="w-8 h-8" />
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-3 w-16" />
            </div>
          </div>
        </div>
      ))}
    </div>
  ),
}

export const ProductGrid: Story = {
  render: () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <div
          key={i}
          className="border border-(--atom-card-border) rounded-lg overflow-hidden bg-(--atom-card-bg)"
        >
          {/* Product Image */}
          <Skeleton variant="card" className="h-48 w-full rounded-none" />
          
          {/* Product Info */}
          <div className="p-4 space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-3 w-2/3" />
            
            {/* Price and Rating */}
            <div className="flex items-center justify-between pt-2">
              <Skeleton className="h-5 w-20" />
              <Skeleton variant="rounded" className="h-5 w-16" />
            </div>
          </div>
        </div>
      ))}
    </div>
  ),
}

export const SocialMediaFeed: Story = {
  render: () => (
    <div className="max-w-xl space-y-4">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="border border-(--atom-card-border) rounded-lg p-4 bg-(--atom-card-bg)"
        >
          {/* Post Header */}
          <div className="flex items-center gap-3 mb-4">
            <Skeleton variant="circle" className="w-10 h-10" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-24" />
            </div>
            <Skeleton variant="circle" className="w-8 h-8" />
          </div>
          
          {/* Post Content */}
          <div className="space-y-2 mb-4">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-2/3" />
          </div>
          
          {/* Post Image */}
          <Skeleton variant="card" className="h-64 w-full mb-4" />
          
          {/* Engagement Buttons */}
          <div className="flex items-center gap-6 pt-3 border-t border-(--atom-card-border)">
            <Skeleton variant="rounded" className="h-8 w-20" />
            <Skeleton variant="rounded" className="h-8 w-20" />
            <Skeleton variant="rounded" className="h-8 w-20" />
          </div>
        </div>
      ))}
    </div>
  ),
}

export const DataTable: Story = {
  render: () => (
    <div className="border border-(--atom-card-border) rounded-lg overflow-hidden bg-(--atom-card-bg)">
      {/* Table Header */}
      <div className="border-b border-(--atom-card-border) p-4">
        <div className="flex items-center gap-4">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-16 ml-auto" />
        </div>
      </div>
      
      {/* Table Rows */}
      {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <div
          key={i}
          className="border-b border-(--atom-card-border) p-4 last:border-b-0"
        >
          <div className="flex items-center gap-4">
            <Skeleton variant="circle" className="w-8 h-8" />
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-24" />
            <Skeleton variant="rounded" className="h-6 w-20" />
            <Skeleton variant="circle" className="w-8 h-8 ml-auto" />
          </div>
        </div>
      ))}
    </div>
  ),
}

export const DashboardStats: Story = {
  render: () => (
    <div className="space-y-6 max-w-6xl">
      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="border border-(--atom-card-border) rounded-lg p-6 bg-(--atom-card-bg)"
          >
            <Skeleton className="h-3 w-24 mb-4" />
            <Skeleton className="h-8 w-32 mb-2" />
            <Skeleton className="h-3 w-20" />
          </div>
        ))}
      </div>
      
      {/* Chart Area */}
      <div className="border border-(--atom-card-border) rounded-lg p-6 bg-(--atom-card-bg)">
        <Skeleton className="h-5 w-40 mb-4" />
        <Skeleton variant="card" className="h-64 w-full" />
      </div>
      
      {/* Recent Activity */}
      <div className="border border-(--atom-card-border) rounded-lg p-6 bg-(--atom-card-bg)">
        <Skeleton className="h-5 w-32 mb-4" />
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-3">
              <Skeleton variant="circle" className="w-10 h-10" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-48" />
                <Skeleton className="h-3 w-32" />
              </div>
              <Skeleton className="h-3 w-16" />
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
}

export const VideoPlayer: Story = {
  render: () => (
    <div className="max-w-4xl">
      {/* Video Player */}
      <div className="relative">
        <Skeleton variant="card" className="h-96 w-full" />
        {/* Play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Skeleton variant="circle" className="w-16 h-16" />
        </div>
      </div>
      
      {/* Video Info */}
      <div className="mt-4 space-y-4">
        <Skeleton className="h-6 w-3/4" />
        
        <div className="flex items-center gap-4">
          <Skeleton variant="circle" className="w-12 h-12" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-24" />
          </div>
          <Skeleton variant="rounded" className="h-10 w-28" />
        </div>
        
        <div className="space-y-2 pt-4 border-t border-(--atom-card-border)">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-2/3" />
        </div>
      </div>
    </div>
  ),
}

export const ChatInterface: Story = {
  render: () => (
    <div className="max-w-2xl border border-(--atom-card-border) rounded-lg overflow-hidden bg-(--atom-card-bg)">
      {/* Chat Header */}
      <div className="border-b border-(--atom-card-border) p-4">
        <div className="flex items-center gap-3">
          <Skeleton variant="circle" className="w-10 h-10" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-20" />
          </div>
        </div>
      </div>
      
      {/* Chat Messages */}
      <div className="p-4 space-y-4 h-96">
        {/* Received message */}
        <div className="flex gap-3">
          <Skeleton variant="circle" className="w-8 h-8" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton variant="rounded" className="h-16 w-3/4" />
          </div>
        </div>
        
        {/* Sent message */}
        <div className="flex gap-3 justify-end">
          <Skeleton variant="rounded" className="h-12 w-2/3" />
        </div>
        
        {/* Received message */}
        <div className="flex gap-3">
          <Skeleton variant="circle" className="w-8 h-8" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton variant="rounded" className="h-20 w-4/5" />
          </div>
        </div>
      </div>
      
      {/* Chat Input */}
      <div className="border-t border-(--atom-card-border) p-4">
        <div className="flex items-center gap-3">
          <Skeleton variant="circle" className="w-10 h-10" />
          <Skeleton variant="rounded" size="full" className="h-10" />
          <Skeleton variant="circle" className="w-10 h-10" />
        </div>
      </div>
    </div>
  ),
}

// ============================================================================
// COMPOSITION PATTERNS
// ============================================================================

export const TextContent: Story = {
  render: () => (
    <div className="max-w-2xl space-y-4">
      <Skeleton className="h-8 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
    </div>
  ),
}

export const MediaGallery: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-2 max-w-2xl">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
        <Skeleton key={i} variant="card" className="aspect-square" />
      ))}
    </div>
  ),
}
