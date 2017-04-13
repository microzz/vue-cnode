<template lang="html">
  <div class="article-detail">

    <div v-show="!isLoading" class="body">

      <div class="article-title">
        <h1><span class="flag" v-show="infos.top || infos.good">{{infos.top ? '置顶' : '精华'}}</span>{{infos.title}}</h1>
        <div class="desc">
           <p> 发布于 {{changeTime(infos.create_at)}}  作者 {{infos.author && infos.author.loginname}}  {{infos.visit_count}} 次浏览  来自 {{types[infos.tab]}}</p>
        </div>
      </div>

      <div v-html="infos.content" class="md"></div>

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
      oImgs: []
    }
  },
  created() {
    this.$store.commit('viewArcticle', true);
    this.axios.get('https://cnodejs.org/api/v1/topic/' + this.id)
      .then(result => result.data.data)
      .then(data => this.infos = data)
      .then(() => this.$store.commit('viewArcticle', false))
      .then(() => {
        this.oImgs = document.querySelectorAll('img');
        for (let img of this.oImgs) {
          img.onclick = () => location.href = img.src;
        }
      })
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading;
    }
  },
}
</script>

<style lang="scss" scoped>

  .article-detail {
    position: relative;
    z-index: 1;
    height: 100%;
    padding: 8px 5px 0 5px;
    background-color: rgba(0, 0, 0, .07);
    overflow: auto;
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
            // padding-top: 2px;
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
