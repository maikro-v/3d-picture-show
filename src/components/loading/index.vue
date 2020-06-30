<template>
  <div class="loading">
    <div class="content">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
  .loading {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    /*background: rgba(0, 0, 0, .6);*/
    font-size: 30px;
    color: white;
    z-index: 9999;
  }
  .content {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    span{
      display: inline-block;
      width: 16px;
      height: 100%;
      border-radius: 8px;
      background: lightgreen;
      -webkit-animation: load 1s ease infinite;
      margin-right: 10px;
    }
    @-webkit-keyframes load{
      0%,100%{
        height: 80px;
        background: lightgreen;
      }
      50%{
        height: 140px;
        margin: -30px 10px -30px 0;
        background: lightblue;
      }
    }
    span:nth-child(2){
      -webkit-animation-delay:0.2s;
    }
    span:nth-child(3){
      -webkit-animation-delay:0.4s;
    }
    span:nth-child(4){
      -webkit-animation-delay:0.6s;
    }
    span:nth-child(5){
      -webkit-animation-delay:0.8s;
    }
  }
</style>
