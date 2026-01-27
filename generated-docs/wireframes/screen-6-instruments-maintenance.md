# Screen: Instruments Maintenance

## Purpose

Create, update, and manage instrument master data with full audit trail support. Instruments are financial securities (bonds, equities, etc.) with detailed classification and characteristics.

## Wireframe

```
+-------------------------------------------------------------------------+
|  InvestInsight                           [User Profile v]   [Logout]   |
+-------------------------------------------------------------------------+
|  Home | File Import | Data Check | Maintenance | Approvals | Logs      |
+-------------------------------------------------------------------------+
|                                                                         |
|  Instruments Maintenance                 Report Batch: March 2024      |
|                                                                         |
|  [Add New Instrument]  [Export ISINs ↓]  [View Full Audit Trail]      |
|                                                                         |
|  Search/Filter:                                                         |
|  [ISIN/Code...        ] [Type: All v] [Status: All v]  [Search 🔍]    |
|                                                                         |
|  +------------------------------------------------------------------+   |
|  | ISIN         | Code    | Name           | Type  | Curr | Status |  |
|  |--------------|---------|----------------|-------|------|--------|  |
|  | ZAE000123456 | ABC123  | Bond XYZ Ltd   | Bond  | ZAR  | Active |  |
|  |              |         | Mat: 2028-12-31        | [Edit] [Del] |  |
|  |              |         |                        | [History]    |  |
|  |--------------|---------|----------------|-------|------|--------|  |
|  | ZAE000234567 | DEF456  | Equity ABC SA  | Equity| ZAR  | Active |  |
|  |              |         |                        | [Edit] [Del] |  |
|  |              |         |                        | [History]    |  |
|  |--------------|---------|----------------|-------|------|--------|  |
|  | ZAE000345678 | GHI789  | Bond 123 Corp  | Bond  | USD  | New    |  |
|  |              |         | Mat: 2030-06-30        | [Edit] [Del] |  |
|  |              |         |                        | [History]    |  |
|  |--------------|---------|----------------|-------|------|--------|  |
|  | US0378331005 | AAPL    | Apple Inc      | Equity| USD  | Active |  |
|  |              |         |                        | [Edit] [Del] |  |
|  |              |         |                        | [History]    |  |
|  +------------------------------------------------------------------+   |
|                                                                         |
|  Showing 1-4 of 247 instruments              [< Prev] [Next >]         |
|                                                                         |
+-------------------------------------------------------------------------+

EDIT INSTRUMENT DIALOG:
+-----------------------------------------------------------------------+
|  Edit Instrument: ZAE000123456                                  [X]   |
+-----------------------------------------------------------------------+
|                                                                       |
|  ┌─────────────────────────────────────────────────────────────────┐ |
|  │ [Basic Info] | [Classification] | [Financial Details]         │ |
|  └─────────────────────────────────────────────────────────────────┘ |
|                                                                       |
|  Basic Information                                                    |
|  +----------------------------------------------------------------+   |
|  | ISIN:              [ZAE000123456                           ]   |   |
|  | Instrument Code:   [ABC123                                 ]   |   |
|  | Name:              [Bond XYZ Ltd                           ]   |   |
|  | Short Name:        [XYZ Bond                               ]   |   |
|  | Description:       [XYZ Ltd Senior Unsecured Bond 2028     ]   |   |
|  | Bloomberg Ticker:  [XYZB28 Corp                            ]   |   |
|  | CUSIP:             [                                       ]   |   |
|  | SEDOL:             [                                       ]   |   |
|  | Security Type:     [Bond                                v  ]   |   |
|  | Security SubType:  [Corporate Bond                      v  ]   |   |
|  +----------------------------------------------------------------+   |
|                                                                       |
|  Classification                                                       |
|  +----------------------------------------------------------------+   |
|  | Country:           [South Africa                        v  ]   |   |
|  | Currency:          [ZAR                                 v  ]   |   |
|  | CIC Country Code:  [ZA                                     ]   |   |
|  | Asset Class Tree:  [Fixed Income > Corporate > IG       v  ]   |   |
|  | CIC Tree:          [1 > 12 > 121                        v  ]   |   |
|  | ICB Tree:          [                                    v  ]   |   |
|  | GICS Tree:         [                                    v  ]   |   |
|  +----------------------------------------------------------------+   |
|                                                                       |
|  Financial Details                                                    |
|  +----------------------------------------------------------------+   |
|  | Issue Date:        [2018-12-15                             ]   |   |
|  | Maturity Date:     [2028-12-31                             ]   |   |
|  | Coupon Type:       [Fixed                               v  ]   |   |
|  | Coupon:            [8.75                                   ] % |   |
|  | Coupon Frequency:  [Semi-Annual                         v  ]   |   |
|  | Amount Issued:     [1000000000                             ]   |   |
|  | Issue Price:       [100.00                                 ]   |   |
|  | Redemption Value:  [100.00                                 ]   |   |
|  | Issuer Name:       [XYZ Ltd                                ]   |   |
|  | Issuer Code:       [XYZ001                                 ]   |   |
|  +----------------------------------------------------------------+   |
|                                                                       |
|  Last Changed By: [J. Smith                       v]                  |
|                                                                       |
|  [Save Changes]  [Cancel]                                            |
|                                                                       |
+-----------------------------------------------------------------------+
```

