# Screen: Other File Upload

## Purpose

Manages non-portfolio-specific files such as index data, Bloomberg feeds, and custodian files in a simplified list format.

## Wireframe

```
+-------------------------------------------------------------------------+
|  InvestInsight                           [User Profile v]   [Logout]   |
+-------------------------------------------------------------------------+
|  Home | File Import | Data Check | Maintenance | Approvals | Logs      |
+-------------------------------------------------------------------------+
|                                                                         |
|  Other File Uploads                      Report Batch: March 2024      |
|                                                                         |
|  [SFTP Import]  [Export Status]                         [Refresh ↻]   |
|                                                                         |
|  +------------------------------------------------------------------+   |
|  | File Type / Source            | File Format | Status             |  |
|  |-------------------------------|-------------|---------------------|  |
|  | Monthly Index Files           | Excel       | [✓] Complete        |  |
|  |                               |             | 2024-03-Index.xlsx  |  |
|  |                               |             | [View Details]      |  |
|  |-------------------------------|-------------|---------------------|  |
|  | Bloomberg Credit Ratings      | CSV         | [●] Busy            |  |
|  |                               |             | Processing...       |  |
|  |                               |             | [View Details]      |  |
|  |-------------------------------|-------------|---------------------|  |
|  | Bloomberg Holdings            | CSV         | [✗] Failed          |  |
|  |                               |             | Validation errors   |  |
|  |                               |             | [View Details]      |  |
|  |-------------------------------|-------------|---------------------|  |
|  | Custodian Holdings (ZAR)      | Excel       | [✓] Complete        |  |
|  |                               |             | 2024-03-Cust.xlsx   |  |
|  |                               |             | [View Details]      |  |
|  |-------------------------------|-------------|---------------------|  |
|  | Custodian Transactions (ZAR)  | Excel       | [✓] Complete        |  |
|  |                               |             | 2024-03-Trans.xlsx  |  |
|  |                               |             | [View Details]      |  |
|  |-------------------------------|-------------|---------------------|  |
|  | Custodian Cash (ZAR)          | Excel       | [⚠] Missing         |  |
|  |                               |             | Not uploaded        |  |
|  |                               |             | [View Details]      |  |
|  |-------------------------------|-------------|---------------------|  |
|  | Custodian Fees (ZAR)          | Excel       | [✓] Complete        |  |
|  |                               |             | 2024-03-Fees.xlsx   |  |
|  |                               |             | [View Details]      |  |
|  +------------------------------------------------------------------+   |
|                                                                         |
|  Legend:                                                                |
|  [✓] Complete   [●] Busy   [⚠] Missing   [✗] Failed                   |
|                                                                         |
|  Status Summary:  Total Files: 7  |  Complete: 4  |  In Progress: 1    |
|                   Missing: 1  |  Failed: 1                              |
|                                                                         |
+-------------------------------------------------------------------------+
```

## Elements

| Element | Type | Description |
|---------|------|-------------|
| SFTP Import | Button | Trigger automatic import from SFTP folder |
| Export Status | Button | Export file status list to Excel |
| Refresh | Button | Refresh status display |
| View Details | Button | Opens file upload modal for specific file |
| Status Indicator | Badge | Color-coded status with icon |
| File Name | Text | Displays uploaded file name |

## User Actions

- **View Details**: Opens file upload modal for that specific file type/source
- **SFTP Import**: Triggers backend to import files from configured SFTP location
- **Export Status**: Downloads current status list to Excel
- **Refresh**: Reloads status from backend

## Navigation

- **From:** Start Page → Quick Actions → Other Files or Top Nav → File Import → Other Files Tab
- **To:** File Upload Modal (click View Details)

## File Types Displayed

| File Type | Source | Format | Description |
|-----------|--------|--------|-------------|
| Monthly Index Files | External | Excel | Index price data for reporting period |
| Bloomberg Credit Ratings | Bloomberg | CSV | Credit rating data feed |
| Bloomberg Holdings | Bloomberg | CSV | Holdings data feed |
| Custodian Holdings | Custodian | Excel | Custodian holdings data (by currency) |
| Custodian Transactions | Custodian | Excel | Custodian transaction data |
| Custodian Cash | Custodian | Excel | Custodian cash position data |
| Custodian Fees | Custodian | Excel | Custodian fee data |

## API Endpoints Used

- GET `/other-files?ReportMonth={month}&ReportYear={year}` - Get all other files status
- POST `/sftp-import` - Import files from SFTP
