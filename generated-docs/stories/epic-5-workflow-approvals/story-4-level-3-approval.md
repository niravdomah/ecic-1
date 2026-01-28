# Story: Level 3 Final Approval

**Epic:** Workflow & Approvals
**Story:** 4 of 6
**Wireframe:** `../../wireframes/screen-12-approval-workflow.md`

## User Story

**As a** Level 3 approver
**I want** to perform final sign-off on the report batch with mandatory rejection reasons
**So that** the batch can be completed and reports published or returned to Data Preparation with clear reasoning

## Acceptance Criteria

### Happy Path - Approve Level 3 (Final)
- [ ] Given I am a Level 3 approver viewing the approval dashboard, when Level 1 and Level 2 are approved and I review the data, then the "Approve Level 3" button is enabled
- [ ] Given I click "Approve Level 3", when the button is clicked, then I see a confirmation dialog "Confirm Final Approval for batch March 2024?"
- [ ] Given I confirm the approval, when I click "Confirm", then the system submits the Level 3 approval to the API
- [ ] Given the approval is submitted, when the API returns success, then I see a success message "Final approval recorded successfully. Batch will proceed to completion."
- [ ] Given the approval is successful, when I view the dashboard, then the workflow progress updates to show L1, L2, L3 completed, moving toward Complete
- [ ] Given Level 3 is approved, when I view the Previous Approvals section, then I see all three approval levels listed

### Workflow State Transition to Complete
- [ ] Given Level 3 is approved, when the approval completes, then the workflow state transitions from "Final Approval" to "Pending Complete" or "Complete"
- [ ] Given the workflow transitions to Complete, when I refresh the page, then the page shows "Batch Complete" status
- [ ] Given Level 3 is approved, when I navigate to maintenance screens, then they remain read-only with "Batch Complete" message

### Prerequisite Validation
- [ ] Given Level 1 or Level 2 is not yet approved, when I navigate to Level 3 approval page, then I see a message "Level 3 approval is pending Level 1 and Level 2 approvals"
- [ ] Given Level 1 and Level 2 are not both approved, when I view the dashboard, then the "Approve Level 3" button is disabled
- [ ] Given I hover over the disabled button, when prerequisites are not met, then I see a tooltip "Cannot approve Level 3 until Level 1 and Level 2 are approved"

### User Permission Validation
- [ ] Given I am not a Level 3 approver, when I navigate to the Level 3 approval page, then I see a message "You do not have permission to approve at this level. Only Level 3 approvers can perform final sign-off."
- [ ] Given I am a Level 1 or Level 2 approver only, when the workflow is at Level 3, then I can view the dashboard but cannot approve
- [ ] Given Level 3 has already been approved, when I view the page, then I see "Final approval has been completed" and cannot re-approve

### Final Review Emphasis
- [ ] Given I view the Level 3 approval dashboard, when I look at the header, then I see prominent text "Final Approval - Complete Review Required"
- [ ] Given I view the confirmation dialog, when it opens, then I see a warning "This is the final approval. Once confirmed, the batch will be finalized and reports will be published."

### Approval Confirmation Dialog
- [ ] Given I click "Approve Level 3", when the confirmation dialog opens, then I see: Dialog title "Confirm Final Approval", Batch details, Complete data summary, All previous approval details, Warning about finality, "Confirm Final Approval" and "Cancel" buttons
- [ ] Given the confirmation dialog is open, when I click "Cancel", then the dialog closes without submitting approval
- [ ] Given the confirmation dialog is open, when I review the content, then I see a checklist of all completed validations

### Post-Approval Actions
- [ ] Given Level 3 is approved, when the approval completes, then the system triggers backend processes: Publish Final Reports, Set batch status to Complete
- [ ] Given Level 3 is approved, when the success message appears, then I see "Final approval complete. Reports are being published."
- [ ] Given reports are being published, when I view the dashboard, then I see a progress indicator "Publishing reports..."

### Email Notifications
- [ ] Given Level 3 is approved, when the approval completes, then stakeholders receive an email notification "Report batch March 2024 has been finalized and published"
- [ ] Given Level 3 is approved, when reports are published, then report consumers receive access notifications

