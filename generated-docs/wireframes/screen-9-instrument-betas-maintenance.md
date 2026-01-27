# Screen: Instrument Betas Maintenance

## Purpose

Manage instrument beta values for the current batch with full audit capabilities. Beta measures an asset's volatility relative to the market.

## Wireframe

```
+-------------------------------------------------------------------------+
|  InvestInsight                           [User Profile v]   [Logout]   |
+-------------------------------------------------------------------------+
|  Home | File Import | Data Check | Maintenance | Approvals | Logs      |
+-------------------------------------------------------------------------+
|                                                                         |
|  Instrument Betas Maintenance            Report Batch: March 2024      |
|                                                                         |
|  [Add Beta Entry]  [View Outstanding]  [View Full Audit Trail]         |
|                                                                         |
|  Outstanding Betas: 3 instruments [View Outstanding →]                 |
|                                                                         |
|  Search/Filter:                                                         |
|  [ISIN/Code...        ] [Status: All v]                [Search 🔍]     |
|                                                                         |
|  +------------------------------------------------------------------+   |
|  | ISIN         | Code    | Name           | Beta   | Status | Actions|
|  |--------------|---------|----------------|--------|--------|--------|
|  | ZAE000234567 | EQ001   | Equity ABC SA  | 1.23   | Active | [Edit] |
|  |              |         |                |        |        | [Del]  |
|  |              |         |                |        |        | [Hist] |
|  |--------------|---------|----------------|--------|--------|--------|
|  | US0378331005 | AAPL    | Apple Inc      | 1.15   | Active | [Edit] |
|  |              |         |                |        |        | [Del]  |
|  |              |         |                |        |        | [Hist] |
|  |--------------|---------|----------------|--------|--------|--------|
|  | GB0002374006 | BP      | BP PLC         | 0.87   | Active | [Edit] |
|  |              |         |                |        |        | [Del]  |
|  |              |         |                |        |        | [Hist] |
|  |--------------|---------|----------------|--------|--------|--------|
|  | JP3633400001 | 7203    | Toyota Motor   | -      | Missing| [Add]  |
|  |              |         |                |        |        | [Hist] |
|  +------------------------------------------------------------------+   |
|                                                                         |
|  Showing 1-4 of 156 beta entries             [< Prev] [Next >]         |
|                                                                         |
+-------------------------------------------------------------------------+

ADD/EDIT BETA DIALOG:
+-----------------------------------------------------------------------+
|  Add Beta Entry                                                 [X]   |
+-----------------------------------------------------------------------+
|                                                                       |
|  Report Batch: March 2024                                             |
|                                                                       |
|  +----------------------------------------------------------------+   |
|  | Instrument:     [ZAE000234567 - Equity ABC SA           v]     |   |
|  |                                                                |   |
|  | Beta:           [1.23                                    ]     |   |
|  |                                                                |   |
|  | Last Changed:   [J. Smith                               v]     |   |
|  +----------------------------------------------------------------+   |
|                                                                       |
|  Note: Beta measures volatility relative to market (1.0 = market)     |
|  - Beta > 1.0: More volatile than market                              |
|  - Beta < 1.0: Less volatile than market                              |
|  - Negative beta: Moves inverse to market                             |
|                                                                       |
|  [Save Entry]  [Cancel]                                               |
|                                                                       |
+-----------------------------------------------------------------------+

OUTSTANDING BETAS VIEW:
+-----------------------------------------------------------------------+
|  Outstanding Betas                                              [X]   |
+-----------------------------------------------------------------------+
|                                                                       |
|  Instruments missing beta data for current batch:                     |
|                                                                       |
|  +----------------------------------------------------------------+   |
|  | Instrument ID | Code  | ISIN         | Name            | Action |  |
|  |---------------|-------|--------------|-----------------|--------|  |
|  | 2156          | 7203  | JP3633400001 | Toyota Motor    | [Add]  |  |
|  | 2234          | MSFT  | US5949181045 | Microsoft Corp  | [Add]  |  |
|  | 2389          | GOOGL | US02079K3059 | Alphabet Inc    | [Add]  |  |
|  +----------------------------------------------------------------+   |
|                                                                       |
|  Total Outstanding: 3 instruments                                     |
|                                                                       |
|  [Export List ↓]  [Close]                                             |
|                                                                       |
+-----------------------------------------------------------------------+

AUDIT TRAIL DIALOG:
+-----------------------------------------------------------------------+
|  Beta Audit Trail: ZAE000234567 (Equity ABC SA)                 [X]   |
+-----------------------------------------------------------------------+
|                                                                       |
|  +----------------------------------------------------------------+   |
|  | Valid From  | Valid To   | Beta  | Changed By    | Changed At   |  |
|  |-------------|------------|-------|---------------|--------------|  |
|  | 2024-03-31  | Current    | 1.23  | J. Smith      | 2024-04-01   |  |
|  |             |            |       |               | 09:15:32     |  |
|  | 2024-02-29  | 2024-03-30 | 1.18  | J. Smith      | 2024-03-01   |  |
|  |             |            |       |               | 10:22:18     |  |
|  | 2024-01-31  | 2024-02-28 | 1.25  | M. Brown      | 2024-02-01   |  |
|  |             |            |       |               | 11:45:09     |  |
|  | 2023-12-31  | 2024-01-30 | 1.32  | J. Smith      | 2024-01-02   |  |
|  |             |            |       |               | 08:30:54     |  |
|  +----------------------------------------------------------------+   |
|                                                                       |
|  Beta Change (vs Previous Month): +0.05 (+4.2%)                       |
|                                                                       |
|  [Export History ↓]  [Close]                                          |
|                                                                       |
+-----------------------------------------------------------------------+
```

