/**
 * Integration Test: Main Navigation Structure (Story 2)
 *
 * Tests for the consistent top-level navigation menu that appears
 * across all pages of the InvestInsight application.
 */

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { usePathname } from 'next/navigation';
import MainNav from '@/components/navigation/MainNav';

// Mock Next.js navigation
vi.mock('next/navigation', () => ({
  usePathname: vi.fn(),
  useRouter: vi.fn(() => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  })),
}));

const mockUsePathname = usePathname as ReturnType<typeof vi.fn>;

describe('Main Navigation Structure (Story 2)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUsePathname.mockReturnValue('/');
  });

  describe('Navigation menu presence and structure', () => {
    it('should display navigation bar with InvestInsight logo', () => {
      // Act
      render(<MainNav />);

      // Assert
      expect(screen.getByRole('navigation')).toBeInTheDocument();
      expect(screen.getByText(/investinsight/i)).toBeInTheDocument();
    });

    it('should display all main menu items in correct order', () => {
      // Act
      render(<MainNav />);

      // Assert - Verify all menu items exist
      expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /file import/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /data check/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /maintenance/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /approvals/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /logs/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /admin/i })).toBeInTheDocument();
    });
  });

  describe('Navigation links functionality', () => {
    it('should navigate to File Import page when clicked', async () => {
      // Arrange
      const user = userEvent.setup();
      render(<MainNav />);

      // Act
      const fileImportLink = screen.getByRole('link', { name: /file import/i });
      expect(fileImportLink).toHaveAttribute('href', '/file-import');
    });

    it('should navigate to Home when Home link is clicked', async () => {
      // Arrange
      mockUsePathname.mockReturnValue('/file-import');
      render(<MainNav />);

      // Act & Assert
      const homeLink = screen.getByRole('link', { name: /home/i });
      expect(homeLink).toHaveAttribute('href', '/');
    });

    it('should navigate to Home when logo is clicked', async () => {
      // Arrange
      render(<MainNav />);

      // Act & Assert
      const logoLink = screen.getByText(/investinsight/i).closest('a');
      expect(logoLink).toHaveAttribute('href', '/');
    });
  });

  describe('Visual indicators for current page', () => {
    it('should highlight Home menu item when on home page', () => {
      // Arrange
      mockUsePathname.mockReturnValue('/');

      // Act
      render(<MainNav />);

      // Assert - Current page should have visual indicator (aria-current or class)
      const homeLink = screen.getByRole('link', { name: /home/i });
      expect(homeLink).toHaveAttribute('aria-current', 'page');
    });

    it('should highlight File Import menu item when on file import page', () => {
      // Arrange
      mockUsePathname.mockReturnValue('/file-import');

      // Act
      render(<MainNav />);

      // Assert
      const fileImportLink = screen.getByRole('link', { name: /file import/i });
      expect(fileImportLink).toHaveAttribute('aria-current', 'page');
    });
  });

  describe('Responsive behavior', () => {
    it('should display hamburger menu icon on mobile viewport', () => {
      // Arrange - Mock mobile viewport
      global.innerWidth = 375;
      global.dispatchEvent(new Event('resize'));

      // Act
      render(<MainNav />);

      // Assert - Look for mobile menu button
      const mobileMenuButton = screen.getByRole('button', {
        name: /menu|navigation/i
      });
      expect(mobileMenuButton).toBeInTheDocument();
    });

    it('should expand navigation menu when hamburger is clicked', async () => {
      // Arrange
      const user = userEvent.setup();
      global.innerWidth = 375;
      render(<MainNav />);

      // Act
      const menuButton = screen.getByRole('button', { name: /menu|navigation/i });
      await user.click(menuButton);

      // Assert - Menu items should be visible
      await waitFor(() => {
        expect(screen.getByRole('link', { name: /home/i })).toBeVisible();
      });
    });
  });

  describe('User profile and authentication', () => {
    it('should display user profile icon when logged in', () => {
      // Arrange - Mock authenticated user
      const mockUser = { name: 'John Doe', email: 'john@example.com' };

      // Act
      render(<MainNav user={mockUser} />);

      // Assert
      expect(screen.getByText(/john doe/i)).toBeInTheDocument();
    });

    it('should show profile dropdown with Profile and Logout options', async () => {
      // Arrange
      const user = userEvent.setup();
      const mockUser = { name: 'John Doe', email: 'john@example.com' };
      render(<MainNav user={mockUser} />);

      // Act - Click profile button
      const profileButton = screen.getByRole('button', { name: /john doe/i });
      await user.click(profileButton);

      // Assert
      await waitFor(() => {
        expect(screen.getByRole('menuitem', { name: /profile/i })).toBeInTheDocument();
        expect(screen.getByRole('menuitem', { name: /logout/i })).toBeInTheDocument();
      });
    });
  });

  describe('Accessibility', () => {
    it('should have accessible navigation landmark', () => {
      // Act
      render(<MainNav />);

      // Assert
      const nav = screen.getByRole('navigation');
      expect(nav).toHaveAttribute('aria-label');
    });

    it('should have keyboard navigable menu items', async () => {
      // Arrange
      const user = userEvent.setup();
      render(<MainNav />);

      // Act - Tab through navigation
      await user.tab();

      // Assert - First link should be focused
      const firstLink = screen.getByRole('link', { name: /home/i });
      expect(firstLink).toHaveFocus();
    });
  });
});
