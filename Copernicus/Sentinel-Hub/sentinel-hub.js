
const lat = 2.771047, lon = -69.371827;

function epsg4326toEpsg3857_lat(latitude) {
    let y = 0;
    y =
      Math.log(Math.tan(((90 + latitude) * Math.PI) / 360)) /
      (Math.PI / 180);
    y = (y * 20037508.34) / 180;
    return y;
  }

function epsg4326toEpsg3857_lon(longitude) {
    let x = 0;
    x = (longitude * 20037508.34) / 180;
    return x;
  }

mapboxgl.accessToken = 'pk.eyJ1IjoibWFmZWdvbnphbGV6IiwiYSI6ImNscnYyb3Z5MDBteGsya25hZWpmYTdsNzcifQ.3Rj3jRdf_iSTNOdT26iqUg';
    const map = new mapboxgl.Map({
        container: 'map',
        //maxZoom: 5.99,
        minZoom: 4,
        zoom: 14,
        center: [lon, lat],
        // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
        style: 'mapbox://styles/mapbox/dark-v11'
    });

    
    const coords = {north: lat+0.01,
        south: lat-0.01,
        west: lon-0.01,
        east: lon+0.02
    }

    
    console.log(epsg4326toEpsg3857_lon(coords.west))

    const INSTANCE_ID = "6cfcff16-7d83-45c8-a78f-7b81488fd4a1"
    const REQUEST = "GetMap"
    const TIME = "2023-01-15"
    //const BBOX = `${coords.west},${coords.north},${coords.east},${coords.south}`
    const BBOX = `${epsg4326toEpsg3857_lon(coords.west)}`+
    `,${epsg4326toEpsg3857_lat(coords.north)}`+
    `,${epsg4326toEpsg3857_lon(coords.east)}`+
    `,${epsg4326toEpsg3857_lat(coords.south)}`
    const CRS = "EPSG:3857"
    const SRS = "EPSG:3857"
    const FORMAT = "image/png"
    const RSX = "10m"
    const RSY = "10m"
    const LAYERS = "NDWI"
    const EXCEPTIONS = "XML"
    const wms_image_url = `https://sh.dataspace.copernicus.eu/ogc/wms/${INSTANCE_ID}?REQUEST=${REQUEST}&`+
            `TIME=${TIME}&`+
            `BBOX=${BBOX}&CRS=${CRS}&SRS=${SRS}&`+
            `RESX=${RSX}&RESY=${RSY}&`+
            `LAYERS=${LAYERS}&`+
            `EXCEPTIONS=${EXCEPTIONS}`
    map.on('load', () => {
        map.addSource('radar', {
            'type': 'image',
            'url': wms_image_url,
            'coordinates': [
                [coords.west, coords.north],
                [coords.east, coords.north],
                [coords.east, coords.south],
                [coords.west, coords.south]
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