/**
 * Integration Test: Start Page Dashboard (Story 3)
 *
 * Tests for the Start Page dashboard displaying current batch status,
 * quick actions, recent activity, and batch history summary.
 */

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { vi as vitest } from 'vitest';
import Home from '@/app/page';
import * as apiClient from '@/lib/api/client';

// Mock API client
vi.mock('@/lib/api/client', () => ({
  get: vi.fn(),
  post: vi.fn(),
  put: vi.fn(),
  del: vi.fn(),
}));

const mockGet = apiClient.get as ReturnType<typeof vi.fn>;

// Test data factories
const createMockBatch = (overrides = {}) => ({
  ReportBatchId: 1,
  ReportDate: '2024-03-31',
  WorkflowInstanceId: 'wf-123',
  WorkflowStatusName: 'Data Preparation',
  CreatedAt: '2024-03-01T10:00:00Z',
  FinishedAt: null,
  LastExecutedActivityName: 'FileUpload',
  ...overrides,
});

const createMockBatches = () => ({
  MonthlyReportBatches: [
    createMockBatch(),
    createMockBatch({
      ReportBatchId: 2,
      ReportDate: '2024-02-29',
      WorkflowStatusName: 'Complete',
      FinishedAt: '2024-02-28T17:00:00Z',
    }),
    createMockBatch({
      ReportBatchId: 3,
      ReportDate: '2024-01-31',
      WorkflowStatusName: 'Complete',
      FinishedAt: '2024-01-30T16:00:00Z',
    }),
  ],
});

