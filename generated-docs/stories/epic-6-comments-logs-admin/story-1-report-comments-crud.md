# Story: Report Comments CRUD

**Epic:** Comments, Logs & Administration
**Story:** 1 of 5
**Wireframe:** `../../wireframes/screen-11-report-comments.md`

## User Story

**As an** analyst or portfolio manager
**I want** to add, view, edit, and delete comments tied to specific reports
**So that** I can provide context, rationale, and important notes for approvers and future reference

## Acceptance Criteria

### Happy Path - View Report Comments
- [ ] Given I navigate to Report Comments, when the page loads, then I see a table with columns: Report Name, Comment, User, Date
- [ ] Given report comments exist for the current batch, when I view the table, then I see all comments with their details
- [ ] Given the current report batch is "March 2024", when I view the page header, then I see "Report Batch: March 2024"

### Add New Comment
- [ ] Given I am on the Report Comments page, when I click "Add New Comment", then a dialog opens with fields: Report (dropdown), Comment (textarea)
- [ ] Given the Add dialog is open, when I view the Report dropdown, then I see a list of available reports for the current batch (e.g., Portfolio A Summary, Portfolio B Performance, Sanlam Risk Report, Overall Market Summary)
- [ ] Given I select a Report and enter a Comment, when I click "Save", then the comment is created
- [ ] Given the comment is created successfully, when the API returns success, then I see a success message "Comment added successfully" and the dialog closes
- [ ] Given the comment is created, when I view the comments list, then the new comment appears in the table

### Edit Comment
- [ ] Given I view a comment row, when I click the "Edit" button, then the Edit Comment dialog opens with the current data pre-filled
- [ ] Given the Edit dialog is open, when I modify the Comment text and click "Save", then the comment is updated
- [ ] Given the update is successful, when the API returns success, then I see a success message "Comment updated successfully"
- [ ] Given the comment is updated, when I view the table, then the updated comment text is displayed

### Delete Comment
- [ ] Given I view a comment row, when I click the "Delete" button, then I see a confirmation dialog "Are you sure you want to delete this comment?"
- [ ] Given I confirm deletion, when I click "Yes", then the comment is deleted
- [ ] Given the deletion is successful, when the API returns success, then I see a success message "Comment deleted successfully"
- [ ] Given the comment is deleted, when I view the table, then the comment is removed from the list

### Filter by Report
- [ ] Given I want to view comments for a specific report, when I select a report from the "Filter by Report" dropdown, then the table filters to show only comments for that report
- [ ] Given I select "Portfolio A Summary", when the filter is applied, then I see only comments linked to Portfolio A Summary
- [ ] Given I select "All Reports", when the filter is applied, then I see all comments across all reports

### Comment Display
- [ ] Given a comment is long (>100 characters), when I view it in the table, then the text is truncated with "..." and expandable
- [ ] Given I click on a truncated comment, when I click it, then the full comment expands inline or in a tooltip
- [ ] Given I view a comment, when I look at the User column, then I see the username/initials of the person who created the comment
- [ ] Given I view a comment, when I look at the Date column, then I see the date in short format (e.g., "03-15")

### Validation
- [ ] Given I try to add a comment without selecting a Report, when I click Save, then I see a validation error "Report is required"
- [ ] Given I try to add a comment without entering Comment text, when I click Save, then I see a validation error "Comment text is required"
- [ ] Given I enter a comment longer than 1000 characters, when I try to save, then I see a validation error "Comment must be 1000 characters or less"

### Character Counter
- [ ] Given the Add/Edit dialog is open, when I type in the Comment textarea, then I see a character counter showing "X / 1000 characters"
- [ ] Given I approach the character limit, when I have 50 characters remaining, then the counter turns yellow
- [ ] Given I reach the character limit, when I have 0 characters remaining, then the counter turns red and I cannot type more

### Export Comments
- [ ] Given I am on the Report Comments page, when I click "Export Comments", then a CSV file downloads containing all comments for the current batch
- [ ] Given I open the exported CSV, when I view the content, then it contains columns: Report Name, Comment, User, Date, Report Batch

