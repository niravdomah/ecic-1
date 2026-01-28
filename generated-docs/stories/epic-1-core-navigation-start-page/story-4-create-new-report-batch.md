# Story: Create New Report Batch

**Epic:** Core Navigation & Start Page
**Story:** 4 of 5
**Wireframe:** `../../wireframes/screen-1-start-page.md`

## User Story

**As an** operations lead
**I want** to create a new monthly or weekly report batch
**So that** I can initiate the reporting cycle and start uploading portfolio data

## Acceptance Criteria

### Happy Path - Create Monthly Batch
- [ ] Given I am on the Start Page, when I click "Create New Batch", then I see a dialog with options to select report type (Monthly/Weekly) and report date
- [ ] Given the dialog is open, when I select "Monthly" as report type and choose a date "2024-03-31", then the date picker allows me to select month-end dates only
- [ ] Given I have selected a report type and date, when I click "Create Batch", then the system sends a POST request to `/monthly-runs/{ReportDate}` with the selected date
- [ ] Given the batch creation is successful, when the API returns a 201 status, then I see a success message "Monthly process started successfully."
- [ ] Given the batch is created, when I view the Start Page, then the Current Report Batch section displays the new batch with status "Data Preparation"

### Happy Path - Create Weekly Batch
- [ ] Given I am on the Start Page, when I click "Create New Batch" and select "Weekly", then I can select any date within the current or future week
- [ ] Given I create a weekly batch, when successful, then the Current Report Batch section shows the weekly batch with the selected date

### Validation
- [ ] Given I open the Create Batch dialog, when I try to create a batch without selecting a date, then I see a validation error "Please select a report date"
- [ ] Given I try to create a batch for a date that already has an active batch, when I click "Create Batch", then I see an error message "A batch for this date already exists"
- [ ] Given I select a date in the past (more than 3 months ago), when I try to create a batch, then I see a warning "You are creating a batch for a historical date. Continue?"

### Error Handling
- [ ] Given the API returns a 500 error, when I try to create a batch, then I see an error message "Failed to create report batch. Please try again or contact support."
- [ ] Given the API is unreachable, when I try to create a batch, then I see an error message "Unable to connect to the server. Please check your connection."

### Dialog Behavior
- [ ] Given the Create Batch dialog is open, when I click "Cancel", then the dialog closes without creating a batch
- [ ] Given the batch is being created, when the API call is in progress, then the "Create Batch" button shows a loading state and is disabled
- [ ] Given the batch creation is successful, when the success message is shown, then the dialog automatically closes after 2 seconds

## API Endpoints (from OpenAPI spec)

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/monthly-runs/{ReportDate}` | Create a new monthly report batch for the specified date |

**Request Parameters:**
- `ReportDate` (path parameter): Date in format YYYY-MM-DD (e.g., "2024-03-31")

**Response:**
- 201: `{ "message": "Monthly process started successfully." }`
- 500: Internal Server Error

**Note:** The spec shows `/monthly-runs/{ReportDate}` for monthly batches. If weekly batches use a different endpoint, verify with the backend team or use the same endpoint with different date handling.

## Implementation Notes

- Create a "Create Batch" dialog component in `web/src/components/batches/CreateBatchDialog.tsx`
- Use Shadcn UI components: Dialog, Button, Select, DatePicker, Label
- Create API client function in `web/src/lib/api/batches.ts`:
  - `createReportBatch(reportDate: string, batchType: 'Monthly' | 'Weekly')` - creates a new batch
- Use React Hook Form for form state management
- Use Zod for validation schema:
  - `reportDate` is required
  - `batchType` is required (enum: Monthly | Weekly)
- Date validation:
  - For Monthly: only allow month-end dates (28-31 depending on month)
  - For Weekly: allow any date
  - Show warning for dates older than 3 months
- After successful creation, refresh the Start Page data to show the new batch
- Consider using React Query for API state management and automatic refetching
- The dialog should be triggered from a button on the Start Page (already in Story 3)
