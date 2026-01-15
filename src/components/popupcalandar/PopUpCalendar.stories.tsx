// stories/PopUpCalendar.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { PopUpCalendar } from './PopUpCalendar'
import { Button } from '../button/Button'

// ✅ TYPE-SAFE UTILITY (Fixes ALL toLocaleDateString errors)
const formatDate = (date: Date | undefined): string => 
  date ? date.toLocaleDateString() : 'No date selected'

// ✅ TYPE DEFINITIONS (Fixes useState type mismatches)
type DateState = Record<string, Date | undefined>
type FormState = {
  startDate: Date
  endDate?: Date
}
type TripState = {
  departure: Date | undefined
  arrival: Date | undefined
  event: Date | undefined
}

const meta: Meta<typeof PopUpCalendar> = {
  title: 'Components/PopUpCalendar',
  component: PopUpCalendar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Interactive calendar popover date picker with full Calendar component integration and controlled value state.'
      }
    }
  },
  argTypes: {
    placeholder: { control: 'text' },
    icon: { control: 'boolean' },
    captionLayout: {
      control: 'select',
      options: ['label', 'dropdown', 'dropdown-months', 'dropdown-years']
    },
    value: { control: false },
    onChange: { control: false }
  },
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof PopUpCalendar>

export const Default: Story = {
  args: {
    placeholder: 'Select a date'
  }
}

export const WithValue: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date())
    
    return (
      <div className="space-y-4">
        <PopUpCalendar 
          value={date} 
          onChange={setDate}
          placeholder="Select start date"
          icon
        />
        <div className="p-4 bg-muted rounded-md text-sm">
          Selected: {formatDate(date)}
        </div>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Calendar value syncs directly to parent state with visual feedback.'
      }
    }
  }
}

export const Variants: Story = {
  render: () => {
    const [dates, setDates] = useState<DateState>({})
    
    return (
      <div className="grid grid-cols-2 gap-6 w-600px">
        {[
          { label: 'Default', icon: false, layout: 'label' as const },
          { label: 'With Icon', icon: true, layout: 'dropdown' as const },
          { label: 'Dropdown Month', icon: true, layout: 'dropdown-months' as const },
          { label: 'Dropdown Years', icon: false, layout: 'dropdown-years' as const }
        ].map(({ label, icon, layout }, i) => (
          <div key={label} className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground block">
              {label}
            </label>
            <PopUpCalendar
              key={layout}
              value={dates[i]}
              onChange={(date) => setDates(prev => ({ ...prev, [i]: date }))}
              placeholder={`Pick a ${label.toLowerCase()} date`}
              icon={icon}
              captionLayout={layout}
            />
            <div className="text-xs text-muted-foreground">
              {formatDate(dates[i])}
            </div>
          </div>
        ))}
      </div>
    )
  }
}

export const FormIntegration: Story = {
  render: () => {
    const [formData, setFormData] = useState<FormState>({
      startDate: new Date(2025, 0, 15),
      endDate: undefined
    })
    
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      console.log('Form submitted:', formData)
    }
    
    return (
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md p-6 bg-card border rounded-lg">
        <div className="space-y-2">
          <label className="text-sm font-medium">Start Date</label>
          <PopUpCalendar
            value={formData.startDate}
            onChange={(date) => setFormData(prev => ({ 
              ...prev, 
              startDate: date ?? prev.startDate 
            }))}
            icon
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">End Date (optional)</label>
          <PopUpCalendar
            value={formData.endDate}
            onChange={(date) => setFormData(prev => ({ 
              ...prev, 
              endDate: date 
            }))}
          />
        </div>
        
        <div className="flex gap-2 pt-2">
          <Button type="button" variant="warning" className="flex-1">
            Cancel
          </Button>
          <Button type="submit" className="flex-1">Submit</Button>
        </div>
        
        <pre className="text-xs bg-muted p-3 rounded text-muted-foreground mt-4 overflow-auto">
          {JSON.stringify(formData, null, 2)}
        </pre>
      </form>
    )
  }
}