### Refresh Comments
- [ ] Given I am viewing the comments page, when I click "Refresh", then the page reloads the comments from the API
- [ ] Given comments have been added by another user, when I refresh, then I see the new comments

### Pagination
- [ ] Given there are more than 20 comments, when I view the table, then I see pagination controls showing "Showing 1-20 of 52 comments"
- [ ] Given I click "Next", when the page changes, then the table loads the next 20 comments

### Report Batch Context
- [ ] Given the current report batch is "March 2024", when I add a new comment, then the ReportBatchId is automatically set to the current batch
- [ ] Given I view the comments table, when I look at all comments, then they are filtered to the current report batch only

### Comment Author Display
- [ ] Given I created a comment, when I view it in the table, then I can edit or delete it
- [ ] Given another user created a comment, when I view it, then I can view it but Edit/Delete buttons may be disabled (depending on permissions)

### Empty State
- [ ] Given no comments exist for the current batch, when I load the Report Comments page, then I see "No comments yet for this batch. Click 'Add New Comment' to get started."

### Error Handling
- [ ] Given the API fails to load comments, when the page loads, then I see an error message "Unable to load comments. Please try again."
- [ ] Given the API fails to create a comment, when I try to save, then I see an error message "Failed to add comment. Please try again."
- [ ] Given the API fails to update a comment, when I try to save, then I see an error message "Failed to update comment. Please try again."
- [ ] Given the API fails to delete a comment, when I try to delete, then I see an error message "Failed to delete comment. Please try again."

## API Endpoints (from OpenAPI spec)

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/report-comments` | Get all report comments for current batch |
| POST | `/report-comments` | Create new comment |
| GET | `/report-comments/{Id}` | Get comment by ID |
| PUT | `/report-comments/{Id}` | Update comment |
| DELETE | `/report-comments/{Id}` | Delete comment |

**Request for POST `/report-comments`:**
```typescript
{
  ReportBatchId: number,
  ReportListId: string,
  Comment: string,
  LastChangedUser: string
}
```

**Response for GET `/report-comments`:**
```typescript
{
  ReportComments: [
    {
      Id: number,
      ReportBatchId: number,
      ReportDate: string,
      ReportListId: string,
      ReportListName: string,
      Comment: string,
      LastChangedUser: string
    }
  ]
}
```

## Implementation Notes

- Create page at `/report-comments`
- Use Shadcn UI components: Table, Dialog, Textarea, Select, Button, Badge
- Create API client functions in `web/src/lib/api/report-comments.ts`:
  - `getReportComments(reportBatchId?: number)` - fetch comments for current batch
  - `getReportComment(id: number)` - fetch single comment
  - `createReportComment(data)` - create comment
  - `updateReportComment(id: number, data)` - update comment
  - `deleteReportComment(id: number)` - delete comment
- Use React Hook Form for Add/Edit dialogs
- Use Zod for validation:
  - ReportListId: required, string
  - Comment: required, string, max length 1000 characters
  - ReportBatchId: required, number
- Report dropdown:
  - Fetch available reports from `/report-list` endpoint (if available) or configuration
  - Display report names in user-friendly format
  - Group reports by portfolio (optional)
- Comment textarea:
  - Multi-line input with minimum 3 rows
  - Character counter at bottom
  - Max length: 1000 characters
- Table display:
  - Truncate long comments (>100 chars) with ellipsis
  - Click to expand inline or show full comment in tooltip
  - Format dates in short format (MM-DD) or relative time
- Filter by Report:
  - Dropdown at top of page
  - Options: "All Reports" + list of all report names
  - Client-side filtering for small datasets
- Export functionality:
  - Client-side CSV generation
  - Include all comments from current batch
  - Filename: `Report_Comments_[ReportDate].csv`
- Pagination: 20 comments per page
- User permissions:
  - Users can edit/delete their own comments
  - Admins can edit/delete any comment
  - Check current user vs. LastChangedUser
- Report batch context:
  - Fetch current batch from `/configurations`
  - Pre-fill ReportBatchId in forms
- Consider adding rich text editing for comments (optional, future enhancement)
- Comments are visible on the Approval Dashboard (preview of latest 4 comments)
