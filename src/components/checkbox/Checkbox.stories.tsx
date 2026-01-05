// src/components/ui/checkbox.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Checkbox } from './Checkbox'

const meta = {
  title: 'Input/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A fully accessible checkbox component with support for labels, indeterminate state, and multiple sizes.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the checkbox',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    checked: {
      control: 'boolean',
      description: 'Controlled checked state',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the checkbox',
    },
    indeterminate: {
      control: 'boolean',
      description: 'Indeterminate state (tri-state)',
    },
    label: {
      control: 'text',
      description: 'Label text for the checkbox',
    },
  },
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

// ============================================================================
// BASIC EXAMPLES
// ============================================================================

export const Default: Story = {
  args: {
    label: 'Accept terms and conditions',
  },
}

export const Checked: Story = {
  args: {
    label: 'Checkbox checked by default',
    defaultChecked: true,
  },
}

export const WithoutLabel: Story = {
  args: {
    'aria-label': 'Checkbox without visible label',
  },
}

export const Disabled: Story = {
  args: {
    label: 'Disabled checkbox',
    disabled: true,
  },
}

export const DisabledChecked: Story = {
  args: {
    label: 'Disabled and checked',
    disabled: true,
    defaultChecked: true,
  },
}

// ============================================================================
// SIZES
// ============================================================================

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Checkbox size="sm" label="Small checkbox" />
      <Checkbox size="md" label="Medium checkbox (default)" />
      <Checkbox size="lg" label="Large checkbox" />
    </div>
  ),
}

export const SizesChecked: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Checkbox size="sm" label="Small checkbox" defaultChecked />
      <Checkbox size="md" label="Medium checkbox (default)" defaultChecked />
      <Checkbox size="lg" label="Large checkbox" defaultChecked />
    </div>
  ),
}

// ============================================================================
// INDETERMINATE STATE
// ============================================================================

export const Indeterminate: Story = {
  args: {
    label: 'Select all items',
    indeterminate: true,
  },
}

export const IndeterminateExample: Story = {
  render: function IndeterminateCheckboxExample() {
    const [checkedItems, setCheckedItems] = useState({
      item1: true,
      item2: false,
      item3: false,
    })

    const allChecked = Object.values(checkedItems).every(Boolean)
    const isIndeterminate =
      Object.values(checkedItems).some(Boolean) && !allChecked

    const handleParentChange = (checked: boolean) => {
      setCheckedItems({
        item1: checked,
        item2: checked,
        item3: checked,
      })
    }

    return (
      <div className="space-y-3">
        <Checkbox
          label="Select all items"
          checked={allChecked}
          indeterminate={isIndeterminate}
          onChange={(e) => handleParentChange(e.target.checked)}
          size="lg"
        />
        <div className="ml-6 space-y-2">
          <Checkbox
            label="Item 1"
            checked={checkedItems.item1}
            onChange={(e) =>
              setCheckedItems({ ...checkedItems, item1: e.target.checked })
            }
          />
          <Checkbox
            label="Item 2"
            checked={checkedItems.item2}
            onChange={(e) =>
              setCheckedItems({ ...checkedItems, item2: e.target.checked })
            }
          />
          <Checkbox
            label="Item 3"
            checked={checkedItems.item3}
            onChange={(e) =>
              setCheckedItems({ ...checkedItems, item3: e.target.checked })
            }
          />
        </div>
        <div className="mt-4 p-3 bg-gray-100 rounded-md">
          <p className="text-sm text-gray-700">
            Status:{' '}
            {allChecked
              ? 'All selected'
              : isIndeterminate
              ? 'Partially selected'
              : 'None selected'}
          </p>
        </div>
      </div>
    )
  },
}

// ============================================================================
// CONTROLLED COMPONENT
// ============================================================================

export const Controlled: Story = {
  render: function ControlledCheckbox() {
    const [checked, setChecked] = useState(false)

    return (
      <div className="space-y-4">
        <div className="flex gap-2">
          <button
            onClick={() => setChecked(true)}
            className="px-3 py-1.5 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition-colors"
          >
            Check
          </button>
          <button
            onClick={() => setChecked(false)}
            className="px-3 py-1.5 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition-colors"
          >
            Uncheck
          </button>
          <button
            onClick={() => setChecked(!checked)}
            className="px-3 py-1.5 bg-gray-600 text-white text-sm rounded-md hover:bg-gray-700 transition-colors"
          >
            Toggle
          </button>
        </div>
        <div className="p-3 bg-gray-100 rounded-md">
          <p className="text-sm">
            Checkbox state:{' '}
            <strong className={checked ? 'text-green-600' : 'text-red-600'}>
              {checked ? 'Checked' : 'Unchecked'}
            </strong>
          </p>
        </div>
        <Checkbox
          label="Controlled checkbox"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
      </div>
    )
  },
}

