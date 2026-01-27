# Screen: Process Logs

## Purpose

View file processing, monthly workflow execution, and calculation logs for debugging and operational evidence.

## Wireframe

```
+-------------------------------------------------------------------------+
|  InvestInsight                           [User Profile v]   [Logout]   |
+-------------------------------------------------------------------------+
|  Home | File Import | Data Check | Maintenance | Approvals | Logs      |
+-------------------------------------------------------------------------+
|                                                                         |
|  Process Logs                            Report Batch: March 2024      |
|                                                                         |
|  ┌─────────────────────────────────────────────────────────────────┐   |
|  │ [File Process Logs] | [Monthly Process Logs] | [Calculation Logs]│  |
|  └─────────────────────────────────────────────────────────────────┘   |
|                                                                         |
|  File Process Logs                                                      |
|                                                                         |
|  [Export Logs ↓]  [Filter by Status: All v]              [Refresh ↻]   |
|                                                                         |
|  +------------------------------------------------------------------+   |
|  | File Name                  | Workflow         | Status  | Records |  |
|  |                            | Activity         |         | Count   |  |
|  |----------------------------|------------------|---------|---------|  |
|  | 202403_PortA_Holdings.csv  | FileValidation   | Complete| 1,234   |  |
|  | Uploaded: 2024-03-15 14:32                                        |  |
|  | Finished: 2024-03-15 14:33                                        |  |
|  | Duration: 1m 15s                              [View Details]     |  |
|  |----------------------------|------------------|---------|---------|  |
|  | 202403_PortA_Trans.csv     | FileValidation   | Complete| 856     |  |
|  | Uploaded: 2024-03-15 14:28                                        |  |
|  | Finished: 2024-03-15 14:29                                        |  |
|  | Duration: 45s                                 [View Details]     |  |
|  |----------------------------|------------------|---------|---------|  |
|  | 202403_PortB_Holdings.csv  | FileValidation   | Failed  | 0       |  |
|  | Uploaded: 2024-03-14 11:22                                        |  |
|  | Failed: 2024-03-14 11:23                                          |  |
|  | Error: Format validation failed               [View Errors]      |  |
|  |----------------------------|------------------|---------|---------|  |
|  | 202403_Index_Prices.xlsx   | FileImport       | Complete| 23      |  |
|  | Uploaded: 2024-03-15 09:15                                        |  |
|  | Finished: 2024-03-15 09:16                                        |  |
|  | Duration: 22s                                 [View Details]     |  |
|  +------------------------------------------------------------------+   |
|                                                                         |
|  Showing 1-4 of 52 file logs                 [< Prev] [Next >]         |
|                                                                         |
+-------------------------------------------------------------------------+

MONTHLY PROCESS LOGS TAB:
+-------------------------------------------------------------------------+
|  Monthly Process Logs                    Report Batch: March 2024      |
|                                                                         |
|  Workflow Execution Timeline                                            |
|                                                                         |
|  [Export Timeline ↓]                                     [Refresh ↻]   |
|                                                                         |
|  +------------------------------------------------------------------+   |
|  | Event Name                    | Executed At         | Activity    |  |
|  |-------------------------------|---------------------|-------------|  |
|  | CreateReportBatch             | 2024-03-31 08:00:00 | Complete    |  |
|  |-------------------------------|---------------------|-------------|  |
|  | PrepareData                   | 2024-03-31 08:05:15 | Complete    |  |
|  | Last Activity: DataValidation                                     |  |
|  |-------------------------------|---------------------|-------------|  |
|  | RunCalculations               | 2024-03-31 14:30:22 | Complete    |  |
|  | Last Activity: CalculatePerformance                               |  |
|  | Duration: 2h 15m 45s                                              |  |
|  |-------------------------------|---------------------|-------------|  |
|  | PublishDraftReports           | 2024-03-31 16:48:12 | Complete    |  |
|  | Last Activity: GenerateReports                                    |  |
|  |-------------------------------|---------------------|-------------|  |
|  | ApproveFirstLevel             | Pending             | Not Started |  |
|  |-------------------------------|---------------------|-------------|  |
|  | ApproveSecondLevel            | -                   | Not Started |  |
|  |-------------------------------|---------------------|-------------|  |
|  | ApproveThirdLevel             | -                   | Not Started |  |
|  |-------------------------------|---------------------|-------------|  |
|  | PublishFinalReports           | -                   | Not Started |  |
|  +------------------------------------------------------------------+   |
|                                                                         |
|  Overall Duration: 8h 48m 12s (so far)                                  |
|                                                                         |
+-------------------------------------------------------------------------+

CALCULATION LOGS TAB:
+-------------------------------------------------------------------------+
|  Calculation Logs                        Report Batch: March 2024      |
|                                                                         |
|  Calculation Error Count: 0                                             |
|                                                                         |
|  [Export Logs ↓]  [Filter: All v]  [Show Errors Only]   [Refresh ↻]   |
|                                                                         |
|  +------------------------------------------------------------------+   |
|  | Calculation Name           | Status   | Start Time  | Duration   |  |
|  |----------------------------|----------|-------------|------------|  |
|  | CalculateHoldingValues     | Complete | 14:30:22    | 5m 12s     |  |
|  | Errors: 0                                          [View Logs]   |  |
|  |----------------------------|----------|-------------|------------|  |
|  | CalculateTransactionImpact | Complete | 14:35:34    | 3m 45s     |  |
|  | Errors: 0                                          [View Logs]   |  |
|  |----------------------------|----------|-------------|------------|  |
|  | CalculatePerformance       | Complete | 14:39:19    | 12m 23s    |  |
|  | Errors: 0                                          [View Logs]   |  |
|  |----------------------------|----------|-------------|------------|  |
|  | CalculateRiskMetrics       | Complete | 14:51:42    | 8m 34s     |  |
|  | Errors: 0                                          [View Logs]   |  |
|  |----------------------------|----------|-------------|------------|  |
|  | CalculateBenchmarkTracking | Complete | 15:00:16    | 4m 18s     |  |
|  | Errors: 0                                          [View Logs]   |  |
|  +------------------------------------------------------------------+   |
|                                                                         |
|  Showing 1-5 of 15 calculations              [< Prev] [Next >]         |
|                                                                         |
+-------------------------------------------------------------------------+

CALCULATION ERROR DETAILS DIALOG:
+-----------------------------------------------------------------------+
|  Calculation Errors: CalculatePerformance                       [X]   |
+-----------------------------------------------------------------------+
|                                                                       |
|  Calculation: CalculatePerformance                                    |
|  Status: Failed                                                       |
|  Start Time: 2024-03-31 14:39:19                                      |
|  End Time: 2024-03-31 14:42:34                                        |
|  Duration: 3m 15s                                                     |
|                                                                       |
|  Errors Found: 3                                                      |
|                                                                       |
|  +----------------------------------------------------------------+   |
|  | Error # | Prefix           | Full Error Message               |  |
|  |---------|------------------|----------------------------------|  |
|  | 1       | Portfolio A      | Division by zero: Missing base   |  |
|  |         |                  | value for instrument ZAE000123   |  |
|  |         |                  | - Check holding records          |  |
|  |---------|------------------|----------------------------------|  |
|  | 2       | Portfolio B      | Index price missing: MSCI EM     |  |
|  |         |                  | required for benchmark calc      |  |
|  |         |                  | - Add index price before retry   |  |
|  |---------|------------------|----------------------------------|  |
|  | 3       | Overall          | Currency conversion failed: USD  |  |
|  |         |                  | exchange rate not found for date |  |
|  |         |                  | - Check FX rates table           |  |
|  +----------------------------------------------------------------+   |
|                                                                       |
|  [Export Errors ↓]  [Close]                                           |
|                                                                       |
+-----------------------------------------------------------------------+
```

