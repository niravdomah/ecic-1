# Story: Maintenance State Management

**Epic:** Maintenance Screens - Financial Data
**Story:** 7 of 7
**Wireframe:** All maintenance screens

## User Story

**As a** system administrator
**I want** maintenance screen actions to be restricted based on the current workflow state
**So that** data integrity is maintained and reference data cannot be changed after approvals have started

## Acceptance Criteria

### Data Preparation Phase (Full Access)
- [ ] Given the workflow is in "Data Preparation" phase, when I view any maintenance screen (Instruments, Index Prices, Durations, Betas, Credit Ratings), then all CRUD actions (Add, Edit, Delete) are enabled
- [ ] Given the workflow is in "Data Preparation" phase, when I open an Add/Edit dialog, then I can modify all fields and save changes
- [ ] Given the workflow is in "Data Preparation" phase, when I click Delete, then the confirmation dialog appears and I can delete records

### First Approval Phase (Read-Only)
- [ ] Given the workflow is in "First Approval" (Level 1) phase, when I view any maintenance screen, then the "Add", "Edit", and "Delete" buttons are disabled
- [ ] Given the workflow is in "First Approval" phase, when I view a maintenance screen, then I see a banner "Maintenance screens are read-only after First Approval. Changes can only be made during Data Preparation phase."
- [ ] Given I hover over a disabled button, when I view the tooltip, then I see "This action is disabled. Maintenance screens are locked after First Approval."

### Second Approval Phase (Read-Only)
- [ ] Given the workflow is in "Second Approval" (Level 2) phase, when I view any maintenance screen, then all modification actions remain disabled
- [ ] Given the workflow is in "Second Approval" phase, when I try to open an Add/Edit dialog, then the dialog does not open (buttons are disabled)

### Final Approval Phase (Read-Only)
- [ ] Given the workflow is in "Final Approval" (Level 3) phase, when I view any maintenance screen, then all modification actions remain disabled
- [ ] Given the workflow is in "Final Approval" phase, when I view maintenance data, then all tables are in read-only mode

### Complete Phase (Read-Only)
- [ ] Given the workflow is in "Complete" phase, when I view any maintenance screen, then all modification actions remain disabled
- [ ] Given the workflow is in "Complete" phase, when I view the banner, then I see "This batch is complete. All data is read-only."

### View Actions Always Enabled
- [ ] Given the workflow is in any restricted phase, when I view a maintenance screen, then the "View", "History", and "Export" actions remain enabled
- [ ] Given I click "History" in a restricted phase, when the audit trail opens, then I can view historical changes (read-only)
- [ ] Given I click "Export" in a restricted phase, when the export completes, then the file downloads successfully

### Rejection Returns to Data Preparation
- [ ] Given the workflow is in "Level 1" approval, when an approver rejects the batch, then the workflow returns to "Data Preparation" phase
- [ ] Given the workflow returns to "Data Preparation", when I view maintenance screens, then all Add, Edit, and Delete actions are enabled again
- [ ] Given the workflow returns to "Data Preparation" after rejection, when I add or edit data, then changes save normally

### Visual Indicators for Restricted State
- [ ] Given the workflow is not in "Data Preparation" phase, when I view any maintenance screen, then disabled buttons appear grayed out
- [ ] Given the workflow is restricted, when I view the page header, then I see a badge showing the current workflow phase (e.g., "Workflow: Level 1 Approval - Read Only")
- [ ] Given the workflow is restricted, when I view the banner, then it is displayed prominently at the top of the page with a warning icon

### Workflow State Detection
- [ ] Given I load a maintenance screen, when the page initializes, then it fetches the current workflow state from the API
- [ ] Given the workflow state changes (e.g., admin transitions to Level 1), when I refresh the page, then the UI updates to reflect the new state restrictions
- [ ] Given the workflow state is cached, when I navigate between maintenance screens, then the state is consistently applied across all screens

