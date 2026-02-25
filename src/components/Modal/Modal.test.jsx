import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import Modal from './Modal';

describe('Modal', () => {
  test('calls on Escape key press', () => {
    const onClose = jest.fn();

    render(<Modal imageUrl="test.jpg" onClose={onClose} />);

    fireEvent.keyDown(window, { key: 'Escape' });

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test('calls onClose on overlay click', () => {
    const onClose = jest.fn();

    const { container } = render(
      <Modal imageUrl="test.jpg" onClose={onClose} />
    );

    const overlay = container.firstChild;

    fireEvent.click(overlay);

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
