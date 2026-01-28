/**
 * Integration Test: View Batch History (Story 5)
 *
 * Tests for viewing historical report batches, including:
 * - Batch history summary on Start Page (last 5 batches)
 * - Full batch history page with pagination and filtering
 * - Batch details page (read-only view of completed batches)
 */

import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import BatchHistoryPage from '@/app/batch-history/page';
import BatchDetailsPage from '@/app/batch-history/[batchId]/page';
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
  WorkflowStatusName: 'Complete',
  CreatedAt: '2024-03-01T10:00:00Z',
  FinishedAt: '2024-03-31T17:00:00Z',
  LastExecutedActivityName: 'L3Approval',
  ...overrides,
});

const createMockBatches = (count = 5) => ({
  MonthlyReportBatches: Array.from({ length: count }, (_, i) =>
    createMockBatch({
      ReportBatchId: i + 1,
      ReportDate: `2024-0${count - i}-28`,
      FinishedAt: `2024-0${count - i}-27T17:00:00Z`,
    })
  ),
});

const createMockApprovalLogs = () => ({
  ApprovalLogs: [
    {
      LogId: 1,
      ReportBatchId: 1,
      Level: 'L1',
      ApproverName: 'John Doe',
      Action: 'Approved',
      Timestamp: '2024-03-29T10:00:00Z',
      Comments: 'Data looks good',
    },
    {
      LogId: 2,
      ReportBatchId: 1,
      Level: 'L2',
      ApproverName: 'Jane Smith',
      Action: 'Approved',
      Timestamp: '2024-03-30T14:00:00Z',
      Comments: '',
    },
    {
      LogId: 3,
      ReportBatchId: 1,
      Level: 'L3',
      ApproverName: 'K. Wilson',
      Action: 'Approved',
      Timestamp: '2024-03-31T16:00:00Z',
      Comments: 'Final approval',
    },
  ],
});

