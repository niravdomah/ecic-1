# Story: SFTP Import and Bulk Operations

**Epic:** File Upload & Import Management
**Story:** 5 of 6
**Wireframes:** `../../wireframes/screen-2-portfolio-file-upload.md`, `../../wireframes/screen-3-other-file-upload.md`

## User Story

**As an** operations lead
**I want** to trigger SFTP import, re-import files for a portfolio, and export file status
**So that** I can efficiently manage bulk file operations without manual individual uploads

## Acceptance Criteria

### Happy Path - SFTP Import
- [ ] Given I am on the Portfolio Files or Other Files page, when I click "SFTP Import", then I see a confirmation dialog "Import all files from SFTP folder?"
- [ ] Given I confirm SFTP Import, when the process starts, then I see a loading indicator and the button shows "Importing..."
- [ ] Given SFTP Import is in progress, when I view the page, then the SFTP Import button is disabled
- [ ] Given SFTP Import completes successfully, when the process finishes, then I see a success message "SFTP import completed successfully" and the file status matrix/list refreshes automatically
- [ ] Given SFTP Import completes with some failures, when the process finishes, then I see a message "SFTP import completed with X files imported, Y files failed. View logs for details."

### Re-import Portfolio
- [ ] Given I am on the Portfolio Files page, when I click "Re-import [Portfolio Name]" for a specific portfolio, then I see a confirmation dialog "Re-import all files for [Portfolio Name]?"
- [ ] Given I confirm re-import, when the process starts, then I see a loading indicator for that portfolio row
- [ ] Given re-import is in progress, when I view the page, then the re-import button for that portfolio is disabled and shows "Re-importing..."
- [ ] Given re-import completes successfully, when the process finishes, then I see a success message "Files re-imported successfully for [Portfolio Name]" and the file status updates
- [ ] Given re-import fails, when the process finishes, then I see an error message "Re-import failed for [Portfolio Name]. Please try again or contact support."

### Export Status
- [ ] Given I am on the Portfolio Files page, when I click "Export Status", then an Excel file downloads containing the file status matrix
- [ ] Given I open the exported Excel file, when I view the content, then it contains: Portfolio Name, File Type, Status, File Name, Uploaded By, Uploaded At
- [ ] Given I export from the Other Files page, when I click "Export Status", then an Excel file downloads with columns: File Type, File Source, Status, File Name, Uploaded By, Uploaded At

### SFTP Import Progress Tracking
- [ ] Given SFTP Import is triggered, when files are being imported, then the file status matrix/list updates in near real-time showing "Busy" status
- [ ] Given SFTP Import is running, when I refresh the page, then I see the updated status of files that have completed import
- [ ] Given I navigate away during SFTP Import, when I return to the page, then I see the current status of the import process

### Re-import All (Optional)
- [ ] Given I am on the Portfolio Files page, when I click "Re-import All", then I see a confirmation dialog "Re-import all files for all portfolios? This may take several minutes."
- [ ] Given I confirm re-import all, when the process starts, then I see a global loading indicator and all portfolio rows show "Re-importing..."
- [ ] Given re-import all completes, when the process finishes, then I see a summary message "Re-imported X portfolios, Y files successful, Z files failed"

### Concurrent Operation Prevention
- [ ] Given SFTP Import is already running, when I try to click "SFTP Import" again, then the button is disabled
- [ ] Given re-import is running for Portfolio A, when I try to re-import Portfolio A again, then the button is disabled
- [ ] Given SFTP Import is running, when I try to trigger a re-import for a portfolio, then I see a message "Cannot re-import while SFTP import is in progress"

### Error Handling
- [ ] Given the SFTP folder is not accessible, when I trigger SFTP Import, then I see an error message "Unable to access SFTP folder. Please check configuration."
- [ ] Given no files are found in the SFTP folder, when SFTP Import completes, then I see a message "No new files found in SFTP folder"
- [ ] Given the API fails during re-import, when the error occurs, then I see an error message "Re-import failed. Please try again or contact support."
- [ ] Given the export API fails, when I try to export status, then I see an error message "Unable to export status. Please try again."

## API Endpoints (from OpenAPI spec)

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/sftp-import` | Import files from SFTP folder into system |
| POST | `/file-reimport/{PortfolioId}?ReportBatchId={id}` | Re-import all files for a specific portfolio |

**Response for SFTP Import (200):**
```typescript
{
  Message: string, // "Files have successfully been imported"
  ImportedCount: number,
  FailedCount: number
}
```

**Response for Re-import (200):**
```typescript
{
  Message: string // "File re-import successful"
}
```

**Note:** Export functionality likely requires a separate endpoint or client-side CSV/Excel generation from the existing data.

## Implementation Notes

- Enhance Portfolio Files (Story 1) and Other Files (Story 2) pages
- Add "SFTP Import", "Export Status", and "Re-import [Portfolio]" buttons
- Use Shadcn UI components: Button, Dialog (for confirmations), Alert (for status messages)
- Create API client functions in `web/src/lib/api/files.ts`:
  - `triggerSftpImport()` - trigger SFTP import
  - `reimportPortfolioFiles(portfolioId: number, reportBatchId: number)` - re-import portfolio files
- For SFTP Import:
  - Show confirmation dialog before triggering
  - Display loading state on button during import
  - Consider long-running operation patterns (polling or WebSocket for status updates)
  - Automatically refresh file status matrix/list after completion
- For Re-import Portfolio:
  - Show confirmation dialog
  - Disable re-import button for that portfolio during operation
  - Update status indicators for that portfolio's files in real-time
- For Export Status:
  - Option 1: Create a client-side Excel export using `xlsx` library from the fetched data
  - Option 2: Call a backend endpoint if one is available (check with backend team)
  - Include all visible data in the export with current timestamp
- Progress tracking:
  - Use React Query with polling (every 5-10 seconds) during "Busy" operations
  - Or implement WebSocket connection for real-time updates
  - Show toast notifications for completion/failure
- Prevent concurrent operations:
  - Track operation state (e.g., `isSftpImportRunning`, `reimportingPortfolios: Set<number>`)
  - Disable buttons during operations
  - Clear state on completion or error
- Consider implementing a "View Import Log" link to show detailed import history
