// js/app.js
class Game {
  constructor() {
    this.canvas = document.getElementById('gameCanvas');
    this.ctx = this.canvas.getContext('2d');
    this.level = parseInt(localStorage.getItem('selectedLevel') || 1);
    this.levelData = LEVELS[this.level];
    this.maze = new Maze(this.levelData);
    this.cellSize = 50;
    this.images = {};
    this.loadedImages = 0;
    this.totalImages = 0;
    this.gameStarted = false;
    
    // Variables para el efecto hover
    this.hoveredCell = null;
    this.hoverAnimation = 0;
    this.lastMousePos = { x: 0, y: 0 };
    
    // Referencias a los contenedores
    this.mazeContainer = document.getElementById('mazeContainer');
    this.canvasWrapper = document.getElementById('canvasWrapper');
    
    // Variables para el movimiento del mapa
    this.currentOffsetX = 0;
    this.currentOffsetY = 0;
    this.targetOffsetX = 0;
    this.targetOffsetY = 0;
    
    // Guardar posicion inicial del jugador
    this.initialPlayerPos = { ...this.maze.playerPos };
    
    this.setupCanvas();
    this.setupQuestion();
    this.loadImages();
    this.setupControls();
    this.setupMouseEvents();
    this.setupContainerSize();
    this.centerOnPlayer();
  }

  setupContainerSize() {
    // Ajustar tamaño del wrapper del canvas
    this.canvasWrapper.style.width = this.canvas.width + 'px';
    this.canvasWrapper.style.height = this.canvas.height + 'px';
  }

  centerOnPlayer() {
    const { row, col } = this.maze.playerPos;
    const playerX = col * this.cellSize;
    const playerY = row * this.cellSize;
    
    const containerWidth = this.mazeContainer.clientWidth;
    const containerHeight = this.mazeContainer.clientHeight;
    
    // Calcular posicion para centrar al jugador
    this.targetOffsetX = -playerX + (containerWidth / 2) - (this.cellSize / 2);
    this.targetOffsetY = -playerY + (containerHeight / 2) - (this.cellSize / 2);
    
    // Limitar los valores de offset para que no se salga del mapa
    const maxOffsetX = Math.min(0, containerWidth - this.canvas.width);
    const maxOffsetY = Math.min(0, containerHeight - this.canvas.height);
    
    this.targetOffsetX = Math.max(maxOffsetX, this.targetOffsetX);
    this.targetOffsetY = Math.max(maxOffsetY, this.targetOffsetY);
    
    this.currentOffsetX = this.targetOffsetX;
    this.currentOffsetY = this.targetOffsetY;
    this.updateCanvasPosition();
  }

  moveMapToPlayer() {
    const { row, col } = this.maze.playerPos;
    const playerX = col * this.cellSize;
    const playerY = row * this.cellSize;
    
    const containerWidth = this.mazeContainer.clientWidth;
    const containerHeight = this.mazeContainer.clientHeight;
    
    // Calcular posicion para centrar al jugador
    this.targetOffsetX = -playerX + (containerWidth / 2) - (this.cellSize / 2);
    this.targetOffsetY = -playerY + (containerHeight / 2) - (this.cellSize / 2);
    
    // Limitar los valores de offset para que no se salga del mapa
    const maxOffsetX = Math.min(0, containerWidth - this.canvas.width);
    const maxOffsetY = Math.min(0, containerHeight - this.canvas.height);
    
    this.targetOffsetX = Math.max(maxOffsetX, this.targetOffsetX);
    this.targetOffsetY = Math.max(maxOffsetY, this.targetOffsetY);
    
    const minOffsetX = Math.min(0, containerWidth - this.canvas.width);
    const minOffsetY = Math.min(0, containerHeight - this.canvas.height);
    
    this.targetOffsetX = Math.min(0, this.targetOffsetX);
    this.targetOffsetY = Math.min(0, this.targetOffsetY);
    this.targetOffsetX = Math.max(minOffsetX, this.targetOffsetX);
    this.targetOffsetY = Math.max(minOffsetY, this.targetOffsetY);
  }

  updateCanvasPosition() {
    this.canvasWrapper.style.transform = `translate(${this.currentOffsetX}px, ${this.currentOffsetY}px)`;
  }

