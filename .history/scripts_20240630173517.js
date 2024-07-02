// "use strict"
function submit_process() {
    // Validate form inputs
    const search_input = document.querySelectorAll('#search-input');
    const location = search_input[0].value;
    
    if (location.length === 0)    
        return

    const fetch_link = `https://nominatim.openstreetmap.org/search?q=${location}&format=json`;

    fetch(fetch_link)
    .then(response => response.json())
    .then(data => {
        document.getElementById("output").innerHTML = data;
    })
    .catch(error => {
        document.getElementById("output").innerHTML = "Error: " + error.message;
        console.error('There was a problem with the fetch operation:', error);
    });



}