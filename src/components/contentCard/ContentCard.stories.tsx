// src/components/ui/content-card.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-vite'
import { ContentCard } from './ContentCard'

const meta = {
  title: 'Components/ContentCard',
  component: ContentCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'info', 'success', 'warning', 'error', 'neutral'],
      description: 'Visual style variant',
      table: {
        type: { summary: 'ContentCardVariant' },
        defaultValue: { summary: 'default' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Spacing and text size',
      table: {
        type: { summary: 'ContentCardSize' },
        defaultValue: { summary: 'md' },
      },
    },
    title: {
      control: 'text',
      description: 'Optional card title',
    },
    icon: {
      control: false,
      description: 'Optional leading icon',
    },
    footer: {
      control: 'text',
      description: 'Optional footer content',
    },
  },
} satisfies Meta<typeof ContentCard>

export default meta
type Story = StoryObj<typeof meta>

/* Playground / Controls */

export const Playground: Story = {
  args: {
    variant: 'default',
    size: 'md',
    title: 'Content card title',
    children: (
      <p>
        This is the main content of the ContentCard. Adjust the controls in the
        panel to see how different variants and sizes look.
      </p>
    ),
    footer: 'Optional footer text goes here.',
  },
}

/* Variants showcase */

export const Variants: Story = {
  args: {
    children: null,
  },
  render: () => (
    <div className="flex flex-col gap-4 max-w-120">
      <ContentCard
        variant="default"
        title="Default card"
      >
        This is the default variant, using the theme background and border.
      </ContentCard>

      <ContentCard
        variant="info"
        title="Information"
        icon={<span>ℹ️</span>}
      >
        Use the info variant for neutral information or helper text.
      </ContentCard>

      <ContentCard
        variant="success"
        title="Success"
        icon={<span>✅</span>}
      >
        Indicate successful operations, confirmations, or positive states.
      </ContentCard>

      <ContentCard
        variant="warning"
        title="Warning"
        icon={<span>⚠️</span>}
      >
        Draw attention to potential problems or things that need review.
      </ContentCard>

      <ContentCard
        variant="error"
        title="Error"
        icon={<span>⛔</span>}
      >
        Communicate failures, validation errors, or blocking issues.
      </ContentCard>

      <ContentCard
        variant="neutral"
        title="Neutral"
        icon={<span>📝</span>}
      >
        Use the neutral variant for secondary or low‑priority content.
      </ContentCard>

      
    </div>
  ),
}

/* Sizes */

export const Sizes: Story = {
  args: {
    children: null,
  },
  render: () => (
    <div className="flex flex-col gap-4 max-w-120">
      <ContentCard
        size="sm"
        variant="info"
        title="Small"
        icon={<span>ℹ️</span>}
      >
        Compact spacing and smaller text, ideal for dense layouts.
      </ContentCard>

      <ContentCard
        size="md"
        variant="info"
        title="Medium"
        icon={<span>ℹ️</span>}
      >
        Default spacing and text size for general use cases.
      </ContentCard>

      <ContentCard
        size="lg"
        variant="info"
        title="Large"
        icon={<span>ℹ️</span>}
      >
        Larger text and more breathing room for important content.
      </ContentCard>
    </div>
  ),
}

/* With footer */

export const WithFooter: Story = {
  args: {
    children: null,
  },
  render: () => (
    <div className="flex flex-col gap-4 max-w-120">
      <ContentCard
        variant="success"
        title="Profile completed"
        icon={<span>🎉</span>}
        footer="Last updated 2 hours ago"
      >
        Your profile is 100% complete. You are more likely to be discovered by
        recruiters and collaborators.
      </ContentCard>

      <ContentCard
        variant="warning"
        title="Action required"
        icon={<span>⚠️</span>}
        footer="This warning will stay until the issue is resolved"
      >
        Some of your billing information is out of date. Please update your
        payment method to avoid interruptions.
      </ContentCard>
    </div>
  ),
}

/* Error & warning (ARIA live usage) */

export const ValidationMessages: Story = {
  args: {
    children: null,
  },
  render: () => (
    <div className="flex flex-col gap-4 max-w-120">
      <ContentCard
        variant="error"
        title="There were 3 errors with your submission"
        icon={<span>⛔</span>}
        footer="Please fix these issues and try again."
      >
        <ul className="list-disc pl-5 space-y-1">
          <li>Email address is invalid.</li>
          <li>Password must be at least 8 characters long.</li>
          <li>You must accept the terms and conditions.</li>
        </ul>
      </ContentCard>

      <ContentCard
        variant="warning"
        title="Some settings might not work"
        icon={<span>⚠️</span>}
        footer="Changes will apply after a full page reload."
      >
        You changed experimental settings that may cause unstable behavior in
        some browsers.
      </ContentCard>
    </div>
  ),
}

/* Dashboard / summary cards */

export const DashboardSummary: Story = {
  args: {
    children: null,
  },
  render: () => (
    <div className="grid gap-4 md:grid-cols-3 max-w-180">
     

      <ContentCard
        variant="success"
        title="Active Users"
        icon={<span>👥</span>}
        footer="Last 24 hours"
      >
        <p className="text-2xl font-semibold">1,284</p>
        <p className="text-xs opacity-70 mt-1">+8.1% vs yesterday</p>
      </ContentCard>

      <ContentCard
        variant="info"
        title="Open Tickets"
        icon={<span>📨</span>}
        footer="Support queue"
      >
        <p className="text-2xl font-semibold">27</p>
        <p className="text-xs opacity-70 mt-1">5 marked as high priority</p>
      </ContentCard>
    </div>
  ),
}

/* Rich content example */

export const RichContent: Story = {
  args: {
    variant: 'neutral',
    size: 'lg',
    title: "What's new in this release",
    icon: <span>🆕</span>,
    footer: 'Release 2.3.0 · Deployed on Jan 5, 2026',
    children: (
      <ul className="list-disc pl-5 space-y-1">
        <li>Improved table performance for large datasets.</li>
        <li>New theme switcher with animated transitions.</li>
        <li>Accessibility improvements for keyboard navigation.</li>
      </ul>
    ),
  },
}

/* Simple examples */

export const InfoCard: Story = {
  args: {
    variant: 'info',
    title: 'Information',
    icon: <span>ℹ️</span>,
    children: 'This is an informational message to help guide users.',
  },
}

export const SuccessCard: Story = {
  args: {
    variant: 'success',
    title: 'Success',
    icon: <span>✅</span>,
    children: 'Your changes have been saved successfully.',
  },
}

export const WarningCard: Story = {
  args: {
    variant: 'warning',
    title: 'Warning',
    icon: <span>⚠️</span>,
    children: 'Please review this before proceeding.',
  },
}

export const ErrorCard: Story = {
  args: {
    variant: 'error',
    title: 'Error',
    icon: <span>⛔</span>,
    children: 'An error occurred while processing your request.',
  },
}
