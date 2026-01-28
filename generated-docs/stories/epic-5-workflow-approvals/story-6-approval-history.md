# Story: Approval History Display

**Epic:** Workflow & Approvals
**Story:** 6 of 6
**Wireframe:** `../../wireframes/screen-12-approval-workflow.md`

## User Story

**As a** user viewing the approval dashboard
**I want** to see a complete history of all approval and rejection actions
**So that** I can understand the approval chain, track who approved at each level, and review rejection reasons

## Acceptance Criteria

### Happy Path - View Previous Approvals
- [ ] Given I am viewing an approval dashboard, when I scroll to the Previous Approvals section, then I see a list of all completed approval actions
- [ ] Given Data Preparation was completed, when I view the history, then I see "Data Preparation: Approved by System on 2024-03-31 14:30:00"
- [ ] Given Level 1 was approved, when I view the history, then I see "Level 1: Approved by K. Wilson on 2024-04-01 09:15:32"
- [ ] Given multiple levels are approved, when I view the history, then I see each approval in chronological order (oldest first)

### Approval Entry Display Format
- [ ] Given I view an approval entry, when I look at the format, then I see "[Level]: [Action] by [User] on [Timestamp]"
- [ ] Given an approval was successful, when I view the entry, then I see a green checkmark (✓) icon before the text
- [ ] Given the entry shows a timestamp, when I view it, then I see the full date and time (e.g., "2024-04-01 09:15:32")

### Rejection Entry Display
- [ ] Given a batch was rejected at Level 2, when I view the history, then I see "Level 2: Rejected by J. Smith on 2024-04-02 11:20:15 - Reason: Data quality issues in Portfolio A"
- [ ] Given a rejection entry exists, when I view it, then I see a red X (✗) icon before the text
- [ ] Given a rejection includes a reason, when I view the entry, then the reason is displayed inline or in an expandable section

### Multiple Approval Cycles
- [ ] Given a batch was rejected and then re-approved, when I view the history, then I see entries for: Initial approvals → Rejection → New approvals
- [ ] Given the batch has been through multiple cycles, when I view the history, then each cycle is clearly demarcated (e.g., grouped by separator lines or labeled "Cycle 1", "Cycle 2")

### Current Level Indication
- [ ] Given the workflow is at Level 2, when I view the Previous Approvals section, then I see Level 1 approved and a note "Current: Pending Level 2 approval"
- [ ] Given the current level is shown, when I view it, then it is highlighted or has a different background color

### Empty State
- [ ] Given no approvals have been completed, when I view the Previous Approvals section, then I see "No approvals yet. Batch is in Data Preparation phase."
- [ ] Given only Data Preparation is complete, when I view the history, then I see the Data Preparation entry and "Pending Level 1 approval"

### Expandable Rejection Reasons
- [ ] Given a rejection reason is long (>100 characters), when I view the entry, then the reason is truncated with "..." and a "Show More" link
- [ ] Given I click "Show More" on a rejection reason, when the link is clicked, then the full reason expands inline
- [ ] Given I click "Show Less" after expanding, when the link is clicked, then the reason collapses back to truncated view

### Approval Timeline Visualization (Optional Enhancement)
- [ ] Given I view the Previous Approvals section, when I look at the layout, then I see a vertical timeline with dots and connecting lines
- [ ] Given the timeline is displayed, when I view an approval, then it appears as a green dot on the timeline
- [ ] Given a rejection is displayed, when I view it, then it appears as a red dot on the timeline
- [ ] Given I hover over a timeline dot, when I view the tooltip, then I see the full approval/rejection details

### User Profile Links (Optional)
- [ ] Given I view an approval entry, when I click on the approver's name, then I am navigated to their user profile (if profiles exist)
- [ ] Given I hover over an approver's name, when I view the tooltip, then I see their role/title (e.g., "Level 2 Approver - Risk Manager")

