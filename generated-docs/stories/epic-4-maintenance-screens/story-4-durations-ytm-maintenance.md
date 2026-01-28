# Story: Durations & YTM Maintenance

**Epic:** Maintenance Screens - Financial Data
**Story:** 4 of 7
**Wireframe:** `../../wireframes/screen-8-durations-ytm-maintenance.md`

## User Story

**As an** operations analyst
**I want** to manage instrument duration and yield-to-maturity data for the current report batch
**So that** I can ensure accurate bond analytics are available for portfolio reporting

## Acceptance Criteria

### Happy Path - View Durations List
- [ ] Given I navigate to Durations & YTM Maintenance, when the page loads, then I see a table with columns: Instrument Code, ISIN, Instrument Name, Duration, YTM, Status, Last Changed By
- [ ] Given duration entries exist for the current batch, when I view the table, then I see all entries with their details
- [ ] Given the current report batch is "March 2024", when I view the page header, then I see "Report Batch: March 2024"

### View Outstanding Durations
- [ ] Given I am on the Durations page, when I view the page, then I see a separate section titled "Outstanding Durations" showing instruments missing duration data
- [ ] Given the Outstanding Durations section is visible, when I view it, then I see a table with columns: Instrument Code, ISIN, Instrument Name
- [ ] Given I view the Outstanding Durations table, when I look at the data, then I see only instruments that have no duration entry for the current batch
- [ ] Given there are no outstanding durations, when I view the section, then I see "All instruments have duration data for this batch ✓"

### Add Duration Entry
- [ ] Given I am on the Durations page, when I click "Add Duration", then a dialog opens with fields: Instrument (dropdown/search), Duration, YTM
- [ ] Given the Add dialog is open, when I select an Instrument and enter Duration and YTM values, then I can click "Save" to create the entry
- [ ] Given the entry is created successfully, when the API returns success, then I see a success message "Duration entry added successfully" and the dialog closes
- [ ] Given the entry is created, when I view the durations list, then the new entry appears in the table

### Quick Add from Outstanding List
- [ ] Given I view the Outstanding Durations section, when I click an instrument row, then a quick add form appears inline or in a small modal with fields for Duration and YTM
- [ ] Given I enter Duration and YTM values, when I click "Save", then the entry is created and the instrument is removed from the Outstanding list
- [ ] Given I add a duration for an outstanding instrument, when the save completes, then the entry appears in the main durations table

### Edit Duration Entry
- [ ] Given I view a duration entry row, when I click the "Edit" button, then the Edit Duration dialog opens with the current data pre-filled
- [ ] Given the Edit dialog is open, when I modify Duration or YTM and click "Save", then the entry is updated
- [ ] Given the update is successful, when the API returns success, then I see a success message "Duration entry updated successfully"
- [ ] Given the entry is updated, when I view the table, then the updated values are displayed

### Delete Duration Entry
- [ ] Given I view a duration entry row, when I click the "Delete" button, then I see a confirmation dialog "Are you sure you want to delete this duration entry?"
- [ ] Given I confirm deletion, when I click "Yes", then the entry is deleted
- [ ] Given the deletion is successful, when the API returns success, then I see a success message "Duration entry deleted successfully"
- [ ] Given the entry is deleted, when I view the table, then the entry is removed and the instrument may reappear in Outstanding Durations

### View Audit Trail
- [ ] Given I view a duration entry row, when I click the "History" button, then a dialog opens showing the audit trail for that duration entry
- [ ] Given the History dialog is open, when I view the content, then I see a table with columns: Field, Previous Value, Current Value, Changed By, Changed Date
- [ ] Given I view the audit trail, when I look at the data, then I see all changes made to the duration entry in reverse chronological order

### Search and Filter
- [ ] Given I want to find a specific instrument, when I enter an Instrument Code or ISIN in the search box and click Search, then the table filters to show only matching entries
- [ ] Given I select a Status filter, when I apply it, then the table shows only entries with that status

### Validation
- [ ] Given I try to add a duration without selecting an Instrument, when I click Save, then I see a validation error "Instrument is required"
- [ ] Given I try to add a duration without entering a Duration value, when I click Save, then I see a validation error "Duration is required"
- [ ] Given I enter a negative duration, when I click Save, then I see a validation error "Duration must be a positive number"
- [ ] Given I enter a YTM less than -100 or greater than 100, when I click Save, then I see a validation error "YTM must be between -100 and 100"
- [ ] Given I try to add a duplicate entry (same Instrument + Report Batch), when I click Save, then I see an error "A duration entry for this instrument and batch already exists"

