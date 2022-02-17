const axios = require('axios');
export default class NewsApiService{
    constructor() {
        this.searchQuery = '';
        this.page = 1;
      
    } 
    fetchArticles() {
    const url =`https://pixabay.com/api/?key=25742828-fa226770f9336c5f983da529f&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch&per_page=40&page=${this.page}`
    return fetch(url)
    .then(r => r.json())
    .then(data => {
        this.incrementPage()
        
        return data.hits
        })
    
    }
    incrementPage() {
        this.page += 1
    }
    resetPage() {
        this.page = 1
    }
    get query() {
        return this.searchQuery
    }
    set query(newQuery) {
        this.searchQuery = newQuery
    }
}