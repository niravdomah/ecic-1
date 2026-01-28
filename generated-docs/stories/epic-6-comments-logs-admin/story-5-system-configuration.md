# Story: System Configuration Management

**Epic:** Comments, Logs & Administration
**Story:** 5 of 5
**Wireframe:** `../../wireframes/screen-14-system-configuration.md`

## User Story

**As a** system administrator
**I want** to manage reference data (countries, currencies, portfolios, asset managers, benchmarks, etc.)
**So that** I can maintain accurate master data for the InvestInsight system

## Acceptance Criteria

### Happy Path - View System Configuration
- [ ] Given I navigate to System Configuration (Admin section), when the page loads, then I see a list of configuration categories
- [ ] Given I view the categories, when I look at the list, then I see: Countries, Currencies, Asset Managers, Portfolios, Indexes, Benchmarks, Credit Rating Scales, Transforms, Management Fee Rates, Custody Fee Rates, File Settings, Report List
- [ ] Given I click on a category (e.g., "Countries"), when the category is selected, then I see a table displaying all records for that category

### Countries Management
- [ ] Given I am viewing the Countries category, when I view the table, then I see columns: Country Code, Country Name, Region, Status, Last Changed By, Last Changed Date, Actions
- [ ] Given I click "Add New Country", when the dialog opens, then I see fields: Country Code (2-letter), Country Name, Region
- [ ] Given I fill in the fields and click "Save", when the country is created, then I see a success message and the new country appears in the table
- [ ] Given I click "Edit" on a country, when I update the country name and save, then the country is updated
- [ ] Given I click "Delete" on a country, when I confirm deletion, then the country is marked as inactive

### Currencies Management
- [ ] Given I am viewing the Currencies category, when I view the table, then I see columns: Currency Code, Currency Name, Symbol, Status, Actions
- [ ] Given I add a new currency, when I provide Currency Code (3-letter), Currency Name, and Symbol, then the currency is created

### Asset Managers Management
- [ ] Given I am viewing the Asset Managers category, when I view the table, then I see columns: Asset Manager Name, Code, Contact Email, Status, Actions
- [ ] Given I manage asset managers, when I add/edit/delete, then CRUD operations work similarly to Countries

### Portfolios Management
- [ ] Given I am viewing the Portfolios category, when I view the table, then I see columns: Portfolio Code, Portfolio Name, Asset Manager, Currency, Status, Actions
- [ ] Given I add a new portfolio, when I provide Portfolio Code, Portfolio Name, select Asset Manager and Currency, then the portfolio is created
- [ ] Given I edit a portfolio, when I change the Asset Manager, then the portfolio is updated with the new association

### Indexes Management
- [ ] Given I am viewing the Indexes category, when I view the table, then I see columns: Index Code, Index Name, Bloomberg Ticker, Currency, Status, Actions
- [ ] Given I manage indexes, when I add/edit/delete, then CRUD operations work

### Benchmarks Management
- [ ] Given I am viewing the Benchmarks category, when I view the table, then I see columns: Benchmark Name, Benchmark Code, Index, Status, Actions
- [ ] Given I add a benchmark, when I select an associated Index, then the benchmark is linked to that index

### Credit Rating Scales Management
- [ ] Given I am viewing the Credit Rating Scales category, when I view the table, then I see columns: Rating Agency, Scale Name, Rating Values, Status, Actions
- [ ] Given I view rating values, when I look at the display, then I see the rating scale (e.g., "AAA, AA+, AA, AA-, A+, A, A-, ...")

### File Settings Management
- [ ] Given I am viewing the File Settings category, when I view the table, then I see columns: File Type, Source, Format, Expected Pattern, Portfolio, Status, Actions
- [ ] Given I add file settings, when I configure upload expectations, then the settings are used by the file upload system

### Report List Management
- [ ] Given I am viewing the Report List category, when I view the table, then I see columns: Report Name, Report Type, Portfolio, Status, Actions
- [ ] Given I add a new report, when I provide Report Name and Type, then the report is available for report comments

### View Audit Trail
- [ ] Given I am viewing any configuration category, when I click "View Full Audit Trail", then I see a table showing all changes across all records in that category
- [ ] Given I view an individual record, when I click "History", then I see the audit trail for that specific record showing all changes with user and timestamp

### Search and Filter
- [ ] Given I am viewing any configuration table, when I use the search box, then the table filters to show only matching records
- [ ] Given I select a Status filter (Active/Inactive), when the filter is applied, then the table shows only records with that status

### Validation
- [ ] Given I try to add a country without a Country Code, when I click Save, then I see a validation error "Country Code is required"
- [ ] Given I try to add a currency with an invalid Currency Code (not 3 letters), when I click Save, then I see a validation error "Currency Code must be 3 letters"
- [ ] Given I try to add a duplicate record (same code/name), when I click Save, then I see an error "A record with this code already exists"

