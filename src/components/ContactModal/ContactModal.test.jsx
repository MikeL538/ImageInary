import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ContactModal from './ContactModal';

describe('ContactModal', () => {
  test('calls onClose when Escape is pressed and modal is open', () => {
    const onClose = jest.fn();

    render(<ContactModal isOpen={true} onClose={onClose} />);
    fireEvent.keyDown(window, { key: 'Escape' });

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test('does not call onClose on Escape when modal is closed', () => {
    const onClose = jest.fn();

    render(<ContactModal isOpen={false} onClose={onClose} />);
    fireEvent.keyDown(window, { key: 'Escape' });

    expect(onClose).not.toHaveBeenCalled();
  });

  test('calls onClose when backdrop clicked', () => {
    const onClose = jest.fn();

    const { container } = render(
      <ContactModal isOpen={true} onClose={onClose} />
    );
    const backdrop = container.firstChild;
    const modal = backdrop.firstChild;

    fireEvent.click(modal);
    expect(onClose).not.toHaveBeenCalled();

    fireEvent.click(backdrop);
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