### Rejection with Mandatory Reason (Story 5)
- [ ] Given I am on the Level 3 approval page, when I click "Reject and Return to Data Preparation", then I see a dialog requiring a rejection reason
- [ ] Given the rejection dialog is open, when I try to submit without entering a reason, then I see a validation error "Rejection reason is required for Level 3"

### Concurrent Approval Prevention
- [ ] Given another user is currently approving Level 3, when I try to approve, then I see a message "An approval action is in progress. Please wait."
- [ ] Given I submit an approval, when the API call is in progress, then the "Approve" button shows a loading state and is disabled

### Audit Trail
- [ ] Given I approve Level 3, when the approval is recorded, then an audit entry is created with: ReportBatchId, Type="Level 3", IsApproved=true, User=[My Username], Timestamp
- [ ] Given the audit entry is created, when I view the Previous Approvals section, then I see "Level 3: Approved by [My Name] on [Timestamp]"

### View Complete Approval History
- [ ] Given I am on the Level 3 approval page, when I view the Previous Approvals section, then I see Level 1, Level 2, and Data Preparation approvals
- [ ] Given I want to see the complete approval chain, when I view the section, then I see each level with approver name and timestamp

### Batch Completion Status
- [ ] Given Level 3 is approved, when the batch completes, then the batch status in the database changes to "Complete"
- [ ] Given the batch is complete, when I view the Start Page, then the batch appears in the Batch History as "Complete"

### Error Handling
- [ ] Given the API fails to submit Level 3 approval, when the error occurs, then I see an error message "Failed to record final approval. Please try again or contact support."
- [ ] Given the API returns a validation error, when the error occurs, then I see the specific error message (e.g., "Cannot approve: Level 2 not yet approved")
- [ ] Given the approval fails, when the error is displayed, then the workflow state does not change and I can retry
- [ ] Given the publish reports process fails after approval, when the error occurs, then I see "Approval recorded, but report publishing failed. Please contact support."

## API Endpoints (from OpenAPI spec)

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/approve-logs/{ReportBatchId}` | Submit Level 3 approval |
| GET | `/approve-logs/{ReportBatchId}/Level 3` | Get Level 3 approval log (check if already approved) |
| GET | `/approve-logs/{ReportBatchId}` | Get all approval logs (verify Level 1 and Level 2 approved) |

**Request for POST `/approve-logs/{ReportBatchId}`:**
```typescript
{
  WorkflowInstanceId: string,
  Type: "Level 3",
  IsApproved: true,
  User: string,
  RejectReason: string // empty for approval, required for rejection
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
- Follow the same pattern as Level 1 and Level 2 approvals with Level 3-specific validations
- Use Shadcn UI components: Dialog, Button, Toast, Badge, Alert (for finality warning)
- Create or reuse API client function in `web/src/lib/api/approvals.ts`:
  - `submitApproval(reportBatchId: number, level: string, user: string)` - submit approval
  - `checkAllPrerequisiteApprovals(reportBatchId: number)` - verify L1 and L2 approved
- Level 3-specific validations:
  - Check that both Level 1 and Level 2 are approved
  - Verify workflow is in "Final Approval" state
  - Ensure user has Level 3 approval permissions
- Approval button logic:
  - Enable only if:
    - User has Level 3 approval permission
    - Workflow is at Level 3 (L1 and L2 approved, L3 not yet approved)
    - All data completeness checks pass
  - Disable with appropriate tooltip if conditions not met
- Confirmation dialog:
  - More detailed than L1/L2 dialogs
  - Show complete approval chain
  - Display warning about finality
  - Larger, more prominent "Confirm Final Approval" button
- Post-approval actions:
  - Update workflow state to "Complete"
  - Trigger backend report publishing (if not automatic)
  - Show progress indicator for publishing
  - Display completion success message
  - Optionally redirect to completed batch view
- Rejection with mandatory reason:
  - Will be implemented in Story 5
  - Level 3 rejection dialog must require reason (validation)
- Email notifications:
  - Trigger on Level 3 approval
  - Notify stakeholders of batch completion
  - Include links to published reports (if available)
- Consider adding a "View Published Reports" link after approval completes
