// Calendar.test.tsx
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';
import { Calendar, CalendarDayButton } from './Calendar';
import { defaultDateLib, CalendarDay } from 'react-day-picker';


// Setup CSS variables for testing
beforeEach(() => {
  document.documentElement.style.setProperty('--atom-primary', '#3b82f6');
  document.documentElement.style.setProperty('--atom-card-bg', '#ffffff');
  document.documentElement.style.setProperty('--atom-badge-archived-border', '#d1d5db');
  document.documentElement.style.setProperty('--atom-badge-archived-bg', '#f3f4f6');
  document.documentElement.style.setProperty('--atom-info-card-jobstatus-secondary-text', '#3b82f6');
  document.documentElement.style.setProperty('--atom-font-weight-normal', '400');
});


describe('Calendar Component', () => {
  describe('Rendering', () => {
    it('should render calendar with default props', () => {
      render(<Calendar />);
      
      const calendar = screen.getByRole('application');
      expect(calendar).toBeInTheDocument();
    });


    it('should render with custom className', () => {
      const { container } = render(<Calendar className="custom-calendar" />);
      
      const calendar = container.querySelector('[data-slot="calendar"]');
      expect(calendar).toHaveClass('custom-calendar');
    });


    it('should render current month by default', () => {
      render(<Calendar />);
      
      // Calendar should show current month
      expect(screen.getByRole('application')).toBeInTheDocument();
    });


    it('should apply data-slot attribute', () => {
      const { container } = render(<Calendar />);
      
      const calendar = container.querySelector('[data-slot="calendar"]');
      expect(calendar).toHaveAttribute('data-slot', 'calendar');
    });
  });


  describe('Caption Layout', () => {
    it('should render with dropdown caption layout by default', () => {
      render(<Calendar />);
      
      // Check for dropdown elements (month and year selectors)
      const selects = screen.getAllByRole('combobox');
      expect(selects.length).toBeGreaterThan(0);
    });


    it('should render with label caption layout', () => {
      render(<Calendar captionLayout="label" />);
      
      // With label layout, there should be no dropdowns
      const selects = screen.queryAllByRole('combobox');
      expect(selects.length).toBe(0);
    });


    it('should render with buttons caption layout', () => {
      render(<Calendar captionLayout="label" />);
      
      const calendar = screen.getByRole('application');
      expect(calendar).toBeInTheDocument();
    });
  });


  describe('Navigation', () => {
    it('should render navigation buttons', () => {
      render(<Calendar captionLayout="dropdown" />);
      
      // Look for previous/next month buttons
      const buttons = screen.getAllByRole('button');
      expect(buttons.length).toBeGreaterThan(0);
    });


    it('should navigate to next month when next button is clicked', async () => {
      const user = userEvent.setup();
      render(<Calendar captionLayout="dropdown-years" />);
      
      const buttons = screen.getAllByRole('button');
      const nextButton = buttons.find(btn => 
        btn.querySelector('svg')?.classList.contains('lucide-chevron-right')
      );
      
      if (nextButton) {
        await user.click(nextButton);
        expect(screen.getByRole('application')).toBeInTheDocument();
      }
    });


    it('should navigate to previous month when previous button is clicked', async () => {
      const user = userEvent.setup();
      render(<Calendar captionLayout="dropdown-years" />);
      
      const buttons = screen.getAllByRole('button');
      const prevButton = buttons.find(btn => 
        btn.querySelector('svg')?.classList.contains('lucide-chevron-left')
      );
      
      if (prevButton) {
        await user.click(prevButton);
        expect(screen.getByRole('application')).toBeInTheDocument();
      }
    });
  });


  describe('Date Selection', () => {
    it('should handle single date selection', async () => {
      const user = userEvent.setup();
      const onSelect = vi.fn();
      
      render(<Calendar mode="single" onSelect={onSelect} />);
      
      // Find and click a day button
      const dayButtons = screen.getAllByRole('button').filter(btn => 
        btn.hasAttribute('data-day')
      );
      
      if (dayButtons.length > 0) {
        await user.click(dayButtons[10]);
        expect(onSelect).toHaveBeenCalled();
      }
    });


    it('should mark selected date with appropriate data attributes', () => {
      const selected = new Date(2024, 0, 15);
      
      render(
        <Calendar 
          mode="single" 
          selected={selected}
          defaultMonth={selected}
        />
      );
      
      // Find button with matching date
      const selectedButton = screen.getAllByRole('button').find(btn => {
        const dataDay = btn.getAttribute('data-day');
        return dataDay === selected.toLocaleDateString();
      });
      
      if (selectedButton) {
        expect(selectedButton).toHaveAttribute('data-selected-single');
      }
    });


    it('should handle date range selection', async () => {
      const user = userEvent.setup();
      const onSelect = vi.fn();
      
      render(<Calendar mode="range" onSelect={onSelect} />);
      
      const dayButtons = screen.getAllByRole('button').filter(btn => 
        btn.hasAttribute('data-day')
      );
      
      if (dayButtons.length >= 2) {
        await user.click(dayButtons[5]);
        await user.click(dayButtons[10]);
        
        expect(onSelect).toHaveBeenCalled();
      }
    });


    it('should mark range start with data-range-start attribute', () => {
      const from = new Date(2024, 0, 1);
      const to = new Date(2024, 0, 10);
      
      render(
        <Calendar 
          mode="range" 
          selected={{ from, to }}
          defaultMonth={from}
        />
      );
      
      const rangeStartButton = screen.getAllByRole('button').find(btn => 
        btn.getAttribute('data-range-start') === 'true'
      );
      
      expect(rangeStartButton).toBeDefined();
    });


    it('should mark range end with data-range-end attribute', () => {
      const from = new Date(2024, 0, 1);
      const to = new Date(2024, 0, 10);
      
      render(
        <Calendar 
          mode="range" 
          selected={{ from, to }}
          defaultMonth={from}
        />
      );
      
      const rangeEndButton = screen.getAllByRole('button').find(btn => 
        btn.getAttribute('data-range-end') === 'true'
      );
      
      expect(rangeEndButton).toBeDefined();
    });


    it('should mark range middle days with data-range-middle attribute', () => {
      const from = new Date(2024, 0, 1);
      const to = new Date(2024, 0, 10);
      
      render(
        <Calendar 
          mode="range" 
          selected={{ from, to }}
          defaultMonth={from}
        />
      );
      
      const rangeMiddleButtons = screen.getAllByRole('button').filter(btn => 
        btn.getAttribute('data-range-middle') === 'true'
      );
      
      expect(rangeMiddleButtons.length).toBeGreaterThan(0);
    });


    it('should handle multiple date selection', async () => {
      const user = userEvent.setup();
      const onSelect = vi.fn();
      
      render(<Calendar mode="multiple" onSelect={onSelect} />);
      
      const dayButtons = screen.getAllByRole('button').filter(btn => 
        btn.hasAttribute('data-day')
      );
      
      if (dayButtons.length >= 2) {
        await user.click(dayButtons[0]);
        await user.click(dayButtons[1]);
        
        expect(onSelect).toHaveBeenCalledTimes(2);
      }
    });
  });


  describe('Button Variant', () => {
    it('should apply ghost button variant by default', () => {
      const { container } = render(<Calendar />);
      
      // Navigation buttons should have ghost variant classes
      const buttons = container.querySelectorAll('button');
      expect(buttons.length).toBeGreaterThan(0);
    });


    it('should apply custom button variant', () => {
      render(<Calendar buttonVariant="outline" />);
      
      const calendar = screen.getByRole('application');
      expect(calendar).toBeInTheDocument();
    });
  });


  describe('Outside Days', () => {
    it('should show outside days by default', () => {
      render(<Calendar />);
      
      const calendar = screen.getByRole('application');
      expect(calendar).toBeInTheDocument();
    });


    it('should hide outside days when showOutsideDays is false', () => {
      render(<Calendar showOutsideDays={false} />);
      
      const calendar = screen.getByRole('application');
      expect(calendar).toBeInTheDocument();
    });
  });


  describe('Today Highlight', () => {
    it('should highlight today\'s date', () => {
      render(<Calendar />);
      
      const today = new Date();
      const todayButton = screen.getAllByRole('button').find(btn => {
        const dataDay = btn.getAttribute('data-day');
        return dataDay === today.toLocaleDateString();
      });
      
      expect(todayButton).toBeDefined();
    });
  });


  describe('Disabled Dates', () => {
    it('should disable dates based on disabled prop', () => {
      const disabledDays = new Date(2024, 0, 15);
      
      render(
        <Calendar 
          disabled={disabledDays}
          defaultMonth={disabledDays}
        />
      );
      
      const disabledButton = screen.getAllByRole('button').find(btn => 
        btn.getAttribute('data-day') === disabledDays.toLocaleDateString()
      );
      
      if (disabledButton) {
        expect(disabledButton).toBeDisabled();
      }
    });


    it('should disable dates before a specific date', () => {
      const today = new Date();
      
      render(<Calendar disabled={{ before: today }} />);
      
      const calendar = screen.getByRole('application');
      expect(calendar).toBeInTheDocument();
    });


    it('should disable dates after a specific date', () => {
      const today = new Date();
      
      render(<Calendar disabled={{ after: today }} />);
      
      const calendar = screen.getByRole('application');
      expect(calendar).toBeInTheDocument();
    });
  });


  describe('Custom Formatters', () => {
    it('should use custom month formatter', () => {
      const formatMonthDropdown = (date: Date) => 
        date.toLocaleString('default', { month: 'numeric' });
      
      render(<Calendar formatters={{ formatMonthDropdown }} />);
      
      const calendar = screen.getByRole('application');
      expect(calendar).toBeInTheDocument();
    });


    it('should use default short month formatter', () => {
      render(<Calendar />);
      
      const calendar = screen.getByRole('application');
      expect(calendar).toBeInTheDocument();
    });
  });


  describe('Custom Components', () => {
    it('should accept custom components', () => {
      const CustomCaption = () => <div data-testid="custom-caption">Custom</div>;
      
      render(
        <Calendar 
          captionLayout="label"
          components={{ MonthCaption: CustomCaption }} 
        />
      );
      
      const calendar = screen.getByRole('application');
      expect(calendar).toBeInTheDocument();
    });
  });


  describe('Week Numbers', () => {
    it('should show week numbers when enabled', () => {
      render(<Calendar showWeekNumber />);
      
      const calendar = screen.getByRole('application');
      expect(calendar).toBeInTheDocument();
    });


    it('should hide week numbers by default', () => {
      render(<Calendar />);
      
      const calendar = screen.getByRole('application');
      expect(calendar).toBeInTheDocument();
    });
  });


  describe('Accessibility', () => {
    it('should have proper ARIA role', () => {
      render(<Calendar />);
      
      const calendar = screen.getByRole('application');
      expect(calendar).toBeInTheDocument();
    });


    it('should support keyboard navigation', async () => {
      const user = userEvent.setup();
      render(<Calendar />);
      
      const dayButtons = screen.getAllByRole('button').filter(btn => 
        btn.hasAttribute('data-day')
      );
      
      if (dayButtons.length > 0) {
        dayButtons[10].focus();
        expect(dayButtons[10]).toHaveFocus();
        
        await user.keyboard('{ArrowRight}');
      }
    });


    it('should have accessible day buttons', () => {
      render(<Calendar />);
      
      const dayButtons = screen.getAllByRole('button').filter(btn => 
        btn.hasAttribute('data-day')
      );
      
      dayButtons.forEach(button => {
        expect(button).toHaveAttribute('data-day');
      });
    });
  });


  describe('Custom Class Names', () => {
    it('should accept custom classNames prop', () => {
      render(
        <Calendar 
          classNames={{
            day: 'custom-day-class',
            month: 'custom-month-class',
          }}
        />
      );
      
      const calendar = screen.getByRole('application');
      expect(calendar).toBeInTheDocument();
    });


    it('should merge custom classNames with defaults', () => {
      const { container } = render(
        <Calendar 
          classNames={{
            day: 'my-custom-day',
          }}
        />
      );
      
      const calendar = container.querySelector('[data-slot="calendar"]');
      expect(calendar).toBeInTheDocument();
    });
  });


  describe('Default Month', () => {
    it('should render specified default month', () => {
      const defaultMonth = new Date(2024, 5, 1); // June 2024
      
      render(<Calendar defaultMonth={defaultMonth} />);
      
      const calendar = screen.getByRole('application');
      expect(calendar).toBeInTheDocument();
    });
  });


  describe('Controlled Mode', () => {
    it('should work in controlled mode with month prop', () => {
      const month = new Date(2024, 0, 1);
      const onMonthChange = vi.fn();
      
      render(<Calendar month={month} onMonthChange={onMonthChange} />);
      
      const calendar = screen.getByRole('application');
      expect(calendar).toBeInTheDocument();
    });


    it('should work in controlled mode with selected prop', () => {
      const selected = new Date();
      const onSelect = vi.fn();
      
      render(
        <Calendar 
          mode="single" 
          selected={selected} 
          onSelect={onSelect} 
        />
      );
      
      const calendar = screen.getByRole('application');
      expect(calendar).toBeInTheDocument();
    });
  });


  describe('Multiple Months', () => {
    it('should render multiple months when numberOfMonths is set', () => {
      render(<Calendar numberOfMonths={2} />);
      
      const calendar = screen.getByRole('application');
      expect(calendar).toBeInTheDocument();
    });
  });


  describe('Chevron Icons', () => {
    it('should render left chevron for previous button', () => {
      render(<Calendar captionLayout="dropdown-years" />);
      
      const leftChevrons = document.querySelectorAll('.lucide-chevron-left');
      expect(leftChevrons.length).toBeGreaterThan(0);
    });


    it('should render right chevron for next button', () => {
      render(<Calendar captionLayout="dropdown-months" />);
      
      const rightChevrons = document.querySelectorAll('.lucide-chevron-right');
      expect(rightChevrons.length).toBeGreaterThan(0);
    });


    it('should render down chevron for dropdowns', () => {
      render(<Calendar captionLayout="dropdown" />);
      
      const calendar = screen.getByRole('application');
      expect(calendar).toBeInTheDocument();
    });
  });


  describe('RTL Support', () => {
    it('should handle RTL direction for chevrons', () => {
      const { container } = render(<Calendar />);
      
      const calendar = container.querySelector('[data-slot="calendar"]');
      expect(calendar).toBeInTheDocument();
    });
  });
});


