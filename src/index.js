import './css/styles.css';
import NewApiService from './news-service'
import articlesTpl from './templates/articles.hbs'
import { Notify } from 'notiflix/build/notiflix-notify-aio';

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
    return Notiflix.Notify.warning("Please enter your request");
    } 
    newsApiService.query = input.value
    newsApiService.resetPage()
    newsApiService.fetchArticles().then(appendArtticleMarkup)
    newsApiService.fetchArticles().then(cheakingImg)
    
}
      
show.addEventListener('click', onLoadMore)
function onLoadMore() {
  newsApiService.fetchArticles().then(appendArtticleMarkup)
}
function appendArtticleMarkup({hits = data}) {
   container.insertAdjacentHTML('beforeend', articlesTpl
     (hits)
   );
  
}
function clearArticlesContainer() {
  container.innerHTML = ''
}
function cheakingImg({ total, totalHits } = data) {
   
  if (total === 0) {
    show.classList.add("is-hidden")
    return Notify.failure('Sorry, there are no images matching your search query. Please try again.');
              
                       
  }
  if (totalHits === 0) {
    show.classList.add("is-hidden")
    return Notify.info("We're sorry, but you've reached the end of search results.");
    
  }
  if (total <=40) {
    show.classList.add("is-hidden")
 
  }
  if (total > 40) {
    show.classList.remove("is-hidden")
  }
}