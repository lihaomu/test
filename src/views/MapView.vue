<template>
    <div style="position: relative">
        <!--<o-load type="dot" :visible="loading" fix></o-load>-->
        <div id="map"></div>
        <!--<o-input v-model="search" clearable @on-enter="handleSearch" :style="styles"></o-input>-->
    </div>
</template>

<script>
    import { isPc } from '../utils/index';
    import icon from '../assets/marker.png';
    import loadBMapScript from '../utils/loadBMapScript';

    export default {
        name: 'MapView',
        data () {
            return {
                map: null,
                search: '科苑北',
                loading: false
            }
        },
        computed: {
            styles () {
                return {
                    width: isPc ? '25%' : 'calc(100% - 40px)'
                }
            }
        },
        methods: {
            send () {
                const value = this.value;
                this.value = '';

                value && this.barrage.shoot(value);
            },
            handleSearch () {
                // if (this.search) {
                    this.loading = true;
                    this.map.clearOverlays();

                    this.searchBus(this.search).then(res => {
                        this.addMarker(res);
                        this.map.setZoom(12);
                    })
                // }
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
</script>