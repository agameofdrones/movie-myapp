<template>
  <f7-page>
    <f7-navbar title="TV Shows" back-link="Back" sliding></f7-navbar>

    <f7-views>
      <f7-list form>
  <!-- Enables Smart Select behavior by adding "smart-select" prop -->
            <f7-list-item smart-select title="Search" smart-select-open-in='picker' >
    <!-- Select with values inside -->
              <select name="tvshow-select" v-on:change='getSelected' id='tv-options'>
                <option value="airing_today" selected>Airing Today</option>
                <option value="popular">Popular</option>
                <option value="on_the_air">This Week</option>
                <option value="top_rated">Top Rated</option>
              </select>
            </f7-list-item>
          </f7-list form>
            <f7-list accordion>
          <f7-list-item v-for="tvshow in tvshows" accordion-item v-bind:title="tvshow.name">
            <f7-accordion-content>
              <f7-block>

                <p>Release Date: {{tvshow.first_air_date}}</p>
                <p>Score: {{tvshow.vote_average}}</p>
                <img v-if="tvshow.poster_path" style="height: 50%; width: 50%;" v-bind:src="'https://image.tmdb.org/t/p/w500/'+tvshow.poster_path"/>
                <p>{{tvshow.overview}}</p>
              </f7-block>
            </f7-accordion-content>
          </f7-list-item>
          </f7-list>
         <f7-buttons>
          <f7-button big color='orange' style="margin-left:20px;" v-on:click="previousPage">Previous Page</f7-button>
          <f7-button big color='orange' style="margin-right:20px;"v-on:click="nextPage">Next Page</f7-button>
        </f7-buttons>


    </f7-views>
  </f7-page>
</template>

<script>
export default {
  data() {
          return {
            tvshows: [],
            selected:'airing_today',
             page: 1,
          }
      },
  methods:
        {
          getTvShows(selected){
                this.$http.get('https://api.themoviedb.org/3/tv/'+selected+'?api_key=768582cb565a9ab2e51eabc518e7f184&language=en-US&page='+this.page)
                .then(function(response) {
                        this.tvshows = response.body.results;
                        console.log(response.body.results);
                         
                    });
            },
             getSelected: function(){  
         this.selected = document.getElementById('tv-options').value;
        this.getTvShows(this.selected);
        this.page = 1;
        window.scrollTo(0, 0);
    },
            nextPage()
            {
              this.page= this.page + 1;
              this.$http.get('https://api.themoviedb.org/3/tv/'+this.selected+'?api_key=768582cb565a9ab2e51eabc518e7f184&language=en-US&page='+this.page)
                .then(function(response) {
                        this.tvshows = response.body.results;
                     window.scrollTo(0, 0);
                    });
            },
            previousPage()
            {
              if(this.page!= 1)
              {
              this.page= this.page - 1;
              }
            
              this.$http.get('https://api.themoviedb.org/3/tv/'+this.selected+'?api_key=768582cb565a9ab2e51eabc518e7f184&language=en-US&page='+this.page)
                .then(function(response) {
                        this.tvshows = response.body.results;
                       window.scrollTo(0, 0);
                    });
            },

  },

  created: function () {
    this.getTvShows(this.selected);

  }
}
</script>
