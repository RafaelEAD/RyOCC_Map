// Inicializar el mapa
var map = L.map('map').setView([23.6345, -102.5528], 5); // Centro de México

// Agregar capa base
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Cargar los municipios
fetch('data/municipios.geojson')
    .then(response => response.json())
    .then(data => {
        L.geoJSON(data, {
            style: {
                color: '#FF0000',
                weight: 1,
                fillOpacity: 0.4
            },
            onEachFeature: function (feature, layer) {
                layer.bindPopup(`<b>${feature.properties.NOM_MUN}</b><br>
                                <button onclick="verDatos(${feature.properties.CVEGEO})">Ver datos</button>`);
            }
        }).addTo(map);
    });

// Función para abrir la nueva ventana con los datos del municipio seleccionado
function verDatos(cvegeo) {
    window.open(`datos/${cvegeo}/index.html`, '_blank');
}
