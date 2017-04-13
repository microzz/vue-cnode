import Vue from 'vue';
import Router from 'vue-router';
import ArticleList from '../components/Content/ArticleList.vue';
import Article from '../components/Content/Article.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'articleList',
      component: ArticleList
    },
    {
      path: '/article/:id',
      name: 'article',
      component: Article
    }
  ]
})
