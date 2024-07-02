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
        
        const search_output = document.getElementById("output")
  
    }

    function geolocation(link) {

    }
});
