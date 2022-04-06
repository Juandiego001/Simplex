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

// Variables globales.
let cantVd = 0;
let cantRs = 0;

async function main(event) {
  event.preventDefault();

  cantVd = document.getElementById('entrada-variables').value;
  cantRs = document.getElementById('entrada-restricciones').value;

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

  // Restricciones

  for (let i = 0; i < cantRs; i++) {
    // Contenedor para ubicar la etiqueta de:
    // "Restricción #1"
    let divContResTituVd = await contResTituVd();
    divContResTituVd.innerHTML = `Restricción #${(i+1)}`;
    
    let  divContResEtiVd = await contResEtiVd();
    divContResEtiVd.style.gridTemplateColumns = columnasGrid;

    for (let j = 0; j < cantVd; j++) {
      let etiqtResVd = await etiResVd(j+1);
      divContResEtiVd.appendChild(etiqtResVd);
    }

    let divContResInVd = await contResInVd();
    divContResInVd.style.gridTemplateColumns = columnasGrid;

    for (let j = 0; j < cantVd; j++) {
      let input = await inputResVd(j+1);
      divContResInVd.appendChild(input);
    }

    let divContResEtiMenorIgual = await contResEtiMenorIgual();
    let inputResMenorIgual = await inResMenorIgual(i+1);
    
    // Añadiendo todos los componentes de las restricciones
    document.getElementsByTagName('body')[0].insertBefore(divContResTituVd, footer);
    document.getElementsByTagName('body')[0].insertBefore(divContResEtiVd, footer);
    document.getElementsByTagName('body')[0].insertBefore(divContResInVd, footer);
    document.getElementsByTagName('body')[0].insertBefore(divContResEtiMenorIgual, footer);
    document.getElementsByTagName('body')[0].insertBefore(inputResMenorIgual, footer); 
  }

  let btnRealizar = await contBtnRealizar();
  document.getElementsByTagName('body')[0].insertBefore(btnRealizar, footer);

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

function contResTituVd() {

  let divResTituVd = document.createElement('div');

  divResTituVd.style.width = '100%';
  divResTituVd.style.height = '15vh';
  divResTituVd.style.minHeight = '15vh';
  divResTituVd.style.backgroundColor = '#0077B6';
  divResTituVd.style.fontFamily = "'Inria serif', 'serif'";
  divResTituVd.style.fontSize = '1.5rem';
  divResTituVd.style.color = 'white';
  divResTituVd.style.textAlign = 'center';
  divResTituVd.style.display = 'flex';
  divResTituVd.style.justifyContent = 'center';
  divResTituVd.style.alignItems = 'center';

  return new Promise(resolve => {
    resolve(divResTituVd);
  })
}

function contResEtiVd() {
  let divContResEtiVd = document.createElement('div');

  divContResEtiVd.style.width = '100%';
  divContResEtiVd.style.height = '15vh';
  divContResEtiVd.style.minHeight = '15vh';
  divContResEtiVd.style.backgroundColor = '#0077B6';
  divContResEtiVd.style.display = 'grid';

  return new Promise(resolve => {
    resolve(divContResEtiVd);
  })

}

function etiResVd(j) {
  let etiqt = document.createElement('h3');

  etiqt.innerHTML = `X<sub>${j}</sub>`;

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

function contResInVd() {
  let divResInVd = document.createElement('div');

  divResInVd.style.width = '100%';
  divResInVd.style.height = '15vh';
  divResInVd.style.minHeight = '15vh';
  divResInVd.style.backgroundColor = 'white';
  divResInVd.style.display = 'grid';

  return new Promise(resolve => {
    resolve(divResInVd);
  })
}

function inputResVd(j) {
  let input = document.createElement('input');
  
  input.className = 'inputVd';
  input.placeholder = '0';
  input.id = `inputResVd${j}`;


  return new Promise(resolve => {
    resolve(input);
  }); 
}

function contResEtiMenorIgual() {
  let divContResEtiMenorIgual = document.createElement('div');

  divContResEtiMenorIgual.style.width = '100%';
  divContResEtiMenorIgual.style.width = '100%';
  divContResEtiMenorIgual.style.height = '15vh';
  divContResEtiMenorIgual.style.minHeight = '15vh';
  divContResEtiMenorIgual.style.backgroundColor = '#0077B6';
  divContResEtiMenorIgual.style.fontFamily = "'Inria serif', 'serif'";
  divContResEtiMenorIgual.style.fontSize = '1.5rem';
  divContResEtiMenorIgual.style.color = 'white';
  divContResEtiMenorIgual.style.display = 'flex';
  divContResEtiMenorIgual.style.justifyContent = 'center';
  divContResEtiMenorIgual.style.alignItems = 'center';

  divContResEtiMenorIgual.innerHTML = 'Menor o igual a';

  return new Promise(resolve => {
    resolve(divContResEtiMenorIgual);
  });
}

function inResMenorIgual(j) {
  let input = document.createElement('input');
  
  input.className = 'inputVd';
  input.placeholder = '0';
  input.id = `inputResMenorIgual${j}`;
  input.style.width = '100%';
  input.style.height = '15vh';
  input.style.minHeight = '15vh';

  return new Promise(resolve => {
    resolve(input);
  });
}

function contBtnRealizar() {
  let btnRealizar = document.createElement('button');

  btnRealizar.className = 'btn-realizar';
  btnRealizar.innerHTML = '¡Realizar simplex!';
  btnRealizar.addEventListener('click', realizarSimplex);

  return new Promise(resolve => {
    resolve(btnRealizar);
  });
}

function mmult(matriz1, matriz2) {

}

function minversa(matriz) {

}

// Segunda función principal.
// Se encargará de realizar todas las operaciones del método simplex.
function realizarSimplex() {
  // inputVd + número (desde 1: inputVd1, inputVd2, etc.) -> Coeficientes en la función objetivo
  // inputResVd + número (desde 1: inputResVd1, inputResVd2, etc.) -> Coeficientes de cada restricción
  // inputResMenorIgual + número (desde 1: inputResMenorIgual1, inputResMenorIgual2, etc.) -> Valores de menor o igual a de cada restricción

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

  // Vector C
  // Coeficientes de las variables básicas en la función objetivo
  for (let i  = 0; i < cantVd; i++) {
    C[i] = parseInt(document.getElementById(`inputVd${(i+1)}`).value);
  }

  // Matriz A
  // Coeficientes de las variables básicas en cada una de las restricciones
  for (let i = 0; i < cantRs; i++) {
    A[i] = new Array(cantVd);
    for (let j = 0; j  < cantVd; j++) {
      A[i][j] = parseInt(document.getElementById(`inputResVd${(j+1)}`).value);
    }
  }

  

  console.log('Coeficiente de la primera variable de decisión en la restricción #1: ' + document.getElementById('inputResVd1').value);
  console.log('Coeficiente de la segunda variable de decisión en la restricción #1 : ' + document.getElementById('inputResVd2').value);
  console.log('Resultado de la restricción #1: ' + document.getElementById('inputResMenorIgual1').value);

  console.log('Cantidad de variables de decisión: ' + cantVd);

  alert('Hello World');

}
