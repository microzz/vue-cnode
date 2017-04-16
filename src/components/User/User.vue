<template lang="html">
  <div class="user">
      <div class="info">

        <transition name="slide-fade">
          <div v-show="isShowContent" class="info-content">
            <div class="info-register">
              <div class="info-img">
                <img :src="user.avatar_url" alt="">
              </div>
              <div class="info-name">
                {{ user.loginname }}
              </div>
              <div class="info-score">
                积分：{{ user.score }}
              </div>

              <div class="info-score">
                GitHub： <a :href="'https://github.com/'+user.githubUsername" target="_blank">{{ user.githubUsername || 'microzz' }}</a>
              </div>

              <div class="info-date">
                注册于：{{ changeTime(user.create_at) }}
              </div>
            </div>

            <div class="info-collect">
              <div class="collect-title">
                收藏的话题
              </div>
              <div class="collect-content">
                <div v-for="item of collectTopics" class="collect-item">
                  <div class="img">
                    <img :src="item.author.avatar_url" alt="">
                  </div>
                  <div class="title">
                    <span @click="view">
                    <router-link :to="{name: 'article', params: {id: item.id}}">{{item.title}}</router-link>
                    </span>

                  </div>
                </div>
              </div>
            </div>

            <div class="info-collect">
              <div class="collect-title">
                最近参与的话题
              </div>
              <div class="collect-content">
                <div v-for="item of user.recent_replies" class="collect-item">
                  <div class="img">
                    <img :src="item.author.avatar_url" alt="">
                  </div>
                  <div class="title">
                    <span @click="view">
                    <router-link :to="{name: 'article', params: {id: item.id}}">{{item.title}}</router-link>
                    </span>

                  </div>
                </div>
              </div>
            </div>

            <div class="info-collect">
              <div class="collect-title">
                最近创建的话题
              </div>
              <div class="collect-content">
                <div v-for="item of user.recent_topics" class="collect-item">
                  <div class="img">
                    <img :src="item.author.avatar_url" alt="">
                  </div>
                  <div class="title">
                    <span @click="view">
                    <router-link :to="{name: 'article', params: {id: item.id}}">{{item.title}}</router-link>
                    </span>

                  </div>
                </div>
              </div>
            </div>
          </div>

        </transition>

      </div>

      <div class="back">
        <i @click.stop.prevent="$router.go(-1)" class="icon-back"></i>
      </div>

  </div>
</template>

<script>

export default {
  name: 'user',
  data() {
    return {
      collectTopics: [],
      user: {},
      isShowContent: false
    }
  },
  created() {
    this.$store.commit('showAsideMenu', false);
    // 收藏
    this.axios.get(`https://cnodejs.org/api/v1/topic_collect/${this.$route.params.name}`)
      .then(result => result.data.data)
      .then(collectTopics => this.collectTopics = collectTopics)
      .then(() => this.axios.get(`https://cnodejs.org/api/v1/user/${this.$route.params.name}`))
      .then(result => result.data.data)
      .then(user => this.user = user)
      .then(() => this.isShowContent = true)




  },
  methods: {
    showInfo() {
      this.$store.commit('showInfo', false);
    },
    view() {
      this.$store.commit('showInfo', false);
      this.$store.commit('showAsideMenu', false);
    }
  }
}
</script>

<style lang="scss" scoped>
  .user {
    .slide-fade-enter-active {
      transition: all .3s ease;
    }
    .slide-fade-leave-active {
      transition: all .3s ease;
    }
    .slide-fade-enter, .slide-fade-leave-active {
      transform: translateX(160px);
      opacity: 0;
    }
      .info {
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
        .info-header {
          width: 100%;
          height: 50px;
          background-color: #2196f3;
          color: white;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 1.4rem;
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

        .info-content {
          width: 100%;
          height: 100%;
          flex: 1;
          overflow: auto;
          text-align: center;
          padding-top: 10px;
          padding-bottom: 30px;
          .info-register {
            margin-bottom: 20px;

            .info-img {
              img {
                width: 90px;
                height: 90px;
                border-radius: 45px;
              }

            }

            .info-name {
              font-size: 1.5rem;
              font-weight: bold;
            }
          }

          .info-collect {
            width: 93%;
            margin: auto;
            padding-top: 10px;
            padding-bottom: 10px;
            display: flex;
            justify-content: center;
            flex-direction: column;
            border: 1px solid rgba(0, 0, 0, .2);
            border-radius: 4px;
            .collect-title {
              width: 100%;
              padding-bottom: 10px;
              border-bottom: 1px solid rgba(0, 0, 0, .1);
            }
            .collect-item {
              display: flex;
              padding: 5px 5px 0 5px;
              align-items: center;

              img {
                width: 37px;
                height: 37px;
                margin-right: 5px;
                border-radius: 4px;
                vertical-align: text-bottom;
              }
            }
            .collect-item + .collect-item {
              border-top: 1px solid rgba(0, 0, 0, .07);
            }
          }

          @media screen and (min-width: 760px) {
            .info-collect {
              width: 60%;

              .collect-item {
                padding: 10px 25px;
                img {
                  margin-right: 15px;
                }
              }
            }
          }

          .info-collect + .info-collect {
            margin-top: 20px;
          }
        }
      }
      .back {
        position: fixed;
        z-index: 1;
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
</style>
