<template lang="html">
  <div class="article-detail">

    <div v-show="!isLoading" class="body">

      <div class="article-title">
        <h1><span class="flag" v-show="infos.top || infos.good">{{infos.top ? '置顶' : '精华'}}</span>{{infos.title}}</h1>
        <div class="desc">
           <p> 发布于 {{changeTime(infos.create_at)}}  作者 <router-link :to="{name: 'user', params: {name: infos.author && infos.author.loginname}}">{{infos.author && infos.author.loginname}}</router-link>  {{infos.visit_count}} 次浏览  来自 {{types[infos.tab]}}</p>
        </div>
      </div>

      <div v-html="infos.content" class="md"></div>

      <div class="reply">

        <div class="other">
          <div @click="collect" class="collect"><i :class="[isCollected ? 'collected' : 'collected-no']"></i>收藏文章</div>
          <div class="total-reply">{{infos.reply_count}} 回复</div>
        </div>

        <div class="reply-input">
          <input v-model.trim="replyContent" type="text" placeholder="请输入回复内容">
          <button @click="reply('')" type="button">回复</button>
        </div>

        <div v-for="(item, index) of replies" class="reply-item">

          <div class="reply-author">
            <div class="reply-avatar">
              <img :src="item.author.avatar_url" alt="">
              <div class="reply-desc">
                <router-link :to="{name: 'user', params: {name: item.author && item.author.loginname}}">{{item.author.loginname}}</router-link>
                  {{replies.length - index}}楼 • {{changeTime(item.create_at)}}
                  <span @click="currentIndex=index" class="reply-at">回复</span>
                  <i @click="ups(index, item.id, item)" :class="[item.ups.indexOf(userInfo.id) !== -1 ? 'ups-yes' : 'ups-no']" class="icon-reply-at"></i>
                  <span class="ups-count">{{ item.ups.length }}</span>
              </div>
            </div>
          </div>

          <div v-html="item.content" class="reply-content"></div>

          <transition name="slide-top">
            <div v-show="currentIndex===index" class="reply-one">
              <input type="text" name="" v-model.trim="replyOneContent" :placeholder="'@' + item.author.loginname">
              <button @click="reply(item.id, item.author.loginname)">回复</button>
              <button @click="currentIndex=null;replyOneContent=''">取消</button>
            </div>
          </transition>


        </div>

      </div>

    </div>

    <div class="back">
      <i @click.stop.prevent="$router.go(-1)" class="icon-back"></i>
    </div>

  </div>
</template>

