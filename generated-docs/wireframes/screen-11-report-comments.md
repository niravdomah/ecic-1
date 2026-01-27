# Screen: Report Comments

## Purpose

Add and manage comments tied to specific reports within a reporting period. Comments provide context and rationale for approvers and future reference.

## Wireframe

```
+-------------------------------------------------------------------------+
|  InvestInsight                           [User Profile v]   [Logout]   |
+-------------------------------------------------------------------------+
|  Home | File Import | Data Check | Maintenance | Approvals | Logs      |
+-------------------------------------------------------------------------+
|                                                                         |
|  Report Comments                         Report Batch: March 2024      |
|                                                                         |
|  [Add New Comment]  [Export Comments ↓]                  [Refresh ↻]   |
|                                                                         |
|  Filter by Report:                                                      |
|  [Report: All Reports                                         v]        |
|                                                                         |
|  +------------------------------------------------------------------+   |
|  | Report Name            | Comment                    | User | Date  |  |
|  |------------------------|----------------------------|------|-------|  |
|  | Portfolio A Summary    | Equity allocation increased| J.S  | 03-15 |  |
|  |                        | by 5% this month due to... |      |       |  |
|  |                        |                      [Edit] [Delete]       |  |
|  |------------------------|----------------------------|------|-------|  |
|  | Portfolio B Performance| Performance impacted by    | M.B  | 03-14 |  |
|  |                        | currency movements in USD  |      |       |  |
|  |                        | holdings. See detail...    |      |       |  |
|  |                        |                      [Edit] [Delete]       |  |
|  |------------------------|----------------------------|------|-------|  |
|  | Sanlam Risk Report     | Credit rating downgrade on | A.J  | 03-12 |  |
|  |                        | ZAE000234567 noted. No     |      |       |  |
|  |                        | immediate action required  |      |       |  |
|  |                        |                      [Edit] [Delete]       |  |
|  |------------------------|----------------------------|------|-------|  |
|  | Overall Market Summary | Market volatility increased| J.S  | 03-10 |  |
|  |                        | this month, affecting all  |      |       |  |
|  |                        | portfolios. ALSI down 2.3% |      |       |  |
|  |                        |                      [Edit] [Delete]       |  |
|  +------------------------------------------------------------------+   |
|                                                                         |
|  Showing 1-4 of 12 comments                  [< Prev] [Next >]         |
|                                                                         |
+-------------------------------------------------------------------------+

ADD/EDIT COMMENT DIALOG:
+-----------------------------------------------------------------------+
|  Add Report Comment                                             [X]   |
+-----------------------------------------------------------------------+
|                                                                       |
|  Report Batch: March 2024                                             |
|                                                                       |
|  +----------------------------------------------------------------+   |
|  | Report:        [Portfolio A Summary                       v]   |   |
|  |                                                                |   |
|  |                Available Reports:                              |   |
|  |                - Portfolio A Summary                           |   |
|  |                - Portfolio A Performance                       |   |
|  |                - Portfolio A Risk                              |   |
|  |                - Portfolio B Summary                           |   |
|  |                - Sanlam Risk Report                            |   |
|  |                - Overall Market Summary                        |   |
|  |                - ...                                           |   |
|  +----------------------------------------------------------------+   |
|  |                                                                |   |
|  | Comment:                                                       |   |
|  | +------------------------------------------------------------+ |   |
|  | |                                                            | |   |
|  | | Equity allocation increased by 5% this month due to        | |   |
|  | | rebalancing triggered by bond maturity. New equity         | |   |
|  | | positions taken in technology sector align with            | |   |
|  | | long-term strategy.                                        | |   |
|  | |                                                            | |   |
|  | | Action: Monitor tech exposure in next quarter.             | |   |
|  | |                                                            | |   |
|  | +------------------------------------------------------------+ |   |
|  |                                                                |   |
|  +----------------------------------------------------------------+   |
|                                                                       |
|  Last Changed By: [J. Smith                                    v]     |
|                                                                       |
|  [Save Comment]  [Cancel]                                             |
|                                                                       |
+-----------------------------------------------------------------------+

VIEW COMMENT DIALOG (for long comments):
+-----------------------------------------------------------------------+
|  Comment Details                                                [X]   |
+-----------------------------------------------------------------------+
|                                                                       |
|  Report: Portfolio A Summary                                          |
|  Report Batch: March 2024                                             |
|  Created By: J. Smith                                                 |
|  Created Date: 2024-03-15 14:23:18                                    |
|                                                                       |
|  +----------------------------------------------------------------+   |
|  | Comment:                                                       |   |
|  |                                                                |   |
|  | Equity allocation increased by 5% this month due to           |   |
|  | rebalancing triggered by bond maturity. New equity            |   |
|  | positions taken in technology sector align with               |   |
|  | long-term strategy.                                           |   |
|  |                                                                |   |
|  | Action: Monitor tech exposure in next quarter.                |   |
|  |                                                                |   |
|  | Background:                                                    |   |
|  | - XYZ Ltd bond (ISIN: ZAE000123456) matured on 2024-03-05    |   |
|  | - Proceeds: ZAR 50,000,000                                    |   |
|  | - Reinvestment: 60% AAPL, 40% MSFT                           |   |
|  |                                                                |   |
|  | Reviewed by approvers on 2024-03-16                           |   |
|  +----------------------------------------------------------------+   |
|                                                                       |
|  [Close]                                                              |
|                                                                       |
+-----------------------------------------------------------------------+
```

