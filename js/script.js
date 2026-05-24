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
    { src: '../assets/book1.svg', title: 'Livre 1', summary: 'Résumé bref du livre 1.' },
    { src: '../assets/book2.svg', title: 'Livre 2', summary: 'Résumé bref du livre 2.' },
    { src: '../assets/book3.svg', title: 'Livre 3', summary: 'Résumé bref du livre 3.' },
    { src: '../assets/book4.svg', title: 'Livre 4', summary: 'Résumé bref du livre 4.' },
    { src: '../assets/book5.svg', title: 'Livre 5', summary: 'Résumé bref du livre 5.' },
    { src: '../assets/book6.svg', title: 'Livre 6', summary: 'Résumé bref du livre 6.' },
    { src: '../assets/book7.svg', title: 'Livre 7', summary: 'Résumé bref du livre 7.' },
    { src: '../assets/book8.svg', title: 'Livre 8', summary: 'Résumé bref du livre 8.' },
    { src: '../assets/book9.svg', title: 'Livre 9', summary: 'Résumé bref du livre 9.' },
    { src: '../assets/book10.svg', title: 'Livre 10', summary: 'Résumé bref du livre 10.' },
    { src: '../assets/book11.svg', title: 'Livre 11', summary: 'Résumé bref du livre 11.' },
    { src: '../assets/book12.svg', title: 'Livre 12', summary: 'Résumé bref du livre 12.' },
    { src: '../assets/book13.svg', title: 'Livre 13', summary: 'Résumé bref du livre 13.' },
    { src: '../assets/book14.svg', title: 'Livre 14', summary: 'Résumé bref du livre 14.' },
    { src: '../assets/book15.svg', title: 'Livre 15', summary: 'Résumé bref du livre 15.' },
    { src: '../assets/book16.svg', title: 'Livre 16', summary: 'Résumé bref du livre 16.' },
    { src: '../assets/book17.svg', title: 'Livre 17', summary: 'Résumé bref du livre 17.' },
    { src: '../assets/book18.svg', title: 'Livre 18', summary: 'Résumé bref du livre 18.' },
    { src: '../assets/book19.svg', title: 'Livre 19', summary: 'Résumé bref du livre 19.' },
    { src: '../assets/book20.svg', title: 'Livre 20', summary: 'Résumé bref du livre 20.' }
  ];
  var prods = [
    { src: '../assets/prod1.svg', title: 'Prod 1', summary: 'Brève description de la production 1.' },
    { src: '../assets/prod2.svg', title: 'Prod 2', summary: 'Brève description de la production 2.' },
    { src: '../assets/prod3.svg', title: 'Prod 3', summary: 'Brève description de la production 3.' },
    { src: '../assets/prod4.svg', title: 'Prod 4', summary: 'Brève description de la production 4.' }
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