# Story: File Upload State Management

**Epic:** File Upload & Import Management
**Story:** 6 of 6
**Wireframe:** `../../wireframes/screen-4-file-upload-modal.md`

## User Story

**As a** system administrator
**I want** file upload and modification actions to be restricted based on the current workflow state
**So that** data integrity is maintained and files cannot be changed after approvals have started

## Acceptance Criteria

### Data Preparation Phase (Full Access)
- [ ] Given the workflow is in "Data Preparation" phase, when I view the Portfolio Files page, then all file status icons are clickable
- [ ] Given the workflow is in "Data Preparation" phase, when I open a file upload modal, then the "Upload File", "Retry Validation", and "Cancel File" buttons are enabled
- [ ] Given the workflow is in "Data Preparation" phase, when I view the page actions, then "SFTP Import" and "Re-import [Portfolio]" buttons are enabled

### First Approval Phase (Read-Only)
- [ ] Given the workflow is in "First Approval" (Level 1) phase, when I view the Portfolio Files page, then all file status icons are still clickable (view-only)
- [ ] Given the workflow is in "First Approval" phase, when I open a file upload modal, then the "Upload File", "Retry Validation", and "Cancel File" buttons are disabled
- [ ] Given the workflow is in "First Approval" phase, when I view the page actions, then "SFTP Import" and "Re-import [Portfolio]" buttons are disabled
- [ ] Given I view a disabled button, when I hover over it, then I see a tooltip "File uploads are disabled after First Approval. Files can only be uploaded during Data Preparation phase."

### Second Approval Phase (Read-Only)
- [ ] Given the workflow is in "Second Approval" (Level 2) phase, when I view the file upload pages, then all modification actions remain disabled
- [ ] Given the workflow is in "Second Approval" phase, when I open a file upload modal, then I can view file details but cannot upload, retry, or cancel

### Final Approval Phase (Read-Only)
- [ ] Given the workflow is in "Final Approval" (Level 3) phase, when I view the file upload pages, then all modification actions remain disabled
- [ ] Given the workflow is in "Final Approval" phase, when I open a file upload modal, then I can view file details but cannot upload, retry, or cancel

### Complete Phase (Read-Only)
- [ ] Given the workflow is in "Complete" phase, when I view the file upload pages, then all modification actions remain disabled
- [ ] Given the workflow is in "Complete" phase, when I open a file upload modal, then all actions are disabled except "Download File" and "View Process Log"

### Rejection Returns to Data Preparation
- [ ] Given the workflow is in "Level 1" approval, when an approver rejects the batch, then the workflow returns to "Data Preparation" phase
- [ ] Given the workflow returns to "Data Preparation", when I view the file upload pages, then all upload, retry, and cancel actions are enabled again
- [ ] Given the workflow returns to "Data Preparation" after rejection, when I upload a new file, then it processes normally

### Visual Indicators for Restricted State
- [ ] Given the workflow is not in "Data Preparation" phase, when I view the Portfolio Files page, then I see a banner "File uploads are currently disabled. Workflow is in [Current Phase] phase."
- [ ] Given I view disabled action buttons, when I look at them, then they appear visually disabled (grayed out)
- [ ] Given I hover over a disabled button, when I view the tooltip, then it explains why the action is disabled

### Workflow State Detection
- [ ] Given I load the Portfolio Files page, when the page fetches data, then it also fetches the current workflow state
- [ ] Given the workflow state changes (e.g., admin transitions to Level 1), when I refresh the page, then the UI updates to reflect the new state restrictions
- [ ] Given the workflow state is cached, when I navigate between pages, then the state is consistently applied across all file upload screens

### Error Prevention
- [ ] Given the workflow is in a restricted phase, when I attempt to call an upload API directly (bypassing UI), then the API returns an error "File uploads are not allowed in current workflow phase"
- [ ] Given I have a file upload modal open during Data Preparation, when an admin transitions to Level 1, then my open modal should show a warning "Workflow state has changed. Upload actions are now disabled."

## API Endpoints (from OpenAPI spec)

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/configurations` | Get current workflow state including `ReportBatchWorkflowInstanceCurrentActivity` |

**Response for `/configurations` (relevant fields):**
```typescript
{
  ReportBatchId: number,
  ReportDate: string,
  ReportBatchWorkflowInstanceId: string,
  ReportBatchWorkflowInstanceCurrentActivity: string // "Data Preparation" | "First Approval" | "Second Approval" | "Final Approval" | "Complete"
}
```

**Note:** File upload, retry, and delete API endpoints should enforce workflow state restrictions on the backend. If they don't, coordinate with backend team to add validation.

## Implementation Notes

- Enhance all file upload pages and modals from Stories 1-5
- Fetch workflow state from `/configurations` endpoint
- Create a React Context or Zustand store for workflow state management:
  - `currentWorkflowPhase: string`
  - `isDataPreparationPhase: boolean`
  - `canUploadFiles: boolean`
  - `canModifyFiles: boolean`
- Workflow phase mapping:
  - "Data Preparation" → Full access (upload, retry, cancel, SFTP, re-import)
  - "First Approval" / "Level 1" → Read-only (view, download only)
  - "Second Approval" / "Level 2" → Read-only
  - "Final Approval" / "Level 3" → Read-only
  - "Complete" → Read-only
- Apply restrictions:
  - Disable buttons using `disabled` prop when not in Data Preparation
  - Add tooltips to disabled buttons explaining the restriction
  - Show banner/alert at top of page when in restricted state
- Use Shadcn UI components: Alert, Tooltip, Badge
- Implement periodic polling or WebSocket to detect workflow state changes in real-time
- Consider adding a "Request Data Preparation Access" button for Level 1+ phases that allows users to request a rejection/return to Data Preparation (if business process allows)
- Backend validation:
  - Coordinate with backend team to ensure API endpoints validate workflow state
  - Handle 403 Forbidden errors if backend rejects uploads during restricted phases
- Error handling:
  - If upload is attempted during restricted phase, show clear error message
  - Log workflow state violations for audit purposes
