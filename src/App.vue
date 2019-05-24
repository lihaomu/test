<template>
    <div id="app">
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
        <div id="map" ref="map"></div>
        <o-input v-model="search" @on-enter="handleSearch" :style="styles"></o-input>
        <o-load type="dot" :visible="loading" fix></o-load>
    </div>
</template>

<script>
    import icon from './assets/marker.png'
    import loadBMapScript from './utils/loadBMapScript';

    import { isPc, isWeixin, isAndroid } from './utils/index'
    import Barrage from './utils/barrage'
    import dragSelect from './utils/dragSelect'
    import Time from './components/time/index';

    export default {
        components: { Time },
        data () {
            return {
                time: new Date('2019/5/15 16:47:22'),

                phone: null,
                title: null,
                description: null,

                barrage: null,
                value: '',

                map: null,
                search: '科苑北',
                loading: false,
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
            },
            styles () {
                return {
                    width: isPc ? '25%' : 'calc(100% - 40px)'
                }
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
            },
            handleSearch () {
                if (this.search) {
                    this.loading = true;
                    this.map.clearOverlays();

                    this.searchBus(this.search).then(res => {
                        this.addMarker(res);
                        this.map.setZoom(12);
                    })
                }
            },
            searchBus (data) {
                return new Promise(resolve => {
                    new BMap.LocalSearch('深圳', {
                        onSearchComplete: res => {
                            this.loading = false;

                            const length = res.getCurrentNumPois();
                            const result = new Array(length).fill(null)
                                .map((item, i) => res.getPoi(i))
                                .find(poi => poi.type === BMAP_POI_TYPE_BUSSTOP && poi.title === data);
                            result && resolve(result);
                        }
                    }).search(data);
                })
            },
            addMarker (data) {
                const points  = [];
                const busLine = new BMap.BusLineSearch(this.map, {
                    onGetBusListComplete: res => {
                        busLine.getBusLine(res.getBusListItem(0));
                    },
                    onGetBusLineComplete: res => {
                        const points = res.getPath();
                        const style = {
                            strokeWeight: 2,
                            strokeOpacity: .7,
                            strokeColor: '#' + (~~ (Math.random() * (1 << 24))).toString(16)
                        };

                        (async () => {
                            for (let i = 0; i < points.length - 1; i++) {
                                this.map.addOverlay(new BMap.Polyline(points.slice(i, i + 2), style));
                            }
                        })()



                        // const length = res.getNumBusStations();
                        // new Array(length).fill(null).forEach((item, i) => {
                        //     const busStation = res.getBusStation(i);
                        //     this.searchBus(busStation.name).then(res => {
                        //         this.addBusMarker(res);
                        //         points.push(res.point);
                        //     })
                        // })
                    }
                });

                const marker = new BMap.Marker(data.point);
                this.map.addOverlay(marker);
                this.map.panTo(data.point);

                const buses = data.address.replace(/\s*/g, '').split(';');
                const sleep = (delay) => new Promise(resolve => { setTimeout(resolve, 100 || delay) });

                (async () => {
                    for (let i = 0; i < buses.length; i++) {
                        await sleep(0);
                        busLine.getBusList(buses[i]);
                    }

                    // const { center } = this.map.getViewport(eval(points));
                    // this.map.panTo(center);
                })();
            },
            addBusMarker (data) {
                const busIcon = new BMap.Icon(icon, new BMap.Size(10,10))
                const marker  = new BMap.Marker(data.point, { icon: busIcon });
                marker.setTitle(data.title);
                this.map.addOverlay(marker);
            }
        },
        mounted () {
            if (this.$refs.live) this.barrage = new Barrage(this.$refs.live);
            if (this.$refs.map) {
                this.loading = true;
                loadBMapScript().then(() => {
                    this.map = new BMap.Map('map');
                    this.map.enableContinuousZoom();
                    this.map.enableScrollWheelZoom();
                    this.map.centerAndZoom('深圳', 18);

                    const geolocation = new BMap.Geolocation();
                    geolocation.getCurrentPosition(res => {
                        this.loading = false;
                        geolocation.getStatus() === BMAP_STATUS_SUCCESS
                            && this.map.panTo(res.point)
                    }, { enableHighAccuracy: true });
                })
            }
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
        min-height: calc(100vh);
        text-align: center;
        position: relative;
    }
    .divide-40 {
        height: 40px;
    }

    #map {
        height: 100vh;
        & + .leo-input {
            top: 20px;
            left: 20px;
            position: absolute;
        }
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
