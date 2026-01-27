# Screen: Data Confirmation

## Purpose

Consolidated view to verify all required data is complete and valid before proceeding to approvals. Guides users to specific fixes when issues are detected.

## Wireframe

```
+-------------------------------------------------------------------------+
|  InvestInsight                           [User Profile v]   [Logout]   |
+-------------------------------------------------------------------------+
|  Home | File Import | Data Check | Maintenance | Approvals | Logs      |
+-------------------------------------------------------------------------+
|                                                                         |
|  Data Confirmation                       Report Batch: March 2024      |
|                                                                         |
|  Overall Status: [⚠ Issues Found]                        [Refresh ↻]  |
|                                                                         |
|  ┌─────────────────────────────────────────────────────────────────┐   |
|  │ [Main File Checks] | [Other Checks] | [Portfolio Re-imports]   │   |
|  └─────────────────────────────────────────────────────────────────┘   |
|                                                                         |
|  Main File Checks                                                       |
|                                                                         |
|  Portfolio Manager Data                                                 |
|  +------------------------------------------------------------------+   |
|  | Portfolio | Holdings | Trans | Income | Cash | Perf | Mgmt Fee |  |
|  |-----------|----------|-------|--------|------|------|----------|  |
|  | Port A    | [✓]      | [✓]   | [✗]    | [✓]  | [✓]  | [✓]      |  |
|  |           | Complete | Comp  | Missing| Comp | Comp | Complete |  |
|  |-----------|----------|-------|--------|------|------|----------|  |
|  | Port B    | [✓]      | [✓]   | [✓]    | [✓]  | [✓]  | [✓]      |  |
|  |           | Complete | Comp  | Comp   | Comp | Comp | Complete |  |
|  |-----------|----------|-------|--------|------|------|----------|  |
|  | Sanlam    | [✓]      | [✓]   | [✓]    | [✓]  | [✓]  | [✓]      |  |
|  |           | Complete | Comp  | Comp   | Comp | Comp | Complete |  |
|  +------------------------------------------------------------------+   |
|                                                                         |
|  Custodian Data                                                         |
|  +------------------------------------------------------------------+   |
|  | Portfolio | Custodian | Custodian | Custodian | Custodian      |  |
|  |           | Holdings  | Trans     | Cash      | Fees           |  |
|  |-----------|-----------|-----------|-----------|----------------|  |
|  | Port A    | [✓]       | [✓]       | [✓]       | [✓]            |  |
|  | Port B    | [✓]       | [✓]       | [✓]       | [✓]            |  |
|  | Sanlam    | [✓]       | [✓]       | [✓]       | [✓]            |  |
|  +------------------------------------------------------------------+   |
|                                                                         |
|  Bloomberg Holdings                                                     |
|  +------------------------------------------------------------------+   |
|  | Portfolio | Bloomberg Holdings                                   |  |
|  |-----------|------------------------------------------------------|  |
|  | Port A    | [✓] Complete                                         |  |
|  | Port B    | [✓] Complete                                         |  |
|  | Sanlam    | [✓] Complete                                         |  |
|  +------------------------------------------------------------------+   |
|                                                                         |
|  Issues Summary: 1 issue found                                          |
|  - Portfolio A: Income data missing  [Fix Now →]                       |
|                                                                         |
|  [Export Report]                                   [Mark All Complete] |
|                                                                         |
+-------------------------------------------------------------------------+
```

## Other Checks Tab

```
+-------------------------------------------------------------------------+
|  Other Checks                            Report Batch: March 2024      |
|                                                                         |
|  Reference Data Completeness                                            |
|  +------------------------------------------------------------------+   |
|  | Check Type                          | Count    | Status         |  |
|  |-------------------------------------|----------|----------------|  |
|  | Index Price Incomplete              | 2        | [⚠] Fix       |  |
|  |                                     |          | [View Details] |  |
|  |-------------------------------------|----------|----------------|  |
|  | Instrument Incomplete               | 8        | [⚠] Fix       |  |
|  |                                     |          | [View Details] |  |
|  |-------------------------------------|----------|----------------|  |
|  | Credit Rating Incomplete            | 0        | [✓] Complete   |  |
|  |                                     |          | [View Details] |  |
|  |-------------------------------------|----------|----------------|  |
|  | Instrument Duration Incomplete      | 5        | [⚠] Fix       |  |
|  |                                     |          | [View Details] |  |
|  |-------------------------------------|----------|----------------|  |
|  | Instrument Beta Incomplete          | 3        | [⚠] Fix       |  |
|  |                                     |          | [View Details] |  |
|  +------------------------------------------------------------------+   |
|                                                                         |
|  Issues Summary: 18 incomplete items found                              |
|                                                                         |
|  Quick Navigation:                                                      |
|  [Fix Index Prices] [Fix Instruments] [Fix Durations] [Fix Betas]     |
|                                                                         |
+-------------------------------------------------------------------------+
```

## Elements

| Element | Type | Description |
|---------|------|-------------|
| Tab Navigation | Tabs | Switch between Main File Checks, Other Checks, Re-imports |
| Overall Status | Status Badge | Summary status (All Complete / Issues Found) |
| Refresh | Button | Reload check status from backend |
| Status Icons | Icons | Visual indicators (✓ Complete, ✗ Missing, ⚠ Issue) |
| Fix Now | Link Button | Navigate directly to fix screen |
| View Details | Link Button | Drill into specific check details |
| Export Report | Button | Export completeness report to Excel |
| Quick Navigation | Buttons | Fast links to maintenance screens |

## User Actions

- **Switch Tabs**: View different categories of checks
- **Click Fix Now**: Navigate to file upload or maintenance screen to resolve issue
- **View Details**: Drill into specific incomplete items (opens filtered view)
- **Refresh**: Re-run all checks and update status
- **Export Report**: Download completeness report for review
- **Quick Navigation**: Jump directly to maintenance screens (Index Prices, Instruments, etc.)

## Status Indicators

| Status | Icon | Color | Description |
|--------|------|-------|-------------|
| Complete | [✓] | Green | All data present and valid |
| Missing | [✗] | Red | Data not uploaded or missing entries |
| Issue | [⚠] | Yellow | Data present but has validation issues |

## Navigation

- **From:** Start Page → Quick Actions → Data Confirmation or Top Nav → Data Check
- **To:**
  - File Upload screens (Portfolio/Other) to fix missing files
  - Maintenance screens (Instruments, Index Prices, Durations, Betas, Credit Ratings) to fix incomplete reference data

## Behavior

- All tabs must show "Complete" status before approvals can proceed
- Clicking on incomplete items navigates to appropriate fix screen with filters pre-applied
- Status updates automatically when data is modified in other screens
- Red/yellow indicators block progression to approvals

## API Endpoints Used

- GET `/check-file-completeness` - Get file completeness checks
- GET `/check-main-data-completeness` - Get main data completeness (portfolio manager, custodian, Bloomberg)
- GET `/check-other-data-completeness` - Get other data completeness (index prices, instruments, ratings, durations, betas)
