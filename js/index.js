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

// Función para realizar multiplicaciones de matrices
function mmult(matriz1, matriz2) {

}

// Función para realizar la multiplicación de matrices
// y la resta con el vector C
function mmultmC(CBBi, A, C) {
  let CBBiA = mmult(CBBi, A);
  
}

// Función para verificar si ha finalizado la matriz identidad
function verInversa(matriz) {
  for (let i = 0; i < cantRs; i++) {
    for (let j = 0; j < cantRs; j++) {
      if (matriz[i][i] != 1) return false;
      if (i != j && matriz[i][j] != 0) return false;
      return true;
    }
  }
}

// Función para realizar una operación sobre el cálculo de la
// matriz inversa
function gaussJordan(matriz) {
  for (let i = 0; i < cantRs; i++) {
    for (let j = 0; j < cantRs; j++) {
      if (matriz[i][i] != 1) {
        // Tomamos el número que no es igual a 1
        // y lo dividimos en toda la fila
        let valorii = matriz[i][i];

        // Hacemos la operación anterior en cada columna
        // de la fila
        for (let k = 0; k < cantRs*2; k++) {
          matriz[i][k] = matriz[i][k] / valorii;
        }

        return gaussJordan(matriz);
      }

      if (i != j && matriz[i][j] != 0) {
        // Obtenemos el valor para esa columna
        // y vamos a buscar el valor que puede multiplicarse por otro valor
        // y sumarse a la fila para convertirlo en un cero 
        let valorij = matriz[i][j];
        let valorMul = 0;
        let filaOperable = 0;
        for (let k = i + 1; i < cantRs; k++) {
          if (matriz[k][j] != 0) {
            valorMul = matriz[k][j];
            filaOperable = k;
            break;
          }
        }

        // Definimos la operación que multiplicará a la fila k
        //  y sumará a la fila i
        let operacion = (valorij / valorMul) * (-1);

        // Se realiza la operación
        for (let k = 0; k < cantRs*2; k++) {
          matriz[i][k] += matriz[filaOperable][k]*operacion;
        }

        return gaussJordan(matriz);
      }
    }
  }

  return matriz;
}

// Función para calcular la inversa
function minversa(matriz) {
  // B =  | 2 3 4 |
  //      | 2 3 5 |
  //      | 2 3 6 |
  // Posiciones = 0 1 2  

  // Se añadirá a la matriz a la que se le calculará la inversa
  // la matriz identidad y se creara una matriz n x n + cantRs (n x n + cantidad de restricciones)
  let contador = 0;

  for (let i = 0; i < cantRs; i++) {
    for (let j = 0; j < cantRs; j++) {
      if (j == contador) {
        matriz[[i](cantRs + j)] = 1;
      } else {
        matriz[[i](cantRs + j)] = 0;
      }
    }

    contador++;
  }

  // B = | 2 3 4 1 0 0 |
  //     | 2 3 5 0 1 0 |
  //     | 2 3 6 0 0 1 |
  // La variable finish determinará si ya se ha calculado
  // la identidad de una matriz
  let finish = false;

  while(!finish) {
    // Se verifica si ya finalizó el calculo de la matriz identidad
    finish = verInversa(matriz);

    if (finish) break;

    // La función se encarga de realizar la inversa
    matriz = gaussJordan(matriz); 

    // Mostrar matriz
    console.log(matriz);
  }

  return matriz;
}

// Tercera función principal.
function simplexRecursivo(C, CB, XB, A, B, b, Bi, CBBi, BiA, CBBiAmC, CBBib, Bib, iteraciones) {
  // Si la cantidad de iteraciones es 0,
  // es porque se hará la iteración inicial
  // Por ende, nada más se debe decidir la variable que sale
  // y la variable que entra.
  // Para ello se escoge la variable más negativa.
  if (iteraciones.length == 0) {
    let aux = 0;
    for (let i = 0; i < cantVd; i++) {
      let inicial = CBBiAmC[i];  
      if (inicial < aux) {
        aux = inicial;
      }
    }

    // pos1 determinará la posición en la que se encontró el valor menor
    // así se obtendrá la variable de decisión que ingresa a la función
    let pos1 = CBBiAmC.indexOf(aux);

    // Se crea un arreglo donde se irán guardando todos los ratios
    let ratios = [];

    // Posteriormente, se realiza un ciclo para ir almacenando cada ratio
    for (let j = 0; j < cantRs; j++) {
      let ratio = BiA[j][pos1]/Bib[j];
      console.log("Ratio: " + ratio);
      ratios[j] = cociente;
    }

    // Se crea una variable auxRatio para almacenar el mayor valor del
    // arreglo de ratios
    let auxRatio = Number.MAX_VALUE;
    for (let j = 0; j < cantRs; j++) {
      let inicial = ratios[j];
      if (inicial < auxRatio && inicial > 0) {
        auxRatio = inicial;
      }
    }

    // La pos2 se obtiene a partir de los ratios
    // y permite obtener la variable de salida
    let pos2 = ratios.indexOf(auxRatio);

    // Se cambia CB
    CB[pos2] = C[pos2];

    // Se cambia la matriz B
    for (let j = 0; j < cantRs; j++) {
      B[j][pos2] = A[j][pos2];
    }

    Bi = minversa(B);
    CBBi = mmult(CB, Bi);
    CBBib = mmult(CBBi, b);
    Bib = mmult(Bi, b);
    CBBiAmC = mmultmC(CBBi, A, C);

    // De lo contrario, es porque ya se tiene más de una iteración
  } else {

  }

}

