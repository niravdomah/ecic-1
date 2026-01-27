# Screen: System Configuration

## Purpose

Manage all reference data and configuration settings used across the system. All reference data screens support full CRUD operations with audit trails.

## Wireframe

```
+-------------------------------------------------------------------------+
|  InvestInsight                           [User Profile v]   [Logout]   |
+-------------------------------------------------------------------------+
|  Home | File Import | Data Check | Maintenance | Approvals | Logs      |
+-------------------------------------------------------------------------+
|                                                                         |
|  System Configuration                                                   |
|                                                                         |
|  ┌─────────────────────────────────────────────────────────────────┐   |
|  │ Configuration Categories:                                       │   |
|  │                                                                 │   |
|  │ [Geographic Data] | [Financial Data] | [Portfolio Setup] |     │   |
|  │ [File Settings]   | [Workflow Config]                          │   |
|  └─────────────────────────────────────────────────────────────────┘   |
|                                                                         |
|  Geographic Data                                                        |
|                                                                         |
|  +------------------------------------------------------------------+   |
|  | Entity Type            | Records | Last Updated  | Actions       |  |
|  |------------------------|---------|---------------|---------------|  |
|  | Countries              | 195     | 2024-02-15    | [Manage →]    |  |
|  | Currencies             | 78      | 2024-02-15    | [Manage →]    |  |
|  | Regional Exposures     | 12      | 2024-01-20    | [Manage →]    |  |
|  +------------------------------------------------------------------+   |
|                                                                         |
|  Financial Data                                                         |
|                                                                         |
|  +------------------------------------------------------------------+   |
|  | Entity Type            | Records | Last Updated  | Actions       |  |
|  |------------------------|---------|---------------|---------------|  |
|  | Indexes                | 45      | 2024-03-10    | [Manage →]    |  |
|  | Benchmarks             | 23      | 2024-03-10    | [Manage →]    |  |
|  | Credit Rating Scales   | 8       | 2023-12-01    | [Manage →]    |  |
|  | Asset Managers         | 18      | 2024-02-28    | [Manage →]    |  |
|  +------------------------------------------------------------------+   |
|                                                                         |
|  Portfolio Setup                                                        |
|                                                                         |
|  +------------------------------------------------------------------+   |
|  | Entity Type            | Records | Last Updated  | Actions       |  |
|  |------------------------|---------|---------------|---------------|  |
|  | Portfolios             | 12      | 2024-03-01    | [Manage →]    |  |
|  | Tranches               | 8       | 2024-01-15    | [Manage →]    |  |
|  | Management Fee Ranges  | 15      | 2024-01-10    | [Manage →]    |  |
|  +------------------------------------------------------------------+   |
|                                                                         |
|  [View All Configuration Tables →]                                      |
|                                                                         |
+-------------------------------------------------------------------------+

MANAGE COUNTRIES SCREEN (Example):
+-------------------------------------------------------------------------+
|  Countries Management                                                   |
|                                                                         |
|  [Add New Country]  [View Full Audit Trail]  [Export ↓]  [Refresh ↻]  |
|                                                                         |
|  Search/Filter:                                                         |
|  [Country Name...     ] [Region: All v]                  [Search 🔍]   |
|                                                                         |
|  +------------------------------------------------------------------+   |
|  | ISO Code | Name          | Region        | CIC Code | Actions    |  |
|  |----------|---------------|---------------|----------|------------|  |
|  | ZA       | South Africa  | Africa        | ZA       | [Edit]     |  |
|  |          |               |               |          | [Delete]   |  |
|  |          |               |               |          | [History]  |  |
|  |----------|---------------|---------------|----------|------------|  |
|  | US       | United States | North America | US       | [Edit]     |  |
|  |          |               |               |          | [Delete]   |  |
|  |          |               |               |          | [History]  |  |
|  |----------|---------------|---------------|----------|------------|  |
|  | GB       | United Kingdom| Europe        | GB       | [Edit]     |  |
|  |          |               |               |          | [Delete]   |  |
|  |          |               |               |          | [History]  |  |
|  |----------|---------------|---------------|----------|------------|  |
|  | JP       | Japan         | Asia          | JP       | [Edit]     |  |
|  |          |               |               |          | [Delete]   |  |
|  |          |               |               |          | [History]  |  |
|  +------------------------------------------------------------------+   |
|                                                                         |
|  Showing 1-4 of 195 countries                [< Prev] [Next >]         |
|                                                                         |
+-------------------------------------------------------------------------+

ADD/EDIT COUNTRY DIALOG:
+-----------------------------------------------------------------------+
|  Add Country                                                    [X]   |
+-----------------------------------------------------------------------+
|                                                                       |
|  +----------------------------------------------------------------+   |
|  | ISO Code (2-char): [ZA                                       ] |   |
|  |                                                                |   |
|  | Country Name:      [South Africa                             ] |   |
|  |                                                                |   |
|  | Region:            [Africa                                 v] |   |
|  |                                                                |   |
|  | CIC Country Code:  [ZA                                       ] |   |
|  |                                                                |   |
|  | Last Changed By:   [J. Smith                               v] |   |
|  +----------------------------------------------------------------+   |
|                                                                       |
|  [Save Country]  [Cancel]                                             |
|                                                                       |
+-----------------------------------------------------------------------+

MANAGE PORTFOLIOS SCREEN (Example):
+-------------------------------------------------------------------------+
|  Portfolios Management                                                  |
|                                                                         |
|  [Add New Portfolio]  [View Full Audit Trail]  [Export ↓] [Refresh ↻] |
|                                                                         |
|  Search/Filter:                                                         |
|  [Portfolio Name...   ] [Asset Manager: All v]           [Search 🔍]   |
|                                                                         |
|  +------------------------------------------------------------------+   |
|  | Code    | Name        | Asset Manager | Benchmark   | Actions   |  |
|  |---------|-------------|---------------|-------------|-----------|  |
|  | PORT_A  | Portfolio A | Sanlam        | ALSI        | [Edit]    |  |
|  |         |             |               |             | [Delete]  |  |
|  |         |             |               |             | [History] |  |
|  |---------|-------------|---------------|-------------|-----------|  |
|  | PORT_B  | Portfolio B | Old Mutual    | SWIX        | [Edit]    |  |
|  |         |             |               |             | [Delete]  |  |
|  |         |             |               |             | [History] |  |
|  |---------|-------------|---------------|-------------|-----------|  |
|  | SANLAM  | Sanlam Fund | Sanlam        | ALBI        | [Edit]    |  |
|  |         |             |               |             | [Delete]  |  |
|  |         |             |               |             | [History] |  |
|  +------------------------------------------------------------------+   |
|                                                                         |
|  Showing 1-3 of 12 portfolios                [< Prev] [Next >]         |
|                                                                         |
+-------------------------------------------------------------------------+

AUDIT TRAIL DIALOG (Example for Countries):
+-----------------------------------------------------------------------+
|  Country Audit Trail: South Africa (ZA)                         [X]   |
+-----------------------------------------------------------------------+
|                                                                       |
|  +----------------------------------------------------------------+   |
|  | Valid From  | Valid To   | Field        | Old Value | New Value |  |
|  |-------------|------------|--------------|-----------|-----------|  |
|  | 2024-02-15  | Current    | CIC Code     | -         | ZA        |  |
|  |             |            | Changed By: J. Smith                  |  |
|  |-------------|------------|--------------|-----------|-----------|  |
|  | 2023-01-10  | 2024-02-14 | Region       | -         | Africa    |  |
|  |             |            | Changed By: M. Brown                  |  |
|  |-------------|------------|--------------|-----------|-----------|  |
|  | 2022-12-01  | 2023-01-09 | Name         | SA        | South     |  |
|  |             |            |              |           | Africa    |  |
|  |             |            | Changed By: A. Johnson                |  |
|  +----------------------------------------------------------------+   |
|                                                                       |
|  [Export History ↓]  [Close]                                          |
|                                                                       |
+-----------------------------------------------------------------------+
```

