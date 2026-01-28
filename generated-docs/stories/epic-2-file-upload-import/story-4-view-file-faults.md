# Story: View File Faults and Errors

**Epic:** File Upload & Import Management
**Story:** 4 of 6
**Wireframe:** `../../wireframes/screen-4-file-upload-modal.md`

## User Story

**As an** operations user
**I want** to see detailed validation errors when a file upload fails
**So that** I can identify and fix data quality issues in the source file

## Acceptance Criteria

### Happy Path - View Validation Errors
- [ ] Given a file has validation errors, when I open the file upload modal, then I see a "Validation Errors" section with an error count (e.g., "Validation Errors (12 errors found)")
- [ ] Given validation errors exist, when I view the Validation Errors section, then I see a table with columns: Row, Column, Error
- [ ] Given I view the errors table, when I look at the data, then each error shows: row number in source file, column name, error description
- [ ] Given there are more than 10 errors, when I view the errors table, then I see the first 10 errors with pagination or "Show More" option

### Error Display Details
- [ ] Given an error indicates an invalid format, when I view the error description, then I see helpful text like "Invalid format: Expected numeric"
- [ ] Given an error indicates a missing value, when I view the error description, then I see text like "Missing value: ISIN is required"
- [ ] Given an error indicates a data validation issue, when I view the error description, then I see text like "Value out of range: Cannot be negative"

### Export Errors
- [ ] Given validation errors exist, when I click "Export Errors" button, then a CSV file downloads containing all validation errors
- [ ] Given I download the errors CSV, when I open it, then it contains columns: Row, Column, Error, File Name, Upload Date
- [ ] Given there are no errors, when I view the Validation Errors section, then the "Export Errors" button is disabled

### No Errors State
- [ ] Given a file has been uploaded successfully with no errors, when I view the modal, then the Validation Errors section is not displayed or shows "No validation errors"
- [ ] Given a file has not been uploaded yet, when I view the modal, then the Validation Errors section is not displayed

### Errors After Retry Validation
- [ ] Given I retry validation on a failed file, when the validation completes, then the Validation Errors section updates with the latest errors
- [ ] Given retry validation fixes all errors, when it completes successfully, then the Validation Errors section disappears and status changes to "Complete"
- [ ] Given retry validation still has errors, when it completes, then the updated error list is displayed

### Error Severity Indicators (Optional Enhancement)
- [ ] Given errors have different severity levels, when I view the errors table, then critical errors are highlighted in red, warnings in yellow, and info messages in blue
- [ ] Given I view an error with severity, when I look at the row, then I see a severity icon or badge (Critical/Warning/Info)

### Error Filtering and Search (Optional Enhancement)
- [ ] Given there are many errors, when I use the column filter dropdown, then I can filter errors by specific column name
- [ ] Given I want to find specific errors, when I use the search box, then I can search error descriptions

### Error Handling
- [ ] Given the API fails to load validation errors, when the modal opens, then I see an error message "Unable to load validation errors. Please try again."
- [ ] Given the file has no FileLogId (not uploaded yet), when I try to view errors, then the section shows "No file uploaded yet"

## API Endpoints (from OpenAPI spec)

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/file/faults?FileLogId={id}` | Get all validation errors for a specific file |

**Response for `/file/faults`:**
```typescript
{
  FileFault: [
    {
      FileFaultId: number,
      FileLogId: number,
      RowNumber: number,
      ColumnName: string,
      ErrorCode: string,
      ErrorDescription: string,
      Severity: string, // "Critical" | "Warning" | "Info"
      CreatedAt: string
    }
  ]
}
```

## Implementation Notes

- Enhance the File Upload Modal component created in Story 3
- Add a "Validation Errors" section that conditionally displays when errors exist
- Use Shadcn UI components: Table, Badge, Button, Alert
- Create API client function in `web/src/lib/api/files.ts`:
  - `getFileFaults(fileLogId: string)` - fetch validation errors for a file
- Fetch validation errors when:
  - Modal opens and file status is "Failed"
  - After retry validation completes
- Error table implementation:
  - Display row number, column name, and error description
  - Consider using virtualized scrolling for large error lists
  - Implement pagination if errors exceed 50 rows
- Export errors functionality:
  - Convert error list to CSV format
  - Include metadata: File Name, Upload Date, Report Batch
  - Use browser's download capability to save CSV
- Severity color coding:
  - Critical: Red background or border
  - Warning: Yellow background
  - Info: Blue background
- If no errors exist (file status "Complete" or "Missing"), hide the Validation Errors section entirely
- Consider adding a "Copy Errors" button to copy error list to clipboard for pasting into support tickets
- Link error descriptions to documentation where possible (e.g., "See data validation guide")
