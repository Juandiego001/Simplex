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

  cantVd = parseInt(document.getElementById('entrada-variables').value);
  cantRs = parseInt(document.getElementById('entrada-restricciones').value);

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
      let input = await inputResVd(i + 1, j+1);
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
  input.type = 'number';
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

function inputResVd(i, j) {
  let input = document.createElement('input');
  
  input.className = 'inputVd';
  input.type = 'number';
  input.placeholder = '0';
  input.id = `inputResVd${i}${j}`;


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
  input.type = 'number';
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

function mostrarSolucion(XB, CBBib, Bib) {
  let divSolucion = document.createElement('div');

  divSolucion.className = 'div-solucion';

  let p1 = document.createElement('p');
  let p2 = document.createElement('p');

  p1.innerHTML = 'Solución: ';  
  p2.innerHTML = 'La solución óptima es Z = ' + CBBib + ' con las siguientes variables básicas: ';

  divSolucion.appendChild(p1);
  divSolucion.appendChild(p2);

  for (let i = 0; i < XB.length; i++) {
    let p = document.createElement('p');
    p.innerHTML = `${XB[i]} = ${Bib[i]}`;
    divSolucion.appendChild(p);
  }

  let footer = document.getElementsByTagName('footer')[0];
  document.getElementsByTagName('body')[0].insertBefore(divSolucion, footer); 
  
}

// Función para verificar si es la solución óptima
function verOptima(matriz) {

  // Se recorre toda la matriz verificando que cada uno de los
  // valores en la columna es mayor o igual a 0
  for (let i = 0; i  < matriz[0].length; i++) {
    if (matriz[0][i] < 0) return false;
  }

  return true;
}

// Tercera función principal.
function simplexRecursivo(C, CB, XB, A, B, b, Bi, CBBi, BiA, CBBiAmC, CBBib, Bib, iteraciones) {
  // Se debe decidir la variable que sale
  // y la variable que entra.
  // Para ello se escoge la variable más negativa.
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
  // Si el dividendo es 0 de la matriz 
  for (let j = 0; j < cantRs; j++) {
    let ratio = -1;
    if (BiA[j][pos1] != 0) ratio = Bib[j]/BiA[j][pos1];
    ratios[j] = ratio;
  }

  // Se crea una variable auxRatio para almacenar el menor valor del
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
  CB[pos2] = C[pos1];

  // Se cambia la matriz B
  for (let j = 0; j < cantRs; j++) {
    B[j][pos2] = A[j][pos1];
  }

  // Realizamos los cambios en el vector XB
  XB[pos2] = `X${(pos1+1)}`;

  Bi = math.inv(B);
  CBBi = math.multiply(CB, Bi);
  CBBib = math.multiply(CBBi, b);
  Bib = math.multiply(Bi, b);
  CBBiAmC = math.subtract(math.multiply(CBBi, A), C);

  console.log('CBBiAmC');
  console.log(CBBiAmC);

  // Verificamos si la solución obtenida es la óptima
  let optima = verOptima(CBBiAmC);

  // Si es óptima, retornamos las iteraciones.
  if (optima) {
    for (let i = 0; i < XB.length; i++) {
      console.log('Variable: ' + XB[i] + ' tiene un valor de: ' + Bib[i]);
    }
    iteraciones.push([C, CB, XB, A, B, b, Bi, CBBi, BiA, CBBiAmC, CBBib, Bib]);
    return iteraciones;
  } else {
    iteraciones.push([C, CB, XB, A, B, b, Bi, CBBi, BiA, CBBiAmC, CBBib, Bib]);
    return simplexRecursivo(C, CB, XB, A, B, b, Bi, CBBi, BiA, CBBiAmC, CBBib, Bib, iteraciones);
  }
}

// Mostrar iteraciones
function mostrarIteraciones(i, BiA) {
  let divGeneral = document.createElement('div');
  let h2 = document.createElement('h2');
  let divGrid = document.createElement('div');

  // Estilizandolo div
  divGeneral.style.width = '100%';
  divGeneral.style.minHeight = '55vh';
  divGeneral.style.backgroundColor = '#0077B6';
  divGeneral.style.display = 'grid';
  divGeneral.style.gridTemplateRows = '20% 80%';
  divGeneral.style.justifyContent = 'center';
  divGeneral.style.alignItems = 'center';
  divGeneral.style.textAlign = 'center';

  // Estilizando h2
  h2.innerHTML =  `Iteración #${i}`
  h2.style.width = '100%';
  h2.style.height = '100%';
  h2.style.display = 'flex';
  h2.style.justifyContent = 'center';
  h2.style.alignItems = 'center';
  h2.style.alignSelf = 'center';
  h2.style.fontFamily = "'Inria serif', 'serif'";
  h2.style.color = 'white';
  h2.style.fontSize = '1.5rem';
  h2.style.textAlign = 'center';
  h2.style.paddingTop = '.25rem';

  divGeneral.append(h2);

  // Estilizando divGrid
  divGrid.style.width = '100%';
  divGrid.style.height = '90%';
  divGrid.style.backgroundColor = '#0077B6';
  divGrid.style.display = 'grid';
  divGrid.style.gridTemplateColumns = `${(parseInt((100/cantVd)) + '%' + ' ').repeat(cantVd)}`;
  divGrid.style.gridTemplateColumns = `${(parseInt((100/cantRs)) + '%' + ' ').repeat(cantRs)}`;
  divGrid.style.justifyContent = 'center';
  divGrid.style.alignItems = 'center';
  divGrid.style.textAlign = 'center';
  divGrid.style.alignSelf = 'center';
  divGrid.style.paddingTop = '.25rem';

  for (let i = 0; i < cantRs; i++) {
    for (let j = 0; j < cantVd; j++) {
      let valor = document.createElement('p');

      valor.style.width = '100%';
      valor.style.height = '100%';
      valor.style.fontFamily = "'Inria serif', 'serif'";
      valor.style.color = 'white';
      valor.style.fontSize = '1.25rem';
      valor.style.display = 'flex';
      valor.style.justifyContent = 'center';
      valor.style.alignItems = 'center';
      valor.style.textAlign = 'center';
      valor.style.borderTop = '1px solid white';
      valor.style.borderLeft = '1px solid white';
      valor.style.padding = '.25rem';

      valor.innerHTML = BiA[i][j];

      divGrid.append(valor);
    }
  }

  divGeneral.appendChild(divGrid);

  return new Promise(resolve => {
    resolve(divGeneral);
  })
}

// Segunda función principal.
// Se encargará de realizar todas las operaciones del método simplex.
async function realizarSimplex() {
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
    for (let j = 0; j < cantVd; j++) {
      A[i][j] = parseInt(document.getElementById(`inputResVd${(i+1)}${(j+1)}`).value);
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

  // Vector b
  // Valores de cada una de las restricciones
  for (let i = 0; i < cantRs; i++) {
    let menorIgual = parseInt(document.getElementById(`inputResMenorIgual${(i+1)}`).value);
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

  let footer = document.getElementsByTagName('footer')[0];
  let body = document.getElementsByTagName('body')[0];

  for (let i = 0; i < iteraciones.length; i++) {
    console.log(iteraciones[i][8]);
    let divIteracion = await mostrarIteraciones((i+1), iteraciones[i][8]);

    body.insertBefore(divIteracion, footer);
  }


  mostrarSolucion(iteraciones[iteraciones.length - 1][2], iteraciones[iteraciones.length - 1][10], iteraciones[iteraciones.length - 1][11]);

}
