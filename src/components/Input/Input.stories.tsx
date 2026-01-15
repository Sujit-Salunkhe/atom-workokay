// stories/Input.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Input, type InputProps } from './Input'
import { Button } from '../button/Button'
import { CheckIcon, MailIcon, LockIcon, SearchIcon } from 'lucide-react'

const meta: Meta<typeof Input> = {
  title: 'Input/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A versatile, accessible input component with full variant support, icons, loading states, and validation feedback.'
      }
    }
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg']
    },
    tone: {
      control: 'select',
      options: ['default', 'invalid', 'success']
    },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
    readOnly: { control: 'boolean' },
    className: { control: false },
    leftIcon: { control: false },
    rightIcon: { control: false }
  },
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof Input>

const defaultValueTemplate: InputProps['defaultValue'] = 'john@example.com'

export const Default: Story = {
  args: {
    placeholder: 'Enter your email',
    defaultValue: defaultValueTemplate
  }
}

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4 w-80">
      <Input {...args} size="sm" placeholder="Small input" />
      <Input {...args} size="md" placeholder="Medium input (default)" />
      <Input {...args} size="lg" placeholder="Large input" />
    </div>
  ),
  args: {
    defaultValue: defaultValueTemplate
  }
}

export const States: Story = {
  render: (args) => (
    <div className="space-y-4 w-80">
      <div>
        <label className="text-sm font-medium mb-2 block">Enabled</label>
        <Input {...args} placeholder="Enabled input" />
      </div>
      
      <div>
        <label className="text-sm font-medium mb-2 block">Disabled</label>
        <Input {...args} disabled placeholder="Disabled input" />
      </div>
      
      <div>
        <label className="text-sm font-medium mb-2 block">Read only</label>
        <Input {...args} readOnly defaultValue="Read only value" />
      </div>
      
      <div>
        <label className="text-sm font-medium mb-2 block">Loading</label>
        <Input {...args} loading placeholder="Loading..." />
      </div>
    </div>
  )
}

export const Validation: Story = {
  render: (args) => (
    <div className="space-y-6 w-96">
      <div>
        <label className="text-sm font-medium mb-2 block">Default</label>
        <Input {...args} placeholder="john@example.com" />
      </div>
      
      <div>
        <label className="text-sm font-medium mb-2 block">Valid</label>
        <Input 
          {...args} 
          tone="success"
          defaultValue="john@example.com"
          hint="This email address is valid"
        />
      </div>
      
      <div>
        <label className="text-sm font-medium mb-2 block">Invalid</label>
        <Input 
          {...args} 
          tone="invalid"
          defaultValue="invalid-email"
          errorText="Please enter a valid email address"
        />
      </div>
      
      <div>
        <label className="text-sm font-medium mb-2 block">With hint</label>
        <Input 
          {...args} 
          placeholder="Enter password"
          hint="Password must be at least 8 characters"
        />
      </div>
    </div>
  )
}

export const Icons: Story = {
  render: (args) => (
    <div className="space-y-4 w-96">
      <Input 
        {...args}
        leftIcon={<MailIcon />}
        placeholder="Email address"
        defaultValue={defaultValueTemplate}
      />
      
      <Input 
        {...args}
        leftIcon={<LockIcon />}
        rightIcon={<CheckIcon className="text-green-500" />}
        placeholder="Password"
        defaultValue="password123"
      />
      
      <Input 
        {...args}
        leftIcon={<SearchIcon />}
        placeholder="Search..."
      />
      
      <Input 
        {...args}
        rightIcon={<Button variant="ghost" size="sm" className="h-7 w-7 p-0">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </Button>}
        placeholder="With action button"
      />
    </div>
  )
}

export const Playground: Story = {
  args: {
    placeholder: 'Type here...',
    defaultValue: defaultValueTemplate
  },
  parameters: {
    docs: {
      description: {
        story: 'Fully interactive playground with all controls'
      }
    }
  }
}

export const KitchenSink: Story = {
  render: () => (
    <div className="space-y-6 p-8 max-w-md mx-auto">
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium text-foreground">
          Email address
        </label>
        <Input
          id="email"
          leftIcon={<MailIcon />}
          placeholder="john@example.com"
          defaultValue={defaultValueTemplate}
          hint="We'll never share your email with anyone else."
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="password" className="text-sm font-medium text-foreground">
          Password
        </label>
        <Input
          id="password"
          type="password"
          leftIcon={<LockIcon />}
          placeholder="Enter your password"
          errorText="Password must contain at least 8 characters"
        />
      </div>

      <div className="flex gap-2 pt-2">
        <Button className="flex-1">Cancel</Button>
        <Button className="flex-1" variant="primary">Submit</Button>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Complete form field implementation with label, hint, and action buttons'
      }
    }
  }
}

export const Types: Story = {
  render: (args) => (
    <div className="grid grid-cols-2 gap-4 w-500px">
      <Input {...args} type="email" placeholder="Email" leftIcon={<MailIcon />} />
      <Input {...args} type="password" placeholder="Password" leftIcon={<LockIcon />} />
      <Input {...args} type="search" placeholder="Search" leftIcon={<SearchIcon />} />
      <Input {...args} type="tel" placeholder="Phone" leftIcon={<PhoneIcon />} />
      <Input {...args} type="url" placeholder="Website" leftIcon={<GlobeIcon />} />
      <Input {...args} type="number" placeholder="0" />
    </div>
  )
}

// Add missing icons for completeness
const PhoneIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
)

const GlobeIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)
