# Story: Start Page Dashboard

**Epic:** Core Navigation & Start Page
**Story:** 3 of 5
**Wireframe:** `../../wireframes/screen-1-start-page.md`

## User Story

**As a** user accessing InvestInsight
**I want** to see the current report batch status and quick navigation to key areas
**So that** I can quickly understand the system state and navigate to relevant tasks

## Acceptance Criteria

### Current Report Batch Display
- [ ] Given a report batch exists, when I load the Start Page, then I see the current batch information including Report Month, Report Date, and Workflow Status
- [ ] Given the current batch is in "Data Preparation" phase, when I view the status, then I see a workflow progress indicator showing "Created" as completed and "L1, L2, L3, Complete" as pending
- [ ] Given the current batch is in "Level 1" approval phase, when I view the status, then I see "Created" and "L1" as active/completed
- [ ] Given no report batch exists, when I load the Start Page, then I see a message "No active report batch" and a prominent "Create New Batch" button

### Quick Actions Cards
- [ ] Given I am on the Start Page, when I view the Quick Actions section, then I see cards for: Portfolio Files, Other Files, Data Confirmation, and Instruments
- [ ] Given I view the Portfolio Files card, when file upload status is available, then I see a summary like "Status: 12/15" showing completed vs. total files
- [ ] Given I click the "View →" button on the Portfolio Files card, when the button is clicked, then I am navigated to the Portfolio Files page
- [ ] Given I view the Data Confirmation card, when there are incomplete checks, then I see a warning indicator (⚠) and status text like "Status: ⚠ Issues"
- [ ] Given I click any Quick Action card, when I click it, then I am navigated to the corresponding page

### Recent Activity Display
- [ ] Given user actions have occurred recently, when I view the Recent Activity section, then I see a table with columns: Time, Event, User
- [ ] Given recent activity exists, when I view the table, then I see the most recent 10 activities in reverse chronological order (newest first)
- [ ] Given recent activity includes a file upload, when I view the event, then I see descriptive text like "File uploaded: Holdings_Portfolio_A.csv"
- [ ] Given no recent activity exists, when I view the Recent Activity section, then I see "No recent activity"

### Batch History Summary
- [ ] Given historical batches exist, when I view the Batch History section, then I see a table showing the last 5 completed batches
- [ ] Given I view the Batch History table, when I look at the columns, then I see: Date, Status, Approved By, Actions
- [ ] Given a batch shows "Complete" status, when I view the Approved By column, then I see the approver's name (e.g., "L3: K. Wilson")
- [ ] Given I click "View Details" for a historical batch, when the button is clicked, then I am navigated to a read-only view of that batch

### Error Handling
- [ ] Given the API fails to load batch data, when the Start Page loads, then I see an error message "Unable to load batch information. Please try again."
- [ ] Given the API returns empty data, when the Start Page loads, then I see "No active report batch" with a "Create New Batch" button

## API Endpoints (from OpenAPI spec)

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/report-batches` | Fetch all report batches (current and historical) |
| GET | `/process-logs` | Fetch recent activity logs (optional for this story) |

**Note:** The spec mentions `/configurations` in the wireframe, but this endpoint should be verified in the actual API. If `/report-batches` includes current batch status, use that. If not, we may need to identify the correct endpoint for current batch details.

## Implementation Notes

- Create the Start Page dashboard in `web/src/app/page.tsx` (enhancing the Home Page Setup from Story 1)
- **Note:** The home page (`web/src/app/page.tsx`) was created for this feature in the "Home Page Setup" story. Implement this story by enhancing that existing page, not by creating a new route.
- Use Shadcn UI components: Card, Badge, Button, Table
- Create API client functions in `web/src/lib/api/`:
  - `getReportBatches()` - fetches all batches
  - `getCurrentBatch()` - helper to get the active batch from the list
  - `getProcessLogs()` - optional for Recent Activity (may be implemented in a future story)
- Workflow status mapping:
  - "Data Preparation" → show progress as [●]────[○]────[○]────[○]────[○]
  - "Level 1" → show progress as [●]────[●]────[○]────[○]────[○]
  - "Level 2" → show progress as [●]────[●]────[●]────[○]────[○]
  - "Level 3" → show progress as [●]────[●]────[●]────[●]────[○]
  - "Complete" → show progress as [●]────[●]────[●]────[●]────[●]
- For Quick Actions status summaries, use placeholder data for now (will be implemented when those features are built)
- Recent Activity can show placeholder data or be omitted for this story (will be implemented in Epic 6)
- Badge colors:
  - Green for "Complete"
  - Yellow for "In Progress"
  - Blue for "Data Preparation"
  - Red for "Issues"
