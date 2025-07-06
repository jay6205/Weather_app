document.addEventListener("DOMContentLoaded",()=>{

    const city_input=document.getElementById("city_input")
    const get_weather_button=document.getElementById("get_weather_button");
    const weather_info=document.getElementById("weather_info");
    const city_name=document.getElementById("city_name");
    const temperature=document.getElementById("temperature");
    const description=document.getElementById("description");
    const air_quality=document.getElementById("air_quality")
    const error_message=document.getElementById("error_message");
    const API_KEY= MY_API_KEY;
    

     async function fetch_weather_data(city){
        // fetch data
        const exclude = 'minutely,hourly';
        const URL = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=yes`;
        const response=await fetch(URL);
        // console.log(response);
        
        if(!response.ok)
        {
            throw new Error("City Not Found");
        }
        const data=await response.json();
        return data;
    }

    function display_weather_data(data){
        // display
        // console.log(data);
        const name=data.location.name;
        const temp=data.current.temp_c;
        const desc=data.current.condition.text;
        const aqi=data.current.air_quality['gb-defra-index'];
        weather_info.classList.remove('hidden');
        error_message.classList.add('hidden');
        city_name.textContent=name;
        temperature.textContent=`🌡️ Temp: ${temp}°C`
        description.textContent=`🌤️ Condition: ${desc}`
        air_quality.textContent=`AQI: ${aqi}`
    }

    function show_error(){
        weather_info.classList.add('hidden');
        error_message.classList.remove('hidden');
    }

    get_weather_button.addEventListener("click",async ()=>{
        const city=city_input.value.trim();
        if(!city){
            console.log("No City Entered");
            alert("Please Enter a city name");            
        }
        try {
            const weather_data= await fetch_weather_data(city);
            display_weather_data(weather_data);
        } catch (error) {
            show_error();
        }

    })

    function circle_mouse_follower(){
        window.addEventListener("mousemove",(dets)=>{
            document.querySelector("#mini_circle").style.transform=`translate(${dets.clientX}px,${dets.clientY}px)`
        })
    }
    circle_mouse_follower();
})