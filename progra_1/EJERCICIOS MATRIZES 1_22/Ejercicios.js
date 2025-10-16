// Ejercicio 1: Cuadrado Relleno
function ejercicio1() {
  return crearMatriz(1);
}

// Ejercicio 2: Marco Interno
function ejercicio2() {
  const m = crearMatriz(1);
  for (let i = 0; i < 10; i++) {
    m[0][i] = m[9][i] = m[i][0] = m[i][9] = 0;
  }
  return m;
}

// Ejercicio 3: Cruces
function ejercicio3() {
  const m = crearMatriz(0);
  for (let i = 0; i < 10; i++) {
    m[4][i] = 1;
    m[i][4] = 1;
  }
  return m;
}

// Ejercicio 4: Bordes y Diagonales
function ejercicio4() {
  const m = crearMatriz(0);
  for (let i = 0; i < 10; i++) {
    m[0][i] = m[9][i] = m[i][0] = m[i][9] = 1;
    m[i][i] = 2;
    m[i][9 - i] = 2;
  }
  return m;
}

// Ejercicio 5: Bandera
function ejercicio5() {
  const m = crearMatriz(0);
  for (let i = 0; i < 3; i++) m[i].fill(1);
  for (let i = 3; i < 6; i++) m[i].fill(2);
  return m;
}

// Ejercicio 6: Relleno Alterno
function ejercicio6() {
  const m = crearMatriz();
  for (let i = 0; i < 10; i++) m[i].fill(i % 2);
  return m;
}

// Ejercicio 7: Zig-Zag Horizontal
function ejercicio7() {
  const m = crearMatriz(0);
  for (let i = 0; i < 10; i++) m[i][i] = 1;
  return m;
}

// Ejercicio 8: Relleno en Espiral
function ejercicio8() {
  const m = crearMatriz(0);
  let val = 1, top = 0, bottom = 9, left = 0, right = 9;
  while (top <= bottom && left <= right) {
    for (let i = left; i <= right; i++) m[top][i] = val;
    top++;
    for (let i = top; i <= bottom; i++) m[i][right] = val;
    right--;
    for (let i = right; i >= left; i--) m[bottom][i] = val;
    bottom--;
    for (let i = bottom; i >= top; i--) m[i][left] = val;
    left++;
  }
  return m;
}

// Ejercicio 9: Triángulo Superior Izquierdo
function ejercicio9() {
  const m = crearMatriz(0);
  for (let i = 0; i < 10; i++)
    for (let j = 0; j <= i; j++) m[i][j] = 1;
  return m;
}

// Ejercicio 10: Triángulo Inferior Derecho
function ejercicio10() {
  const m = crearMatriz(0);
  for (let i = 0; i < 10; i++)
    for (let j = 9; j >= 9 - i; j--) m[i][j] = 1;
  return m;
}

// Ejercicio 11: Cuadrícula
function ejercicio11() {
  const m = crearMatriz(0);
  for (let i = 0; i < 10; i += 2) m[i].fill(1);
  for (let i = 1; i < 10; i += 2) {
    m[i][0] = m[i][9] = 1;
  }
  return m;
}

// Ejercicio 12: Triángulo Central
function ejercicio12() {
  const m = crearMatriz(0);
  for (let i = 1; i <= 5; i++) {
    for (let j = 5 - i; j <= 5 + i; j++) {
      m[i][j] = 1;
    }
  }
  return m;
}

// Ejercicio 13: Rombos Concéntricos
function ejercicio13() {
  const m = crearMatriz(0);
  for (let i = 1; i <= 4; i++) {
    for (let j = 5 - i; j <= 5 + i; j++) {
      m[i][j] = 1;
      m[9 - i][j] = 1;
    }
  }
  m[5].fill(1);
  m[4].fill(1);
  return m;
}

// Ejercicio 14: Cruces Concéntricas
function ejercicio14() {
  const m = crearMatriz(0);
  for (let i = 1; i < 9; i++) {
    m[i][1] = m[i][8] = 1;
    m[i][4] = 1;
  }
  for (let j = 1; j < 9; j++) {
    m[1][j] = m[8][j] = 1;
    m[4][j] = 1;
  }
  return m;
}

// Ejercicio 15: Bandera Diagonal
function ejercicio15() {
  const m = crearMatriz(0);
  for (let i = 0; i < 10; i++)
    for (let j = 0; j <= i; j++) m[i][j] = 1;
  return m;
}

// Ejercicio 16: Cuadrado dentro de Cuadrado
function ejercicio16() {
  const m = crearMatriz(0);
  for (let i = 0; i < 10; i++) m[0][i] = m[9][i] = m[i][0] = m[i][9] = 1;
  for (let i = 2; i <= 7; i++)
    for (let j = 2; j <= 7; j++) m[i][j] = 2;
  return m;
}

// Ejercicio 17: Bordes y Centro
function ejercicio17() {
  const m = crearMatriz(0);
  for (let i = 0; i < 10; i++) m[0][i] = m[9][i] = m[i][0] = m[i][9] = 1;
  for (let i = 3; i <= 5; i++)
    for (let j = 3; j <= 6; j++) m[i][j] = 2;
  return m;
}

// Ejercicio 18: Líneas Paralelas
function ejercicio18() {
  const m = crearMatriz(0);
  for (let i = 0; i < 10; i += 2) m[i].fill(1);
  for (let i = 1; i < 10; i += 2) {
    m[i][0] = m[i][9] = 1;
  }
  return m;
}

// Ejercicio 19: Marcas de Cruz
function ejercicio19() {
  const m = crearMatriz(0);
  for (let i = 0; i < 10; i++) {
    m[i][i % 3] = 1;
    m[i][(i + 4) % 10] = 1;
  }
  return m;
}

// Ejercicio 20: Rombo de Esquinas
function ejercicio20() {
  const m = crearMatriz(0);
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4 - i; j++) {
      m[i][j] = m[i][9 - j] = m[9 - i][j] = m[9 - i][9 - j] = 1;
    }
  }
  return m;
}

// Ejercicio 21: Relleno de Ajedrez
function ejercicio21() {
  const m = crearMatriz(0);
  for (let i = 0; i < 10; i++)
    for (let j = 0; j < 10; j++) m[i][j] = (i + j) % 2;
  return m;
}

// Ejercicio 22: Reloj de Arena
function ejercicio22() {
  const m = crearMatriz(0);
  for (let i = 0; i < 10; i++) {
    const start = i <= 4 ? i : 9 - i;
    const end = 9 - start;
    for (let j = start; j <= end; j++) {
      m[i][j] = 1;
    }
  }
  return m;
}
