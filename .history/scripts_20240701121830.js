"use strict";

document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector(".search-bar");
    const suggestion_output = document.getElementById("suggestions");
    const search_input = document.querySelector("#search-input");
    const main_app = document.querySelector(".main-app");

    search_input.addEventListener("input", clear_input);
    form.addEventListener("submit", submit_process);
    
    function clear_input() {
        console.log(main_app.classList);
        main_app.classList.add("default-main-app");
        main_app.classList.remove("suggestions-on-main-app");
        suggestion_output.style.display = "none";
        suggestion_output.innerHTML = "";
    }

    async function submit_process(event) {
        event.preventDefault();
        const search_input = document.querySelector('#search-input');
        const location = search_input.value;
        
        if (location.length === 0)    
            return;

        const fetch_link = `https://nominatim.openstreetmap.org/search?q=${location}&format=json`;
        
        try {
            const geolocation_data = await geolocation_api(fetch_link);
            if (geolocation_data === null) {
                suggestion_output.innerHTML = "No results found";
                return;
            }

            suggestion_output.innerHTML = geolocation_data.map(location => `<li class="locations" key="${location.name}">${location.name}</li>`).join("");
            main_app.classList.add("suggestions-on-main-app");
            main_app.classList.remove("default-main-app");
            suggestion_output.style.display = "block";

        } catch (error) {
            suggestion_output.innerHTML = "An error occurred. Please try again.";
            console.error('Error:', error);
        }

    }

    async function addEventsListenersToListTags(){
        const locations_data_tags = document.querySelectorAll(".locations");

        for (data in locations_data_tags) {
            data.addEventListener("click", () => {
                main_app.classList.add("default-main-app");
                main_app.classList.remove("suggestions-on-main-app");
                suggestion_output.style.display = "none";
                suggestion_output.innerHTML = "";
                
                const location_data = data.target.innerText;
                search_input.value = location_data;
                
                const fetch_weather_link = `https://api.open-meteo.com/v1/forecast?latitude=${data.lat}&longitude=${data.lon}&current=temperature_2m,wind_speed_10m&hourly=precipitation_probability&forecast_days=1`;
                
                try {
                    const weather_data = await weather_api(fetch_weather_link);
                    const { name, main, weather } = weather_data;
                    const { temp, humidity } = main;
                    const { description } = weather[0];
                }
                catch (error) {

                }
        })
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
