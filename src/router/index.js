import Vue from 'vue';
import Router from 'vue-router';
import ArticleList from '../components/Content/ArticleList.vue';
import Article from '../components/Content/Article.vue';
import User from '../components/User/User.vue';

Vue.use(Router)

export default new Router({
  // mode: 'history',
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
    },
    {
      path: '/user/:name?',
      name: 'user',
      component: User
    }
  ]
})
