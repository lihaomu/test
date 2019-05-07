<template>
  <div id="app">
    <Time :time="time"></Time>

    <a target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=2719901709&site=qq&menu=yes">
      QQ客服
    </a>
  </div>
</template>

<script>
  import Time from './components/time/index';

  export default {
    components: { Time },
    data () {
      return {
        time: new Date('2019/3/27 15:47:38'),
      }
    }
  }
</script>

<style lang="less">

</style>
