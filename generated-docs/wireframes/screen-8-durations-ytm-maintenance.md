# Screen: Durations & YTM Maintenance

## Purpose

Manage instrument duration and yield-to-maturity data for the current batch with comprehensive audit tracking.

## Wireframe

```
+-------------------------------------------------------------------------+
|  InvestInsight                           [User Profile v]   [Logout]   |
+-------------------------------------------------------------------------+
|  Home | File Import | Data Check | Maintenance | Approvals | Logs      |
+-------------------------------------------------------------------------+
|                                                                         |
|  Durations & YTM Maintenance             Report Batch: March 2024      |
|                                                                         |
|  [Add Duration Entry]  [View Outstanding]  [View Full Audit Trail]     |
|                                                                         |
|  Outstanding Durations: 5 instruments [View Outstanding →]             |
|                                                                         |
|  Search/Filter:                                                         |
|  [ISIN/Code...        ] [Status: All v]                [Search 🔍]     |
|                                                                         |
|  +------------------------------------------------------------------+   |
|  | ISIN         | Code   | Name        | Duration | YTM    | Status |  |
|  |--------------|--------|-------------|----------|--------|--------|  |
|  | ZAE000123456 | ABC123 | Bond XYZ    | 5.23     | 8.45%  | Active |  |
|  |              |        |             | [Edit] [Delete] [History]   |  |
|  |--------------|--------|-------------|----------|--------|--------|  |
|  | ZAE000234567 | DEF456 | Bond ABC    | 3.87     | 7.25%  | Active |  |
|  |              |        |             | [Edit] [Delete] [History]   |  |
|  |--------------|--------|-------------|----------|--------|--------|  |
|  | ZAE000345678 | GHI789 | Bond 123    | 4.56     | 8.12%  | Active |  |
|  |              |        |             | [Edit] [Delete] [History]   |  |
|  |--------------|--------|-------------|----------|--------|--------|  |
|  | US0378331005 | BOND01 | US Corp     | -        | -      | Missing|  |
|  |              |        |             | [Add]            [History]   |  |
|  +------------------------------------------------------------------+   |
|                                                                         |
|  Showing 1-4 of 87 duration entries          [< Prev] [Next >]         |
|                                                                         |
+-------------------------------------------------------------------------+

ADD/EDIT DURATION DIALOG:
+-----------------------------------------------------------------------+
|  Add Duration Entry                                             [X]   |
+-----------------------------------------------------------------------+
|                                                                       |
|  Report Batch: March 2024                                             |
|                                                                       |
|  +----------------------------------------------------------------+   |
|  | Instrument:          [ZAE000123456 - Bond XYZ Ltd        v]    |   |
|  |                                                                |   |
|  | Modified Duration:   [5.23                               ]     |   |
|  |                                                                |   |
|  | Yield to Maturity:   [8.45                               ] %   |   |
|  |                                                                |   |
|  | Last Changed By:     [J. Smith                          v]     |   |
|  +----------------------------------------------------------------+   |
|                                                                       |
|  [Save Entry]  [Cancel]                                               |
|                                                                       |
+-----------------------------------------------------------------------+

OUTSTANDING DURATIONS VIEW:
+-----------------------------------------------------------------------+
|  Outstanding Durations                                          [X]   |
+-----------------------------------------------------------------------+
|                                                                       |
|  Instruments missing duration data for current batch:                 |
|                                                                       |
|  +----------------------------------------------------------------+   |
|  | Instrument ID | Code   | ISIN         | Name          | Action |  |
|  |---------------|--------|--------------|---------------|--------|  |
|  | 1234          | BOND01 | US0378331005 | US Corp Bond  | [Add]  |  |
|  | 1567          | BOND02 | GB0002374006 | UK Gilt 2030  | [Add]  |  |
|  | 1789          | BOND03 | DE0001135275 | German Bund   | [Add]  |  |
|  | 1923          | BOND04 | FR0010670737 | French OAT    | [Add]  |  |
|  | 2045          | BOND05 | JP1103251033 | JGB 2035      | [Add]  |  |
|  +----------------------------------------------------------------+   |
|                                                                       |
|  Total Outstanding: 5 instruments                                     |
|                                                                       |
|  [Export List ↓]  [Close]                                             |
|                                                                       |
+-----------------------------------------------------------------------+

AUDIT TRAIL DIALOG:
+-----------------------------------------------------------------------+
|  Duration Audit Trail: ZAE000123456 (Bond XYZ Ltd)              [X]   |
+-----------------------------------------------------------------------+
|                                                                       |
|  +----------------------------------------------------------------+   |
|  | Valid From  | Valid To   | Duration | YTM   | Changed By      |  |
|  |-------------|------------|----------|-------|-----------------|  |
|  | 2024-03-31  | Current    | 5.23     | 8.45% | J. Smith        |  |
|  | 2024-02-29  | 2024-03-30 | 5.18     | 8.52% | J. Smith        |  |
|  | 2024-01-31  | 2024-02-28 | 5.34     | 8.28% | M. Brown        |  |
|  | 2023-12-31  | 2024-01-30 | 5.42     | 8.15% | J. Smith        |  |
|  | 2023-11-30  | 2023-12-30 | 5.56     | 7.98% | A. Johnson      |  |
|  +----------------------------------------------------------------+   |
|                                                                       |
|  [Export History ↓]  [Close]                                          |
|                                                                       |
+-----------------------------------------------------------------------+
```

