<template>

  <f7-page>
    <f7-navbar title="TV Shows" back-link="Back" sliding></f7-navbar>

    <f7-views>
      <f7-block-title>TV Shows Categories</f7-block-title>
         <f7-list>
            <f7-list-item v-for="category in tvshowCategories" v-bind:title="category.name"></f7-list-item>
            
        </f7-list>



    </f7-views>
  </f7-page>
</template>

<script>
export default {
  data() {
          return {
            tvshowCategories: {},
          }
      },
  methods:
        {
          getTvShowsCategories(){
                this.$http.get('https://api.themoviedb.org/3/genre/tv/list?api_key=768582cb565a9ab2e51eabc518e7f184&language=en-US')
                .then(function(response) {
                        this.tvshowCategories = response.body.genres;
                        console.log(response.body.genres);
                    });
            },

  },

  created: function () {
    this.getTvShowsCategories();

  }
}
</script>