// ============================================================================
// FORM EXAMPLES
// ============================================================================

export const RegistrationForm: Story = {
  render: function RegistrationFormExample() {
    const [formData, setFormData] = useState({
      terms: false,
      newsletter: true,
      marketing: false,
      privacy: false,
    })
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      setSubmitted(true)
    }

    const isValid = formData.terms && formData.privacy

    return (
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <h3 className="text-lg font-semibold mb-4">Create Account</h3>

        <div
          className={`p-3 rounded-md border ${
            submitted && !formData.terms
              ? 'border-red-200 bg-red-50'
              : 'border-gray-200'
          }`}
        >
          <Checkbox
            label="I accept the Terms and Conditions"
            checked={formData.terms}
            onChange={(e) =>
              setFormData({ ...formData, terms: e.target.checked })
            }
          />
          {submitted && !formData.terms && (
            <p className="text-xs text-red-600 mt-2 ml-6">
              You must accept the terms to continue
            </p>
          )}
        </div>

        <div
          className={`p-3 rounded-md border ${
            submitted && !formData.privacy
              ? 'border-red-200 bg-red-50'
              : 'border-gray-200'
          }`}
        >
          <Checkbox
            label="I have read the Privacy Policy"
            checked={formData.privacy}
            onChange={(e) =>
              setFormData({ ...formData, privacy: e.target.checked })
            }
          />
          {submitted && !formData.privacy && (
            <p className="text-xs text-red-600 mt-2 ml-6">
              Please acknowledge the privacy policy
            </p>
          )}
        </div>

        <div className="p-3 rounded-md border border-gray-200">
          <Checkbox
            label="Subscribe to newsletter"
            checked={formData.newsletter}
            onChange={(e) =>
              setFormData({ ...formData, newsletter: e.target.checked })
            }
          />
          <p className="text-xs text-gray-500 mt-1 ml-6">
            Get weekly updates about new features
          </p>
        </div>

        <div className="p-3 rounded-md border border-gray-200">
          <Checkbox
            label="Receive marketing emails"
            checked={formData.marketing}
            onChange={(e) =>
              setFormData({ ...formData, marketing: e.target.checked })
            }
          />
          <p className="text-xs text-gray-500 mt-1 ml-6">
            Special offers and promotions (optional)
          </p>
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Create Account
        </button>

        {submitted && (
          <div
            className={`p-3 rounded-md ${
              isValid
                ? 'bg-green-50 border border-green-200'
                : 'bg-red-50 border border-red-200'
            }`}
          >
            <p
              className={`text-sm ${
                isValid ? 'text-green-800' : 'text-red-800'
              }`}
            >
              {isValid
                ? '✓ Form submitted successfully!'
                : '✗ Please complete all required fields'}
            </p>
          </div>
        )}
      </form>
    )
  },
}

export const PreferencesForm: Story = {
  render: function PreferencesFormExample() {
    const [preferences, setPreferences] = useState({
      notifications: {
        email: true,
        push: false,
        sms: false,
      },
      privacy: {
        profilePublic: true,
        showActivity: false,
        allowMessages: true,
      },
    })

    const updateNotification = (key: keyof typeof preferences.notifications) => (
      e: React.ChangeEvent<HTMLInputElement>
    ) => {
      setPreferences({
        ...preferences,
        notifications: {
          ...preferences.notifications,
          [key]: e.target.checked,
        },
      })
    }

    const updatePrivacy = (key: keyof typeof preferences.privacy) => (
      e: React.ChangeEvent<HTMLInputElement>
    ) => {
      setPreferences({
        ...preferences,
        privacy: {
          ...preferences.privacy,
          [key]: e.target.checked,
        },
      })
    }

    return (
      <div className="space-y-6 max-w-md">
        <div>
          <h3 className="text-lg font-semibold mb-3">Notification Preferences</h3>
          <div className="space-y-3">
            <div className="p-3 rounded-md bg-gray-50">
              <Checkbox
                label="Email notifications"
                checked={preferences.notifications.email}
                onChange={updateNotification('email')}
              />
              <p className="text-xs text-gray-500 mt-1 ml-6">
                Receive notifications via email
              </p>
            </div>
            <div className="p-3 rounded-md bg-gray-50">
              <Checkbox
                label="Push notifications"
                checked={preferences.notifications.push}
                onChange={updateNotification('push')}
              />
              <p className="text-xs text-gray-500 mt-1 ml-6">
                Get instant push notifications
              </p>
            </div>
            <div className="p-3 rounded-md bg-gray-50">
              <Checkbox
                label="SMS notifications"
                checked={preferences.notifications.sms}
                onChange={updateNotification('sms')}
              />
              <p className="text-xs text-gray-500 mt-1 ml-6">
                Receive important alerts via SMS
              </p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Privacy Settings</h3>
          <div className="space-y-3">
            <div className="p-3 rounded-md bg-gray-50">
              <Checkbox
                label="Public profile"
                checked={preferences.privacy.profilePublic}
                onChange={updatePrivacy('profilePublic')}
              />
              <p className="text-xs text-gray-500 mt-1 ml-6">
                Make your profile visible to everyone
              </p>
            </div>
            <div className="p-3 rounded-md bg-gray-50">
              <Checkbox
                label="Show activity status"
                checked={preferences.privacy.showActivity}
                onChange={updatePrivacy('showActivity')}
              />
              <p className="text-xs text-gray-500 mt-1 ml-6">
                Let others see when you're online
              </p>
            </div>
            <div className="p-3 rounded-md bg-gray-50">
              <Checkbox
                label="Allow direct messages"
                checked={preferences.privacy.allowMessages}
                onChange={updatePrivacy('allowMessages')}
              />
              <p className="text-xs text-gray-500 mt-1 ml-6">
                Enable others to send you messages
              </p>
            </div>
          </div>
        </div>

        <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
          Save Preferences
        </button>
      </div>
    )
  },
}

