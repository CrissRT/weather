"use strict"
function submit_process() {
    // Validate form inputs
    const search_input = document.querySelectorAll('#search-input');
    const location = search_input[0].value;
    
    if (location.length === 0)    
        return

    fetch(`https://nominatim.openstreetmap.org/search?q=${location}&format=json`)
    .then(response => response.json())
    .then(data => {
        console.log(data)
    })
    .catch(error =>console.log("Error ", error)
    )


}