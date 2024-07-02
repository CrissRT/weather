"use strict";

document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector(".search-bar");
    
    form.addEventListener("submit", submit_process);

    function submit_process(event) {
        console.log(event);
        event.preventDefault();
        // Validate form inputs
        const search_input = document.querySelector('#search-input');
        const location = search_input.value;
        
        if (location.length === 0)    
            return;

        let coordinates = [];

        const fetch_link = `https://nominatim.openstreetmap.org/search?q=${location}&format=json`;
        
        const geolocation_data = geolocation(fetch_link);
        if (geolocation === null || geolocation === "")
        const search_output = document.getElementById("output")
  
    }

    function geolocation(link) {
        fetch(link)
        .then(response => response.json())
        .then(data => {
            return (data.length !== 0) 
                ? data.slice(0,4)
                    .map(location =>({lat: location.lat, lon: location.lon, name: location.display_name}))
                : return "";
                
            // search_output.innerHTML = coordinates.map(location => location.name).join("<br>");
        })
        .catch(error => {
            return error;
            // search_output.textContent = "An error occurred. Please try again.";
            // console.error('Error:', error);
        });
    }
});
