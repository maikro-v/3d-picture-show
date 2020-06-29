<template>
  <div class="page" id="page">
    <h1 class="title">开云旅美书画集</h1>
    <div
      class="swiper"
      :style="{
        transform: `translate3d(0, -24px, -350px) rotateY(${deg}deg)`
      }"
    >
      <div
        v-for="(item, index) in imgList"
        :key="index"
        class="swiper__item"
        :style="toStyle(index)"
      >
        <div class="picture">
          <img :src="item.url" class="picture__img">
          <p class="picture__text">{{ item.name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AlloyFinger from 'alloyfinger'
export default {
  data() {
    return {
      imgList: [],
      deg: 0,
      speed: 0.1,
      af: null, // 手势库实例
      position: 1 // 方向 1顺时针 0逆时针
    }
  },
  created() {
    this.createImgList()
  },
  mounted() {
    this.runAnimation()
    this.createEvent()
  },
  methods: {
    createEvent() {
      let detaultDeg = 0
      let startX = 0
      let endX = 0
      const af = new AlloyFinger('#page', {
        touchStart: (e) => {
          detaultDeg = this.deg
          startX = e.touches[0].screenX
          cancelAnimationFrame(this.af)
        },
        touchMove: (e) => {
          endX = e.touches[0].screenX
          this.deg = (endX - startX) / 4 + detaultDeg
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
        if (this.deg >= 360) {
          this.deg = 0
        }
        this.deg = this.position === 1 ? this.deg + (-this.speed) : this.deg + this.speed
        this.runAnimation()
      })
    },
    createImgList() {
      const arr = []
      for (let i = 1; i <= 6; i += 1) {
        arr.push({
          url: require(`@img/img/${i}.jpg`),
          name: `画展${i}`
        })
      }
      this.imgList = arr
    },
    toStyle(index) {
      const deg = Math.floor(360 / this.imgList.length)
      return {
        transform: `rotateY(${deg * index}deg) translateZ(310px)`
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .page {
    position: relative;
    perspective: 1200px;
    background: #f2f3f3;
    overflow: hidden;
  }
  .title {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
  }
  .swiper {
    position: relative;
    width: 750px;
    height: 100vh;
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
    margin: 300px auto 0;
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
