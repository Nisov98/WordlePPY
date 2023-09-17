const API_URL = 'https://random-word-api.herokuapp.com/word?length=5&&number=1&&lang=es';
const intentosMaximos = 6;
let intentosRestantes = intentosMaximos;
let palabra = '';

window.addEventListener('load', init);

function init() {
  obtenerPalabraAleatoria();
  const button = document.getElementById('guess-button');
  button.addEventListener('click', intentar);
}

function obtenerPalabraAleatoria() {
  fetch(API_URL)
    .then(response => response.json())
    .then(data => {
      palabra = data[0].toUpperCase();
      console.log(palabra); // Para propósitos de depuración
    })
    .catch(error => console.error('Error al obtener la palabra aleatoria:', error));
}

function leerIntento() {
  let intento = document.getElementById('guess-input');
  intento = intento.value;
  intento = intento.toUpperCase();
  return intento;
}

function intentar() {
  const INTENTO = leerIntento();
  if (INTENTO === palabra) {
    terminar('<h1>¡GANASTE! 😀</h1>');
    return;
  }
  const GRID = document.getElementById('grid');
  const ROW = document.createElement('div');
  ROW.className = 'row';
  for (let i in palabra) {
    const SPAN = document.createElement('span');
    SPAN.className = 'letter';
    if (INTENTO[i] === palabra[i]) {
      SPAN.innerHTML = INTENTO[i];
      SPAN.style.backgroundColor = '#79b851';
    } else if (palabra.includes(INTENTO[i])) {
      SPAN.innerHTML = INTENTO[i];
      SPAN.style.backgroundColor = '#f3c237';
    } else {
      SPAN.innerHTML = INTENTO[i];
      SPAN.style.backgroundColor = '#a4aec4';
    }
    ROW.appendChild(SPAN);
  }
  GRID.appendChild(ROW);
  intentosRestantes--;
  if (intentosRestantes === 0) {
    terminar('<h1>¡PERDISTE! 😖</h1>');
  }
}

function terminar(mensaje) {
  const INPUT = document.getElementById('guess-input');
  INPUT.disabled = true;
  const BOTON = document.getElementById('guess-button');
  BOTON.disabled = true;
  let contenedor = document.getElementById('guesses');
  contenedor.innerHTML = mensaje;
}