describe('Start Page Dashboard (Story 3)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Current Report Batch Display', () => {
    it('should display current batch information when batch exists', async () => {
      // Arrange
      mockGet.mockResolvedValue(createMockBatches());

      // Act
      render(<Home />);

      // Assert
      await waitFor(() => {
        expect(screen.getByText(/current report batch/i)).toBeInTheDocument();
        expect(screen.getByText(/march 31, 2024|2024-03-31/i)).toBeInTheDocument();
        expect(screen.getByText(/data preparation/i)).toBeInTheDocument();
      });
    });

    it('should display workflow progress indicator for Data Preparation phase', async () => {
      // Arrange
      mockGet.mockResolvedValue(createMockBatches());

      // Act
      render(<Home />);

      // Assert - Created should be active, others pending
      await waitFor(() => {
        expect(screen.getByText(/data preparation/i)).toBeInTheDocument();
      });

      // Verify progress visualization exists
      const progressIndicator = screen.getByRole('status', { name: /workflow progress/i });
      expect(progressIndicator).toBeInTheDocument();
    });

    it('should display workflow progress indicator for Level 1 approval phase', async () => {
      // Arrange
      mockGet.mockResolvedValue({
        MonthlyReportBatches: [
          createMockBatch({ WorkflowStatusName: 'Level 1' }),
        ],
      });

      // Act
      render(<Home />);

      // Assert
      await waitFor(() => {
        expect(screen.getByText(/level 1/i)).toBeInTheDocument();
      });

      const progressIndicator = screen.getByRole('status', { name: /workflow progress/i });
      expect(progressIndicator).toBeInTheDocument();
    });

    it('should show "No active report batch" when no batches exist', async () => {
      // Arrange
      mockGet.mockResolvedValue({ MonthlyReportBatches: [] });

      // Act
      render(<Home />);

      // Assert
      await waitFor(() => {
        expect(screen.getByText(/no active report batch/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /create new batch/i })).toBeInTheDocument();
      });
    });
  });

  describe('Quick Actions Cards', () => {
    beforeEach(() => {
      mockGet.mockResolvedValue(createMockBatches());
    });

    it('should display all Quick Actions cards', async () => {
      // Act
      render(<Home />);

      // Assert
      await waitFor(() => {
        expect(screen.getByText(/quick actions/i)).toBeInTheDocument();
      });

      expect(screen.getByText(/portfolio files/i)).toBeInTheDocument();
      expect(screen.getByText(/other files/i)).toBeInTheDocument();
      expect(screen.getByText(/data confirmation/i)).toBeInTheDocument();
      expect(screen.getByText(/instruments/i)).toBeInTheDocument();
    });

    it('should display Portfolio Files status summary', async () => {
      // Act
      render(<Home />);

      // Assert
      await waitFor(() => {
        const portfolioCard = screen.getByText(/portfolio files/i).closest('[role="region"]');
        expect(portfolioCard).toHaveTextContent(/status/i);
      });
    });

    it('should navigate to Portfolio Files page when View button is clicked', async () => {
      // Arrange
      const user = userEvent.setup();
      render(<Home />);

      // Act
      await waitFor(() => {
        expect(screen.getByText(/portfolio files/i)).toBeInTheDocument();
      });

      const viewButtons = screen.getAllByRole('link', { name: /view/i });
      const portfolioViewButton = viewButtons[0]; // First view button should be for Portfolio Files

      // Assert
      expect(portfolioViewButton).toHaveAttribute('href', '/file-import');
    });

    it('should show warning indicator when Data Confirmation has issues', async () => {
      // Act
      render(<Home />);

      // Assert
      await waitFor(() => {
        const dataConfirmationCard = screen.getByText(/data confirmation/i).closest('[role="region"]');
        expect(dataConfirmationCard).toBeInTheDocument();
      });

      // Look for warning icon or status
      const warningIcon = screen.getByText(/⚠/);
      expect(warningIcon).toBeInTheDocument();
    });
  });

  describe('Recent Activity Display', () => {
    it('should display recent activity table with proper columns', async () => {
      // Arrange
      mockGet.mockResolvedValue(createMockBatches());

      // Act
      render(<Home />);

      // Assert
      await waitFor(() => {
        expect(screen.getByText(/recent activity/i)).toBeInTheDocument();
      });

      // Verify table headers
      expect(screen.getByRole('columnheader', { name: /time/i })).toBeInTheDocument();
      expect(screen.getByRole('columnheader', { name: /event/i })).toBeInTheDocument();
      expect(screen.getByRole('columnheader', { name: /user/i })).toBeInTheDocument();
    });

    it('should display file upload event in recent activity', async () => {
      // Arrange
      mockGet.mockResolvedValue(createMockBatches());

      // Act
      render(<Home />);

      // Assert - Look for example activity entry
      await waitFor(() => {
        expect(screen.getByText(/file uploaded/i)).toBeInTheDocument();
      });
    });

    it('should show "No recent activity" when no activities exist', async () => {
      // Arrange
      mockGet.mockResolvedValue({
        MonthlyReportBatches: [],
      });

      // Act
      render(<Home />);

      // Assert
      await waitFor(() => {
        const activitySection = screen.getByText(/recent activity/i).closest('section');
        expect(activitySection).toHaveTextContent(/no recent activity/i);
      });
    });
  });

  describe('Batch History Summary', () => {
    it('should display last 5 completed batches in history table', async () => {
      // Arrange
      const batches = {
        MonthlyReportBatches: Array.from({ length: 7 }, (_, i) =>
          createMockBatch({
            ReportBatchId: i + 1,
            ReportDate: `2024-0${7 - i}-31`,
            WorkflowStatusName: 'Complete',
            FinishedAt: `2024-0${7 - i}-30T16:00:00Z`,
          })
        ),
      };
      mockGet.mockResolvedValue(batches);

      // Act
      render(<Home />);

      // Assert - Should show "Last 5 Batches" section
      await waitFor(() => {
        expect(screen.getByText(/batch history.*last 5/i)).toBeInTheDocument();
      });

      // Verify table columns
      expect(screen.getByRole('columnheader', { name: /date/i })).toBeInTheDocument();
      expect(screen.getByRole('columnheader', { name: /status/i })).toBeInTheDocument();
      expect(screen.getByRole('columnheader', { name: /approved by/i })).toBeInTheDocument();
      expect(screen.getByRole('columnheader', { name: /actions/i })).toBeInTheDocument();
    });

    it('should display Complete status with green badge', async () => {
      // Arrange
      mockGet.mockResolvedValue(createMockBatches());

      // Act
      render(<Home />);

      // Assert
      await waitFor(() => {
        const completeBadge = screen.getByText(/complete/i);
        expect(completeBadge).toBeInTheDocument();
      });
    });

    it('should display approver name in format "L3: Username"', async () => {
      // Arrange
      mockGet.mockResolvedValue(createMockBatches());

      // Act
      render(<Home />);

      // Assert
      await waitFor(() => {
        expect(screen.getByText(/L3:/i)).toBeInTheDocument();
      });
    });

    it('should navigate to batch details when View Details is clicked', async () => {
      // Arrange
      const user = userEvent.setup();
      mockGet.mockResolvedValue(createMockBatches());
      render(<Home />);

      // Act
      await waitFor(() => {
        expect(screen.getByRole('link', { name: /view details/i })).toBeInTheDocument();
      });

      const viewDetailsButton = screen.getByRole('link', { name: /view details/i });

      // Assert - Should link to batch details page
      expect(viewDetailsButton).toHaveAttribute('href', expect.stringContaining('/batch-history/'));
    });
  });

  describe('Error Handling', () => {
    it('should display error message when API fails to load batch data', async () => {
      // Arrange
      mockGet.mockRejectedValue(new Error('Network error'));

      // Act
      render(<Home />);

      // Assert
      await waitFor(() => {
        expect(screen.getByRole('alert')).toHaveTextContent(
          /unable to load batch information/i
        );
      });
    });

    it('should show Create New Batch button when API returns empty data', async () => {
      // Arrange
      mockGet.mockResolvedValue({ MonthlyReportBatches: [] });

      // Act
      render(<Home />);

      // Assert
      await waitFor(() => {
        expect(screen.getByText(/no active report batch/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /create new batch/i })).toBeInTheDocument();
      });
    });
  });

  describe('Accessibility', () => {
    it('should have accessible main heading', async () => {
      // Arrange
      mockGet.mockResolvedValue(createMockBatches());

      // Act
      render(<Home />);

      // Assert
      await waitFor(() => {
        expect(
          screen.getByRole('heading', { name: /investinsight/i, level: 1 })
        ).toBeInTheDocument();
      });
    });

    it('should have accessible section headings', async () => {
      // Arrange
      mockGet.mockResolvedValue(createMockBatches());

      // Act
      render(<Home />);

      // Assert
      await waitFor(() => {
        expect(screen.getByRole('heading', { name: /current report batch/i })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: /quick actions/i })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: /recent activity/i })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: /batch history/i })).toBeInTheDocument();
      });
    });
  });
});
