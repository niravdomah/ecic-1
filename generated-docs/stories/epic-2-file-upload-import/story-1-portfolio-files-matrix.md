# Story: Portfolio Files Matrix Dashboard

**Epic:** File Upload & Import Management
**Story:** 1 of 6
**Wireframe:** `../../wireframes/screen-2-portfolio-file-upload.md`

## User Story

**As an** operations user
**I want** to see a matrix view of all portfolio files organized by portfolio and file type
**So that** I can quickly identify which files are uploaded, which are missing, and which have issues

## Acceptance Criteria

### Happy Path - View Matrix
- [ ] Given I navigate to File Import section, when I select "Portfolio Files", then I see a grid matrix with portfolios as rows and file types as columns
- [ ] Given I view the matrix, when I look at the columns, then I see file types: Holdings, Transactions, Instrument Static, Income, Cash, Performance, Management Fees
- [ ] Given I view the matrix, when I look at the rows, then I see all active portfolios (e.g., Portfolio A, Portfolio B, Portfolio C, Sanlam)
- [ ] Given a file has been uploaded successfully, when I view its cell, then I see a green checkmark icon [✓] with status "Complete"
- [ ] Given a file is being processed, when I view its cell, then I see a yellow dot icon [●] with status "Busy"
- [ ] Given a file has not been uploaded, when I view its cell, then I see a red warning icon [⚠] with status "Missing"
- [ ] Given a file validation has failed, when I view its cell, then I see a red X icon [✗] with status "Failed"

### Status Icons are Clickable
- [ ] Given I view a status icon in the matrix, when I click on it, then a file upload modal opens for that specific portfolio and file type
- [ ] Given I click a status icon for "Portfolio A - Holdings", when the modal opens, then it shows file details for Portfolio A's Holdings file

### Current Report Batch Display
- [ ] Given the matrix loads, when I view the page header, then I see the current report batch (e.g., "Report Batch: March 2024")
- [ ] Given no active report batch exists, when I navigate to Portfolio Files, then I see a message "No active report batch. Please create a batch first."

### Status Summary Bar
- [ ] Given files exist in the matrix, when I view the bottom of the page, then I see a status summary showing: Total Files, Complete, In Progress, Missing, Failed
- [ ] Given the matrix shows 35 total files with 24 complete, when I view the summary, then I see "Total Files: 35 | Complete: 24 | In Progress: X | Missing: Y | Failed: Z"

### Legend Display
- [ ] Given I view the Portfolio Files page, when I scroll down, then I see a legend explaining the status icons: [✓] Complete, [●] Busy, [⚠] Missing, [✗] Failed

### Refresh Functionality
- [ ] Given I am viewing the matrix, when I click the "Refresh" button, then the page reloads the file status from the API
- [ ] Given files are being processed, when I refresh the page, then the status updates to reflect current state

### Actions Column
- [ ] Given I view the matrix, when I look at the rightmost column, then I see "Actions" with a "Re-import [Portfolio Name]" button for each portfolio

### Error Handling
- [ ] Given the API fails to load portfolio files, when the page loads, then I see an error message "Unable to load portfolio files. Please try again."
- [ ] Given the API returns no portfolios, when the page loads, then I see "No portfolios configured for this report batch."

## API Endpoints (from OpenAPI spec)

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/portfolio-files?ReportMonth={month}&ReportYear={year}` | Get all portfolio files with status for the current report batch |
| GET | `/configurations` | Get current report batch information (ReportBatchId, ReportDate, ReportMonth, ReportYear) |

**Response for `/portfolio-files`:**
```typescript
{
  Portfolios: [
    {
      PortfolioId: number,
      PortfolioName: string,
      Files: [
        {
          FileTypeId: number,
          FileType: string,
          FileLogId: number,
          Status: string, // "Complete" | "Busy" | "Missing" | "Failed"
          FileName: string,
          UploadedAt: string,
          UploadedBy: string
        }
      ]
    }
  ]
}
```

## Implementation Notes

- Create page at `/file-import/portfolio-files`
- Use Shadcn UI components: Table, Badge, Button, Card
- Create API client functions in `web/src/lib/api/files.ts`:
  - `getPortfolioFiles(reportMonth: string, reportYear: number)` - fetches portfolio file matrix data
  - `getCurrentBatchInfo()` - fetches current batch details from `/configurations`
- File type columns (in order):
  1. Holdings
  2. Transactions
  3. Instrument Static
  4. Income
  5. Cash
  6. Performance
  7. Management Fees
- Status icon mapping:
  - "Complete" → Green badge with ✓ icon
  - "Busy" → Yellow badge with ● icon
  - "Missing" → Red badge with ⚠ icon
  - "Failed" → Red badge with ✗ icon
- Make each status icon/cell clickable (opens File Upload Modal - Story 3)
- Pass portfolio and file type context when opening modal
- Calculate status summary from the returned data:
  - Total Files = count of all file cells in matrix
  - Complete = count where Status === "Complete"
  - In Progress = count where Status === "Busy"
  - Missing = count where Status === "Missing"
  - Failed = count where Status === "Failed"
- Add "Refresh" button that refetches data from API
- Consider using React Query for automatic polling (e.g., every 30 seconds) when files are in "Busy" state
- The "Re-import [Portfolio]" button functionality will be implemented in Story 5
