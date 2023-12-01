const minuto = document.getElementById('minutos');
const segundo = document.getElementById('segundos');
const milisegundo = document.getElementById('milisegundos');

const iniciar = document.getElementById('btn-iniciar');
const detener = document.getElementById('btn-detener');
const pausa = document.getElementById('btn-pausa');
const reiniciar = document.getElementById('btn-reiniciar');

const vueltas = document.getElementById('vueltas');

iniciar.addEventListener('click',iniciarTiempo);
detener.addEventListener('click',detenerTiempo);
pausa.addEventListener('click',pausarTiempo);
reiniciar.addEventListener('click',reiniciarTiempo);

let minutos = 0;
let segundos = 0;
let milisegundos = 0;
let interval;

function iniciarTiempo(){
    interval =  setInterval(Actualizar,10);
    iniciar.disabled = true;
}
function detenerTiempo(){
    clearInterval(interval);
    añadirVuelta();
    reiniciarData();
    iniciar.disabled = false;
}
function pausarTiempo(){
    clearInterval(interval);
    iniciar.disabled = false;
}
function reiniciarTiempo(){
    clearInterval(interval);
    reiniciarData();
    iniciar.disabled = false;
}

function Actualizar(){
    milisegundos++;
    if(milisegundos === 100){
        milisegundos = 0;
        segundos++;
        if(segundos === 60){
            segundos = 0;
            minutos++;
        }
    }
    mostrarTimer();
}

function mostrarTimer(){
    milisegundo.textContent = padTime(milisegundos);
    segundo.textContent = padTime(segundos);
    minuto.textContent = padTime(minutos);    
}

function padTime(time){
    return time.toString().padStart(2,'0');
}

function reiniciarData(){
    minutos = 0;
    segundos = 0;
    milisegundos = 0;
    mostrarTimer();
}

function añadirVuelta(){
    const tiempoVuelta = `${padTime(minutos)}:${padTime(segundos)}:${padTime(milisegundos)}`;
    const listItem = document.createElement('li');
    listItem.innerHTML = `<span>Vuelta ${vueltas.childElementCount + 1}: </span><span class="container__cronometro-vuelta-vueltas-tiempo">${tiempoVuelta}</span>`;
    vueltas.appendChild(listItem);
}