<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
    import Time from './components/time/index';

    export default {
        components: { Time },
        data () {
            return {

            }
        },
        methods: {

        }
    }
</script>

<style lang="less">
    body {
        font-size: 14px;
        background-color: #fff6e4;
    }
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        min-height: calc(100vh);
        text-align: center;
        position: relative;
    }
</style>
