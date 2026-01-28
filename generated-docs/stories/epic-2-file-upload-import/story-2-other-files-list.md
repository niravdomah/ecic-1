# Story: Other Files List Dashboard

**Epic:** File Upload & Import Management
**Story:** 2 of 6
**Wireframe:** `../../wireframes/screen-3-other-file-upload.md`

## User Story

**As an** operations user
**I want** to see a list of non-portfolio-specific files (index data, Bloomberg feeds, custodian files)
**So that** I can monitor the upload status of reference data files required for the reporting cycle

## Acceptance Criteria

### Happy Path - View List
- [ ] Given I navigate to File Import section, when I select "Other Files", then I see a list of file types/sources with their current status
- [ ] Given I view the list, when I look at the columns, then I see: File Type / Source, File Format, Status
- [ ] Given I view the list, when I look at the rows, then I see file types: Monthly Index Files, Bloomberg Credit Ratings, Bloomberg Holdings, Custodian Holdings, Custodian Transactions, Custodian Cash, Custodian Fees
- [ ] Given a file has been uploaded successfully, when I view its row, then I see a green badge [✓ Complete] with the uploaded filename displayed below
- [ ] Given a file is being processed, when I view its row, then I see a yellow badge [● Busy] with text "Processing..."
- [ ] Given a file has not been uploaded, when I view its row, then I see a red badge [⚠ Missing] with text "Not uploaded"
- [ ] Given a file validation has failed, when I view its row, then I see a red badge [✗ Failed] with text "Validation errors"

### View Details Action
- [ ] Given I view any file row, when I click the "View Details" button, then a file upload modal opens for that specific file type/source
- [ ] Given I click "View Details" for "Monthly Index Files", when the modal opens, then it shows file details for Monthly Index Files

### Current Report Batch Display
- [ ] Given the list loads, when I view the page header, then I see the current report batch (e.g., "Report Batch: March 2024")
- [ ] Given no active report batch exists, when I navigate to Other Files, then I see a message "No active report batch. Please create a batch first."

### Status Summary Bar
- [ ] Given files exist in the list, when I view the bottom of the page, then I see a status summary showing: Total Files, Complete, In Progress, Missing, Failed
- [ ] Given the list shows 7 total files with 4 complete, when I view the summary, then I see "Total Files: 7 | Complete: 4 | In Progress: X | Missing: Y | Failed: Z"

### Legend Display
- [ ] Given I view the Other Files page, when I scroll down, then I see a legend explaining the status icons: [✓] Complete, [●] Busy, [⚠] Missing, [✗] Failed

### File Name Display
- [ ] Given a file has been successfully uploaded, when I view its row, then I see the uploaded filename (e.g., "2024-03-Index.xlsx")
- [ ] Given a file has not been uploaded, when I view its row, then no filename is displayed

### Refresh Functionality
- [ ] Given I am viewing the list, when I click the "Refresh" button, then the page reloads the file status from the API
- [ ] Given files are being processed, when I refresh the page, then the status updates to reflect current state

### Error Handling
- [ ] Given the API fails to load other files, when the page loads, then I see an error message "Unable to load file information. Please try again."
- [ ] Given the API returns no files, when the page loads, then I see "No files configured for this report batch."

## API Endpoints (from OpenAPI spec)

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/other-files?ReportMonth={month}&ReportYear={year}` | Get all other files with status for the current report batch |
| GET | `/configurations` | Get current report batch information |

**Response for `/other-files`:**
```typescript
{
  Files: [
    {
      FileType: string, // "Monthly Index Files", "Bloomberg Credit Ratings", etc.
      FileSource: string, // "External", "Bloomberg", "Custodian"
      FileFormat: string, // "Excel", "CSV"
      FileLogId: number,
      Status: string, // "Complete" | "Busy" | "Missing" | "Failed"
      FileName: string,
      UploadedAt: string,
      UploadedBy: string,
      FileSettingId: number
    }
  ]
}
```

## Implementation Notes

- Create page at `/file-import/other-files` (or use tabs on the same File Import page)
- Use Shadcn UI components: Table, Badge, Button, Card
- Create API client functions in `web/src/lib/api/files.ts`:
  - `getOtherFiles(reportMonth: string, reportYear: number)` - fetches other files list data
- File types to display (in order):
  1. Monthly Index Files (Excel)
  2. Bloomberg Credit Ratings (CSV)
  3. Bloomberg Holdings (CSV)
  4. Custodian Holdings (Excel) - may have multiple entries by currency
  5. Custodian Transactions (Excel)
  6. Custodian Cash (Excel)
  7. Custodian Fees (Excel)
- Status badge mapping (same as Portfolio Files):
  - "Complete" → Green badge with ✓ icon + filename display
  - "Busy" → Yellow badge with ● icon + "Processing..."
  - "Missing" → Red badge with ⚠ icon + "Not uploaded"
  - "Failed" → Red badge with ✗ icon + "Validation errors"
- Make "View Details" button in each row clickable (opens File Upload Modal - Story 3)
- Pass file type, source, and format context when opening modal
- Calculate status summary from the returned data
- Add "Refresh" button that refetches data from API
- Consider using React Query for automatic polling when files are in "Busy" state
- The "SFTP Import" button functionality will be implemented in Story 5
- Consider using tabs to switch between "Portfolio Files" and "Other Files" views on the same page
