

export default [
  {
      path: '/about/',
      component: require('./pages/about.vue')
  },
  {
      path: '/form/',
      component: require('./pages/form.vue')
  },
  {
      path: '/dynamic-route/blog/:blogId/post/:postId/',
      component: require('./pages/dynamic-route.vue')
  },
  {
    path:'/search-tv-shows',
    component: require('./pages/search-tv-shows.vue')
  },
  {
    path:'/categories-tv-shows',
    component: require('./pages/categories-tv-shows.vue')
  },
  {
    path:'/categories-movies',
    component: require('./pages/categories-movies.vue')
  },
]
