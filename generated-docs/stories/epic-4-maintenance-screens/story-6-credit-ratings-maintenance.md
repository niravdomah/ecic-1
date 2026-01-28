# Story: Credit Ratings Maintenance

**Epic:** Maintenance Screens - Financial Data
**Story:** 6 of 7
**Wireframe:** `../../wireframes/screen-10-credit-ratings-maintenance.md`

## User Story

**As an** operations analyst
**I want** to manage credit ratings for instruments and view rating changes
**So that** I can maintain accurate credit risk assessments for portfolio reporting

## Acceptance Criteria

### Happy Path - View Credit Ratings List
- [ ] Given I navigate to Credit Ratings Maintenance, when the page loads, then I see a table with columns: Instrument Code, ISIN, Country, Rating Agency, National Rating, International Rating, Final Rating National, Final Rating International, Effective Date, Last Changed By
- [ ] Given credit ratings exist in the system, when I view the table, then I see all ratings with their details
- [ ] Given there are multiple rating agencies for one instrument, when I view the table, then I see separate rows for each agency

### Add Credit Rating
- [ ] Given I am on the Credit Ratings page, when I click "Add Rating", then a dialog opens with fields: Instrument, Rating Agency, National Rating, International Rating, Effective Date
- [ ] Given the Add dialog is open, when I fill in required fields and click "Save", then the rating is created
- [ ] Given the rating is created successfully, when the API returns success, then I see a success message "Credit rating added successfully" and the dialog closes
- [ ] Given the rating is created, when I view the ratings list, then the new rating appears in the table

### Edit Credit Rating
- [ ] Given I view a rating row, when I click the "Edit" button, then the Edit Rating dialog opens with the current data pre-filled
- [ ] Given the Edit dialog is open, when I modify rating fields and click "Save", then the rating is updated
- [ ] Given the update is successful, when the API returns success, then I see a success message "Credit rating updated successfully"
- [ ] Given the rating is updated, when I view the table, then the updated data is displayed

### Delete Credit Rating
- [ ] Given I view a rating row, when I click the "Delete" button, then I see a confirmation dialog "Are you sure you want to delete this credit rating?"
- [ ] Given I confirm deletion, when I click "Yes", then the rating is deleted
- [ ] Given the deletion is successful, when the API returns success, then I see a success message "Credit rating deleted successfully"
- [ ] Given the rating is deleted, when I view the table, then the rating entry is removed

### View Rating Changes
- [ ] Given I am on the Credit Ratings page, when I click "View Rating Changes", then a new section or page opens showing rating changes across portfolios
- [ ] Given the Rating Changes view is open, when I view the content, then I see a table with columns: Report Date, Instrument Code, ISIN, Country, Final Rating National, Previous Final Rating National, Final Rating International, Previous Final Rating International
- [ ] Given a rating has changed, when I view the row, then I see the current rating and previous rating side-by-side
- [ ] Given a rating has been upgraded, when I view the change, then it is highlighted in green
- [ ] Given a rating has been downgraded, when I view the change, then it is highlighted in red

### Rating Agency Support
- [ ] Given I add or edit a rating, when I select Rating Agency, then I see options: Moody's, S&P, Fitch, GCR, etc.
- [ ] Given different agencies have different rating scales, when I select an agency, then the National Rating and International Rating dropdowns update with that agency's rating scale

### Final Rating Calculation
- [ ] Given I enter National Rating and International Rating, when I save the rating, then the system calculates Final Rating National and Final Rating International based on business rules
- [ ] Given final ratings are calculated, when I view the rating, then I see both the entered ratings and the calculated final ratings

### View Rating History
- [ ] Given I view a rating row, when I click the "History" button, then a dialog opens showing the rating history for that instrument
- [ ] Given the History dialog is open, when I view the content, then I see a table with columns: Effective Date, National Rating, International Rating, Rating Agency, Changed By, Changed Date
- [ ] Given I view the history, when I look at the data, then I see all historical ratings for that instrument in reverse chronological order

### Retry Credit Rating Decision Flow
- [ ] Given I am on the Credit Ratings page, when I click "Retry Decision Flow", then I see a confirmation dialog "Re-run credit rating decision flow for all instruments?"
- [ ] Given I confirm retry, when the process starts, then I see a loading indicator
- [ ] Given the decision flow completes, when it finishes, then I see a success message "Credit rating decision flow completed successfully" and final ratings are recalculated

### Search and Filter
- [ ] Given I want to find a specific instrument, when I enter an Instrument Code or ISIN in the search box and click Search, then the table filters to show only matching ratings
- [ ] Given I select a Rating Agency filter, when I apply it, then the table shows only ratings from that agency
- [ ] Given I select a Country filter, when I apply it, then the table shows only ratings for instruments from that country

### Validation
- [ ] Given I try to add a rating without selecting an Instrument, when I click Save, then I see a validation error "Instrument is required"
- [ ] Given I try to add a rating without selecting a Rating Agency, when I click Save, then I see a validation error "Rating Agency is required"
- [ ] Given I try to add a rating without an Effective Date, when I click Save, then I see a validation error "Effective Date is required"
- [ ] Given I enter an Effective Date in the future (beyond next month), when I click Save, then I see a warning "Effective date is in the future. Are you sure?"

