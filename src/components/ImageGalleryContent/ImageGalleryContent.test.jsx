import React from 'react';
import { render, screen } from '@testing-library/react';
import ImageGalleryContent from './ImageGalleryContent';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

const defaultProps = {
  images: [],
  isLoading: false,
  hasMore: true,
  error: null,
  hasScroll: true,
  setPage: jest.fn(),
};

jest.mock('components/Loader/Loader', () => () => <div>Loading spinner</div>);

jest.mock('components/Modal/Modal', () => props => (
  <div>Modal open: {props.imageUrl}</div>
));

describe('ImageGalleryContent', () => {
  // =====
  test('renders "No images found" when no images are found', () => {
    render(<ImageGalleryContent {...defaultProps} hasMore={false} />);

    expect(screen.getByText('No images found')).toBeInTheDocument();
  });
  // =====
  test('renders "No more images" when images exist and hasMore is false', () => {
    render(
      <ImageGalleryContent
        {...defaultProps}
        images={[
          {
            id: 1,
            largeImageURL: 'test.jpg',
            previewURL: 'test.jpg',
            tags: 'test',
            likes: 1,
            views: 2,
            comments: 3,
            downloads: 4,
          },
        ]}
        hasMore={false}
      />
    );

    expect(screen.getByText('No more images')).toBeInTheDocument();
  });
  // =====
  test('renders spinner', () => {
    render(<ImageGalleryContent {...defaultProps} isLoading={true} />);

    expect(screen.getByText('Loading spinner')).toBeInTheDocument();
  });
  // =====
  test('renders LoadMoreButton and calls setPage on click when page is not scrollable', () => {
    const setPage = jest.fn();
    render(
      <ImageGalleryContent
        {...defaultProps}
        setPage={setPage}
        hasScroll={false}
      />
    );

    const button = screen.getByRole('button', { name: /load more images/i });
    userEvent.click(button);

    expect(setPage).toHaveBeenCalledTimes(1);
  });
  // =====
  test('modal is open when image is clicked', () => {
    const item = {
      id: 1,
      largeImageURL: 'testLarge.jpg',
      previewURL: 'test.jpg',
      tags: 'test',
      likes: 1,
      views: 2,
      comments: 3,
      downloads: 4,
    };

    render(<ImageGalleryContent {...defaultProps} images={[item]} />);

    const image = screen.getByAltText('test');
    userEvent.click(image);

    expect(
      screen.getByText(`Modal open: ${item.largeImageURL}`)
    ).toBeInTheDocument();
  });
});