## Configuration Categories

### Geographic Data
- **Countries**: Country master data with ISO codes and regions
- **Currencies**: Currency codes and descriptions
- **Regional Exposures**: Regional classification mappings

### Financial Data
- **Indexes**: Market index definitions
- **Benchmarks**: Benchmark definitions and compositions
- **Credit Rating Scales**: Rating agency scales and mappings
- **Asset Managers**: Asset management firm master data

### Portfolio Setup
- **Portfolios**: Portfolio master data with benchmarks and managers
- **Tranches**: Portfolio tranche definitions
- **Management Fee Ranges**: Fee rate schedules

### File Settings
- **File Types**: Supported file type definitions
- **File Sources**: File source systems
- **File Formats**: File format specifications
- **File Settings**: File import configuration

### Workflow Configuration
- **Workflow Definitions**: Workflow state machine definitions
- **Transform Types**: Data transformation type definitions
- **Transform Asset Manager Types**: Asset manager-specific transforms
- **Report Lists**: Available report definitions

## Elements

| Element | Type | Description |
|---------|------|-------------|
| Category Tabs | Tabs | Switch between configuration categories |
| Manage | Link Button | Navigate to specific entity management screen |
| Add New [Entity] | Button | Opens dialog to create new record |
| View Full Audit Trail | Button | View complete audit history for entity type |
| Export | Button | Download entity data to Excel |
| Refresh | Button | Reload data from backend |
| Search/Filter | Filter Bar | Search and filter records |
| Edit | Button | Modify existing record |
| Delete | Button | Soft delete record (with audit) |
| History | Button | View audit trail for specific record |

