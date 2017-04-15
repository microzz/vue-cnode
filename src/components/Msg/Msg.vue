<template lang="html">
  <div class="msg">
    <div class="msg-header">
      <i @click="hideMsg" class="icon-back"></i>消息中心
    </div>

    <div class="msg-content">
      <div class="msg-read">
        <div :class="{selected: isOnRead}" @click.stop.prevent="changeTab(true)" class="has-no">
          未读消息:0
        </div>
        <div :class="{selected: !isOnRead}" @click.stop.prevent="changeTab(false)" class="has">
          已读消息:2
        </div>
      </div>


    </div>

    <div class="msg-list">

      <div v-for="item of (isOnRead ? msg.hasnot_read_messages : msg.has_read_messages)" class="msg-item">
          <div class="msg-body">
            <div class="msg-name">
              {{ item.author.loginname }} 的回复：
            </div>
            <div v-html="item.reply.content" class="msg-msg">

            </div>
            <div @click="view">
              <router-link  :to="{name: 'article', params: {id: item.topic.id}}"">

                <div class="msg-from">
                  来自：{{ item.topic.title }}
                </div>
              </router-link>
            </div>

          </div>


      </div>

    </div>

  </div>
</template>

<script>
export default {
  name: 'msg',
  data() {
    return {
      msg: {},
      isOnRead: true
    }
  },
  computed: {
    ak() {
      return this.$store.state.ak;
    }
  },
  created() {
    this.axios.get(`https://cnodejs.org/api/v1/messages?accesstoken=${this.ak}`)
      .then(result => result.data.data)
      .then(msg => this.msg = msg)
  },
  methods: {
    hideMsg() {
      this.$store.commit('showMsg', false);
    },
    changeTab(flag) {
      this.isOnRead = flag;
      console.log('this.isOnRead', this.isOnRead);
    },
    view() {

      this.$store.commit('showMsg', false);
      // this.$router.push('/')

    }
  }
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
      border-bottom: 1px solid rgba(255, 255, 255, .2);
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

    .msg-content {
      display: flex;
      justify-content: center;
      // align-items: center;
      width: 100%;
      height: 40px;
      .msg-read {
        display: flex;
        justify-content: center;
        width: 100%;
        height: 40px;
        background-color: #2196f3;
        color: rgba(255, 255, 255, .5);
        font-size: 1.2rem;
        .has-no {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          border-right: 1px solid rgba(255, 255, 255, .2);

        }
        .has {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .selected {
          border-bottom: 2px solid #ff4081;
          color: white;
        }
      }

    }

    .msg-list {
      flex: 1;
      width: 100%;
      .msg-item {
        display: flex;
        align-items: center;
        width: 100%;
        padding: 10px;

        .msg-avatar {
          width: 50px;
          height: 50px;
          margin-right: 10px;

          img {
            width: 30px;
            height: 30px;
            vertical-align: bottom;
            border-radius: 4px;
          }
        }

        .msg-body {
          flex: 1;
          .msg-name {
            font-size: 1.3rem;
          }
          .msg-from {
            color: gray;
            font-size: 80%;
          }
        }
      }

      @media screen and (min-width: 760px) {
        .msg-item {
          width: 60%;
          margin: auto;
        }
      }

      .msg-item  + .msg-item {
        border-top: 1px solid rgba(0, 0, 0, .1);
      }
    }
  }
</style>
