# Wireframes: InvestInsight Investment Management System

## Summary

InvestInsight is a comprehensive portfolio reporting and data stewardship platform that manages file imports, portfolio data, monthly processing workflows with multi-level approvals, and reference data maintenance. The system follows a state-based workflow where access to certain screens is restricted based on the current approval state.

## Screens

| # | Screen | Description | File |
|---|--------|-------------|------|
| 1 | Start Page / Dashboard | Entry point showing report batch status and quick navigation | `screen-1-start-page.md` |
| 2 | Portfolio File Upload | Matrix view of portfolio files organized by portfolio and file type | `screen-2-portfolio-file-upload.md` |
| 3 | Other File Upload | Simple list view for non-portfolio files (index, Bloomberg, custodian) | `screen-3-other-file-upload.md` |
| 4 | File Upload Modal | Popup for uploading, viewing status, and managing individual files | `screen-4-file-upload-modal.md` |
| 5 | Data Confirmation | Consolidated view of data completeness checks before approvals | `screen-5-data-confirmation.md` |
| 6 | Instruments Maintenance | Create, edit, and manage financial instruments with audit trail | `screen-6-instruments-maintenance.md` |
| 7 | Index Prices Maintenance | Manage index prices for current batch with history | `screen-7-index-prices-maintenance.md` |
| 8 | Durations & YTM Maintenance | Manage instrument duration and yield-to-maturity data | `screen-8-durations-ytm-maintenance.md` |
| 9 | Instrument Betas Maintenance | Manage instrument beta values | `screen-9-instrument-betas-maintenance.md` |
| 10 | Credit Ratings Maintenance | Manage credit ratings with change tracking | `screen-10-credit-ratings-maintenance.md` |
| 11 | Report Comments | Add and manage comments tied to specific reports | `screen-11-report-comments.md` |
| 12 | Approval Workflow (L1/L2/L3) | Three-level approval process with approve/reject capabilities | `screen-12-approval-workflow.md` |
| 13 | Process Logs | View file, monthly process, and calculation logs | `screen-13-process-logs.md` |
| 14 | System Configuration | Manage reference data (countries, currencies, portfolios, etc.) | `screen-14-system-configuration.md` |

## Screen Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                     MAIN USER WORKFLOW                          │
└─────────────────────────────────────────────────────────────────┘

[Start Page]
    ├─→ [Portfolio File Upload] ─→ [File Upload Modal]
    ├─→ [Other File Upload] ─────→ [File Upload Modal]
    ├─→ [Data Confirmation]
    │       ├─→ [Instruments Maintenance]
    │       ├─→ [Index Prices Maintenance]
    │       ├─→ [Durations & YTM Maintenance]
    │       ├─→ [Instrument Betas Maintenance]
    │       └─→ [Credit Ratings Maintenance]
    │
    ├─→ [Report Comments]
    ├─→ [Approval Workflow L1] ─→ [Approval Workflow L2] ─→ [Approval Workflow L3]
    │           │                         │                         │
    │           └─── [Reject] ────────────┴─────────────────────────┴─→ [Start Page]
    │
    ├─→ [Process Logs]
    └─→ [System Configuration]


┌─────────────────────────────────────────────────────────────────┐
│                   WORKFLOW STATE TRANSITIONS                     │
└─────────────────────────────────────────────────────────────────┘

Data Preparation Phase:
  - Full access to file uploads and maintenance screens

First Approval (L1):
  - File uploads and maintenance screens become INACCESSIBLE
  - View-only access to most screens

Second Approval (L2):
  - Remains restricted

Final Approval (L3):
  - Remains restricted
  - Rejection requires mandatory reason

Complete:
  - Read-only access to all screens
```

## Design Notes

### Component Patterns
- Use Shadcn UI components (Button, Dialog, Table, Card, Badge, Tabs)
- Status badges with color coding (Red/Yellow/Green)
- Data tables with inline actions and filters
- Modal dialogs for file upload and detail views
- Tabs for organizing related data (Data Confirmation tabs)

### Status Indicators
- **Missing**: File/data not uploaded (Red)
- **Busy**: Processing/validating (Yellow)
- **Failed**: Validation failed (Red)
- **Complete**: Successfully validated (Green)

### Access Control
- State-based screen access enforced by workflow position
- Clear visual indicators when screens are read-only
- Disabled buttons/actions when not in Data Preparation phase

### Navigation Structure
- Top-level navigation: Home, File Import, Data Confirmation, Maintenance, Approvals, Logs, Admin
- Breadcrumbs for deep navigation
- Quick links from Data Confirmation to fix screens

### Responsive Considerations
- Matrix/grid views on desktop
- Card layouts for mobile Portfolio File Upload
- Scrollable tables with fixed headers
- Collapsible sections for long forms

### Audit Trail Pattern
- Dedicated "View History" button on all maintenance screens
- Modal or side panel showing chronological changes
- Display: Field → Old Value → New Value → User → Timestamp
