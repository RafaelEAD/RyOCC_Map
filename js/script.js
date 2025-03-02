// js/script.js

// Inicializar el mapa
var map = L.map('map').setView([25.6866, -100.3161], 6); // Coordenadas iniciales (Monterrey)

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Función para cargar datos GeoJSON de municipios
document.addEventListener("DOMContentLoaded", function() {
    fetch('data/municipios.geojson')
        .then(response => response.json())
        .then(data => {
            L.geoJSON(data, {
                onEachFeature: function (feature, layer) {
                    var popupContent = `<b>${feature.properties.name}</b><br/>` +
                                       `Riesgo: ${feature.properties.riesgo}<br/>` +
                                       `<a href="datos.html?CVEGEO=${feature.properties.CVEGEO}" target="_blank">Ver datos</a>`;
                    layer.bindPopup(popupContent);
                },
                style: function(feature) {
                    return {
                        color: '#000',
                        weight: 1,
                        fillColor: getColor(feature.properties.riesgo),
                        fillOpacity: 0.7
                    };
                }
            }).addTo(map);
        });
});

// Función para asignar colores según el nivel de riesgo
function getColor(riesgo) {
    return {
        'Alto': '#d73027',
        'Medio': '#fc8d59',
        'Bajo': '#91cf60'
    }[riesgo] || '#cccccc';
}
