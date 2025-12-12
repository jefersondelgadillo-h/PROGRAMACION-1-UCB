// js/game-music.js - Sistema de música de ambiente
class GameMusic {
  constructor() {
    this.audio = document.getElementById('background-music');
    this.musicToggle = document.getElementById('music-toggle');
    this.volumeSlider = document.getElementById('music-volume');
    this.musicIcon = document.getElementById('music-icon-path');
    
    // Estado inicial sincronizado con HTML
    this.isPlaying = false;
    this.volume = 0.5; // 50% para coincidir con slider HTML
    this.wasPlaying = false;
    
    this.init();
  }
  
  init() {
    // Cargar preferencias del usuario
    this.loadPreferences();
    
    // Configurar evento del botón de música
    this.musicToggle.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.toggleMusic();
    });
    
    // Configurar evento del slider de volumen
    this.volumeSlider.addEventListener('input', (e) => {
      this.setVolume(e.target.value / 100);
    });
    
    // Configurar atajos de teclado
    this.setupKeyboardShortcuts();
    
    // Cargar el audio primero
    this.audio.load();
    
    // Esperar a que el audio esté listo
    this.audio.addEventListener('canplaythrough', () => {
      console.log("Audio cargado y listo para reproducir");
      this.attemptAutoPlay();
    });
    
    // Manejar errores
    this.audio.addEventListener('error', (e) => {
      console.error("Error de audio:", this.audio.error);
      this.showMessage("Error al cargar el audio. Verifica la ruta del archivo.");
    });
  }
  
  loadPreferences() {
    // Cargar volumen guardado
    const savedVolume = localStorage.getItem('gameMusicVolume');
    if (savedVolume) {
      this.volume = parseFloat(savedVolume);
      this.audio.volume = this.volume;
      this.volumeSlider.value = this.volume * 100;
    } else {
      // Usar valor por defecto del HTML
      this.audio.volume = this.volume;
    }
    
    // Cargar estado de música
    const savedMusicState = localStorage.getItem('gameMusicEnabled');
    if (savedMusicState !== null) {
      this.isPlaying = savedMusicState === 'true';
      this.updateMusicState();
    }
  }
  
  savePreferences() {
    localStorage.setItem('gameMusicVolume', this.volume);
    localStorage.setItem('gameMusicEnabled', this.isPlaying);
  }
  
  attemptAutoPlay() {
    if (this.isPlaying) {
      // Usar un gesto de usuario simulado para evitar bloqueo
      document.body.addEventListener('click', this.startAudioOnce.bind(this), { once: true });
      document.body.addEventListener('keydown', this.startAudioOnce.bind(this), { once: true });
      
      // También intentar después de un tiempo
      setTimeout(() => {
        this.startAudio();
      }, 1000);
    }
  }
  
  startAudioOnce() {
    this.startAudio();
  }
  
  startAudio() {
    if (!this.isPlaying) return;
    
    const playPromise = this.audio.play();
    
    if (playPromise !== undefined) {
      playPromise.then(() => {
        console.log("Audio reproducido exitosamente");
        this.isPlaying = true;
        this.updateMusicState();
      }).catch(error => {
        console.log("Reproducción bloqueada:", error);
        this.isPlaying = false;
        this.updateMusicState();
        this.showMessage("Haz clic en el botón de música para activar el sonido");
      });
    }
  }
  
  showMessage(message) {
    const messageEl = document.createElement('div');
    messageEl.className = 'game-message';
    messageEl.textContent = message;
    messageEl.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 20px;
      border-radius: 10px;
      z-index: 10000;
      font-size: 16px;
      text-align: center;
    `;
    
    document.body.appendChild(messageEl);
    
    setTimeout(() => {
      if (messageEl.parentNode) {
        messageEl.parentNode.removeChild(messageEl);
      }
    }, 3000);
  }
  
  toggleMusic() {
    if (this.isPlaying) {
      this.pauseMusic();
    } else {
      this.playMusic();
    }
    this.savePreferences();
  }
  
  playMusic() {
    // Asegurarse de que el audio esté cargado
    if (this.audio.readyState < 2) {
      this.audio.load();
    }
    
    const playPromise = this.audio.play();
    
    if (playPromise !== undefined) {
      playPromise.then(() => {
        this.isPlaying = true;
        this.updateMusicState();
        console.log("Música activada manualmente");
      }).catch(error => {
        console.error("Error al reproducir:", error);
        this.isPlaying = false;
        this.updateMusicState();
        
        // Pedir interacción explícita
        if (error.name === 'NotAllowedError') {
          this.showMessage("Permite la reproducción de audio en tu navegador");
        }
      });
    }
  }
  
  pauseMusic() {
    this.audio.pause();
    this.isPlaying = false;
    this.updateMusicState();
  }
  
  setVolume(value) {
    this.volume = Math.max(0, Math.min(1, value));
    this.audio.volume = this.volume;
    this.savePreferences();
    this.showVolumeFeedback();
  }
  
  showVolumeFeedback() {
    const volumePercent = Math.round(this.volume * 100);
    const volumeDisplay = document.getElementById('volume-feedback') || document.createElement('div');
    volumeDisplay.id = 'volume-feedback';
    volumeDisplay.textContent = `Volumen: ${volumePercent}%`;
    volumeDisplay.style.cssText = `
      position: fixed;
      top: 60px;
      right: 20px;
      background: rgba(30, 32, 38, 0.9);
      color: #00d1b2;
      padding: 5px 10px;
      border-radius: 5px;
      font-size: 12px;
      z-index: 1000;
      border: 1px solid rgba(0, 209, 178, 0.3);
    `;
    
    if (!document.getElementById('volume-feedback')) {
      document.body.appendChild(volumeDisplay);
    }
    
    setTimeout(() => {
      if (volumeDisplay.parentNode) {
        volumeDisplay.parentNode.removeChild(volumeDisplay);
      }
    }, 1000);
  }
  
  updateMusicState() {
    if (this.isPlaying) {
      this.musicToggle.classList.remove('muted');
      this.musicIcon.setAttribute('d', 
        'M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z'
      );
      this.musicToggle.title = 'Silenciar música';
    } else {
      this.musicToggle.classList.add('muted');
      this.musicIcon.setAttribute('d',
        'M12,4L9.91,6.09L12,8.18M4.27,3L3,4.27L7.73,9H3V15H7L12,20V13.27L16.25,17.52C15.58,18.04 14.83,18.46 14,18.7V20.77C15.38,20.45 16.63,19.82 17.68,18.96L19.73,21L21,19.73L12,10.73M19,12C19,12.94 18.8,13.82 18.46,14.64L19.97,16.15C20.62,14.91 21,13.5 21,12C21,7.72 18,4.14 14,3.23V5.29C16.89,6.15 19,8.83 19,12M16.5,12C16.5,10.23 15.5,8.71 14,7.97V10.18L16.45,12.63C16.5,12.43 16.5,12.21 16.5,12Z'
      );
      this.musicToggle.title = 'Activar música';
    }
  }
  
  setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'm' || e.key === 'M') {
        e.preventDefault();
        this.toggleMusic();
      }
      
      if (!e.target.matches('input, textarea')) {
        if (e.key === 'ArrowUp') {
          e.preventDefault();
          this.setVolume(Math.min(1, this.volume + 0.1));
        } else if (e.key === 'ArrowDown') {
          e.preventDefault();
          this.setVolume(Math.max(0, this.volume - 0.1));
        }
      }
    });
  }
  
  handleVisibilityChange() {
    if (document.hidden) {
      if (this.isPlaying) {
        this.wasPlaying = true;
        this.audio.pause();
      }
    } else if (this.wasPlaying) {
      this.audio.play().catch(e => {
        console.log("No se pudo reanudar automáticamente:", e);
      });
      this.wasPlaying = false;
    }
  }
}

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
  window.gameMusic = new GameMusic();
  
  document.addEventListener('visibilitychange', () => {
    if (window.gameMusic) {
      window.gameMusic.handleVisibilityChange();
    }
  });
  
  // Permitir activación desde cualquier clic en la página
  document.addEventListener('click', () => {
    if (window.gameMusic && !window.gameMusic.userInteracted) {
      window.gameMusic.userInteracted = true;
    }
  });
});