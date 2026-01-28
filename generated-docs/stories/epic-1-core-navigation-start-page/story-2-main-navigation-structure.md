# Story: Main Navigation Structure

**Epic:** Core Navigation & Start Page
**Story:** 2 of 5
**Wireframe:** `../../wireframes/screen-1-start-page.md`

## User Story

**As a** user of the InvestInsight application
**I want** a consistent top-level navigation menu across all pages
**So that** I can easily access all major functional areas from anywhere in the application

## Acceptance Criteria

### Happy Path
- [ ] Given I am on any page in the application, when I look at the top of the page, then I see a navigation bar with the InvestInsight logo and main menu items
- [ ] Given I view the navigation menu, when I look at the menu items, then I see: Home, File Import, Data Check, Maintenance, Approvals, Logs, Admin
- [ ] Given I am on the Home page, when I click "File Import" in the navigation, then I am taken to the File Import page
- [ ] Given I am on any page, when I click "Home" in the navigation, then I am taken to the Start Page dashboard
- [ ] Given I am on any page, when I click the InvestInsight logo, then I am taken to the Start Page dashboard

### Visual Indicators
- [ ] Given I am on a specific page (e.g., Home), when I view the navigation menu, then the current page's menu item is visually highlighted
- [ ] Given I hover over a navigation menu item, when I move my mouse over it, then it shows a hover state

### Responsive Behavior
- [ ] Given I am on a mobile device, when I view the navigation, then I see a hamburger menu icon
- [ ] Given I am on a mobile device, when I click the hamburger menu, then the navigation menu expands to show all items

### User Profile & Authentication
- [ ] Given I am logged in, when I view the navigation bar, then I see my user profile icon and username in the top right
- [ ] Given I click my user profile, when the dropdown opens, then I see options for "Profile" and "Logout"

## API Endpoints (from OpenAPI spec)

This story focuses on navigation structure and does not directly call API endpoints. Future stories will handle authentication state and user profile data.

## Implementation Notes

- Create a shared navigation component in `web/src/components/navigation/` (e.g., `MainNav.tsx`)
- Use Shadcn UI components: Button, NavigationMenu, DropdownMenu, Avatar
- Include the navigation in the root layout (`web/src/app/layout.tsx`)
- Use Next.js App Router's Link component for client-side navigation
- Navigation items to implement:
  - **Home**: `/` (Start Page)
  - **File Import**: `/file-import` (placeholder route for now)
  - **Data Check**: `/data-confirmation` (placeholder route for now)
  - **Maintenance**: `/maintenance` (placeholder route for now - will have submenu)
  - **Approvals**: `/approvals` (placeholder route for now)
  - **Logs**: `/logs` (placeholder route for now)
  - **Admin**: `/admin` (placeholder route for now)
- For this story, create placeholder routes that display "Coming soon" messages
- Future stories will implement the actual page content for each section
- Use Tailwind CSS for responsive behavior (hide full menu on mobile, show hamburger)
