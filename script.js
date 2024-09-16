//===================================================================================
    //Weathering with You App//
//====================================================================================


//Background video playback rate
document.querySelector("video").playbackRate = 0.40;

//fetch using aync/await

async function fetchWeather() {
    try {
        const city = document.getElementById("cityIn").value;
        const apiKey = "b117c0004fdc5b734a0a9b2ef77fdf5c";
        const currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);
        
        const response = await fetch(currentUrl,{ signal: controller.signal })
        clearTimeout(timeoutId);
        
        if (!city) {
            alert("Please enter a city");
            return;
        } else if (!response.ok) {
            alert('Network response was not ok. Please try again');
            throw new Error('Network response was not ok')
        }

        const data = await response.json()
        console.log(data)
        fetchDisplay(data)
    } catch (error) {
        if (error.name === 'AbortError') {
            console.error('Error: Request timed out');
            alert('Error: Request timed out');
        } else if (error.message === 'Network response was not ok') {
            console.error('Error: Failed to fetch data from the API');
        } else {
            console.error('Error: Unable to reach the API endpoint or an unknown error occurred');
            alert('Error: Unable to reach the API endpoint or an unknown error occurred');
        }
    } 
    
    try {
        const city = document.getElementById("cityIn").value;
        const apiKey = "b117c0004fdc5b734a0a9b2ef77fdf5c";
        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);
        
        const response = await fetch(forecastUrl,{ signal: controller.signal })
        clearTimeout(timeoutId);
        
        if (!city) {
            alert("Please enter a city");
            return;
        } else if (!response.ok) {
            alert('Network response was not ok. Please try again');
            throw new Error('Network response was not ok')
        }
    
            const data = await response.json()
            console.log(data.list)
            fcastDisplay(data.list)
        } catch (error) {
            if (error.name === 'AbortError') {
                console.error('Error: Request timed out');
                alert('Error: Request timed out');
            } else if (error.message === 'Network response was not ok') {
                console.error('Error: Failed to fetch data from the API');
            } else {
                console.error('Error: Unable to reach the API endpoint or an unknown error occurred');
                alert('Error: Unable to reach the API endpoint or an unknown error occurred');
            }
    }
}

//What data will I need?
//(data.name); // City Name
//(data.sys.country); // Country
//(data.dt); // Unix Timestamp
//(data.timezone)// Timezone
//(data.main.temp); // Temperature °C
//(data.main.humidity); // Humidity, %
//(data.weather[0].main); // weather Main
//(data.weather[0].description); // Weather description
//(data.weather[0].icon); //  Weather icon id


//convert country code to country
function convertCountryCode(country) {
    let regionalNames = new Intl.DisplayNames
    (["en"], {type:"region"});
    return regionalNames.of(country)
}


//Function to display the current weather information
 function fetchDisplay(data) {

//City name and Country code   
const cityDisplay = document.getElementById("cityDisplay");
cityDisplay.textContent = `${data.name}, ${convertCountryCode(data.sys.country)}`;

//Local Date and Time        
const date = new Date((data.dt + data.timezone - 3600) * 1000);
const timeString = date. toLocaleString();
const dateDisplay = document.getElementById("dateDisplay");
dateDisplay.textContent = `${timeString}`;

//Weather Icon        
const iconDisplay = document.getElementById('iconDisplay');
const iconURL = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
iconDisplay.src = iconURL;
iconDisplay.alt = data.weather[0].description;
iconDisplay.style.display = "block";

// Temperature abd Humidity
const tempDisplay = document.getElementById("tempDisplay");
tempDisplay.textContent = `Temperature: ${data.main.temp}°C`;

const humDisplay = document.getElementById("humDisplay");
humDisplay.textContent = `Humidity: ${data.main.humidity}%`;

// Weather description
const weatherDisplay = document.getElementById("weatherDisplay");
weatherDisplay.textContent = `${data.weather[0].main}: ${data.weather[0].description}`;
};


//Function to display 4-day daily forecast
function fcastDisplay(dailyData) {
    const fcast = document.getElementById("fcast");
    fcast.innerHTML ="";
    for(let i = 4; i < dailyData.length; i+=4) {
        const iconURL = `https://openweathermap.org/img/wn/${dailyData[i].weather[0].icon}.png`;
        const dailyHtml =`
        <div class="daily-item">
            <span>+ ${(i/4)*12} hrs</span>
            <img src="${iconURL}" alt="daily weather icon">
            <span>${dailyData[i].main.temp}°C</span>
        </div>
        `;
        fcast.innerHTML += dailyHtml;
};
};
