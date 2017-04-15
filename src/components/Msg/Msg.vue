<template lang="html">
  <div class="msg">
    <div class="msg-header">
      <i @click="showInfo" class="icon-back"></i>消息中心
    </div>
  </div>
</template>

<script>
export default {
  name: 'msg'
}
</script>

<style lang="scss" scoped>
  .msg {
    position: absolute;
    z-index: 1;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;

    .msg-header {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 50px;
      color: white;
      font-size: 1.4rem;
      background-color: #2196f3;
      i.icon-back {
        position: absolute;
        left: 10px;
        display: inline-block;
        width: 38px;
        height: 38px;
        background: url('../../common/icons/icon-back.svg') no-repeat;
        background-size: contain;
      }
    }
  }
</style>
