// js/game-scroll.js
document.addEventListener('DOMContentLoaded', () => {
  const gameContainer = document.querySelector('.game-container');
  const scrollIndicator = document.getElementById('scrollToTop');
  
  if (!gameContainer || !scrollIndicator) return;
  
  gameContainer.addEventListener('scroll', () => {
    if (gameContainer.scrollTop > 100) {
      scrollIndicator.style.display = 'flex';
    } else {
      scrollIndicator.style.display = 'none';
    }
  });
  
  scrollIndicator.addEventListener('click', () => {
    gameContainer.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  if (window.innerWidth <= 768) {
    setTimeout(() => {
      const mazeContainer = document.querySelector('.maze-container');
      if (mazeContainer) {
        gameContainer.scrollTo({
          top: mazeContainer.offsetTop - 20,
          behavior: 'smooth'
        });
      }
    }, 1000);
  }
});