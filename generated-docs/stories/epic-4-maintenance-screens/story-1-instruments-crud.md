# Story: Instruments Maintenance CRUD

**Epic:** Maintenance Screens - Financial Data
**Story:** 1 of 7
**Wireframe:** `../../wireframes/screen-6-instruments-maintenance.md`

## User Story

**As an** operations analyst
**I want** to create, view, update, and delete instrument master data
**So that** I can maintain accurate financial instrument information for portfolio reporting

## Acceptance Criteria

### Happy Path - View Instruments List
- [ ] Given I navigate to Instruments Maintenance, when the page loads, then I see a table with columns: ISIN, Code, Name, Type, Currency, Status
- [ ] Given instruments exist in the system, when I view the table, then I see all instruments with their details displayed
- [ ] Given an instrument is a bond with maturity date, when I view its row, then I see the maturity date displayed below the name (e.g., "Mat: 2028-12-31")
- [ ] Given the table has many rows, when I scroll down, then I see pagination controls at the bottom showing "Showing 1-20 of 247 instruments"

### Search and Filter
- [ ] Given I want to find a specific instrument, when I enter an ISIN or Code in the search box and click Search, then the table filters to show only matching instruments
- [ ] Given I select a Type filter (e.g., "Bond"), when I apply the filter, then the table shows only instruments of that type
- [ ] Given I select a Status filter (e.g., "Active"), when I apply the filter, then the table shows only instruments with that status
- [ ] Given I have applied filters, when I click "Clear Filters", then all filters reset and the full list displays

### Add New Instrument
- [ ] Given I am on the Instruments page, when I click "Add New Instrument", then a dialog opens with tabs: Basic Info, Classification, Financial Details
- [ ] Given the Add dialog is open, when I fill in required fields (ISIN, Instrument Code, Name, Type, Currency) and click "Save", then the instrument is created
- [ ] Given the instrument is created successfully, when the API returns success, then I see a success message "Instrument created successfully" and the dialog closes
- [ ] Given the instrument is created, when I view the instruments list, then the new instrument appears in the table

### Edit Instrument
- [ ] Given I view an instrument row, when I click the "Edit" button, then the Edit Instrument dialog opens with the instrument's current data pre-filled
- [ ] Given the Edit dialog is open, when I modify fields and click "Save", then the instrument is updated
- [ ] Given the update is successful, when the API returns success, then I see a success message "Instrument updated successfully" and the dialog closes
- [ ] Given the instrument is updated, when I view the instruments list, then the updated data is displayed

### Delete Instrument
- [ ] Given I view an instrument row, when I click the "Delete" button, then I see a confirmation dialog "Are you sure you want to delete this instrument?"
- [ ] Given I confirm deletion, when I click "Yes", then the instrument is soft-deleted (marked as inactive)
- [ ] Given the deletion is successful, when the API returns success, then I see a success message "Instrument deleted successfully"
- [ ] Given the instrument is deleted, when I view the instruments list, then the instrument is removed from the active list (or status changes to "Deleted")

### Edit Dialog - Basic Info Tab
- [ ] Given the Edit dialog is open, when I view the Basic Info tab, then I see fields: ISIN, Instrument Code, Name, Short Name, Description, Bloomberg Ticker, CUSIP, SEDOL, Security Type, Security SubType
- [ ] Given I enter an ISIN, when I tab to the next field, then the ISIN is validated (12-character alphanumeric format)
- [ ] Given I select a Security Type, when I change it, then the Security SubType dropdown updates with relevant options

### Edit Dialog - Classification Tab
- [ ] Given the Edit dialog is open, when I click the Classification tab, then I see fields: Country, Currency, CIC Country Code, Asset Class Tree, CIC Tree, ICB Tree, GICS Tree
- [ ] Given I select a Country, when I change it, then the CIC Country Code auto-fills with the country's 2-letter code
- [ ] Given I select an Asset Class Tree, when I expand the dropdown, then I see a hierarchical tree structure (e.g., "Fixed Income > Corporate > IG")

### Edit Dialog - Financial Details Tab
- [ ] Given the Edit dialog is open, when I click the Financial Details tab, then I see fields: Issuer, Maturity Date, Issue Date, Coupon Rate, Par Value, Denomination
- [ ] Given I enter a Maturity Date, when I tab to the next field, then the date is validated (must be in the future for new bonds)

