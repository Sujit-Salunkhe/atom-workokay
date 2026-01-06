// src/components/ui/number-input.test.tsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createRef } from 'react'
import { NumberInput } from './InputNumber'

describe('NumberInput', () => {
  describe('Rendering', () => {
    it('should render with default props', () => {
      render(<NumberInput />)
      const input = screen.getByRole('textbox')
      expect(input).toBeInTheDocument()
    })

    it('should render with placeholder', () => {
      render(<NumberInput placeholder="Enter value" />)
      const input = screen.getByPlaceholderText('Enter value')
      expect(input).toBeInTheDocument()
    })

    it('should render with custom className', () => {
      render(<NumberInput className="custom-class" />)
      const input = screen.getByRole('textbox')
      expect(input).toHaveClass('custom-class')
    })

    it('should render disabled state', () => {
      render(<NumberInput disabled />)
      const input = screen.getByRole('textbox')
      expect(input).toBeDisabled()
    })

    it('should render with initial value', () => {
      render(<NumberInput value="42" />)
      const input = screen.getByRole('textbox')
      expect(input).toHaveValue('42')
    })

    it('should not render spinners by default', () => {
      render(<NumberInput />)
      const incrementBtn = screen.queryByLabelText('Increment')
      const decrementBtn = screen.queryByLabelText('Decrement')
      expect(incrementBtn).not.toBeInTheDocument()
      expect(decrementBtn).not.toBeInTheDocument()
    })

    it('should render spinners when showSpinners is true', () => {
      render(<NumberInput showSpinners />)
      const incrementBtn = screen.getByLabelText('Increment')
      const decrementBtn = screen.getByLabelText('Decrement')
      expect(incrementBtn).toBeInTheDocument()
      expect(decrementBtn).toBeInTheDocument()
    })
  })

  describe('Size Variants', () => {
    it('should apply small size class', () => {
      render(<NumberInput size="sm" />)
      const input = screen.getByRole('textbox')
      expect(input).toHaveClass('h-8', 'px-2', 'py-1', 'text-xs', 'w-32')
    })

    it('should apply medium size class (default)', () => {
      render(<NumberInput size="md" />)
      const input = screen.getByRole('textbox')
      expect(input).toHaveClass('h-10', 'px-3', 'py-2', 'text-sm', 'w-40')
    })

    it('should apply large size class', () => {
      render(<NumberInput size="lg" />)
      const input = screen.getByRole('textbox')
      expect(input).toHaveClass('h-12', 'px-4', 'py-3', 'text-base', 'w-48')
    })

    it('should add padding for spinners', () => {
      render(<NumberInput showSpinners size="md" />)
      const input = screen.getByRole('textbox')
      expect(input).toHaveClass('pr-8')
    })
  })

  describe('Numeric Variant', () => {
    it('should accept numeric input', async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()
      render(<NumberInput variant="numeric" onChange={onChange} />)
      
      const input = screen.getByRole('textbox')
      await user.type(input, '123')
      
      expect(onChange).toHaveBeenCalledWith('1')
      expect(onChange).toHaveBeenCalledWith('12')
      expect(onChange).toHaveBeenCalledWith('123')
    })

    it('should accept decimal numbers', async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()
      render(<NumberInput variant="numeric" onChange={onChange} />)
      
      const input = screen.getByRole('textbox')
      await user.type(input, '3.14')
      
      expect(onChange).toHaveBeenCalledWith('3.14')
    })

    it('should accept negative numbers', async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()
      render(<NumberInput variant="numeric" onChange={onChange} />)
      
      const input = screen.getByRole('textbox')
      await user.type(input, '-42')
      
      expect(onChange).toHaveBeenCalledWith('-42')
    })

    it('should reject non-numeric input', async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()
      render(<NumberInput variant="numeric" onChange={onChange} />)
      
      const input = screen.getByRole('textbox')
      await user.type(input, 'abc')
      
      expect(onChange).not.toHaveBeenCalled()
    })

    it('should increment value on ArrowUp', async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()
      render(<NumberInput variant="numeric" value="10" onChange={onChange} />)
      
      const input = screen.getByRole('textbox')
      input.focus()
      await user.keyboard('{ArrowUp}')
      
      expect(onChange).toHaveBeenCalledWith('11')
    })

    it('should decrement value on ArrowDown', async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()
      render(<NumberInput variant="numeric" value="10" onChange={onChange} />)
      
      const input = screen.getByRole('textbox')
      input.focus()
      await user.keyboard('{ArrowDown}')
      
      expect(onChange).toHaveBeenCalledWith('9')
    })

    it('should increment by custom step', async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()
      render(<NumberInput variant="numeric" value="10" step={5} onChange={onChange} />)
      
      const input = screen.getByRole('textbox')
      input.focus()
      await user.keyboard('{ArrowUp}')
      
      expect(onChange).toHaveBeenCalledWith('15')
    })

    it('should respect min boundary', async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()
      render(<NumberInput variant="numeric" value="0" min={0} onChange={onChange} />)
      
      const input = screen.getByRole('textbox')
      input.focus()
      await user.keyboard('{ArrowDown}')
      
      expect(onChange).toHaveBeenCalledWith('0')
    })

    it('should respect max boundary', async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()
      render(<NumberInput variant="numeric" value="100" max={100} onChange={onChange} />)
      
      const input = screen.getByRole('textbox')
      input.focus()
      await user.keyboard('{ArrowUp}')
      
      expect(onChange).toHaveBeenCalledWith('100')
    })

    it('should handle empty value on arrow keys', async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()
      render(<NumberInput variant="numeric" value="" onChange={onChange} />)
      
      const input = screen.getByRole('textbox')
      input.focus()
      await user.keyboard('{ArrowUp}')
      
      expect(onChange).toHaveBeenCalledWith('1')
    })

    it('should increment decimal values correctly', async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()
      render(<NumberInput variant="numeric" value="3.14" step={0.1} onChange={onChange} />)
      
      const input = screen.getByRole('textbox')
      input.focus()
      await user.keyboard('{ArrowUp}')
      
      expect(onChange).toHaveBeenCalledWith('3.24')
    })
  })

  describe('Alphanumeric Variant', () => {
    it('should accept alphanumeric input', async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()
      render(<NumberInput variant="alphanumeric" onChange={onChange} />)
      
      const input = screen.getByRole('textbox')
      await user.type(input, 'A1')
      
      expect(onChange).toHaveBeenCalledWith('A')
      expect(onChange).toHaveBeenCalledWith('A1')
    })

    it('should convert input to uppercase', async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()
      render(<NumberInput variant="alphanumeric" onChange={onChange} />)
      
      const input = screen.getByRole('textbox')
      await user.type(input, 'abc')
      
      expect(onChange).toHaveBeenCalledWith('A')
      expect(onChange).toHaveBeenCalledWith('AB')
      expect(onChange).toHaveBeenCalledWith('ABC')
    })

    it('should reject special characters', async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()
      render(<NumberInput variant="alphanumeric" onChange={onChange} />)
      
      const input = screen.getByRole('textbox')
      await user.type(input, '@#$')
      
      expect(onChange).not.toHaveBeenCalled()
    })

    it('should increment letter on ArrowUp: A1 -> B1', async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()
      render(<NumberInput variant="alphanumeric" value="A1" onChange={onChange} />)
      
      const input = screen.getByRole('textbox')
      input.focus()
      await user.keyboard('{ArrowUp}')
      
      expect(onChange).toHaveBeenCalledWith('B1')
    })

    it('should decrement letter on ArrowDown: B1 -> A1', async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()
      render(<NumberInput variant="alphanumeric" value="B1" onChange={onChange} />)
      
      const input = screen.getByRole('textbox')
      input.focus()
      await user.keyboard('{ArrowDown}')
      
      expect(onChange).toHaveBeenCalledWith('A1')
    })

    it('should handle Z to AA transition on increment', async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()
      render(<NumberInput variant="alphanumeric" value="Z1" onChange={onChange} />)
      
      const input = screen.getByRole('textbox')
      input.focus()
      await user.keyboard('{ArrowUp}')
      
      expect(onChange).toHaveBeenCalledWith('AA1')
    })

    it('should handle AA to Z transition on decrement', async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()
      render(<NumberInput variant="alphanumeric" value="AA1" onChange={onChange} />)
      
      const input = screen.getByRole('textbox')
      input.focus()
      await user.keyboard('{ArrowDown}')
      
      expect(onChange).toHaveBeenCalledWith('Z1')
    })

    it('should handle multi-character letters: AB5 -> AC5', async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()
      render(<NumberInput variant="alphanumeric" value="AB5" onChange={onChange} />)
      
      const input = screen.getByRole('textbox')
      input.focus()
      await user.keyboard('{ArrowUp}')
      
      expect(onChange).toHaveBeenCalledWith('AC5')
    })

    it('should keep number part unchanged on increment', async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()
      render(<NumberInput variant="alphanumeric" value="C99" onChange={onChange} />)
      
      const input = screen.getByRole('textbox')
      input.focus()
      await user.keyboard('{ArrowUp}')
      
      expect(onChange).toHaveBeenCalledWith('D99')
    })

    it('should handle empty value on arrow keys', async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()
      render(<NumberInput variant="alphanumeric" value="" onChange={onChange} />)
      
      const input = screen.getByRole('textbox')
      input.focus()
      await user.keyboard('{ArrowUp}')
      
      expect(onChange).toHaveBeenCalledWith('A1')
    })

    it('should handle letter-only input: A -> B', async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()
      render(<NumberInput variant="alphanumeric" value="A" onChange={onChange} />)
      
      const input = screen.getByRole('textbox')
      input.focus()
      await user.keyboard('{ArrowUp}')
      
      expect(onChange).toHaveBeenCalledWith('B')
    })
  })

  describe('Spinner Buttons', () => {
    it('should increment numeric value on increment button click', async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()
      render(<NumberInput variant="numeric" value="10" showSpinners onChange={onChange} />)
      
      const incrementBtn = screen.getByLabelText('Increment')
      await user.click(incrementBtn)
      
      expect(onChange).toHaveBeenCalledWith('11')
    })

    it('should decrement numeric value on decrement button click', async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()
      render(<NumberInput variant="numeric" value="10" showSpinners onChange={onChange} />)
      
      const decrementBtn = screen.getByLabelText('Decrement')
      await user.click(decrementBtn)
      
      expect(onChange).toHaveBeenCalledWith('9')
    })

    it('should increment alphanumeric value on increment button click', async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()
      render(<NumberInput variant="alphanumeric" value="A1" showSpinners onChange={onChange} />)
      
      const incrementBtn = screen.getByLabelText('Increment')
      await user.click(incrementBtn)
      
      expect(onChange).toHaveBeenCalledWith('B1')
    })

    it('should decrement alphanumeric value on decrement button click', async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()
      render(<NumberInput variant="alphanumeric" value="B1" showSpinners onChange={onChange} />)
      
      const decrementBtn = screen.getByLabelText('Decrement')
      await user.click(decrementBtn)
      
      expect(onChange).toHaveBeenCalledWith('A1')
    })

    it('should respect min boundary with spinner buttons', async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()
      render(<NumberInput variant="numeric" value="0" min={0} showSpinners onChange={onChange} />)
      
      const decrementBtn = screen.getByLabelText('Decrement')
      await user.click(decrementBtn)
      
      expect(onChange).toHaveBeenCalledWith('0')
    })

    it('should respect max boundary with spinner buttons', async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()
      render(<NumberInput variant="numeric" value="100" max={100} showSpinners onChange={onChange} />)
      
      const incrementBtn = screen.getByLabelText('Increment')
      await user.click(incrementBtn)
      
      expect(onChange).toHaveBeenCalledWith('100')
    })

    it('should respect custom step with spinner buttons', async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()
      render(<NumberInput variant="numeric" value="10" step={5} showSpinners onChange={onChange} />)
      
      const incrementBtn = screen.getByLabelText('Increment')
      await user.click(incrementBtn)
      
      expect(onChange).toHaveBeenCalledWith('15')
    })

    it('should disable spinner buttons when input is disabled', async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()
      render(<NumberInput variant="numeric" value="10" showSpinners disabled onChange={onChange} />)
      
      const incrementBtn = screen.getByLabelText('Increment')
      const decrementBtn = screen.getByLabelText('Decrement')
      
      expect(incrementBtn).toBeDisabled()
      expect(decrementBtn).toBeDisabled()
      
      await user.click(incrementBtn)
      expect(onChange).not.toHaveBeenCalled()
    })

    it('should handle multiple spinner button clicks', async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()
      render(<NumberInput variant="numeric" value="5" showSpinners onChange={onChange} />)
      
      const incrementBtn = screen.getByLabelText('Increment')
      const decrementBtn = screen.getByLabelText('Decrement')
      
      await user.click(incrementBtn)
      await user.click(incrementBtn)
      await user.click(decrementBtn)
      
      expect(onChange).toHaveBeenCalledTimes(3)
      expect(onChange).toHaveBeenNthCalledWith(1, '6')
      expect(onChange).toHaveBeenNthCalledWith(2, '7')
      expect(onChange).toHaveBeenNthCalledWith(3, '6')
    })

    it('should work with both keyboard and spinner buttons', async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()
      render(<NumberInput variant="numeric" value="10" showSpinners onChange={onChange} />)
      
      const input = screen.getByRole('textbox')
      const incrementBtn = screen.getByLabelText('Increment')
      
      input.focus()
      await user.keyboard('{ArrowUp}')
      await user.click(incrementBtn)
      
      expect(onChange).toHaveBeenCalledTimes(2)
      expect(onChange).toHaveBeenNthCalledWith(1, '11')
      expect(onChange).toHaveBeenNthCalledWith(2, '12')
    })
  })

  describe('Keyboard Navigation', () => {
    it('should not increment when disabled', async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()
      render(<NumberInput variant="numeric" value="10" disabled onChange={onChange} />)
      
      const input = screen.getByRole('textbox')
      input.focus()
      await user.keyboard('{ArrowUp}')
      
      expect(onChange).not.toHaveBeenCalled()
    })

    it('should call original onKeyDown handler', async () => {
      const user = userEvent.setup()
      const onKeyDown = vi.fn()
      render(<NumberInput variant="numeric" value="10" onKeyDown={onKeyDown} />)
      
      const input = screen.getByRole('textbox')
      input.focus()
      await user.keyboard('{ArrowUp}')
      
      expect(onKeyDown).toHaveBeenCalled()
    })

    it('should prevent default on ArrowUp', async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()
      render(<NumberInput variant="numeric" value="10" onChange={onChange} />)
      
      const input = screen.getByRole('textbox')
      input.focus()
      await user.keyboard('{ArrowUp}')
      
      expect(onChange).toHaveBeenCalledWith('11')
    })

    it('should handle multiple arrow key presses', async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()
      render(<NumberInput variant="numeric" value="5" onChange={onChange} />)
      
      const input = screen.getByRole('textbox')
      input.focus()
      await user.keyboard('{ArrowUp}{ArrowUp}{ArrowDown}')
      
      expect(onChange).toHaveBeenCalledTimes(3)
      expect(onChange).toHaveBeenNthCalledWith(1, '6')
      expect(onChange).toHaveBeenNthCalledWith(2, '7')
      expect(onChange).toHaveBeenNthCalledWith(3, '6')
    })
  })

  describe('Accessibility', () => {
    it('should have correct inputMode for numeric variant', () => {
      render(<NumberInput variant="numeric" />)
      const input = screen.getByRole('textbox')
      expect(input).toHaveAttribute('inputMode', 'numeric')
    })

    it('should have correct inputMode for alphanumeric variant', () => {
      render(<NumberInput variant="alphanumeric" />)
      const input = screen.getByRole('textbox')
      expect(input).toHaveAttribute('inputMode', 'text')
    })

    it('should support aria-invalid attribute', () => {
      render(<NumberInput aria-invalid="true" />)
      const input = screen.getByRole('textbox')
      expect(input).toHaveAttribute('aria-invalid', 'true')
    })

    it('should support data-slot attribute', () => {
      render(<NumberInput />)
      const input = screen.getByRole('textbox')
      expect(input).toHaveAttribute('data-slot', 'number-input')
    })

    it('should have accessible spinner button labels', () => {
      render(<NumberInput showSpinners />)
      
      const incrementBtn = screen.getByLabelText('Increment')
      const decrementBtn = screen.getByLabelText('Decrement')
      
      expect(incrementBtn).toHaveAttribute('aria-label', 'Increment')
      expect(decrementBtn).toHaveAttribute('aria-label', 'Decrement')
    })

    it('should mark spinner buttons as type button', () => {
      render(<NumberInput showSpinners />)
      
      const incrementBtn = screen.getByLabelText('Increment')
      const decrementBtn = screen.getByLabelText('Decrement')
      
      expect(incrementBtn).toHaveAttribute('type', 'button')
      expect(decrementBtn).toHaveAttribute('type', 'button')
    })
  })

  describe('Ref forwarding', () => {
    it('should forward ref correctly', () => {
      const ref = createRef<HTMLInputElement>()
      render(<NumberInput ref={ref} />)
      
      expect(ref.current).toBeInstanceOf(HTMLInputElement)
    })

    it('should allow focus via ref', () => {
      const ref = createRef<HTMLInputElement>()
      render(<NumberInput ref={ref} />)
      
      ref.current?.focus()
      expect(ref.current).toHaveFocus()
    })

    it('should forward ref correctly with spinners', () => {
      const ref = createRef<HTMLInputElement>()
      render(<NumberInput ref={ref} showSpinners />)
      
      expect(ref.current).toBeInstanceOf(HTMLInputElement)
    })
  })
})
