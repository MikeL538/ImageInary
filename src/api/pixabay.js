import axios from 'axios';

// PUBLIC KEY
const ApiKey = '38531038-07b18ea2bd70e8e8bef0f3931';
const BASE_URL = 'https://pixabay.com/api/';

export default async function fetchPixabayImages(searchTerm, page) {
  // Get data from Pixabay    Using BASE_URL
  const { data } = await axios.get(BASE_URL, {
    // Params for request
    params: {
      q: searchTerm,
      page,
      key: ApiKey,
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: 20, // Amount of images on page/load
    },
  });
  return {
    hits: data.hits, // This is limited by per_page, hits <= per_page
    totalHits: data.totalHits, // Total amount of images from Pixabay
  };
}
