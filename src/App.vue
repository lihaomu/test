<template>
    <div id="app">
        <div id="map"></div>
        <!--<Time :value="time"></Time>-->
        <!--<div class="divide-40"></div>-->
        <!--<o-button type="text">-->
            <!--<a :href="url" target="_blank">QQ客服 {{ url }}</a>-->
        <!--</o-button>-->
        <!--<o-form>-->
            <!--<o-form-item label="手机号码">-->
                <!--<o-input v-model="phone"></o-input>-->
            <!--</o-form-item>-->
            <!--<o-form-item label="主题">-->
                <!--<o-input v-model="title"></o-input>-->
            <!--</o-form-item>-->
            <!--<o-form-item label="内容">-->
                <!--<o-input type="textarea" v-model="description"></o-input>-->
            <!--</o-form-item>-->
            <!--<o-form-item>-->
                <!--<o-button type="shadow" @on-click="advisory">确定</o-button>-->
            <!--</o-form-item>-->
        <!--</o-form>-->
        <!--<div class="divide-40"></div>-->
        <!--<div ref="live" class="live">-->
            <!--<div class="live-form">-->
                <!--<o-form size="small" :labelWidth="0">-->
                    <!--<o-form-item>-->
                        <!--<o-input v-model="value" @on-enter="send"></o-input>-->
                        <!--<o-button-->
                                <!--@on-click="send"-->
                                <!--custom="primary"-->
                                <!--type="text">-->
                            <!--发送-->
                        <!--</o-button>-->
                    <!--</o-form-item>-->
                <!--</o-form>-->
            <!--</div>-->
        <!--</div>-->
        <!--<div class="divide-40"></div>-->
        <!--<div class="test" v-drag-select="{ selector: 'div.test-item', className: ['active'] }">-->
            <!--<div class="test-item" v-for="(item, i) in list">测试-{{ i }}</div>-->
        <!--</div>-->
    </div>
</template>

<script>
    import Bus from './utils/bus'
    import { isPc, isWeixin, isAndroid } from './utils/index'
    import Barrage from './utils/barrage'
    import dragSelect from './utils/dragSelect'

    import Time from './components/time/index';

    new Bus()

    export default {
        components: { Time },
        data () {
            return {
                time: new Date('2019/5/15 16:47:22'),

                phone: null,
                title: null,
                description: null,

                barrage: null,
                value: ''
            }
        },
        computed: {
            url () {
                if (isPc || isWeixin) {
                    return 'http://wpa.qq.com/msgrd?v=3&uin=2719901709&site=qq&menu=yes';
                } else {
                    return isAndroid
                        ? 'mqqwpa://im/chat?chat_type=wpa&uin=2719901709'
                        : 'mqq://im/chat?chat_type=wpa&uin=2719901709&version=1&src_type=web'
                }
            },
            list () {
                return new Array(10).fill(null)
            }
        },
        directives: {
            dragSelect
        },
        methods: {
            advisory () {
                let Advisory = AV.Object.extend('Advisory');
                let advisory = new Advisory();
                advisory.set('phone', this.phone);
                advisory.set('title', this.title);
                advisory.set('description', this.description);
                advisory.save().then(res => {
                    console.log(res);
                }, error => {
                    console.log(error);
                });
            },
            send () {
                const value = this.value;
                this.value = '';

                value && this.barrage.shoot(value);
            },
            dragSelected (elements) {
                console.log(elements);
            }
        },
        mounted () {
            if (this.$refs.live) this.barrage = new Barrage(this.$refs.live);
        }
    }
</script>

<style lang="less">
    * {
        box-sizing: border-box;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    }
    *:before,
    *:after {
        box-sizing: border-box;
    }
    body {
        margin: 0;
        padding: 0;
        font-size: 14px;
    }
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        min-height: calc(100vh);
    }
    .divide-40 {
        height: 40px;
    }

    #map {
     height: 100vh;
    }
    .live {
        width: 900px;
        height: 500px;
        margin: 0 auto;
        overflow: hidden;
        position: relative;
        border-radius: 5px;
        background-color: #eee;
        border: 1px solid #d2d2d2;
        &-form {
            left: 50%;
            bottom: 0;
            width: 400px;
            position: absolute;
            transform: translateX(-50%);
            .leo-button {
                right: 0;
                position: absolute;
            }
        }
    }

    .leo-drag-select {
        opacity: 0;
        position: fixed;
        background: #598fe6;
        transition: opacity .5s;
        &.visible {
            opacity: .6;
        }
    }

    .test {
        padding: 20px;
        user-select: none;
        border: 1px dashed #ccc;
        .test-item {
            padding: 0 10px;
            line-height: 26px;
            &.active {
                background-color: rgba(89, 143, 230, .2);
            }
        }
    }
</style>
