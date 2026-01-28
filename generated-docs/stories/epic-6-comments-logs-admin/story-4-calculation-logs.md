# Story: Calculation Logs and Errors

**Epic:** Comments, Logs & Administration
**Story:** 4 of 5
**Wireframe:** `../../wireframes/screen-13-process-logs.md`

## User Story

**As an** operations user or support analyst
**I want** to view calculation execution logs with error details and retry capability
**So that** I can monitor calculation health and troubleshoot calculation failures

## Acceptance Criteria

### Happy Path - View Calculation Logs
- [ ] Given I navigate to Process Logs, when I click the "Calculation Logs" tab, then I see a table of calculation execution logs
- [ ] Given I view the table, when I look at the columns, then I see: Calculation Name, Calculation Status, Start Time, End Time, View Errors
- [ ] Given calculation logs exist, when I view the table, then I see all calculation executions with their details

### Calculation Entry Display
- [ ] Given I view a calculation entry, when I look at the row, then I see: Calculation name (e.g., "CalculatePortfolioPerformance", "CalculateRiskMetrics"), Status (Complete, Failed, In Progress), Start timestamp, End timestamp, Duration
- [ ] Given a calculation completed successfully, when I view its status, then I see a green "Complete" badge
- [ ] Given a calculation failed, when I view its status, then I see a red "Failed" badge
- [ ] Given a calculation is running, when I view its status, then I see a yellow "In Progress" badge

### Duration Display
- [ ] Given a calculation has completed, when I view the entry, then I see duration calculated from End Time - Start Time
- [ ] Given the duration is displayed, when I look at the format, then I see it as "Xh Ym Zs" or "Ym Zs" or "Zs" depending on length

### View Errors Action
- [ ] Given I view a failed calculation entry, when I click "View Errors", then a dialog opens showing detailed error information
- [ ] Given the Errors dialog is open, when I view the content, then I see: Calculation name, Error count, Detailed error list with: Error prefix/category, Full error message, Timestamp
- [ ] Given there are multiple errors, when I view the dialog, then I see each error listed separately

### Calculation Error Details
- [ ] Given I view a calculation error, when I look at the error entry, then I see: Error Prefix (e.g., "DATA_VALIDATION", "CALCULATION_FAILED"), Full Error message with description, Timestamp when error occurred
- [ ] Given an error has a stack trace, when I view the full error, then I see the complete error details (expandable if long)

### Filter by Status
- [ ] Given I want to view only failed calculations, when I select "Failed" from the status filter, then the table shows only calculations with Failed status
- [ ] Given I select "Complete", when the filter is applied, then the table shows only successful calculations
- [ ] Given I select "All", when the filter is applied, then the table shows all calculations

### Calculation Error Summary
- [ ] Given I am on the Calculation Logs tab, when I view the page header, then I see a summary: "Total Calculations: X | Complete: Y | Failed: Z"
- [ ] Given there are errors, when I view the summary, then I see "Total Errors: N" in red

### Export Calculation Logs
- [ ] Given I am viewing Calculation Logs, when I click "Export Logs", then a CSV file downloads containing all calculation logs
- [ ] Given I open the exported CSV, when I view the content, then it contains columns: Calculation Name, Status, Start Time, End Time, Duration, Error Count

### Export Calculation Errors
- [ ] Given I am viewing the Calculation Errors dialog, when I click "Export Errors", then a CSV file downloads containing all errors for that calculation
- [ ] Given I open the exported errors CSV, when I view the content, then it contains columns: Calculation Name, Error Prefix, Full Error, Timestamp

### Refresh Logs
- [ ] Given I am viewing the calculation logs, when I click "Refresh", then the page reloads the logs from the API
- [ ] Given calculations are currently running, when I refresh, then I see updated status for in-progress calculations

### Real-Time Updates (Optional)
- [ ] Given calculations are running, when I view the logs page, then the status updates automatically every 15 seconds
- [ ] Given a calculation completes or fails, when the auto-refresh occurs, then I see the status change without manual refresh

### Pagination
- [ ] Given there are more than 20 calculation logs, when I view the table, then I see pagination controls
- [ ] Given I click "Next", when the page changes, then the table loads the next 20 logs

