"use strict";

document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector(".search-bar");
    const search_input = document.querySelector("#search-input");
    const main_app = document.querySelector(".main-app");

    form.addEventListener("submit", submit_process);

    async function submit_process(event) {
        event.preventDefault();

        const fetch_link = `https://nominatim.openstreetmap.org/search?q=${location}&format=json`;
        
        try {

        } catch (error) {
            console.error('Error:', error);
        }

    }
    // async function weather_api(link){
        
    // }

    async function geolocation_api(link) {
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
