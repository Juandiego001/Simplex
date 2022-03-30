function main() {
  let variablesDecision = 0;
  let cantidadRestricciones = 0;
  let coeficientesFuncionObjetivo = [];
  let vectorB = [];

  variablesDecision = parseInt(prompt("Ingrese la cantidad de variables de decisión"));
  cantidadRestricciones = parseInt(prompt("Ingrese la cantidad de restricciones"));

  let coeficientesRestricciones = [];

  for (let i = 0; i < cantidadRestricciones; i++) {
    coeficientesRestricciones[i] = new Array(variablesDecision);
  }
  
  for (let i = 0; i < variablesDecision; i++) {
    coeficientesFuncionObjetivo[i] = parseInt(prompt("Ingrese el coeficiente de la variable X" + (i+1)));
  }

  for (let i = 0; i < cantidadRestricciones; i++) {
    for (let j = 0; j < variablesDecision; j++) {
      coeficientesRestricciones[i][j] = parseInt(prompt("Ingrese el coeficiente de la variable X" + (j+1) + " en la restricción #" + (i+1)));
    }
    vectorB[i] = parseInt(prompt("Ingrese el resultado de la restricción #" + (i+1)));
  }

  // for (let i = 0; i < coeficientesFuncionObjetivo.length; i++) {
  //   console.log("Coeficiente #" + i + ": " + coeficientesFuncionObjetivo[i]);
  // }

  for (let i = 0; i < cantidadRestricciones; i++) {
    console.log("Para la restriccion: " + (i+1) + ":\n");
    for (let j = 0; j < variablesDecision; j++) {
      console.log("Coeficiente de la variable X" + (j+1) + ": " + coeficientesRestricciones[i][j]);
    }
  }
  

  console.log(coeficientesRestricciones);
  console.log(vectorB);

}
