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
function ValidaSoloNumeros(event) {
  const keyCode = event.keyCode || event.which;

  // Permitir números (0-9), tecla espacio (32), tecla enter (13) y teclas direccionales (37-40)
  if (
    (keyCode >= 48 && keyCode <= 57) || // Números del 0 al 9
    keyCode === 32 || // Tecla espacio
    keyCode === 13 || // Tecla enter
    (keyCode >= 37 && keyCode <= 40) // Teclas direccionales (izquierda, arriba, derecha, abajo)
  ) {
    return true; // Permitir la tecla
  } else {
    return false; // Prevenir la tecla
  }
}

// Funcion para validar que solo haya numeros


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
document.addEventListener("DOMContentLoaded", function() {
  const calculateButton = document.getElementById("resolverEcuacion");
  const matrixAInput = document.getElementById("matrixF");
  const matrixBInput = document.getElementById("matrixG");
  const outputResult = document.getElementById("resultEquations");

  calculateButton.addEventListener("click", function() {
      const matrixAText = matrixAInput.value.trim();
      const matrixBText = matrixBInput.value.trim();

      if (matrixAText === "" || matrixBText === "") {
          outputResult.value = "Ingrese matrices válidas.";
          return;
      }

      try {
          const result = solveMatrixEquations(matrixAText, matrixBText);
          outputResult.value = `${result}`;
      } catch (error) {
          outputResult.value = "Error: " + error.message;
      }
  });

  function solveMatrixEquations(matrixAText, matrixBText) {
      const matrixA = parseMatrix(matrixAText);
      const matrixB = parseMatrix(matrixBText);

      if (matrixA.length !== matrixB.length) {
          throw new Error("Las matrices deben tener el mismo número de filas.");
      }

      // Aquí puedes usar la función 'math.lusolve' de 'math.js' para resolver el sistema de ecuaciones lineales.
      const solution = math.lusolve(matrixA, matrixB);

      // Crear el string de resultados con incógnitas
      const resultString = solution.map((value, index) => {
          const variable = String.fromCharCode(120 + index); // 'x', 'y', 'z'
          return `${variable} = ${Math.round(value[0])}`;
      }).join("\n");

      return resultString;
  }

  function parseMatrix(matrixText) {
      const rowsData = matrixText.split("\n").map(row => row.trim().split(/\s+/).map(Number));

      const numRows = rowsData.length;
      const numCols = rowsData[0].length;

      if (numRows > 3 || numCols > 3) {
          throw new Error("Las matrices deben ser de tamaño 3x3 o menos.");
      }

      return rowsData;
  }
});
