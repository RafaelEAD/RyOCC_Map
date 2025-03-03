document.addEventListener("DOMContentLoaded", function () {
    var map = L.map('map').setView([23.6345, -102.5528], 5);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    fetch('data/municipios.geojson')
        .then(response => response.json())
        .then(data => {
            L.geoJSON(data, {
                onEachFeature: function (feature, layer) {
                    layer.bindPopup(`<b>${feature.properties.NOM_MUN}</b><br>
                    <button onclick="verDatos('${feature.properties.CVEGEO}')">Ver datos</button>`);
                }
            }).addTo(map);
        })
        .catch(error => console.error('Error cargando municipios:', error));
});

function verDatos(cvegeo) {
    window.open(`datos/${cvegeo}/index.html`, '_blank');
}
