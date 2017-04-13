// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vuex from 'vuex';
import moment from 'moment'

Vue.use(VueAxios, axios);

Vue.use(Vuex);

Vue.prototype.moment = moment;
Vue.prototype.changeTime = time => moment(time).startOf('hour').fromNow().replace(/hours?/, '小时').replace('ago', '前').replace(/days?/, '天').replace(/minutes?/, '分钟').replace(/\ban?/, '1').replace(/months?/, '个月').replace(/\byears?/, '年').replace(/\s/g, '');

const store = new Vuex.Store({
  state: {
    tab: 'all',
    articleList: [],
    isLoading: false,
    isMore: false
  },

  mutations: {
    changeTab(state, payload) {
      state.isLoading = payload.hasOwnProperty('isLoading') ? payload.isLoading : state.isLoading;
      state.tab = payload.type || state.tab;
      state.articleList = payload.articleList || state.articleList;
    },
    viewArcticle(state, flag) {
      state.isLoading = flag;
    },
    changeMore(state, flag) {
      state.isMore = flag;
    }
  },


})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
