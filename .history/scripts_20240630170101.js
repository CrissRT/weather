"use strict"
function submit_process(event) {
    console.log(event.target.value);
    // Validate form inputs
    const search_input = document.querySelectorAll('#search-input');
    const location = search_input[0].value;
    
    if (location.length === 0)    
        return

    console.log(location)
    fetch(`https://nominatim.openstreetmap.org/search?q=${location}&format=json`)
    .then(response => {
        return response.json();
    })
    .then(data => {
        console.log(data);
    })
    .catch(error => console.log("Error: ", error));



}