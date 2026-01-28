# Story: View Batch History

**Epic:** Core Navigation & Start Page
**Story:** 5 of 5
**Wireframe:** `../../wireframes/screen-1-start-page.md`

## User Story

**As a** user of InvestInsight
**I want** to view historical report batches with their completion status
**So that** I can review past reporting cycles and access completed batch data

## Acceptance Criteria

### Happy Path - View History on Start Page
- [ ] Given there are completed batches, when I view the Start Page, then I see the "Batch History (Last 5 Batches)" section showing the 5 most recent batches
- [ ] Given I view the Batch History table, when I look at the columns, then I see: Date, Status, Approved By, Actions
- [ ] Given a batch has status "Complete", when I view the Status column, then I see a green badge with text "Complete"
- [ ] Given a batch was approved by Level 3, when I view the Approved By column, then I see the approver's name in format "L3: [Username]"
- [ ] Given I view a batch row, when I look at the Actions column, then I see a "View Details" button

### View Batch Details
- [ ] Given I click "View Details" for a completed batch, when the button is clicked, then I am navigated to a read-only batch details page showing all batch information
- [ ] Given I am viewing batch details for a completed batch, when I view the page, then I see: batch date, workflow status, approval history, and file upload summary
- [ ] Given I am viewing a completed batch, when I try to edit data, then all edit actions are disabled (read-only mode)

### Full Batch History Page
- [ ] Given I click "View Batch History" on the Start Page, when the button is clicked, then I am navigated to a full batch history page showing all historical batches
- [ ] Given I am on the full Batch History page, when I view the table, then I see all batches (not just the last 5) with columns: Date, Status, Workflow Stage, Started At, Finished At, Actions
- [ ] Given I view the full history, when there are many batches, then I see pagination controls at the bottom of the table
- [ ] Given I am on the full history page, when I click page 2, then I see the next set of batches

### Filtering and Sorting
- [ ] Given I am on the full Batch History page, when I use the status filter dropdown, then I can filter by: All, Complete, In Progress, Failed
- [ ] Given I filter by "Complete", when the filter is applied, then I see only batches with "Complete" status
- [ ] Given I click a column header (e.g., Date), when I click it, then the table sorts by that column in ascending order
- [ ] Given I click the same column header again, when I click it, then the table sorts in descending order

### Empty State
- [ ] Given no historical batches exist, when I view the Batch History section on Start Page, then I see "No historical batches available"
- [ ] Given I navigate to the full Batch History page with no data, when the page loads, then I see "No batches found. Create your first batch to get started."

### Error Handling
- [ ] Given the API fails to load batch history, when the Start Page loads, then I see "Unable to load batch history" in the Batch History section
- [ ] Given I try to view details for a batch that no longer exists, when I click "View Details", then I see an error message "Batch not found"

## API Endpoints (from OpenAPI spec)

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/report-batches` | Get all monthly report batches (current and historical) |
| GET | `/approve-logs/{ReportBatchId}` | Get approval/rejection log for a specific batch |

**Response for `/report-batches`:**
```typescript
{
  MonthlyReportBatches: [
    {
      ReportBatchId: number,
      ReportDate: string,
      WorkflowInstanceId: string,
      WorkflowStatusName: string,
      CreatedAt: string,
      FinishedAt: string,
      LastExecutedActivityName: string
    }
  ]
}
```

## Implementation Notes

- The Start Page batch history summary (last 5 batches) is already partially implemented in Story 3
- Enhance the Start Page to display actual batch data from the API
- Create a new page for full batch history at `/batch-history`
- Create a new page for batch details at `/batch-history/[batchId]`
- Use Shadcn UI components: Table, Badge, Button, Pagination, Select (for filtering)
- Create API client functions in `web/src/lib/api/batches.ts`:
  - `getReportBatches()` - already created in Story 3, reuse here
  - `getBatchApprovalLogs(batchId: number)` - fetch approval history for a batch
- For the batch details page:
  - Display batch metadata (date, status, workflow stage)
  - Display approval history with timestamps and approver names
  - Show file upload summary (will reference Epic 2 file upload data)
  - All data should be read-only (no edit buttons)
- Status badge colors:
  - Complete: Green
  - In Progress: Yellow/Blue
  - Failed: Red
- Sorting and filtering:
  - Use client-side sorting for small datasets
  - Consider server-side pagination if datasets are large (>100 batches)
- Date formatting: Display dates in user-friendly format (e.g., "March 31, 2024" or "2024-03-31" based on locale)
