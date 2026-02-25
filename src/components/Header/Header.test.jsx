import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from './Header';

// Mock the ContactModal component
jest.mock('components/ContactModal/ContactModal', () => () => null);

describe('Header', () => {
  test('calls onSearch with typed value after submit', () => {
    const onSearch = jest.fn();

    render(<Header onSearch={onSearch} />);

    const input = screen.getByPlaceholderText(/search images and photos/i);
    const searchButton = screen.getByRole('button', { name: /search/i });

    userEvent.type(input, 'galaxy');
    userEvent.click(searchButton);

    expect(onSearch).toHaveBeenCalledTimes(1);
    expect(onSearch).toHaveBeenCalledWith('galaxy');
    expect(input.value).toBe('');
  });
});