<script>
export default {
  name: 'articleDetail',
  data() {
    return {
      id: this.$route.params.id,
      infos: {},
      types: { share: '分享', ask: '问答', job: '招聘'},
      oImgs: [],
      isCollected: false,
      replyContent: '',
      replyOneContent: '',
      isReplyOne: false,
      isUps: false,
      flag: true,
      up: 0,
      currentIndex: null, // 回复某个人的 index
      currentUps: null,
      replies: []
      // oArticleDetail: {}
    }
  },
  created() {
    this.$store.commit('viewArcticle', true);
    this.$store.commit('showInfo', false);
    this.$store.commit('showAsideMenu', false);
    this.axios.get('https://cnodejs.org/api/v1/topic/' + this.id)
      .then(result => result.data.data)
      .then(data => this.infos = data)
      .then(infos => this.replies = infos.replies.reverse())
      .then(() => this.$store.commit('viewArcticle', false))
      .then(() => {
        this.oImgs = document.querySelector('.md').querySelectorAll('img');
        for (let img of this.oImgs) {
          img.onclick = () => location.href = img.src;
        }
      })
  },
  // mounted() {
  //   this.oArticleDetail = document.getElementById('article-detail');
  // },
  computed: {
    isLoading() {
      return this.$store.state.isLoading;
    },
    ak() {
      return this.$store.state.ak;
    },
    collectTopics() {
      return this.$store.state.collectTopics;
    },
    userInfo() {
      return this.$store.state.userInfo;
    }
  },
  mounted() {
    if (!this.ak) {
      return;
    }
    this.axios.get(`https://cnodejs.org/api/v1/topic_collect/${this.userInfo.loginname}`)
      .then(result => result.data.data)
      .then(collectTopics => {
        this.$store.commit('updateCollect', collectTopics);
        collectTopics.forEach(item => {
          item.id === this.id ? this.isCollected = true : '';
        })
      })

  },
  methods: {
    // toScroll(event) {
    //   this.oArticleDetail = event.target;
    // },
    collect() {
      if (!this.ak) {
        this.$store.commit('showLogin', true);
        return;
      }
      if (!this.isCollected) {
        this.axios.post(`https://cnodejs.org/api/v1/topic_collect/collect`, {
          accesstoken: this.ak,
          topic_id: this.id
        }).then(result => {
          if (result.data.success) {
            this.isCollected = !this.isCollected;
          }
        })
      } else {
        this.axios.post(`https://cnodejs.org/api/v1/topic_collect/de_collect`, {
          accesstoken: this.ak,
          topic_id: this.id
        }).then(result => {
          console.log('result', result);
          if (result.data.success) {
            this.isCollected = !this.isCollected;
          }
        })
      }
    },

    reply(id, name) {
      if (!this.ak) {
        this.$store.commit('showLogin', true);
        return;
      }
      else if (!id) {
        this.axios.post(`https://cnodejs.org/api/v1/topic/${this.id}/replies`, {
          accesstoken: this.ak,
          content: this.replyContent
        }).then(() => {
          this.axios.get('https://cnodejs.org/api/v1/topic/' + this.id)
            .then(result => result.data.data)
            .then(data => this.infos = data)
            .then(infos => this.replies = infos.replies.reverse())
            .then(() => {
              // this.oArticleDetail.scrollTop = this.oArticleDetail.scrollHeight;
              this.replyContent ='';
          })
        })
      } else {
        this.axios.post(`https://cnodejs.org/api/v1/topic/${this.id}/replies`, {
          accesstoken: this.ak,
          content: '@' + name + ' ' + this.replyOneContent,
          reply_id: id
        }).then(() => {
          this.axios.get('https://cnodejs.org/api/v1/topic/' + this.id)
            .then(result => result.data.data)
            .then(data => this.infos = data)
            .then(infos => this.replies = infos.replies.reverse())
            .then(() => {
              // this.oArticleDetail.scrollTop = this.oArticleDetail.scrollHeight;
              this.currentIndex = null;
              this.replyOneContent = ''
            })
        })
      }
    },

    //点赞
    ups(index, upsId, item) {
      if (!this.ak) {
        this.$store.commit('showLogin', true);
        return;
      }
      if (item.author.loginname === this.userInfo.loginname) {
        alert('不能自己为自己点赞哦😯')
        return;
      }
      this.axios.post(`https://cnodejs.org/api/v1/reply/${upsId}/ups`, {accesstoken: this.ak})
        .then(result => {
          if (result.data.success) {
            this.axios.get('https://cnodejs.org/api/v1/topic/' + this.id)
              .then(result => result.data.data)
              .then(data => this.infos = data)
              .then(infos => this.replies = infos.replies.reverse())
          }
        })

    }
  }
}
</script>

