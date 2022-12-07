const divGame = document.getElementById("DivGame");
let random = -1;

PrintIndex();

function PrintIndex() {
  const PClue = document.getElementById("Clue");
  PClue.innerHTML = ``;
  divGame.innerHTML = ``;
  divGame.innerHTML = `<label for="Juego" id="labelJuego">
  <p id="text">
    Este juego consiste en que adivines un número aleatorio entre 1 y 100 (ambos inclusive).
  </p>
  <p>Al pulsar un botón, mostrará si el número es mayor o menor con los colores de los botones. Los botones verdes son los que están disponibles</p>
  <button onclick="StartGame()" id="Start">¡Comienza el Juego!</button>
  </label>`;
}

function StartGame() {
  random = -1;
  PrintButtons();
  Game();
}

function PrintButtons() {
  divGame.innerHTML = ``;
  for (let index = 1; index <= 100; index++) {
    divGame.innerHTML += `<button id="GameButton" class="${index}">${index}</button>`;
  }
}

function Game() {
  random = randomIntFromInterval(1, 100);
  AddEvent();
}

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function AddEvent() {
  const btn_numbers = document.querySelectorAll("#GameButton");
  for (let i = 0; i < btn_numbers.length; i++) {
    btn_numbers[i].addEventListener("click", IsNumber);
  }
}

function IsNumber(event) {
  const button = event.target;
  button.disabled = true;

  const number = Number(button.innerHTML);

  let success = false;

  if (number == random) {
    success = true;
  } else {
    DeleteButtons(number);
  }

  ButtonsColor(success, button);
  Clue(success, parseInt(button.innerHTML));

  if (success == true) {
    ReturnStart(success);
  }
}

function ButtonsColor(success, button) {
  if (success == true) {
    button.style.background = "green";
  } else {
    button.style.background = "red";
  }
}

function Clue(success, ButtonNumber) {
  const PClue = document.getElementById("Clue");
  PClue.innerHTML = ``;
  if (success == false) {
    if (random > ButtonNumber) {
      PClue.innerHTML = `<p>El número es mágico es mayor a ${ButtonNumber}</p>`;
    } else {
      PClue.innerHTML = `<p>El número es mágico es menor a ${ButtonNumber}</p>`;
    }
  } else {
    PClue.innerHTML = `<p>¡Has acertado, Felicidades!</p>`;
    divGame.innerHTML = ``;
  }
}

function DeleteButtons(number) {
  if (number < random) {
    for (let i = number - 1; i >= Number(divGame.firstChild.innerHTML); i--) {
      const btn = document.getElementsByClassName(i)[0];
      divGame.removeChild(btn);
    }
  } else {
    for (let i = number + 1; i <= Number(divGame.lastChild.innerHTML); i++) {
      const btn = document.getElementsByClassName(i)[0];
      divGame.removeChild(btn);
    }
  }
}

function ReturnStart() {
  const PClue = document.getElementById("Clue");
  PClue.innerHTML += `<p id="PClue">Se ha acabado el Juego</p>
  <button onclick="PrintIndex()" id="YES">¡Volver al Índice!</button>
  <button onclick="window.close()" id="NO">¡Nos vemos pronto!</button>`;
}
