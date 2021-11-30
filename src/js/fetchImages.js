
function fetchImages(searchImages, page) {

  return fetch(`https://pixabay.com/api/?key=24534865-deb5e6f7b51fda870340cabeb&q=${searchImages}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`)
    .then(response => response.json())
    // .then(data => { page += 1 })        
    .catch(error => console.log(error));
}

export default fetchImages;