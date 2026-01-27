# Screen: File Upload Modal

## Purpose

Popup modal for uploading, viewing status, and managing individual files. Accessible by clicking status icons in Portfolio or Other File Upload screens.

## Wireframe

```
+-----------------------------------------------------------------------+
|  File Details: Holdings - Portfolio A                          [X]   |
+-----------------------------------------------------------------------+
|                                                                       |
|  Current Status: [✗ Failed]                      Last Update: 14:32  |
|                                                                       |
|  +----------------------------------------------------------------+   |
|  | File Information                                              |   |
|  |---------------------------------------------------------------|   |
|  | File Type:         Holdings                                   |   |
|  | Portfolio:         Portfolio A                                |   |
|  | Expected Pattern:  *_Holdings_*.csv                           |   |
|  | Report Batch:      March 2024                                 |   |
|  | File Setting ID:   1234                                       |   |
|  | File Log ID:       5678                                       |   |
|  +----------------------------------------------------------------+   |
|                                                                       |
|  +----------------------------------------------------------------+   |
|  | Upload History                                                |   |
|  |---------------------------------------------------------------|   |
|  | FileName: 202403_PortfolioA_Holdings.csv                      |   |
|  | Uploaded: 2024-03-15 14:32:15                                 |   |
|  | By: J. Smith                                                  |   |
|  | Status: Failed Validation                                     |   |
|  | File Path: /uploads/2024/03/202403_PortfolioA_Holdings.csv   |   |
|  |                                                               |   |
|  | [Download File]  [View Process Log]                          |   |
|  +----------------------------------------------------------------+   |
|                                                                       |
|  +----------------------------------------------------------------+   |
|  | Validation Errors (12 errors found)                          |   |
|  |---------------------------------------------------------------|   |
|  | Row | Column      | Error                                     |   |
|  |-----|-------------|-------------------------------------------|   |
|  | 23  | MarketValue | Invalid format: Expected numeric          |   |
|  | 24  | ISIN        | Missing value: ISIN is required           |   |
|  | 45  | Units       | Invalid format: Expected numeric          |   |
|  | 67  | MarketValue | Value out of range: Cannot be negative    |   |
|  | ...                                                           |   |
|  |                                           [Export Errors ↓]   |   |
|  +----------------------------------------------------------------+   |
|                                                                       |
|  +----------------------------------------------------------------+   |
|  | Upload New File                                               |   |
|  |---------------------------------------------------------------|   |
|  | [ Drag and drop file here or click to browse ]               |   |
|  |                                                               |   |
|  | Selected: [No file selected]                                  |   |
|  |                                                               |   |
|  | User: [J. Smith                               v]              |   |
|  +----------------------------------------------------------------+   |
|                                                                       |
|  [Upload File]  [Retry Validation]  [Cancel File]  [Close]          |
|                                                                       |
+-----------------------------------------------------------------------+
```

## Elements

| Element | Type | Description |
|---------|------|-------------|
| Status Badge | Badge | Current file status (Complete/Busy/Failed/Missing) |
| File Information | Info Panel | Displays file metadata and settings |
| Upload History | Info Panel | Shows previously uploaded file details |
| Download File | Button | Downloads the uploaded file |
| View Process Log | Button | Opens detailed workflow process log |
| Validation Errors | Table | Lists all validation errors with row/column details |
| Export Errors | Button | Downloads error list to CSV |
| File Upload Zone | Dropzone | Drag-and-drop or click to browse file upload |
| User Selector | Dropdown | Select user uploading the file |
| Upload File | Button | Submit file upload |
| Retry Validation | Button | Re-run validation on existing file |
| Cancel File | Button | Cancel/delete the file from system |
| Close | Button | Close modal |

## User Actions

- **Upload File**: Select file and submit upload (triggers validation workflow)
- **Download File**: Download previously uploaded file
- **View Process Log**: Navigate to detailed workflow execution log
- **Export Errors**: Download validation errors to CSV for correction
- **Retry Validation**: Re-run validation after fixing source file
- **Cancel File**: Deactivate and delete file from staging table
- **Close**: Close modal and return to file list

## Validation Error Display

Errors are grouped by severity:
- **Critical**: Prevents file processing (red)
- **Warning**: Allows processing but may affect calculations (yellow)
- **Info**: Informational messages (blue)

Each error shows:
- Row number in source file
- Column name
- Error description
- Suggested fix (where applicable)

## API Endpoints Used

- GET `/portfolio-file?ReportMonth={month}&ReportYear={year}&PortfolioId={id}&FileTypeId={id}` - Get file details
- GET `/other-file?ReportMonth={month}&ReportYear={year}&FileType={type}&FileSource={source}&FileFormat={format}` - Get other file details
- POST `/file/upload?FileSettingId={id}&FilelogId={id}&FileName={name}&User={user}&ReportBatchId={id}` - Upload file
- GET `/file?FilePath={path}` - Export/download file
- POST `/file?FileLogId={id}&FileSettingId={id}&FileFormatId={id}` - Retry validation
- DELETE `/file?FileLogId={id}&FileSettingId={id}&ReportBatchId={id}` - Cancel file
- GET `/file/faults?FileLogId={id}` - Get file validation errors
- GET `/process-logs?ReportBatchId={id}` - Get process logs

## State-Based Access

| Workflow State | Upload | Retry | Cancel | View |
|----------------|--------|-------|--------|------|
| Data Preparation | Yes | Yes | Yes | Yes |
| First Approval | No | No | No | Yes |
| Second Approval | No | No | No | Yes |
| Final Approval | No | No | No | Yes |
| Complete | No | No | No | Yes |
