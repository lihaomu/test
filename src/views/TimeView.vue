<template>
  <div>
    <Time :value="time"></Time>
  </div>
</template>

<script>
  import Time from '../components/time/index'

  export default {
    name: 'TimeView',
    components: { Time },
    data () {
      return {
        time: new Date('2019/8/14 15:19:00'),
      }
    },
    methods: {},
  }
</script>