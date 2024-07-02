"use strict";

document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector(".search-bar");

    const search_input = document.querySelector("#search-input");

    search_input.addEventListener("input", change_input_search);

    function change_input_search(){
        const suggestion_output = document.getElementById("suggestions");
        suggestion_output.innerHTML = "";
        const main_app = document.querySelector(".main-app");
        main_app.classList.add("default-main-app").remove("suggestions-on-main-app");

        suggestion_output.style.display = "none";
    }
    
    form.addEventListener("submit", submit_process);

    async function submit_process(event) {
        event.preventDefault();
        const suggestion_output = document.getElementById("suggestions");
        const main_app = document.querySelector(".main-app");
        const search_input = document.querySelector('#search-input');
        const location = search_input.value;
        
        if (location.length === 0)    
            return;

        const fetch_link = `https://nominatim.openstreetmap.org/search?q=${location}&format=json`;
        
        try {
            const geolocation_data = await geolocation(fetch_link);
            if (geolocation_data === null) {
                suggestion_output.innerHTML = "No results found";
                return;
            }

            suggestion_output.innerHTML = geolocation_data.map(location => `<li>${location.name}</li>`);
            main_app.style.height = "fit-content";
        } catch (error) {
            suggestion_output.innerHTML = "An error occurred. Please try again.";
            console.error('Error:', error);
        }
    }

    async function geolocation(link) {
        try {
            const response = await fetch(link);
            const data = await response.json();
            return (data.length !== 0) 
                ? data.slice(0, 4).map(location => ({
                    lat: location.lat,
                    lon: location.lon,
                    name: location.display_name
                }))
                : null;
        } catch (error) {
            console.error('Error:', error);
            throw new Error(error);
        }
    }
});
