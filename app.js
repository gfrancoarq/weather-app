const API_KEY = 'd74125b8c739a0641b233c5ed82e786f';

const fetchData = position => {
    const { latitude, longitude } = position.coords;
    fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${latitude}&lon=${longitude}&appid=${API_KEY}`)
        .then(response => response.json())
        .then(data => setWeatherData(data))
};

const setWeatherData = data => {
    console.log(data);
    const weatherData = {
        location: `${data.name}, ${data.sys.country}.`,
        date: `Today is ${getDate()}`,
        description: `Forecast: ${data.weather[0].main}`,
        temperature: `Temperature: ${data.main.temp}°C`,
        mintemp: `Temp Min: ${data.main.temp_min}°C`,
        maxtemp: `Temp Max: ${data.main.temp_max}°C`,
        pressure: `Pressure: ${data.main.pressure} hPa`,
        humidity: `Humidity: ${data.main.humidity}%`
    }

    Object.keys(weatherData).forEach(key =>{
        document.getElementById(key).innerHTML = weatherData[key]
    });

    cleanUp();
}

const cleanUp = () => {
    let container = document.getElementById("container-data");
    let loader = document.getElementById("loader");

    loader.style.display = "none";
    container.style.display = "flex";
}

const getDate = () => {
    let date = new Date();
    return `${date.getDate()}-${('0'+(date.getMonth()+1)).slice(-2)}-${date.getFullYear()}`;
}

// eslint-disable-next-line no-unused-vars
const onLoad = () => {
    navigator.geolocation.getCurrentPosition(fetchData);
}
