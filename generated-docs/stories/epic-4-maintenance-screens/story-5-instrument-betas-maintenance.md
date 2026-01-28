# Story: Instrument Betas Maintenance

**Epic:** Maintenance Screens - Financial Data
**Story:** 5 of 7
**Wireframe:** `../../wireframes/screen-9-instrument-betas-maintenance.md`

## User Story

**As an** operations analyst
**I want** to manage instrument beta values for the current report batch
**So that** I can ensure accurate risk metrics are available for portfolio analytics

## Acceptance Criteria

### Happy Path - View Betas List
- [ ] Given I navigate to Instrument Betas Maintenance, when the page loads, then I see a table with columns: Instrument Code, ISIN, Instrument Name, Beta, Status, Last Changed By
- [ ] Given beta entries exist for the current batch, when I view the table, then I see all entries with their details
- [ ] Given the current report batch is "March 2024", when I view the page header, then I see "Report Batch: March 2024"

### View Outstanding Betas
- [ ] Given I am on the Betas page, when I view the page, then I see a separate section titled "Outstanding Betas" showing instruments missing beta data
- [ ] Given the Outstanding Betas section is visible, when I view it, then I see a table with columns: Instrument Code, ISIN, Instrument Name
- [ ] Given I view the Outstanding Betas table, when I look at the data, then I see only instruments that have no beta entry for the current batch
- [ ] Given there are no outstanding betas, when I view the section, then I see "All instruments have beta data for this batch ✓"

### Add Beta Entry
- [ ] Given I am on the Betas page, when I click "Add Beta", then a dialog opens with fields: Instrument (dropdown/search), Beta
- [ ] Given the Add dialog is open, when I select an Instrument and enter a Beta value, then I can click "Save" to create the entry
- [ ] Given the entry is created successfully, when the API returns success, then I see a success message "Beta entry added successfully" and the dialog closes
- [ ] Given the entry is created, when I view the betas list, then the new entry appears in the table

### Quick Add from Outstanding List
- [ ] Given I view the Outstanding Betas section, when I click an instrument row, then a quick add form appears inline or in a small modal with a field for Beta
- [ ] Given I enter a Beta value, when I click "Save", then the entry is created and the instrument is removed from the Outstanding list
- [ ] Given I add a beta for an outstanding instrument, when the save completes, then the entry appears in the main betas table

### Edit Beta Entry
- [ ] Given I view a beta entry row, when I click the "Edit" button, then the Edit Beta dialog opens with the current data pre-filled
- [ ] Given the Edit dialog is open, when I modify the Beta value and click "Save", then the entry is updated
- [ ] Given the update is successful, when the API returns success, then I see a success message "Beta entry updated successfully"
- [ ] Given the entry is updated, when I view the table, then the updated value is displayed

### Delete Beta Entry
- [ ] Given I view a beta entry row, when I click the "Delete" button, then I see a confirmation dialog "Are you sure you want to delete this beta entry?"
- [ ] Given I confirm deletion, when I click "Yes", then the entry is deleted
- [ ] Given the deletion is successful, when the API returns success, then I see a success message "Beta entry deleted successfully"
- [ ] Given the entry is deleted, when I view the table, then the entry is removed and the instrument may reappear in Outstanding Betas

### View Audit Trail
- [ ] Given I view a beta entry row, when I click the "History" button, then a dialog opens showing the audit trail for that beta entry
- [ ] Given the History dialog is open, when I view the content, then I see a table with columns: Field, Previous Value, Current Value, Changed By, Changed Date
- [ ] Given I view the audit trail, when I look at the data, then I see all changes made to the beta entry in reverse chronological order

### Search and Filter
- [ ] Given I want to find a specific instrument, when I enter an Instrument Code or ISIN in the search box and click Search, then the table filters to show only matching entries
- [ ] Given I select a Status filter, when I apply it, then the table shows only entries with that status

### Validation
- [ ] Given I try to add a beta without selecting an Instrument, when I click Save, then I see a validation error "Instrument is required"
- [ ] Given I try to add a beta without entering a Beta value, when I click Save, then I see a validation error "Beta is required"
- [ ] Given I enter a beta value outside typical range (-5 to 5), when I click Save, then I see a warning "Beta value is outside typical range (-5 to 5). Are you sure?"
- [ ] Given I try to add a duplicate entry (same Instrument + Report Batch), when I click Save, then I see an error "A beta entry for this instrument and batch already exists"

### Report Batch Context
- [ ] Given the current report batch is "March 2024", when I add a new beta entry, then the ReportBatchId is automatically set to the current batch
- [ ] Given I view the table, when I look at all entries, then they are filtered to the current report batch (only March 2024 entries shown)

