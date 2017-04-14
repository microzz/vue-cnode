<template lang="html">
  <div class="header">

    <div class="title">
      <i @click.stop.prevent="showAsideMenu" class="icon-menu"></i>
      <h1>CNode社区</h1>
      <i class="icon-msg"></i>
    </div>

  </div>
</template>

<script>
export default {
  name: 'header',
  methods: {
    showAsideMenu() {
      this.$store.commit('showAsideMenu', true);
    }
  }
}
</script>

<style lang="scss" scoped>
  .header {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 70px;
    background-color: #2196F3;
    color: white;
    justify-content: center;
    align-items: center;
    box-shadow: 0 1px 10px rgba(0, 0, 0, .2);
    i {
      position: absolute;
      z-index: 1;
      display: inline-block;
      flex: 1;
      width: 25px;
      height: 25px;
    }
    i.icon-menu {
      left: 20px;
      top: 25px;
      background: url('../../common/icons/icon-menu.svg') no-repeat;
      background-size: contain;
    }
    i.icon-msg {
      right: 20px;
      top: 23px;
      background: url('../../common/icons/icon-msg.svg') no-repeat;
      background-size: contain;
    }
    h1 {
      flex: 5;
      letter-spacing: 2px;
    }
  }
</style>