// ============================================================================
// CHECKBOX GROUP
// ============================================================================

export const CheckboxGroup: Story = {
  render: function CheckboxGroupExample() {
    const [selectedFeatures, setSelectedFeatures] = useState<string[]>([
      'analytics',
    ])

    const features = [
      {
        id: 'analytics',
        label: 'Advanced Analytics',
        description: 'Detailed insights and reports',
        popular: true,
      },
      {
        id: 'api',
        label: 'API Access',
        description: 'RESTful API with rate limiting',
        popular: true,
      },
      {
        id: 'collaboration',
        label: 'Team Collaboration',
        description: 'Share and work together',
        popular: false,
      },
      {
        id: 'support',
        label: 'Priority Support',
        description: '24/7 customer support',
        popular: false,
      },
    ]

    const handleToggle = (featureId: string) => {
      setSelectedFeatures((prev) =>
        prev.includes(featureId)
          ? prev.filter((id) => id !== featureId)
          : [...prev, featureId]
      )
    }

    return (
      <div className="space-y-4 max-w-md">
        <h3 className="text-lg font-semibold">Select Plan Features</h3>
        <p className="text-sm text-gray-600">
          Choose the features you want to include in your plan
        </p>
        <div className="space-y-3">
          {features.map((feature) => (
            <div
              key={feature.id}
              className={`p-4 rounded-md border-2 transition-colors ${
                selectedFeatures.includes(feature.id)
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 bg-white'
              }`}
            >
              <div className="flex items-start justify-between">
                <Checkbox
                  label={
                    <div>
                      <span className="font-medium">{feature.label}</span>
                      {feature.popular && (
                        <span className="ml-2 text-xs bg-blue-600 text-white px-2 py-0.5 rounded-full">
                          Popular
                        </span>
                      )}
                    </div>
                  }
                  checked={selectedFeatures.includes(feature.id)}
                  onChange={() => handleToggle(feature.id)}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1 ml-6">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
          <p className="text-sm text-blue-800">
            Selected: {selectedFeatures.length} feature
            {selectedFeatures.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>
    )
  },
}

// ============================================================================
// TASK LIST
// ============================================================================

export const TaskList: Story = {
  render: function TaskListExample() {
    const [tasks, setTasks] = useState([
      { id: 1, title: 'Complete project documentation', completed: true },
      { id: 2, title: 'Review pull requests', completed: false },
      { id: 3, title: 'Update design system', completed: false },
      { id: 4, title: 'Write unit tests', completed: true },
      { id: 5, title: 'Deploy to production', completed: false },
    ])

    const completedCount = tasks.filter((t) => t.completed).length
    const totalCount = tasks.length
    const allCompleted = completedCount === totalCount
    const isIndeterminate = completedCount > 0 && !allCompleted

    const handleToggleAll = (checked: boolean) => {
      setTasks(tasks.map((task) => ({ ...task, completed: checked })))
    }

    const handleToggleTask = (taskId: number) => {
      setTasks(
        tasks.map((task) =>
          task.id === taskId ? { ...task, completed: !task.completed } : task
        )
      )
    }

    return (
      <div className="space-y-4 max-w-md">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">My Tasks</h3>
          <span className="text-sm text-gray-500">
            {completedCount} / {totalCount} completed
          </span>
        </div>

        <div className="p-3 bg-gray-100 rounded-md">
          <Checkbox
            label="Select all tasks"
            checked={allCompleted}
            indeterminate={isIndeterminate}
            onChange={(e) => handleToggleAll(e.target.checked)}
            size="lg"
          />
        </div>

        <div className="space-y-2">
          {tasks.map((task) => (
            <div
              key={task.id}
              className={`p-3 rounded-md border-2 transition-all ${
                task.completed
                  ? 'bg-green-50 border-green-200'
                  : 'bg-white border-gray-200'
              }`}
            >
              <Checkbox
                label={task.title}
                checked={task.completed}
                onChange={() => handleToggleTask(task.id)}
                labelClassName={
                  task.completed ? 'line-through text-gray-500' : ''
                }
              />
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => handleToggleAll(false)}
            className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors text-sm"
          >
            Clear All
          </button>
          <button
            onClick={() => handleToggleAll(true)}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
          >
            Complete All
          </button>
        </div>
      </div>
    )
  },
}

// ============================================================================
// CONDITIONAL FIELDS
// ============================================================================

export const ConditionalFields: Story = {
  render: function ConditionalFieldsExample() {
    const [enableAdvanced, setEnableAdvanced] = useState(false)
    const [advancedOptions, setAdvancedOptions] = useState({
      caching: false,
      debugging: false,
      logging: false,
    })

    return (
      <div className="space-y-4 max-w-md">
        <h3 className="text-lg font-semibold">Configuration Settings</h3>

        <div className="p-4 bg-blue-50 border-2 border-blue-200 rounded-md">
          <Checkbox
            label="Enable advanced options"
            checked={enableAdvanced}
            onChange={(e) => setEnableAdvanced(e.target.checked)}
            size="lg"
          />
          <p className="text-xs text-gray-600 mt-1 ml-6">
            Show additional configuration options
          </p>
        </div>

        {enableAdvanced && (
          <div className="ml-4 p-4 border-l-4 border-blue-500 space-y-3 bg-gray-50 rounded-r-md animate-in fade-in slide-in-from-left-4 duration-200">
            <p className="text-sm font-semibold text-gray-700 mb-3">
              Advanced Options
            </p>
            <div className="space-y-3">
              <div>
                <Checkbox
                  label="Enable caching"
                  checked={advancedOptions.caching}
                  onChange={(e) =>
                    setAdvancedOptions({
                      ...advancedOptions,
                      caching: e.target.checked,
                    })
                  }
                />
                <p className="text-xs text-gray-500 mt-1 ml-6">
                  Cache responses for better performance
                </p>
              </div>
              <div>
                <Checkbox
                  label="Debug mode"
                  checked={advancedOptions.debugging}
                  onChange={(e) =>
                    setAdvancedOptions({
                      ...advancedOptions,
                      debugging: e.target.checked,
                    })
                  }
                />
                <p className="text-xs text-gray-500 mt-1 ml-6">
                  Show detailed debug information
                </p>
              </div>
              <div>
                <Checkbox
                  label="Verbose logging"
                  checked={advancedOptions.logging}
                  onChange={(e) =>
                    setAdvancedOptions({
                      ...advancedOptions,
                      logging: e.target.checked,
                    })
                  }
                />
                <p className="text-xs text-gray-500 mt-1 ml-6">
                  Log all events to console
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  },
}

// ============================================================================
// FILTER EXAMPLE
// ============================================================================

export const FilterList: Story = {
  render: function FilterListExample() {
    const [filters, setFilters] = useState({
      categories: {
        electronics: false,
        clothing: true,
        books: false,
        home: false,
      },
      priceRanges: {
        under50: false,
        range50to100: true,
        over100: false,
      },
      availability: {
        inStock: true,
        onSale: false,
      },
    })

    const activeFiltersCount =
      Object.values(filters.categories).filter(Boolean).length +
      Object.values(filters.priceRanges).filter(Boolean).length +
      Object.values(filters.availability).filter(Boolean).length

    return (
      <div className="space-y-6 max-w-md">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Filters</h3>
          <span className="text-sm text-blue-600 font-medium">
            {activeFiltersCount} active
          </span>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-3">Categories</h4>
          <div className="space-y-2">
            <Checkbox
              label="Electronics"
              checked={filters.categories.electronics}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  categories: {
                    ...filters.categories,
                    electronics: e.target.checked,
                  },
                })
              }
            />
            <Checkbox
              label="Clothing"
              checked={filters.categories.clothing}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  categories: {
                    ...filters.categories,
                    clothing: e.target.checked,
                  },
                })
              }
            />
            <Checkbox
              label="Books"
              checked={filters.categories.books}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  categories: { ...filters.categories, books: e.target.checked },
                })
              }
            />
            <Checkbox
              label="Home & Garden"
              checked={filters.categories.home}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  categories: { ...filters.categories, home: e.target.checked },
                })
              }
            />
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-3">Price Range</h4>
          <div className="space-y-2">
            <Checkbox
              label="Under $50"
              checked={filters.priceRanges.under50}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  priceRanges: {
                    ...filters.priceRanges,
                    under50: e.target.checked,
                  },
                })
              }
            />
            <Checkbox
              label="$50 - $100"
              checked={filters.priceRanges.range50to100}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  priceRanges: {
                    ...filters.priceRanges,
                    range50to100: e.target.checked,
                  },
                })
              }
            />
            <Checkbox
              label="Over $100"
              checked={filters.priceRanges.over100}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  priceRanges: {
                    ...filters.priceRanges,
                    over100: e.target.checked,
                  },
                })
              }
            />
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-3">Availability</h4>
          <div className="space-y-2">
            <Checkbox
              label="In Stock"
              checked={filters.availability.inStock}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  availability: {
                    ...filters.availability,
                    inStock: e.target.checked,
                  },
                })
              }
            />
            <Checkbox
              label="On Sale"
              checked={filters.availability.onSale}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  availability: {
                    ...filters.availability,
                    onSale: e.target.checked,
                  },
                })
              }
            />
          </div>
        </div>

        <button
          onClick={() =>
            setFilters({
              categories: {
                electronics: false,
                clothing: false,
                books: false,
                home: false,
              },
              priceRanges: {
                under50: false,
                range50to100: false,
                over100: false,
              },
              availability: {
                inStock: false,
                onSale: false,
              },
            })
          }
          className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors text-sm"
        >
          Clear All Filters
        </button>
      </div>
    )
  },
}

