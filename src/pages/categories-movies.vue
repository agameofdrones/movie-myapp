<template>
  <f7-page>
    <f7-navbar title="Tv Shows" back-link="Back" sliding></f7-navbar>

    <f7-views>
      <f7-block-title>Movie Categories</f7-block-title>
         <f7-list>
            <f7-list-item v-for="category in movieCategories" v-bind:title="category.name"></f7-list-item>
            
        </f7-list>



    </f7-views>
  </f7-page>
</template>

<script>
export default {
  data() {
          return {
            movieCategories: {},
          }
      },
  methods:
        {
          getMovieCategories(){
                this.$http.get('https://api.themoviedb.org/3/genre/movie/list?api_key=768582cb565a9ab2e51eabc518e7f184&language=en-US')
                .then(function(response) {
                        this.movieCategories = response.body.genres;
                        console.log(response.body.genres);
                    });
            },

  },

  created: function () {
    this.getMovieCategories();

  }
}
</script>
