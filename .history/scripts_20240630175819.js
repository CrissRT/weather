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

        const fetch_link = `https://nominatim.openstreetmap.org/search?q=${location}&format=json`;
        
        fetch(fetch_link)
            .then(response => response.json())
            .then(data => {
                document.getElementById("output").innerHTML = (data.length === 0) 
                    ? "No results found. Please try again." 
                    : data.map(location, index => {
                        index >= 5 return
                    }).join('<br>');
            })
            .catch(error => {
                document.getElementById("output").innerHTML = "An error occurred. Please try again.";
                console.error('Error:', error);
            });
    }
});
