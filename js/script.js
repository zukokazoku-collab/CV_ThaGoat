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

  /* Pasions: listing -> detail views */
  var books = [
    { src: '../assets/book1.jpg', title: 'Livre 1', summary: 'Bref résumé du livre 1.' },
    { src: '../assets/book2.jpg', title: 'Livre 2', summary: 'Bref résumé du livre 2.' }
  ];
  var prods = [
    { src: '../assets/prod1.jpg', title: 'Prod 1', summary: 'Brève description de la production musicale 1.' }
  ];

  var passionLecture = document.getElementById('passion-lecture');
  var passionMusic = document.getElementById('passion-music');
  var passionsList = document.getElementById('passionsList');
  var detailView = document.getElementById('detailView');
  var detailTitle = document.getElementById('detailTitle');
  var detailContent = document.getElementById('detailContent');
  var backBtn = document.getElementById('backToPassions');

  function addSparkleHandlers(el){
    if(!el) return;
    el.addEventListener('mouseenter', function(){ el.classList.add('sparkle'); });
    el.addEventListener('mouseleave', function(){ el.classList.remove('sparkle'); });
    el.addEventListener('focus', function(){ el.classList.add('sparkle'); });
    el.addEventListener('blur', function(){ el.classList.remove('sparkle'); });
    el.addEventListener('keydown', function(e){ if(e.key==='Enter') el.click(); });
  }

  function renderDetail(items, title){
    if(!detailView || !detailContent) return;
    detailTitle.textContent = title;
    detailContent.innerHTML = '';
    items.forEach(function(it){
      var card = document.createElement('div');
      card.className = 'card item';
      var img = document.createElement('img'); img.src = it.src; img.className = 'thumb';
      var wrapper = document.createElement('div');
      var h = document.createElement('h4'); h.textContent = it.title;
      var p = document.createElement('p'); p.textContent = it.summary;
      wrapper.appendChild(h); wrapper.appendChild(p);
      card.appendChild(img); card.appendChild(wrapper);
      detailContent.appendChild(card);
    });
    if(passionsList) passionsList.classList.add('hidden');
    detailView.classList.remove('hidden'); detailView.setAttribute('aria-hidden','false');
  }

  if(passionLecture){ addSparkleHandlers(passionLecture); passionLecture.addEventListener('click', function(){ renderDetail(books,'Lecture'); }); }
  if(passionMusic){ addSparkleHandlers(passionMusic); passionMusic.addEventListener('click', function(){ renderDetail(prods,'Production musicale'); }); }
  if(backBtn){ backBtn.addEventListener('click', function(){ if(detailView) detailView.classList.add('hidden'); detailView.setAttribute('aria-hidden','true'); if(passionsList) passionsList.classList.remove('hidden'); }); }

});