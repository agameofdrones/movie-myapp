<template>
  <f7-page>
    <f7-navbar title="Search" back-link="Back" sliding></f7-navbar>
    <f7-block inner>
      <f7-searchbar  v-on:change="onChange" v-model="search"
    cancel-link="Cancel"
    search-list="#search-list"
    placeholder="Search"
    :clear-button="true"
  ></f7-searchbar>
    </f7-block>
    <f7-list accordion class="searchbar-found" id="search-list" v-if="results.length" >
  <f7-list-item v-for="result in results" accordion-item v-bind:title="result.original_name">
    <f7-accordion-content>
      <f7-block>
        <p>{{result.title}}</p>
        <p>Release Date: {{result.first_air_date}}</p>
        <img v-if="result.poster_path" style="height: 225px; width: 50%; height:50%" v-bind:src="'https://image.tmdb.org/t/p/w500/'+result.poster_path"/>
        <p>{{result.overview}}</p>
      </f7-block>
    </f7-accordion-content>
  </f7-list-item>
  </f7-list>
  </f7-page>
</template>

<script>
export default {
  data() {
          return {
            results: {},
            search: '',
          }
      },
  methods: {
    onChange: function(){
          
          this.$http.get("https://api.themoviedb.org/3/search/tv?api_key=768582cb565a9ab2e51eabc518e7f184&query="+this.search)
          .then(function(response) {
                  this.results = response.body.results;
                  console.log(response.body.results);

              });
      },

  },
  watch: {

  },

}
</script>
