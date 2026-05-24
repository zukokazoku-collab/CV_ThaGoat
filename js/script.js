/* Main interactions for CV site */
document.addEventListener('DOMContentLoaded', function() {
  // Elevation on hover for cards (keep CSS for smoothness)
  document.querySelectorAll('.card').forEach(function(card){
    card.addEventListener('mouseenter', function(){ card.classList.add('elevated'); });
    card.addEventListener('mouseleave', function(){ card.classList.remove('elevated'); });
  });

  // Toggle full-screen personal overlay
  var toggle = document.getElementById('togglePersonal');
  var overlay = document.getElementById('personalOverlay');
  var closeBtn = document.getElementById('closePersonal');

  if (toggle && overlay) {
    toggle.addEventListener('click', function(){
      overlay.classList.toggle('hidden');
      overlay.setAttribute('aria-hidden', overlay.classList.contains('hidden') ? 'true' : 'false');
    });
  }

  if (closeBtn && overlay) {
    closeBtn.addEventListener('click', function(){ overlay.classList.add('hidden'); overlay.setAttribute('aria-hidden','true'); });
  }

  // Close overlay on Escape
  document.addEventListener('keydown', function(e){
    if (e.key === 'Escape' && overlay && !overlay.classList.contains('hidden')) {
      overlay.classList.add('hidden');
      overlay.setAttribute('aria-hidden','true');
    }
  });
});