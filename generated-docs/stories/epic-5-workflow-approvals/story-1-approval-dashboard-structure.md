# Story: Approval Dashboard Structure

**Epic:** Workflow & Approvals
**Story:** 1 of 6
**Wireframe:** `../../wireframes/screen-12-approval-workflow.md`

## User Story

**As an** approver
**I want** to see a comprehensive approval dashboard showing workflow status, data completeness, and approval actions
**So that** I can make informed approval decisions based on complete information

## Acceptance Criteria

### Happy Path - View Approval Dashboard
- [ ] Given I am an approver, when I navigate to the Approvals section, then I see the approval dashboard for the current report batch
- [ ] Given the current workflow is at Level 1, when I view the dashboard, then I see the page title "Level 1 Approval" with the report batch date
- [ ] Given I view the dashboard, when I look at the layout, then I see sections: Workflow Status, Data Completeness Summary, Calculation Status, Report Comments, Previous Approvals, Approval Actions

### Workflow Status Visualization
- [ ] Given I view the Workflow Status section, when I look at the progress indicator, then I see a visual representation: [●]────[●]────[○]────[○]────[○] for Created, Data Prep, L1, L2, L3, Complete
- [ ] Given the workflow is at Level 1 approval, when I view the progress, then I see Created and Data Prep filled (●), L1 active (●), and L2, L3, Complete empty (○)
- [ ] Given I view the Workflow Status, when I look below the progress bar, then I see "Current Activity: Approve First Level"
- [ ] Given I view the Workflow Status, when I look at pending approver, then I see "Pending Approval By: [Approver Name] (Level 1 Approver)"

### Report Batch Information
- [ ] Given I view the dashboard header, when I look at the top right, then I see "Report Batch: March 2024" and "Report Date: 2024-03-31"
- [ ] Given I view the dashboard, when I look at the batch info, then it matches the current active batch

### Data Completeness Summary Section
- [ ] Given I view the Data Completeness Summary, when I look at the section, then I see a card with checkmarks showing completion status for all data categories
- [ ] Given all data is complete, when I view the summary, then I see green checkmarks (✓) for: Portfolio Files, Other Files, Index Prices, Instruments, Credit Ratings, Durations, Betas
- [ ] Given data is complete, when I view the overall status, then I see "Overall Status: ✓ Ready for Approval" in green
- [ ] Given I view the Data Completeness Summary, when I click "View Details", then I am navigated to the Data Confirmation page

### Data Completeness - Incomplete State
- [ ] Given some data is incomplete, when I view the Data Completeness Summary, then I see red X marks (✗) for incomplete categories
- [ ] Given data is incomplete, when I view the overall status, then I see "Overall Status: ✗ Not Ready for Approval" in red
- [ ] Given data is incomplete, when I view the approval actions, then the "Approve" button is disabled

### Calculation Status Section
- [ ] Given I view the Calculation Status section, when I look at the content, then I see calculation execution results
- [ ] Given calculations have run successfully, when I view the status, then I see "✓ RunCalculations: Complete (2024-03-31 14:32:15)"
- [ ] Given draft reports are published, when I view the status, then I see "✓ PublishDraftReports: Complete (2024-03-31 14:45:22)"
- [ ] Given there are no calculation errors, when I view the summary, then I see "Calculation Errors: 0"
- [ ] Given I view the Calculation Status, when I click "View Logs", then I am navigated to the Calculation Logs page

### Report Comments Section
- [ ] Given report comments exist, when I view the Report Comments section, then I see a preview of the most recent 4 comments
- [ ] Given I view a comment, when I look at the display, then I see: Comment title/text, Author name, Date
- [ ] Given there are more than 4 comments, when I view the section, then I see "View All Comments →" link
- [ ] Given I click "View All Comments", when the link is clicked, then I am navigated to the Report Comments page

