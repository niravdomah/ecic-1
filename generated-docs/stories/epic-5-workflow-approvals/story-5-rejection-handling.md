# Story: Rejection Handling and Return to Data Preparation

**Epic:** Workflow & Approvals
**Story:** 5 of 6
**Wireframe:** `../../wireframes/screen-12-approval-workflow.md`

## User Story

**As an** approver at any level
**I want** to reject the report batch and return it to Data Preparation with a reason
**So that** issues can be corrected and the approval process can restart

## Acceptance Criteria

### Happy Path - Reject from Level 1
- [ ] Given I am a Level 1 approver viewing the approval dashboard, when I click "Reject and Return to Data Preparation", then I see a rejection dialog
- [ ] Given the rejection dialog is open, when I view it, then I see fields: Rejection Reason (text area), "Confirm Rejection" and "Cancel" buttons
- [ ] Given I enter a rejection reason, when I click "Confirm Rejection", then the system submits the rejection to the API
- [ ] Given the rejection is submitted, when the API returns success, then I see a success message "Batch rejected. Workflow returned to Data Preparation."
- [ ] Given the rejection is successful, when I view the workflow status, then the workflow state returns to "Data Preparation"

### Happy Path - Reject from Level 2
- [ ] Given I am a Level 2 approver, when I click "Reject and Return to Data Preparation", then I see the rejection dialog
- [ ] Given I submit a rejection from Level 2, when the rejection completes, then the workflow returns to Data Preparation (same behavior as L1 rejection)

### Happy Path - Reject from Level 3 (Mandatory Reason)
- [ ] Given I am a Level 3 approver, when I click "Reject and Return to Data Preparation", then I see the rejection dialog with emphasis on mandatory reason
- [ ] Given the rejection dialog is open, when I view it, then I see a warning "Level 3 rejection requires a detailed reason for audit purposes"
- [ ] Given I try to submit without a reason, when I click "Confirm Rejection", then I see a validation error "Rejection reason is required for Level 3 rejections"
- [ ] Given I enter a reason of less than 10 characters, when I try to submit, then I see a validation error "Level 3 rejection reason must be at least 10 characters"

### Rejection Dialog Components
- [ ] Given the rejection dialog is open, when I view the content, then I see: Dialog title "Reject Batch and Return to Data Preparation", Batch details (date, report month), Rejection Reason text area (multi-line), Character count (optional), Warning text explaining consequences, "Confirm Rejection" and "Cancel" buttons
- [ ] Given I am typing a rejection reason, when I view the text area, then I see a character counter showing "X / 500 characters"

### Workflow State Reset
- [ ] Given a rejection is submitted, when the rejection completes, then the workflow state transitions from [Current Level] to "Data Preparation"
- [ ] Given the workflow returns to Data Preparation, when I navigate to maintenance screens, then all CRUD actions (Add, Edit, Delete) are enabled again
- [ ] Given the workflow returns to Data Preparation, when I navigate to file upload screens, then all upload actions are enabled again

### Clear Calculations on Rejection
- [ ] Given a rejection is submitted, when the rejection completes, then the system triggers "Clear Calculations" process
- [ ] Given calculations are being cleared, when I view the dashboard, then I see a status message "Clearing calculations..."
- [ ] Given calculations are cleared, when the process completes, then I see "Calculations cleared. Data Preparation phase resumed."

### Rejection Reason Capture
- [ ] Given I submit a rejection, when the rejection is recorded, then the rejection reason is stored in the approval logs
- [ ] Given a rejection is recorded, when I view the approval history, then I see "Level [X]: Rejected by [User] on [Timestamp] - Reason: [Rejection Reason]"

### Validation - Reason Required
- [ ] Given I am on the rejection dialog, when I try to submit without entering a reason, then I see a validation error "Rejection reason is required"
- [ ] Given I am a Level 3 approver, when I try to submit a rejection with a very short reason (e.g., "No"), then I see a validation error "Please provide a detailed rejection reason (minimum 10 characters)"

### Rejection Confirmation
- [ ] Given I enter a rejection reason and click "Confirm Rejection", when the confirmation is submitted, then I see a confirmation prompt "Are you sure you want to reject this batch? This will return the workflow to Data Preparation and all approvals will be reset."
- [ ] Given the final confirmation prompt appears, when I click "Yes, Reject", then the rejection is submitted
- [ ] Given the final confirmation prompt appears, when I click "No, Cancel", then the prompt closes and no rejection is submitted

### Post-Rejection Navigation
- [ ] Given a rejection is successful, when the success message appears, then I see a link "View Data Preparation Dashboard →"
- [ ] Given I click "View Data Preparation Dashboard", when the link is clicked, then I am navigated to the Start Page or Data Confirmation page