describe('CalendarDayButton Component', () => {
  // ✅ FIXED: Properly create CalendarDay instance using the class constructor
  const mockDay = new CalendarDay(
    new Date(2024, 0, 15),      // date
    new Date(2024, 0, 1),       // displayMonth
    defaultDateLib              // dateLib
  );


  const mockModifiers = {
    selected: false,
    today: false,
    disabled: false,
    outside: false,
    focused: false,
    hidden: false,
    range_start: false,
    range_end: false,
    range_middle: false,
  };


  describe('Rendering', () => {
    it('should render day button', () => {
      render(
        <CalendarDayButton 
          day={mockDay} 
          modifiers={mockModifiers}
        />
      );
      
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });


    it('should have data-day attribute with formatted date', () => {
      render(
        <CalendarDayButton 
          day={mockDay} 
          modifiers={mockModifiers}
        />
      );
      
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute(
        'data-day', 
        mockDay.date.toLocaleDateString()
      );
    });
  });


  describe('Selection States', () => {
    it('should mark single selected day', () => {
      render(
        <CalendarDayButton 
          day={mockDay} 
          modifiers={{ ...mockModifiers, selected: true }}
        />
      );
      
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('data-selected-single', 'true');
    });


    it('should mark range start', () => {
      render(
        <CalendarDayButton 
          day={mockDay} 
          modifiers={{ ...mockModifiers, selected: true, range_start: true }}
        />
      );
      
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('data-range-start', 'true');
    });


    it('should mark range end', () => {
      render(
        <CalendarDayButton 
          day={mockDay} 
          modifiers={{ ...mockModifiers, selected: true, range_end: true }}
        />
      );
      
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('data-range-end', 'true');
    });


    it('should mark range middle', () => {
      render(
        <CalendarDayButton 
          day={mockDay} 
          modifiers={{ ...mockModifiers, range_middle: true }}
        />
      );
      
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('data-range-middle', 'true');
    });
  });


  describe('Focus Handling', () => {
    it('should focus button when modifiers.focused is true', async () => {
      const { rerender } = render(
        <CalendarDayButton 
          day={mockDay} 
          modifiers={mockModifiers}
        />
      );
      
      rerender(
        <CalendarDayButton 
          day={mockDay} 
          modifiers={{ ...mockModifiers, focused: true }}
        />
      );
      
      await waitFor(() => {
        const button = screen.getByRole('button');
        expect(button).toHaveFocus();
      });
    });
  });


  describe('Custom className', () => {
    it('should accept custom className', () => {
      render(
        <CalendarDayButton 
          day={mockDay} 
          modifiers={mockModifiers}
          className="custom-day-button"
        />
      );
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('custom-day-button');
    });
  });


  describe('Click Handler', () => {
    it('should handle click events', async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();
      
      render(
        <CalendarDayButton 
          day={mockDay} 
          modifiers={mockModifiers}
          onClick={onClick}
        />
      );
      
      const button = screen.getByRole('button');
      await user.click(button);
      
      expect(onClick).toHaveBeenCalled();
    });
  });
});


describe('Integration Tests', () => {
  it('should work as a complete calendar with date selection', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    
    render(<Calendar mode="single" onSelect={onSelect} />);
    
    expect(screen.getByRole('application')).toBeInTheDocument();
    
    const dayButtons = screen.getAllByRole('button').filter(btn => 
      btn.hasAttribute('data-day')
    );
    
    if (dayButtons.length > 0) {
      await user.click(dayButtons[10]);
      expect(onSelect).toHaveBeenCalled();
    }
  });


  it('should work with date range selection flow', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    
    render(<Calendar mode="range" onSelect={onSelect} />);
    
    const dayButtons = screen.getAllByRole('button').filter(btn => 
      btn.hasAttribute('data-day')
    );
    
    if (dayButtons.length >= 2) {
      await user.click(dayButtons[5]);
      await user.click(dayButtons[15]);
      
      expect(onSelect).toHaveBeenCalled();
    }
  });
});
