<template>
  <!-- App -->
  <div id="app">

    <!-- Statusbar -->
    <f7-statusbar></f7-statusbar>

    <!-- Left Panel -->
    <f7-panel left reveal layout="dark">
      <f7-view id="left-panel-view" navbar-through :dynamic-navbar="true">
        <f7-navbar v-if="$theme.ios" title="Left Panel" sliding></f7-navbar>
        <f7-pages>
          <f7-page>
            <f7-navbar v-if="$theme.material" title="Left Panel" sliding></f7-navbar>

            <f7-block-title>TV Shows</f7-block-title>
            <f7-list>
              <f7-list-item link="/form/" title="TV Shows Home" link-view="#main-view" link-close-panel></f7-list-item>
              <f7-list-item link="/categories-tv-shows/" title="TV Shows Categories" link-view="#main-view" link-close-panel></f7-list-item>
              <f7-list-item link="/search-tv-shows/" title="Search TV Shows" link-view="#main-view" link-close-panel></f7-list-item>
            </f7-list>
            <f7-block-title>Movies</f7-block-title>
            <f7-list>
            <f7-list-item link="/" title="Movies Home" link-view="#main-view" link-close-panel></f7-list-item>
             <f7-list-item link="/categories-movies/" title="Movie Categories" link-view="#main-view" link-close-panel></f7-list-item>
              <f7-list-item link="/about/" title="Search Movies" link-view="#main-view" link-close-panel></f7-list-item>
            </f7-list>

          </f7-page>
        </f7-pages>
      </f7-view>
    </f7-panel>




    <!-- Main Views -->
   
    <f7-views>
      <f7-view id="main-view" navbar-through :dynamic-navbar="true" main>
        <!-- iOS Theme Navbar -->
        <f7-navbar v-if="$theme.ios">
          <f7-nav-left>
            <f7-link icon="icon-bars" open-panel="left"></f7-link>
          </f7-nav-left>
          <f7-nav-center sliding>Movies</f7-nav-center>

        </f7-navbar>
         
        <!-- Pages -->
        <f7-pages>
          <f7-page>
            <!-- Material Theme Navbar -->
            <f7-navbar v-if="$theme.material">
              <f7-nav-left>
                <f7-link icon="icon-bars" open-panel="left"></f7-link>
              </f7-nav-left>
              <f7-nav-center sliding>Movies</f7-nav-center>
              <f7-nav-right>
                <f7-link icon="icon-bars" open-panel="right"></f7-link>
              </f7-nav-right>
            </f7-navbar>
           
              <f7-list form>
  <!-- Enables Smart Select behavior by adding "smart-select" prop -->
            <f7-list-item smart-select title="Search"   smart-select-open-in='picker' >
    <!-- Select with values inside -->
              <select name="movie-select" v-on:change='getSelected' id='options'>
                <option value="now_playing" selected>Now Playing</option>
                <option value="popular">Popular Movies</option>
                <option value="top_rated">Top Rated Movies</option>
                <option value="upcoming">Upcoming Movies</option>
              </select>
            </f7-list-item>
          </f7-list form>
            <f7-list accordion>
          <f7-list-item v-for="movie in movies" accordion-item v-bind:title="movie.original_title" >
            <f7-accordion-content>
              <f7-block>
                <p>{{movie.title}}</p>
                <p>Score: {{movie.vote_average}}</p>
                <p>Release Date: {{movie.release_date}}</p>
                <img v-if="movie.poster_path" style="height: 50%; width: 50%;" v-bind:src="'https://image.tmdb.org/t/p/w500/'+movie.poster_path"/>
                <p>{{movie.overview}}</p>
              </f7-block>
            </f7-accordion-content>
          </f7-list-item>
          </f7-list>
         <f7-buttons>
          <f7-button big color='orange' style="margin-left:20px;" v-on:click="previousPage">Previous Page</f7-button>
          <f7-button big color='orange' style="margin-right:20px;"v-on:click="nextPage">Next Page</f7-button>
        </f7-buttons>
           
          
          

          </f7-page>
          
        </f7-pages>
        
      </f7-view>
         
    </f7-views>
 


  </div>
</template>

<script>
export default {
  data() {
          return {
            movies: {},
            select: 'now_playing',
            page: 1,
            genres: {},
            movieGenres: {},
          }
      },
  methods:
        {
          getMovies(selected){
                this.$http.get('https://api.themoviedb.org/3/movie/'+selected+'?api_key=768582cb565a9ab2e51eabc518e7f184&language=en-US&page='+this.page)
                .then(function(response) {
                        this.movies = response.body.results;
                        
                    });
            },
            nextPage()
            {
              this.page= this.page + 1;
              this.$http.get('https://api.themoviedb.org/3/movie/'+this.select+'?api_key=768582cb565a9ab2e51eabc518e7f184&language=en-US&page='+this.page)
                .then(function(response) {
                        this.movies = response.body.results;
                     window.scrollTo(0, 0);
                    });
            },
            previousPage()
            {
              if(this.page!= 1)
              {
              this.page= this.page - 1;
              }
            
              this.$http.get('https://api.themoviedb.org/3/movie/'+this.select+'?api_key=768582cb565a9ab2e51eabc518e7f184&language=en-US&page='+this.page)
                .then(function(response) {
                        this.movies = response.body.results;
                       window.scrollTo(0, 0);
                    });
            },
           
        getSelected: function(){  
         this.select = document.getElementById('options').value;
       
        this.getMovies(this.select);
        this.page = 1;
        window.scrollTo(0, 0);
    }

  },

  created: function () {
    this.getMovies(this.select,this.page);

  },
  
}
</script>
<style>
.swiper-container {
  height: 100%;
}
.swiper-slide {
  background:#fff;
}
.swiper-slide span {
  text-align:center;
  display:block;
  margin:20px;
  font-size:21px;
}
</style>
