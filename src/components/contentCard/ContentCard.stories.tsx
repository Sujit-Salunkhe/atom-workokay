// src/components/ui/content-card.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { ContentCard, type ContentCardProps } from './ContentCard'
import { 
  Info as InfoIcon, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Lightbulb,
  Bell,
  Rocket,
  Shield
} from 'lucide-react'
import React from 'react'

const meta: Meta<typeof ContentCard> = {
  title: 'Components/ContentCard',
  component: ContentCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Read-only informational card component with semantic variants for displaying alerts, messages, and contextual information.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'info', 'success', 'warning', 'error', 'neutral'],
      description: 'Visual variant that conveys semantic meaning',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the card',
    },
    title: {
      control: 'text',
      description: 'Optional title for the card',
    },
  },
  decorators: [
    (Story) => (
      <div className="p-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen flex items-center justify-center">
        <div className="w-full max-w-2xl">
          <Story />
        </div>
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof meta>

// ==================== DEFAULT VARIANT ====================
export const Default: Story = {
  name: 'Default',
  args: {
    variant: 'default',
    size: 'md',
    children: 'This is a default content card with neutral styling.',
  },
}

export const DefaultWithTitle: Story = {
  name: 'Default - With Title',
  args: {
    variant: 'default',
    size: 'md',
    title: 'General Information',
    children: 'This content card includes a title for better organization and hierarchy.',
  },
}

export const DefaultWithIcon: Story = {
  name: 'Default - With Icon',
  args: {
    variant: 'default',
    size: 'md',
    title: 'Features',
    icon: <Lightbulb className="w-5 h-5" />,
    children: 'Content cards can display icons alongside titles for enhanced visual communication.',
  },
}

// ==================== INFO VARIANT ====================
export const InfoVariant: Story = {
  name: 'Info',
  args: {
    variant: 'info',
    size: 'md',
    title: 'Information',
    icon: <InfoIcon className="w-5 h-5" />,
    children: 'This is an informational message to provide context or helpful details to users.',
  },
}

export const InfoComplex: Story = {
  name: 'Info - Complex Content',
  args: {
    variant: 'info',
    size: 'md',
    title: 'New Feature Available',
    icon: <Rocket className="w-5 h-5" />,
    children: (
      <>
        <p className="mb-2">We've launched a new dashboard experience with improved performance.</p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Faster load times</li>
          <li>Enhanced visualizations</li>
          <li>Real-time updates</li>
        </ul>
      </>
    ),
    footer: 'Updated 2 hours ago',
  },
}

// ==================== SUCCESS VARIANT ====================
export const SuccessVariant: Story = {
  name: 'Success',
  args: {
    variant: 'success',
    size: 'md',
    title: 'Success',
    icon: <CheckCircle2 className="w-5 h-5" />,
    children: 'Your changes have been saved successfully!',
  },
}

export const SuccessWithFooter: Story = {
  name: 'Success - With Footer',
  args: {
    variant: 'success',
    size: 'md',
    title: 'Deployment Complete',
    icon: <CheckCircle2 className="w-5 h-5" />,
    children: 'Your application has been deployed to production successfully. All services are running normally.',
    footer: 'Deployed at 2:30 PM IST',
  },
}

// ==================== WARNING VARIANT ====================
export const WarningVariant: Story = {
  name: 'Warning',
  args: {
    variant: 'warning',
    size: 'md',
    title: 'Warning',
    icon: <AlertTriangle className="w-5 h-5" />,
    children: 'Please review your settings before proceeding. Some configurations may need attention.',
  },
}

export const WarningDetailed: Story = {
  name: 'Warning - Detailed',
  args: {
    variant: 'warning',
    size: 'md',
    title: 'Storage Limit Approaching',
    icon: <AlertTriangle className="w-5 h-5" />,
    children: (
      <>
        <p className="mb-2">You're using 85% of your available storage space.</p>
        <p className="text-sm">Consider upgrading your plan or removing unused files to avoid service interruption.</p>
      </>
    ),
    footer: 'Last checked: Today at 1:15 PM',
  },
}

// ==================== ERROR VARIANT ====================
export const ErrorVariant: Story = {
  name: 'Error',
  args: {
    variant: 'error',
    size: 'md',
    title: 'Error',
    icon: <XCircle className="w-5 h-5" />,
    children: 'An error occurred while processing your request. Please try again.',
  },
}

export const ErrorWithDetails: Story = {
  name: 'Error - With Details',
  args: {
    variant: 'error',
    size: 'md',
    title: 'Connection Failed',
    icon: <XCircle className="w-5 h-5" />,
    children: (
      <>
        <p className="mb-2">Unable to connect to the server.</p>
        <p className="text-sm">Error code: 500 - Internal Server Error</p>
      </>
    ),
    footer: 'Contact support if this persists',
  },
}

// ==================== NEUTRAL VARIANT ====================
export const NeutralVariant: Story = {
  name: 'Neutral',
  args: {
    variant: 'neutral',
    size: 'md',
    title: 'Note',
    icon: <Bell className="w-5 h-5" />,
    children: 'This is a neutral message with muted styling for less important information.',
  },
}

// ==================== SIZE VARIANTS ====================
export const SizeSmall: Story = {
  name: 'Size - Small',
  args: {
    variant: 'info',
    size: 'sm',
    title: 'Small Card',
    icon: <InfoIcon className="w-4 h-4" />,
    children: 'Compact card with smaller padding and text.',
  },
}

export const SizeMedium: Story = {
  name: 'Size - Medium',
  args: {
    variant: 'info',
    size: 'md',
    title: 'Medium Card',
    icon: <InfoIcon className="w-5 h-5" />,
    children: 'Standard size card with balanced spacing.',
  },
}

export const SizeLarge: Story = {
  name: 'Size - Large',
  args: {
    variant: 'info',
    size: 'lg',
    title: 'Large Card',
    icon: <InfoIcon className="w-6 h-6" />,
    children: 'Spacious card with larger padding and text for prominent messages.',
  },
}

// ==================== NO TITLE/ICON VARIANTS ====================
export const NoTitle: Story = {
  name: 'Without Title',
  args: {
    variant: 'info',
    size: 'md',
    children: 'Content card without a title, displaying only the main content text.',
  },
}

export const NoIcon: Story = {
  name: 'Without Icon',
  args: {
    variant: 'success',
    size: 'md',
    title: 'Success Message',
    children: 'Content card with title but no icon.',
  },
}

// ==================== SHOWCASE ALL VARIANTS ====================
export const AllVariants: Story = {
  name: 'All Variants Showcase',
  render: () => (
    <div className="space-y-4 w-full">
      <ContentCard variant="default" title="Default" icon={<Lightbulb className="w-5 h-5" />}>
        Default variant with neutral styling
      </ContentCard>
      <ContentCard variant="info" title="Information" icon={<InfoIcon className="w-5 h-5" />}>
        Info variant for helpful messages
      </ContentCard>
      <ContentCard variant="success" title="Success" icon={<CheckCircle2 className="w-5 h-5" />}>
        Success variant for positive feedback
      </ContentCard>
      <ContentCard variant="warning" title="Warning" icon={<AlertTriangle className="w-5 h-5" />}>
        Warning variant for cautionary messages
      </ContentCard>
      <ContentCard variant="error" title="Error" icon={<XCircle className="w-5 h-5" />}>
        Error variant for critical issues
      </ContentCard>
      <ContentCard variant="neutral" title="Neutral" icon={<Bell className="w-5 h-5" />}>
        Neutral variant for muted information
      </ContentCard>
    </div>
  ),
}

// ==================== REAL-WORLD EXAMPLES ====================
export const SecurityNotice: Story = {
  name: 'Example - Security Notice',
  args: {
    variant: 'warning',
    size: 'md',
    title: 'Security Update Required',
    icon: <Shield className="w-5 h-5" />,
    children: (
      <>
        <p className="mb-2">A critical security patch is available for your system.</p>
        <p className="text-sm">We recommend updating within the next 48 hours to ensure continued protection.</p>
      </>
    ),
    footer: 'Version 2.4.1 available',
  },
}

export const Playground: Story = {
  name: 'Playground',
  args: {
    variant: 'info',
    size: 'md',
    title: 'Custom Card',
    icon: <InfoIcon className="w-5 h-5" />,
    children: 'Use the controls below to customize this content card.',
    footer: 'Optional footer text',
  },
}
