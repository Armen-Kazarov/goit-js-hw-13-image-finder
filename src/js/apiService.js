import galleryTemplate from '../templates/gallery.hbs';

const refs = {
  btnSearch: document.querySelector('.search-form__btn'),
  btnLoadMore: document.querySelector('.search-form__btn-load-more'),
  gallery: document.querySelector('.gallery'),
  queryInput: document.querySelector('.search-form__input'),
  form: document.querySelector('.search-form'),
};

const ImageFinder = {
  key: 'key=18800826-dac8e8a4f07b5aa1d9a1979b8',
  page: 1,
  baseUrl: 'https://pixabay.com/api/?image_type=photo&orientation=horizontal&q='
}

const getGalleryData = async (event) => {
  event.preventDefault();
  const searchQuery = refs.queryInput.value.trim();
  const url = `${ImageFinder.baseUrl}${searchQuery}&page=${ImageFinder.page}&per_page=12&${ImageFinder.key}`;

  if(searchQuery !== '') {
    await fetch(url)
      .then(response => response.json())
      .then(response => {
        refs.gallery.innerHTML = "";
        refs.gallery.insertAdjacentHTML('afterbegin', galleryTemplate((response.hits)))
        }
      )
      .catch(error => console.log(error))
  }
};

const renderScrollGallery = async (event) => {
  event.preventDefault();
  const searchQuery = refs.queryInput.value.trim();
  const url = `${ImageFinder.baseUrl}${searchQuery}&page=${ImageFinder.page}&per_page=12&${ImageFinder.key}`;

  if(searchQuery !== '') {
    await fetch(url)
      .then(response => response.json())
      .then(response =>
        refs.gallery.insertAdjacentHTML('beforeend', galleryTemplate((response.hits)))
      )
    window.scrollBy({
      top: document.documentElement.offsetHeight,
      behavior: 'smooth'
    })
    ImageFinder.page += 1;
  }
}

const pageReset = async () => {
  const searchQuery = refs.queryInput.value.trim();

  if(searchQuery === '') {
    ImageFinder.page = 1;
    refs.gallery.innerHTML = "";
  }
}
refs.queryInput.addEventListener('input', pageReset);
refs.btnSearch.addEventListener('click', getGalleryData);
refs.btnLoadMore.addEventListener('click', renderScrollGallery);