### Export Approval History
- [ ] Given I am viewing the approval history, when I click "Export History", then a CSV file downloads containing all approval/rejection entries
- [ ] Given I open the exported CSV, when I view the content, then it contains columns: Level, Action (Approved/Rejected), User, Timestamp, Rejection Reason

### Refresh Approval History
- [ ] Given I am viewing the approval dashboard, when another user approves or rejects, then the Previous Approvals section updates automatically (if using real-time updates) or shows a "Refresh" button
- [ ] Given I click "Refresh", when the button is clicked, then the approval history reloads from the API

### Approval History on Completed Batches
- [ ] Given I navigate to a completed batch (from Batch History), when I view the batch details, then I see the complete approval history
- [ ] Given I view a completed batch's history, when I look at the entries, then I see all three approval levels with timestamps

### Error Handling
- [ ] Given the API fails to load approval history, when the page loads, then I see an error message "Unable to load approval history. Please try again." in the Previous Approvals section
- [ ] Given some approval entries fail to load, when partial data is available, then I show the available entries and indicate "Some entries could not be loaded"

## API Endpoints (from OpenAPI spec)

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/approve-logs/{ReportBatchId}` | Get all approval/rejection logs for the batch |
| GET | `/approve-logs/{ReportBatchId}/{Type}` | Get specific approval log by type (e.g., "Level 1") |

**Response for GET `/approve-logs/{ReportBatchId}`:**
```typescript
{
  ApprovalLogs: [
    {
      Id: number,
      ReportBatchId: number,
      ReportDate: string,
      Type: string, // "Data Preparation" | "Level 1" | "Level 2" | "Level 3"
      IsApproved: boolean,
      User: string,
      Time: string,
      RejectReason: string
    }
  ]
}
```

## Implementation Notes

- Enhance the approval dashboard from Stories 1-5 with approval history display
- Use Shadcn UI components: Card, Badge, Collapsible (for long rejection reasons), Button
- Create or reuse API client function in `web/src/lib/api/approvals.ts`:
  - `getApprovalHistory(reportBatchId: number)` - fetch all approval logs
  - `getApprovalLog(reportBatchId: number, type: string)` - fetch specific level log
- Approval history component:
  - Create `ApprovalHistory.tsx` component
  - Display entries in chronological order (oldest first)
  - Format timestamps in user-friendly format
  - Use badges for status: Green (✓ Approved), Red (✗ Rejected)
- Entry formatting:
  - Format: `[Level]: [Action] by [User] on [Timestamp]`
  - Add rejection reason on separate line if present
  - Example: "Level 2: Approved by K. Wilson on April 1, 2024 9:15 AM"
  - Example: "Level 1: Rejected by J. Smith on April 2, 2024 11:20 AM - Reason: Missing portfolio data"
- Rejection reason handling:
  - Truncate long reasons (>100 chars) with "Show More" link
  - Use Collapsible component for expandable reasons
- Multiple cycles:
  - Detect cycle changes by looking for rejections followed by new approvals
  - Optionally group entries by cycle with visual separators
- Current level indication:
  - Compare current workflow state with approval history
  - Highlight or add badge to indicate pending level
- Timeline visualization (optional):
  - Use a vertical timeline layout
  - Plot approvals and rejections as dots on the timeline
  - Connect dots with lines
  - Use colors: green for approvals, red for rejections
- Export functionality:
  - Convert approval history to CSV format
  - Include all fields: Level, Action, User, Timestamp, Reason
  - Filename: `Approval_History_[ReportDate].csv`
- Real-time updates (optional):
  - Use React Query with refetchInterval (e.g., every 30 seconds)
  - Or implement WebSocket connection for instant updates
  - Show "New approval recorded" notification when history updates
- Access control:
  - All users with access to approvals can view history
  - No special permissions needed (read-only)
- Consider adding filtering:
  - Filter by level (show only L1, L2, L3)
  - Filter by action (show only approvals or rejections)
  - Filter by user (show only approvals by specific user)
