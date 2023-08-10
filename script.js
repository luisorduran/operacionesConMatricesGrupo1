//Funcion para mostrar la pestaña que se seleccione
function openTab(tabName) {
  var i, tabContent, tabButton;
  
  // Obtener todos los elementos con la clase "tab-content"
  tabContent = document.getElementsByClassName("tab-content");
  
  // Ocultar los contenidos de todas las pestañas
  for (i = 0; i < tabContent.length; i++) {
    tabContent[i].style.display = "none";
  }
  
  // Obtener todos los elementos con la clase "tab-button"
  tabButton = document.getElementsByClassName("tab-button");
  
  // Eliminar la clase "active" de todos los botones de pestaña
  for (i = 0; i < tabButton.length; i++) {
    tabButton[i].className = tabButton[i].className.replace(" active", "");
  }
  
  // Mostrar el contenido de la pestaña seleccionada
  document.getElementById(tabName).style.display = "block";
  
  // Agregar la clase "active" al botón de pestaña actual
  event.currentTarget.className += " active";
}

//Limpiar campos de texto
function limpiarCampo() {
  var camposTexto = document.getElementsByTagName("textarea");
  for (var i = 0; i < camposTexto.length; i++) {
    camposTexto[i].value = ""; // Limpiar el contenido del campo de texto
  }
}

// Logica de operaciones
// Funcion para validar que solo haya numeros
function ValidaSoloNumeros() {
  if ((event.keyCode < 48) || (event.keyCode > 57) && (event.keyCode != 32)) 
   event.returnValue = false;
  
 }

// Función para convertir una cadena de texto en una matriz numérica
function parseMatrix(matrixStr) {
  return matrixStr
    .trim()
    .split("\n")
    .map((row) => row.trim().split(/\s+/).map(Number));
}

// Función para convertir una matriz en una cadena formateada
function formatMatrix(matrix) {
  return matrix.map((row) => row.join("\t")).join("\n");
}

// Función para sumar dos matrices
function sumMatrix() {
  // Obtener las cadenas de las matrices de entrada desde los elementos de la página HTML
  const matrixAStr = document.getElementById("matrixA").value;
  const matrixBStr = document.getElementById("matrixB").value;

  // Convertir las cadenas en matrices numéricas utilizando la función parseMatrix
  const matrixA = parseMatrix(matrixAStr);
  const matrixB = parseMatrix(matrixBStr);

  // Verificar si las matrices tienen las mismas dimensiones
  if (
    matrixA.length !== matrixB.length ||
    matrixA[0].length !== matrixB[0].length
  ) {
    alert("Las matrices deben tener las mismas dimensiones.");
    return;
  }

  // Sumar las matrices elemento por elemento utilizando map()
  const resultMatrix = matrixA.map((rowA, i) =>
    rowA.map((_, j) => matrixA[i][j] + matrixB[i][j])
  );

  // Actualizar el valor del elemento de la página HTML con la matriz resultante formateada
  document.getElementById("resultSumSub").value = formatMatrix(resultMatrix);
}

// Función para restar dos matrices (similar a sumMatrix)
function subtractMatrix() {
  // Obtener las cadenas de las matrices de entrada desde los elementos de la página HTML
  const matrixAStr = document.getElementById("matrixA").value;
  const matrixBStr = document.getElementById("matrixB").value;

  // Convertir las cadenas en matrices numéricas utilizando la función parseMatrix
  const matrixA = parseMatrix(matrixAStr);
  const matrixB = parseMatrix(matrixBStr);

  // Verificar si las matrices tienen las mismas dimensiones
  if (
    matrixA.length !== matrixB.length ||
    matrixA[0].length !== matrixB[0].length
  ) {
    alert("Las matrices deben tener las mismas dimensiones.");
    return;
  }

  // Restar las matrices elemento por elemento utilizando map()
  const resultMatrix = matrixA.map((rowA, i) =>
    rowA.map((_, j) => matrixA[i][j] - matrixB[i][j])
  );

  // Actualizar el valor del elemento de la página HTML con la matriz resultante formateada
  document.getElementById("resultSumSub").value = formatMatrix(resultMatrix);
}

// Función para multiplicar dos matrices
function multiplyMatrix() {
  // Obtener las cadenas de las matrices de entrada desde los elementos de la página HTML
  const matrixCStr = document.getElementById("matrixC").value;
  const matrixDStr = document.getElementById("matrixD").value;

  // Convertir las cadenas en matrices numéricas utilizando la función parseMatrix
  const matrixC = parseMatrix(matrixCStr);
  const matrixD = parseMatrix(matrixDStr);

  // Verificar si las dimensiones de las matrices permiten la multiplicación
  if (matrixC[0].length !== matrixD.length) {
    alert(
      "El número de columnas de la matriz A debe ser igual al número de filas de la matriz B."
    );
    return;
  }

  // Inicializar la matriz resultante
  const resultMatrix = [];

  // Multiplicar las matrices utilizando bucles for
  for (let i = 0; i < matrixC.length; i++) {
    resultMatrix[i] = [];
    for (let j = 0; j < matrixD[0].length; j++) {
      let sum = 0;
      for (let k = 0; k < matrixD.length; k++) {
        sum += matrixC[i][k] * matrixD[k][j];
      }
      resultMatrix[i][j] = sum;
    }
  }

  // Actualizar el valor del elemento de la página HTML con la matriz resultante formateada
  document.getElementById("resultMultiply").value = formatMatrix(resultMatrix);
}

// Función para calcular la matriz transpuesta de una matriz dada
function transposeMatrix() {
  // Obtener la cadena de la matriz de entrada desde el elemento de la página HTML
  const matrixEStr = document.getElementById("matrixE").value;

  // Convertir la cadena en una matriz numérica utilizando la función parseMatrix
  const matrixE = parseMatrix(matrixEStr);

  // Calcular la matriz transpuesta utilizando map() y la transposición de filas y columnas
  const resultMatrix = matrixE[0].map((_, i) => matrixE.map((row) => row[i]));

  // Actualizar el valor del elemento de la página HTML con la matriz resultante formateada
  document.getElementById("resultTranspose").value = formatMatrix(resultMatrix);
}

// Función para resolver un sistema de ecuaciones lineales
function solveEquations() {
  // Obtener las cadenas de la matriz y el vector de entrada desde los elementos de la página HTML
  const matrixFStr = document.getElementById("matrixF").value;
  const vectorBStr = document.getElementById("vectorB").value;

  // Convertir las cadenas en matrices numéricas utilizando la función parseMatrix
  const matrixF = parseMatrix(matrixFStr);
  const vectorB = parseMatrix(vectorBStr);

  // Verificar si el número de ecuaciones es igual al número de filas de la matriz
  if (matrixF.length !== vectorB.length) {
    alert(
      "El número de ecuaciones en el sistema debe ser igual al número de filas de la matriz."
    );
    return;
  }

  // Crear una matriz de resultados y combinar los coeficientes con las incógnitas y el término independiente
  const resultMatrix = [];
  for (let i = 0; i < matrixF.length; i++) {
    const equation = matrixF[i].join("x") + " = " + vectorB[i][0];
    resultMatrix.push(equation);
  }

  // Actualizar el valor del elemento de la página HTML con las ecuaciones resultantes formateadas
  document.getElementById("resultEquations").value = resultMatrix.join("\n");
}