### Search Functionality
- [ ] Given I want to find a specific calculation, when I enter a calculation name in the search box, then the table filters to show only matching calculations

### Empty State
- [ ] Given no calculations have been run for the current batch, when I load the Calculation Logs, then I see "No calculation logs available for this batch"

### Error Count Badge
- [ ] Given a calculation has errors, when I view the entry, then I see an error count badge (e.g., "3 errors") in the View Errors column
- [ ] Given a calculation has no errors, when I view the entry, then I see "No errors" or the View Errors link is grayed out

### Link to Approval Dashboard
- [ ] Given I am viewing calculation logs, when I want to see how calculations affect approvals, then I see a link "View Calculation Status on Approval Dashboard"
- [ ] Given I click the link, when it is clicked, then I am navigated to the Approval Dashboard where calculation status is displayed

### Error Handling
- [ ] Given the API fails to load calculation logs, when the page loads, then I see an error message "Unable to load calculation logs. Please try again."
- [ ] Given the API fails to load calculation errors, when I click "View Errors", then I see an error message "Unable to load error details. Please try again."

## API Endpoints (from OpenAPI spec)

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/calculation-logs` | Get calculation execution logs |
| GET | `/calculation-log-errors` | Get calculation error details |

**Response for GET `/calculation-logs`:**
```typescript
{
  CalculationLogs: [
    {
      CalculationLogId: number,
      CalculationName: string,
      CalculationStatus: string, // "Complete" | "Failed" | "In Progress"
      StartTime: string,
      EndTime: string,
      ViewErrors: string // Link or ID to errors endpoint
    }
  ]
}
```

**Response for GET `/calculation-log-errors`:**
```typescript
{
  CalculationLogErrors: [
    {
      CalculationLogErrorId: number,
      CalculationName: string,
      CalculationStatus: string,
      StartTime: string,
      EndTime: string,
      ErrorPrefix: string,
      FullError: string
    }
  ]
}
```

## Implementation Notes

- Enhance the Process Logs page from Stories 2-3 with Calculation Logs tab
- Use Shadcn UI components: Tabs, Table, Dialog, Badge, Button, Alert
- Create or reuse API client functions in `web/src/lib/api/process-logs.ts`:
  - `getCalculationLogs(reportBatchId?: number)` - fetch calculation logs
  - `getCalculationErrors(calculationLogId?: number)` - fetch error details
- Status badge mapping:
  - "Complete" → Green badge with checkmark
  - "Failed" → Red badge with X icon
  - "In Progress" → Yellow badge with spinner
- Table display:
  - Show calculation name, status, timestamps, and actions
  - Include error count badge for failed calculations
  - "View Errors" button only enabled for failed calculations
- View Errors dialog:
  - Modal showing all errors for a specific calculation
  - Display error prefix for categorization
  - Show full error messages (expandable if very long)
  - Include timestamp for each error
  - "Export Errors" button at bottom
- Duration calculation:
  - Calculate from EndTime - StartTime
  - Format as "Xh Ym Zs" for readability
  - For in-progress calculations, calculate from StartTime to now
- Summary statistics:
  - Count total calculations, complete, failed, in progress
  - Count total errors across all failed calculations
  - Display at top of tab
- Filter implementation:
  - Dropdown filter for status (All, Complete, Failed, In Progress)
  - Client-side filtering for small datasets
- Export functionality:
  - Export main logs: CSV with all calculation executions
  - Export errors: CSV with all error details for a specific calculation
  - Filenames: `Calculation_Logs_[ReportDate].csv`, `Calculation_Errors_[CalculationName]_[Date].csv`
- Search functionality:
  - Filter by calculation name (case-insensitive)
  - Highlight matching text (optional)
- Real-time updates (optional):
  - Use React Query with refetchInterval (15-30 seconds)
  - Only poll when calculations are "In Progress"
  - Stop polling when all calculations are Complete or Failed
- Error categorization:
  - Group errors by ErrorPrefix (e.g., DATA_VALIDATION, CALCULATION_FAILED, TIMEOUT)
  - Use different colors or icons for different error types
- Pagination: 20 logs per page
- Integration with Approval Dashboard:
  - The Approval Dashboard shows calculation status summary
  - Link back to this page for detailed logs
