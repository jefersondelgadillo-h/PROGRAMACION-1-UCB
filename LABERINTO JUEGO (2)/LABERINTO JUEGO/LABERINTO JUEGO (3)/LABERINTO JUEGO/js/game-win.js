// js/game-win.js
document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const currentLevel = parseInt(urlParams.get('level')) || 1;
  const nextLevelParam = urlParams.get('next');
  const isComplete = nextLevelParam === 'complete';
  
  // Configurar elementos segun el nivel
  document.getElementById('level-badge').textContent = currentLevel;
  document.getElementById('current-level').textContent = currentLevel;
  
  if (isComplete) {
    // Juego completo
    document.getElementById('victory-title').textContent = '¡JUEGO COMPLETADO!';
    document.getElementById('victory-subtitle').textContent = 'Todos los niveles superados';
    document.getElementById('victory-message').textContent = 
      '¡Felicidades! Has demostrado ser un maestro del laberinto. ' +
      'Has completado todos los niveles con éxito. ¡Eres un verdadero experto!';
    document.getElementById('next-level').textContent = '✓';
    document.getElementById('next-level-btn').innerHTML = `
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M11,16.5L18,9.5L16.59,8.09L11,13.67L7.91,10.59L6.5,12L11,16.5Z"/>
      </svg>
      Jugar de Nuevo
    `;
  } else {
    document.getElementById('next-level').textContent = currentLevel + 1;
  }
  
  // Actualizar puntos de niveles completados
  document.querySelectorAll('.level-dot').forEach(dot => {
    const level = parseInt(dot.dataset.level);
    
    if (level < currentLevel) {
      dot.classList.add('completed');
    } else if (level === currentLevel) {
      dot.classList.add('current');
    }
    
    if (isComplete) {
      dot.classList.add('completed');
    }
  });
  
  // Configurar botones
  document.getElementById('next-level-btn').addEventListener('click', () => {
    if (isComplete) {
      // Volver al nivel 1 si se completo todo
      localStorage.setItem('selectedLevel', 1);
      window.location.href = 'game.html';
    } else {
      localStorage.setItem('selectedLevel', currentLevel + 1);
      window.location.href = 'game.html';
    }
  });
  
  document.getElementById('replay-btn').addEventListener('click', () => {
    localStorage.setItem('selectedLevel', currentLevel);
    window.location.href = 'game.html';
  });
  
  document.getElementById('menu-btn').addEventListener('click', () => {
    window.location.href = 'index.html';
  });
  
  // Sistema de confetti
  const canvas = document.getElementById('confetti-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let confettiPieces = [];
    
    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    
    class Confetti {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height - canvas.height;
        this.size = Math.random() * 10 + 5;
        this.speed = Math.random() * 3 + 2;
        this.color = [
          '#FFD700', // Oro
          '#FFA500', // Naranja
          '#00FF00', // Verde
          '#00BFFF', // Azul cielo
          '#FF69B4', // Rosa
          '#9370DB'  // Púrpura
        ][Math.floor(Math.random() * 6)];
        this.rotation = Math.random() * 360;
        this.rotationSpeed = Math.random() * 10 - 5;
      }
      
      update() {
        this.y += this.speed;
        this.x += Math.sin(this.y * 0.01) * 1;
        this.rotation += this.rotationSpeed;
        
        if (this.y > canvas.height) {
          this.y = -10;
          this.x = Math.random() * canvas.width;
        }
      }
      
      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation * Math.PI / 180);
        ctx.fillStyle = this.color;
        ctx.fillRect(-this.size/2, -this.size/2, this.size, this.size);
        ctx.restore();
      }
    }
    
    function initConfetti() {
      confettiPieces = [];
      for (let i = 0; i < 150; i++) {
        confettiPieces.push(new Confetti());
      }
    }
    
    function animateConfetti() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      confettiPieces.forEach(confetti => {
        confetti.update();
        confetti.draw();
      });
      requestAnimationFrame(animateConfetti);
    }
    
    // Iniciar confetti
    resizeCanvas();
    initConfetti();
    animateConfetti();
    window.addEventListener('resize', resizeCanvas);
  }
  
  // Efecto de sonido
  function playVictorySound() {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); 
      oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1); 
      oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2);
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
      
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.5);
    } catch (e) {
      console.log("Audio no disponible");
    }
  }
  
  // Reproducir sonido al cargar
  setTimeout(playVictorySound, 300);
});