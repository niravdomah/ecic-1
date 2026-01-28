# Story: Main File Checks Dashboard

**Epic:** Data Confirmation & Validation
**Story:** 2 of 5
**Wireframe:** `../../wireframes/screen-5-data-confirmation.md`

## User Story

**As an** operations user
**I want** to see a consolidated view of portfolio file completeness across all data sources
**So that** I can verify that all required portfolio files have been uploaded before proceeding to approvals

## Acceptance Criteria

### Happy Path - View Main File Checks
- [ ] Given I am on the "Main File Checks" tab, when the page loads, then I see three sections: "Portfolio Manager Data", "Custodian Data", "Bloomberg Holdings"
- [ ] Given I view the Portfolio Manager Data section, when I look at the table, then I see columns: Portfolio, Holdings, Transactions, Income, Cash, Performance, Management Fees
- [ ] Given I view the Custodian Data section, when I look at the table, then I see columns: Portfolio, Custodian Holdings, Custodian Transactions, Custodian Cash, Custodian Fees
- [ ] Given I view the Bloomberg Holdings section, when I look at the table, then I see columns: Portfolio, Bloomberg Holdings

### Portfolio Manager Data Display
- [ ] Given portfolio manager data is complete, when I view a cell, then I see a green checkmark icon [✓] with text "Complete"
- [ ] Given portfolio manager data is missing, when I view a cell, then I see a red X icon [✗] with text "Missing"
- [ ] Given all portfolios exist, when I view the table, then I see a row for each portfolio (Portfolio A, Portfolio B, Sanlam, etc.)

### Custodian Data Display
- [ ] Given custodian data is complete, when I view a cell, then I see a green checkmark icon [✓] with status "Complete"
- [ ] Given custodian data is missing, when I view a cell, then I see a red X icon [✗] with status "Missing"
- [ ] Given I view the Custodian Data table, when I look at the rows, then I see the same portfolios as in Portfolio Manager Data

### Bloomberg Holdings Display
- [ ] Given Bloomberg holdings data is complete, when I view a cell, then I see "[✓] Complete"
- [ ] Given Bloomberg holdings data is missing, when I view a cell, then I see "[✗] Missing"

### Status Icons are Clickable
- [ ] Given I view a status icon showing "Missing", when I click on it, then I am navigated to the file upload screen for that specific portfolio and file type
- [ ] Given I click a "Missing" status for "Portfolio A - Income", when I click it, then the file upload modal opens for Portfolio A's Income file

### Issues Summary
- [ ] Given there are incomplete files, when I view the bottom of the Main File Checks tab, then I see "Issues Summary: X issue(s) found"
- [ ] Given there is one missing file, when I view the issues summary, then I see "Issues Summary: 1 issue found"
- [ ] Given all files are complete, when I view the issues summary, then I see "Issues Summary: All checks complete" or the section is hidden

### Issues List with Fix Links
- [ ] Given Portfolio A's Income data is missing, when I view the issues list, then I see "- Portfolio A: Income data missing [Fix Now →]"
- [ ] Given I click "Fix Now" for a missing file, when the link is clicked, then I am navigated to the file upload page with the specific file pre-selected
- [ ] Given there are no issues, when I view the issues list, then it is empty or shows "No issues found"

### Empty State
- [ ] Given no portfolios are configured, when I load the Main File Checks tab, then I see "No portfolios configured for this report batch"
- [ ] Given the report batch has no data, when I load the tab, then I see "No data available. Please upload files to begin."

### Loading State
- [ ] Given the page is loading data, when I view the Main File Checks tab, then I see loading skeletons or spinners for each table
- [ ] Given the data takes more than 2 seconds to load, when I wait, then I see a loading indicator with text "Loading file checks..."

### Error Handling
- [ ] Given the API fails to load main data completeness, when the page loads, then I see an error message "Unable to load main file checks. Please try again."
- [ ] Given the API returns partial data, when some sections load and others fail, then I see error messages only for the failed sections

## API Endpoints (from OpenAPI spec)

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/check-file-completeness` | Get file completeness checks |
| GET | `/check-main-data-completeness` | Get main data completeness (portfolio manager, custodian, Bloomberg) |

**Response for `/check-main-data-completeness`:**
```typescript
{
  PortfolioManager: [
    {
      PortfolioCode: string,
      HoldingDataComplete: string, // "Complete" | "Missing"
      TransactionDataComplete: string,
      IncomeDataComplete: string,
      CashDataComplete: string,
      PerformanceDataComplete: string,
      ManagementFeeDataComplete: string
    }
  ],
  Custodian: [
    {
      PortfolioCode: string,
      CustodianHoldingDataComplete: string,
      CustodianTransactionDataComplete: string,
      CustodianCashDataComplete: string,
      CustodianFeeDataComplete: string
    }
  ],
  BloombergHoldings: [
    {
      PortfolioCode: string,
      BloombergHoldingDataComplete: string
    }
  ]
}
```

## Implementation Notes

- Enhance the Data Confirmation page from Story 1 with Main File Checks content
- Use Shadcn UI components: Table, Badge, Button, Card, Alert
- Create three separate tables (or Card components) for:
  1. Portfolio Manager Data
  2. Custodian Data
  3. Bloomberg Holdings
- Status badge mapping:
  - "Complete" → Green badge with ✓ icon
  - "Missing" → Red badge with ✗ icon
- Make status cells clickable:
  - Extract portfolio and file type from the cell
  - Navigate to file upload page or open file upload modal
  - Pre-select the specific portfolio and file type
- Issues summary calculation:
  - Count all cells with "Missing" status across all three tables
  - Build a list of issues with descriptive text
- "Fix Now" links:
  - Navigate to `/file-import/portfolio-files` with query parameters for portfolio and file type
  - Or open File Upload Modal (Epic 2 Story 3) with pre-filled context
- Consider using React Query for data fetching:
  - Enable automatic refetching when window regains focus
  - Cache data to avoid redundant API calls
- Display all three tables even if one is empty (show "No data" message within that table)
- Add section headers for each table: "Portfolio Manager Data", "Custodian Data", "Bloomberg Holdings"