// ============================================================================
// CUSTOM STYLING
// ============================================================================

export const CustomStyling: Story = {
  render: () => (
    <div className="space-y-4">
      <Checkbox
        label="Custom wrapper styling"
        wrapperClassName="p-4 bg-purple-50 rounded-md border-2 border-purple-200"
      />
      <Checkbox
        label="Custom label styling"
        labelClassName="text-blue-600 font-bold"
      />
      <Checkbox
        label="Combined custom styling"
        wrapperClassName="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-md"
        labelClassName="text-purple-700 font-semibold"
      />
    </div>
  ),
}

// ============================================================================
// ACCESSIBILITY DEMO
// ============================================================================

export const AccessibilityDemo: Story = {
  render: () => (
    <div className="space-y-6 max-w-md">
      <div>
        <h3 className="text-lg font-semibold mb-3">Accessibility Features</h3>
        <p className="text-sm text-gray-600 mb-4">
          This checkbox component follows WAI-ARIA best practices.
        </p>
      </div>

      <div className="space-y-4">
        <div className="p-3 bg-gray-50 rounded-md">
          <h4 className="text-sm font-semibold mb-2">✓ Keyboard Navigation</h4>
          <Checkbox label="Press Space to toggle" />
          <p className="text-xs text-gray-500 mt-2 ml-6">
            Fully keyboard accessible
          </p>
        </div>

        <div className="p-3 bg-gray-50 rounded-md">
          <h4 className="text-sm font-semibold mb-2">✓ Screen Reader Support</h4>
          <Checkbox
            label="Proper ARIA labels"
            aria-describedby="sr-description"
          />
          <p id="sr-description" className="text-xs text-gray-500 mt-2 ml-6">
            Works seamlessly with screen readers
          </p>
        </div>

        <div className="p-3 bg-gray-50 rounded-md">
          <h4 className="text-sm font-semibold mb-2">✓ Focus Management</h4>
          <Checkbox label="Visible focus indicator" />
          <p className="text-xs text-gray-500 mt-2 ml-6">
            Clear focus ring on keyboard navigation
          </p>
        </div>

        <div className="p-3 bg-gray-50 rounded-md">
          <h4 className="text-sm font-semibold mb-2">✓ Disabled State</h4>
          <Checkbox label="Properly disabled" disabled />
          <p className="text-xs text-gray-500 mt-2 ml-6">
            Cannot be interacted with when disabled
          </p>
        </div>
      </div>
    </div>
  ),
}
