# Story: Issues Summary and Quick Navigation

**Epic:** Data Confirmation & Validation
**Story:** 4 of 5
**Wireframe:** `../../wireframes/screen-5-data-confirmation.md`

## User Story

**As an** operations user
**I want** a consolidated issues summary with quick links to fix screens
**So that** I can efficiently address all data completeness issues without manually navigating through multiple sections

## Acceptance Criteria

### Happy Path - Issues Summary Display
- [ ] Given there are incomplete items across all checks, when I view any tab on Data Confirmation, then I see an "Issues Summary" section at the bottom
- [ ] Given there are file check issues and reference data issues, when I view the Issues Summary, then I see a combined count (e.g., "Issues Summary: 19 issues found")
- [ ] Given all checks are complete, when I view the Data Confirmation page, then the Issues Summary shows "All checks complete ✓" or is hidden

### Issues List on Main File Checks Tab
- [ ] Given Portfolio A's Income data is missing, when I view the Issues Summary on Main File Checks, then I see "- Portfolio A: Income data missing [Fix Now →]"
- [ ] Given Portfolio B's Cash data is missing, when I view the Issues Summary, then I see "- Portfolio B: Cash data missing [Fix Now →]"
- [ ] Given there are multiple missing files, when I view the Issues Summary, then I see each issue listed on a separate line

### Issues List on Other Checks Tab
- [ ] Given there are 2 incomplete index prices, when I view the Issues Summary on Other Checks, then I see "- Index Prices: 2 incomplete [Fix Now →]"
- [ ] Given there are 8 incomplete instruments, when I view the Issues Summary, then I see "- Instruments: 8 incomplete [Fix Now →]"
- [ ] Given there are 5 incomplete durations, when I view the Issues Summary, then I see "- Durations: 5 incomplete [Fix Now →]"
- [ ] Given there are multiple incomplete reference data types, when I view the Issues Summary, then I see each type listed on a separate line

### Fix Now Link Navigation
- [ ] Given I click "Fix Now" for "Portfolio A: Income data missing", when the link is clicked, then I am navigated to the file upload page for Portfolio A's Income file
- [ ] Given I click "Fix Now" for "Index Prices: 2 incomplete", when the link is clicked, then I am navigated to the Index Prices maintenance screen filtered for incomplete items
- [ ] Given I click "Fix Now" for any issue, when the link is clicked, then I am navigated to the appropriate fix screen with relevant filters applied

### Overall Status Badge Update
- [ ] Given there are issues, when I view the page header, then the Overall Status badge shows "[⚠] Issues Found" in yellow/red
- [ ] Given all issues are resolved, when I refresh the page, then the Overall Status badge shows "[✓] All Complete" in green
- [ ] Given the workflow is blocked by critical issues, when I view the Overall Status, then it shows "[✗] Critical Issues" in red

### Quick Action Buttons (Combined from All Tabs)
- [ ] Given I am on the Main File Checks tab with issues, when I scroll to the Issues Summary, then I see quick action buttons like "Go to File Upload" grouped by category
- [ ] Given I am on the Other Checks tab with issues, when I scroll to the Issues Summary, then I see quick action buttons: "Fix Index Prices", "Fix Instruments", "Fix Durations", "Fix Betas", "Fix Ratings"
- [ ] Given I click a quick action button, when the button is clicked, then I am navigated to the corresponding maintenance screen

### Issues Summary Collapsible (Optional Enhancement)
- [ ] Given there are many issues (>10), when I view the Issues Summary, then the list is initially collapsed showing only "X issues found [Show All ▼]"
- [ ] Given the issues list is collapsed, when I click "Show All", then the full list expands
- [ ] Given the issues list is expanded, when I click "Collapse", then it collapses back to summary view

### Priority Sorting
- [ ] Given there are both critical and warning issues, when I view the Issues Summary, then critical issues (missing files) appear first, followed by warnings (incomplete reference data)
- [ ] Given issues have the same priority, when I view the list, then they are sorted alphabetically by category/portfolio name

### Empty State
- [ ] Given all checks are complete, when I view the Issues Summary section, then I see "✓ All data checks complete. Ready to proceed to approvals."
- [ ] Given there are no portfolios or data configured, when I view the Issues Summary, then I see "No data to validate"

### Visual Indicators
- [ ] Given there are issues, when I view the Issues Summary, then I see a warning icon (⚠) or exclamation icon (!) next to the summary count
- [ ] Given issues are grouped by category, when I view the list, then each category has a distinct visual separator or grouping

### Error Handling
- [ ] Given the API fails to load issues data, when the page loads, then I see an error message "Unable to load issues summary. Please try again."
- [ ] Given some sections fail to load, when the page loads, then I show available issues and indicate which sections failed to load

## API Endpoints (from OpenAPI spec)

This story combines data from multiple endpoints:

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/check-file-completeness` | Get file completeness checks |
| GET | `/check-main-data-completeness` | Get main data completeness |
| GET | `/check-other-data-completeness` | Get other data completeness |

The Issues Summary is calculated client-side by aggregating incomplete items from all API responses.

## Implementation Notes

- Enhance the Data Confirmation page from Stories 1-3 with Issues Summary component
- Use Shadcn UI components: Alert, Card, Button, Badge, Collapsible
- Create a component `IssuesSummary.tsx` that:
  - Accepts data from all check APIs
  - Calculates total issues count
  - Builds a list of issues with descriptive text and fix links
- Issue data structure:
  ```typescript
  interface Issue {
    category: 'file' | 'reference-data',
    priority: 'critical' | 'warning',
    description: string, // e.g., "Portfolio A: Income data missing"
    fixLink: string, // e.g., "/file-import/portfolio-files?portfolio=A&fileType=income"
    count?: number // For reference data issues
  }
  ```
- Issue generation logic:
  - Iterate through Main File Checks data and create an issue for each "Missing" status
  - Iterate through Other Checks data and create an issue for each incomplete count > 0
  - Sort issues by priority (critical first) then alphabetically
- Fix link mapping:
  - File issues → `/file-import/portfolio-files` or open File Upload Modal
  - Index Prices → `/maintenance/index-prices?filter=incomplete`
  - Instruments → `/maintenance/instruments?filter=incomplete`
  - Credit Ratings → `/maintenance/credit-ratings?filter=incomplete`
  - Durations → `/maintenance/durations?filter=incomplete`
  - Betas → `/maintenance/betas?filter=incomplete`
- Display Issues Summary at the bottom of each tab content
- Quick action buttons:
  - Group by category (Files, Reference Data)
  - Display only buttons relevant to current tab
  - Add issue count badges on buttons (optional)
- Overall Status badge logic:
  - No issues → "✓ All Complete" (green)
  - 1+ warnings → "⚠ Issues Found" (yellow)
  - 1+ critical → "✗ Critical Issues" (red)
- Consider adding a "Fix All Issues" wizard that guides users through each issue sequentially
