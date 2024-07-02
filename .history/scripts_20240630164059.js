"use strict"
function submit_process() {
    // Validate form inputs
    const search_input = document.querySelectorAll('#search-input');
    const location = search_input[0].value;
    
    if (location.length === 0)    
        return
    
    function fetchDataLocation(){
        const response = fetch(
          `https://nominatim.openstreetmap.org/search?q=${location}&format=json`
        );
        const data = response.json();
        console.log(data);
    };

    fetchDataLocation();

}