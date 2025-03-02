document.addEventListener("DOMContentLoaded", function() {
    console.log("Script cargado correctamente");

    var map = L.map('map').setView([25.6866, -100.3161], 6);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    console.log("Mapa inicializado correctamente");
});
