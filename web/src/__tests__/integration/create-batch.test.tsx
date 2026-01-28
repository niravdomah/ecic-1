/**
 * Integration Test: Create New Report Batch (Story 4)
 *
 * Tests for the Create New Batch dialog functionality,
 * including batch type selection, date validation, and API integration.
 */

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import CreateBatchDialog from '@/components/batches/CreateBatchDialog';
import * as apiClient from '@/lib/api/client';

// Mock API client
vi.mock('@/lib/api/client', () => ({
  get: vi.fn(),
  post: vi.fn(),
  put: vi.fn(),
  del: vi.fn(),
}));

const mockPost = apiClient.post as ReturnType<typeof vi.fn>;

describe('Create New Report Batch (Story 4)', () => {
  const mockOnSuccess = vi.fn();
  const mockOnCancel = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Dialog opening and structure', () => {
    it('should display dialog with report type and date selection options', () => {
      // Act
      render(<CreateBatchDialog open={true} onSuccess={mockOnSuccess} onCancel={mockOnCancel} />);

      // Assert
      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(screen.getByText(/create new batch/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/report type/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/report date/i)).toBeInTheDocument();
    });

    it('should have Monthly and Weekly options for report type', () => {
      // Act
      render(<CreateBatchDialog open={true} onSuccess={mockOnSuccess} onCancel={mockOnCancel} />);

      // Assert
      const reportTypeSelect = screen.getByLabelText(/report type/i);
      expect(reportTypeSelect).toBeInTheDocument();

      // Open dropdown to verify options exist
      expect(screen.getByText(/monthly/i)).toBeInTheDocument();
      expect(screen.getByText(/weekly/i)).toBeInTheDocument();
    });
  });

  describe('Create Monthly Batch - Happy Path', () => {
    it('should allow selecting Monthly report type and month-end date', async () => {
      // Arrange
      const user = userEvent.setup();
      render(<CreateBatchDialog open={true} onSuccess={mockOnSuccess} onCancel={mockOnCancel} />);

      // Act - Select Monthly
      const reportTypeSelect = screen.getByLabelText(/report type/i);
      await user.click(reportTypeSelect);
      await user.click(screen.getByRole('option', { name: /monthly/i }));

      // Act - Select date (month-end)
      const dateInput = screen.getByLabelText(/report date/i);
      await user.click(dateInput);
      // Date picker should only allow month-end dates
      await user.click(screen.getByText('31')); // Select March 31

      // Assert
      expect(reportTypeSelect).toHaveValue('Monthly');
    });

    it('should create monthly batch successfully when form is submitted', async () => {
      // Arrange
      const user = userEvent.setup();
      mockPost.mockResolvedValue({
        Id: 1,
        MessageType: 'SUCCESS',
        Messages: ['Monthly process started successfully.'],
      });

      render(<CreateBatchDialog open={true} onSuccess={mockOnSuccess} onCancel={mockOnCancel} />);

      // Act - Fill form
      await user.click(screen.getByLabelText(/report type/i));
      await user.click(screen.getByRole('option', { name: /monthly/i }));

      const dateInput = screen.getByLabelText(/report date/i);
      await user.type(dateInput, '2024-03-31');

      // Act - Submit
      const createButton = screen.getByRole('button', { name: /create batch/i });
      await user.click(createButton);

      // Assert
      await waitFor(() => {
        expect(mockPost).toHaveBeenCalledWith(
          '/monthly-runs/2024-03-31',
          expect.any(Object)
        );
      });

      await waitFor(() => {
        expect(screen.getByText(/monthly process started successfully/i)).toBeInTheDocument();
      });
    });

    it('should call onSuccess callback after successful batch creation', async () => {
      // Arrange
      const user = userEvent.setup();
      mockPost.mockResolvedValue({
        Id: 1,
        MessageType: 'SUCCESS',
        Messages: ['Monthly process started successfully.'],
      });

      render(<CreateBatchDialog open={true} onSuccess={mockOnSuccess} onCancel={mockOnCancel} />);

      // Act - Fill and submit form
      await user.click(screen.getByLabelText(/report type/i));
      await user.click(screen.getByRole('option', { name: /monthly/i }));

      const dateInput = screen.getByLabelText(/report date/i);
      await user.type(dateInput, '2024-03-31');

      await user.click(screen.getByRole('button', { name: /create batch/i }));

      // Assert
      await waitFor(() => {
        expect(mockOnSuccess).toHaveBeenCalled();
      });
    });

    it('should close dialog automatically after successful creation', async () => {
      // Arrange
      const user = userEvent.setup();
      mockPost.mockResolvedValue({
        Id: 1,
        MessageType: 'SUCCESS',
        Messages: ['Monthly process started successfully.'],
      });

      const { rerender } = render(
        <CreateBatchDialog open={true} onSuccess={mockOnSuccess} onCancel={mockOnCancel} />
      );

      // Act
      await user.click(screen.getByLabelText(/report type/i));
      await user.click(screen.getByRole('option', { name: /monthly/i }));

      const dateInput = screen.getByLabelText(/report date/i);
      await user.type(dateInput, '2024-03-31');

      await user.click(screen.getByRole('button', { name: /create batch/i }));

      // Assert - Dialog should close after 2 seconds
      await waitFor(() => {
        expect(mockOnSuccess).toHaveBeenCalled();
      }, { timeout: 3000 });
    });
  });

  describe('Create Weekly Batch - Happy Path', () => {
    it('should allow selecting any date for Weekly batch', async () => {
      // Arrange
      const user = userEvent.setup();
      render(<CreateBatchDialog open={true} onSuccess={mockOnSuccess} onCancel={mockOnCancel} />);

      // Act - Select Weekly
      await user.click(screen.getByLabelText(/report type/i));
      await user.click(screen.getByRole('option', { name: /weekly/i }));

      // Act - Select any date (not restricted to month-end)
      const dateInput = screen.getByLabelText(/report date/i);
      await user.type(dateInput, '2024-03-15');

      // Assert - Date should be accepted
      expect(dateInput).toHaveValue('2024-03-15');
    });
  });

  describe('Validation', () => {
    it('should show validation error when trying to create batch without date', async () => {
      // Arrange
      const user = userEvent.setup();
      render(<CreateBatchDialog open={true} onSuccess={mockOnSuccess} onCancel={mockOnCancel} />);

      // Act - Select type but no date
      await user.click(screen.getByLabelText(/report type/i));
      await user.click(screen.getByRole('option', { name: /monthly/i }));

      await user.click(screen.getByRole('button', { name: /create batch/i }));

      // Assert
      await waitFor(() => {
        expect(screen.getByText(/please select a report date/i)).toBeInTheDocument();
      });
    });

    it('should show error when batch already exists for selected date', async () => {
      // Arrange
      const user = userEvent.setup();
      mockPost.mockRejectedValue({
        message: 'A batch for this date already exists',
        statusCode: 400,
      });

      render(<CreateBatchDialog open={true} onSuccess={mockOnSuccess} onCancel={mockOnCancel} />);

      // Act
      await user.click(screen.getByLabelText(/report type/i));
      await user.click(screen.getByRole('option', { name: /monthly/i }));

      const dateInput = screen.getByLabelText(/report date/i);
      await user.type(dateInput, '2024-03-31');

      await user.click(screen.getByRole('button', { name: /create batch/i }));

      // Assert
      await waitFor(() => {
        expect(screen.getByText(/a batch for this date already exists/i)).toBeInTheDocument();
      });
    });

    it('should show warning when selecting historical date (more than 3 months ago)', async () => {
      // Arrange
      const user = userEvent.setup();
      render(<CreateBatchDialog open={true} onSuccess={mockOnSuccess} onCancel={mockOnCancel} />);

      // Act - Select date from 4 months ago
      const fourMonthsAgo = new Date();
      fourMonthsAgo.setMonth(fourMonthsAgo.getMonth() - 4);
      const historicalDate = fourMonthsAgo.toISOString().split('T')[0];

      await user.click(screen.getByLabelText(/report type/i));
      await user.click(screen.getByRole('option', { name: /monthly/i }));

      const dateInput = screen.getByLabelText(/report date/i);
      await user.type(dateInput, historicalDate);

      // Assert
      await waitFor(() => {
        expect(
          screen.getByText(/you are creating a batch for a historical date/i)
        ).toBeInTheDocument();
      });
    });

    it('should only allow month-end dates for Monthly batch type', async () => {
      // Arrange
      const user = userEvent.setup();
      render(<CreateBatchDialog open={true} onSuccess={mockOnSuccess} onCancel={mockOnCancel} />);

      // Act - Select Monthly
      await user.click(screen.getByLabelText(/report type/i));
      await user.click(screen.getByRole('option', { name: /monthly/i }));

      // Try to select mid-month date
      const dateInput = screen.getByLabelText(/report date/i);
      await user.type(dateInput, '2024-03-15');

      await user.click(screen.getByRole('button', { name: /create batch/i }));

      // Assert - Should show validation error
      await waitFor(() => {
        expect(
          screen.getByText(/please select a month-end date|invalid date/i)
        ).toBeInTheDocument();
      });
    });
  });

  describe('Error Handling', () => {
    it('should display error message when API returns 500 error', async () => {
      // Arrange
      const user = userEvent.setup();
      mockPost.mockRejectedValue({
        message: 'Internal Server Error',
        statusCode: 500,
      });

      render(<CreateBatchDialog open={true} onSuccess={mockOnSuccess} onCancel={mockOnCancel} />);

      // Act
      await user.click(screen.getByLabelText(/report type/i));
      await user.click(screen.getByRole('option', { name: /monthly/i }));

      const dateInput = screen.getByLabelText(/report date/i);
      await user.type(dateInput, '2024-03-31');

      await user.click(screen.getByRole('button', { name: /create batch/i }));

      // Assert
      await waitFor(() => {
        expect(
          screen.getByText(/failed to create report batch.*try again.*contact support/i)
        ).toBeInTheDocument();
      });
    });

    it('should display error message when API is unreachable', async () => {
      // Arrange
      const user = userEvent.setup();
      mockPost.mockRejectedValue(new TypeError('Network error'));

      render(<CreateBatchDialog open={true} onSuccess={mockOnSuccess} onCancel={mockOnCancel} />);

      // Act
      await user.click(screen.getByLabelText(/report type/i));
      await user.click(screen.getByRole('option', { name: /monthly/i }));

      const dateInput = screen.getByLabelText(/report date/i);
      await user.type(dateInput, '2024-03-31');

      await user.click(screen.getByRole('button', { name: /create batch/i }));

      // Assert
      await waitFor(() => {
        expect(
          screen.getByText(/unable to connect to the server.*check your connection/i)
        ).toBeInTheDocument();
      });
    });
  });

  describe('Dialog Behavior', () => {
    it('should close dialog when Cancel button is clicked', async () => {
      // Arrange
      const user = userEvent.setup();
      render(<CreateBatchDialog open={true} onSuccess={mockOnSuccess} onCancel={mockOnCancel} />);

      // Act
      const cancelButton = screen.getByRole('button', { name: /cancel/i });
      await user.click(cancelButton);

      // Assert
      expect(mockOnCancel).toHaveBeenCalled();
    });

    it('should show loading state and disable button during API call', async () => {
      // Arrange
      const user = userEvent.setup();
      mockPost.mockImplementation(
        () => new Promise(resolve => setTimeout(resolve, 1000))
      );

      render(<CreateBatchDialog open={true} onSuccess={mockOnSuccess} onCancel={mockOnCancel} />);

      // Act
      await user.click(screen.getByLabelText(/report type/i));
      await user.click(screen.getByRole('option', { name: /monthly/i }));

      const dateInput = screen.getByLabelText(/report date/i);
      await user.type(dateInput, '2024-03-31');

      const createButton = screen.getByRole('button', { name: /create batch/i });
      await user.click(createButton);

      // Assert - Button should show loading state
      await waitFor(() => {
        expect(screen.getByRole('button', { name: /creating|loading/i })).toBeDisabled();
      });
    });
  });

  describe('Accessibility', () => {
    it('should have accessible form labels', () => {
      // Act
      render(<CreateBatchDialog open={true} onSuccess={mockOnSuccess} onCancel={mockOnCancel} />);

      // Assert
      expect(screen.getByLabelText(/report type/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/report date/i)).toBeInTheDocument();
    });

    it('should have accessible dialog title', () => {
      // Act
      render(<CreateBatchDialog open={true} onSuccess={mockOnSuccess} onCancel={mockOnCancel} />);

      // Assert
      const dialog = screen.getByRole('dialog');
      expect(dialog).toHaveAccessibleName(/create new batch/i);
    });

    it('should have keyboard navigable form elements', async () => {
      // Arrange
      const user = userEvent.setup();
      render(<CreateBatchDialog open={true} onSuccess={mockOnSuccess} onCancel={mockOnCancel} />);

      // Act - Tab through form
      await user.tab();

      // Assert - First field should be focused
      expect(screen.getByLabelText(/report type/i)).toHaveFocus();
    });
  });
});
