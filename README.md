# ImageInary

ImageInary is a React image search app that uses the Pixabay REST API. It lets
users search for photos, browse results with infinite scroll, and preview images
in a modal.

## Live Demo

https://mikel538.github.io/ImageInary/

## Features

- Search images by keyword
- Infinite scroll loading
- Fallback `Load more` button when the page is not scrollable
- Image preview modal (click image to open)
- Loading state and basic error handling
- "No more images" / "No images found" messages
- Data fetching with Axios from Pixabay API

## Tech Stack

- HTML
- SCSS Modules
- JavaScript
- React
- Axios
- REST API (Pixabay)
- Create React App (`react-scripts`)

## Screenshots

### Main View

![ImageInary main view](public/ImageInaryMain.webp)

### Modal Preview

![ImageInary modal preview](public/ImageInaryModal.webp)

## Getting Started

### Installation

```bash
npm install
```

### Run locally

```bash
npm start
```

### Production build

```bash
npm run build
```

## Testing

Run tests:

```bash
npm test
```

Run tests once (without watch mode):

```bash
npm test -- --watchAll=false
```

### Current tested areas (learning progress)

- `Header` form submit calls `onSearch` with typed value
- `LoadMoreButton` click calls `onLoadMore`
- `Modal` closes on `Escape` and overlay click
- `ContactModal` closes on `Escape` (when open) and backdrop click
- `ImageGalleryContent` conditional UI states:
  - loading spinner
  - `No images found`
  - `No more images`
  - fallback `Load more` button click
  - modal opens after image click
- `ImageGallery` async behavior:
  - fetch is called on mount with `searchTerm` and page `1`
  - fetch is called again after `searchTerm` change
  - error message is rendered when API request fails

### Notes about tests

- This project includes basic component tests written with React Testing Library
  and Jest.
- Tests focus on UI behavior and component interactions (learning/portfolio
  scope), not full end-to-end coverage.

## API

This project uses the [Pixabay API](https://pixabay.com/api/docs/) (REST API)
and Axios for HTTP requests.

## Notes

- This is a portfolio / learning project focused on React fundamentals, API
  integration, and basic component testing.
- Infinite scroll was improved with additional guards and a fallback button for
  large viewports / edge cases.
