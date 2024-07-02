"use strict";

document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector(".search-bar");
    const search_input = document.querySelector("#search-input");
    const main_app = document.querySelector(".main-app");

    form.addEventListener("submit", submit_process);

    async function submit_process(event) {
        event.preventDefault();
        const city = search_input.value;
        const weather_data_from_api = await weather_api(city);
        if (weather_data_from_api.cod === "404") return;

        main_app.classList.add("display-weather-info");
        main_app.classList.remove("default-main-app");


        const h2 = document.createElement("h2");
        h2.textContent = `Weather for ${weather_data_from_api.name}, ${weather_data_from_api.sys.country}`;

        const h3 = document.createElement("h3");
        const celsius = 5/9 * (weather_data_from_api.main.temp-32);
        h3.innerHTML = celsius.toFixed(2) + "<span>°C</span>";


        const additional_weather_info_html_element = document.createElement("div");

        
        const description_weather = weather_data_from_api.weather[0].description;
        


        const humidity_html_element = document.createElement("p");
        humidity_html_element.textContent = `${weather_data_from_api.main.humidity}%`;
        

        additional_weather_info_html_element.appendChild(humidity_html_element)
        
        main_app.appendChild(h2);
        main_app.appendChild(h3);

    }

    async function weather_api(city) {
        const url = `https://open-weather13.p.rapidapi.com/city/${city}/EN`;
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': '3adda9cc97msh50c1d4ca1df9cfbp144d4bjsn0d3b57c64786',
                'x-rapidapi-host': 'open-weather13.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json();
            console.log(result);
            return result;
        } catch (error) {
            console.error(error);
            throw (error);
        }
    }
});
