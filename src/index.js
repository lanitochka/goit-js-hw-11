import './css/styles.css';

import Notiflix from 'notiflix';
import fetchImages from './js/fetchImages';
import LoadMoreBtn from './js/load-more-btn';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';


const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
  captionPosition: 'bottom'
});


const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});


const searchForm = document.querySelector('.search-form');
const galleryContainer = document.querySelector('.gallery');

searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', onLoadMore);


let page = 1;
let searchImages = ''



function onSearch(e) {
  e.preventDefault();
  page = 1;
  clearGalleryContainer();


  searchImages = e.currentTarget.elements.searchQuery.value.trim();
//   console.log('searchImages', searchImages);

  if (searchImages === '') {
    Notiflix.Notify.failure("Please enter something.");
    loadMoreBtn.hide();
    return;
  }

  loadMoreBtn.show();
  loadMoreBtn.disable();

  fetchImages(searchImages, page)
    .then(foundImages => {

    //   console.log('foundImages.hits', foundImages.hits);
    //   console.log('foundImages', foundImages);


      if (foundImages.hits.length === 0) {
        Notiflix.Notify.warning("Sorry, there are no images matching your search query. Please try again.");
        loadMoreBtn.hide();
        return;
      }

      if (foundImages.hits.length > 0) {
        Notiflix.Notify.success(`Hooray! We found ${foundImages.totalHits} images.`)
      }


      if (foundImages.totalHits < 40) {
        Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
        renderImageCard(foundImages);
        lightbox.refresh();
        loadMoreBtn.hide();

        return;
      }

      renderImageCard(foundImages);
      lightbox.refresh();
      scrollGallery();
      loadMoreBtn.enable();

    });

}


function onLoadMore() {

  loadMoreBtn.disable();

  page += 1;
  fetchImages(searchImages, page)

    .then(images => {
      renderImageCard(images)
    //   console.log('images:', images);

      loadMoreBtn.enable();

      lightbox.refresh();
      scrollGallery();

      if (images.hits.length < 40) {
        Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
        loadMoreBtn.hide();
        return;
      }

    })

}


function clearGalleryContainer() {
  galleryContainer.innerHTML = '';
}


function renderImageCard(images) {

  const card = images.hits.map(image => {

    return `<div class="photo-card">
     <a class="gallery__item" href="${image.largeImageURL}"><img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" /></a>
        <div class="info">
            <p class="info-item">
                <b>Likes:</b>
                ${image.likes}
            </p>
            <p class="info-item">
                <b>Views:</b>
                ${image.views}
            </p>
            <p class="info-item">
                <b>Comments:</b>
                ${image.comments}
            </p>
            <p class="info-item">
                <b>Downloads:</b>
                ${image.downloads}
            </p>
        </div>
        </div>`

  }).join('');

  galleryContainer.insertAdjacentHTML('beforeend', card);

}


function scrollGallery() {
  const {
    height: cardHeight
  } = document
    .querySelector(".gallery")
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 3,
    behavior: "smooth",
  });
}