## Elements

| Element | Type | Description |
|---------|------|-------------|
| Add New Instrument | Button | Opens dialog to create new instrument |
| Export ISINs | Button | Export incomplete ISINs to Excel |
| View Full Audit Trail | Button | View all instrument audit history |
| Search/Filter | Filter Bar | Search by ISIN/Code, filter by type/status |
| Edit | Button | Opens edit dialog for instrument |
| Delete | Button | Soft delete instrument (with audit) |
| History | Button | View audit trail for specific instrument |
| Save Changes | Button | Submit instrument updates |
| Cancel | Button | Close dialog without saving |

## User Actions

- **Add New Instrument**: Opens dialog with empty form to create instrument
- **Edit Instrument**: Opens pre-populated dialog to modify existing instrument
- **Delete Instrument**: Soft deletes instrument (requires confirmation)
- **View History**: Opens audit trail showing all changes to instrument
- **Export ISINs**: Downloads list of incomplete instruments to Excel
- **Search/Filter**: Filter instruments by ISIN, code, type, or status
- **Save Changes**: Validates and saves instrument data

## Form Validation

- **ISIN**: Required, valid ISIN format
- **Instrument Code**: Required, unique
- **Name**: Required
- **Security Type**: Required, from predefined list
- **Country**: Required, from countries table
- **Currency**: Required, from currencies table
- **Maturity Date**: Required for bonds, must be after Issue Date
- **Asset Class Tree**: Required, from classification hierarchy
- **Last Changed User**: Auto-populated, required

## Navigation

- **From:** Start Page → Quick Actions → Instruments, Data Confirmation → Fix Instruments, or Top Nav → Maintenance → Instruments
- **To:** Audit Trail view (History button)

## State-Based Access

| Workflow State | Add | Edit | Delete | View |
|----------------|-----|------|--------|------|
| Data Preparation | Yes | Yes | Yes | Yes |
| First Approval | No | No | No | Yes |
| Second Approval | No | No | No | Yes |
| Final Approval | No | No | No | Yes |
| Complete | No | No | No | Yes |

## API Endpoints Used

- GET `/instruments` - Get all instruments
- POST `/instruments` - Create new instrument
- GET `/instruments/{Id}` - Get instrument by ID
- PUT `/instruments/{Id}` - Update instrument
- DELETE `/instruments/{Id}` - Delete instrument
- GET `/instruments-audit-trail/{InstrumentId}` - Get instrument audit trail
- GET `/instruments-full-audit-trail` - Get full instruments audit trail
- GET `/instruments-assetclassid?CicCountryCode={code}&CurrencyCode={code}&MaturityDate={date}&SecuritySubType={type}...` - Get AssetClassTreeId
- GET `/isin/export` - Export incomplete ISINs to Excel
- GET `/configurations` - Get classification trees and reference data