### Rejection at Different Levels
- [ ] Given I reject at Level 1, when the rejection completes, then Level 1 approval is reset and workflow returns to Data Preparation
- [ ] Given I reject at Level 2, when the rejection completes, then Level 1 and Level 2 approvals are reset
- [ ] Given I reject at Level 3, when the rejection completes, then all three approval levels are reset

### Email Notifications
- [ ] Given a rejection is submitted, when the rejection completes, then operations team receives an email notification "Batch March 2024 rejected by [User] - Reason: [Reason]"
- [ ] Given a rejection is submitted, when the email is sent, then it includes the rejection reason and next steps

### Audit Trail for Rejection
- [ ] Given I submit a rejection, when the rejection is recorded, then an audit entry is created with: ReportBatchId, Type="Level [X]", IsApproved=false, User=[My Username], RejectReason=[Reason], Timestamp
- [ ] Given the audit entry is created, when I view the approval logs API, then I see my rejection recorded with the reason

### Rejection History Display
- [ ] Given a batch has been rejected previously, when I view the Previous Approvals section, then I see rejection history (e.g., "Level 2: Rejected by J. Smith on 2024-04-01 - Reason: Data quality issues in Portfolio A")
- [ ] Given the batch is re-submitted after rejection, when I view the approval history, then I see both the previous rejection and the new approval attempts

### Concurrent Rejection Prevention
- [ ] Given another user is currently submitting a rejection, when I try to reject, then I see a message "An approval action is in progress. Please wait."
- [ ] Given I submit a rejection, when the API call is in progress, then the "Reject" button shows a loading state and is disabled

### Clear Calculations Process
- [ ] Given a rejection triggers clear calculations, when the process runs, then all calculated fields are reset
- [ ] Given calculations are cleared, when I view the Calculation Status section, then it shows "Calculations pending re-run"

### Error Handling
- [ ] Given the API fails to submit rejection, when the error occurs, then I see an error message "Failed to record rejection. Please try again or contact support."
- [ ] Given the API returns a validation error, when the error occurs, then I see the specific error message (e.g., "Rejection reason is required")
- [ ] Given the rejection succeeds but clear calculations fails, when the error occurs, then I see "Rejection recorded, but calculations could not be cleared. Please contact support."

## API Endpoints (from OpenAPI spec)

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/approve-logs/{ReportBatchId}` | Submit rejection for report batch |

**Request for POST `/approve-logs/{ReportBatchId}` (Rejection):**
```typescript
{
  WorkflowInstanceId: string,
  Type: "Level 1" | "Level 2" | "Level 3",
  IsApproved: false,
  User: string,
  RejectReason: string // required for rejection, especially mandatory for Level 3
}
```

**Response (201):**
```typescript
{
  message: "Report batch approval status updated successfully."
}
```

**Note:** The API should trigger "Clear Calculations" process on rejection. If this is a separate endpoint, call it after rejection is recorded.

## Implementation Notes

- Enhance the approval dashboard from Stories 1-4 with rejection functionality
- Use Shadcn UI components: Dialog, Textarea, Button, Alert
- Create or reuse API client function in `web/src/lib/api/approvals.ts`:
  - `submitRejection(reportBatchId: number, level: string, user: string, reason: string)` - submit rejection
  - `clearCalculations(reportBatchId: number)` - trigger clear calculations (if separate endpoint)
- Rejection dialog:
  - Modal with Rejection Reason textarea (multi-line, 500 character limit)
  - Show character count
  - Level 3: Add warning about mandatory reason
  - Include batch details for context
- Validation:
  - Rejection reason: required, string, min length 1 character
  - Level 3 rejection reason: required, min length 10 characters
  - Display validation errors inline below textarea
- Confirmation flow:
  - Step 1: Rejection dialog (enter reason)
  - Step 2: Confirmation prompt (are you sure?)
  - Step 3: Submit rejection
- Post-rejection actions:
  - Update workflow state to "Data Preparation"
  - Refresh approval history
  - Trigger clear calculations process
  - Show success message
  - Optionally redirect to Start Page or Data Confirmation
- Workflow state reset:
  - Update local workflow state cache to "Data Preparation"
  - All approval levels are reset (removed from approval logs)
  - Maintenance and file upload screens become editable again
- Clear calculations:
  - If separate API endpoint exists, call it after rejection
  - Show progress indicator during clearing
  - Handle errors if clearing fails
- Audit trail:
  - Record rejection with IsApproved=false
  - Include rejection reason in audit log
  - Display rejections differently in approval history (red badge, "Rejected" status)
- Email notifications:
  - Send to operations team and submitter
  - Include rejection reason and instructions
- Apply rejection functionality to all three approval levels (L1, L2, L3)
- Level 3 rejection has stricter validation (mandatory detailed reason)
