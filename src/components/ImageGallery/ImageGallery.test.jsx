import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ImageGallery from './ImageGallery';
import fetchPixabayImages from 'api/pixabay';

jest.mock('api/pixabay', () =>
  jest.fn().mockResolvedValue({
    hits: [],
    totalHits: 0,
  })
);

describe('ImageGallery', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // =====
  test('is fetchPixabayImages working', async () => {
    render(<ImageGallery searchTerm={'galaxy'} />);
    await waitFor(() =>
      expect(fetchPixabayImages).toHaveBeenCalledWith('galaxy', 1)
    );
  });
  // =====
  test('calls fetchPixabayImages with search and mount', async () => {
    const { rerender } = render(<ImageGallery searchTerm={'galaxy'} />);

    await waitFor(() =>
      expect(fetchPixabayImages).toHaveBeenCalledWith('galaxy', 1)
    );

    rerender(<ImageGallery searchTerm={'cats'} />);

    await waitFor(() =>
      expect(fetchPixabayImages).toHaveBeenCalledWith('cats', 1)
    );
  });

  // =====
  test('renders error when fetching fails', async () => {
    fetchPixabayImages.mockRejectedValueOnce(new Error('API failed'));

    render(<ImageGallery searchTerm={'galaxy'} />);

    expect(await screen.findByText('API failed')).toBeInTheDocument();
  });
});
