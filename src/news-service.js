const axios = require('axios');
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export default class NewsApiService{
    constructor() {
        this.searchQuery = '';
        this.page = 1;
      
    } 
    async fetchArticles() {
        try {
            const response = await axios.get(`https://pixabay.com/api/?key=25742828-fa226770f9336c5f983da529f&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch&per_page=40&page=${this.page}`)
            const data = response.data.hits
            const allhits = response.data.totalHits 
           
          if (allhits  === 0) {
              return Notify.failure('Sorry, there are no images matching your search query. Please try again.');
              
                       
            }
            if (data !== 0) {
                this.incrementPage()
                return data
               
            }
             if (data === 0) {
                return Notify.info("We're sorry, but you've reached the end of search results.");
            }   
        }
    catch (error) {
     console.log(error.message);
      }
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