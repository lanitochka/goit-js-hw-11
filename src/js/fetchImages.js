const axios = require('axios');
console.log(axios);


// function fetchImages(searchImages, page) {

//   return fetch(`https://pixabay.com/api/?key=24534865-deb5e6f7b51fda870340cabeb&q=${searchImages}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`)
//     .then(response => response.json())   
//     .catch(error => console.log(error));
// }

// export default fetchImages;


async function fetchImages(searchImages, page) {
  try {
    const response = await axios.get(`https://pixabay.com/api/?key=24534865-deb5e6f7b51fda870340cabeb&q=${searchImages}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`);
      return response.data;
  } catch (error) {
    return error;
  }
}


export default fetchImages;