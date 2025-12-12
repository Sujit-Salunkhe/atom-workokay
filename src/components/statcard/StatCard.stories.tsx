import type { Meta, StoryObj } from '@storybook/react';
import InfoCard  from './InfoCard';

const meta: Meta = {
  title: 'Components/InfoCard',
  component: InfoCard,
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'success'],
    },
    order: {
      control: 'select',
      options: ['col', 'colR', 'row', 'rowR'],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
    },
    label: {
      control: 'text',
    },
    info: {
      control: 'text',
    },
  },
  args: {
    variant: 'primary',
    order: 'col',
    size: 'sm',
    label: 'Total Jobs',
    info: '32',
  },
};

export default meta;

type Story = StoryObj;


// ---------------------------
// Default Card
// ---------------------------
export const Default: Story = {
  args: {
    variant: 'primary',
    order: 'col',
    size: 'sm',
  },
};


// ---------------------------
// Variants
// ---------------------------
export const Primary: Story = {
  args: {
    variant: 'primary',
    label: 'Primary Status',
    size:'sm',
    info: 24,
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    label: 'Secondary Status',
    size:'sm',
    info: 12,
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    label: 'Success Status',
    size:'sm',
    info: 8,
  },
};


// ---------------------------
// Orders
// ---------------------------
export const Row: Story = {
  args: {
    order: 'row',
    label: 'Jobs',
    size:'sm',
    info: '45',
  },
};

export const RowReverse: Story = {
  args: {
    order: 'rowR',
    label: 'Jobs',
    size:'sm',
    info: '45',
  },
};

export const Column: Story = {
  args: {
    order: 'col',
    label: 'Jobs',
    size:'sm',
    info: '45',
  },
};

export const ColumnReverse: Story = {
  args: {
    order: 'colR',
    label: 'Jobs',
    size:'sm',
    info: '45',
  },
};


// ---------------------------
// Sizes
// ---------------------------
export const XS: Story = {
  args: {
    size: 'xs',
    label: 'Extra Small',
    info: '10',
  },
};

export const SM: Story = {
  args: {
    size: 'sm',
    label: 'Small',
    info: '20',
  },
};

export const MD: Story = {
  args: {
    size: 'md',
    label: 'Medium',
    info: '30',
  },
};

export const LG: Story = {
  args: {
    size: 'lg',
    label: 'Large',
    info: '40',
  },
};
