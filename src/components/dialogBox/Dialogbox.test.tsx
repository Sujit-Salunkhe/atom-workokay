// Dialog.test.tsx
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogBody,
} from './Dialogbox';

// Mock setup for app-root container
beforeEach(() => {
  // Create app-root container for portal testing
  const appRoot = document.createElement('div');
  appRoot.id = 'app-root';
  document.body.appendChild(appRoot);
});

afterEach(() => {
  // Cleanup
  const appRoot = document.getElementById('app-root');
  if (appRoot) {
    document.body.removeChild(appRoot);
  }
});

describe('Dialog Component', () => {
  describe('Dialog Root and Trigger', () => {
    it('should render trigger button', () => {
      render(
        <Dialog>
          <DialogTrigger>Open Dialog</DialogTrigger>
          <DialogContent>
            <DialogTitle>Test Dialog</DialogTitle>
          </DialogContent>
        </Dialog>
      );

      expect(screen.getByRole('button', { name: /open dialog/i })).toBeInTheDocument();
    });

    it('should not render dialog content initially when closed', () => {
      render(
        <Dialog>
          <DialogTrigger>Open Dialog</DialogTrigger>
          <DialogContent>
            <DialogTitle>Test Dialog</DialogTitle>
          </DialogContent>
        </Dialog>
      );

      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('should open dialog when trigger is clicked', async () => {
      const user = userEvent.setup();

      render(
        <Dialog>
          <DialogTrigger>Open Dialog</DialogTrigger>
          <DialogContent>
            <DialogTitle>Test Dialog</DialogTitle>
          </DialogContent>
        </Dialog>
      );

      const trigger = screen.getByRole('button', { name: /open dialog/i });
      await user.click(trigger);

      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      });
    });

    it('should have correct ARIA attributes on trigger', () => {
      render(
        <Dialog>
          <DialogTrigger>Open Dialog</DialogTrigger>
          <DialogContent>
            <DialogTitle>Test Dialog</DialogTitle>
          </DialogContent>
        </Dialog>
      );

      const trigger = screen.getByRole('button', { name: /open dialog/i });
      expect(trigger).toHaveAttribute('aria-haspopup', 'dialog');
    });
  });

  describe('DialogContent', () => {
    it('should render dialog content when open', async () => {
      const user = userEvent.setup();

      render(
        <Dialog>
          <DialogTrigger>Open</DialogTrigger>
          <DialogContent>
            <DialogTitle>Dialog Title</DialogTitle>
            <DialogDescription>Dialog Description</DialogDescription>
          </DialogContent>
        </Dialog>
      );

      await user.click(screen.getByRole('button', { name: /open/i }));

      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
        expect(screen.getByText('Dialog Title')).toBeInTheDocument();
        expect(screen.getByText('Dialog Description')).toBeInTheDocument();
      });
    });

    it('should render close button by default', async () => {
      const user = userEvent.setup();

      render(
        <Dialog>
          <DialogTrigger>Open</DialogTrigger>
          <DialogContent>
            <DialogTitle>Test</DialogTitle>
          </DialogContent>
        </Dialog>
      );

      await user.click(screen.getByRole('button', { name: /open/i }));

      await waitFor(() => {
        expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
      });
    });

    it('should hide close button when showClose is false', async () => {
      const user = userEvent.setup();

      render(
        <Dialog>
          <DialogTrigger>Open</DialogTrigger>
          <DialogContent showClose={false}>
            <DialogTitle>Test</DialogTitle>
          </DialogContent>
        </Dialog>
      );

      await user.click(screen.getByRole('button', { name: /open/i }));

      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      });

      expect(screen.queryByRole('button', { name: /close/i })).not.toBeInTheDocument();
    });

    it('should close dialog when close button is clicked', async () => {
      const user = userEvent.setup();

      render(
        <Dialog>
          <DialogTrigger>Open</DialogTrigger>
          <DialogContent>
            <DialogTitle>Test Dialog</DialogTitle>
          </DialogContent>
        </Dialog>
      );

      // Open dialog
      await user.click(screen.getByRole('button', { name: /open/i }));
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      });

      // Close dialog
      const closeButton = screen.getByRole('button', { name: /close/i });
      await user.click(closeButton);

      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      });
    });

    it('should apply custom className', async () => {
      const user = userEvent.setup();

      render(
        <Dialog>
          <DialogTrigger>Open</DialogTrigger>
          <DialogContent className="custom-dialog-class">
            <DialogTitle>Test</DialogTitle>
          </DialogContent>
        </Dialog>
      );

      await user.click(screen.getByRole('button', { name: /open/i }));

      await waitFor(() => {
        const dialog = screen.getByRole('dialog');
        expect(dialog).toHaveClass('custom-dialog-class');
      });
    });
  });

  describe('DialogOverlay', () => {
    it('should render overlay when dialog is open', async () => {
      const user = userEvent.setup();

      render(
        <Dialog>
          <DialogTrigger>Open</DialogTrigger>
          <DialogContent>
            <DialogTitle>Test</DialogTitle>
          </DialogContent>
        </Dialog>
      );

      await user.click(screen.getByRole('button', { name: /open/i }));

      await waitFor(() => {
        // Overlay is rendered but doesn't have a specific role
        const dialog = screen.getByRole('dialog');
        const overlay = dialog.parentElement?.previousElementSibling;
        expect(overlay).toBeInTheDocument();
      });
    });

    it('should close dialog when overlay is clicked', async () => {
      const user = userEvent.setup();

      render(
        <Dialog>
          <DialogTrigger>Open</DialogTrigger>
          <DialogContent>
            <DialogTitle>Test Dialog</DialogTitle>
          </DialogContent>
        </Dialog>
      );

      // Open dialog
      await user.click(screen.getByRole('button', { name: /open/i }));
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      });

      // Click overlay (clicking outside the dialog content)
      const dialog = screen.getByRole('dialog');
      const overlay = dialog.parentElement?.previousElementSibling as HTMLElement;
      if (overlay) {
        await user.click(overlay);
      }

      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      });
    });
  });

  describe('DialogTitle', () => {
    it('should render dialog title', async () => {
      const user = userEvent.setup();

      render(
        <Dialog>
          <DialogTrigger>Open</DialogTrigger>
          <DialogContent>
            <DialogTitle>My Dialog Title</DialogTitle>
          </DialogContent>
        </Dialog>
      );

      await user.click(screen.getByRole('button', { name: /open/i }));

      await waitFor(() => {
        expect(screen.getByText('My Dialog Title')).toBeInTheDocument();
      });
    });

    it('should have correct accessible name relationship', async () => {
      const user = userEvent.setup();

      render(
        <Dialog>
          <DialogTrigger>Open</DialogTrigger>
          <DialogContent>
            <DialogTitle>Accessible Title</DialogTitle>
          </DialogContent>
        </Dialog>
      );

      await user.click(screen.getByRole('button', { name: /open/i }));

      await waitFor(() => {
        const dialog = screen.getByRole('dialog');
        expect(dialog).toHaveAccessibleName('Accessible Title');
      });
    });

    it('should apply custom className to title', async () => {
      const user = userEvent.setup();

      render(
        <Dialog>
          <DialogTrigger>Open</DialogTrigger>
          <DialogContent>
            <DialogTitle className="custom-title-class">Title</DialogTitle>
          </DialogContent>
        </Dialog>
      );

      await user.click(screen.getByRole('button', { name: /open/i }));

      await waitFor(() => {
        const title = screen.getByText('Title');
        expect(title).toHaveClass('custom-title-class');
      });
    });
  });

  describe('DialogDescription', () => {
    it('should render dialog description', async () => {
      const user = userEvent.setup();

      render(
        <Dialog>
          <DialogTrigger>Open</DialogTrigger>
          <DialogContent>
            <DialogTitle>Title</DialogTitle>
            <DialogDescription>This is a description</DialogDescription>
          </DialogContent>
        </Dialog>
      );

      await user.click(screen.getByRole('button', { name: /open/i }));

      await waitFor(() => {
        expect(screen.getByText('This is a description')).toBeInTheDocument();
      });
    });

    it('should have correct accessible description relationship', async () => {
      const user = userEvent.setup();

      render(
        <Dialog>
          <DialogTrigger>Open</DialogTrigger>
          <DialogContent>
            <DialogTitle>Title</DialogTitle>
            <DialogDescription>Dialog description text</DialogDescription>
          </DialogContent>
        </Dialog>
      );

      await user.click(screen.getByRole('button', { name: /open/i }));

      await waitFor(() => {
        const dialog = screen.getByRole('dialog');
        expect(dialog).toHaveAccessibleDescription('Dialog description text');
      });
    });
  });

  describe('DialogHeader', () => {
    it('should render header with title and description', async () => {
      const user = userEvent.setup();

      render(
        <Dialog>
          <DialogTrigger>Open</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Header Title</DialogTitle>
              <DialogDescription>Header Description</DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      );

      await user.click(screen.getByRole('button', { name: /open/i }));

      await waitFor(() => {
        expect(screen.getByText('Header Title')).toBeInTheDocument();
        expect(screen.getByText('Header Description')).toBeInTheDocument();
      });
    });

    it('should apply custom className to header', async () => {
      const user = userEvent.setup();

      render(
        <Dialog>
          <DialogTrigger>Open</DialogTrigger>
          <DialogContent>
            <DialogHeader className="custom-header" data-testid="dialog-header">
              <DialogTitle>Title</DialogTitle>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      );

      await user.click(screen.getByRole('button', { name: /open/i }));

      await waitFor(() => {
        const header = screen.getByTestId('dialog-header');
        expect(header).toHaveClass('custom-header');
      });
    });
  });

  describe('DialogBody', () => {
    it('should render body content', async () => {
      const user = userEvent.setup();

      render(
        <Dialog>
          <DialogTrigger>Open</DialogTrigger>
          <DialogContent>
            <DialogTitle>Title</DialogTitle>
            <DialogBody>Body content goes here</DialogBody>
          </DialogContent>
        </Dialog>
      );

      await user.click(screen.getByRole('button', { name: /open/i }));

      await waitFor(() => {
        expect(screen.getByText('Body content goes here')).toBeInTheDocument();
      });
    });

    it('should apply custom className to body', async () => {
      const user = userEvent.setup();

      render(
        <Dialog>
          <DialogTrigger>Open</DialogTrigger>
          <DialogContent>
            <DialogTitle>Title</DialogTitle>
            <DialogBody className="custom-body" data-testid="dialog-body">
              Content
            </DialogBody>
          </DialogContent>
        </Dialog>
      );

      await user.click(screen.getByRole('button', { name: /open/i }));

      await waitFor(() => {
        const body = screen.getByTestId('dialog-body');
        expect(body).toHaveClass('custom-body');
      });
    });
  });

  describe('DialogFooter', () => {
    it('should render footer with action buttons', async () => {
      const user = userEvent.setup();

      render(
        <Dialog>
          <DialogTrigger>Open</DialogTrigger>
          <DialogContent>
            <DialogTitle>Title</DialogTitle>
            <DialogFooter>
              <button>Cancel</button>
              <button>Confirm</button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      );

      await user.click(screen.getByRole('button', { name: /open/i }));

      await waitFor(() => {
        expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /confirm/i })).toBeInTheDocument();
      });
    });

    it('should apply custom className to footer', async () => {
      const user = userEvent.setup();

      render(
        <Dialog>
          <DialogTrigger>Open</DialogTrigger>
          <DialogContent>
            <DialogTitle>Title</DialogTitle>
            <DialogFooter className="custom-footer" data-testid="dialog-footer">
              <button>Action</button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      );

      await user.click(screen.getByRole('button', { name: /open/i }));

      await waitFor(() => {
        const footer = screen.getByTestId('dialog-footer');
        expect(footer).toHaveClass('custom-footer');
      });
    });
  });

  describe('Keyboard Navigation', () => {
    it('should close dialog when Escape key is pressed', async () => {
      const user = userEvent.setup();

      render(
        <Dialog>
          <DialogTrigger>Open</DialogTrigger>
          <DialogContent>
            <DialogTitle>Test Dialog</DialogTitle>
          </DialogContent>
        </Dialog>
      );

      // Open dialog
      await user.click(screen.getByRole('button', { name: /open/i }));
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      });

      // Press Escape
      await user.keyboard('{Escape}');

      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      });
    });

    it('should trap focus within dialog when open', async () => {
      const user = userEvent.setup();

      render(
        <Dialog>
          <DialogTrigger>Open</DialogTrigger>
          <DialogContent>
            <DialogTitle>Test Dialog</DialogTitle>
            <DialogBody>
              <input type="text" placeholder="First input" />
              <input type="text" placeholder="Second input" />
            </DialogBody>
            <DialogFooter>
              <button>Action</button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      );

      await user.click(screen.getByRole('button', { name: /open/i }));

      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      });

      // Tab through elements
      await user.tab();
      expect(screen.getByPlaceholderText('First input')).toHaveFocus();

      await user.tab();
      expect(screen.getByPlaceholderText('Second input')).toHaveFocus();

      await user.tab();
      expect(screen.getByRole('button', { name: /action/i })).toHaveFocus();
    });
  });

  describe('Controlled Dialog', () => {
    it('should work as controlled component', async () => {
      const user = userEvent.setup();
      const onOpenChange = vi.fn();

      const ControlledDialog = () => {
        const [open, setOpen] = React.useState(false);

        return (
          <Dialog
            open={open}
            onOpenChange={(isOpen:any) => {
              setOpen(isOpen);
              onOpenChange(isOpen);
            }}
          >
            <DialogTrigger>Open</DialogTrigger>
            <DialogContent>
              <DialogTitle>Controlled Dialog</DialogTitle>
            </DialogContent>
          </Dialog>
        );
      };

      render(<ControlledDialog />);

      // Initially closed
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

      // Open dialog
      await user.click(screen.getByRole('button', { name: /open/i }));

      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
        expect(onOpenChange).toHaveBeenCalledWith(true);
      });

      // Close dialog
      await user.click(screen.getByRole('button', { name: /close/i }));

      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
        expect(onOpenChange).toHaveBeenCalledWith(false);
      });
    });
  });

  describe('DialogPortal', () => {
    it('should render content in app-root container', async () => {
      const user = userEvent.setup();
      const appRoot = document.getElementById('app-root');

      render(
        <Dialog>
          <DialogTrigger>Open</DialogTrigger>
          <DialogContent>
            <DialogTitle>Portaled Dialog</DialogTitle>
          </DialogContent>
        </Dialog>
      );

      await user.click(screen.getByRole('button', { name: /open/i }));

      await waitFor(() => {
        const dialog = screen.getByRole('dialog');
        expect(appRoot?.contains(dialog)).toBe(true);
      });
    });

    it('should fallback to document.body if app-root not found', async () => {
      const user = userEvent.setup();
      const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      
      // Remove app-root temporarily
      const appRoot = document.getElementById('app-root');
      if (appRoot) {
        document.body.removeChild(appRoot);
      }

      render(
        <Dialog>
          <DialogTrigger>Open</DialogTrigger>
          <DialogContent>
            <DialogTitle>Fallback Dialog</DialogTitle>
          </DialogContent>
        </Dialog>
      );

      await user.click(screen.getByRole('button', { name: /open/i }));

      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
        expect(consoleWarnSpy).toHaveBeenCalledWith(
          'atom-theme container not found, using document.body'
        );
      });

      consoleWarnSpy.mockRestore();
      
      // Restore app-root for other tests
      const newAppRoot = document.createElement('div');
      newAppRoot.id = 'app-root';
      document.body.appendChild(newAppRoot);
    });
  });

  describe('Complete Dialog Example', () => {
    it('should render complete dialog with all components', async () => {
      const user = userEvent.setup();
      const handleConfirm = vi.fn();
      const handleCancel = vi.fn();

      render(
        <Dialog>
          <DialogTrigger>Delete Account</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your account.
              </DialogDescription>
            </DialogHeader>
            <DialogBody>
              <p>Type DELETE to confirm</p>
              <input type="text" placeholder="Type here..." />
            </DialogBody>
            <DialogFooter>
              <button onClick={handleCancel}>Cancel</button>
              <button onClick={handleConfirm}>Confirm</button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      );

      // Open dialog
      await user.click(screen.getByRole('button', { name: /delete account/i }));

      await waitFor(() => {
        const dialog = screen.getByRole('dialog');
        expect(dialog).toBeInTheDocument();
        expect(dialog).toHaveAccessibleName('Are you absolutely sure?');
        expect(dialog).toHaveAccessibleDescription(
          'This action cannot be undone. This will permanently delete your account.'
        );
      });

      // Check all content
      expect(screen.getByText('Type DELETE to confirm')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Type here...')).toBeInTheDocument();

      // Click confirm
      await user.click(screen.getByRole('button', { name: /confirm/i }));
      expect(handleConfirm).toHaveBeenCalledTimes(1);
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA attributes', async () => {
      const user = userEvent.setup();

      render(
        <Dialog>
          <DialogTrigger>Open</DialogTrigger>
          <DialogContent>
            <DialogTitle>Accessible Dialog</DialogTitle>
            <DialogDescription>This dialog is accessible</DialogDescription>
          </DialogContent>
        </Dialog>
      );

      await user.click(screen.getByRole('button', { name: /open/i }));

      await waitFor(() => {
        const dialog = screen.getByRole('dialog');
        expect(dialog).toHaveAttribute('role', 'dialog');
        expect(dialog).toHaveAttribute('aria-describedby');
        expect(dialog).toHaveAttribute('aria-labelledby');
      });
    });

    it('should announce dialog opening to screen readers', async () => {
      const user = userEvent.setup();

      render(
        <Dialog>
          <DialogTrigger>Open</DialogTrigger>
          <DialogContent>
            <DialogTitle>Announcement Test</DialogTitle>
          </DialogContent>
        </Dialog>
      );

      await user.click(screen.getByRole('button', { name: /open/i }));

      await waitFor(() => {
        const dialog = screen.getByRole('dialog');
        // Dialog should be in the document and properly announced
        expect(dialog).toBeInTheDocument();
      });
    });
  });
});
