<template lang="html">
  <div class="new-article">

    <div class="new-header">
      <i @click="showNewArticle" class="icon-back"></i>
      新建话题
    </div>

    <div class="new-content">
      <div class="new-type">
        请选择主题类别:
        <select v-model.trim="type">
          <option>分享</option>
          <option>问答</option>
          <option>招聘</option>
        </select>
      </div>

      <div class="new-title">
        <input v-model.trim="title" type="text" placeholder=" 请输入标题，不少于十个字符">
      </div>

      <div class="new-body">
        <textarea v-model="content" placeholder="请输入内容"></textarea>
      </div>

      <div class="send">
        <button @click="send">发布</button>
      </div>

    </div>

  </div>
</template>

<script>
export default {
  name: 'newArticle',
  data() {
    return {
      type: '分享',
      title: '',
      content: ''
    }
  },
  computed: {
    ak() {
      return this.$store.state.ak;
    }
  },
  methods: {
    showNewArticle() {
      this.$store.commit('showNewArticle', false)
    },
    send() {
      if (!this.ak) {
        this.$store.commit('showLogin', true);
        return;
      }
      if (this.type === '分享') {
        this.type = 'share'
      } else if (this.type === '问答') {
        this.type = 'ask';
      } else {
        this.type = 'job';
      }

      this.axios.post('https://cnodejs.org/api/v1/topics', {
        accesstoken: this.ak,
        title: this.title,
        tab: this.type,
        content: this.content
      })
        .then(result => {
          if (result.data && result.data.success) {
            this.$store.commit('showNewArticle', false);
            this.$store.commit('showAsideMenu', false);
            this.$router.push({name: 'article', params: {id: result.data.topic_id}});
          } else {
            alert('没有发布成功')
          }
        })
        .catch((err) => {console.log('err', err);})
    }
  }
}
</script>

<style lang="scss" scoped>
  .new-article {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 1;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background-color: white;
    .new-header {
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
    .new-content {
      flex: 1;
      display: flex;
      align-items: center;
      flex-direction: column;
      width: 100%;
      color: black;
      padding-top: 20px;
      .new-type {
        display: flex;
        justify-content: center;
        align-items: center;
        color: black;
        font-size: 1.1rem;
        height: 50px;
        width: 100%;
        select {
          margin-left: 6px;
          padding-left: 8px;
          padding-bottom: 4px;
          font-size: 1.1rem;
          background-color: white;
          border-bottom: 1px solid #2196f3;
          border-radius: 0;
        }
      }

      .new-title {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 50px;
        margin-top: 10px;
        margin-bottom: 10px;
        input {
          width: 92%;
          font-size: 1.3rem;
          border-bottom: 1px solid rgba(0, 0, 0, .2);
          padding-bottom: 5px;
        }
        @media screen and (min-width: 760px) {
          input {
            width: 50% !important;
          }
        }
      }

      .new-body {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        margin-bottom: 30px;
        textarea {
          width: 92% !important;
          height: 300px !important;
          padding: 7px 12px;
          font-size: 1.2rem;
          resize: none;
          border: 1px solid rgba(0, 0, 0, .2);
          border-radius: 5px;
        }
        @media screen and (min-width: 760px) {
          textarea {
            width: 50% !important;
          }
        }
      }

      .send {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        button {
          width: 53px;
          height: 32px;
          font-size: 1.2rem;
          // text-align: center;
          background-color:  #2196f3;
          color: white;
          border-radius: 3px;
        }
      }
    }
  }
</style>
