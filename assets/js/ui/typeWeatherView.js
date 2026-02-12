export function showInfo(json) {
    if (!json) return;

    const now = new Date();
    let hours = String(now.getHours()).padStart(2, '0');
    let minutes = String(now.getMinutes()).padStart(2, '0');

    document.querySelector('#hour').textContent = `${hours}:${minutes}`;

    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    };
    document.querySelector('#date-time').textContent =
        now.toLocaleDateString("pt-BR", options);

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

    document.querySelector('#city').textContent = `${json.city}, ${json.country}`;
    document.querySelector('#rain').textContent = json.rain + " mm";

    atualizarBackground(hours);
    atualizarMensagem(json.description);
}

function atualizarBackground(hours) {
    const bg = document.querySelector('#bg-info');

    if (hours >= 6 && hours < 18) {
        bg.classList.remove('from-[#16161F]', 'via-[#1E1E29]');
        bg.classList.add('from-blue-500', 'to-blue-700');
    } else {
        bg.classList.remove('from-blue-500', 'to-blue-700');
        bg.classList.add('from-[#16161F]', 'via-[#1E1E29]');
    }
}

function atualizarMensagem(description) {
    const imgTemp = document.querySelector('#img-temp');
    const message = document.querySelector('#message');
    const desc = description.toLowerCase();

    if (desc.includes('chuva')) {
        imgTemp.src = 'assets/rain-icon.png';
        message.textContent = "A chuva cai lá fora, um bom momento para se aquecer com um chocolate quente e relaxar!";
    } else if (desc.includes('sol') || desc.includes('céu limpo')) {
        imgTemp.src = 'assets/sun-icon.png';
        message.textContent = "Hoje o sol brilha forte, aproveite para sair e curtir o dia ao ar livre!";
    } else if (desc.includes('nuvem') || desc.includes('nublado')) {
        imgTemp.src = 'assets/cloudy-icon.png';
        message.textContent = "O céu está encoberto hoje, perfeito para uma caminhada tranquila ou colocar a leitura em dia.";
    } else {
        imgTemp.src = 'assets/default-icon.png';
        message.textContent = "Hoje é um belo dia!";
    }
}
