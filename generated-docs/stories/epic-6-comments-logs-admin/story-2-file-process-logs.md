# Story: File Process Logs

**Epic:** Comments, Logs & Administration
**Story:** 2 of 5
**Wireframe:** `../../wireframes/screen-13-process-logs.md`

## User Story

**As an** operations user or support analyst
**I want** to view file upload and validation logs with status and error details
**So that** I can debug file processing issues and provide evidence of file handling

## Acceptance Criteria

### Happy Path - View File Process Logs
- [ ] Given I navigate to Process Logs, when the page loads, then I see tabs: "File Process Logs", "Monthly Process Logs", "Calculation Logs"
- [ ] Given I am on the File Process Logs tab, when I view the content, then I see a table with columns: File Name, Workflow Activity, Status, Records Count
- [ ] Given file process logs exist, when I view the table, then I see all file processing entries with their details

### File Entry Display
- [ ] Given I view a file log entry, when I look at the row, then I see: File name (e.g., "202403_PortA_Holdings.csv"), Upload timestamp, Finish timestamp, Duration, Status, Records count
- [ ] Given a file was processed successfully, when I view its status, then I see a green "Complete" badge
- [ ] Given a file processing failed, when I view its status, then I see a red "Failed" badge
- [ ] Given a file is currently processing, when I view its status, then I see a yellow "In Progress" badge

### File Details Display
- [ ] Given I view a file entry, when I look below the file name, then I see upload timestamp (e.g., "Uploaded: 2024-03-15 14:32")
- [ ] Given the file processing is complete, when I view the entry, then I see finish timestamp (e.g., "Finished: 2024-03-15 14:33")
- [ ] Given the file processing is complete, when I view the entry, then I see duration (e.g., "Duration: 1m 15s")
- [ ] Given the file processing failed, when I view the entry, then I see failed timestamp and error summary (e.g., "Failed: 2024-03-15 14:33 - Error: Format validation failed")

### View Details Action
- [ ] Given I view a successful file entry, when I click "View Details", then a dialog opens showing detailed processing information
- [ ] Given the Details dialog is open, when I view the content, then I see: File metadata (name, size, upload timestamp), Processing steps with timestamps, Records processed count, Validation results
- [ ] Given the file has processing steps, when I view the details, then I see each step with status (e.g., "FileUpload: Complete", "FileValidation: Complete", "DataImport: Complete")

### View Errors Action
- [ ] Given I view a failed file entry, when I click "View Errors", then a dialog opens showing detailed error information
- [ ] Given the Errors dialog is open, when I view the content, then I see: Error summary, Detailed error messages, Failed validation rules, Row/column information for data errors (if applicable)
- [ ] Given the file has multiple errors, when I view the dialog, then I see all errors listed with severity (Critical, Warning, Info)

### Filter by Status
- [ ] Given I want to view only failed files, when I select "Failed" from the status filter dropdown, then the table shows only files with Failed status
- [ ] Given I select "Complete", when the filter is applied, then the table shows only successfully processed files
- [ ] Given I select "In Progress", when the filter is applied, then the table shows only files currently being processed
- [ ] Given I select "All", when the filter is applied, then the table shows all files regardless of status

### Export Logs
- [ ] Given I am viewing File Process Logs, when I click "Export Logs", then a CSV file downloads containing all file processing logs
- [ ] Given I open the exported CSV, when I view the content, then it contains columns: File Name, Upload Timestamp, Finish Timestamp, Duration, Status, Records Count, Workflow Activity

### Refresh Logs
- [ ] Given I am viewing the logs page, when I click "Refresh", then the page reloads the logs from the API
- [ ] Given files are currently processing, when I refresh, then I see updated status for in-progress files

### Pagination
- [ ] Given there are more than 20 file logs, when I view the table, then I see pagination controls showing "Showing 1-20 of 52 file logs"
- [ ] Given I click "Next", when the page changes, then the table loads the next 20 logs

### Real-Time Updates (Optional)
- [ ] Given a file is being processed, when I view the logs page, then the status updates automatically every 10 seconds
- [ ] Given a file completes processing, when the auto-refresh occurs, then I see the status change from "In Progress" to "Complete" without manual refresh

### Duration Formatting
- [ ] Given a file processed in less than 1 minute, when I view the duration, then I see it in seconds (e.g., "45s")
- [ ] Given a file processed in more than 1 minute, when I view the duration, then I see it in minutes and seconds (e.g., "1m 15s")
- [ ] Given a file processed in more than 1 hour, when I view the duration, then I see it in hours, minutes, and seconds (e.g., "2h 15m 45s")

### Search Functionality
- [ ] Given I want to find a specific file, when I enter a file name in the search box, then the table filters to show only matching files
- [ ] Given I search for "PortA", when the search is applied, then I see all files with "PortA" in the filename

### Empty State
- [ ] Given no files have been processed for the current batch, when I load the File Process Logs, then I see "No file processing logs available for this batch"

### Error Handling
- [ ] Given the API fails to load file process logs, when the page loads, then I see an error message "Unable to load file process logs. Please try again."

## API Endpoints (from OpenAPI spec)

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/process-logs` | Get file process logs |

**Response for GET `/process-logs`:**
```typescript
{
  ProcessLogs: [
    {
      FileLogId: number,
      FileName: string,
      UploadedAt: string,
      FinishedAt: string,
      Duration: number, // in seconds
      Status: string, // "Complete" | "Failed" | "In Progress"
      RecordsCount: number,
      WorkflowActivity: string,
      ErrorMessage: string
    }
  ]
}
```

**Note:** Detailed error information may come from a separate endpoint like `/file/faults?FileLogId={id}` (from Epic 2).

## Implementation Notes

- Create page at `/logs` or `/process-logs` with tab navigation
- Use Shadcn UI components: Tabs, Table, Dialog, Badge, Button, Input (for search), Select (for filter)
- Create API client functions in `web/src/lib/api/process-logs.ts`:
  - `getFileProcessLogs(reportBatchId?: number)` - fetch file process logs
  - `getFileProcessDetails(fileLogId: number)` - fetch detailed processing info (if available)
- Tab structure:
  - File Process Logs (this story)
  - Monthly Process Logs (Story 3)
  - Calculation Logs (Story 4)
- Status badge mapping:
  - "Complete" → Green badge
  - "Failed" → Red badge
  - "In Progress" → Yellow/Orange badge
- Table display:
  - Show primary info in main row
  - Show secondary info (timestamps, duration) in smaller text below
  - Use expandable rows for additional details (optional)
- View Details dialog:
  - Show file metadata
  - Display processing steps as a timeline or list
  - Include validation results summary
- View Errors dialog:
  - Reuse file faults display from Epic 2 Story 4
  - Show error details with severity
  - Include row/column information for data errors
- Duration calculation:
  - Calculate from FinishedAt - UploadedAt
  - Format as "Xh Ym Zs" for readability
- Filter implementation:
  - Client-side filtering for small datasets
  - Server-side filtering with query parameters for large datasets
- Search functionality:
  - Filter by file name (case-insensitive)
  - Highlight matching text (optional)
- Export functionality:
  - Client-side CSV generation
  - Include all visible logs
  - Filename: `File_Process_Logs_[ReportDate].csv`
- Real-time updates (optional):
  - Use React Query with refetchInterval (10-30 seconds)
  - Only poll when files are "In Progress"
  - Stop polling when all files are Complete or Failed
- Pagination: 20 logs per page
- Consider adding date range filter for historical log viewing
