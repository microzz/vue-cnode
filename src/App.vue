<template>
  <div id="app">

    <VHeader></VHeader>

    <VContent></VContent>

    <AsideMenu></AsideMenu>

    <transition name="show">
      <Login v-if="isShowLogin"></Login>
    </transition>

    <transition name="show">
      <Info v-if="isShowInfo"></Info>
    </transition>

    <transition name="show">
      <Msg v-if="false"></Msg>
    </transition>



  </div>
</template>

<script>
import VHeader from './components/Header/Header.vue';
import VContent from './components/Content/Content.vue';
import AsideMenu from './components/AsideMenu/AsideMenu.vue';
import Login from './components/Login/Login.vue';
import Info from './components/Info/Info.vue';
import Msg from './components/Msg/Msg.vue';

export default {
  name: 'app',
  components: {
    VHeader,
    VContent,
    AsideMenu,
    Login,
    Info,
    Msg
  },
  computed: {
    isShowLogin() {
      return this.$store.state.isShowLogin;
    },
    isShowInfo() {
      return this.$store.state.isShowInfo;
    },
    isShowMsg() {
      return this.$store.state.isShowMsg;
    }
  }
}
</script>

<style lang="scss">
@import "./common/style/base.scss";

.show-enter-active {
  transition: all .3s ease;
}
.show-leave-active {
  transition: all .2s ease-in;
}
.show-enter, .show-leave-active {
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
