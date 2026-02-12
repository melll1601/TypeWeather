export async function buscarClima(cityname) {
    if (!cityname) {
        alert('Você precisa digitar uma cidade!');
        return;
    }

    const api_key = "09a9ee89ee36f10e4241fd945b5c238f";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(cityname)}&appid=${api_key}&units=metric&lang=pt_br`;

    try {
        const results = await fetch(url);
        const json = await results.json();

        if (json.cod !== 200) {
            alert('Não foi possível localizar');
            return null;
        }

        return {
            city: json.name,
            country: json.sys.country,
            temp: json.main.temp,
            tempMax: json.main.temp_max,
            tempMin: json.main.temp_min,
            description: json.weather[0].description,
            tempIcon: json.weather[0].icon,
            humidity: json.main.humidity,
            windspeed: json.wind.speed,
            feelsLike: json.main.feels_like,
            rain: json.rain ? json.rain["1h"] : 0
        };

    } catch (error) {
        console.error("Erro ao buscar dados:", error);
        alert("Erro ao buscar os dados do clima.");
        return null;
    }
}
