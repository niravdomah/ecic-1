# Story: Level 1 Approval Process

**Epic:** Workflow & Approvals
**Story:** 2 of 6
**Wireframe:** `../../wireframes/screen-12-approval-workflow.md`

## User Story

**As a** Level 1 approver
**I want** to approve or reject the report batch after reviewing data completeness and calculations
**So that** the batch can progress to Level 2 approval or return to Data Preparation for corrections

## Acceptance Criteria

### Happy Path - Approve Level 1
- [ ] Given I am a Level 1 approver viewing the approval dashboard, when all data is complete and calculations are successful, then the "Approve Level 1" button is enabled
- [ ] Given I click "Approve Level 1", when the button is clicked, then I see a confirmation dialog "Confirm Level 1 approval for batch March 2024?"
- [ ] Given I confirm the approval, when I click "Confirm", then the system submits the approval to the API
- [ ] Given the approval is submitted, when the API returns success, then I see a success message "Level 1 approval recorded successfully"
- [ ] Given the approval is successful, when I view the dashboard, then the workflow progress updates to show L1 completed and L2 as the next step
- [ ] Given Level 1 is approved, when I view the Previous Approvals section, then I see "Level 1: Approved by [My Name] on [Current Timestamp]"

### Workflow State Transition
- [ ] Given Level 1 is approved, when the approval completes, then the workflow state transitions from "First Approval" to "Second Approval"
- [ ] Given the workflow transitions to Level 2, when I refresh the page, then the page title changes to "Level 2 Approval" (or shows message "Approval submitted, pending Level 2")
- [ ] Given Level 1 is approved, when I navigate to maintenance screens, then they remain read-only (restrictions carry through approval levels)

### Data Completeness Validation
- [ ] Given not all data is complete, when I view the "Approve Level 1" button, then it is disabled
- [ ] Given I hover over the disabled "Approve" button, when I view the tooltip, then I see "Cannot approve: X incomplete items found. View Data Confirmation for details."
- [ ] Given I click "View Details" in Data Completeness, when I am taken to Data Confirmation, then I can see which items are incomplete

### Calculation Status Validation
- [ ] Given calculations have not run successfully, when I view the Calculation Status, then I see error indicators
- [ ] Given calculations failed, when I try to approve, then the "Approve" button is disabled
- [ ] Given I hover over the disabled "Approve" button with calc errors, when I view the tooltip, then I see "Cannot approve: Calculation errors exist. View logs for details."

### User Permission Validation
- [ ] Given I am not a Level 1 approver, when I navigate to the Level 1 approval page, then I see a message "You do not have permission to approve at this level"
- [ ] Given I am a Level 2 or Level 3 approver only, when the workflow is at Level 1, then I can view the dashboard but cannot approve
- [ ] Given I am a Level 1 approver, when the workflow is at Level 2 or 3, then I see "This level has already been approved" and cannot re-approve

### Concurrent Approval Prevention
- [ ] Given another user is currently approving, when I try to approve, then I see a message "An approval action is in progress. Please wait."
- [ ] Given I submit an approval, when the API call is in progress, then the "Approve" button shows a loading state and is disabled
- [ ] Given my approval completes, when the success message appears, then the button returns to normal state (now showing Level 2 context)

### Approval Confirmation Dialog
- [ ] Given I click "Approve Level 1", when the confirmation dialog opens, then I see: Dialog title "Confirm Level 1 Approval", Batch details (date, report month), Summary of what's being approved, "Confirm" and "Cancel" buttons
- [ ] Given the confirmation dialog is open, when I click "Cancel", then the dialog closes without submitting approval
- [ ] Given the confirmation dialog is open, when I click outside the dialog (backdrop), then the dialog does not close (prevent accidental dismissal)

### Post-Approval Navigation
- [ ] Given Level 1 is approved, when the success message appears, then I see a link "View Level 2 Approval →"
- [ ] Given I click "View Level 2 Approval", when the link is clicked, then I am navigated to the Level 2 approval dashboard (if I have Level 2 permissions)

### Email Notifications (Optional)
- [ ] Given Level 1 is approved, when the approval completes, then Level 2 approvers receive an email notification "Report batch March 2024 is ready for Level 2 approval"

### Audit Trail
- [ ] Given I approve Level 1, when the approval is recorded, then an audit entry is created with: ReportBatchId, Type="Level 1", IsApproved=true, User=[My Username], Timestamp
- [ ] Given the audit entry is created, when I view the approval logs API, then I see my approval recorded

### Error Handling
- [ ] Given the API fails to submit approval, when the error occurs, then I see an error message "Failed to record approval. Please try again or contact support."
- [ ] Given the API returns a validation error, when the error occurs, then I see the specific error message (e.g., "Cannot approve: Data completeness check failed")
- [ ] Given the approval fails, when the error is displayed, then the workflow state does not change and I can retry

## API Endpoints (from OpenAPI spec)

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/approve-logs/{ReportBatchId}` | Submit approval or rejection for report batch |
| GET | `/approve-logs/{ReportBatchId}/Level 1` | Get Level 1 approval log (check if already approved) |

**Request for POST `/approve-logs/{ReportBatchId}`:**
```typescript
{
  WorkflowInstanceId: string,
  Type: "Level 1",
  IsApproved: true,
  User: string,
  RejectReason: string // empty for approval
}
```

**Response (201):**
```typescript
{
  message: "Report batch approval status updated successfully."
}
```

## Implementation Notes

- Enhance the approval dashboard from Story 1 with approval functionality
- Use Shadcn UI components: Dialog (for confirmation), Button, Toast (for notifications)
- Create API client function in `web/src/lib/api/approvals.ts`:
  - `submitApproval(reportBatchId: number, level: string, user: string)` - submit approval
  - `checkApprovalStatus(reportBatchId: number, level: string)` - check if already approved
- Approval button logic:
  - Enable only if:
    - User has Level 1 approval permission
    - Workflow is at Level 1 (not already approved)
    - All data completeness checks pass
    - No calculation errors
  - Disable with appropriate tooltip message if conditions not met
- Confirmation dialog:
  - Show batch details from current state
  - Display data completeness summary
  - Confirm user understands they are approving
- Post-approval actions:
  - Update local workflow state cache
  - Refresh approval history
  - Show success message with next steps
  - Optionally redirect to Level 2 page (if user has L2 permissions)
- Workflow instance ID:
  - Fetch from `/configurations` endpoint
  - Include in approval request
- User identification:
  - Get current user from authentication context
  - Pass username to API
- Error handling:
  - Display API errors clearly
  - Allow retry on failure
  - Log errors for debugging
- Permission checking:
  - Check user role/permissions before rendering approval button
  - Backend should also validate permissions
- The reject functionality will be implemented in Story 5
- Level 2 and Level 3 approval will follow the same pattern (Stories 3-4)