### Previous Approvals Section
- [ ] Given previous approvals exist, when I view the Previous Approvals section, then I see a list of completed approval steps
- [ ] Given Data Preparation was approved, when I view the list, then I see "Data Preparation: Approved by System on 2024-03-31 14:30:00"
- [ ] Given multiple levels are approved, when I view the list, then I see each approval in chronological order

### Approval Actions Section
- [ ] Given I am viewing the approval dashboard, when I scroll to the bottom, then I see Approval Actions with two buttons
- [ ] Given the workflow is at Level 1, when I view the actions, then I see "Approve Level 1" and "Reject and Return to Data Preparation" buttons
- [ ] Given data is not complete, when I view the "Approve" button, then it is disabled with a tooltip "Cannot approve until all data is complete"

### Level-Specific Titles
- [ ] Given the workflow is at Level 1, when I view the page, then the title shows "Level 1 Approval"
- [ ] Given the workflow is at Level 2, when I view the page, then the title shows "Level 2 Approval"
- [ ] Given the workflow is at Level 3, when I view the page, then the title shows "Level 3 Approval"

### Navigation to Approval Dashboard
- [ ] Given I am on the Start Page, when I click "Approvals" in the top navigation, then I am navigated to the approval dashboard
- [ ] Given the workflow is in Data Preparation, when I navigate to Approvals, then I see a message "No approvals pending. Current workflow is in Data Preparation phase."

### Responsive Layout
- [ ] Given I view the dashboard on a desktop, when I look at the layout, then sections are organized in a grid with 2 columns (Data Summary left, Status right)
- [ ] Given I view the dashboard on mobile, when I look at the layout, then sections stack vertically in a single column

### Error Handling
- [ ] Given the API fails to load approval data, when the page loads, then I see an error message "Unable to load approval information. Please try again."
- [ ] Given the API fails to load data completeness, when the page loads, then I see "Data completeness status unavailable" in that section

## API Endpoints (from OpenAPI spec)

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/configurations` | Get current workflow state and report batch info |
| GET | `/approve-logs/{ReportBatchId}` | Get all approval/rejection logs for the batch |
| GET | `/check-file-completeness` | Get file completeness status |
| GET | `/check-main-data-completeness` | Get main data completeness |
| GET | `/check-other-data-completeness` | Get other data completeness |
| GET | `/calculation-logs` | Get calculation execution logs |
| GET | `/report-comments` | Get report comments for current batch |

## Implementation Notes

- Create page at `/approvals` or `/approvals/dashboard`
- Use Shadcn UI components: Card, Badge, Button, Progress (for workflow visualization), Alert
- Create API client functions in `web/src/lib/api/approvals.ts`:
  - `getApprovalDashboardData(reportBatchId: number)` - aggregate all data for dashboard
  - `getApprovalLogs(reportBatchId: number)` - fetch approval history
- Workflow visualization:
  - Use a custom progress component or stepper
  - Filled circles (●) for completed steps
  - Empty circles (○) for pending steps
  - Highlight current step with different color or animation
- Data Completeness Summary:
  - Aggregate data from check APIs (file completeness, main data, other data)
  - Display as checkmarks with counts (e.g., "✓ All Portfolio Files Complete (45/45 files)")
  - Calculate overall readiness: if any category is incomplete, show "Not Ready"
- Calculation Status:
  - Fetch from calculation logs API
  - Show status and timestamp for key calculations
  - Count errors from calculation error logs
- Report Comments:
  - Fetch from report comments API
  - Display latest 4 comments with truncation if text is long
  - Link to full Report Comments page
- Previous Approvals:
  - Fetch from approval logs API
  - Display each completed approval level with user and timestamp
  - Format: "[Level]: Approved by [User] on [Timestamp]"
- Approval Actions:
  - Enable "Approve" button only if data completeness shows "Ready"
  - Always enable "Reject" button
  - Button actions will be implemented in subsequent stories
- Access control:
  - Check user role to ensure they have approval permissions
  - Display appropriate level based on user's approval authority
- Consider caching dashboard data with React Query (5-minute cache)
- The actual approve/reject functionality will be implemented in Stories 2-5
