# Story: Level 2 Approval Process

**Epic:** Workflow & Approvals
**Story:** 3 of 6
**Wireframe:** `../../wireframes/screen-12-approval-workflow.md`

## User Story

**As a** Level 2 approver
**I want** to review portfolio-level confirmation and approve or reject the report batch
**So that** the batch can progress to final approval or return to Data Preparation for corrections

## Acceptance Criteria

### Happy Path - Approve Level 2
- [ ] Given I am a Level 2 approver viewing the approval dashboard, when Level 1 is approved and I review the data, then the "Approve Level 2" button is enabled
- [ ] Given I click "Approve Level 2", when the button is clicked, then I see a confirmation dialog "Confirm Level 2 approval for batch March 2024?"
- [ ] Given I confirm the approval, when I click "Confirm", then the system submits the Level 2 approval to the API
- [ ] Given the approval is submitted, when the API returns success, then I see a success message "Level 2 approval recorded successfully"
- [ ] Given the approval is successful, when I view the dashboard, then the workflow progress updates to show L1 and L2 completed, and L3 as the next step
- [ ] Given Level 2 is approved, when I view the Previous Approvals section, then I see both Level 1 and Level 2 approvals listed

### Workflow State Transition
- [ ] Given Level 2 is approved, when the approval completes, then the workflow state transitions from "Second Approval" to "Final Approval"
- [ ] Given the workflow transitions to Level 3, when I refresh the page, then the page title changes to "Level 3 Approval" or shows "Approval submitted, pending Level 3"
- [ ] Given Level 2 is approved, when I navigate to maintenance screens, then they remain read-only

### Prerequisite Validation
- [ ] Given Level 1 is not yet approved, when I navigate to Level 2 approval page, then I see a message "Level 2 approval is pending Level 1 approval"
- [ ] Given Level 1 is not approved, when I view the dashboard, then the "Approve Level 2" button is disabled
- [ ] Given I hover over the disabled button, when Level 1 is pending, then I see a tooltip "Cannot approve Level 2 until Level 1 is approved"

### User Permission Validation
- [ ] Given I am not a Level 2 approver, when I navigate to the Level 2 approval page, then I see a message "You do not have permission to approve at this level"
- [ ] Given I am a Level 1 approver only, when the workflow is at Level 2, then I can view the dashboard but cannot approve
- [ ] Given I am a Level 2 approver, when the workflow is at Level 3, then I see "This level has already been approved" and cannot re-approve

### Portfolio-Level Confirmation Focus
- [ ] Given I view the Level 2 approval dashboard, when I look at the Data Completeness Summary, then I see portfolio-level checks highlighted (e.g., "✓ All Portfolios Confirmed")
- [ ] Given I view the dashboard, when I review calculations, then I see portfolio-specific calculation results (performance, risk metrics)

### Approval Confirmation Dialog
- [ ] Given I click "Approve Level 2", when the confirmation dialog opens, then I see: Dialog title "Confirm Level 2 Approval", Batch details, Portfolio confirmation summary, "Confirm" and "Cancel" buttons
- [ ] Given the confirmation dialog is open, when I click "Cancel", then the dialog closes without submitting approval
- [ ] Given the confirmation dialog is open, when I review the summary, then I see key portfolio metrics and any outstanding items

### Post-Approval Navigation
- [ ] Given Level 2 is approved, when the success message appears, then I see a link "View Level 3 Approval →"
- [ ] Given I click "View Level 3 Approval", when the link is clicked, then I am navigated to the Level 3 approval dashboard (if I have Level 3 permissions)

### Email Notifications (Optional)
- [ ] Given Level 2 is approved, when the approval completes, then Level 3 approvers receive an email notification "Report batch March 2024 is ready for final approval"

### Concurrent Approval Prevention
- [ ] Given another user is currently approving Level 2, when I try to approve, then I see a message "An approval action is in progress. Please wait."
- [ ] Given I submit an approval, when the API call is in progress, then the "Approve" button shows a loading state and is disabled

### Audit Trail
- [ ] Given I approve Level 2, when the approval is recorded, then an audit entry is created with: ReportBatchId, Type="Level 2", IsApproved=true, User=[My Username], Timestamp
- [ ] Given the audit entry is created, when I view the Previous Approvals section, then I see "Level 2: Approved by [My Name] on [Timestamp]"

### View Previous Level Details
- [ ] Given I am on the Level 2 approval page, when I view the Previous Approvals section, then I see Level 1 approval details
- [ ] Given I want to see who approved Level 1, when I view the Previous Approvals, then I see "Level 1: Approved by [User] on [Timestamp]"

### Error Handling
- [ ] Given the API fails to submit Level 2 approval, when the error occurs, then I see an error message "Failed to record approval. Please try again or contact support."
- [ ] Given the API returns a validation error, when the error occurs, then I see the specific error message (e.g., "Cannot approve: Level 1 not yet approved")
- [ ] Given the approval fails, when the error is displayed, then the workflow state does not change and I can retry

## API Endpoints (from OpenAPI spec)

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/approve-logs/{ReportBatchId}` | Submit Level 2 approval |
| GET | `/approve-logs/{ReportBatchId}/Level 2` | Get Level 2 approval log (check if already approved) |
| GET | `/approve-logs/{ReportBatchId}` | Get all approval logs (verify Level 1 approved) |

**Request for POST `/approve-logs/{ReportBatchId}`:**
```typescript
{
  WorkflowInstanceId: string,
  Type: "Level 2",
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

- Reuse and enhance the approval dashboard structure from Story 1
- Follow the same pattern as Level 1 approval (Story 2) with Level 2-specific validations
- Use Shadcn UI components: Dialog, Button, Toast, Badge
- Create or reuse API client function in `web/src/lib/api/approvals.ts`:
  - `submitApproval(reportBatchId: number, level: string, user: string)` - submit approval
  - `checkPrerequisiteApproval(reportBatchId: number, level: string)` - verify previous level approved
- Level 2-specific validations:
  - Check that Level 1 is approved before allowing Level 2 approval
  - Verify workflow is in "Second Approval" state
  - Ensure user has Level 2 approval permissions
- Approval button logic:
  - Enable only if:
    - User has Level 2 approval permission
    - Workflow is at Level 2 (Level 1 approved, Level 2 not yet approved)
    - All data completeness checks pass (same as Level 1)
  - Disable with appropriate tooltip if conditions not met
- Confirmation dialog:
  - Similar to Level 1 but with Level 2 context
  - Display portfolio-level summary
  - Show Level 1 approval details for reference
- Post-approval actions:
  - Update workflow state cache
  - Refresh approval history
  - Show success message
  - Optionally redirect to Level 3 page
- The reject functionality will be implemented in Story 5
- Level 3 approval follows the same pattern but with additional requirements (Story 4)