## Elements

| Element | Type | Description |
|---------|------|-------------|
| Tab Navigation | Tabs | Switch between File, Monthly, and Calculation logs |
| Export Logs | Button | Download logs to Excel |
| Filter by Status | Dropdown | Filter logs by status (All/Complete/Failed/In Progress) |
| Show Errors Only | Toggle | Filter to show only failed calculations |
| Refresh | Button | Reload logs from backend |
| View Details | Button | Open detailed log view |
| View Errors | Button | Open error details dialog |
| View Logs | Button | Open calculation execution details |

## User Actions

- **Switch Tabs**: View different categories of logs
- **View Details**: Drill into specific log entry details
- **View Errors**: Open error details for failed operations
- **Export Logs**: Download logs for offline analysis
- **Filter**: Show only specific status or error logs
- **Refresh**: Reload logs from backend

## File Process Log Details

Shows each file's journey through the system:
- Upload timestamp and user
- Workflow execution status
- Record count processed
- Duration of processing
- Validation errors (if any)
- Workflow instance ID for debugging

## Monthly Process Log Details

Records end-to-end workflow execution:
- Sequential workflow events
- Execution timestamps
- Last executed activity name
- Overall duration
- Current workflow position

## Calculation Log Details

Tracks each calculation execution:
- Calculation name and purpose
- Execution status (Complete/Failed/In Progress)
- Start time and duration
- Error count
- Detailed error messages with context

## Error Display Format

Errors are displayed with:
- **Error Prefix**: Identifies affected portfolio or entity
- **Full Error Message**: Complete error description
- **Suggested Fix**: Actionable resolution steps
- **Context**: Related data (instrument IDs, dates, etc.)

## Navigation

- **From:** Start Page, Approval screens (View Logs), or Top Nav → Logs
- **To:** Error details dialog (modal)

## Access Control

All authenticated users can view process logs. No write access available from UI.

## API Endpoints Used

### File Process Logs
- GET `/process-logs?ReportBatchId={id}` - Get all file process logs (FileImporter API)

### Monthly Process Logs
- GET `/process-logs?ReportBatchId={id}` - Get monthly process logs (Monthly API)
- GET `/report-batches` - Get report batch status

### Calculation Logs
- GET `/calculation-log` - Get all calculation logs
- GET `/calculation-log-error-count` - Get error count
- GET `/calculation-log-error/{CalculationLogId}` - Get errors for specific calculation
