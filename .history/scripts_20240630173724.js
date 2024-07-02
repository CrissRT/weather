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
        .then(function (data) {
            latitude = data[0].lat;
            longitude = data[0].lon;
        });
    console.log(latitude);
    console.log(longtitude);



}