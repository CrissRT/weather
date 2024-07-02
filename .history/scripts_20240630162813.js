"use strict"
function submit_process() {
    // Validate form inputs
    const search_input = document.querySelectorAll('#search-input');
    const text_search_input = search_input[0].value;
    
    if (text_search_input.length === 0)    
        return

    const fetchDataGeoLocation = async () => {
        const response = await fetch(
          
        );
        const data = await response.json();
        console.log(data);
      };
}