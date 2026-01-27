# Screen: Approval Workflow (L1, L2, L3)

## Purpose

Three-level sequential approval process with approve/reject capabilities. Rejection at any level returns workflow to Data Preparation phase with mandatory reasons at L3.

## Wireframe

```
+-------------------------------------------------------------------------+
|  InvestInsight                           [User Profile v]   [Logout]   |
+-------------------------------------------------------------------------+
|  Home | File Import | Data Check | Maintenance | Approvals | Logs      |
+-------------------------------------------------------------------------+
|                                                                         |
|  Level 1 Approval                        Report Batch: March 2024      |
|                                          Report Date: 2024-03-31       |
|                                                                         |
|  Workflow Status:                                                       |
|  [●]────────[●]────────[○]────────[○]────────[○]                       |
|  Created   Data Prep    L1        L2        L3      Complete           |
|                                                                         |
|  Current Activity: Approve First Level                                  |
|  Pending Approval By: K. Wilson (Level 1 Approver)                     |
|                                                                         |
|  +------------------------------------------------------------------+   |
|  |  Data Completeness Summary                                       |   |
|  |------------------------------------------------------------------|   |
|  |  ✓ All Portfolio Files Complete (45/45 files)                    |   |
|  |  ✓ All Other Files Complete (7/7 files)                          |   |
|  |  ✓ All Index Prices Complete (23/23 prices)                      |   |
|  |  ✓ All Instruments Complete (0 outstanding)                      |   |
|  |  ✓ All Credit Ratings Complete (0 outstanding)                   |   |
|  |  ✓ All Durations Complete (0 outstanding)                        |   |
|  |  ✓ All Betas Complete (0 outstanding)                            |   |
|  |                                                                  |   |
|  |  Overall Status: ✓ Ready for Approval                            |   |
|  |                                                   [View Details]  |   |
|  +------------------------------------------------------------------+   |
|                                                                         |
|  +------------------------------------------------------------------+   |
|  |  Calculation Status                                              |   |
|  |------------------------------------------------------------------|   |
|  |  ✓ RunCalculations: Complete (2024-03-31 14:32:15)               |   |
|  |  ✓ PublishDraftReports: Complete (2024-03-31 14:45:22)          |   |
|  |                                                                  |   |
|  |  Calculation Errors: 0                           [View Logs →]   |   |
|  +------------------------------------------------------------------+   |
|                                                                         |
|  +------------------------------------------------------------------+   |
|  |  Report Comments (4 comments)                                    |   |
|  |------------------------------------------------------------------|   |
|  |  Portfolio A Summary - "Equity allocation increased by 5%..."    |   |
|  |    By: J. Smith on 2024-03-15                                    |   |
|  |                                                                  |   |
|  |  Portfolio B Performance - "Performance impacted by currency..." |   |
|  |    By: M. Brown on 2024-03-14                                    |   |
|  |                                                                  |   |
|  |  Sanlam Risk Report - "Credit rating downgrade on ZAE000..."     |   |
|  |    By: A. Johnson on 2024-03-12                                  |   |
|  |                                                                  |   |
|  |  Overall Market Summary - "Market volatility increased this..."  |   |
|  |    By: J. Smith on 2024-03-10                                    |   |
|  |                                                                  |   |
|  |                                            [View All Comments →] |   |
|  +------------------------------------------------------------------+   |
|                                                                         |
|  +------------------------------------------------------------------+   |
|  |  Previous Approvals                                              |   |
|  |------------------------------------------------------------------|   |
|  |  Data Preparation: Approved by System on 2024-03-31 14:30:00    |   |
|  +------------------------------------------------------------------+   |
|                                                                         |
|  Approval Actions:                                                      |
|                                                                         |
|  [Approve Level 1] or [Reject and Return to Data Preparation]          |
|                                                                         |
+-------------------------------------------------------------------------+

LEVEL 2 APPROVAL (Similar layout):
+-------------------------------------------------------------------------+
|  Level 2 Approval                        Report Batch: March 2024      |
|                                                                         |
|  Workflow Status:                                                       |
|  [●]────────[●]────────[●]────────[●]────────[○]                       |
|  Created   Data Prep    L1        L2        L3      Complete           |
|                                                                         |
|  Current Activity: Approve Second Level                                 |
|  Pending Approval By: R. Davis (Level 2 Approver)                      |
|                                                                         |
|  ... [Same data summary sections] ...                                   |
|                                                                         |
|  +------------------------------------------------------------------+   |
|  |  Previous Approvals                                              |   |
|  |------------------------------------------------------------------|   |
|  |  Data Preparation: Approved by System on 2024-03-31 14:30:00    |   |
|  |  Level 1: Approved by K. Wilson on 2024-04-01 09:15:32          |   |
|  +------------------------------------------------------------------+   |
|                                                                         |
|  [Approve Level 2] or [Reject and Return to Data Preparation]          |
|                                                                         |
+-------------------------------------------------------------------------+

LEVEL 3 APPROVAL WITH REJECTION DIALOG:
+-------------------------------------------------------------------------+
|  Level 3 Approval                        Report Batch: March 2024      |
|                                                                         |
|  Workflow Status:                                                       |
|  [●]────────[●]────────[●]────────[●]────────[●]                       |
|  Created   Data Prep    L1        L2        L3      Complete           |
|                                                                         |
|  Current Activity: Approve Third Level (Final Sign-Off)                 |
|  Pending Approval By: K. Wilson (Level 3 Approver)                     |
|                                                                         |
|  ... [Same data summary sections] ...                                   |
|                                                                         |
|  +------------------------------------------------------------------+   |
|  |  Previous Approvals                                              |   |
|  |------------------------------------------------------------------|   |
|  |  Data Preparation: Approved by System on 2024-03-31 14:30:00    |   |
|  |  Level 1: Approved by K. Wilson on 2024-04-01 09:15:32          |   |
|  |  Level 2: Approved by R. Davis on 2024-04-01 11:22:45           |   |
|  +------------------------------------------------------------------+   |
|                                                                         |
|  [Approve Level 3 (Final)] or [Reject and Return to Data Preparation]  |
|                                                                         |
+-------------------------------------------------------------------------+

REJECTION DIALOG:
+-----------------------------------------------------------------------+
|  Reject Report Batch                                            [X]   |
+-----------------------------------------------------------------------+
|                                                                       |
|  ⚠ Warning: Rejecting at this level will:                             |
|  - Clear all calculations                                             |
|  - Return workflow to Data Preparation phase                          |
|  - Unlock file uploads and maintenance screens                        |
|  - Require re-approval through all levels                             |
|                                                                       |
|  +----------------------------------------------------------------+   |
|  | Rejection Reason: (Required for Level 3)                       |   |
|  | +------------------------------------------------------------+ |   |
|  | |                                                            | |   |
|  | | [Specify reason for rejection here...]                    | |   |
|  | |                                                            | |   |
|  | |                                                            | |   |
|  | +------------------------------------------------------------+ |   |
|  +----------------------------------------------------------------+   |
|                                                                       |
|  Common Reasons:                                                      |
|  - [ ] Data quality issues identified                                 |
|  - [ ] Missing key information                                        |
|  - [ ] Calculation errors detected                                    |
|  - [ ] Portfolio rebalancing required                                 |
|  - [ ] Report commentary insufficient                                 |
|  - [✓] Other (specify above)                                          |
|                                                                       |
|  [Confirm Rejection]  [Cancel]                                        |
|                                                                       |
+-----------------------------------------------------------------------+
```

