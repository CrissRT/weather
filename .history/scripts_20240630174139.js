// "use strict"
function submit_process() {
    // Validate form inputs
    const search_input = document.querySelectorAll('#search-input');
    const location = search_input[0].value;
    
    if (location.length === 0)    
        return

    let latitude = 0
    let longitude = 0;
    const fetch_link = `https://nominatim.openstreetmap.org/search?q=${location}&format=json`;
    
    fetch(fetch_link)
        .then(response => response.json())
        .then(data =>{
            document.getElementById("output").innerHTML = () => {
                if (data.length === 0) {
                    return "No results found. Please try again.";
                }
                return 
            }
        });



}