  animateMapMovement() {
    const smoothing = 0.2;
    const dx = this.targetOffsetX - this.currentOffsetX;
    const dy = this.targetOffsetY - this.currentOffsetY;
    
    if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
      this.currentOffsetX += dx * smoothing;
      this.currentOffsetY += dy * smoothing;
      this.updateCanvasPosition();
    }
  }

  setupMouseEvents() {
    this.canvas.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      
      const col = Math.floor(mouseX / this.cellSize);
      const row = Math.floor(mouseY / this.cellSize);
      
      if (row >= 0 && row < this.maze.rows && col >= 0 && col < this.maze.cols) {
        const cellValue = this.maze.getCell(row, col);
        
        if (this.maze.isAnswer(cellValue)) {
          this.hoveredCell = { 
            row, 
            col, 
            value: cellValue,
            hint: this.maze.getHint(cellValue)
          };
          this.lastMousePos = { x: mouseX, y: mouseY };
        } else {
          this.hoveredCell = null;
        }
      } else {
        this.hoveredCell = null;
      }
    });

    this.canvas.addEventListener('mouseleave', () => {
      this.hoveredCell = null;
    });
  }

  setupCanvas() {
    this.canvas.width = this.maze.cols * this.cellSize;
    this.canvas.height = this.maze.rows * this.cellSize;
    
    // Añadir estilos
    this.canvas.style.border = '3px solid #333';
    this.canvas.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)';
    this.canvas.style.borderRadius = '4px';
    this.canvas.style.cursor = 'pointer';
    this.canvas.style.backgroundColor = '#1a1a1a';
  }

  setupQuestion() {
    const questionDiv = document.createElement('div');
    questionDiv.className = 'question';
    questionDiv.innerHTML = `
      <h3>Nivel ${this.level}</h3>
      <p><strong>Pregunta:</strong> ${this.levelData.question}</p>
      <p>Encuentra la respuesta correcta en el laberinto</p>
      <p><small><em>Pasa el mouse sobre las imágenes para ver detalles y pistas</em></small></p>
    `;
    
    const gameContainer = document.querySelector('.game-container');
    const mazeContainer = document.getElementById('mazeContainer');
    gameContainer.insertBefore(questionDiv, mazeContainer);
  }

  loadImages() {
    const imageMap = { ...COMMON_IMAGES, ...this.levelData.specificImages };
    
    this.totalImages = Object.keys(imageMap).length;
    
    // Cargar cada imagen
    for (const [key, filename] of Object.entries(imageMap)) {
      const img = new Image();
      img.onload = () => {
        this.loadedImages++;
        if (this.loadedImages === this.totalImages) {
          this.startGame();
        }
      };
      img.onerror = () => {
        console.warn(`No se pudo cargar la imagen: assets/${filename}`);
        this.loadedImages++;
        if (this.loadedImages === this.totalImages) {
          this.startGame();
        }
      };
      img.src = `assets/${filename}`;
      this.images[key] = img;
    }
    
    // Si no hay imagenes, iniciar de todos modos
    if (this.totalImages === 0) {
      setTimeout(() => this.startGame(), 100);
    }
  }

  startGame() {
    this.gameStarted = true;
    this.gameLoop();
  }

  setupControls() {
    document.addEventListener('keydown', (e) => {
      if (!this.gameStarted) return;

      let direction = null;
      let shouldPreventDefault = false;
      
      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          direction = 'up';
          shouldPreventDefault = true;
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          direction = 'down';
          shouldPreventDefault = true;
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          direction = 'left';
          shouldPreventDefault = true;
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          direction = 'right';
          shouldPreventDefault = true;
          break;
      }

      if (direction) {
        if (shouldPreventDefault) {
          e.preventDefault();
          e.stopPropagation();
        }

        const moved = this.maze.movePlayer(direction);
        
        if (moved) {
          // Mover el mapa para seguir al jugador
          this.moveMapToPlayer();
        }
        
        if (this.maze.gameOver) {
          setTimeout(() => {
            window.location.href = 'game-over.html';
          }, 500);
        } else if (this.maze.gameWin) {
          setTimeout(() => {
            // Redirigir a game-win.html con parametros del nivel
            window.location.href = `game-win.html?level=${this.level}&next=${this.level < 3 ? this.level + 1 : 'complete'}`;
          }, 500);
        }
      }
    });
  }

  draw() {
    if (this.hoveredCell) {
      this.hoverAnimation = Math.min(this.hoverAnimation + 0.15, 1);
    } else {
      this.hoverAnimation = Math.max(this.hoverAnimation - 0.15, 0);
    }
    
    this.animateMapMovement();

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Colores por defecto
    const defaultColors = {
      0: '#f0f0f0',
      1: '#333333',
      2: '#00d1b2',
      'CR': '#4CAF50',
      'WR1': '#f44336',
      'WR2': '#ff9800',
      'WR3': '#9c27b0',
      'WR4': '#f44336',
      'WR5': '#ff9800',
      'WR6': '#9c27b0',
      'WR7': '#f44336',
      'WR8': '#ff9800',
      'WR9': '#9c27b0'
    };

    // Dibujar cada celda
    for (let row = 0; row < this.maze.rows; row++) {
      for (let col = 0; col < this.maze.cols; col++) {
        const cellValue = this.maze.getCell(row, col);
        const x = col * this.cellSize;
        const y = row * this.cellSize;

        // Verificar si esta celda tiene hover
        const isHovered = this.hoveredCell && 
                         this.hoveredCell.row === row && 
                         this.hoveredCell.col === col;

        if (this.images[cellValue] && this.images[cellValue].complete) {
          this.ctx.drawImage(this.images[cellValue], x, y, this.cellSize, this.cellSize);
        } else {
          this.ctx.fillStyle = defaultColors[cellValue] || '#ffffff';
          this.ctx.fillRect(x, y, this.cellSize, this.cellSize);
        }

        this.ctx.strokeStyle = isHovered ? '#FFD700' : '#ddd';
        this.ctx.lineWidth = isHovered ? 3 : 1;
        this.ctx.strokeRect(x, y, this.cellSize, this.cellSize);
      }
    }
    
    if (this.hoveredCell && this.hoverAnimation > 0.3) {
      this.drawHintOverlay();
    }
  }

  drawHintOverlay() {
    const { hint, value, row, col } = this.hoveredCell;
    const x = col * this.cellSize;
    const y = row * this.cellSize;
    
    const canvasRect = this.canvas.getBoundingClientRect();
    const containerRect = this.mazeContainer.getBoundingClientRect();
    
    const cellScreenX = x + canvasRect.left - containerRect.left;
    const cellScreenY = y + canvasRect.top - containerRect.top;
    
    const isCellVisible = 
      cellScreenX + this.cellSize > 0 && 
      cellScreenX < containerRect.width &&
      cellScreenY + this.cellSize > 0 && 
      cellScreenY < containerRect.height;
    
    if (!isCellVisible) return;
    
    const overlayWidth = 300;
    const overlayHeight = 200;
    
    let overlayX = cellScreenX + this.cellSize + 10;
    let overlayY = cellScreenY;
    
    if (overlayX + overlayWidth > containerRect.width) {
      overlayX = cellScreenX - overlayWidth - 10;
    }
    if (overlayY + overlayHeight > containerRect.height) {
      overlayY = containerRect.height - overlayHeight - 10;
    }
    if (overlayY < 10) {
      overlayY = 10;
    }
    
    const absoluteOverlayX = overlayX - (canvasRect.left - containerRect.left);
    const absoluteOverlayY = overlayY - (canvasRect.top - containerRect.top);
    
    this.ctx.save();
    this.ctx.fillStyle = `rgba(0, 0, 0, ${0.9 * this.hoverAnimation})`;
    this.ctx.fillRect(absoluteOverlayX, absoluteOverlayY, overlayWidth, overlayHeight);
    
    this.ctx.strokeStyle = '#FFD700';
    this.ctx.lineWidth = 2;
    this.ctx.strokeRect(absoluteOverlayX, absoluteOverlayY, overlayWidth, overlayHeight);
    
    // Dibujar imagen ampliada
    if (this.images[value] && this.images[value].complete) {
      const imgSize = 80;
      const imgX = absoluteOverlayX + 20;
      const imgY = absoluteOverlayY + 20;
      
      this.ctx.drawImage(this.images[value], imgX, imgY, imgSize, imgSize);
    }
    
    // Dibujar texto de pista
    if (hint) {
      this.ctx.fillStyle = '#FFFFFF';
      this.ctx.font = 'bold 14px Arial';
      this.ctx.textAlign = 'left';
      this.ctx.textBaseline = 'top';
      
      const textX = absoluteOverlayX + 110;
      const textY = absoluteOverlayY + 20;
      const maxWidth = overlayWidth - 130;
      
      // Texto de la pista
      this.ctx.fillStyle = '#FFFFFF';
      this.ctx.font = '14px Arial';
      const hintY = textY + 25;
      
      // Dividir el texto en líneas
      const words = hint.split(' ');
      let line = '';
      let lineHeight = 18;
      let lines = [];
      
      for (let i = 0; i < words.length; i++) {
        const testLine = line + words[i] + ' ';
        const metrics = this.ctx.measureText(testLine);
        if (metrics.width > maxWidth && i > 0) {
          lines.push(line);
          line = words[i] + ' ';
        } else {
          line = testLine;
        }
      }
      lines.push(line);
      
      // Dibujar cada línea
      lines.forEach((line, index) => {
        this.ctx.fillText(line, textX, hintY + (index * lineHeight), maxWidth);
      });
    }
    
    this.ctx.restore();
  }

  gameLoop() {
    this.draw();
    if (this.gameStarted) {
      requestAnimationFrame(() => this.gameLoop());
    }
  }
}

// Iniciar el juego cuando se cargue la página
window.addEventListener('DOMContentLoaded', () => {
  new Game();
});