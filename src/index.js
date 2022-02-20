import './css/styles.css';
import NewApiService from './news-service'
import articlesTpl from './templates/articles.hbs'
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import  SimpleLightbox  from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const formEl = document.querySelector(".search-form")
const input = document.querySelector('input')
const show = document.querySelector(".load-more")
show.classList.add("is-hidden")
const container = document.querySelector(".gallery")
const newsApiService = new NewApiService();
formEl.addEventListener('submit', onSearch)  
function onSearch(e) {
  e.preventDefault();
  clearArticlesContainer()
  if (input.value === '') {
    return Notify.warning("Please enter your request");
    } 
    newsApiService.query = input.value
    newsApiService.resetPage()
    newsApiService.fetchArticles()
    newsApiService.fetchArticles().then(appendArtticleMarkup)
    newsApiService.fetchArticles().then(cheakingImg)
  
        
}
      
show.addEventListener('click', onLoadMore)


function onLoadMore() {
  newsApiService.fetchArticles().then(data => {
   appendArtticleMarkup(data);
    if (data.hits.length < 40) {
      show.classList.add('is-hidden');
      Notify.warning("We're sorry, but you've reached the end of search results.");
    }
  });
}

function appendArtticleMarkup({ hits } = data) {
  container.insertAdjacentHTML('beforeend', articlesTpl
    (hits));
  let lightbox = new SimpleLightbox('.gallery a', { scrollZoom: false, captionDelay: 250, captionsData: 'alt', doubleTapZoom: 1 });
  lightbox.refresh()
  
}
function clearArticlesContainer() {
  container.innerHTML = ''
}
function cheakingImg({ totalHits } = data) {
   if (totalHits === 0) {
   show.classList.add("is-hidden")
   Notify.failure('Sorry, there are no images matching your search query. Please try again.');
                           
   }
  
   else if (totalHits <= 40) {
     show.classList.add("is-hidden")
     Notify.info(`Hooray! We found ${totalHits} images.`)
 
  }
  else if (totalHits > 40) {
     show.classList.remove("is-hidden")
     Notify.info(`Hooray! We found ${totalHits} images.`)
  }
  else  {
    Notify.info(`Hooray! We found ${totalHits} images.`);
     
  }
     
}

