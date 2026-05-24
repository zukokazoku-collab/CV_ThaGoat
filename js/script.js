/* Main interactions for CV site */
document.addEventListener('DOMContentLoaded', function() {
  // Elevation on hover for cards (keep CSS for smoothness)
  document.querySelectorAll('.card').forEach(function(card){
    card.addEventListener('mouseenter', function(){ card.classList.add('elevated'); });
    card.addEventListener('mouseleave', function(){ card.classList.remove('elevated'); });
  });

  // Toggle full-screen personal overlay with fade-in/out animation
  var toggle = document.getElementById('togglePersonal');
  var overlay = document.getElementById('personalOverlay');
  var closeBtn = document.getElementById('closePersonal');

  function showOverlay() {
    if (!overlay) return;
    overlay.classList.remove('hidden');
    // allow the browser to register the removal before adding show to trigger transition
    requestAnimationFrame(function(){ overlay.classList.add('show'); });
    overlay.setAttribute('aria-hidden','false');
  }

  function hideOverlay() {
    if (!overlay) return;
    overlay.classList.remove('show');
    overlay.setAttribute('aria-hidden','true');
    // add hidden after transition ends to remove from accessibility tree
    var onEnd = function() { overlay.classList.add('hidden'); overlay.removeEventListener('transitionend', onEnd); };
    overlay.addEventListener('transitionend', onEnd);
    // fallback
    setTimeout(function(){ if (!overlay.classList.contains('show')) overlay.classList.add('hidden'); }, 400);
  }

  if (toggle && overlay) {
    toggle.addEventListener('click', function(){
      if (overlay.classList.contains('show')) hideOverlay(); else showOverlay();
    });
  }

  if (closeBtn && overlay) {
    closeBtn.addEventListener('click', hideOverlay);
  }

  // Close overlay on Escape
  document.addEventListener('keydown', function(e){
    if (e.key === 'Escape' && overlay && overlay.classList.contains('show')) {
      hideOverlay();
    }
  });
});