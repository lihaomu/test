<template>
  <div ref="live" class="live">
    <div class="live-form">
      <o-form size="small" :labelWidth="0">
        <o-form-item>
          <o-input v-model="value" @on-enter="send"></o-input>
          <o-button
              @on-click="send"
              custom="primary"
              type="text">
            发送
          </o-button>
        </o-form-item>
      </o-form>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'LiveView',
    data () {
      return {
        value: ''
      }
    },
    methods: {
      send () {
        if (this.value) {
          this.$Barrage.shoot(this.value, true);
          this.value = '';
        }
      }
    },
    mounted () {
      this.$Barrage.init(this.$refs.live);
    }
  }
</script>