### Per-Screen Application
- [ ] Given the workflow is restricted, when I view the Instruments page, then Add/Edit/Delete buttons are disabled
- [ ] Given the workflow is restricted, when I view the Index Prices page, then Add/Edit/Delete buttons are disabled
- [ ] Given the workflow is restricted, when I view the Durations page, then Add/Edit/Delete buttons are disabled
- [ ] Given the workflow is restricted, when I view the Betas page, then Add/Edit/Delete buttons are disabled
- [ ] Given the workflow is restricted, when I view the Credit Ratings page, then Add/Edit/Delete buttons are disabled and "Retry Decision Flow" is disabled

### Error Prevention
- [ ] Given the workflow is in a restricted phase, when I attempt to call a create/update/delete API directly (bypassing UI), then the API returns an error "Modifications are not allowed in current workflow phase"
- [ ] Given I have a maintenance dialog open during Data Preparation, when an admin transitions to Level 1, then my open dialog shows a warning "Workflow state has changed. Save actions are now disabled."

### Outstanding Items in Restricted Phase
- [ ] Given the workflow is restricted, when I view the "Outstanding Durations" or "Outstanding Betas" sections, then I see the outstanding items but cannot add entries
- [ ] Given outstanding items exist in a restricted phase, when I view them, then I see a message "Outstanding items can only be addressed during Data Preparation phase"

### Bulk Operations in Restricted Phase
- [ ] Given the workflow is restricted, when I view maintenance screens, then bulk operations (Upload, Import, Retry Decision Flow) are disabled
- [ ] Given I hover over a disabled bulk operation button, when I view the tooltip, then I see "Bulk operations are disabled after First Approval"

### Error Handling
- [ ] Given the API fails to fetch workflow state, when the page loads, then I see a warning message "Unable to determine workflow state. Some actions may be unavailable."
- [ ] Given the API enforces workflow restrictions, when I attempt a restricted action, then I see an error "This action is not allowed in the current workflow phase. Please wait for batch rejection or start a new batch."

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

**Note:** All maintenance API endpoints (POST, PUT, DELETE) should enforce workflow state restrictions on the backend. Coordinate with backend team to ensure validation is in place.

## Implementation Notes

- Enhance all maintenance screens from Stories 1-6 with state management
- Fetch workflow state from `/configurations` endpoint
- Create a React Context or Zustand store for workflow state management:
  - `currentWorkflowPhase: string`
  - `isDataPreparationPhase: boolean`
  - `canModifyData: boolean`
- Workflow phase mapping:
  - "Data Preparation" → Full access (Add, Edit, Delete, Bulk Operations)
  - "First Approval" / "Level 1" → Read-only (View, History, Export only)
  - "Second Approval" / "Level 2" → Read-only
  - "Final Approval" / "Level 3" → Read-only
  - "Complete" → Read-only
- Apply restrictions to all maintenance screens:
  - Instruments (Story 1)
  - Index Prices (Story 3)
  - Durations (Story 4)
  - Betas (Story 5)
  - Credit Ratings (Story 6)
- Disabled button implementation:
  - Use `disabled` prop on buttons when not in Data Preparation
  - Add tooltips explaining why actions are disabled
  - Gray out disabled buttons with reduced opacity
- Banner/alert display:
  - Show at top of each maintenance page when restricted
  - Use Shadcn Alert component with warning variant
  - Include current workflow phase in message
- Workflow badge:
  - Display in page header showing current phase
  - Color coding: Green (Data Preparation), Yellow (Approvals), Gray (Complete)
- Reuse state management logic from Epic 2 Story 6 (File Upload State Management)
- Consider implementing periodic polling or WebSocket to detect workflow state changes in real-time
- Backend validation:
  - Ensure API endpoints validate workflow state
  - Return 403 Forbidden if modification attempted in restricted phase
  - Include clear error messages in API responses
- Exception handling:
  - If workflow state fetch fails, default to read-only mode (fail-safe)
  - Log errors for debugging
- Apply the same pattern to future maintenance screens (if any are added later)
