<template lang="html">
  <div class="header">

    <div class="title">
      <i @click.stop.prevent="showAsideMenu" class="icon-menu"></i>
      <h1>CNode社区</h1>
      <i @click="showMsg" v-show="ak" class="icon-msg"></i>
      <span v-show="ak" class="msg-count">{{msgCount}}</span>
    </div>

  </div>
</template>

<script>
export default {
  name: 'header',
  data() {
    return {
      msgCount: 0,
    }
  },
  methods: {
    showAsideMenu() {
      this.$store.commit('showAsideMenu', true);
    },
    showMsg() {
      this.$store.commit('showMsg', true);
    }
  },
  computed: {
    ak() {
      return this.$store.state.ak;
    }
  },
  created() {
    if (!this.ak) {
      return;
    }
    this.axios.get('https://cnodejs.org/api/v1/message/count?accesstoken=' + this.ak)
      .then(result => result.data)
      .then(data => {
        if (data.success) {
          this.msgCount = data.data;
        }
      })
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
      right: 30px;
      top: 23px;
      background: url('../../common/icons/icon-msg.svg') no-repeat;
      background-size: contain;
    }
    span.msg-count {
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1;
      width: 20px;
      height: 20px;
      right: 15px;
      top: 18px;
      text-align: center;
      background-color: #ff4081;
      border-radius: 10px;
      font-size: 80%;
    }
    h1 {
      flex: 5;
      letter-spacing: 2px;
      transition: .3s ease-in-out;
    }
    h1:hover {
      transform: rotate(8deg);
      transition: .3s ease-in-out;
    }
  }
</style>
