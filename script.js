const minuto = document.getElementById("minutos");
const segundo = document.getElementById("segundos");
const milisegundo = document.getElementById("milisegundos");
const iniciar = document.getElementById("btn-iniciar");
const vuelta = document.getElementById("btn-vuelta");
const pausa = document.getElementById("btn-pausa");
const reiniciar = document.getElementById("btn-reiniciar");
const vueltas = document.getElementById("vueltas");

let vueltasVisibles = true;
let minutos = 0;
let segundos = 0;
let milisegundos = 0;
let minutosVuelta = 0;
let segundosVuelta = 0;
let milisegundosVuelta = 0;
let interval;
let interval2;

iniciar.addEventListener("click", () => {
  interval = setInterval(Actualizar, 10);
  interval2 = setInterval(ActualizarVuelta, 10);
  iniciar.disabled = true;
  iniciar.style.display = "none";
  vuelta.style.display = "block";
  pausa.style.display = "block";
  reiniciar.style.display = "none";
});
vuelta.addEventListener("click", () => {
  if (milisegundos !== 0 && milisegundosVuelta !== 0) {
    añadirVuelta();
    iniciar.disabled = false;
    document.querySelector(".container__cronometro-vuelta").style.display =
      "block";
  }
});
pausa.addEventListener("click", () => {
  clearInterval(interval);
  clearInterval(interval2);
  iniciar.disabled = false;
  iniciar.style.display = "block";
  vuelta.style.display = "none";
  pausa.style.display = "none";
  reiniciar.style.display = "block";
});
reiniciar.addEventListener("click", () => {
  clearInterval(interval);
  clearInterval(interval2);
  reiniciarData();
  iniciar.disabled = false;
  iniciar.style.display = "block";
  vuelta.style.display = "none";
  pausa.style.display = "none";
  reiniciar.style.display = "none";
  document.querySelector(".container__cronometro-vuelta").style.display =
    "none";
});
const Actualizar = () => {
  milisegundos++;
  if (milisegundos === 100) {
    milisegundos = 0;
    segundos++;
    if (segundos === 60) {
      segundos = 0;
      minutos++;
    }
  }
  mostrarTimer();
};
const ActualizarVuelta = () => {
  milisegundosVuelta++;
  if (milisegundosVuelta === 100) {
    milisegundosVuelta = 0;
    segundosVuelta++;
    if (segundosVuelta === 60) {
      segundosVuelta = 0;
      minutosVuelta++;
    }
  }
};
const mostrarTimer = () => {
  milisegundo.textContent = padTime(milisegundos);
  segundo.textContent = padTime(segundos);
  minuto.textContent = padTime(minutos);
};
const padTime = (time) => {
  return time.toString().padStart(2, "0");
};
const reiniciarData = () => {
  minutos = 0;
  segundos = 0;
  milisegundos = 0;
  minutosVuelta = 0;
  segundosVuelta = 0;
  milisegundosVuelta = 0;
  mostrarTimer();
  reiniciarListaVuelta();
};
const añadirVuelta = () => {
  if (vueltasVisibles === false) {
    const contenedorVuelta = document.querySelector(
      ".container__cronometro-vuelta"
    );
    const ulist = document.createElement("ul");
    ulist.className += "container__cronometro-vuelta-vueltas";
    ulist.setAttribute("id", "vueltas");
    contenedorVuelta.appendChild(ulist);
    vueltasVisibles = true;
  }
  const vueltas = document.getElementById("vueltas");
  const tiempoVuelta = `${padTime(minutosVuelta)}:${padTime(
    segundosVuelta
  )},${padTime(milisegundosVuelta)}`;
  minutosVuelta = 0;
  segundosVuelta = 0;
  milisegundosVuelta = 0;
  const listItem = document.createElement("li");
  listItem.innerHTML = `<span>Vuelta ${
    vueltas.childElementCount + 1
  }: </span><span class="container__cronometro-vuelta-vueltas-tiempo elemento-${
    vueltas.childElementCount + 1
  }">${tiempoVuelta}</span>`;
  vueltas.appendChild(listItem);
};
const reiniciarListaVuelta = () => {
  const vueltas = document.getElementById("vueltas");
  const padre = document.querySelector(".container__cronometro-vuelta");
  padre.removeChild(vueltas);
  vueltasVisibles = false;
};