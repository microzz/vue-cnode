<template>
  <div id="app">

    <VHeader></VHeader>

    <VContent></VContent>

    <AsideMenu></AsideMenu>

    <transition name="show-login">
      <Login v-if="isShowLogin"></Login>
    </transition>


  </div>
</template>

<script>
import VHeader from './components/Header/Header.vue';
import VContent from './components/Content/Content.vue';
import AsideMenu from './components/AsideMenu/AsideMenu.vue';
import Login from './components/Login/Login.vue';

export default {
  name: 'app',
  components: {
    VHeader,
    VContent,
    AsideMenu,
    Login
  },
  computed: {
    isShowLogin() {
      return this.$store.state.isShowLogin;
    }
  }
}
</script>

<style lang="scss">
@import "./common/style/base.scss";

.show-login-enter-active {
  transition: all .3s ease;
}
.show-login-leave-active {
  transition: all .2s ease-in;
}
.show-login-enter, .show-login-leave-active {
  transform: translateX(200px);
  opacity: 0;
}

#app {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

}
</style>