### Bulk Import from Outstanding
- [ ] Given there are multiple outstanding betas, when I click "Import from External Source", then a dialog opens allowing me to upload a file or paste data
- [ ] Given I upload a file with Instrument Code and Beta columns, when the upload completes, then all entries are created in bulk
- [ ] Given the bulk import completes, when I view the page, then the Outstanding Betas list is updated to reflect newly added entries

### Beta Value Display
- [ ] Given I view a beta entry, when I look at the Beta column, then I see the value formatted to 2 decimal places (e.g., "1.25")
- [ ] Given a beta value is negative, when I view it, then it displays with a minus sign (e.g., "-0.35")
- [ ] Given a beta value is zero, when I view it, then it displays as "0.00"

### Pagination
- [ ] Given there are more than 20 beta entries, when I view the table, then I see pagination controls
- [ ] Given I click "Next", when the page changes, then the table loads the next 20 entries

### Error Handling
- [ ] Given the API fails to load beta entries, when the page loads, then I see an error message "Unable to load beta entries. Please try again."
- [ ] Given the API fails to load outstanding betas, when the page loads, then I see an error message "Unable to load outstanding betas. Please try again."
- [ ] Given the API fails to create an entry, when I try to save, then I see an error message "Failed to add beta entry. Please try again."

## API Endpoints (from OpenAPI spec)

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/instrument-beta` | Get all instrument betas for current batch |
| POST | `/instrument-beta` | Create new beta entry |
| GET | `/instrument-beta/{Id}` | Get beta entry by ID |
| PUT | `/instrument-beta/{Id}` | Update beta entry |
| DELETE | `/instrument-beta/{Id}` | Delete beta entry |
| GET | `/instrument-beta-outstanding` | Get instruments missing beta data |
| GET | `/instrument-beta-audit-trail/{Id}` | Get beta audit trail |
| GET | `/instrument-beta-full-audit-trail` | Get full beta audit trail |

**Request for POST `/instrument-beta`:**
```typescript
{
  InstrumentId: number,
  ReportBatchId: number,
  Beta: number,
  LastChangedUser: string
}
```

**Response for GET `/instrument-beta`:**
```typescript
{
  InstrumentBetas: [
    {
      Id: number,
      InstrumentId: number,
      InstrumentCode: string,
      ISIN: string,
      Beta: number,
      ReportBatchId: number,
      Status: string,
      LastChangedUser: string
    }
  ]
}
```

**Response for GET `/instrument-beta-outstanding`:**
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

- Create page at `/maintenance/betas`
- Use Shadcn UI components: Table, Dialog, Input, Select, Button, Badge, Card (for Outstanding section)
- Create API client functions in `web/src/lib/api/betas.ts`:
  - `getBetas(reportBatchId?: number)` - fetch beta entries
  - `getBeta(id: number)` - fetch single entry
  - `createBeta(data)` - create entry
  - `updateBeta(id: number, data)` - update entry
  - `deleteBeta(id: number)` - delete entry
  - `getOutstandingBetas(reportBatchId: number)` - fetch instruments missing betas
  - `getBetaAuditTrail(id: number)` - fetch audit trail
- Use React Hook Form for Add/Edit dialogs
- Use Zod for validation:
  - InstrumentId: required, number
  - Beta: required, number
  - ReportBatchId: required, number
  - Add warning (not error) for beta values outside -5 to 5 range
- Outstanding Betas section:
  - Display as a separate Card/section above or below the main table
  - Show count: "Outstanding: X instruments"
  - Clicking a row opens quick add form (inline or modal)
  - After adding, refresh both tables
- Quick add form:
  - Pre-fill InstrumentId from the clicked row
  - Only show Beta field
  - Validate and save
- Bulk import:
  - Accept Excel/CSV files with columns: InstrumentCode, Beta
  - Validate format and data
  - Create multiple entries via API
  - Show progress and results
- Audit trail:
  - Reuse the audit trail component from Story 2
  - Display field-level changes
- Report batch context:
  - Fetch current batch from `/configurations`
  - Filter all data to current batch
- Number formatting:
  - Display beta values with 2 decimal places
  - Use `toFixed(2)` or number formatting library
- Pagination: 20 items per page
- Beta interpretation guide (optional):
  - Display info tooltip: "Beta = 1: moves with market, Beta < 1: less volatile, Beta > 1: more volatile"
- This screen follows the same pattern as Durations (Story 4) with fewer fields
- State management (read-only mode) will be implemented in Story 7
