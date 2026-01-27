# Screen: Credit Ratings Maintenance

## Purpose

Manage credit ratings for instruments with change tracking across rating agencies. View rating changes to identify portfolio risk shifts.

## Wireframe

```
+-------------------------------------------------------------------------+
|  InvestInsight                           [User Profile v]   [Logout]   |
+-------------------------------------------------------------------------+
|  Home | File Import | Data Check | Maintenance | Approvals | Logs      |
+-------------------------------------------------------------------------+
|                                                                         |
|  Credit Ratings Maintenance              Report Batch: March 2024      |
|                                                                         |
|  ┌─────────────────────────────────────────────────────────────────┐   |
|  │ [Current Ratings] | [Rating Changes]                           │   |
|  └─────────────────────────────────────────────────────────────────┘   |
|                                                                         |
|  [Add Credit Rating]  [Retry Decision Flow]  [View Full Audit Trail]   |
|                                                                         |
|  Search/Filter:                                                         |
|  [ISIN/Code...        ] [Country: All v] [Status: All v] [Search 🔍]   |
|                                                                         |
|  +------------------------------------------------------------------+   |
|  | ISIN     | Code  | Name    | National | Intl    | Status | Actions|
|  |----------|-------|---------|----------|---------|--------|--------|
|  | ZAE00012 | ABC   | Bond XY | AA(za)   | BBB+    | Active | [Edit] |
|  |          |       |         | S&P      | S&P     |        | [Del]  |
|  |          |       |         |          |         |        | [Hist] |
|  |----------|-------|---------|----------|---------|--------|--------|
|  | ZAE00023 | DEF   | Bond AB | A+(za)   | BBB     | Active | [Edit] |
|  |          |       |         | Moody's  | Moody's |        | [Del]  |
|  |          |       |         |          |         |        | [Hist] |
|  |----------|-------|---------|----------|---------|--------|--------|
|  | ZAE00034 | GHI   | Bond 12 | AA-(za)  | BBB+    | Active | [Edit] |
|  |          |       |         | Fitch    | Fitch   |        | [Del]  |
|  |          |       |         |          |         |        | [Hist] |
|  |----------|-------|---------|----------|---------|--------|--------|
|  | US037833 | BOND1 | US Corp | -        | -       | New    | [Add]  |
|  |          |       |         |          |         |        | [Hist] |
|  +------------------------------------------------------------------+   |
|                                                                         |
|  Showing 1-4 of 143 credit ratings           [< Prev] [Next >]         |
|                                                                         |
+-------------------------------------------------------------------------+

RATING CHANGES TAB:
+-------------------------------------------------------------------------+
|  Credit Rating Changes                   Report Batch: March 2024      |
|                                                                         |
|  Rating changes since previous month:                                   |
|                                                                         |
|  [Export Changes ↓]                                                     |
|                                                                         |
|  +------------------------------------------------------------------+   |
|  | Report  | Code  | ISIN     | National → | International →        |  |
|  | Date    |       |          |            |                        |  |
|  |---------|-------|----------|------------|------------------------|  |
|  | 2024-03 | ABC   | ZAE00012 | AA(za)     | BBB+ (Upgraded)        |  |
|  |         |       |          | (No change)| Previous: BBB          |  |
|  |         |       |          |            | ↑ +1 notch             |  |
|  |---------|-------|----------|------------|------------------------|  |
|  | 2024-03 | DEF   | ZAE00023 | A+(za)     | BBB (Downgraded)       |  |
|  |         |       |          | (Downgrade)| Previous: BBB+         |  |
|  |         |       |          | Prev: AA-  | ↓ -1 notch             |  |
|  |         |       |          | ↓ -2 notch |                        |  |
|  +------------------------------------------------------------------+   |
|                                                                         |
|  Total Changes: 2 instruments with rating changes                      |
|                                                                         |
+-------------------------------------------------------------------------+

ADD/EDIT CREDIT RATING DIALOG:
+-----------------------------------------------------------------------+
|  Add Credit Rating                                              [X]   |
+-----------------------------------------------------------------------+
|                                                                       |
|  Report Batch: March 2024                                             |
|                                                                       |
|  +----------------------------------------------------------------+   |
|  | Instrument:    [ZAE000123456 - Bond XYZ Ltd           v]       |   |
|  |                                                                |   |
|  | Country:       [South Africa                          v]       |   |
|  | Currency:      [ZAR                                   v]       |   |
|  +----------------------------------------------------------------+   |
|                                                                       |
|  Rating Agency Ratings:                                               |
|  +----------------------------------------------------------------+   |
|  | BB Comp Rating:      [BBB+                            v]       |   |
|  | Moody's Rating:      [Baa1                            v]       |   |
|  | S&P Rating:          [BBB+                            v]       |   |
|  | Fitch Rating:        [BBB+                            v]       |   |
|  +----------------------------------------------------------------+   |
|                                                                       |
|  Final Ratings (Auto-calculated from Decision Flow):                  |
|  +----------------------------------------------------------------+   |
|  | National Source:     [S&P                             v]       |   |
|  | Final National:      [AA(za)                                ]  |   |
|  |                                                                |   |
|  | International Source:[S&P                             v]       |   |
|  | Final International: [BBB+                                  ]  |   |
|  +----------------------------------------------------------------+   |
|                                                                       |
|  User Notes:                                                          |
|  +----------------------------------------------------------------+   |
|  | [Rating confirmed with Bloomberg feed on 2024-03-15         ] |   |
|  +----------------------------------------------------------------+   |
|                                                                       |
|  Last Changed By: [J. Smith                                    v]     |
|                                                                       |
|  [Save Rating]  [Cancel]                                              |
|                                                                       |
+-----------------------------------------------------------------------+

RATING HISTORY DIALOG:
+-----------------------------------------------------------------------+
|  Credit Rating History: ZAE000123456 (Bond XYZ Ltd)             [X]   |
+-----------------------------------------------------------------------+
|                                                                       |
|  +----------------------------------------------------------------+   |
|  | Report   | National | Intl   | Agency | Changed By  | Changed  |  |
|  | Batch    |          |        | Source |             | At       |  |
|  |----------|----------|--------|--------|-------------|----------|  |
|  | 2024-03  | AA(za)   | BBB+   | S&P    | J. Smith    | 2024-04  |  |
|  |          |          |        |        |             | 09:23:45 |  |
|  | 2024-02  | AA(za)   | BBB    | S&P    | J. Smith    | 2024-03  |  |
|  |          |          |        |        |             | 10:15:22 |  |
|  | 2024-01  | AA-(za)  | BBB    | Moody's| M. Brown    | 2024-02  |  |
|  |          |          |        |        |             | 11:32:18 |  |
|  | 2023-12  | AA-(za)  | BBB-   | S&P    | J. Smith    | 2024-01  |  |
|  |          |          |        |        |             | 09:45:33 |  |
|  +----------------------------------------------------------------+   |
|                                                                       |
|  [Export History ↓]  [Close]                                          |
|                                                                       |
+-----------------------------------------------------------------------+
```

