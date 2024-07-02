"use strict";

const loaderContainer = document.querySelector('.loader-container');
window.addEventListener("load", () => {
    loaderContainer.style.display = 'none';
})

document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector(".search-bar");
    const search_input = document.querySelector("#search-input");
    const main_app = document.querySelector(".main-app");

    form.addEventListener("submit", submit_process);

    async function submit_process(event) {
        event.preventDefault();
        const city = search_input.value;

        // Get info from API
        const weather_data_from_api = await weather_api(city);
        if (weather_data_from_api.cod !== "200" || weather_api.hasOwnProperty("message")) {
            loaderContainer.style.display = 'none';
            const alert_container = document.createElement("div");
            alert_container.classList.add("alert-api")
            return;
        };

        // Add/remove classes from main_app div
        main_app.classList.add("display-weather-info");
        main_app.classList.remove("default-main-app");

        // Add wrapper for all added elements
        const wrapper_for_all_weathor_info_html_element = document.createElement("div");
        wrapper_for_all_weathor_info_html_element.classList.add("all-info-container")

        const h2 = document.createElement("h2");
        h2.textContent = `${weather_data_from_api.name}, ${weather_data_from_api.sys.country}`;

        const h3 = document.createElement("h3");
        const celsius = 5/9 * (weather_data_from_api.main.temp-32);
        h3.innerHTML = celsius.toFixed(2) + "<span>°C</span>";

        const weather_description = weather_data_from_api.weather[0].description;

        const weather_description_html_element = document.createElement("p");
        weather_description_html_element.textContent = capitalize_each_first_letter_in_word(weather_description);
        
        const wrapper_additional_weather_info_html_element = document.createElement("div"); //Using for wrapping humidity, wind speed, etc.
        const humidity_html_element = document.createElement("p");
        humidity_html_element.textContent = `${weather_data_from_api.main.humidity}%`;
        
        wrapper_additional_weather_info_html_element.appendChild(humidity_html_element)

        const querry_wrapper_all_info = document.querySelector(".all-info-container");
        if (querry_wrapper_all_info !== null){
            querry_wrapper_all_info.innerHTML = "";
        }

        wrapper_for_all_weathor_info_html_element.appendChild(h2);
        wrapper_for_all_weathor_info_html_element.appendChild(h3);
        wrapper_for_all_weathor_info_html_element.appendChild(weather_description_html_element)
        wrapper_for_all_weathor_info_html_element.appendChild(wrapper_additional_weather_info_html_element);

        loaderContainer.style.display = 'none';
        main_app.appendChild(wrapper_for_all_weathor_info_html_element)
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
            loaderContainer.style.display = 'flex';
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

function capitalize_each_first_letter_in_word(string) {
    return string.split(' ').map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }).join(' ');
}