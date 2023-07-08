function hidePreloader() {
  const preloader = document.getElementById('preloader');
  preloader.style.opacity = '0';
  setTimeout(() => {
    preloader.style.display = 'none';
  }, 1000); // Delay of 1 second for fade-out effect
}

// Wait for the page to load
window.addEventListener('load', function() {
  // Set a timeout of 3 seconds before hiding the preloader
  setTimeout(hidePreloader, 3000);
});