## Elements

| Element | Type | Description |
|---------|------|-------------|
| Tab Navigation | Tabs | Switch between Current Ratings and Rating Changes |
| Add Credit Rating | Button | Opens dialog to add new rating |
| Retry Decision Flow | Button | Re-run credit rating decision flow |
| View Full Audit Trail | Button | View all rating audit history |
| Search/Filter | Filter Bar | Search by ISIN/code, filter by country/status |
| Edit | Button | Modify existing rating |
| Delete | Button | Remove rating entry (soft delete with audit) |
| History | Button | View audit trail for specific instrument |
| Add | Button | Add rating for new instrument |
| Export Changes | Button | Download rating changes to Excel |
| Save Rating | Button | Submit rating data |

## User Actions

- **Add Credit Rating**: Opens dialog to enter ratings from multiple agencies
- **Edit Rating**: Modify existing ratings and agency sources
- **Delete Rating**: Remove rating entry (requires confirmation)
- **View History**: Opens audit trail showing all rating changes
- **Retry Decision Flow**: Re-runs automated rating decision logic
- **View Rating Changes**: Switch to tab showing all rating upgrades/downgrades
- **Export Changes**: Download rating changes report
- **Search/Filter**: Find specific instruments or filter by country/status

## Form Validation

- **Instrument**: Required, from instruments table
- **Country**: Required, from countries table
- **Currency**: Required, from currencies table
- **BB Comp Rating**: Required, from credit rating scale
- **Moody's Rating**: Required, from credit rating scale
- **S&P Rating**: Required, from credit rating scale
- **Fitch Rating**: Optional, from credit rating scale
- **Final National Rating**: Auto-calculated by decision flow, can be overridden
- **Final International Rating**: Auto-calculated by decision flow, can be overridden
- **Last Changed User**: Auto-populated, required

## Rating Changes Behavior

- Automatically compares current batch ratings with previous batch
- Displays upgrades (↑) and downgrades (↓) with notch changes
- Color codes: Green for upgrades, Red for downgrades, Gray for no change
- Filters out instruments with no rating changes

## Navigation

- **From:** Data Confirmation or Top Nav → Maintenance → Credit Ratings
- **To:** Audit trail view (modal), Rating Changes tab

## State-Based Access

| Workflow State | Add | Edit | Delete | Retry Flow | View |
|----------------|-----|------|--------|------------|------|
| Data Preparation | Yes | Yes | Yes | Yes | Yes |
| First Approval | No | No | No | No | Yes |
| Second Approval | No | No | No | No | Yes |
| Final Approval | No | No | No | No | Yes |
| Complete | No | No | No | No | Yes |

## API Endpoints Used

- GET `/credit-ratings` - Get all credit ratings
- POST `/credit-ratings?Currency={curr}&RatingAgency={agency}&CreditRatingScaleId={id}` - Create rating
- GET `/credit-ratings/{Id}` - Get credit rating by ID
- PUT `/credit-ratings/{Id}?Currency={curr}&RatingAgency={agency}&CreditRatingScaleId={id}` - Update rating
- DELETE `/credit-ratings/{Id}` - Delete credit rating
- GET `/credit-rating-audit-trail/{Id}` - Get rating audit trail
- GET `/credit-rating-full-audit-trail` - Get full rating audit trail
- GET `/credit-ratings-history/{InstrumentId}` - Get rating history for instrument
- POST `/credit-ratings-decision-flow/{ReportBatchId}` - Retry credit rating decision flow
- GET `/credit-rating-changes` - Get rating changes for current batch
- GET `/configurations` - Get credit rating scales and reference data