### Rating Scale Validation
- [ ] Given I select "Moody's" as Rating Agency, when I enter National Rating, then I can only select from Moody's rating scale (Aaa, Aa1, Aa2, etc.)
- [ ] Given I select "S&P" as Rating Agency, when I enter National Rating, then I can only select from S&P rating scale (AAA, AA+, AA, etc.)
- [ ] Given I enter an invalid rating for the selected agency, when I click Save, then I see a validation error "Invalid rating for selected agency"

### Pagination
- [ ] Given there are more than 20 credit ratings, when I view the table, then I see pagination controls
- [ ] Given I click "Next", when the page changes, then the table loads the next 20 ratings

### Error Handling
- [ ] Given the API fails to load credit ratings, when the page loads, then I see an error message "Unable to load credit ratings. Please try again."
- [ ] Given the API fails to load rating changes, when I click "View Rating Changes", then I see an error message "Unable to load rating changes. Please try again."
- [ ] Given the API fails to create a rating, when I try to save, then I see an error message "Failed to add credit rating. Please try again."
- [ ] Given the decision flow retry fails, when the error occurs, then I see an error message "Failed to retry decision flow. Please try again."

## API Endpoints (from OpenAPI spec)

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/credit-ratings` | Get all credit ratings |
| POST | `/credit-ratings` | Create new credit rating |
| GET | `/credit-ratings/{Id}` | Get credit rating by ID |
| PUT | `/credit-ratings/{Id}` | Update credit rating |
| DELETE | `/credit-ratings/{Id}` | Delete credit rating |
| GET | `/credit-rating-audit-trail/{Id}` | Get rating audit trail |
| GET | `/credit-rating-full-audit-trail` | Get full rating audit trail |
| GET | `/credit-ratings-history/{InstrumentId}` | Get rating history for instrument |
| POST | `/credit-ratings-decision-flow/{ReportBatchId}` | Retry credit rating decision flow |

**Request for POST `/credit-ratings`:**
```typescript
{
  InstrumentId: number,
  RatingAgencyId: number,
  RatingScaleId: number,
  NationalRating: string,
  InternationalRating: string,
  EffectiveDate: string,
  LastChangedUser: string
}
```

**Response for GET `/credit-ratings`:**
```typescript
{
  CreditRatings: [
    {
      Id: number,
      InstrumentId: number,
      InstrumentCode: string,
      ISIN: string,
      Country: string,
      RatingAgencyId: number,
      RatingScaleId: number,
      NationalRating: string,
      InternationalRating: string,
      FinalRatingNational: string,
      FinalRatingInternational: string,
      EffectiveDate: string,
      LastChangedUser: string
    }
  ]
}
```

## Implementation Notes

- Create page at `/maintenance/credit-ratings`
- Use Shadcn UI components: Table, Dialog, Input, Select, Button, Badge, Tabs (for Rating Changes view)
- Create API client functions in `web/src/lib/api/credit-ratings.ts`:
  - `getCreditRatings()` - fetch all ratings
  - `getCreditRating(id: number)` - fetch single rating
  - `createCreditRating(data)` - create rating
  - `updateCreditRating(id: number, data)` - update rating
  - `deleteCreditRating(id: number)` - delete rating
  - `getCreditRatingHistory(instrumentId: number)` - fetch rating history
  - `retryCreditRatingDecisionFlow(reportBatchId: number)` - retry decision flow
- Use React Hook Form for Add/Edit dialogs
- Use Zod for validation:
  - InstrumentId: required, number
  - RatingAgencyId: required, number
  - NationalRating: optional, string (depends on agency)
  - InternationalRating: optional, string (depends on agency)
  - EffectiveDate: required, date
- Rating scales mapping:
  - Fetch rating scales from `/configurations` or dedicated endpoint
  - Map agency to valid rating values
  - Moody's: Aaa, Aa1, Aa2, Aa3, A1, A2, A3, Baa1, Baa2, Baa3, etc.
  - S&P/Fitch: AAA, AA+, AA, AA-, A+, A, A-, BBB+, BBB, BBB-, etc.
  - GCR (South African): AA, A+, A, A-, BBB+, BBB, BBB-, etc.
- Final rating calculation:
  - Implement business rules for final rating determination
  - May be calculated on backend (check API response)
- Rating Changes view:
  - Implement as a separate tab or section
  - Compare current ratings with previous period
  - Highlight upgrades (green) and downgrades (red)
  - Show "No change" for unchanged ratings
- Retry Decision Flow:
  - Show loading state during process
  - May take several seconds to complete
  - Refresh ratings table after completion
- Audit trail:
  - Reuse the audit trail component from Story 2
- Pagination: 20 items per page
- Consider adding visual indicators for rating quality (e.g., investment grade vs. non-investment grade)
- State management (read-only mode) will be implemented in Story 7