## Elements

| Element | Type | Description |
|---------|------|-------------|
| Add Duration Entry | Button | Opens dialog to add new duration entry |
| View Outstanding | Button | Opens list of instruments missing duration data |
| View Full Audit Trail | Button | View all duration audit history |
| Search/Filter | Filter Bar | Search by ISIN/code, filter by status |
| Edit | Button | Modify existing duration/YTM values |
| Delete | Button | Remove duration entry (soft delete with audit) |
| History | Button | View audit trail for specific instrument |
| Add | Button | Add duration for missing instrument |
| Save Entry | Button | Submit duration data |
| Export List | Button | Download outstanding list to Excel |

## User Actions

- **Add Duration Entry**: Opens dialog to select instrument and enter duration/YTM
- **Edit Entry**: Modify existing duration and YTM values
- **Delete Entry**: Remove duration entry (requires confirmation)
- **View History**: Opens audit trail showing all changes
- **View Outstanding**: Opens filtered list of instruments missing duration data
- **Quick Add**: From outstanding list, add duration for specific instrument
- **Search/Filter**: Find specific instruments or filter by status

## Form Validation

- **Instrument**: Required, from instruments table (only bonds)
- **Modified Duration**: Required, must be positive numeric value
- **Yield to Maturity**: Required, must be numeric value (can be negative)
- **Last Changed User**: Auto-populated, required

## Outstanding View Behavior

- Automatically filters to show only instruments missing duration for current batch
- Fetches from `/instrument-duration-outstanding` endpoint
- Quick "Add" button pre-populates instrument in add dialog
- Export functionality for offline review and data preparation

## Navigation

- **From:** Data Confirmation → Fix Durations or Top Nav → Maintenance → Durations
- **To:** Audit trail view (modal), Outstanding list (modal)

## State-Based Access

| Workflow State | Add | Edit | Delete | View |
|----------------|-----|------|--------|------|
| Data Preparation | Yes | Yes | Yes | Yes |
| First Approval | No | No | No | Yes |
| Second Approval | No | No | No | Yes |
| Final Approval | No | No | No | Yes |
| Complete | No | No | No | Yes |

## API Endpoints Used

- GET `/instrument-duration` - Get all instrument durations for current batch
- POST `/instrument-duration` - Create new duration entry
- GET `/instrument-duration/{Id}` - Get duration by ID
- PUT `/instrument-duration/{Id}` - Update duration entry
- DELETE `/instrument-duration/{Id}` - Delete duration entry
- GET `/instrument-duration-outstanding` - Get instruments missing duration
- GET `/instrument-duration-audit-trail/{InstrumentDurationId}` - Get duration audit trail
- GET `/instrument-duration-full-audit-trail` - Get full duration audit trail
