import axios from "axios";

const BASE_URL = 'https://pixabay.com/api/';

async function fetchImages(searchImages, page) {
  try {
    const response = await axios.get(BASE_URL, {
        params: {
          key: '24534865-deb5e6f7b51fda870340cabeb',
          q: searchImages,
          image_type: 'photo',
          orientation: 'horizontal',
          safesearch: true,
          per_page: 40,
          page: page
        }
      });
      return response.data;
  } catch (error) {
    return error;
  }
}

export default fetchImages;