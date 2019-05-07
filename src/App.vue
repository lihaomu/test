<template>
    <div id="app">
        <Time :time="time"></Time>
        <br>
        <o-button type="text">
            <a :href="url" target="_blank">QQ客服</a>
        </o-button>
    </div>
</template>

<script>
    import { isPc, isWeixin, isAndroid } from './utils/index'

    import Time from './components/time/index';

    export default {
        components: { Time },
        data() {
            return {
                time: new Date('2019/3/27 15:47:38'),
            }
        },
        computed: {
            url() {
                if (isPc || isWeixin) {
                    return 'http://wpa.qq.com/msgrd?v=3&uin=2719901709&site=qq&menu=yes';
                } else {
                    return isAndroid
                        ? 'mqqwpa://im/chat?chat_type=wpa&uin=2719901709'
                        : 'mqq://im/chat?chat_type=wpa&uin=2719901709&version=1&src_type=web'
                }
            }
        }
    }
</script>

<style lang="less">

</style>
