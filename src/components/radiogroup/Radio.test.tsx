// Radio.test.tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import {
  RadioGroup,
  RadioGroupItem,
  RadioGroupLabel,
  RadioGroupOption,
  RadioGroupDescription,
} from './Radio';

describe('RadioGroup', () => {
  describe('Basic Rendering', () => {
    it('should render radio group with options', () => {
      render(
        <RadioGroup defaultValue="option1">
          <RadioGroupOption>
            <RadioGroupItem value="option1" id="option1" />
            <RadioGroupLabel htmlFor="option1">Option 1</RadioGroupLabel>
          </RadioGroupOption>
          <RadioGroupOption>
            <RadioGroupItem value="option2" id="option2" />
            <RadioGroupLabel htmlFor="option2">Option 2</RadioGroupLabel>
          </RadioGroupOption>
        </RadioGroup>
      );

      const radioGroup = screen.getByRole('radiogroup');
      expect(radioGroup).toBeInTheDocument();
      
      const radios = screen.getAllByRole('radio');
      expect(radios).toHaveLength(2);
    });

    it('should render with descriptions', () => {
      render(
        <RadioGroup defaultValue="option1">
          <div>
            <RadioGroupOption>
              <RadioGroupItem value="option1" id="option1" />
              <RadioGroupLabel htmlFor="option1">Option 1</RadioGroupLabel>
            </RadioGroupOption>
            <RadioGroupDescription>This is option 1 description</RadioGroupDescription>
          </div>
        </RadioGroup>
      );

      expect(screen.getByText('This is option 1 description')).toBeInTheDocument();
    });

    it('should apply custom className', () => {
      render(
        <RadioGroup className="custom-class" defaultValue="option1">
          <RadioGroupOption>
            <RadioGroupItem value="option1" id="option1" />
            <RadioGroupLabel htmlFor="option1">Option 1</RadioGroupLabel>
          </RadioGroupOption>
        </RadioGroup>
      );

      const radioGroup = screen.getByRole('radiogroup');
      expect(radioGroup).toHaveClass('custom-class');
    });
  });

  describe('Orientation', () => {
    it('should render vertically by default', () => {
      render(
        <RadioGroup defaultValue="option1">
          <RadioGroupOption>
            <RadioGroupItem value="option1" id="option1" />
            <RadioGroupLabel htmlFor="option1">Option 1</RadioGroupLabel>
          </RadioGroupOption>
        </RadioGroup>
      );

      const radioGroup = screen.getByRole('radiogroup');
      expect(radioGroup).toHaveClass('flex-col');
    });

    it('should render horizontally when orientation is set', () => {
      render(
        <RadioGroup defaultValue="option1" orientation="horizontal">
          <RadioGroupOption>
            <RadioGroupItem value="option1" id="option1" />
            <RadioGroupLabel htmlFor="option1">Option 1</RadioGroupLabel>
          </RadioGroupOption>
        </RadioGroup>
      );

      const radioGroup = screen.getByRole('radiogroup');
      expect(radioGroup).toHaveClass('flex-row');
    });
  });

  describe('User Interactions', () => {
    it('should select radio on click', async () => {
      const user = userEvent.setup();
      
      render(
        <RadioGroup defaultValue="option1">
          <RadioGroupOption>
            <RadioGroupItem value="option1" id="option1" />
            <RadioGroupLabel htmlFor="option1">Option 1</RadioGroupLabel>
          </RadioGroupOption>
          <RadioGroupOption>
            <RadioGroupItem value="option2" id="option2" />
            <RadioGroupLabel htmlFor="option2">Option 2</RadioGroupLabel>
          </RadioGroupOption>
        </RadioGroup>
      );

      const radio1 = screen.getByRole('radio', { name: 'Option 1' });
      const radio2 = screen.getByRole('radio', { name: 'Option 2' });

      expect(radio1).toBeChecked();
      expect(radio2).not.toBeChecked();

      await user.click(radio2);

      expect(radio1).not.toBeChecked();
      expect(radio2).toBeChecked();
    });

    it('should select radio by clicking label', async () => {
      const user = userEvent.setup();
      
      render(
        <RadioGroup>
          <RadioGroupOption>
            <RadioGroupItem value="option1" id="option1" />
            <RadioGroupLabel htmlFor="option1">Option 1</RadioGroupLabel>
          </RadioGroupOption>
          <RadioGroupOption>
            <RadioGroupItem value="option2" id="option2" />
            <RadioGroupLabel htmlFor="option2">Option 2</RadioGroupLabel>
          </RadioGroupOption>
        </RadioGroup>
      );

      const label = screen.getByText('Option 2');
      await user.click(label);

      const radio2 = screen.getByRole('radio', { name: 'Option 2' });
      expect(radio2).toBeChecked();
    });

    it('should handle keyboard navigation with arrow keys', async () => {
      const user = userEvent.setup();
      
      render(
        <RadioGroup defaultValue="option1">
          <RadioGroupOption>
            <RadioGroupItem value="option1" id="option1" />
            <RadioGroupLabel htmlFor="option1">Option 1</RadioGroupLabel>
          </RadioGroupOption>
          <RadioGroupOption>
            <RadioGroupItem value="option2" id="option2" />
            <RadioGroupLabel htmlFor="option2">Option 2</RadioGroupLabel>
          </RadioGroupOption>
          <RadioGroupOption>
            <RadioGroupItem value="option3" id="option3" />
            <RadioGroupLabel htmlFor="option3">Option 3</RadioGroupLabel>
          </RadioGroupOption>
        </RadioGroup>
      );

      const radio1 = screen.getByRole('radio', { name: 'Option 1' });
      const radio2 = screen.getByRole('radio', { name: 'Option 2' });

      radio1.focus();
      expect(radio1).toHaveFocus();

      await user.keyboard('{ArrowDown}');
      expect(radio2).toBeChecked();
      expect(radio2).toHaveFocus();
    });
  });

  describe('Controlled Component', () => {
    it('should work as controlled component', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      const ControlledRadioGroup = () => {
        const [value, setValue] = useState('option1');

        return (
          <RadioGroup
            value={value}
            onValueChange={(val) => {
              setValue(val);
              handleChange(val);
            }}
          >
            <RadioGroupOption>
              <RadioGroupItem value="option1" id="option1" />
              <RadioGroupLabel htmlFor="option1">Option 1</RadioGroupLabel>
            </RadioGroupOption>
            <RadioGroupOption>
              <RadioGroupItem value="option2" id="option2" />
              <RadioGroupLabel htmlFor="option2">Option 2</RadioGroupLabel>
            </RadioGroupOption>
          </RadioGroup>
        );
      };

      render(<ControlledRadioGroup />);

      const radio2 = screen.getByRole('radio', { name: 'Option 2' });
      await user.click(radio2);

      expect(handleChange).toHaveBeenCalledWith('option2');
      expect(radio2).toBeChecked();
    });
  });

  describe('Disabled State', () => {
    it('should disable individual radio option', () => {
      render(
        <RadioGroup defaultValue="option1">
          <RadioGroupOption>
            <RadioGroupItem value="option1" id="option1" />
            <RadioGroupLabel htmlFor="option1">Option 1</RadioGroupLabel>
          </RadioGroupOption>
          <RadioGroupOption>
            <RadioGroupItem value="option2" id="option2" disabled />
            <RadioGroupLabel htmlFor="option2">Option 2</RadioGroupLabel>
          </RadioGroupOption>
        </RadioGroup>
      );

      const radio2 = screen.getByRole('radio', { name: 'Option 2' });
      expect(radio2).toBeDisabled();
    });

    it('should not allow clicking disabled radio', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      render(
        <RadioGroup defaultValue="option1" onValueChange={handleChange}>
          <RadioGroupOption>
            <RadioGroupItem value="option1" id="option1" />
            <RadioGroupLabel htmlFor="option1">Option 1</RadioGroupLabel>
          </RadioGroupOption>
          <RadioGroupOption>
            <RadioGroupItem value="option2" id="option2" disabled />
            <RadioGroupLabel htmlFor="option2">Option 2</RadioGroupLabel>
          </RadioGroupOption>
        </RadioGroup>
      );

      const radio2 = screen.getByRole('radio', { name: 'Option 2' });
      await user.click(radio2);

      expect(handleChange).not.toHaveBeenCalled();
      expect(radio2).not.toBeChecked();
    });

    it('should disable entire radio group', () => {
      render(
        <RadioGroup defaultValue="option1" disabled>
          <RadioGroupOption>
            <RadioGroupItem value="option1" id="option1" />
            <RadioGroupLabel htmlFor="option1">Option 1</RadioGroupLabel>
          </RadioGroupOption>
          <RadioGroupOption>
            <RadioGroupItem value="option2" id="option2" />
            <RadioGroupLabel htmlFor="option2">Option 2</RadioGroupLabel>
          </RadioGroupOption>
        </RadioGroup>
      );

      const radios = screen.getAllByRole('radio');
      radios.forEach((radio) => {
        expect(radio).toBeDisabled();
      });
    });
  });

  describe('Form Integration', () => {
    it('should submit correct value in form', async () => {
      const handleSubmit = vi.fn((e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        return formData.get('preference');
      });

      render(
        <form onSubmit={handleSubmit}>
          <RadioGroup name="preference" defaultValue="option1">
            <RadioGroupOption>
              <RadioGroupItem value="option1" id="option1" />
              <RadioGroupLabel htmlFor="option1">Option 1</RadioGroupLabel>
            </RadioGroupOption>
            <RadioGroupOption>
              <RadioGroupItem value="option2" id="option2" />
              <RadioGroupLabel htmlFor="option2">Option 2</RadioGroupLabel>
            </RadioGroupOption>
          </RadioGroup>
          <button type="submit">Submit</button>
        </form>
      );

      const submitButton = screen.getByRole('button', { name: 'Submit' });
      fireEvent.click(submitButton);

      expect(handleSubmit).toHaveBeenCalled();
    });

    it('should update form value when selection changes', async () => {
      const user = userEvent.setup();
      let formValue = '';

      const handleSubmit = vi.fn((e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        formValue = formData.get('preference') as string;
      });

      render(
        <form onSubmit={handleSubmit}>
          <RadioGroup name="preference" defaultValue="option1">
            <RadioGroupOption>
              <RadioGroupItem value="option1" id="option1" />
              <RadioGroupLabel htmlFor="option1">Option 1</RadioGroupLabel>
            </RadioGroupOption>
            <RadioGroupOption>
              <RadioGroupItem value="option2" id="option2" />
              <RadioGroupLabel htmlFor="option2">Option 2</RadioGroupLabel>
            </RadioGroupOption>
          </RadioGroup>
          <button type="submit">Submit</button>
        </form>
      );

      const radio2 = screen.getByRole('radio', { name: 'Option 2' });
      await user.click(radio2);

      const submitButton = screen.getByRole('button', { name: 'Submit' });
      fireEvent.click(submitButton);

      expect(formValue).toBe('option2');
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA attributes', () => {
      render(
        <RadioGroup defaultValue="option1">
          <RadioGroupOption>
            <RadioGroupItem value="option1" id="option1" />
            <RadioGroupLabel htmlFor="option1">Option 1</RadioGroupLabel>
          </RadioGroupOption>
        </RadioGroup>
      );

      const radioGroup = screen.getByRole('radiogroup');
      expect(radioGroup).toBeInTheDocument();

      const radio = screen.getByRole('radio');
      expect(radio).toHaveAttribute('type', 'radio');
    });

    it('should associate label with radio input', () => {
      render(
        <RadioGroup defaultValue="option1">
          <RadioGroupOption>
            <RadioGroupItem value="option1" id="option1" />
            <RadioGroupLabel htmlFor="option1">Option 1</RadioGroupLabel>
          </RadioGroupOption>
        </RadioGroup>
      );

      const radio = screen.getByRole('radio', { name: 'Option 1' });
      expect(radio).toBeInTheDocument();
    });

    it('should have proper focus management', async () => {
      const user = userEvent.setup();
      
      render(
        <RadioGroup defaultValue="option1">
          <RadioGroupOption>
            <RadioGroupItem value="option1" id="option1" />
            <RadioGroupLabel htmlFor="option1">Option 1</RadioGroupLabel>
          </RadioGroupOption>
          <RadioGroupOption>
            <RadioGroupItem value="option2" id="option2" />
            <RadioGroupLabel htmlFor="option2">Option 2</RadioGroupLabel>
          </RadioGroupOption>
        </RadioGroup>
      );

      const radio1 = screen.getByRole('radio', { name: 'Option 1' });
      await user.tab();

      expect(radio1).toHaveFocus();
    });
  });

  describe('Edge Cases', () => {
    it('should handle no default value', () => {
      render(
        <RadioGroup>
          <RadioGroupOption>
            <RadioGroupItem value="option1" id="option1" />
            <RadioGroupLabel htmlFor="option1">Option 1</RadioGroupLabel>
          </RadioGroupOption>
        </RadioGroup>
      );

      const radio = screen.getByRole('radio');
      expect(radio).not.toBeChecked();
    });

    it('should handle single radio option', () => {
      render(
        <RadioGroup defaultValue="only">
          <RadioGroupOption>
            <RadioGroupItem value="only" id="only" />
            <RadioGroupLabel htmlFor="only">Only Option</RadioGroupLabel>
          </RadioGroupOption>
        </RadioGroup>
      );

      const radio = screen.getByRole('radio');
      expect(radio).toBeChecked();
    });

    it('should maintain selection after re-render', () => {
      const { rerender } = render(
        <RadioGroup defaultValue="option1">
          <RadioGroupOption>
            <RadioGroupItem value="option1" id="option1" />
            <RadioGroupLabel htmlFor="option1">Option 1</RadioGroupLabel>
          </RadioGroupOption>
          <RadioGroupOption>
            <RadioGroupItem value="option2" id="option2" />
            <RadioGroupLabel htmlFor="option2">Option 2</RadioGroupLabel>
          </RadioGroupOption>
        </RadioGroup>
      );

      const radio1 = screen.getByRole('radio', { name: 'Option 1' });
      expect(radio1).toBeChecked();

      rerender(
        <RadioGroup defaultValue="option1">
          <RadioGroupOption>
            <RadioGroupItem value="option1" id="option1" />
            <RadioGroupLabel htmlFor="option1">Option 1</RadioGroupLabel>
          </RadioGroupOption>
          <RadioGroupOption>
            <RadioGroupItem value="option2" id="option2" />
            <RadioGroupLabel htmlFor="option2">Option 2</RadioGroupLabel>
          </RadioGroupOption>
        </RadioGroup>
      );

      expect(radio1).toBeChecked();
    });
  });
});
