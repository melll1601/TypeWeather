import { buscarClima } from "../api/typeWeatherService.js";
import { showInfo } from "../ui/typeWeatherView.js";

async function handleSearch(inputId) {
    const cityname = document.querySelector(inputId).value;
    const data = await buscarClima(cityname);
    showInfo(data);
}

export function initSearchEvents() {
    document
        .querySelector('#searchMenu')
        .addEventListener('submit', e => {
            e.preventDefault();
            handleSearch('#cityNameMenu');
        });

    document
        .querySelector('#searchSecondary')
        .addEventListener('submit', e => {
            e.preventDefault();
            handleSearch('#cityNameSecondary');
        });
}
