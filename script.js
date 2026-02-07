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
            tempMax: json.temp_max,
            tempMin: json.temp_min,
            descripton: json.weather[0].descripton,
            tempIcon: json.weather[0].icon,
            humidity: json.main.humidity,
            windspeed: json.wind.speed,
        });

    } else {
        return alert('Não foi possível localizar');
    }

    console.log(json);
});

function showInfo(json){

    document.querySelector('#weather').classList.remove('hidden');
    document.querySelector('#weather').classList.add('block');
    document.querySelector('#menu').classList.add('hidden');

}