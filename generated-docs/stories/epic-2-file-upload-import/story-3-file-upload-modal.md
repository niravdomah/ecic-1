# Story: File Upload Modal

**Epic:** File Upload & Import Management
**Story:** 3 of 6
**Wireframe:** `../../wireframes/screen-4-file-upload-modal.md`

## User Story

**As an** operations user
**I want** a modal dialog to upload files and view file status details
**So that** I can manage individual file uploads, view upload history, and take actions on specific files

## Acceptance Criteria

### Happy Path - Open Modal
- [ ] Given I am on the Portfolio Files or Other Files page, when I click a status icon or "View Details" button, then a modal opens showing file details
- [ ] Given the modal opens, when I view the header, then I see the file description (e.g., "File Details: Holdings - Portfolio A" or "File Details: Monthly Index Files")
- [ ] Given the modal is open, when I click the [X] close button or "Close" button, then the modal closes

### File Information Display
- [ ] Given the modal opens, when I view the File Information section, then I see: File Type, Portfolio (for portfolio files only), Expected Pattern, Report Batch, File Setting ID, File Log ID
- [ ] Given I view File Information, when the expected file pattern is defined, then I see it displayed (e.g., "*_Holdings_*.csv")

### Current Status Display
- [ ] Given the modal opens, when I view the top section, then I see the current status with a colored badge (Complete/Busy/Failed/Missing)
- [ ] Given the file has a status, when I view the status section, then I see the last update timestamp (e.g., "Last Update: 14:32")

### Upload History Display
- [ ] Given a file has been uploaded previously, when I view the Upload History section, then I see: FileName, Uploaded timestamp, Uploaded by (user), Status, File Path
- [ ] Given no file has been uploaded, when I view the Upload History section, then I see "No file uploaded yet"
- [ ] Given a file has been uploaded, when I view the Upload History section, then I see a "Download File" button
- [ ] Given I click "Download File", when the button is clicked, then the file downloads to my computer

### Upload New File
- [ ] Given the modal is open, when I view the Upload New File section, then I see a drag-and-drop zone with text "Drag and drop file here or click to browse"
- [ ] Given I drag a file over the upload zone, when I drop it, then the file is selected and the filename displays in "Selected: [filename]"
- [ ] Given I click the upload zone, when the file browser opens and I select a file, then the filename displays in "Selected: [filename]"
- [ ] Given a file is selected, when I view the User dropdown, then I see the current user pre-selected
- [ ] Given a file is selected, when I click "Upload File", then the file uploads and I see a loading indicator on the button
- [ ] Given the upload is successful, when the API returns success, then I see a success message "File uploaded successfully" and the Upload History updates
- [ ] Given the upload fails, when the API returns an error, then I see an error message "File upload failed: [error message]"

### Retry Validation
- [ ] Given a file has been uploaded, when I click "Retry Validation", then the system re-runs validation on the existing file
- [ ] Given retry validation is triggered, when the process starts, then I see a loading indicator
- [ ] Given retry validation completes, when it succeeds, then the status updates to "Complete" or remains "Failed" if errors still exist
- [ ] Given retry validation completes, when it fails, then I see updated validation errors in the modal (Story 4)

### Cancel File
- [ ] Given a file has been uploaded, when I click "Cancel File", then I see a confirmation dialog "Are you sure you want to cancel this file?"
- [ ] Given I confirm cancellation, when the API call succeeds, then the file is removed from the system and the status changes to "Missing"
- [ ] Given I cancel the confirmation, when I click "No" in the dialog, then the modal remains open and no action is taken

### View Process Log
- [ ] Given a file has been uploaded, when I click "View Process Log", then I am navigated to the Process Logs page filtered for this file

### Modal Button State
- [ ] Given no file is selected, when I view the "Upload File" button, then it is disabled
- [ ] Given a file is being uploaded, when the upload is in progress, then the "Upload File" button shows a loading state and is disabled
- [ ] Given the workflow is not in Data Preparation phase, when I view the modal, then the "Upload File", "Retry Validation", and "Cancel File" buttons are disabled (read-only mode - Story 6)

### Error Handling
- [ ] Given the API fails to load file details, when the modal opens, then I see an error message "Unable to load file details. Please try again."
- [ ] Given I try to upload a file larger than 100MB, when I select it, then I see a validation error "File size exceeds maximum allowed (100MB)"
- [ ] Given I try to upload a file with an incorrect format, when I select it, then I see a validation error "File format does not match expected pattern"

## API Endpoints (from OpenAPI spec)

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/portfolio-file?ReportMonth={month}&ReportYear={year}&PortfolioId={id}&FileTypeId={id}` | Get portfolio file details |
| GET | `/other-file?ReportMonth={month}&ReportYear={year}&FileType={type}&FileSource={source}&FileFormat={format}` | Get other file details |
| POST | `/file/upload?FileSettingId={id}&FilelogId={id}&FileName={name}&User={user}&ReportBatchId={id}` | Upload file (body: binary file data) |
| GET | `/file?FilePath={path}` | Download/export file |
| POST | `/file?FileLogId={id}&FileSettingId={id}&FileFormatId={id}` | Retry validation for a file |
| DELETE | `/file?FileLogId={id}&FileSettingId={id}&ReportBatchId={id}` | Cancel/delete file |

**Request for Upload:**
- Content-Type: `application/octet-stream`
- Body: Binary file data

**Response for Upload (201):**
```typescript
{
  FileLogId: string
}
```

## Implementation Notes

- Create modal component in `web/src/components/files/FileUploadModal.tsx`
- Use Shadcn UI components: Dialog, Button, Badge, Label, Select, Separator
- Create API client functions in `web/src/lib/api/files.ts`:
  - `getPortfolioFileDetails(...)` - fetch portfolio file details
  - `getOtherFileDetails(...)` - fetch other file details
  - `uploadFile(fileData, metadata)` - upload file with multipart/form-data or binary
  - `downloadFile(filePath)` - download file
  - `retryFileValidation(fileLogId, fileSettingId, fileFormatId)` - retry validation
  - `cancelFile(fileLogId, fileSettingId, reportBatchId)` - cancel/delete file
- For file upload:
  - Use `react-dropzone` or native HTML5 drag-and-drop
  - Validate file size (max 100MB)
  - Validate file format against expected pattern
  - Send file as binary data with `Content-Type: application/octet-stream`
- For file download:
  - Create a blob from the response and trigger browser download
- Modal should be triggered from:
  - Portfolio Files matrix (click status icon)
  - Other Files list (click "View Details" button)
- Pass context props to modal:
  - `fileType` (e.g., "Holdings", "Monthly Index Files")
  - `portfolioId` (for portfolio files only)
  - `portfolioName` (for display)
  - `fileTypeId` (for portfolio files)
  - `fileSource` (for other files)
  - `fileFormat` (for other files)
  - `reportMonth` and `reportYear`
- After successful upload, refresh the parent list/matrix
- Validation errors display will be implemented in Story 4
- State-based access control will be implemented in Story 6