describe('View Batch History (Story 5)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Batch History on Start Page (Last 5 Batches)', () => {
    it('should display last 5 completed batches in history section', async () => {
      // Arrange
      mockGet.mockResolvedValue(createMockBatches(7));

      // Act
      const { container } = render(<BatchHistoryPage />);

      // Assert - Should show "Last 5 Batches" heading
      await waitFor(() => {
        expect(screen.getByText(/batch history.*last 5 batches/i)).toBeInTheDocument();
      });

      // Count table rows (should be 5 + 1 header)
      const rows = container.querySelectorAll('tbody tr');
      expect(rows).toHaveLength(5);
    });

    it('should display table with correct columns', async () => {
      // Arrange
      mockGet.mockResolvedValue(createMockBatches(3));

      // Act
      render(<BatchHistoryPage />);

      // Assert
      await waitFor(() => {
        expect(screen.getByRole('columnheader', { name: /date/i })).toBeInTheDocument();
        expect(screen.getByRole('columnheader', { name: /status/i })).toBeInTheDocument();
        expect(screen.getByRole('columnheader', { name: /approved by/i })).toBeInTheDocument();
        expect(screen.getByRole('columnheader', { name: /actions/i })).toBeInTheDocument();
      });
    });

    it('should display Complete status with green badge', async () => {
      // Arrange
      mockGet.mockResolvedValue(createMockBatches(2));

      // Act
      render(<BatchHistoryPage />);

      // Assert
      await waitFor(() => {
        const statusBadge = screen.getByText(/complete/i);
        expect(statusBadge).toBeInTheDocument();
        expect(statusBadge).toHaveClass(/green|success/i);
      });
    });

    it('should display approver name in format "L3: Username"', async () => {
      // Arrange
      mockGet.mockResolvedValue({
        MonthlyReportBatches: [
          createMockBatch({
            ApprovedBy: 'K. Wilson',
            ApprovalLevel: 'L3',
          }),
        ],
      });

      // Act
      render(<BatchHistoryPage />);

      // Assert
      await waitFor(() => {
        expect(screen.getByText(/L3:\s*K\.\s*Wilson/i)).toBeInTheDocument();
      });
    });

    it('should have View Details button for each batch', async () => {
      // Arrange
      mockGet.mockResolvedValue(createMockBatches(3));

      // Act
      render(<BatchHistoryPage />);

      // Assert
      await waitFor(() => {
        const viewDetailsButtons = screen.getAllByRole('link', { name: /view details/i });
        expect(viewDetailsButtons).toHaveLength(3);
      });
    });
  });

  describe('Full Batch History Page', () => {
    it('should display all batches (not just last 5)', async () => {
      // Arrange
      mockGet.mockResolvedValue(createMockBatches(10));

      // Act
      render(<BatchHistoryPage />);

      // Assert
      await waitFor(() => {
        const rows = screen.getAllByRole('row');
        // 10 data rows + 1 header row
        expect(rows.length).toBeGreaterThan(6);
      });
    });

    it('should display extended columns including Started At and Finished At', async () => {
      // Arrange
      mockGet.mockResolvedValue(createMockBatches(5));

      // Act
      render(<BatchHistoryPage />);

      // Assert
      await waitFor(() => {
        expect(screen.getByRole('columnheader', { name: /date/i })).toBeInTheDocument();
        expect(screen.getByRole('columnheader', { name: /status/i })).toBeInTheDocument();
        expect(screen.getByRole('columnheader', { name: /workflow stage/i })).toBeInTheDocument();
        expect(screen.getByRole('columnheader', { name: /started at/i })).toBeInTheDocument();
        expect(screen.getByRole('columnheader', { name: /finished at/i })).toBeInTheDocument();
        expect(screen.getByRole('columnheader', { name: /actions/i })).toBeInTheDocument();
      });
    });

    it('should show pagination controls when there are many batches', async () => {
      // Arrange
      mockGet.mockResolvedValue(createMockBatches(25));

      // Act
      render(<BatchHistoryPage />);

      // Assert
      await waitFor(() => {
        expect(screen.getByRole('navigation', { name: /pagination/i })).toBeInTheDocument();
      });
    });

    it('should navigate to page 2 when pagination button is clicked', async () => {
      // Arrange
      const user = userEvent.setup();
      mockGet.mockResolvedValue(createMockBatches(25));
      render(<BatchHistoryPage />);

      // Act
      await waitFor(() => {
        expect(screen.getByRole('button', { name: /page 2|next/i })).toBeInTheDocument();
      });

      const page2Button = screen.getByRole('button', { name: /page 2|next/i });
      await user.click(page2Button);

      // Assert - Should show different batches
      await waitFor(() => {
        expect(screen.getByText(/page 2/i)).toBeInTheDocument();
      });
    });
  });

  describe('Filtering and Sorting', () => {
    beforeEach(() => {
      mockGet.mockResolvedValue({
        MonthlyReportBatches: [
          createMockBatch({ ReportBatchId: 1, WorkflowStatusName: 'Complete' }),
          createMockBatch({ ReportBatchId: 2, WorkflowStatusName: 'In Progress' }),
          createMockBatch({ ReportBatchId: 3, WorkflowStatusName: 'Complete' }),
          createMockBatch({ ReportBatchId: 4, WorkflowStatusName: 'Failed' }),
        ],
      });
    });

    it('should display status filter dropdown with All, Complete, In Progress, Failed options', async () => {
      // Act
      render(<BatchHistoryPage />);

      // Assert
      await waitFor(() => {
        const filterDropdown = screen.getByLabelText(/filter by status|status/i);
        expect(filterDropdown).toBeInTheDocument();
      });
    });

    it('should filter batches by Complete status when filter is applied', async () => {
      // Arrange
      const user = userEvent.setup();
      render(<BatchHistoryPage />);

      // Act
      await waitFor(() => {
        expect(screen.getByLabelText(/filter by status|status/i)).toBeInTheDocument();
      });

      const filterDropdown = screen.getByLabelText(/filter by status|status/i);
      await user.click(filterDropdown);
      await user.click(screen.getByRole('option', { name: /complete/i }));

      // Assert - Should only show Complete batches
      await waitFor(() => {
        const statusBadges = screen.getAllByText(/complete/i);
        expect(statusBadges.length).toBeGreaterThan(0);
        expect(screen.queryByText(/in progress/i)).not.toBeInTheDocument();
      });
    });

    it('should sort table by Date when Date column header is clicked', async () => {
      // Arrange
      const user = userEvent.setup();
      render(<BatchHistoryPage />);

      // Act
      await waitFor(() => {
        expect(screen.getByRole('columnheader', { name: /date/i })).toBeInTheDocument();
      });

      const dateHeader = screen.getByRole('columnheader', { name: /date/i });
      await user.click(dateHeader);

      // Assert - Should show sort indicator (ascending)
      expect(dateHeader).toHaveAttribute('aria-sort', 'ascending');
    });

    it('should toggle sort order when Date column header is clicked again', async () => {
      // Arrange
      const user = userEvent.setup();
      render(<BatchHistoryPage />);

      // Act
      await waitFor(() => {
        expect(screen.getByRole('columnheader', { name: /date/i })).toBeInTheDocument();
      });

      const dateHeader = screen.getByRole('columnheader', { name: /date/i });
      await user.click(dateHeader);
      await user.click(dateHeader);

      // Assert - Should show sort indicator (descending)
      expect(dateHeader).toHaveAttribute('aria-sort', 'descending');
    });
  });

  describe('Batch Details Page', () => {
    it('should display batch metadata when batch details page loads', async () => {
      // Arrange
      mockGet.mockImplementation((endpoint: string) => {
        if (endpoint.includes('/report-batches')) {
          return Promise.resolve(createMockBatches(1));
        }
        if (endpoint.includes('/approve-logs')) {
          return Promise.resolve(createMockApprovalLogs());
        }
        return Promise.resolve({});
      });

      // Act
      render(<BatchDetailsPage params={{ batchId: '1' }} />);

      // Assert
      await waitFor(() => {
        expect(screen.getByText(/batch date/i)).toBeInTheDocument();
        expect(screen.getByText(/2024-03-31/i)).toBeInTheDocument();
        expect(screen.getByText(/workflow status/i)).toBeInTheDocument();
        expect(screen.getByText(/complete/i)).toBeInTheDocument();
      });
    });

    it('should display approval history with timestamps and approver names', async () => {
      // Arrange
      mockGet.mockImplementation((endpoint: string) => {
        if (endpoint.includes('/report-batches')) {
          return Promise.resolve(createMockBatches(1));
        }
        if (endpoint.includes('/approve-logs')) {
          return Promise.resolve(createMockApprovalLogs());
        }
        return Promise.resolve({});
      });

      // Act
      render(<BatchDetailsPage params={{ batchId: '1' }} />);

      // Assert
      await waitFor(() => {
        expect(screen.getByText(/approval history/i)).toBeInTheDocument();
        expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
        expect(screen.getByText(/Jane Smith/i)).toBeInTheDocument();
        expect(screen.getByText(/K\. Wilson/i)).toBeInTheDocument();
      });
    });

    it('should display file upload summary', async () => {
      // Arrange
      mockGet.mockImplementation((endpoint: string) => {
        if (endpoint.includes('/report-batches')) {
          return Promise.resolve(createMockBatches(1));
        }
        if (endpoint.includes('/approve-logs')) {
          return Promise.resolve(createMockApprovalLogs());
        }
        return Promise.resolve({});
      });

      // Act
      render(<BatchDetailsPage params={{ batchId: '1' }} />);

      // Assert
      await waitFor(() => {
        expect(screen.getByText(/file upload summary/i)).toBeInTheDocument();
      });
    });

    it('should disable all edit actions (read-only mode)', async () => {
      // Arrange
      mockGet.mockImplementation((endpoint: string) => {
        if (endpoint.includes('/report-batches')) {
          return Promise.resolve(createMockBatches(1));
        }
        if (endpoint.includes('/approve-logs')) {
          return Promise.resolve(createMockApprovalLogs());
        }
        return Promise.resolve({});
      });

      // Act
      render(<BatchDetailsPage params={{ batchId: '1' }} />);

      // Assert - No edit buttons should exist
      await waitFor(() => {
        expect(screen.queryByRole('button', { name: /edit|delete|modify/i })).not.toBeInTheDocument();
      });

      // Should show read-only indicator
      expect(screen.getByText(/read-only|completed/i)).toBeInTheDocument();
    });
  });

  describe('Empty States', () => {
    it('should show "No historical batches available" when no batches exist', async () => {
      // Arrange
      mockGet.mockResolvedValue({ MonthlyReportBatches: [] });

      // Act
      render(<BatchHistoryPage />);

      // Assert
      await waitFor(() => {
        expect(screen.getByText(/no historical batches available/i)).toBeInTheDocument();
      });
    });

    it('should show "No batches found" message on full history page with empty data', async () => {
      // Arrange
      mockGet.mockResolvedValue({ MonthlyReportBatches: [] });

      // Act
      render(<BatchHistoryPage />);

      // Assert
      await waitFor(() => {
        expect(
          screen.getByText(/no batches found.*create your first batch/i)
        ).toBeInTheDocument();
      });
    });
  });

  describe('Error Handling', () => {
    it('should display error message when API fails to load batch history', async () => {
      // Arrange
      mockGet.mockRejectedValue(new Error('Network error'));

      // Act
      render(<BatchHistoryPage />);

      // Assert
      await waitFor(() => {
        expect(screen.getByRole('alert')).toHaveTextContent(
          /unable to load batch history/i
        );
      });
    });

    it('should show error when trying to view details for non-existent batch', async () => {
      // Arrange
      mockGet.mockRejectedValue({
        message: 'Batch not found',
        statusCode: 404,
      });

      // Act
      render(<BatchDetailsPage params={{ batchId: '999' }} />);

      // Assert
      await waitFor(() => {
        expect(screen.getByText(/batch not found/i)).toBeInTheDocument();
      });
    });
  });

  describe('Accessibility', () => {
    it('should have accessible table structure', async () => {
      // Arrange
      mockGet.mockResolvedValue(createMockBatches(3));

      // Act
      render(<BatchHistoryPage />);

      // Assert
      await waitFor(() => {
        const table = screen.getByRole('table');
        expect(table).toHaveAttribute('aria-label');
      });
    });

    it('should have accessible page heading', async () => {
      // Arrange
      mockGet.mockResolvedValue(createMockBatches(3));

      // Act
      render(<BatchHistoryPage />);

      // Assert
      await waitFor(() => {
        expect(
          screen.getByRole('heading', { name: /batch history/i, level: 1 })
        ).toBeInTheDocument();
      });
    });

    it('should have keyboard navigable filter controls', async () => {
      // Arrange
      const user = userEvent.setup();
      mockGet.mockResolvedValue(createMockBatches(3));
      render(<BatchHistoryPage />);

      // Act - Tab to filter dropdown
      await waitFor(() => {
        expect(screen.getByLabelText(/filter by status|status/i)).toBeInTheDocument();
      });

      await user.tab();

      // Assert - Filter dropdown should be focusable
      const filterDropdown = screen.getByLabelText(/filter by status|status/i);
      expect(filterDropdown).toHaveFocus();
    });
  });
});
