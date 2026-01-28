# Story: Data Confirmation Tab Navigation

**Epic:** Data Confirmation & Validation
**Story:** 1 of 5
**Wireframe:** `../../wireframes/screen-5-data-confirmation.md`

## User Story

**As an** operations user
**I want** to navigate between different categories of data completeness checks using tabs
**So that** I can organize and focus on specific types of validation (file checks vs. reference data checks)

## Acceptance Criteria

### Happy Path - Tab Structure
- [ ] Given I navigate to the Data Confirmation page, when the page loads, then I see three tabs: "Main File Checks", "Other Checks", "Portfolio Re-imports"
- [ ] Given I am viewing the Data Confirmation page, when I click the "Main File Checks" tab, then I see portfolio file completeness checks
- [ ] Given I am viewing the Data Confirmation page, when I click the "Other Checks" tab, then I see reference data completeness checks
- [ ] Given I am viewing the Data Confirmation page, when I click the "Portfolio Re-imports" tab, then I see portfolio re-import status

### Default Tab
- [ ] Given I navigate to Data Confirmation for the first time, when the page loads, then the "Main File Checks" tab is selected by default
- [ ] Given I was viewing the "Other Checks" tab and navigate away, when I return to Data Confirmation, then the "Main File Checks" tab is selected (default behavior)

### Tab Visual States
- [ ] Given I am viewing a specific tab, when I look at the tab navigation, then the active tab is visually highlighted with a different background color or underline
- [ ] Given I hover over a non-active tab, when I move my mouse over it, then it shows a hover state
- [ ] Given I view the tabs, when I look at the active tab, then it has a clear visual distinction from inactive tabs

### Report Batch Display
- [ ] Given I am on any tab, when I view the page header, then I see the current report batch (e.g., "Report Batch: March 2024")
- [ ] Given no active report batch exists, when I navigate to Data Confirmation, then I see a message "No active report batch. Please create a batch first."

### Overall Status Badge
- [ ] Given all checks are complete, when I view the page header, then I see "Overall Status: [✓ All Complete]" with a green badge
- [ ] Given some checks have issues, when I view the page header, then I see "Overall Status: [⚠ Issues Found]" with a yellow badge
- [ ] Given critical data is missing, when I view the page header, then I see "Overall Status: [✗ Issues Found]" with a red badge

### Refresh Button
- [ ] Given I am on any tab, when I view the page header, then I see a "Refresh" button in the top right
- [ ] Given I click the "Refresh" button, when it is clicked, then all data on the current tab reloads from the API

### Tab Content Persistence
- [ ] Given I have scrolled down on the "Main File Checks" tab, when I switch to "Other Checks" and back, then the "Main File Checks" tab maintains my scroll position (optional enhancement)

### URL State (Optional)
- [ ] Given I am viewing the "Other Checks" tab, when I copy the URL, then the URL includes the tab identifier (e.g., `/data-confirmation?tab=other-checks`)
- [ ] Given I navigate to a URL with a tab parameter, when the page loads, then it opens the specified tab

### Error Handling
- [ ] Given the API fails to load any tab's data, when the page loads, then I see an error message "Unable to load data confirmation checks. Please try again."
- [ ] Given I click the Refresh button and the API fails, when the error occurs, then I see an error message "Failed to refresh data. Please try again."

## API Endpoints (from OpenAPI spec)

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/check-file-completeness` | Get file completeness checks (for Main File Checks tab) |
| GET | `/check-main-data-completeness` | Get main data completeness (for Main File Checks tab) |
| GET | `/check-other-data-completeness` | Get other data completeness (for Other Checks tab) |
| GET | `/configurations` | Get current report batch information |

**Note:** Portfolio Re-imports tab may use additional endpoints to be determined in future stories.

## Implementation Notes

- Create page at `/data-confirmation`
- Use Shadcn UI components: Tabs, TabsList, TabsTrigger, TabsContent, Badge, Button
- Tab structure:
  ```tsx
  <Tabs defaultValue="main-file-checks">
    <TabsList>
      <TabsTrigger value="main-file-checks">Main File Checks</TabsTrigger>
      <TabsTrigger value="other-checks">Other Checks</TabsTrigger>
      <TabsTrigger value="portfolio-reimports">Portfolio Re-imports</TabsTrigger>
    </TabsList>
    <TabsContent value="main-file-checks">
      {/* Story 2 content */}
    </TabsContent>
    <TabsContent value="other-checks">
      {/* Story 3 content */}
    </TabsContent>
    <TabsContent value="portfolio-reimports">
      {/* Future implementation */}
    </TabsContent>
  </Tabs>
  ```
- Create API client functions in `web/src/lib/api/data-checks.ts`:
  - `getFileCompletenessChecks()` - fetch file completeness data
  - `getMainDataCompletenessChecks()` - fetch main data completeness
  - `getOtherDataCompletenessChecks()` - fetch other data completeness
  - `getCurrentBatchInfo()` - reuse from Epic 1 if available
- Overall Status calculation:
  - If all checks return "Complete" → "✓ All Complete" (green)
  - If any check returns "Missing" or "Failed" → "⚠ Issues Found" (yellow/red)
- Refresh functionality:
  - Refetch data for the currently active tab
  - Show loading state during refresh
  - Update last refreshed timestamp (optional)
- URL state management:
  - Use Next.js router query parameters to track active tab
  - Update URL when tab changes (optional, use `router.push()` with shallow routing)
- The content of each tab will be implemented in Stories 2, 3, and future stories
- Portfolio Re-imports tab can be a placeholder for now ("Coming soon" or empty state)
