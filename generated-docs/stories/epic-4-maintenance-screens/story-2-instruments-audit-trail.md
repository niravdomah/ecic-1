# Story: Instruments Audit Trail

**Epic:** Maintenance Screens - Financial Data
**Story:** 2 of 7
**Wireframe:** `../../wireframes/screen-6-instruments-maintenance.md`

## User Story

**As an** operations analyst or auditor
**I want** to view the complete audit history of instrument changes
**So that** I can track who made changes, when, and what was modified for compliance and troubleshooting

## Acceptance Criteria

### Happy Path - View Instrument History
- [ ] Given I view an instrument row, when I click the "History" button, then a dialog opens showing the audit trail for that specific instrument
- [ ] Given the History dialog is open, when I view the content, then I see a table with columns: Field, Previous Value, Current Value, Changed By, Changed Date
- [ ] Given changes have been made to the instrument, when I view the history, then I see each change listed in reverse chronological order (newest first)
- [ ] Given a field was changed multiple times, when I view the history, then I see each change as a separate row

### Audit Trail Details Display
- [ ] Given the ISIN was changed, when I view the audit trail, then I see: Field="ISIN", Previous Value="ZAE000123456", Current Value="ZAE000654321", Changed By="J. Smith", Changed Date="2024-03-15 14:32:15"
- [ ] Given the Instrument Name was changed, when I view the audit trail, then I see the old name in Previous Value and new name in Current Value
- [ ] Given multiple fields were changed in one edit, when I view the audit trail, then I see multiple rows grouped by the same Changed Date and Changed By

### Full Audit Trail (All Instruments)
- [ ] Given I am on the Instruments page, when I click "View Full Audit Trail", then a new page or dialog opens showing audit history for all instruments
- [ ] Given the Full Audit Trail is open, when I view the content, then I see a table with columns: Instrument ISIN, Instrument Name, Field, Previous Value, Current Value, Changed By, Changed Date
- [ ] Given I view the full audit trail, when I look at the data, then I see changes from all instruments in reverse chronological order

### Filter and Search in Full Audit Trail
- [ ] Given I am viewing the Full Audit Trail, when I enter an ISIN in the search box, then the table filters to show only changes for that instrument
- [ ] Given I am viewing the Full Audit Trail, when I select a user from the "Changed By" filter, then the table shows only changes made by that user
- [ ] Given I am viewing the Full Audit Trail, when I select a date range, then the table shows only changes within that date range

### Change Grouping
- [ ] Given multiple fields were changed in a single edit operation, when I view the audit trail, then those changes are visually grouped together (e.g., same background color or border)
- [ ] Given I view a grouped change, when I look at the Changed Date, then all changes in the group have the same timestamp

### Empty State
- [ ] Given an instrument has never been modified, when I click "History", then I see "No changes recorded for this instrument"
- [ ] Given I view the Full Audit Trail with no changes, when the page loads, then I see "No audit history available"

### Export Audit Trail
- [ ] Given I am viewing an instrument's history, when I click "Export", then a CSV file downloads containing the audit trail for that instrument
- [ ] Given I am viewing the Full Audit Trail, when I click "Export All", then a CSV file downloads containing the complete audit history for all instruments
- [ ] Given I open the exported CSV, when I view the content, then it contains all columns from the audit trail table

### Pagination in Full Audit Trail
- [ ] Given there are more than 50 audit records, when I view the Full Audit Trail, then I see pagination controls
- [ ] Given I am on page 1, when I click "Next", then the table loads the next 50 records
- [ ] Given I view the pagination, when I look at the display, then I see "Showing 1-50 of 247 changes"

### Drill-Down Navigation
- [ ] Given I am viewing the Full Audit Trail, when I click on an Instrument ISIN, then I am navigated to that instrument's detail page or the History dialog opens for that instrument
- [ ] Given I am viewing an instrument's history, when I click "View Instrument", then the Edit Instrument dialog opens with the current instrument data

### Error Handling
- [ ] Given the API fails to load audit trail, when I click "History", then I see an error message "Unable to load audit history. Please try again."
- [ ] Given the API fails to load the Full Audit Trail, when the page loads, then I see an error message "Unable to load full audit trail. Please try again."

## API Endpoints (from OpenAPI spec)

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/instruments-audit-trail/{InstrumentId}` | Get audit trail for a specific instrument |
| GET | `/instruments-full-audit-trail` | Get full audit trail for all instruments |

**Response for GET `/instruments-audit-trail/{InstrumentId}`:**
```typescript
{
  InstrumentAuditTrail: [
    {
      AuditId: number,
      InstrumentId: number,
      FieldName: string,
      PreviousValue: string,
      CurrentValue: string,
      ChangedBy: string,
      ChangedDate: string,
      ChangeOperation: string // "INSERT" | "UPDATE" | "DELETE"
    }
  ]
}
```

**Response for GET `/instruments-full-audit-trail`:**
```typescript
{
  InstrumentAuditTrail: [
    {
      AuditId: number,
      InstrumentId: number,
      InstrumentISIN: string,
      InstrumentName: string,
      FieldName: string,
      PreviousValue: string,
      CurrentValue: string,
      ChangedBy: string,
      ChangedDate: string,
      ChangeOperation: string
    }
  ]
}
```

## Implementation Notes

- Create a reusable audit trail component: `AuditTrailDialog.tsx` or `AuditTrailTable.tsx`
- Use Shadcn UI components: Dialog, Table, Button, Input (for search), Select (for filters), Badge
- Create API client functions in `web/src/lib/api/instruments.ts`:
  - `getInstrumentAuditTrail(instrumentId: number)` - fetch audit trail for one instrument
  - `getFullInstrumentAuditTrail()` - fetch full audit trail for all instruments
- History dialog:
  - Opens when "History" button is clicked on an instrument row
  - Displays audit trail in a table format
  - Include "Export" button to download as CSV
  - Include "Close" button to close dialog
- Full Audit Trail page:
  - Create at `/maintenance/instruments/audit-trail`
  - Or open in a full-screen dialog/modal
  - Include search and filter controls at the top
  - Implement pagination for large datasets
- Change grouping logic:
  - Group changes by ChangedDate and ChangedBy
  - If multiple rows have the same ChangedDate and ChangedBy, they belong to the same edit operation
  - Use visual indicators (border, background color) to show grouping
- Field name display:
  - Map technical field names to user-friendly labels (e.g., "InstrumentCode" → "Instrument Code")
- Date formatting:
  - Display dates in user-friendly format (e.g., "March 15, 2024 2:32 PM")
  - Consider relative time for recent changes (e.g., "2 hours ago")
- Export functionality:
  - Client-side CSV generation using `papaparse` or similar library
  - Include all visible data in export
  - Filename format: `Instruments_Audit_Trail_{date}.csv`
- Consider adding a "Revert" button for admins to undo changes (optional, future enhancement)
- Apply the same audit trail pattern to other maintenance screens (Index Prices, Durations, Betas, Credit Ratings)
