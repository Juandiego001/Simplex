// La función main toma los valores de inicio.
// Posteriormente, la página construye 
// una tabla con los campos correspondientes a cada variable de decisión en la función objetivo
// y los valores para cada variable en las diferentes restricciones

// Adicionalmente
// cantVd -> Cantidad de variables de decisión
// cantRs -> Cantidad de restricciones
// divContVd -> Div contenedor de variables de decisión.
// Aquí irán todas las etiquetas de la variable de decisión

// Funciones
// contEtVd -> Esta función devuelve el contenedor de etiquetas de variables
// de decisión, ya estilizado.
// etiqtVd -> Esta función devuelve la etiqueta para poner en el contenendor
// mencionado en la parte de arriba, ya estilizado.

async function main(event) {
  event.preventDefault();

  let cantVd = 0;
  let cantRs = 0;
  let C = [];
  let CB = [];
  let XB = [];
  let A = [];
  let B = [];
  let b = [];
  let CBBiAmC = [];
  let CBBi = [];
  let CBBib = 0;
  let BiA = [];
  let Bi = [];
  let Bib = [];

  cantVd = document.getElementById('entrada-variables').value;
  cantRs = document.getElementById('entrada-restricciones').value;

  for (let i = 0; i < cantRs; i++) {
    A[i] = new Array(cantVd);
  }

  // Se obtiene el contenedor ya estilizado.
  let divContVd = await contEtVd();

  // Se establecen el número de columnas
  // de acuerdo al número de variables de decisión.
  // Recordar que debe ser texto -> ' 33% 33% 33%'
  let columnasGrid = `${(parseInt((100/cantVd)) + '%' + ' ').repeat(cantVd)}`;
  columnasGrid = columnasGrid.substring(0, columnasGrid.length - 1);
  divContVd.style.gridTemplateColumns = columnasGrid;

  let footer = document.getElementsByTagName('footer')[0];

  
  for (let i = 0; i < cantVd; i++) {
    let etiqt = await etiqtVd(i+1);
    divContVd.appendChild(etiqt);
  }
  
  document.getElementsByTagName('body')[0].insertBefore(divContVd, footer);

  let divContInVd = await contInVd();
  divContInVd.style.gridTemplateColumns = columnasGrid;

  for (let i = 0; i < cantVd; i++) {
    let input = await inputVd(i+1);
    divContInVd.appendChild(input);
  }

  document.getElementsByTagName('body')[0].insertBefore(divContInVd, footer);


}

function contEtVd() {
  let divContVd = document.createElement('div');

  divContVd.style.width = '100%';
  divContVd.style.height = '15vh';
  divContVd.style.minHeight = '15vh';
  divContVd.style.backgroundColor = '#0077B6';
  divContVd.style.display = 'grid';

  return new Promise(resolve => {
    resolve(divContVd);
  });
}

function contInVd() {
  let divContInVd = document.createElement('div');

  divContInVd.style.width = '100%';
  divContInVd.style.height = '15vh';
  divContInVd.style.minHeight = '15vh';
  divContInVd.style.display = 'grid';

  return new Promise(resolve => {
    resolve(divContInVd);
  });
}

// El parámetro corresponde al número de variable de decisión
function etiqtVd(i) {
  let etiqt = document.createElement('h3');

  etiqt.innerHTML = `X<sub>${i}</sub>`;

  etiqt.style.fontFamily = "'Inria serif', 'serif'";
  etiqt.style.fontSize = '1.5em';
  etiqt.style.fontWeight = '300';
  etiqt.style.color = 'white';
  etiqt.style.width = '100%';
  etiqt.style.height = '100%';
  etiqt.style.display = 'flex';
  etiqt.style.justifyContent = 'center';
  etiqt.style.alignItems = 'center';

  return new Promise(resolve => {
    resolve(etiqt);
  });
}

function inputVd(i) {
  let input = document.createElement('input');
  
  input.className = 'inputVd';
  input.placeholder = '0';
  input.id = `inputVd${i}`;


  return new Promise(resolve => {
    resolve(input);
  });
}
