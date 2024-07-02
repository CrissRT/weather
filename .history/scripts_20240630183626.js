"use strict";

document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector(".search-bar");
    
    form.addEventListener("submit", submit_process);

    function submit_process(event) {
        console.log(event.target.name);
        event.preventDefault();
        const suggestion_output = document.getElementById("output");
        const main_app = document.getElementById(".main-app");
        const search_input = document.querySelector('#search-input');
        const location = search_input.value;
        
        if (location.length === 0)    
            return;

        const fetch_link = `https://nominatim.openstreetmap.org/search?q=${location}&format=json`;
        
        const geolocation_data = geolocation(fetch_link);
        if (geolocation_data === null || typeof geolocation_data === "function"){
            suggestion_output.innerHTML = "No results found";
            return;
        }

        suggestion_output.innerHTML = coordinates.map(location => location.name).join("<br>");
        main
          
    }

    function geolocation(link) {
        fetch(link)
        .then(response => response.json())
        .then(data => {
            return (data.length !== 0) 
                ? data.slice(0,4)
                    .map(location =>({lat: location.lat, lon: location.lon, name: location.display_name}))
                : null;
        })
        .catch(error => {
            return error;
        });
    }
});
