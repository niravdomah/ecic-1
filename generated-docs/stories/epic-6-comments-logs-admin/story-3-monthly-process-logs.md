# Story: Monthly Process Logs

**Epic:** Comments, Logs & Administration
**Story:** 3 of 5
**Wireframe:** `../../wireframes/screen-13-process-logs.md`

## User Story

**As an** operations user or support analyst
**I want** to view the monthly workflow execution timeline with event tracking
**So that** I can monitor workflow progress and debug any issues in the approval pipeline

## Acceptance Criteria

### Happy Path - View Monthly Process Logs
- [ ] Given I navigate to Process Logs, when I click the "Monthly Process Logs" tab, then I see a workflow execution timeline
- [ ] Given I view the timeline, when I look at the content, then I see a table with columns: Event Name, Executed At, Activity
- [ ] Given monthly process events exist, when I view the table, then I see all workflow events in chronological order

### Workflow Event Display
- [ ] Given I view an event entry, when I look at the row, then I see: Event name (e.g., "CreateReportBatch", "PrepareData", "RunCalculations"), Execution timestamp, Activity status (Complete, In Progress, Not Started)
- [ ] Given an event has completed, when I view its status, then I see a green "Complete" badge with timestamp
- [ ] Given an event is pending, when I view its status, then I see a gray "Not Started" badge

### Event Details Display
- [ ] Given I view a completed event, when I look below the event name, then I see "Last Activity: [Activity Name]" (e.g., "Last Activity: DataValidation")
- [ ] Given an event took significant time, when I view the entry, then I see duration (e.g., "Duration: 2h 15m 45s")

### Workflow Timeline Visualization
- [ ] Given I view the Monthly Process Logs, when I look at the page layout, then I see events displayed in a vertical timeline format with connecting lines
- [ ] Given events are in the timeline, when I view completed events, then they have green checkmarks or filled circles
- [ ] Given events are in the timeline, when I view pending events, then they have empty circles or grayed-out indicators

### Event Types Display
- [ ] Given I view the timeline, when I look at all events, then I see events in workflow order: CreateReportBatch, PrepareData, RunCalculations, PublishDraftReports, ApproveFirstLevel, ApproveSecondLevel, ApproveThirdLevel, PublishFinalReports, Complete
- [ ] Given the workflow is at Level 1 approval, when I view the timeline, then I see events up to "ApproveFirstLevel" with "Pending" status and subsequent events as "Not Started"

### Current Activity Highlighting
- [ ] Given the workflow is currently at an event, when I view that event in the timeline, then it is highlighted with a different background color or border
- [ ] Given I view the current event, when I look at its status, then I see "In Progress" with the last executed activity name

### Export Timeline
- [ ] Given I am viewing Monthly Process Logs, when I click "Export Timeline", then a CSV file downloads containing all workflow events
- [ ] Given I open the exported CSV, when I view the content, then it contains columns: Event Name, Executed At, Last Activity, Duration, Status

### Refresh Logs
- [ ] Given I am viewing the monthly process logs, when I click "Refresh", then the page reloads the logs from the API
- [ ] Given the workflow has progressed, when I refresh, then I see updated event statuses

### Duration Formatting
- [ ] Given an event completed in less than 1 minute, when I view the duration, then I see it in seconds (e.g., "22s")
- [ ] Given an event completed in more than 1 hour, when I view the duration, then I see it in hours and minutes (e.g., "2h 15m 45s")

### Event Details Dialog (Optional)
- [ ] Given I view an event entry, when I click "View Details" (if available), then a dialog opens showing detailed execution information
- [ ] Given the Details dialog is open, when I view the content, then I see: Event summary, Sub-activities executed, Execution timestamps for each sub-activity, Any warnings or notes

### Filter by Status (Optional)
- [ ] Given I want to view only completed events, when I select "Complete" from a status filter, then the timeline shows only completed events
- [ ] Given I want to view only pending events, when I select "Not Started", then the timeline shows only future events

### Real-Time Updates (Optional)
- [ ] Given the workflow is currently executing, when I view the logs page, then the current event status updates automatically every 30 seconds
- [ ] Given an event completes, when the auto-refresh occurs, then I see the status change from "In Progress" to "Complete"

### Empty State
- [ ] Given no monthly process has been started for the current batch, when I load the Monthly Process Logs, then I see "No monthly process logs available. Start a new batch to see workflow events."

### Historical Batch Logs
- [ ] Given I want to view logs for a previous batch, when I select a batch from a dropdown (if available), then the timeline shows events for that batch
- [ ] Given I view historical logs, when I look at the timeline, then all events show as "Complete" with historical timestamps

### Error Handling
- [ ] Given the API fails to load monthly process logs, when the page loads, then I see an error message "Unable to load monthly process logs. Please try again."

## API Endpoints (from OpenAPI spec)

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/process-logs` | Get monthly process logs |
| GET | `/report-batches` | Get report batch information (includes workflow status) |

**Response for GET `/process-logs`:**
```typescript
{
  MonthlyProcessLogs: [
    {
      ReportBatchId: number,
      ReportDate: string,
      EventName: string,
      ExecutedAt: string,
      LastExecutedActivityName: string
    }
  ]
}
```

## Implementation Notes

- Enhance the Process Logs page from Story 2 with Monthly Process Logs tab
- Use Shadcn UI components: Tabs, Table, Badge, Button, Card
- Create or reuse API client functions in `web/src/lib/api/process-logs.ts`:
  - `getMonthlyProcessLogs(reportBatchId?: number)` - fetch workflow events
- Timeline visualization:
  - Display events in a vertical list with visual connectors
  - Use icons or circles to indicate status (completed, in progress, pending)
  - Connect events with lines to show flow
  - Highlight current event
- Event ordering:
  - Standard workflow order:
    1. CreateReportBatch
    2. PrepareData
    3. RunCalculations
    4. PublishDraftReports
    5. ApproveFirstLevel
    6. ApproveSecondLevel
    7. ApproveThirdLevel
    8. PublishFinalReports
    9. Complete
  - Display in this order even if some events haven't occurred yet
- Status badge mapping:
  - "Complete" → Green badge with checkmark
  - "In Progress" → Yellow/Orange badge with spinner
  - "Not Started" → Gray badge with empty circle
- Duration calculation:
  - Calculate from event start to finish (if available)
  - For current event, calculate from start to now
  - Format as "Xh Ym Zs"
- Current activity display:
  - Show "Last Activity: [Name]" below event name
  - This helps identify which sub-task within the event was last executed
- Export functionality:
  - Client-side CSV generation
  - Include all events with their statuses and timestamps
  - Filename: `Monthly_Process_Log_[ReportDate].csv`
- Real-time updates (optional):
  - Use React Query with refetchInterval (30-60 seconds)
  - Only poll when workflow is "In Progress"
  - Stop polling when workflow reaches "Complete"
- Consider adding a visual progress bar showing overall workflow completion percentage
- For historical batches, fetch logs using ReportBatchId from batch selector
