<template>
  <div class="page" id="page">
    <loading v-if="loading" />
    <div v-else>
<!--      <h1 class="title">-->
<!--        开云旅美书画集-->
<!--      </h1>-->
      <div
        class="swiper"
        :style="{
          transform: `translate3d(0, -1.8rem, -8rem) rotateY(${deg}deg)`
        }"
      >
        <div
          v-for="(item, index) in imgList"
          :key="index"
          class="swiper__item"
          :style="toStyle(index, 6)"
        >
          <div class="picture">
            <img :src="item.url" class="picture__img">
            <p class="picture__text">{{ item.name }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AlloyFinger from 'alloyfinger'
import loading from '@/components/loading'
export default {
  components: { loading },
  data() {
    return {
      loading: true,
      imgList: [],
      imgCount: 35, // 图片总数
      deg: 0, // 当前旋转的角度
      speed: 0.1, // 旋转速度
      page: 0, // 当前页数
      totalPage: 35 / 6, // 总页数
      position: 1, // 方向 1顺时针 0逆时针
      af: null // 手势库实例
    }
  },
  async created() {
    await this.loadImgs()
    this.updateImgList()
    this.loading = false
  },
  mounted() {
    this.runAnimation()
    this.createEvent()
  },
  watch: {
    deg(val) {
      const progress = Math.floor(Math.abs(val))
      if (progress === 0) return
      if (progress % 360 === 0) {
        this.deg = 0
        this.page += 1
        this.updatePage()
      }
    },
    page(val) {
      this.updateImgList()
    }
  },
  methods: {
    updatePage() {
      if (this.page > this.totalPage) {
        this.page = 0
      }
    },
    loadImgs() {
      return new Promise((resolve) => {
        let index = 0
        for (let i = 0; i < this.imgCount; i += 1) {
          const img = new Image()
          img.onload = () => {
            index += 1
            if (index >= this.imgCount) {
              resolve()
            }
          }
          img.src = require(`@img/img/${i}.jpg`)
        }
      })
    },
    createEvent() {
      let detaultDeg = 0
      let startX = 0
      let endX = 0
      let defaultPage = 0
      const af = new AlloyFinger('#page', {
        touchStart: (e) => {
          detaultDeg = this.deg
          startX = e.touches[0].screenX
          defaultPage = this.page
          cancelAnimationFrame(this.af)
        },
        touchMove: (e) => {
          e.preventDefault()
          endX = e.touches[0].screenX
          const deg = (endX - startX) / 4 + detaultDeg
          let page = Math.floor(Math.abs(deg) / 360)
          if (page < 0) {
            page = 0
          }
          this.page = defaultPage + page
          this.deg = Math.floor(deg) % 360
          this.updatePage()
        },
        touchEnd: () => {
          this.deg = this.deg % 360
          this.position = startX > endX ? 1 : 0
          this.runAnimation()
        }
      })
      af.on('tap', this.handleTap)
    },
    handleTap(e) {
      const target = e.target
      if (target.className.indexOf('picture__img') !== -1) {
        window.open(target.src)
      }
    },
    runAnimation() {
      this.af = requestAnimationFrame(() => {
        this.deg = this.position === 1 ? this.deg + (-this.speed) : this.deg + this.speed
        this.runAnimation()
      })
    },
    updateImgList() {
      this.imgList = this.createImg()
    },
    createImg(len = 6) {
      const arr = []
      let i = 0
      for (i = 0; i < len; i += 1) {
        const current = i + (len * this.page)
        const obj = {
          id: current,
          url: require(`@img/img/${current}.jpg`),
          name: `画展${current + 1}`
        }
        arr.push(obj)
      }
      return arr
    },
    toStyle(index, len) {
      const deg = Math.floor(360 / len)
      return {
        transform: `rotateY(${deg * index}deg) translateZ(6.48rem)`
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .page {
    position: relative;
    width: 100vw;
    height: 100vh;
    perspective: 1200px;
    background: #f2f3f3;
    overflow: hidden;
  }
  .title {
    position: absolute;
    top: 170px;
    left: 0;
    z-index: 9999;
    font-size: 46px;
    color: #3e3938;
    font-weight: 500;
    animation: textScroll 8s linear infinite;
    text-align: center;
    transform: translateZ(702px);
  }
  @keyframes textScroll {
    from {
      transform: translateX(-100%);
    }
    to {
      transform: translateX(calc(100vw));
    }
  }
  .swiper {
    position: relative;
    width: 750px;
    height: 18rem;
    transform-style: preserve-3d;
    &__item {
      position: absolute;
      width: 7.5rem;
      height: 100%;
      top: 0;
      left: 0;
      background: url("~@img/bg.jpg") no-repeat center top / 100%;
      transform-origin: 50% 50%;
    }
  }
  .picture {
    width: 422px;
    margin: 500px auto 0;
    &__img {
      width: 100%;
      border: 12px solid #292929;
      background: #f7f1e3;
      padding: 40px;
      box-shadow: 0 0 30px 6px rgba(0, 0, 0, .3);
      display: block;
    }
    &__text {
      font-size: 40px;
      color: #292929;
      text-align: center;
      margin-top: 46px;
    }
  }
</style>
