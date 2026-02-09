document.querySelector('#search').addEventListener('submit', async (event) =>{
    event.preventDefault();

    const cityname = document.querySelector('#cityName').value;

    if(!cityname){
        return alert('Você precisa digitar uma cidade!');
    }

    const api_key = "09a9ee89ee36f10e4241fd945b5c238f";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(cityname)}&appid=${api_key}&units=metric&lang=pt_br`;
    const results = await fetch(url);
    const json = await results.json();

    if(json.cod === 200){
        showInfo({
            city: json.name,
            country: json.sys.country,
            temp: json.temp,
            tempMax: json.main.temp_max,
            tempMin: json.main.temp_min,
            descripton: json.weather[0].description,
            tempIcon: json.weather[0].icon,
            humidity: json.main.humidity,
            windspeed: json.wind.speed,
            feelsLike: json.main.feels_like,
            rain: json.rain ? json.rain["1h"] : 0
        });

    } else {
        return alert('Não foi possível localizar');
    }

    console.log(json);
});

function showInfo(json){
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();

    // Adiciona zero à esquerda se necessário
    if (hours < 10) hours = "0" + hours;
    if (minutes < 10) minutes = "0" + minutes;

    const options = {
    weekday: "long", 
    year: "numeric", 
    month: "long", 
    day: "numeric",
    };

    const currentDateTime = now.toLocaleString("pt-BR", options);
    document.querySelector('#date-time').textContent = currentDateTime;


    document.querySelector('#hour').textContent = hours + ":" + minutes;

    document.querySelector('#weather').classList.remove('hidden');
    document.querySelector('#weather').classList.add('flex');
    document.querySelector('#menu').classList.add('hidden');

    document.querySelector('#humity').textContent = json.humidity + "%";
    document.querySelector('#wind-speed').textContent =json.windspeed + "km/h";
    document.querySelector('#thermal-sensation').textContent = json.feelsLike + "°C";
    document.querySelector('#description-day').textContent = json.descripton;

    document.querySelector('#temp-min').textContent = json.tempMin + "°c / ";
    document.querySelector('#temp-max').textContent = json.tempMax + "°c";
    document.querySelector('#temp').textContent = json.temp;

    document.querySelector('#city').textContent = json.city + ", " + json.country;

    document.querySelector('#rain').textContent = json.rain + " mm";

    if (hours < 18) {
        const bg = document.querySelector('#bg-info');
        bg.classList.remove('bg-gradient-to-r', 'from-[#16161F]', 'via-[#1E1E29]');
        bg.classList.add('bg-gradient-to-r', 'from-blue-500', 'to-blue-700');
    }
}



// fetch(url)
//     .then((response) => {
//         if (!response.ok) throw new Error("Erro ao buscar dados");
//         return response.json();
//     })


//     .then((data) => {
//         tempElemento.textContent = Math.floor(data.main.temp) + "°C";
//         windElemento.textContent = Math.floor(data.wind.speed) + " Km/h";
//         humidityElemento.textContent = Math.floor(data.main.humidity) + " %";
//         cityElemento.textContent = data.name;


//     })

//     .catch((error) => console.error("Erro:", error));