## Elements

| Element | Type | Description |
|---------|------|-------------|
| Add New Comment | Button | Opens dialog to create new comment |
| Export Comments | Button | Download all comments to Excel |
| Refresh | Button | Reload comments from backend |
| Filter by Report | Dropdown | Filter to show comments for specific report |
| Edit | Button | Opens dialog to modify comment |
| Delete | Button | Remove comment (requires confirmation) |
| Comment Text | Text Area | Multi-line input for comment content |
| Report Selector | Dropdown | Select which report to attach comment to |
| Last Changed By | Dropdown | User creating/modifying comment |
| Save Comment | Button | Submit comment data |

## User Actions

- **Add New Comment**: Opens dialog to select report and enter comment text
- **Edit Comment**: Opens pre-populated dialog to modify existing comment
- **Delete Comment**: Remove comment (soft delete with audit)
- **View Full Comment**: Click on truncated comment to see full text in modal
- **Filter by Report**: Show only comments for selected report
- **Export Comments**: Download all comments for current batch to Excel
- **Refresh**: Reload comments from backend

## Form Validation

- **Report**: Required, from report list configuration
- **Comment**: Required, minimum 10 characters, maximum 5000 characters
- **Last Changed User**: Auto-populated, required
- **Report Batch**: Auto-populated from current batch

## Comment Display Behavior

- Comments are truncated in table view (first 50 characters + "...")
- Click on comment text to view full comment in modal
- Comments sorted by date (most recent first)
- Color coding by user role (optional):
  - Operations: Blue
  - Analysts: Green
  - Approvers: Orange

## Navigation

- **From:** Start Page, Approval screens, or Top Nav → Maintenance → Report Comments
- **To:** None (terminal screen)

## Access Control

- All users can add comments during Data Preparation phase
- Comments cannot be deleted after approval starts (read-only)
- Edit history maintained in audit trail

## State-Based Access

| Workflow State | Add | Edit | Delete | View |
|----------------|-----|------|--------|------|
| Data Preparation | Yes | Yes | Yes | Yes |
| First Approval | Yes | Yes (own) | No | Yes |
| Second Approval | Yes | Yes (own) | No | Yes |
| Final Approval | Yes | Yes (own) | No | Yes |
| Complete | No | No | No | Yes |

## API Endpoints Used

- GET `/report-comments` - Get all report comments for current batch
- POST `/report-comments` - Create new comment
- GET `/report-comments/{Id}` - Get comment by ID
- PUT `/report-comments/{Id}` - Update comment
- DELETE `/report-comments/{Id}?LastChangedUser={user}` - Delete comment
- GET `/configurations` - Get list of reports (ReportList)
