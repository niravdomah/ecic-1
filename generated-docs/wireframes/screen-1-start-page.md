# Screen: Start Page / Dashboard

## Purpose

The Start Page serves as the high-level entry point for users to create new report batches, monitor current workflow status, and quickly navigate to key functionality.

## Wireframe

```
+-------------------------------------------------------------------------+
|  InvestInsight                           [User Profile v]   [Logout]   |
+-------------------------------------------------------------------------+
|  Home | File Import | Data Check | Maintenance | Approvals | Logs      |
+-------------------------------------------------------------------------+
|                                                                         |
|  Current Report Batch                                                   |
|  +------------------------------------------------------------------+   |
|  |  Report Month: March 2024                                        |   |
|  |  Report Date: 2024-03-31                                         |   |
|  |  Status: [●] Data Preparation                                    |   |
|  |  Workflow Progress:                                              |   |
|  |                                                                  |   |
|  |  [●]────[○]────[○]────[○]────[○]                                |   |
|  |  Created  L1    L2    L3   Complete                              |   |
|  |                                                                  |   |
|  |  [Create New Batch]          [View Batch History]               |   |
|  +------------------------------------------------------------------+   |
|                                                                         |
|  Quick Actions                                                          |
|  +------------------------------------------------------------------+   |
|  |  +--------------------+  +--------------------+                  |   |
|  |  | Portfolio Files    |  | Other Files        |                  |   |
|  |  | Status: 12/15      |  | Status: 3/5        |                  |   |
|  |  | [View →]           |  | [View →]           |                  |   |
|  |  +--------------------+  +--------------------+                  |   |
|  |                                                                  |   |
|  |  +--------------------+  +--------------------+                  |   |
|  |  | Data Confirmation  |  | Instruments        |                  |   |
|  |  | Status: ⚠ Issues   |  | Incomplete: 8      |                  |   |
|  |  | [Check →]          |  | [Fix →]            |                  |   |
|  |  +--------------------+  +--------------------+                  |   |
|  +------------------------------------------------------------------+   |
|                                                                         |
|  Recent Activity                                                        |
|  +------------------------------------------------------------------+   |
|  |  Time      | Event                                    | User       |  |
|  |------------|------------------------------------------|------------|  |
|  |  14:32     | File uploaded: Holdings_Portfolio_A.csv  | J. Smith   |  |
|  |  14:25     | Instrument edited: ISIN ZAE000123456    | A. Johnson |  |
|  |  14:18     | Index price added: ALSI                  | J. Smith   |  |
|  |  14:12     | Credit rating updated: ISIN ZAE000234567| M. Brown   |  |
|  +------------------------------------------------------------------+   |
|                                                                         |
|  Batch History (Last 5 Batches)                                         |
|  +------------------------------------------------------------------+   |
|  |  Date        | Status    | Approved By         | Actions          |  |
|  |--------------|-----------|---------------------|------------------|  |
|  |  2024-02-29  | Complete  | L3: K. Wilson       | [View Details]   |  |
|  |  2024-01-31  | Complete  | L3: K. Wilson       | [View Details]   |  |
|  |  2023-12-31  | Complete  | L3: R. Davis        | [View Details]   |  |
|  +------------------------------------------------------------------+   |
|                                                                         |
+-------------------------------------------------------------------------+
```

## Elements

| Element | Type | Description |
|---------|------|-------------|
| Create New Batch | Button | Initiates new monthly/weekly report batch |
| View Batch History | Button | Opens historical batches view |
| Workflow Progress | Visualization | Shows current position in approval workflow |
| Quick Actions Cards | Cards | Navigate to key screens with status summaries |
| Recent Activity | Table | Shows recent user actions in real-time |
| Batch History | Table | Lists completed batches with details |

## User Actions

- **Create New Batch**: Opens dialog to select report date and type (monthly/weekly)
- **View Quick Actions**: Click cards to navigate to Portfolio Files, Other Files, Data Confirmation, or Instruments
- **View Batch History**: Navigate to historical batch details
- **Monitor Status**: Real-time view of workflow progress and file upload status

## Navigation

- **From:** Login screen or top navigation Home link
- **To:** Any quick action card links to respective screens (File Upload, Data Confirmation, Instruments, etc.)

## API Endpoints Used

- POST `/monthly-runs/{ReportDate}` - Create new batch
- GET `/report-batches` - Get batch history
- GET `/configurations` - Get current batch status
- GET `/process-logs` - Get recent activity
