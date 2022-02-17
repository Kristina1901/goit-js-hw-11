import './css/styles.css';
import NewApiService from './news-service'
import articlesTpl from './templates/articles.hbs'

const formEl = document.querySelector(".search-form")
const input = document.querySelector('input')
const show = document.querySelector(".load-more")
const container = document.querySelector(".gallery")
const newsApiService = new NewApiService();
formEl.addEventListener('submit', onSearch)    
function onSearch(e) {
  e.preventDefault();
    clearArticlesContainer()
    newsApiService.query = input.value
    newsApiService.resetPage()
    newsApiService.fetchArticles().then(appendArtticleMarkup)
   }
show.addEventListener('click', onLoadMore)
function onLoadMore() {
  newsApiService.fetchArticles().then(appendArtticleMarkup)
}
function appendArtticleMarkup(data) {
    container.insertAdjacentHTML('beforeend', articlesTpl
        (data));
}
function clearArticlesContainer() {
  container.innerHTML = ''
}