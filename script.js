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
  var camposTexto2 = document.getElementsByTagName("input");
  for (var i = 0; i < camposTexto.length; i++) {
    camposTexto[i].value = ""; // Limpiar el contenido del campo de texto
  }
  for (var i = 0; i < camposTexto2.length; i++) {
    camposTexto2[i].value = ""; // Limpiar el contenido del campo de texto
  }
    
  document.getElementById("resultado").innerHTML = "";   
  
  
}

// Logica de operaciones

// Funcion para validar que solo haya numeros
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

// Función para resolver de ecuaciones con matrices

// Esta función convierte una cadena de texto en un array bidimensional
function textoAMatriz(texto) {
  // Primero se separa la cadena por los saltos de línea para obtener las filas
  let filas = texto.split("\n");
  // Luego se crea un array vacío para almacenar la matriz
  let matriz = [];
  // Se recorre cada fila y se separa por los espacios para obtener los elementos
  for (let i = 0; i < filas.length; i++) {
    let elementos = filas[i].split(" ");
    // Se convierte cada elemento en un número y se añade al array de la matriz
    for (let j = 0; j < elementos.length; j++) {
      elementos[j] = Number(elementos[j]);
    }
    matriz.push(elementos);
  }
  // Se devuelve el array bidimensional que representa la matriz
  return matriz;
}

// Esta función valida que las matrices introducidas sean válidas y que la operación sea posible
function validar(matrizA, matrizB, operacion) {
  // Se comprueba que las matrices no estén vacías
  if (matrizA.length == 0 || matrizB.length == 0) {
    return false;
  }
  // Se comprueba que las matrices tengan el mismo número de filas y columnas
  let filasA = matrizA.length;
  let columnasA = matrizA[0].length;
  let filasB = matrizB.length;
  let columnasB = matrizB[0].length;
  if (filasA != filasB || columnasA != columnasB) {
    return false;
  }
  // Se comprueba que la operación sea válida y que se pueda realizar con las matrices dadas
  // Se usa una expresión regular para verificar que la operación tenga el formato correcto
  let regex = /^(\d+)?\*?\(?((A|B)(\+|\-)(A|B))\)?(t)?$/;
  if (!regex.test(operacion)) {
    return false;
  }
  // Se extraen los componentes de la operación usando la expresión regular
  let match = regex.exec(operacion);
  let factor = match[1] ? Number(match[1]) : null; // El factor opcional que multiplica a las matrices
  let expresion = match[2]; // La expresión entre paréntesis que contiene las matrices y el signo
  let transpuesta = match[6] ? true : false; // El indicador opcional de si se quiere la transpuesta del resultado
  // Se comprueba que la expresión sea válida y que se pueda realizar con las matrices dadas
  // Se usa otra expresión regular para verificar que la expresión tenga el formato correcto
  let regex2 = /^(A|B)(\+|\-)(A|B)$/;
  if (!regex2.test(expresion)) {
    return false;
  }
  // Se extraen los componentes de la expresión usando la expresión regular
  let match2 = regex2.exec(expresion);
  let matriz1 = match2[1]; // La primera matriz de la expresión
  let signo = match2[2]; // El signo de la expresión (+ o -)
  let matriz2 = match2[3]; // La segunda matriz de la expresión
  // Se comprueba que las matrices sean distintas y que el signo sea válido
  if (matriz1 == matriz2 || (signo != "+" && signo != "-")) {
    return false;
  }
  // Si se pasa todas las comprobaciones, se devuelve true
  return true;
}

// Esta función realiza la operación solicitada con las matrices dadas y devuelve el resultado
function operar(matrizA, matrizB, operacion) {
  // Se extraen los componentes de la operación usando la expresión regular
  let regex = /^(\d+)?\*?\(?((A|B)(\+|\-)(A|B))\)?(t)?$/;
  let match = regex.exec(operacion);
  let factor = match[1] ? Number(match[1]) : null; // El factor opcional que multiplica a las matrices
  let expresion = match[2]; // La expresión entre paréntesis que contiene las matrices y el signo
  let transpuesta = match[6] ? true : false; // El indicador opcional de si se quiere la transpuesta del resultado
  // Se extraen los componentes de la expresión usando la expresión regular
  let regex2 = /^(A|B)(\+|\-)(A|B)$/;
  let match2 = regex2.exec(expresion);
  let matriz1 = match2[1]; // La primera matriz de la expresión
  let signo = match2[2]; // El signo de la expresión (+ o -)
  let matriz2 = match2[3]; // La segunda matriz de la expresión
  // Se crea un array vacío para almacenar el resultado de la operación
  let resultado = [];
  // Se recorren las filas y columnas de las matrices y se realiza la operación correspondiente
  for (let i = 0; i < matrizA.length; i++) {
    let fila = [];
    for (let j = 0; j < matrizA[i].length; j++) {
      let valor;
      if (signo == "+") {
        valor = matrizA[i][j] + matrizB[i][j];
      } else if (signo == "-") {
        if (matriz1 == "A") {
          valor = matrizA[i][j] - matrizB[i][j];
        } else {
          valor = matrizB[i][j] - matrizA[i][j];
        }
      }
      if (factor) {
        valor *= factor;
      }
      fila.push(valor);
    }
    resultado.push(fila);
  }
  // Si se quiere la transpuesta del resultado, se intercambian las filas por las columnas
  if (transpuesta) {
    let transpuesta = [];
    for (let i = 0; i < resultado[0].length; i++) {
      let columna = [];
      for (let j = 0; j < resultado.length; j++) {
        columna.push(resultado[j][i]);
      }
      transpuesta.push(columna);
    }
    resultado = transpuesta;
  }
  // Se devuelve el array bidimensional que representa el resultado de la operación
  return resultado;
}

// Esta función muestra el resultado de la operación en el elemento HTML con id "resultado"
function mostrar(resultado) {
  // Se crea una tabla HTML para mostrar el resultado de forma ordenada
  let tabla = "<table>";
  for (let i = 0; i < resultado.length; i++) {
    tabla += "<tr>";
    for (let j = 0; j < resultado[i].length; j++) {
      tabla += "<td>" + resultado[i][j] + "</td>";
    }
    tabla += "</tr>";
  }
  tabla += "</table>";
  
let elemento = document.getElementById("resultado");
elemento.innerHTML = tabla;
}

// Esta función se ejecuta cuando se hace clic en el botón "Calcular"
function calcular() {
// Se obtienen los valores de los elementos HTML con id "matrizA", "matrizB" y "operacion"
let textoA = document.getElementById("matrixF").value;
let textoB = document.getElementById("matrixG").value;
let operacion = document.getElementById("operacion").value;
// Se convierten los textos en matrices
let matrizA = textoAMatriz(textoA);
let matrizB = textoAMatriz(textoB);
// Se valida que las matrices y la operación sean correctas
let valido = validar(matrizA, matrizB, operacion);
if (valido) {
  // Se opera con las matrices y se obtiene el resultado
  let resultado = operar(matrizA, matrizB, operacion);
  // Se muestra el resultado en el elemento HTML con id "resultado"
  mostrar(resultado);
} else {
  // Se muestra un mensaje de error en el elemento HTML con id "resultado"
  let elemento = document.getElementById("resultado");
  elemento.innerHTML = "<p>Los datos introducidos no son válidos. Por favor, revisa las matrices y la operación.</p>";
}
}

