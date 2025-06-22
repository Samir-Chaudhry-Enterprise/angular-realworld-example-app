import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('App', () => {
  it('renders home page placeholder', () => {
    render(<App />);
    expect(screen.getByText('Home Page - Coming Soon')).toBeInTheDocument();
  });
});
