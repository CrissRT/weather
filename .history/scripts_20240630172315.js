// "use strict"
function submit_process() {
    // Validate form inputs
    const search_input = document.querySelectorAll('#search-input');
    const location = search_input[0].value;
    
    if (location.length === 0)    
        return

    const fetch_data = `https://nominatim.openstreetmap.org/search?q=${location}&format=json`;
    console.log(location)
    fetch(fetch_data)
    .then(response =>response.json())
    .then(data => {
        console.log(data[0].display_name)
    })
    .catch(error => console.log("Error: ", error));



}