### Bulk Import (Optional)
- [ ] Given I am viewing a configuration category, when I click "Import from File", then a dialog opens allowing me to upload a CSV file
- [ ] Given I upload a valid CSV file, when the import completes, then I see a success message "X records imported successfully"
- [ ] Given the CSV has errors, when the import is processed, then I see "Y records imported, Z errors found" with error details

### Export Configuration
- [ ] Given I am viewing any configuration category, when I click "Export", then a CSV file downloads containing all records in that category
- [ ] Given I open the exported CSV, when I view the content, then it contains all columns from the table

### Category Navigation
- [ ] Given I am on the System Configuration page, when I view the left sidebar, then I see a list of all configuration categories
- [ ] Given I click a category in the sidebar, when the category is selected, then the main content area updates to show that category's table
- [ ] Given I am viewing a category, when I look at the sidebar, then the current category is highlighted

### Permissions and Access Control
- [ ] Given I am not an administrator, when I navigate to System Configuration, then I see a message "You do not have permission to access system configuration"
- [ ] Given I am an administrator, when I navigate to System Configuration, then I see all categories and can manage records

### Empty State
- [ ] Given a configuration category has no records, when I view that category, then I see "No records found. Click 'Add New' to create the first record."

### Pagination
- [ ] Given a configuration category has more than 50 records, when I view the table, then I see pagination controls
- [ ] Given I click "Next", when the page changes, then the table loads the next 50 records

### Error Handling
- [ ] Given the API fails to load a configuration category, when the page loads, then I see an error message "Unable to load [Category]. Please try again."
- [ ] Given the API fails to create a record, when I try to save, then I see an error message "Failed to create record. Please try again."
- [ ] Given the API fails to update a record, when I try to save, then I see an error message "Failed to update record. Please try again."

## API Endpoints (from OpenAPI spec)

All reference data follows the same CRUD pattern:

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/[category]` | Get all records (e.g., `/countries`, `/currencies`) |
| POST | `/[category]` | Create new record |
| GET | `/[category]/{Id}` | Get record by ID |
| PUT | `/[category]/{Id}` | Update record |
| DELETE | `/[category]/{Id}` | Delete record |
| GET | `/[category]-audit-trail/{Id}` | Get audit trail for specific record |
| GET | `/[category]-full-audit-trail` | Get full audit trail for category |

**Configuration Categories (from spec):**
- `/countries`
- `/currencies`
- `/asset-managers`
- `/portfolios`
- `/indexes`
- `/benchmarks`
- `/credit-rating-scales`
- `/transforms`
- `/management-fee-rates`
- `/custody-fee-rates`
- `/file-settings`
- `/report-list`

## Implementation Notes

- Create page at `/admin/configuration` or `/system-configuration`
- Use Shadcn UI components: Tabs or Sidebar navigation, Table, Dialog, Input, Select, Button, Badge
- Create a reusable configuration management component:
  - `ConfigurationTable.tsx` - generic table for any category
  - `ConfigurationForm.tsx` - generic form for add/edit
  - Pass category-specific field definitions as props
- Layout options:
  1. Sidebar navigation with categories on left, table on right
  2. Tabs across top with one tab per category
  3. Dropdown selector for category
- Category definitions:
  - Define field schemas for each category (name, type, required, validation)
  - Use JSON or TypeScript configuration
  - Example:
    ```typescript
    const categoryConfig = {
      countries: {
        fields: [
          { name: 'CountryCode', type: 'text', required: true, maxLength: 2 },
          { name: 'CountryName', type: 'text', required: true },
          { name: 'Region', type: 'select', options: ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'] }
        ]
      },
      // ... other categories
    }
    ```
- Create API client functions in `web/src/lib/api/configuration.ts`:
  - Generic functions that accept category name
  - `getConfigRecords(category: string)` - fetch all records
  - `createConfigRecord(category: string, data)` - create record
  - `updateConfigRecord(category: string, id: number, data)` - update record
  - `deleteConfigRecord(category: string, id: number)` - delete record
  - `getConfigAuditTrail(category: string, id: number)` - fetch audit trail
- Use React Hook Form with Zod for dynamic form generation
- Audit trail:
  - Reuse the audit trail component from Epic 4 Story 2
  - Display at category level or individual record level
- Search and filter:
  - Client-side search for small datasets
  - Status filter (Active/Inactive)
- Export functionality:
  - Client-side CSV generation
  - Include all visible records
  - Filename: `[Category]_Export_[Date].csv`
- Bulk import (optional):
  - Accept CSV files with category-specific columns
  - Validate format and data
  - Create multiple records via API
  - Show progress and results
- Access control:
  - Check user role for admin permissions
  - Backend should also validate permissions on all endpoints
- Pagination: 50 records per page (configurable)
- Consider adding a "Recently Modified" section showing recent changes across all categories
- Each category follows the same CRUD pattern, making this highly reusable
