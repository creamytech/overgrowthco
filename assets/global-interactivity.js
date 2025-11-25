class GlobalInteractivity {
  constructor() {
    this.cursor = document.querySelector('.bio-cursor');
    this.idleOverlay = document.querySelector('.idle-overgrowth-overlay');
    this.idleThreshold = 10000; // 10 seconds
    this.lastActivity = Date.now();
    this.isIdle = false;

    this.init();
  }

  init() {
    this.setupCursor();
    this.setupIdleDetection();
    this.setupPageTransitions();
    this.setupCartPhysics();
    this.setupTerminal();
    this.setupZoneLost();
    this.setupEventListeners();
  }

  setupPageTransitions() {
    document.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('/') && !href.startsWith('#')) {
          e.preventDefault();
          this.handlePageTransition(href);
        }
      });
    });
  }

  handlePageTransition(href) {
    document.body.classList.add('page-transitioning');
    // const audio = new Audio('static-noise.mp3'); // Placeholder
    // audio.play();

    setTimeout(() => {
      window.location.href = href;
    }, 500); // Match CSS transition duration
  }

  setupCursor() {
    if (!this.cursor) return;

    document.addEventListener('mousemove', (e) => {
      // Update cursor position
      this.cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;

      // Reset idle timer on movement
      this.resetIdleTimer();
    });

    // Add hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, select, textarea, .card-product');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', () => this.cursor.classList.add('active'));
      el.addEventListener('mouseleave', () => this.cursor.classList.remove('active'));
    });
  }

  setupIdleDetection() {
    if (!this.idleOverlay) return;

    setInterval(() => {
      if (Date.now() - this.lastActivity > this.idleThreshold && !this.isIdle) {
        this.activateIdleState();
      }
    }, 1000);
  }

  resetIdleTimer() {
    this.lastActivity = Date.now();
    if (this.isIdle) {
      this.deactivateIdleState();
    }
  }

  activateIdleState() {
    this.isIdle = true;
    document.body.classList.add('is-idle');
    if (this.idleOverlay) {
      this.idleOverlay.classList.add('visible');
    }
  }

  deactivateIdleState() {
    this.isIdle = false;
    document.body.classList.remove('is-idle');
    if (this.idleOverlay) {
      this.idleOverlay.classList.remove('visible');
    }
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Create elements if they don't exist
  if (!document.querySelector('.bio-cursor')) {
    const cursor = document.createElement('div');
    cursor.classList.add('bio-cursor');
    document.body.appendChild(cursor);
  }

  if (!document.querySelector('.idle-overgrowth-overlay')) {
    const overlay = document.createElement('div');
    overlay.classList.add('idle-overgrowth-overlay');
    // Add vine elements
    for (let i = 1; i <= 4; i++) {
      const vine = document.createElement('div');
      vine.classList.add('idle-vine', `vine-${i}`);
      overlay.appendChild(vine);
    }
    document.body.appendChild(overlay);
  }

  window.overgrowthInteractivity = new GlobalInteractivity();
});