### Validation
- [ ] Given I try to save an instrument without an ISIN, when I click Save, then I see a validation error "ISIN is required"
- [ ] Given I try to save an instrument without an Instrument Code, when I click Save, then I see a validation error "Instrument Code is required"
- [ ] Given I enter an invalid ISIN format, when I click Save, then I see a validation error "ISIN must be 12 characters (2 letters + 10 alphanumeric)"
- [ ] Given I try to create an instrument with a duplicate ISIN, when I click Save, then I see an error "An instrument with this ISIN already exists"

### Pagination
- [ ] Given there are more than 20 instruments, when I view the table, then I see pagination controls: "< Prev" and "Next >" buttons
- [ ] Given I am on page 1, when I click "Next >", then the table loads the next 20 instruments
- [ ] Given I am on page 2 or higher, when I click "< Prev", then the table loads the previous 20 instruments
- [ ] Given I am on the last page, when I view the pagination, then the "Next >" button is disabled

### Export ISINs
- [ ] Given there are incomplete instruments, when I click "Export ISINs", then an Excel file downloads containing ISINs of incomplete instruments
- [ ] Given I open the exported file, when I view the content, then it contains columns: ISIN, Instrument Code, Instrument Name, Missing Fields

### Error Handling
- [ ] Given the API fails to load instruments, when the page loads, then I see an error message "Unable to load instruments. Please try again."
- [ ] Given the API fails to create an instrument, when I try to save, then I see an error message "Failed to create instrument. Please try again."
- [ ] Given the API fails to update an instrument, when I try to save, then I see an error message "Failed to update instrument. Please try again."
- [ ] Given the API fails to delete an instrument, when I try to delete, then I see an error message "Failed to delete instrument. Please try again."

## API Endpoints (from OpenAPI spec)

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/instruments` | Get all instruments |
| POST | `/instruments` | Create new instrument |
| GET | `/instruments/{Id}` | Get instrument by ID |
| PUT | `/instruments/{Id}` | Update instrument |
| DELETE | `/instruments/{Id}` | Delete instrument (soft delete) |
| GET | `/isin/export` | Export incomplete ISINs to Excel |

**Response for GET `/instruments`:**
```typescript
{
  Instruments: [
    {
      Id: number,
      InstrumentCode: string,
      ISIN: string,
      InstrumentName: string,
      InstrumentType: string,
      AssetClassTreeId: number,
      CurrencyId: number,
      CountryId: number,
      IssuerId: number,
      MaturityDate: string,
      Status: string,
      LastChangedUser: string,
      LastChangedDate: string
    }
  ]
}
```

## Implementation Notes

- Create page at `/maintenance/instruments`
- Use Shadcn UI components: Table, Dialog, Tabs, Input, Select, Button, Badge
- Create API client functions in `web/src/lib/api/instruments.ts`:
  - `getInstruments()` - fetch all instruments
  - `getInstrument(id: number)` - fetch single instrument
  - `createInstrument(data)` - create instrument
  - `updateInstrument(id: number, data)` - update instrument
  - `deleteInstrument(id: number)` - delete instrument
  - `exportIncompleteISINs()` - export Excel file
- Use React Hook Form for form management in Add/Edit dialog
- Use Zod for validation schema:
  - ISIN: required, string, 12 characters, regex pattern
  - InstrumentCode: required, string
  - InstrumentName: required, string
  - InstrumentType: required, string
  - Currency: required
- Tabbed dialog structure:
  1. Basic Info (core fields)
  2. Classification (country, currency, asset class)
  3. Financial Details (issuer, dates, coupon)
- Search/filter implementation:
  - Client-side filtering for small datasets
  - Server-side filtering with query parameters for large datasets
- Pagination:
  - Page size: 20 items per page
  - Show current page range (e.g., "Showing 1-20 of 247")
- Status values: "Active", "Inactive", "New", "Deleted"
- For hierarchical dropdowns (Asset Class Tree, CIC Tree):
  - Use Shadcn Select with nested options
  - Or implement a tree-select component
- Export ISINs functionality:
  - Call `/isin/export` endpoint
  - Backend returns Excel file as binary stream
  - Trigger browser download
- The "View Full Audit Trail" button will be implemented in Story 2
- State management (read-only mode) will be implemented in Story 7
