# Story: Home Page Setup

**Epic:** Core Navigation & Start Page
**Story:** 1 of 5
**Wireframe:** `../../wireframes/screen-1-start-page.md`

## User Story

**As a** user visiting the InvestInsight application
**I want** to see a relevant home page for portfolio reporting and data stewardship
**So that** I can immediately understand and access the application's functionality

## Acceptance Criteria

### Core Requirements
- [ ] Given I visit the root URL (/), when the page loads, then I see the InvestInsight Start Page dashboard
- [ ] Given the home page loads, when I look at the page, then I do NOT see the template README.md content
- [ ] Given I am on the home page, when I look for navigation, then I can access the main features of the application (File Import, Data Check, Maintenance, Approvals, Logs)

### Cleanup
- [ ] Given I inspect the codebase, when I look at web/src/app/page.tsx, then the template's README-displaying code has been completely removed
- [ ] Given I inspect the codebase, when I look at web/src/app/page.tsx, then it contains InvestInsight Start Page implementation

## API Endpoints (from OpenAPI spec)

This story focuses on UI structure and does not directly call API endpoints. Subsequent stories will implement the data fetching for the Start Page dashboard.

## Implementation Notes

- Remove the entire template home page implementation from `web/src/app/page.tsx`
- Remove the `convertMarkdownToHtml` function (template code)
- Remove the `fs` and `path` imports used for reading README.md
- Implement a new home page that renders the InvestInsight Start Page dashboard
- **This page implements:** Start Page Dashboard - the main entry point for the portfolio reporting system
- Use Shadcn UI components: Card, Button
- The page should be a server component initially (no "use client" directive needed yet)
- Detailed dashboard functionality will be implemented in subsequent stories
