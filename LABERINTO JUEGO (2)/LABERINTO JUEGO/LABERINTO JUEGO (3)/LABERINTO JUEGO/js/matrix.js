// js/matrix.js 
class Maze {
  constructor(levelData) {
    this.matrix = levelData.matrix;
    this.rows = this.matrix.length;
    this.cols = this.matrix[0].length;
    this.wrongAnswers = levelData.wrongAnswers || [];
    this.hints = levelData.hints || {}; 
    this.playerPos = this.findPlayerPosition();
    this.gameOver = false;
    this.gameWin = false;
  }

  findPlayerPosition() {
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        if (this.matrix[row][col] === 2) {
          return { row, col };
        }
      }
    }
    return { row: 1, col: 1 };
  }
  
  isAnswer(value) {
    return this.isCorrectAnswer(value) || this.isWrongAnswer(value);
  }

  isWrongAnswer(value) {
    return this.wrongAnswers.includes(value);
  }

  isCorrectAnswer(value) {
    return value === 'CR';
  }

  // Método para obtener la pista de una celda
  getHint(value) {
    return this.hints[value] || '';
  }

  movePlayer(direction) {
    if (this.gameOver || this.gameWin) return false;

    const { row, col } = this.playerPos;
    let newRow = row;
    let newCol = col;

    switch (direction) {
      case 'up': newRow--; break;
      case 'down': newRow++; break;
      case 'left': newCol--; break;
      case 'right': newCol++; break;
    }

    // Verificar límites
    if (newRow < 0 || newRow >= this.rows || newCol < 0 || newCol >= this.cols) {
      return false;
    }

    const cellValue = this.matrix[newRow][newCol];

    // Verificar si es pared 
    if (cellValue === 1) {
      return false;
    }

    // Verificar si es respuesta incorrecta
    if (this.isWrongAnswer(cellValue)) {
      this.gameOver = true;
      return true;
    }

    // Verificar si es respuesta correcta
    if (this.isCorrectAnswer(cellValue)) {
      this.gameWin = true;
    }

    // Mover jugador
    this.matrix[row][col] = 0;
    this.matrix[newRow][newCol] = 2;
    this.playerPos = { row: newRow, col: newCol };

    return true;
  }

  getCell(row, col) {
    if (row < 0 || row >= this.rows || col < 0 || col >= this.cols) {
      return 1;
    }
    return this.matrix[row][col];
  }
}