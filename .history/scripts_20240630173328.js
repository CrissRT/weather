// "use strict"
document.getElementById("output").innerHTML = "zagluska";
function submit_process() {
    // Validate form inputs
    const search_input = document.querySelectorAll('#search-input');
    const location = search_input[0].value;
    
    if (location.length === 0)    
        return

    const fetch_link = `https://nominatim.openstreetmap.org/search?q=${location}&format=json`;

    fetch("https://nominatim.openstreetmap.org/search?country=SG&format=json")
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        response.json();
    })
    .then(data => {
        console.log(data);
        document.getElementById("output").innerHTML = data;
    })
    .catch(error => {
        document.getElementById("output").innerHTML = "Error: " + error.message;
        console.error('There was a problem with the fetch operation:', error);
    });



}