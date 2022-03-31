function main() {
  let variablesDecision = 0;
  let cantidadRestricciones = 0;
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

  variablesDecision = parseInt(prompt("Ingrese la cantidad de variables de decisión"));
  cantidadRestricciones = parseInt(prompt("Ingrese la cantidad de restricciones"));

  for (let i = 0; i < cantidadRestricciones; i++) {
    A[i] = new Array(variablesDecision);
  }
  
  for (let i = 0; i < variablesDecision; i++) {
    A[i] = parseInt(prompt("Ingrese el coeficiente de la variable X" + (i+1)));
  }

  for (let i = 0; i < cantidadRestricciones; i++) {
    for (let j = 0; j < variablesDecision; j++) {
      A[i][j] = parseInt(prompt("Ingrese el coeficiente de la variable X" + (j+1) + " en la restricción #" + (i+1)));
    }
    b[i] = parseInt(prompt("Ingrese el resultado de la restricción #" + (i+1)));
  }

  


}
