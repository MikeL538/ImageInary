import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoadMoreButton from './LoadMoreButton';

describe('LoadMoreButton', () => {
  test('calls onLoadMore when clicked', () => {
    const onLoadMore = jest.fn();

    render(<LoadMoreButton onLoadMore={onLoadMore} />);

    const button = screen.getByRole('button', { name: /load more images/i });
    userEvent.click(button);

    expect(onLoadMore).toHaveBeenCalledTimes(1);
  });
});
