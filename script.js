document.querySelector('#searchMenu').addEventListener('submit', async (event) => {
    event.preventDefault();
    const cityname = document.querySelector('#cityNameMenu').value;
    buscarClima(cityname);
});

document.querySelector('#searchSecondary').addEventListener('submit', async (event) => {
    event.preventDefault();
    const cityname = document.querySelector('#cityNameSecondary').value;
    buscarClima(cityname);
});
async function buscarClima(cityname) {
    if (!cityname) return alert('Você precisa digitar uma cidade!');

    const api_key = "09a9ee89ee36f10e4241fd945b5c238f";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(cityname)}&appid=${api_key}&units=metric&lang=pt_br`;

    try {
        const results = await fetch(url);
        const json = await results.json();

        if (json.cod === 200) {
            showInfo({
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
            });
        } else {
            alert('Não foi possível localizar');
        }
        
    } catch (error) {
        console.error("Erro ao buscar dados:", error);
        alert("Erro ao buscar os dados do clima.");
    }
}

function showInfo(json) {

    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    if (hours < 10) hours = "0" + hours;
    if (minutes < 10) minutes = "0" + minutes;

    document.querySelector('#hour').textContent = hours + ":" + minutes;

    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    };
    const currentDateTime = now.toLocaleDateString("pt-BR", options);
    document.querySelector('#date-time').textContent = currentDateTime;

    const weatherContainer = document.querySelector('#weather');
    weatherContainer.classList.remove('hidden');
    weatherContainer.classList.add('flex');
    document.querySelector('#menu').classList.add('hidden');

    document.querySelector('#humity').textContent = json.humidity + "%";
    document.querySelector('#wind-speed').textContent = json.windspeed + " km/h";
    document.querySelector('#thermal-sensation').textContent = json.feelsLike + "°C";
    document.querySelector('#description-day').textContent = json.description;

    document.querySelector('#temp-min').textContent = Math.round(json.tempMin) + "°C / ";
    document.querySelector('#temp-max').textContent = Math.round(json.tempMax) + "°C";
    document.querySelector('#temp').textContent = Math.round(json.temp) + "°C";    

    document.querySelector('#city').textContent = json.city + ", " + json.country;
    document.querySelector('#rain').textContent = json.rain + " mm";

    const bg = document.querySelector('#bg-info');
    if (hours >= 6 && hours < 18) {
        // Dia
        bg.classList.remove('bg-gradient-to-r', 'from-[#16161F]', 'via-[#1E1E29]');
        bg.classList.add('bg-gradient-to-r', 'from-blue-500', 'to-blue-700');
    } else {
        // Noite
        bg.classList.remove('bg-gradient-to-r', 'from-blue-500', 'to-blue-700');
        bg.classList.add('bg-gradient-to-r', 'from-[#16161F]', 'via-[#1E1E29]');
    }

    const imgTemp = document.querySelector('#img-temp');
    const desc = json.description.toLowerCase(); 
    const message = document.querySelector('#message');

    if (desc.includes('chuva')) {
        imgTemp.setAttribute('src', 'assets/rain-icon.png');
        message.textContent = "A chuva cai lá fora, um bom momento para se aquecer com um chocolate quente e relaxar!"
    } else if (desc.includes('sol') || desc.includes('céu limpo')) {
        imgTemp.setAttribute('src', 'assets/sun-icon.png');
        message.textContent = "Hoje o sol brilha forte, aproveite para sair e curtir o dia ao ar livre!"

    } else if (desc.includes('nuvem') || desc.includes('nublado')) {
        imgTemp.setAttribute('src', 'assets/cloudy-icon.png');
        message.textContent = "O céu está encoberto hoje, perfeito para uma caminhada tranquila ou colocar a leitura em dia."

    } else {
        imgTemp.setAttribute('src', 'assets/default-icon.png'); 
        message.textContent = "Hoje é um belo dia!"

    }
}
