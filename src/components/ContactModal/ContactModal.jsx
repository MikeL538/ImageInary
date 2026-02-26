import { useEffect } from 'react';
import css from './ContactModal.module.scss';

export default function ContactModal({ isOpen, onClose }) {
  useEffect(() => {
    // Is it open?
    if (!isOpen) return;
    document.querySelector('body').style.overflow = 'hidden';

    // Close on escape
    const handleKeyDown = e => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.querySelector('body').style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  return (
    <div
      data-testid="contact-modal-backdrop"
      className={`${css.modal__backdrop} ${!isOpen ? css.hidden : ''} `}
      // Close on click
      onClick={e => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div data-testid="contact-modal-content" className={css.modal}>
        <ul className={css.modal__list}>
          <li className={css.modal__list__item}>
            <a
              className=""
              href="https://github.com/MikeL538"
              target="_blank"
              rel="noreferrer"
            >
              <svg className="">
                <use href={`${process.env.PUBLIC_URL}/icons.svg#github`}></use>
              </svg>
              Github: https://github.com/MikeL538
            </a>
          </li>
          <li className={css.modal__list__item}>
            <a
              className=""
              href="https://www.linkedin.com/in/michal-lipiak/"
              target="_blank"
              rel="noreferrer"
            >
              <svg className="">
                <use
                  href={`${process.env.PUBLIC_URL}/icons.svg#linkedin`}
                ></use>
              </svg>
              Linkedin: https://www.linkedin.com/in/michal-lipiak/
            </a>
          </li>
          <li className={css.modal__list__item}>
            <a
              className=""
              href="mailto: mikel538.work@gmail.com"
              target="_blank"
              rel="noreferrer"
            >
              <svg className="">
                <use
                  href={`${process.env.PUBLIC_URL}/icons.svg#envelope`}
                ></use>
              </svg>
              E-mail: mikel538.work@gmail.com
            </a>
          </li>
          <li className={css.modal__list__item}>
            <a
              className=""
              href="tel: +48601598455"
              target="_blank"
              rel="noreferrer"
            >
              <svg className="">
                <use
                  href={`${process.env.PUBLIC_URL}/icons.svg#smartphone`}
                ></use>
              </svg>
              Tel: (+48) 601 598 455
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
