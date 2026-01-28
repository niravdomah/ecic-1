# Story: Index Prices Maintenance

**Epic:** Maintenance Screens - Financial Data
**Story:** 3 of 7
**Wireframe:** `../../wireframes/screen-7-index-prices-maintenance.md`

## User Story

**As an** operations analyst
**I want** to manage index prices for the current report batch
**So that** I can ensure accurate index price data is available for portfolio performance calculations

## Acceptance Criteria

### Happy Path - View Index Prices
- [ ] Given I navigate to Index Prices Maintenance, when the page loads, then I see a table with columns: Index Code, Index Name, Bloomberg Ticker, Price, Report Date, Status
- [ ] Given index prices exist for the current batch, when I view the table, then I see all index prices with their details
- [ ] Given the current report batch is "March 2024", when I view the page header, then I see "Report Batch: March 2024"

### Add Index Price
- [ ] Given I am on the Index Prices page, when I click "Add Price", then a dialog opens with fields: Index (dropdown), Price, Report Date
- [ ] Given the Add dialog is open, when I select an Index and enter a Price, then I can click "Save" to create the price entry
- [ ] Given the price is created successfully, when the API returns success, then I see a success message "Index price added successfully" and the dialog closes
- [ ] Given the price is created, when I view the index prices list, then the new price appears in the table

### Edit Index Price
- [ ] Given I view an index price row, when I click the "Edit" button, then the Edit Price dialog opens with the current data pre-filled
- [ ] Given the Edit dialog is open, when I modify the Price field and click "Save", then the price is updated
- [ ] Given the update is successful, when the API returns success, then I see a success message "Index price updated successfully"
- [ ] Given the price is updated, when I view the table, then the updated price is displayed

### Delete Index Price
- [ ] Given I view an index price row, when I click the "Delete" button, then I see a confirmation dialog "Are you sure you want to delete this price entry?"
- [ ] Given I confirm deletion, when I click "Yes", then the price entry is deleted
- [ ] Given the deletion is successful, when the API returns success, then I see a success message "Index price deleted successfully"
- [ ] Given the price is deleted, when I view the table, then the price entry is removed

### View Price History
- [ ] Given I view an index price row, when I click the "History" button, then a dialog opens showing the price history for that index across all report batches
- [ ] Given the History dialog is open, when I view the content, then I see a table with columns: Report Date, Price, Changed By, Changed Date
- [ ] Given I view the history, when I look at the data, then I see all historical prices for that index in reverse chronological order

### Upload Prices (Bulk)
- [ ] Given I am on the Index Prices page, when I click "Upload Prices", then a dialog opens with a file upload zone
- [ ] Given the Upload dialog is open, when I select an Excel/CSV file and click "Upload", then the file is uploaded and prices are imported
- [ ] Given the upload is successful, when the API returns success, then I see a success message "Prices uploaded successfully" with count (e.g., "15 prices imported")
- [ ] Given the upload has errors, when the API returns validation errors, then I see a list of errors with row numbers

### Quick Pop-up (Resolve Gaps)
- [ ] Given there are missing index prices, when I navigate to Index Prices from Data Confirmation, then I see a quick popup showing only incomplete indexes
- [ ] Given the quick popup is open, when I add prices for the missing indexes, then I can click "Save All" to bulk-create the prices
- [ ] Given I save all prices, when the operation completes, then the popup closes and I return to Data Confirmation with updated status

### Search and Filter
- [ ] Given I want to find a specific index, when I enter an Index Code or Name in the search box and click Search, then the table filters to show only matching prices
- [ ] Given I select a Status filter, when I apply it, then the table shows only prices with that status

### Validation
- [ ] Given I try to add a price without selecting an Index, when I click Save, then I see a validation error "Index is required"
- [ ] Given I try to add a price without entering a Price value, when I click Save, then I see a validation error "Price is required"
- [ ] Given I enter a negative price, when I click Save, then I see a validation error "Price must be a positive number"
- [ ] Given I try to add a duplicate price (same Index + Report Date), when I click Save, then I see an error "A price for this index and date already exists"

### Report Batch Context
- [ ] Given the current report batch is "March 2024", when I add a new price, then the Report Date defaults to the batch date (2024-03-31)
- [ ] Given I view the table, when I look at all prices, then they are filtered to the current report batch (only March 2024 prices shown)
- [ ] Given I switch to a different report batch, when I return to Index Prices, then the table shows prices for the newly selected batch

### Pagination
- [ ] Given there are more than 20 index prices, when I view the table, then I see pagination controls
- [ ] Given I click "Next", when the page changes, then the table loads the next 20 prices

### Error Handling
- [ ] Given the API fails to load index prices, when the page loads, then I see an error message "Unable to load index prices. Please try again."
- [ ] Given the API fails to create a price, when I try to save, then I see an error message "Failed to add index price. Please try again."
- [ ] Given the API fails to update a price, when I try to save, then I see an error message "Failed to update index price. Please try again."

## API Endpoints (from OpenAPI spec)

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/index-prices` | Get all index prices for current batch |
| POST | `/index-prices` | Create new index price |
| GET | `/index-prices/{Id}` | Get index price by ID |
| PUT | `/index-prices/{Id}` | Update index price |
| DELETE | `/index-prices/{Id}` | Delete index price |
| GET | `/index-prices-history/{Id}` | Get price history for an index |

**Request for POST `/index-prices`:**
```typescript
{
  ReportBatchId: number,
  IndexId: number,
  Price: number,
  LastChangedUser: string
}
```

**Response for GET `/index-prices`:**
```typescript
{
  IndexPrices: [
    {
      Id: number,
      ReportBatchId: number,
      ReportDate: string,
      ReportBatchType: string,
      IndexId: number,
      IndexCode: string,
      IndexBloombergTicker: string,
      Price: number,
      Status: string
    }
  ]
}
```

## Implementation Notes

- Create page at `/maintenance/index-prices`
- Use Shadcn UI components: Table, Dialog, Input, Select, Button, Badge
- Create API client functions in `web/src/lib/api/index-prices.ts`:
  - `getIndexPrices(reportBatchId?: number)` - fetch index prices for current batch
  - `getIndexPrice(id: number)` - fetch single price
  - `createIndexPrice(data)` - create price
  - `updateIndexPrice(id: number, data)` - update price
  - `deleteIndexPrice(id: number)` - delete price
  - `getIndexPriceHistory(indexId: number)` - fetch price history
- Use React Hook Form for Add/Edit dialogs
- Use Zod for validation:
  - IndexId: required, number
  - Price: required, number, min value 0
  - ReportBatchId: required, number
- Report batch context:
  - Fetch current batch from `/configurations` endpoint
  - Pre-fill ReportBatchId and ReportDate in forms
  - Filter table to show only prices for current batch
- Upload functionality:
  - Accept Excel/CSV files with columns: IndexCode, Price
  - Validate file format and data
  - Show upload progress indicator
  - Display summary: "X prices imported, Y errors"
- Quick popup for Data Confirmation:
  - Open as modal when navigating from Data Confirmation "Fix Index Prices" link
  - Filter to show only indexes with missing prices
  - Allow bulk entry with "Save All" button
- Price history dialog:
  - Show historical prices in table format
  - Include chart visualization (optional - line chart showing price trends)
- Status values: "Active", "Historical"
- Pagination: 20 items per page
- Consider adding currency display next to price (from Index configuration)
- State management (read-only mode) will be implemented in Story 7