// Segunda función principal.
// Se encargará de realizar todas las operaciones del método simplex.
function realizarSimplex() {
  // inputVd + número (desde 1: inputVd1, inputVd2, etc.) -> Coeficientes en la función objetivo
  // inputResVd + número (desde 1: inputResVd1, inputResVd2, etc.) -> Coeficientes de cada restricción
  // inputResMenorIgual + número (desde 1: inputResMenorIgual1, inputResMenorIgual2, etc.) -> Valores de menor o igual a de cada restricción

  // Coeficientes en la función objetivo
  let C = [];

  // Coeficientes en la función objetivo
  let CB = [];

  // Variables de holgura
  let XB = [];

  // Matriz A
  // Matriz de coeficientes de restricciones en la función objetivo
  let A = [];

  // Matriz B
  // Matriz de coeficientes en las restricciones que entran a la función objetivo
  let B = [];

  // Vector b
  // Vector de resultados de restricciones
  let b = [];

  // CB x Inversa de la matriz B x A - C
  let CBBiAmC = [];

  // CB x Inversa de la matriz B
  let CBBi = [];

  // CB x Inversa de la matriz B x Vector B
  let CBBib = 0;

  // Inversa de la matriz B x A
  let BiA = [];

  // Inversa de la matriz B
  let Bi = [];

  // Inversa de la matriz B x Vector b
  let Bib = [];

  // Vector C
  // Coeficientes de las variables básicas en la función objetivo
  for (let i  = 0; i < cantVd; i++) {
    C[i] = parseInt(document.getElementById(`inputVd${(i+1)}`).value);
  }

  // Vector CB
  // Coeficientes de las variables básicas (Variables que están en la función objetivo)
  // Inicialmente en 0
  for (let i = 0; i < cantRs; i++) {
    CB[i] = 0;
  }

  // Vector XB
  // Variables que entran en la iteración
  for (let i = 0; i < cantRs; i++) {
    XB[i] = `S${(i+1)}`;
  }

  // Matriz A
  // Coeficientes de las variables básicas en cada una de las restricciones
  for (let i = 0; i < cantRs; i++) {
    A[i] = new Array(cantVd);
    for (let j = 0; j  < cantVd; j++) {
      A[i][j] = parseInt(document.getElementById(`inputResVd${(j+1)}`).value);
    }
  }

  // Matriz B
  // Matriz de evaluación de coeficientes de las restricciones que entran
  // Primero es la matriz identidad
  let contador = 0; // Me ayuda a crear la matriz identidad
  for (let i = 0; i < cantRs; i++) {
    B[i] = new Array(cantRs);
    for (let j = 0; j < cantRs; j++) {
      if (j == contador) {
        B[i][j] = 1;
      } else {
        B[i][j] = 0;
      }
    }
    contador++;
  }

  console.log(B);

  // Vector b
  // Valores de cada una de las restricciones
  for (let i = 0; i < cantRs; i++) {
    let menorIgual = parseInt(document.getElementById('inputResMenorIgual').value);
    b[i] = menorIgual;
  }

  // Inicialmente Bi es igual a B
  Bi = B;

  // CB x Inversa de la matriz B inicialmente es 0
  for (let i = 0; i < cantRs; i++) {
    CB[i] = 0;
  }
  
  // Inversa de la matriz B x A inicialmente es igual a A
  BiA = A;

  // CB x Inversa de la matriz B x A - C inicialmente es igual a C, solo que invertidos
  for (let i = 0; i < cantVd; i++) {
    CBBiAmC[i] = (C[i] * -1)
  }

  // Inicialmente CB x Inversa de la matriz B x Vector b es igual a 0;
  CBBib = 0;

  // Inicialmente Inversa de la matriz B x Vector b es igual al Vector b
  Bib = b;

  // Inicialmente, la cantidad de iteraciones tendrá un cantidad de iteraciones igual a 0
  iteraciones = [] 

  iteraciones = simplexRecursivo(C, CB, XB, A, B, b, Bi, CBBi, BiA, CBBiAmC, CBBib, Bib, iteraciones);




  

  console.log('Coeficiente de la primera variable de decisión en la restricción #1: ' + document.getElementById('inputResVd1').value);
  console.log('Coeficiente de la segunda variable de decisión en la restricción #1 : ' + document.getElementById('inputResVd2').value);
  console.log('Resultado de la restricción #1: ' + document.getElementById('inputResMenorIgual1').value);

  console.log('Cantidad de variables de decisión: ' + cantVd);

  alert('Hello World');

}