## Common CRUD Pattern

All reference data screens follow this pattern:

1. **List View**: Data table with search/filter
2. **Add/Edit Dialog**: Form for creating or modifying records
3. **Delete Confirmation**: Requires user confirmation
4. **Audit Trail**: Shows complete change history

## Form Validation

Each entity type has specific validation rules:
- **Countries**: ISO code (2-char), Name (required), Region (required)
- **Currencies**: ISO code (3-char), Name (required), Symbol (required)
- **Portfolios**: Code (unique), Name (required), Asset Manager (FK), Benchmark (FK)
- **Indexes**: Code (unique), Name (required), Bloomberg Ticker (unique)

All entities require:
- **Last Changed User**: Auto-populated, required
- **Valid From/To dates**: Managed by audit system

## Navigation

- **From:** Top Nav → Admin → System Configuration
- **To:** Individual entity management screens, Audit trail dialogs

## Access Control

- **Admin Role**: Full CRUD access to all configuration tables
- **Operations Role**: Read-only access
- **Analyst Role**: Read-only access
- **Approver Role**: Read-only access

## API Endpoints Used

### Configuration Overview
- GET `/configurations` - Get all configuration data summary

### Geographic Data
- GET `/countries` - List all countries
- POST `/countries` - Create country
- GET `/countries/{Id}` - Get country by ID
- PUT `/countries/{Id}` - Update country
- DELETE `/countries/{Id}?LastChangedUser={user}` - Delete country

- GET `/currencies` - List all currencies
- POST `/currencies` - Create currency
- GET `/currencies/{Id}` - Get currency by ID
- PUT `/currencies/{Id}` - Update currency
- DELETE `/currencies/{Id}?LastChangedUser={user}` - Delete currency

- GET `/regional-exposures` - List all regional exposures

### Financial Data
- GET `/indexes` - List all indexes
- POST `/indexes` - Create index
- GET `/indexes/{Id}` - Get index by ID
- PUT `/indexes/{Id}` - Update index
- DELETE `/indexes/{Id}` - Delete index
- GET `/index-audit-trail/{Id}` - Get index audit trail
- GET `/index-full-audit-trail` - Get full index audit trail

- GET `/benchmarks` - List all benchmarks
- POST `/benchmarks` - Create benchmark
- GET `/benchmarks/{Id}` - Get benchmark by ID
- PUT `/benchmarks/{Id}` - Update benchmark
- DELETE `/benchmarks/{Id}` - Delete benchmark
- GET `/benchmark-audit-trail/{Id}` - Get benchmark audit trail
- GET `/benchmark-full-audit-trail` - Get full benchmark audit trail

- GET `/credit-rating-scales` - List all credit rating scales
- POST `/credit-rating-scales` - Create scale
- GET `/credit-ratings/{Id}` - Get scale by ID
- PUT `/credit-ratings/{Id}` - Update scale
- DELETE `/credit-ratings/{Id}` - Delete scale

- GET `/asset-managers` - List all asset managers
- POST `/asset-managers` - Create asset manager
- GET `/asset-managers/{Id}` - Get asset manager by ID
- PUT `/asset-managers/{Id}` - Update asset manager
- DELETE `/asset-managers/{Id}?LastChangedUser={user}` - Delete asset manager
- GET `/asset-managers-full-audit-trail` - Get full asset manager audit trail

### Portfolio Setup
- GET `/portfolios` - List all portfolios
- POST `/portfolios` - Create portfolio
- GET `/portfolios/{Id}` - Get portfolio by ID
- PUT `/portfolios/{Id}` - Update portfolio
- DELETE `/portfolios/{Id}?LastChangedUser={user}` - Delete portfolio
- GET `/portfolio-full-audit-trail` - Get full portfolio audit trail

### File Settings & Workflow
- GET `/transforms` - List all transforms
- POST `/transforms` - Create transform
- GET `/transforms/{Id}` - Get transform by ID
- PUT `/transforms/{Id}` - Update transform
