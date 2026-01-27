# Screen: Portfolio File Upload

## Purpose

Provides a matrix view of all portfolio files organized by portfolio (rows) and file type (columns), enabling quick identification of file upload status and management actions.

## Wireframe

```
+-------------------------------------------------------------------------+
|  InvestInsight                           [User Profile v]   [Logout]   |
+-------------------------------------------------------------------------+
|  Home | File Import | Data Check | Maintenance | Approvals | Logs      |
+-------------------------------------------------------------------------+
|                                                                         |
|  Portfolio File Uploads                  Report Batch: March 2024      |
|                                                                         |
|  [SFTP Import]  [Re-import All]  [Export Status]        [Refresh ↻]   |
|                                                                         |
|  +------------------------------------------------------------------+   |
|  | Portfolio        | Holdings | Trans | Instr | Income | Cash  ... |  |
|  |                  |          | act   | Static|        |           |  |
|  |------------------|----------|-------|-------|--------|-----------|  |
|  | Portfolio A      | [●]      | [●]   | [●]   | [⚠]    | [✓]       |  |
|  |                  | Complete | Busy  | Failed| Missing| Complete  |  |
|  |------------------|----------|-------|-------|--------|-----------|  |
|  | Portfolio B      | [✓]      | [✓]   | [✓]   | [✓]    | [✓]       |  |
|  |                  | Complete | Comp  | Comp  | Comp   | Complete  |  |
|  |------------------|----------|-------|-------|--------|-----------|  |
|  | Portfolio C      | [⚠]      | [⚠]   | [⚠]   | [⚠]    | [⚠]       |  |
|  |                  | Missing  | Miss  | Miss  | Miss   | Missing   |  |
|  |------------------|----------|-------|-------|--------|-----------|  |
|  | Sanlam           | [●]      | [✓]   | [✓]   | [✓]    | [✓]       |  |
|  |                  | Busy     | Comp  | Comp  | Comp   | Complete  |  |
|  +------------------------------------------------------------------+   |
|                                                                         |
|  ... Performance | Mgmt Fees | Actions                                 |
|  |---------------|-----------|----------------------------------------|  |
|  | [✓]           | [✓]       | [Re-import Portfolio A]               |  |
|  | Complete      | Complete  |                                        |  |
|  |---------------|-----------|----------------------------------------|  |
|  | [✓]           | [✓]       | [Re-import Portfolio B]               |  |
|  | Complete      | Complete  |                                        |  |
|  |---------------|-----------|----------------------------------------|  |
|  | [⚠]           | [⚠]       | [Re-import Portfolio C]               |  |
|  | Missing       | Missing   |                                        |  |
|  |---------------|-----------|----------------------------------------|  |
|  | [✓]           | [✓]       | [Re-import Sanlam]                    |  |
|  | Complete      | Complete  |                                        |  |
|  +------------------------------------------------------------------+   |
|                                                                         |
|  Legend:                                                                |
|  [✓] Complete   [●] Busy   [⚠] Missing   [✗] Failed                   |
|                                                                         |
|  Status Summary:  Total Files: 35  |  Complete: 24  |  In Progress: 3  |
|                   Missing: 6  |  Failed: 2                              |
|                                                                         |
+-------------------------------------------------------------------------+
```

## Elements

| Element | Type | Description |
|---------|------|-------------|
| SFTP Import | Button | Trigger automatic import from SFTP folder |
| Re-import All | Button | Re-import all portfolio files |
| Export Status | Button | Export file status matrix to Excel |
| Refresh | Button | Refresh status display |
| Status Icons | Clickable Icons | Color-coded file status (click to open modal) |
| Re-import Portfolio | Button | Re-import all files for specific portfolio |
| Status Summary | Summary Bar | Overall file upload statistics |

## User Actions

- **Click Status Icon**: Opens file upload modal for that specific file type and portfolio
- **SFTP Import**: Triggers backend to import files from configured SFTP location
- **Re-import Portfolio**: Re-imports all files for a specific portfolio
- **Re-import All**: Re-imports all portfolio files across all portfolios
- **Export Status**: Downloads current status matrix to Excel
- **Refresh**: Reloads status from backend

## Navigation

- **From:** Start Page → Quick Actions → Portfolio Files or Top Nav → File Import
- **To:** File Upload Modal (click any status icon)

## Status Icon Behavior

| Status | Icon | Color | Description |
|--------|------|-------|-------------|
| Missing | [⚠] | Red | File not uploaded yet |
| Busy | [●] | Yellow | File being processed/validated |
| Failed | [✗] | Red | Validation failed |
| Complete | [✓] | Green | Successfully uploaded and validated |

## API Endpoints Used

- GET `/portfolio-files?ReportMonth={month}&ReportYear={year}` - Get all portfolio files status
- POST `/sftp-import` - Import files from SFTP
- POST `/file-reimport/{PortfolioId}?ReportBatchId={id}` - Re-import portfolio files
