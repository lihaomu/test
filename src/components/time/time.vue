<template>
  <span>{{ date }}</span>
</template>
<script>
  import Time from './time';

  export default {
    name: 'Time',
    props: {
      time: {
        type: [Number, Date, String],
        required: true
      }
    },
    data() {
      return {
        date: '',
        timer: null
      }
    },
    computed: {},
    methods: {
      setTime() {
        const type = typeof this.time;
        let time;

        console.log(type)
        if (type === 'number') {
          const timestamp = this.time.toString().length > 10 ? this.time : this.time * 1000;
          time = (new Date(timestamp)).getTime()
        } else if (type === 'object') {
          time = this.time.getTime()
        } else if (type === 'string') {
          time = (new Date(this.time)).getTime()
        }

        this.date = Time(time);
      }
    },
    mounted() {
      this.setTime();
      this.timer = setInterval(this.setTime, 1000)
    },
    beforeDestroy() {
      if (this.timer) clearInterval(this.timer)
    }
  }
</script>