### Report Batch Context
- [ ] Given the current report batch is "March 2024", when I add a new duration entry, then the ReportBatchId is automatically set to the current batch
- [ ] Given I view the table, when I look at all entries, then they are filtered to the current report batch (only March 2024 entries shown)

### Bulk Import from Outstanding
- [ ] Given there are multiple outstanding durations, when I click "Import from External Source", then a dialog opens allowing me to upload a file or paste data
- [ ] Given I upload a file with Instrument Code, Duration, YTM columns, when the upload completes, then all entries are created in bulk
- [ ] Given the bulk import completes, when I view the page, then the Outstanding Durations list is updated to reflect newly added entries

### Pagination
- [ ] Given there are more than 20 duration entries, when I view the table, then I see pagination controls
- [ ] Given I click "Next", when the page changes, then the table loads the next 20 entries

### Error Handling
- [ ] Given the API fails to load duration entries, when the page loads, then I see an error message "Unable to load duration entries. Please try again."
- [ ] Given the API fails to load outstanding durations, when the page loads, then I see an error message "Unable to load outstanding durations. Please try again."
- [ ] Given the API fails to create an entry, when I try to save, then I see an error message "Failed to add duration entry. Please try again."

## API Endpoints (from OpenAPI spec)

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/instrument-duration` | Get all instrument durations for current batch |
| POST | `/instrument-duration` | Create new duration entry |
| GET | `/instrument-duration/{Id}` | Get duration entry by ID |
| PUT | `/instrument-duration/{Id}` | Update duration entry |
| DELETE | `/instrument-duration/{Id}` | Delete duration entry |
| GET | `/instrument-duration-outstanding` | Get instruments missing duration data |
| GET | `/instrument-duration-audit-trail/{Id}` | Get duration audit trail |
| GET | `/instrument-duration-full-audit-trail` | Get full duration audit trail |

**Request for POST `/instrument-duration`:**
```typescript
{
  InstrumentId: number,
  ReportBatchId: number,
  Duration: number,
  YTM: number,
  LastChangedUser: string
}
```

**Response for GET `/instrument-duration`:**
```typescript
{
  InstrumentDurations: [
    {
      Id: number,
      InstrumentId: number,
      InstrumentCode: string,
      ISIN: string,
      Duration: number,
      YTM: number,
      ReportBatchId: number,
      Status: string,
      LastChangedUser: string
    }
  ]
}
```

**Response for GET `/instrument-duration-outstanding`:**
```typescript
{
  OutstandingInstruments: [
    {
      InstrumentId: number,
      InstrumentCode: string,
      ISIN: string,
      InstrumentName: string
    }
  ]
}
```

## Implementation Notes

- Create page at `/maintenance/durations`
- Use Shadcn UI components: Table, Dialog, Input, Select, Button, Badge, Card (for Outstanding section)
- Create API client functions in `web/src/lib/api/durations.ts`:
  - `getDurations(reportBatchId?: number)` - fetch duration entries
  - `getDuration(id: number)` - fetch single entry
  - `createDuration(data)` - create entry
  - `updateDuration(id: number, data)` - update entry
  - `deleteDuration(id: number)` - delete entry
  - `getOutstandingDurations(reportBatchId: number)` - fetch instruments missing durations
  - `getDurationAuditTrail(id: number)` - fetch audit trail
- Use React Hook Form for Add/Edit dialogs
- Use Zod for validation:
  - InstrumentId: required, number
  - Duration: required, number, min value 0
  - YTM: required, number, min -100, max 100
  - ReportBatchId: required, number
- Outstanding Durations section:
  - Display as a separate Card/section above or below the main table
  - Show count: "Outstanding: X instruments"
  - Clicking a row opens quick add form (inline or modal)
  - After adding, refresh both tables
- Quick add form:
  - Pre-fill InstrumentId from the clicked row
  - Only show Duration and YTM fields
  - Validate and save
- Bulk import:
  - Accept Excel/CSV files
  - Validate format and data
  - Create multiple entries via API
  - Show progress and results
- Audit trail:
  - Reuse the audit trail component from Story 2
  - Display field-level changes
- Report batch context:
  - Fetch current batch from `/configurations`
  - Filter all data to current batch
- Pagination: 20 items per page
- Consider adding calculated fields display (e.g., Modified Duration, Effective Duration) if available in data
- State management (read-only mode) will be implemented in Story 7
