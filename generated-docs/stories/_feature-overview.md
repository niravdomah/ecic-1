# Feature: InvestInsight Investment Management System

## Summary

InvestInsight is a comprehensive portfolio reporting and data stewardship platform designed to help investment teams prepare accurate weekly and monthly reports from multiple data sources. The system provides robust data governance capabilities including multi-level approvals, comments, and full audit trails for all key changes.

## Epics

1. **Epic 1: Core Navigation & Start Page** - Home page setup, main navigation structure, and start page dashboard
   - Status: Planned
   - Directory: `epic-1-core-navigation-start-page/`
   - Stories: 5

2. **Epic 2: File Upload & Import Management** - Portfolio files matrix, other files list, file upload modal, and SFTP import
   - Status: Planned
   - Directory: `epic-2-file-upload-import/`
   - Stories: 6

3. **Epic 3: Data Confirmation & Validation** - Consolidated data completeness checks with navigation to fix screens
   - Status: Planned
   - Directory: `epic-3-data-confirmation/`
   - Stories: 5

4. **Epic 4: Maintenance Screens - Financial Data** - Instruments, index prices, durations/YTM, betas, and credit ratings maintenance
   - Status: Planned
   - Directory: `epic-4-maintenance-screens/`
   - Stories: 7

5. **Epic 5: Workflow & Approvals** - Three-level approval process with approve/reject actions and rejection handling
   - Status: Planned
   - Directory: `epic-5-workflow-approvals/`
   - Stories: 6

6. **Epic 6: Comments, Logs & Administration** - Report comments, process logs, calculation logs, and system configuration
   - Status: Planned
   - Directory: `epic-6-comments-logs-admin/`
   - Stories: 5

## Total Stories

**34 stories** across 6 epics

## API Specifications

- **MonthlyAPIDefinition.yaml** - Monthly process workflow and approvals
- **FileImporterAPIDefinition.yaml** - File upload and import management
- **DataMaintenanceAPIDefinition.yaml** - Reference data and maintenance screens

## Wireframes

15 wireframes covering all major screens:
- Start Page / Dashboard
- Portfolio File Upload
- Other File Upload
- File Upload Modal
- Data Confirmation
- Instruments Maintenance
- Index Prices Maintenance
- Durations & YTM Maintenance
- Instrument Betas Maintenance
- Credit Ratings Maintenance
- Report Comments
- Approval Workflow (L1/L2/L3)
- Process Logs
- System Configuration

## Key Features

- **Data Intake & File Management**: Upload portfolio and reference data via SFTP or manual upload with validation
- **Data Confirmation & Validation**: Consolidated view of data completeness with guided navigation to fix screens
- **Maintenance Screens**: CRUD operations for instruments, index prices, durations, betas, and credit ratings with full audit trails
- **Multi-Level Approvals**: Three-level sequential approval workflow with rejection handling that returns to Data Preparation
- **Audit & Compliance**: Complete audit trails for all data changes, process logs, and calculation logs
- **System Configuration**: Manage reference data (countries, currencies, portfolios, benchmarks, etc.)

## User Roles

| Role | Responsibilities |
|------|------------------|
| Investment Operations | Drives weekly cashflow reconciliation and report preparation |
| Portfolio Managers/Analysts | Reviews data, adds comments, and initiates corrections |
| Approvers (L1 → L3) | Verify packs and sign off before publishing |
| Administrators | Manages users, roles, and page access |

## Workflow Phases

1. **Data Preparation** - Full access to upload files, maintain data, and make corrections
2. **First Approval (L1)** - Initial review of data completeness and key checks (read-only)
3. **Second Approval (L2)** - Portfolio-level confirmation and risk checks (read-only)
4. **Final Approval (L3)** - Final sign-off with mandatory rejection reason (read-only)
5. **Complete** - Batch finalized and reports published (read-only)

Rejection at any approval level returns the workflow to Data Preparation phase.
