# Screen: Index Prices Maintenance

## Purpose

Upload, update, and view index price data for the current reporting batch with full history tracking.

## Wireframe

```
+-------------------------------------------------------------------------+
|  InvestInsight                           [User Profile v]   [Logout]   |
+-------------------------------------------------------------------------+
|  Home | File Import | Data Check | Maintenance | Approvals | Logs      |
+-------------------------------------------------------------------------+
|                                                                         |
|  Index Prices Maintenance                Report Batch: March 2024      |
|                                          Report Date: 2024-03-31       |
|                                                                         |
|  [Add Index Price]  [Upload Prices File]  [Export ↓]  [Refresh ↻]     |
|                                                                         |
|  Outstanding Prices: 2 indexes missing prices [View Outstanding →]     |
|                                                                         |
|  Search/Filter:                                                         |
|  [Index Code/Ticker...        ] [Status: All v]        [Search 🔍]     |
|                                                                         |
|  +------------------------------------------------------------------+   |
|  | Index Code | Bloomberg Ticker | Price     | Status   | Actions  |  |
|  |------------|------------------|-----------|----------|----------|  |
|  | ALSI       | JALSH Index      | 78,432.15 | Complete | [Edit]   |  |
|  |            |                  |           |          | [Delete] |  |
|  |            |                  |           |          | [History]|  |
|  |------------|------------------|-----------|----------|----------|  |
|  | SWIX       | JSWIX Index      | 31,234.82 | Complete | [Edit]   |  |
|  |            |                  |           |          | [Delete] |  |
|  |            |                  |           |          | [History]|  |
|  |------------|------------------|-----------|----------|----------|  |
|  | ALBI       | JALBI Index      | 1,245.67  | Complete | [Edit]   |  |
|  |            |                  |           |          | [Delete] |  |
|  |            |                  |           |          | [History]|  |
|  |------------|------------------|-----------|----------|----------|  |
|  | MSCI EM    | MXEF Index       | -         | Missing  | [Add]    |  |
|  |            |                  |           |          | [History]|  |
|  |------------|------------------|-----------|----------|----------|  |
|  | SP500      | SPX Index        | 5,234.18  | Complete | [Edit]   |  |
|  |            |                  |           |          | [Delete] |  |
|  |            |                  |           |          | [History]|  |
|  +------------------------------------------------------------------+   |
|                                                                         |
|  Showing 1-5 of 23 index prices              [< Prev] [Next >]         |
|                                                                         |
+-------------------------------------------------------------------------+

ADD/EDIT INDEX PRICE DIALOG:
+-----------------------------------------------------------------------+
|  Add Index Price                                                [X]   |
+-----------------------------------------------------------------------+
|                                                                       |
|  Report Batch: March 2024 (2024-03-31)                                |
|                                                                       |
|  +----------------------------------------------------------------+   |
|  | Index:         [MSCI EM - MXEF Index                      v]   |   |
|  |                                                                |   |
|  | Price:         [1523.45                                    ]   |   |
|  |                                                                |   |
|  | Last Changed:  [J. Smith                                  v]   |   |
|  +----------------------------------------------------------------+   |
|                                                                       |
|  [Save Price]  [Cancel]                                               |
|                                                                       |
+-----------------------------------------------------------------------+

PRICE HISTORY DIALOG:
+-----------------------------------------------------------------------+
|  Index Price History: ALSI (JALSH Index)                        [X]   |
+-----------------------------------------------------------------------+
|                                                                       |
|  +----------------------------------------------------------------+   |
|  | Report Date | Price     | Changed By   | Changed At          |  |
|  |-------------|-----------|--------------|---------------------|  |
|  | 2024-03-31  | 78,432.15 | J. Smith     | 2024-04-01 08:15:23 |  |
|  | 2024-02-29  | 77,123.45 | J. Smith     | 2024-03-01 09:32:11 |  |
|  | 2024-01-31  | 76,234.89 | M. Brown     | 2024-02-01 08:45:05 |  |
|  | 2023-12-31  | 74,567.23 | J. Smith     | 2024-01-02 10:22:18 |  |
|  | 2023-11-30  | 73,891.56 | A. Johnson   | 2023-12-01 09:15:42 |  |
|  | ...                                                            |  |
|  +----------------------------------------------------------------+   |
|                                                                       |
|  Price Change (vs Previous Month): +1,308.70 (+1.69%)                 |
|                                                                       |
|  [Export History ↓]  [Close]                                          |
|                                                                       |
+-----------------------------------------------------------------------+
```

## Elements

| Element | Type | Description |
|---------|------|-------------|
| Add Index Price | Button | Opens dialog to add new index price |
| Upload Prices File | Button | Bulk upload index prices from file |
| Export | Button | Export index prices to Excel |
| Refresh | Button | Reload prices from backend |
| View Outstanding | Link | Navigate to outstanding prices list |
| Search/Filter | Filter Bar | Search by index code or ticker |
| Edit | Button | Opens dialog to modify price |
| Delete | Button | Remove price entry (requires confirmation) |
| History | Button | View price history for specific index |
| Add | Button | Add missing price for index |
| Save Price | Button | Submit price update |
| Export History | Button | Download price history to Excel |

## User Actions

- **Add Index Price**: Opens dialog to select index and enter price
- **Edit Price**: Modify existing price for current batch
- **Delete Price**: Remove price entry (soft delete with audit)
- **View History**: Opens dialog showing historical prices for index
- **Upload Prices File**: Bulk import prices from Excel/CSV
- **View Outstanding**: Filter to show only missing prices
- **Search/Filter**: Find specific indexes or filter by status
- **Export**: Download current prices or history

## Form Validation

- **Index**: Required, from indexes table
- **Price**: Required, must be positive numeric value
- **Last Changed User**: Auto-populated, required

## Outstanding Prices View

Filters table to show only indexes missing prices for current batch:
- Index Code
- Index Name
- Bloomberg Ticker
- Status: Missing
- Quick "Add" button to enter price

## Navigation

- **From:** Start Page, Data Confirmation → Fix Index Prices, or Top Nav → Maintenance → Index Prices
- **To:** History view (modal)

## State-Based Access

| Workflow State | Add | Edit | Delete | View |
|----------------|-----|------|--------|------|
| Data Preparation | Yes | Yes | Yes | Yes |
| First Approval | No | No | No | Yes |
| Second Approval | No | No | No | Yes |
| Final Approval | No | No | No | Yes |
| Complete | No | No | No | Yes |

## API Endpoints Used

- GET `/index-prices` - Get all index prices for current batch
- POST `/index-prices` - Create new index price
- GET `/index-prices/{Id}` - Get index price by ID
- PUT `/index-prices/{Id}` - Update index price
- DELETE `/index-prices/{Id}?LastChangedUser={user}` - Delete index price
- GET `/index-prices-history/{Id}` - Get price history for index
- GET `/configurations` - Get list of indexes
