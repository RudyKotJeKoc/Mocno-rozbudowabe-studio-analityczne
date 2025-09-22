import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import NotFoundPage from './NotFound';

describe('NotFoundPage', () => {
  it('should render the not found page with a heading', () => {
    render(<NotFoundPage />);
    const heading = screen.getByRole('heading', { name: /page not found/i });
    expect(heading).toBeInTheDocument();
  });
});
