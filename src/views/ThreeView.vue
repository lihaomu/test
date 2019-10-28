<template>
  <pano title="123" width="720" height="480" bundle="static/pano/" format="jpg"></pano>
</template>

<script>
  import Pano from 'vue-pano'

  export default {
    name: 'ThreeView',
    components: { Pano },
    mounted () {

    }
  }
</script>