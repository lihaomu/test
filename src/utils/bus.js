import loadBMapScript from './loadBMapScript';

class Bus {
    constructor (id = 'map', longitude = 114.06667, latitude = 22.61667, zoom = 18) {
        loadBMapScript().then(() => {
            this.map = new BMap.Map(id);
            this.map.enableContinuousZoom();
            this.map.enableScrollWheelZoom();
            this.map.centerAndZoom(new BMap.Point(longitude, latitude), zoom);

            const geolocation = new BMap.Geolocation();
            geolocation.getCurrentPosition(res => {
                if (geolocation.getStatus() === BMAP_STATUS_SUCCESS) {
                    this.map.panTo(res.point)
                }
            }, { enableHighAccuracy: true });
        })
    }
}

export default Bus;