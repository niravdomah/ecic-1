/**
 * Integration Test: Home Page Setup (Story 1)
 *
 * Tests for the InvestInsight home page replacement,
 * verifying that template content is removed and replaced with
 * the InvestInsight Start Page dashboard.
 */

import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Home from '@/app/page';

describe('Home Page Setup (Story 1)', () => {
  describe('InvestInsight Start Page loads', () => {
    it('should render the InvestInsight Start Page when visiting root URL', () => {
      // Act
      render(<Home />);

      // Assert - Look for InvestInsight branding/header
      expect(
        screen.getByRole('heading', { name: /investinsight/i, level: 1 })
      ).toBeInTheDocument();
    });

    it('should NOT display template README.md content', () => {
      // Act
      render(<Home />);

      // Assert - Verify template-specific content is gone
      expect(screen.queryByText(/getting started/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/this is a template/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/README/i)).not.toBeInTheDocument();
    });

    it('should display Start Page dashboard structure', () => {
      // Act
      render(<Home />);

      // Assert - Verify main sections exist
      expect(screen.getByText(/current report batch/i)).toBeInTheDocument();
      expect(screen.getByText(/quick actions/i)).toBeInTheDocument();
    });
  });

  describe('Navigation accessibility', () => {
    it('should provide access to main application features', () => {
      // Act
      render(<Home />);

      // Assert - Look for navigation or quick action links
      // These will be implemented in Story 2 and Story 3
      const mainContent = screen.getByRole('main');
      expect(mainContent).toBeInTheDocument();
    });
  });
});
