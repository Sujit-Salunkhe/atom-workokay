import type { Meta, StoryObj } from "@storybook/react"
import { Badge } from "./badge"
    import { CheckCircle, AlertTriangle, XCircle, Inbox, Archive } from "lucide-react"

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
    priority: {
      control: "select",
      options: ["high", "medium", "low", undefined],
    },
    status: {
      control: "select",
      options: ["validated", "incoming", "quarantined", "failed", undefined],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    withIcon: {
      control: "boolean",
    },
    fullWidth: {
      control: "boolean",
    },
    children: {
      control: "text",
    },
  },
  args: {
    children: "Badge",
    size: "md",
    withIcon: false,
  },
}

export default meta
type Story = StoryObj<typeof Badge>

/* ---------------------------------------------------
 * DEFAULT CONTROLS STORY
 * --------------------------------------------------- */
export const Playground: Story = {
  render: (args) => <Badge {...args} />,
}

/* ---------------------------------------------------
 * PRIORITY BADGES
 * --------------------------------------------------- */
export const High: Story = {
  args: {
    children: "High",
    priority: "high",
  },
}

export const Medium: Story = {
  args: {
    children: "Medium",
    priority: "medium",
  },
}

export const Low: Story = {
  args: {
    children: "Low",
    priority: "low",
  },
}

/* ---------------------------------------------------
 * STATUS BADGES
 * --------------------------------------------------- */
export const Validated: Story = {
  args: {
    children: "Validated",
    status: "validated",
  },
}

export const Incoming: Story = {
  args: {
    children: "Incoming",
    status: "incoming",
  },
}

export const Quarantined: Story = {
  args: {
    children: "Quarantined",
    status: "quarantined",
  },
}

export const Failed: Story = {
  args: {
    children: "Failed",
    status: "failed",
  },
}

export const Archieved:Story ={
    args:{
        children:"Archieved",
        status:"archieved",
    }
}

/* ---------------------------------------------------
 * BADGES WITH ICONS
 * --------------------------------------------------- */
export const WithIconSuccess: Story = {
  args: {
    children: (
      <>
        <CheckCircle /> Validated
      </>
    ),
    status: "validated",
    withIcon: true,
  },
}

export const WithIconWarning: Story = {
  args: {
    children: (
      <>
        <AlertTriangle /> High
      </>
    ),
    priority: "high",
    withIcon: true,
  },
}

export const WithIconIncoming: Story = {
  args: {
    children: (
      <>
        <Inbox /> Incoming
      </>
    ),
    status: "incoming",
    withIcon: true,
  },
}

export const WithIconFailed: Story = {
  args: {
    children: (
      <>
        <XCircle /> Failed
      </>
    ),
    status: "failed",
    withIcon: true,
  },
}

export const WithIconArchieved:Story ={
    args: {
        children:(
            <>
               <Archive/> Archived
            </>
        ),
        status:"archieved",
        withIcon:true
    }
}

/* ---------------------------------------------------
 * SIZES
 * --------------------------------------------------- */
export const Small: Story = {
  args: {
    children: "Small",
    size: "sm",
    priority: "medium",
  },
}

export const MediumSize: Story = {
  args: {
    children: "Medium",
    size: "md",
    priority: "medium",
  },
}

export const Large: Story = {
  args: {
    children: "Large",
    size: "lg",
    priority: "medium",
  },
}
