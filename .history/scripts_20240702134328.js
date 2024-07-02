"use strict";

const loaderContainer = document.querySelector('.loader-container');
window.addEventListener("load", () => {
    loaderContainer.style.display = 'none';
})

document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector(".search-bar");
    const search_input = document.querySelector("#search-input");
    const main_app = document.querySelector(".main-app");
    
    search_input.addEventListener("input", (e) => {
        const alert = document.querySelector(".alert-api");
        if (alert) alert.remove();
    })

    form.addEventListener("submit", submit_process);

    async function submit_process(event) {
        event.preventDefault();
        const city = search_input.value;

        // Get info from API
        const weather_data_from_api = weather_api_testing(city);
        if (parseInt(weather_data_from_api.co) !== 200 || weather_data_from_api.hasOwnProperty("message")) {
            loaderContainer.style.display = 'none';
            const alert_container = document.createElement("div");
            alert_container.classList.add("alert-api");
            alert_container.textContent = "Has been produced an error!";
            main_app.appendChild(alert_container);
            return;
        };
        
        document.querySelector(".all-info-container").style.display = "flex";

        const image = document.querySelector("img")
        if (weather_data_from_api.weather[0].description.includes("clear")){
            image.src = "./images/clear.png"
            image.alt = "Clear Sky";;
        }
        else if (weather_data_from_api.weather[0].description.includes("mist")){
            image.src = "./images/mist.png";
            image.alt = "Mist";
        }
        else if (weather_data_from_api.weather[0].description.includes("snow")){
            image.src = "./images/snow.png"
            image.alt = "Snow"
        }
        else if (weather_data_from_api.weather[0].description.includes("rain")){
            image.src = "./images/rain.png"
            image.alt = "Rain"
        }
        else if (weather_data_from_api.weather[0].description.includes("cloud")){
            image.src = "./images/cloud.png"
            image.alt = "Clouds"
        }

        // Add/remove classes from main_app div
        main_app.classList.add("display-weather-info");
        main_app.classList.remove("default-main-app");

        const city_country = document.querySelector(".city-country");
        city_country.textContent = `${weather_data_from_api.name}, ${weather_data_from_api.sys.country}`;

        const show_temperature = document.querySelector(".show-temperature-celsius");
        const celsius = 5/9 * (weather_data_from_api.main.temp-32);
        show_temperature.innerHTML = celsius.toFixed(2) + "<span>°C</span>";

        const weather_description = weather_data_from_api.weather[0].description;

        const weather_description_html_element = document.querySelector(".weather-description");
        weather_description_html_element.textContent = capitalize_each_first_letter_in_word(weather_description);
        
        const humidity_html_element = document.querySelector("#humidity-index");
        humidity_html_element.textContent = `${weather_data_from_api.main.humidity}%`;

        const wind_speed_html_element = document.querySelector("#wind-speed-index");
        wind_speed_html_element.textContent = `${weather_data_from_api.wind.speed} Km/s`;

        loaderContainer.style.display = 'none';
    }

    function weather_api_testing(city) {
        return new Error("asb")
        return (
            {
                coord: {
                  lon: -89.1028,
                  lat: 30.438
                },
                weather: [
                  {
                    id: 800,
                    main: "Clear",
                    description: "clear sky",
                    icon: "01n"
                  }
                ],
                base: "stations",
                main: {
                  temp: 49.46,
                  feels_like: 44.89,
                  temp_min: 45.68,
                  temp_max: 51.8,
                  pressure: 1030,
                  humidity: 59
                },
                visibility: 10000,
                wind: {
                  speed: 11.5,
                  deg: 50,
                  gust: 20.71
                },
                clouds: {
                  all: 0
                },
                dt: 1702548828,
                sys: {
                  type: 2,
                  id: 2015175,
                  country: "US",
                  sunrise: 1702557907,
                  sunset: 1702594622
                },
                timezone: -21600,
                id: 4429197,
                name: "Landon",
                cod: 200
              }
        )
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
            return error;
        }
    }
});

function capitalize_each_first_letter_in_word(string) {
    return string.split(' ').map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }).join(' ');
}