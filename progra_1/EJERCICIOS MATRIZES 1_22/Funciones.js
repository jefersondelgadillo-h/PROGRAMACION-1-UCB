function crearMatriz(valor = 0) {
  return Array.from({ length: 10 }, () => Array(10).fill(valor));
}

function imprimirMatriz(matriz) {
  matriz.forEach(fila => console.log(fila.join("")));
}
