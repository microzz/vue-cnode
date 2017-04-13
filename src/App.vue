<template>
  <div id="app">
    <VHeader></VHeader>
    <VContent></VContent>
  </div>
</template>

<script>
import VHeader from './components/Header/Header.vue';
import VContent from './components/Content/Content.vue';

export default {
  name: 'app',
  components: {
    VHeader,
    VContent
  }
}
</script>

<style lang="scss">
@import "./common/style/base.scss";

$headerColor: #00bcd4;

#app {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  // background-color: blue;

}
</style>