## Elements

| Element | Type | Description |
|---------|------|-------------|
| Add Beta Entry | Button | Opens dialog to add new beta value |
| View Outstanding | Button | Opens list of instruments missing beta data |
| View Full Audit Trail | Button | View all beta audit history |
| Search/Filter | Filter Bar | Search by ISIN/code, filter by status |
| Edit | Button | Modify existing beta value |
| Delete | Button | Remove beta entry (soft delete with audit) |
| History | Button | View audit trail for specific instrument |
| Add | Button | Add beta for missing instrument |
| Save Entry | Button | Submit beta data |
| Export List | Button | Download outstanding list to Excel |

## User Actions

- **Add Beta Entry**: Opens dialog to select instrument and enter beta value
- **Edit Entry**: Modify existing beta value
- **Delete Entry**: Remove beta entry (requires confirmation)
- **View History**: Opens audit trail showing all changes
- **View Outstanding**: Opens filtered list of instruments missing beta data
- **Quick Add**: From outstanding list, add beta for specific instrument
- **Search/Filter**: Find specific instruments or filter by status

## Form Validation

- **Instrument**: Required, from instruments table (typically equities)
- **Beta**: Required, must be numeric value (can be negative or zero)
  - Typical range: -2.0 to 3.0
  - Most common: 0.5 to 1.5
- **Last Changed User**: Auto-populated, required

## Beta Value Guidelines

| Beta Range | Interpretation |
|------------|----------------|
| Beta > 1.5 | Very high volatility |
| Beta 1.0-1.5 | Above market volatility |
| Beta 0.5-1.0 | Below market volatility |
| Beta 0.0-0.5 | Low volatility |
| Beta < 0.0 | Inverse correlation with market |

## Outstanding View Behavior

- Automatically filters to show only instruments missing beta for current batch
- Fetches from `/instrument-beta-outstanding` endpoint
- Quick "Add" button pre-populates instrument in add dialog
- Export functionality for offline review

## Navigation

- **From:** Data Confirmation → Fix Betas or Top Nav → Maintenance → Betas
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

- GET `/instrument-beta` - Get all instrument betas for current batch
- POST `/instrument-beta` - Create new beta entry
- GET `/instrument-beta/{Id}` - Get beta by ID
- PUT `/instrument-beta/{Id}` - Update beta entry
- DELETE `/instrument-beta/{Id}` - Delete beta entry
- GET `/instrument-beta-outstanding` - Get instruments missing beta
- GET `/instrument-beta-audit-trail/{InstrumentBetaId}` - Get beta audit trail
- GET `/instrument-beta-full-audit-trail` - Get full beta audit trail
