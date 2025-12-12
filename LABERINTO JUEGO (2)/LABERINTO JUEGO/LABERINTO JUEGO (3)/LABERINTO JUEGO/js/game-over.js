// js/game-over.js
document.addEventListener('DOMContentLoaded', () => {
  const currentLevel = parseInt(localStorage.getItem('selectedLevel')) || 1;
  
  // Configurar botones
  document.getElementById('replay-btn').addEventListener('click', () => {
    localStorage.setItem('selectedLevel', currentLevel);
    window.location.href = 'game.html';
  });
  
  document.getElementById('menu-btn').addEventListener('click', () => {
    window.location.href = 'index.html';
  });
  
  function playGameOverSound() {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(220, audioContext.currentTime); 
      oscillator.frequency.setValueAtTime(196, audioContext.currentTime + 0.3); 
      oscillator.frequency.setValueAtTime(174.61, audioContext.currentTime + 0.6); 
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);
      
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 1);
    } catch (e) {
      console.log("Audio no disponible");
    }
  }
  
  // Reproducir sonido al cargar
  setTimeout(playGameOverSound, 300);
});