<style lang="scss" scoped>

  .article-detail {
    position: relative;
    z-index: 1;
    height: 100%;
    padding: 8px 5px 0 5px;
    background-color: rgba(0, 0, 0, .07);
    overflow-x: hidden;
    overflow-y: auto;
    .body {
        background-color: white;
        height: 100%;
        border-radius: 4px;
        .article-title {
          width: 100%;
          padding-left: 5px;
          padding-top: 3px;
          padding-bottom: 5px;
          border-bottom: 1px solid rgba(0, 0, 0, .1);
          h1 {
            font-size: 1.2rem;
            .flag {
              background-color: #80bd01;
              padding: 2px 5px;
              font-size: 80%;
              color: white;
              border-radius: 5px;
              margin-right: 5px;
            }
          }
          .desc {
            padding-top: 3px;

            p {
              font-size: 80%;
              color: gray;
            }
          }
        }
        .md {
          width: 100%;
          overflow: hidden;
        }

        .reply {

          .other {
            margin-top: 20px;
            margin-bottom: 10px;
            // border-bottom: 1px solid rgba(0, 0, 0, .05);
            padding-left: 10px;
            display: flex;
            justify-content: space-between;
            i {
              display: inline-block;
              width: 18px;
              height: 18px;
              margin-right: 3px;
            }
            .collected {
              background: url('../../common/icons/icon-collect-yes.svg') no-repeat;
              background-size: contain;
              background-position: 0 3px;
            }
            .collected-no {
              background: url('../../common/icons/icon-collect-no.svg') no-repeat;
              background-size: contain;
              background-position: 0 3px;
            }
          }

          .reply-input {
            width: 100%;
            height: 50px;
            background-color: white;
            margin-bottom: 10px;
            padding-left: 10px;
            padding-top: 5px;
            display: flex;
            justify-content: center;
            align-items: center;
            input {
              width: 80%;
              height: 40px;
              font-size: 1.3rem;
              border-bottom: 1px solid rgba(0, 0, 0, .2);
              margin-right: 10px;
              padding-left: 5px;
              padding-right: 5px;
            }
            input:focus {
              border-bottom: 1px solid #2196f3;
            }
            button {
              font-size: 1.3rem;
              padding: 3px 5px;
              background-color: #2196f3;
              color: white;
              border-radius: 3px;
            }
          }

          .total-reply {
            text-align: center;
            width: 100px;
            background-color: #B2DFDB;
            border-radius: 3px;
            // padding-left: 10px;
            margin-bottom: 6px;
          }

          .reply-item {
            .reply-author {
              background-color: white;
              border-bottom: 1px solid rgba(0, 0, 0, .1);
              border-radius: 5px;
              padding-left: 10px;
              .reply-avatar {
                display: flex;
                width: 100%;
                height: 50px;
                align-items: center;
                img {
                  width: 30px;
                  height: 30px;
                  border-radius: 3px;
                }
                .reply-desc {
                  position: relative;
                  flex: 1;
                  padding-left: 10px;
                  .reply-at {
                    position: absolute;
                    right: 60px;
                  }
                  .icon-reply-at {
                    position: absolute;
                    right: 35px;
                    top: -2px;
                    display: inline-block;
                    width: 20px;
                    height: 20px;

                  }
                  .ups-yes {
                    background: url('../../common/icons/icon-ups-yes.svg') no-repeat;
                    background-size: contain;
                  }
                  .ups-no {
                    background: url('../../common/icons/icon-ups-no.svg') no-repeat;
                    background-size: contain;
                  }
                  span.ups-count {
                    position: absolute;
                    right: 20px;
                  }
                }
              }
            }

            .reply-one {
              width: 100%;
              height: 30px;
              // background-color: red;
              margin-bottom: 20px;
              padding-top: 2px;

              input {
                width: 65%;
                height: 100%;
                background: none;
                border-bottom: 1px solid rgba(0, 0, 0, .1);
                font-size: 1.3rem;
                color: gray;
              }
              input:focus {
                border-bottom: 1px solid #00bcd4;
                color: black;
              }
              button {
                font-size: 1.2rem;
                vertical-align: bottom;
                padding: 2px 5px;
                border-radius: 2px;
              }
              button:nth-of-type(1) {
                background-color: #2196f3;
                color: white;
              }
              button:nth-of-type(2) {
                background-color: white;
                color: gray;
              }
            }
          }
        }

    }

    .back {
      position: fixed;
      top: 60%;
      left: -8px;
      width: 50px;
      height: 50px;

      i.icon-back {
        display: inline-block;
        width: 100%;
        height: 100%;
        background: url('../../common/icons/icon-back-blue.svg') no-repeat;
        background-size: contain;
        opacity: .5;
        cursor: pointer;
      }
    }

  }
  @media screen and (min-width: 760px) {
    .article-detail {
      padding-left: 3%;
      padding-right: 3%;
      .article-title {
        text-align: center;
      }
    }
  }
</style>
