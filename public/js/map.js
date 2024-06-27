mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v9",
  // projection: 'globe', // Display the map as a globe, since satellite-v9 defaults to Mercator
  center: coordinates,
  zoom: 3,
});

console.log(coordinates);


const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
  `<h3>Exact location will be provided after booking</h3>`
);


const marker1 = new mapboxgl.Marker({ color: "red" })
  .setLngLat(coordinates)
  .setPopup(popup)
  .addTo(map);
