# Story: Data Confirmation Refresh and Export

**Epic:** Data Confirmation & Validation
**Story:** 5 of 5
**Wireframe:** `../../wireframes/screen-5-data-confirmation.md`

## User Story

**As an** operations user
**I want** to refresh data confirmation checks and export completeness reports
**So that** I can see the latest validation status and share reports with stakeholders

## Acceptance Criteria

### Happy Path - Refresh Functionality
- [ ] Given I am on any Data Confirmation tab, when I click the "Refresh" button, then all data on the current tab reloads from the API
- [ ] Given I click Refresh on the Main File Checks tab, when the refresh completes, then the Portfolio Manager Data, Custodian Data, and Bloomberg Holdings tables update with the latest status
- [ ] Given I click Refresh on the Other Checks tab, when the refresh completes, then the Reference Data Completeness table updates with the latest counts
- [ ] Given I refresh the page, when the API call is in progress, then the Refresh button shows a loading spinner and is disabled

### Refresh Button State
- [ ] Given data is currently loading, when I view the Refresh button, then it is disabled with text "Refreshing..."
- [ ] Given the refresh completes successfully, when I view the page, then the Refresh button returns to normal state
- [ ] Given the last refresh was less than 5 seconds ago, when I click Refresh again, then I see a toast message "Data was recently refreshed. Please wait before refreshing again." (rate limiting - optional)

### Auto-Refresh (Optional Enhancement)
- [ ] Given I enable auto-refresh, when I toggle the option, then the page automatically refreshes every 30 seconds
- [ ] Given auto-refresh is enabled, when I view the Refresh button, then I see a toggle "Auto-refresh: ON" with a countdown timer
- [ ] Given I disable auto-refresh, when I toggle it off, then automatic refreshing stops

### Last Updated Timestamp
- [ ] Given data has been loaded, when I view the page header, then I see "Last updated: [timestamp]" (e.g., "Last updated: 2:45 PM")
- [ ] Given I refresh the data, when the refresh completes, then the "Last updated" timestamp updates to the current time
- [ ] Given the data is more than 5 minutes old, when I view the timestamp, then it shows a relative time (e.g., "Last updated: 6 minutes ago")

### Export Functionality - Main File Checks
- [ ] Given I am on the Main File Checks tab, when I click "Export Report", then an Excel file downloads containing the file completeness matrix
- [ ] Given I open the exported Excel file, when I view the content, then it contains sheets: "Portfolio Manager Data", "Custodian Data", "Bloomberg Holdings"
- [ ] Given I view the exported Excel file, when I look at a sheet, then it includes columns: Portfolio, File Type, Status, Last Updated
- [ ] Given the export file downloads, when I view the filename, then it includes the report batch date (e.g., "Data_Confirmation_March_2024.xlsx")

### Export Functionality - Other Checks
- [ ] Given I am on the Other Checks tab, when I click "Export Report", then an Excel file downloads containing the reference data completeness summary
- [ ] Given I open the exported Excel file, when I view the content, then it contains a sheet: "Reference Data Checks"
- [ ] Given I view the exported sheet, when I look at the columns, then it includes: Check Type, Incomplete Count, Status, Details (list of incomplete items)

### Export All Tabs (Combined Export)
- [ ] Given I am on any tab, when I click "Export All" button (if available), then an Excel file downloads containing all data confirmation checks
- [ ] Given I open the combined export file, when I view the content, then it contains separate sheets for: Main File Checks, Other Checks, Issues Summary

### Export During Loading
- [ ] Given data is currently loading, when I click "Export Report", then the Export button is disabled
- [ ] Given the export is generating, when I wait, then I see a loading indicator on the Export button with text "Exporting..."

### Export Success/Failure
- [ ] Given the export completes successfully, when the file downloads, then I see a success toast message "Report exported successfully"
- [ ] Given the export fails, when the error occurs, then I see an error toast message "Failed to export report. Please try again."

### Mark All Complete Button (Optional)
- [ ] Given I am on the Main File Checks tab, when I view the page, then I see a "Mark All Complete" button (for testing/admin purposes)
- [ ] Given I click "Mark All Complete", when the button is clicked, then I see a confirmation dialog "Are you sure you want to mark all checks as complete? This will bypass validation."
- [ ] Given I confirm marking all complete, when the action completes, then all status indicators change to "Complete" (backend marks batch as ready for approval)

### Error Handling - Refresh
- [ ] Given the API fails during refresh, when the error occurs, then I see an error toast message "Failed to refresh data. Please try again."
- [ ] Given the API times out during refresh, when the timeout occurs, then I see an error message "Request timed out. Please check your connection."
- [ ] Given the refresh fails, when I view the page, then the existing data remains visible (does not clear on error)

### Error Handling - Export
- [ ] Given the export API is unavailable, when I click Export, then I see an error message "Export service is currently unavailable. Please try again later."
- [ ] Given there is no data to export, when I click Export, then I see a warning message "No data available to export"

## API Endpoints (from OpenAPI spec)

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/check-file-completeness` | Refresh file completeness checks |
| GET | `/check-main-data-completeness` | Refresh main data completeness |
| GET | `/check-other-data-completeness` | Refresh other data completeness |

**Note:** Export functionality likely requires client-side Excel generation or a dedicated export endpoint. Check with backend team if an export endpoint exists.

## Implementation Notes

- Enhance the Data Confirmation page from Stories 1-4 with Refresh and Export functionality
- Use Shadcn UI components: Button, Toast (for notifications)
- Refresh implementation:
  - Use React Query's `refetch()` method to reload data for the current tab
  - Show loading state on button during refetch
  - Update "Last updated" timestamp after successful refresh
  - Consider implementing rate limiting (debounce) to prevent excessive API calls
- Last updated timestamp:
  - Store timestamp in component state or React Query cache
  - Use a library like `date-fns` for relative time formatting
  - Display in format: "Last updated: X minutes ago" or "Last updated: 2:45 PM"
- Export implementation:
  - Option 1: Client-side Excel generation using `xlsx` library
    - Fetch all data from APIs
    - Convert to Excel format
    - Trigger browser download
  - Option 2: Backend export endpoint (if available)
    - POST request to `/data-confirmation/export` with report batch ID
    - Backend generates Excel file and returns as download
  - Include report metadata: Report Batch, Export Date, Generated By (user)
- Export file structure:
  - Workbook with multiple sheets (one per section)
  - Each sheet has clear headers and formatted data
  - Include summary sheet with issues count and overall status
- Auto-refresh (optional):
  - Use React Query's `refetchInterval` option
  - Add toggle UI to enable/disable
  - Default: disabled (opt-in)
- "Mark All Complete" button:
  - Should be admin-only or require special permissions
  - Add confirmation dialog with warning
  - Backend endpoint: POST `/data-confirmation/mark-complete?reportBatchId={id}`
- Toast notifications:
  - Success: Green toast with checkmark icon
  - Error: Red toast with X icon
  - Info: Blue toast with info icon
- Consider adding a "What's changed?" feature that highlights differences since last refresh
