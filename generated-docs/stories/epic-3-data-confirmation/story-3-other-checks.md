# Story: Other Checks Dashboard

**Epic:** Data Confirmation & Validation
**Story:** 3 of 5
**Wireframe:** `../../wireframes/screen-5-data-confirmation.md`

## User Story

**As an** operations user
**I want** to see a summary of reference data completeness (index prices, instruments, ratings, durations, betas)
**So that** I can identify and fix missing or incomplete reference data before proceeding to approvals

## Acceptance Criteria

### Happy Path - View Other Checks
- [ ] Given I am on the "Other Checks" tab, when the page loads, then I see a table titled "Reference Data Completeness"
- [ ] Given I view the table, when I look at the columns, then I see: Check Type, Count, Status
- [ ] Given I view the table, when I look at the rows, then I see check types: Index Price Incomplete, Instrument Incomplete, Credit Rating Incomplete, Instrument Duration Incomplete, Instrument Beta Incomplete

### Check Type Display
- [ ] Given I view the "Index Price Incomplete" row, when I look at the Count column, then I see the number of missing index prices (e.g., "2")
- [ ] Given I view the "Instrument Incomplete" row, when I look at the Count column, then I see the number of incomplete instruments (e.g., "8")
- [ ] Given I view the "Credit Rating Incomplete" row, when I look at the Count column, then I see the number of missing credit ratings (e.g., "0")
- [ ] Given I view the "Instrument Duration Incomplete" row, when I look at the Count column, then I see the number of missing durations (e.g., "5")
- [ ] Given I view the "Instrument Beta Incomplete" row, when I look at the Count column, then I see the number of missing betas (e.g., "3")

### Status Display
- [ ] Given a check has 0 incomplete items, when I view the Status column, then I see "[✓] Complete" with a green badge
- [ ] Given a check has incomplete items (count > 0), when I view the Status column, then I see "[⚠] Fix" with a yellow/red badge
- [ ] Given a check has incomplete items, when I view the Status column, then I also see a "View Details" link

### View Details Action
- [ ] Given I click "View Details" for "Index Price Incomplete", when the link is clicked, then I am navigated to the Index Prices maintenance screen with filters showing only incomplete items
- [ ] Given I click "View Details" for "Instrument Incomplete", when the link is clicked, then I am navigated to the Instruments maintenance screen filtered for incomplete instruments
- [ ] Given I click "View Details" for any check type, when the link is clicked, then I am navigated to the appropriate maintenance screen (Credit Ratings, Durations, Betas)

### Issues Summary
- [ ] Given there are incomplete items, when I view the bottom of the Other Checks tab, then I see "Issues Summary: X incomplete items found"
- [ ] Given there are 18 total incomplete items, when I view the issues summary, then I see "Issues Summary: 18 incomplete items found"
- [ ] Given all checks are complete, when I view the issues summary, then I see "Issues Summary: All reference data complete" or the section is hidden

### Quick Navigation Buttons
- [ ] Given I view the Other Checks tab, when I scroll to the bottom, then I see quick navigation buttons: "Fix Index Prices", "Fix Instruments", "Fix Durations", "Fix Betas", "Fix Ratings"
- [ ] Given I click "Fix Index Prices", when the button is clicked, then I am navigated to the Index Prices maintenance screen
- [ ] Given I click "Fix Instruments", when the button is clicked, then I am navigated to the Instruments maintenance screen
- [ ] Given a check type is complete (count = 0), when I view the quick navigation buttons, then that button is styled differently (e.g., green) to indicate completion

### Empty State
- [ ] Given all reference data is complete, when I load the Other Checks tab, then I see "All reference data checks complete ✓"
- [ ] Given the report batch has no reference data, when I load the tab, then I see "No reference data to validate"

### Loading State
- [ ] Given the page is loading data, when I view the Other Checks tab, then I see loading skeletons or spinners for the table
- [ ] Given the data takes more than 2 seconds to load, when I wait, then I see a loading indicator with text "Loading reference data checks..."

### Error Handling
- [ ] Given the API fails to load other data completeness, when the page loads, then I see an error message "Unable to load reference data checks. Please try again."
- [ ] Given the API returns partial data, when some check types are missing, then I show the available data and log a warning

## API Endpoints (from OpenAPI spec)

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/check-other-data-completeness` | Get other data completeness (index prices, instruments, ratings, durations, betas) |

**Response for `/check-other-data-completeness`:**
```typescript
{
  IndexPriceIncompleteCounts: [
    {
      IndexId: number,
      IndexCode: string,
      IncompleteCount: number
    }
  ],
  InstrumentIncompleteCounts: [
    {
      InstrumentId: number,
      InstrumentCode: string,
      IncompleteCount: number
    }
  ],
  CreditRatingIncompleteCounts: [
    {
      InstrumentId: number,
      InstrumentCode: string,
      IncompleteCount: number
    }
  ],
  InstrumentDurationIncompleteCounts: [
    {
      InstrumentId: number,
      InstrumentCode: string,
      IncompleteCount: number
    }
  ],
  InstrumentBetaIncompleteCounts: [
    {
      InstrumentId: number,
      InstrumentCode: string,
      IncompleteCount: number
    }
  ]
}
```

## Implementation Notes

- Enhance the Data Confirmation page from Story 1 with Other Checks content
- Use Shadcn UI components: Table, Badge, Button, Card, Alert
- Create a table with rows for each check type:
  1. Index Price Incomplete
  2. Instrument Incomplete
  3. Credit Rating Incomplete
  4. Instrument Duration Incomplete
  5. Instrument Beta Incomplete
- Calculate counts from API response:
  - Index Price Incomplete Count = `IndexPriceIncompleteCounts.length` or sum of `IncompleteCount`
  - Instrument Incomplete Count = `InstrumentIncompleteCounts.length`
  - Credit Rating Incomplete Count = `CreditRatingIncompleteCounts.length`
  - Instrument Duration Incomplete Count = `InstrumentDurationIncompleteCounts.length`
  - Instrument Beta Incomplete Count = `InstrumentBetaIncompleteCounts.length`
- Status badge mapping:
  - Count = 0 → "✓ Complete" (green badge)
  - Count > 0 → "⚠ Fix" (yellow/red badge)
- "View Details" link navigation:
  - Index Prices → `/maintenance/index-prices?filter=incomplete`
  - Instruments → `/maintenance/instruments?filter=incomplete`
  - Credit Ratings → `/maintenance/credit-ratings?filter=incomplete`
  - Durations → `/maintenance/durations?filter=incomplete`
  - Betas → `/maintenance/betas?filter=incomplete`
- Quick Navigation buttons:
  - Display at bottom of tab as action buttons
  - Each button navigates to the corresponding maintenance screen
  - Optional: Add badge with count on each button (e.g., "Fix Index Prices (2)")
- Issues summary calculation:
  - Sum all incomplete counts across all check types
  - Display total count
- Consider using React Query for data fetching with automatic refetching
- The maintenance screens will be implemented in Epic 4, so navigation may be to placeholder pages for now
