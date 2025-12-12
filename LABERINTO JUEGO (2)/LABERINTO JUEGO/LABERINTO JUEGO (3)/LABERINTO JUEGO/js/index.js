// Fondo animado con canvas
const canvas = document.getElementById('bg');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

let particles = [];
const particleCount = 80;

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 0.5;
    this.speedX = Math.random() * 0.5 - 0.25;
    this.speedY = Math.random() * 0.5 - 0.25;
    this.color = `rgba(0, 209, 178, ${Math.random() * 0.5 + 0.1})`;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x > canvas.width) this.x = 0;
    else if (this.x < 0) this.x = canvas.width;
    if (this.y > canvas.height) this.y = 0;
    else if (this.y < 0) this.y = canvas.height;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function initParticles() {
  particles = [];
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(particle => {
    particle.update();
    particle.draw();
  });
  requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

// Manejo de los botones de nivel
document.getElementById("btn-play").addEventListener("click", () => {
  localStorage.setItem("selectedLevel", 1);
  window.location.href = "game.html";
});

document.getElementById("btn-level2").addEventListener("click", () => {
  localStorage.setItem("selectedLevel", 2);
  window.location.href = "game.html";
});

document.getElementById("btn-level3").addEventListener("click", () => {
  localStorage.setItem("selectedLevel", 3);
  window.location.href = "game.html";
});

// Modal
const modalBackdrop = document.getElementById('modal-backdrop');
const modalClose = document.getElementById('modal-close');
const modalAction = document.getElementById('modal-action');
const modalTitle = document.getElementById('modal-title');
const modalBody = document.getElementById('modal-body');

function openModal(title, body, actionText = null, actionCallback = null) {
  modalTitle.textContent = title;
  modalBody.innerHTML = body;
  if (actionText && actionCallback) {
    modalAction.textContent = actionText;
    modalAction.classList.remove('hidden');
    modalAction.onclick = actionCallback;
  } else {
    modalAction.classList.add('hidden');
  }
  modalBackdrop.style.display = 'flex';
}

function closeModal() {
  modalBackdrop.style.display = 'none';
}

modalClose.addEventListener('click', closeModal);
modalBackdrop.addEventListener('click', (e) => {
  if (e.target === modalBackdrop) closeModal();
});

document.getElementById('btn-how').addEventListener('click', () => {
  openModal(
    'Instrucciones',
    `
    <p>El objetivo es guiar al jugador a través del laberinto hasta la respuesta correcta.</p>
    <p><span class="tag">Controles</span> Usa las teclas <kbd class="kbd">←</kbd> <kbd class="kbd">↑</kbd> <kbd class="kbd">→</kbd> <kbd class="kbd">↓</kbd> para moverte.</p>
    <p><span class="tag">Niveles</span> Hay 3 niveles de dificultad. Cada nivel tiene una pregunta y varias respuestas (imágenes) distribuidas en el laberinto. Debes encontrar la respuesta correcta.</p>
    <p><span class="tag">Precaución</span> Evita tocar las respuestas incorrectas, de lo contrario tendrás que reiniciar el nivel.</p>
    `
  );
});

document.getElementById('btn-options').addEventListener('click', () => {
  openModal(
    'Opciones',
    `
    <p>Opciones de juego (en desarrollo).</p>
    `
  );
});