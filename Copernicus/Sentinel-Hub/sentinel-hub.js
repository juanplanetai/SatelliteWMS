mapboxgl.accessToken = 'pk.eyJ1IjoibWFmZWdvbnphbGV6IiwiYSI6ImNscnYyb3Z5MDBteGsya25hZWpmYTdsNzcifQ.3Rj3jRdf_iSTNOdT26iqUg';
    const map = new mapboxgl.Map({
        container: 'map',
        //maxZoom: 5.99,
        minZoom: 4,
        zoom: 11,
        center: [-75.789, 41.874],
        // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
        style: 'mapbox://styles/mapbox/dark-v11'
    });

    const INSTANCE_ID = "6cfcff16-7d83-45c8-a78f-7b81488fd4a1"
    const REQUEST = "GetMap"
    const TIME = "2020-01-01T09:02:44Z/2020-02-01T11:00:00Z"
    const BBOX = "-13152499,4038942,-13115771,4020692"
    const CRS = "EPSG:3857"
    const SRS = "EPSG:3857"
    const FORMAT = "image/png"
    const RSX = "20m"
    const RSY = "20m"
    const LAYERS = "NDWI"
    const EXCEPTIONS = "XML"
    const wms_image_url = `https://sh.dataspace.copernicus.eu/ogc/wms/${INSTANCE_ID}?REQUEST=${REQUEST}&`+
            `TIME=${TIME}&`+
            `BBOX=${BBOX}&CRS=${CRS}&SRS=${SRS}&`+
            `RESX=${RSX}&RESY=${RSY}&`+
            `LAYERS=${LAYERS}&`+
            `EXCEPTIONS=${EXCEPTIONS}`
    console.log("everything running")
    console.log(wms_image_url)
    map.on('load', () => {
        map.addSource('radar', {
            'type': 'image',
            'url': wms_image_url,
            'coordinates': [
                [-80.425, 46.437],
                [-71.516, 46.437],
                [-71.516, 37.936],
                [-80.425, 37.936]
            ]
        });
        map.addLayer({
            id: 'radar-layer',
            'type': 'raster',
            'source': 'radar',
            'paint': {
                'raster-fade-duration': 0
            }
        });
    });