import { ChangeClimate } from "./change-climate.js";


export class RainClimate extends ChangeClimate {
  matches(desc) {
    return desc.includes("chuva");
  }

  apply(imgTemp, message) {
    imgTemp.src = "assets/Images/rain-icon.png";
    message.textContent =
      "A chuva cai lá fora, um bom momento para se aquecer com um chocolate quente e relaxar!";
  }
}