## Elements

| Element | Type | Description |
|---------|------|-------------|
| Workflow Progress | Visualization | Visual timeline showing current approval state |
| Data Completeness Summary | Info Panel | Shows file and data completeness status |
| Calculation Status | Info Panel | Shows calculation execution status |
| Report Comments | List | Displays all report comments for review |
| Previous Approvals | Timeline | Shows approval history with users and timestamps |
| View Details | Link | Navigate to Data Confirmation screen |
| View Logs | Link | Navigate to Process Logs screen |
| View All Comments | Link | Navigate to Report Comments screen |
| Approve Level X | Button | Approve and advance to next level |
| Reject | Button | Opens rejection dialog |
| Rejection Reason | Text Area | Required input for rejection (L3 mandatory) |
| Common Reasons | Checkboxes | Quick selection of rejection reasons |
| Confirm Rejection | Button | Submit rejection and return to Data Prep |

## User Actions

- **View Details**: Navigate to Data Confirmation to review completeness
- **View Logs**: Navigate to Process Logs to review execution history
- **View All Comments**: Navigate to Report Comments to review commentary
- **Approve**: Advance workflow to next approval level
- **Reject**: Open rejection dialog to enter reason and return to Data Preparation
- **Select Common Reason**: Quick-fill rejection reason from checklist
- **Confirm Rejection**: Submit rejection and trigger workflow reset

## Approval Levels

| Level | Purpose | Reviewer Focus | Rejection Reason |
|-------|---------|----------------|------------------|
| Level 1 | Initial review | Data completeness and key checks | Optional |
| Level 2 | Portfolio confirmation | Portfolio-level confirmation and risk checks | Optional |
| Level 3 | Final sign-off | Complete review before publishing | **Mandatory** |

## Rejection Behavior

When rejection occurs at any level:
1. Workflow returns to "Data Preparation" state
2. Clear Calculations activity is executed
3. File upload and maintenance screens become accessible again
4. All previous approvals are cleared
5. Rejection reason and user are logged
6. Users must re-approve through all levels after fixes

## State Transitions

```
Data Preparation → L1 Approval → L2 Approval → L3 Approval → Complete
        ↑              │              │              │
        └──────────────┴──────────────┴──────────────┘
                    (Reject returns to Data Prep)
```

## Navigation

- **From:** Start Page, Top Nav → Approvals
- **To:**
  - Data Confirmation (View Details)
  - Process Logs (View Logs)
  - Report Comments (View All Comments)

## Access Control

| Role | L1 Approval | L2 Approval | L3 Approval |
|------|-------------|-------------|-------------|
| L1 Approver | Yes | No | No |
| L2 Approver | No | Yes | No |
| L3 Approver | No | No | Yes |
| Super Admin | Yes | Yes | Yes |

Users can only see and action the approval level they have permission for.

## API Endpoints Used

- GET `/approve-logs/{ReportBatchId}` - Get all approval history
- GET `/approve-logs/{ReportBatchId}/{Type}` - Get specific approval level status
- POST `/approve-logs/{ReportBatchId}` - Submit approval or rejection
  ```json
  {
    "WorkflowInstanceId": "string",
    "Type": "Level 1" | "Level 2" | "Level 3",
    "IsApproved": true | false,
    "User": "string",
    "RejectReason": "string" (required if IsApproved=false and Type="Level 3")
  }
  ```
- GET `/check-main-data-completeness` - Get data summary
- GET `/check-other-data-completeness` - Get reference data summary
- GET `/calculation-log-error-count` - Get calculation error count
- GET `/report-comments` - Get report comments for review
