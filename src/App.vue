<template>
  <div id="app">
    <VHeader></VHeader>
    <VContent></VContent>
    <AsideMenu></AsideMenu>
  </div>
</template>

<script>
import VHeader from './components/Header/Header.vue';
import VContent from './components/Content/Content.vue';
import AsideMenu from './components/AsideMenu/AsideMenu.vue';

export default {
  name: 'app',
  components: {
    VHeader,
    VContent,
    AsideMenu
  }
}
</script>

<style lang="scss">
@import "./common/style/base.scss";


#app {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

}
</style>