export const Multiple: Story = {
  render: () => {
    // ✅ FIXED: Explicit type annotation
    const [dates, setDates] = useState<TripState>({
      departure: new Date(2025, 1, 20),
      arrival: undefined,
      event: new Date(2025, 2, 10)
    })
    
    return (
      <div className="space-y-6 max-w-lg">
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Trip Planner</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground">Departure</label>
              <PopUpCalendar
                value={dates.departure}
                onChange={(date) => setDates(prev => ({ 
                  ...prev, 
                  departure: date ?? prev.departure 
                }))}
                icon
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground">Arrival</label>
              <PopUpCalendar
                value={dates.arrival}
                onChange={(date) => setDates(prev => ({ 
                  ...prev, 
                  arrival: date 
                }))}
                icon
              />
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium block">Event Date</label>
          <PopUpCalendar
            value={dates.event}
            onChange={(date) => setDates(prev => ({ 
              ...prev, 
              event: date ?? prev.event 
            }))}
          />
        </div>
        
        <div className="grid grid-cols-3 gap-2 text-xs p-2 bg-muted rounded-md">
          <div>Departure: {formatDate(dates.departure)}</div>
          <div>Arrival: {formatDate(dates.arrival)}</div>
          <div>Event: {formatDate(dates.event)}</div>
        </div>
      </div>
    )
  }
}

export const Playground: Story = {
  render: (args) => {
    const [date, setDate] = useState<Date | undefined>()
    
    return (
      <div className="space-y-4 p-6 max-w-md">
        <PopUpCalendar 
          {...args}
          value={date}
          onChange={setDate}
        />
        <div className="flex gap-2 p-3 bg-muted rounded-md">
          <Button
            size="sm"
            variant="secondary"
            onClick={() => setDate(new Date())}
            className="flex-1"
          >
            Today
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setDate(undefined)}
            className="flex-1"
          >
            Clear
          </Button>
        </div>
        <div className="text-sm p-3 bg-muted rounded-md">
          <strong>ISO:</strong> {date?.toISOString().split('T')[0] ?? 'None'}
          <br />
          <strong>Formatted:</strong> {formatDate(date)}
        </div>
      </div>
    )
  },
  args: {
    placeholder: 'Click to pick a date…',
    icon: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Fully interactive playground with clear/reset actions and value display.'
      }
    }
  }
}

export const KitchenSink: Story = {
  render: () => {
    type TestState = {
      single: Date
      optional: Date | undefined
      past: Date
      future: Date
    }
    
    const [state, setState] = useState<TestState>({
      single: new Date(),
      optional: undefined,
      past: new Date(2024, 11, 15),
      future: new Date(2026, 0, 20)
    })
    
    return (
      <div className="space-y-6 max-w-2xl p-8 bg-background border rounded-xl">
        <h1 className="text-2xl font-bold">Date Picker Tests</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h3 className="font-semibold">Single Date</h3>
            <PopUpCalendar
              value={state.single}
              onChange={(date) => setState(p => ({ 
                ...p, 
                single: date ?? p.single 
              }))}
              icon
              captionLayout="dropdown"
            />
          </div>
          
          <div className="space-y-3">
            <h3 className="font-semibold">Optional Date</h3>
            <PopUpCalendar
              value={state.optional}
              onChange={(date) => setState(p => ({ 
                ...p, 
                optional: date 
              }))}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-3">
            <h3 className="font-semibold">Past Date</h3>
            <PopUpCalendar value={state.past} onChange={() => {}} />
          </div>
          
          <div className="space-y-3">
            <h3 className="font-semibold">Future Date</h3>
            <PopUpCalendar value={state.future} onChange={() => {}} />
          </div>
        </div>
        
        <details className="p-4 border rounded-lg">
          <summary className="font-medium cursor-pointer">Debug State</summary>
          <pre className="text-xs mt-3 p-3 bg-muted rounded text-muted-foreground">
            {JSON.stringify(state, null, 2)}
          </pre>
        </details>
      </div>
    )
  }
}
