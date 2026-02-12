import { ChangeClimate } from "./change-climate.js";


export class SunnyClimate extends ChangeClimate {
  matches(desc) {
    return desc.includes("sol") || desc.includes("céu limpo");
  }

  apply(imgTemp, message) {
    imgTemp.src = "assets/Images/sun-icon.png";
    message.textContent =
      "Hoje o sol brilha forte, aproveite para sair e curtir o dia ao ar livre!";
  }
}
