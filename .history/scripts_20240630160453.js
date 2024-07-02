"use strict"
function submit_process() {
    // Validate form inputs
    const search_input = document.querySelectorAll('#search-input');
    const text_search_input = search_input[0].value;
    
    if (text_search_input.length === 0)    
        return

    const fetchData = async () => {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/onecall?q=${city}&exclude=${exclude}&appid=${KEY}`
        );
        const data = await response.json();
        console.log(data);
      };  const fetchData = async () => {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/onecall?q=${city}&exclude=${exclude}&appid=${KEY}`
        );
        const data = await response.json();
        console.log(data);
      };
}