import { ChangeClimate } from "./change-climate.js";


export class CloudyClimate extends ChangeClimate {
  matches(desc) {
    return desc.includes("nuvem") || desc.includes("nublado") || desc.includes("nuvens dispersas");
  }

  apply(imgTemp, message) {
    imgTemp.src = "assets/Images/cloudy-icon.png";
    message.textContent =
      "O céu está encoberto hoje, perfeito para uma caminhada tranquila ou colocar a leitura em dia.";
  }
}
