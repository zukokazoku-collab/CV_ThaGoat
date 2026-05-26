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
    { src: '../img/l1.jpg', title: 'Comment se faire des amis', summary: 'Résumé bref du livre 1.' },
    { src: '../img/l2.jpg', title: 'système1 système2', summary: 'Résumé bref du livre 2.' },
    { src: '../img/l3.jpg', title: 'Ne coupez jamais la poire en deux', summary: 'Résumé bref du livre 3.' },
    { src: '../img/l4.jpg', title: 'Influence et manipulation', summary: 'Résumé bref du livre 4.' },
    { src: '../img/l5.jpg', title: 'L\'égo est l\'enemi', summary: 'Résumé bref du livre 5.' },
    { src: '../img/l6.jpg', title: 'L\'autoroute du millionaire', summary: 'Résumé bref du livre 6.' },
    { src: '../img/l7.jpg', title: 'Good strategy / Bad strategy', summary: 'Résumé bref du livre 7.' },
    { src: '../img/l8.jpg', title: 'The Lean Startup', summary: 'Résumé bref du livre 8.' },
    { src: '../img/l9.jpg', title: 'Tyrann', summary: 'Résumé bref du livre 9.' },
    { src: '../img/l10.jpg', title: 'Le robot qui rêvait', summary: 'Résumé bref du livre 10.' },
    { src: '../img/l11.jpg', title: 'La mouche/ Dans la colonie pénitentiaire', summary: 'Résumé bref du livre 11.' },
    { src: '../img/l12.jpg', title: 'La saga twilight', summary: 'Résumé bref du livre 12.' },
    { src: '../img/l13.jpg', title: 'Jojo\'s bizarre adventure part VII', summary: 'Résumé bref du livre 13.' },
    { src: '../img/l14.jpg', title: 'L\'Homme le plus riche de Babylone', summary: 'Résumé bref du livre 14.' },
    { src: '../img/l15.jpg', title: 'A more beautiful question', summary: 'Résumé bref du livre 15.' },
    { src: '../img/l16.jpg', title: 'The dance of leadership', summary: 'Résumé bref du livre 16.' },
    { src: '../img/l17.jpg', title: 'Mind, society and behaviour', summary: 'Résumé bref du livre 17.' },
    { src: '../img/l18.jpg', title: 'Initiation à l\'algorithmique et aux structures de données', summary: 'Résumé bref du livre 18.' },
    { src: '../img/l19.jpg', title: 'Livre 19', summary: 'Et quelques autres livres que je n\'ai plus en ma possession.' },
  ];
  var prods = [
    { src: '../img/img_prod/img1.png', title: 'Prod 1', summary: 'Brève description de la production 1.' },
    { src: '../img/img_prod/img2.png', title: 'Prod 2', summary: 'Brève description de la production 2.' },
    { src: '../img/img_prod/img3.png', title: 'Prod 3', summary: 'Brève description de la production 3.' },
    { src: '../img/img_prod/img4.png', title: 'Prod 4', summary: 'Brève description de la production 4.' }
  ];

  // Profile photo hover swap: change me1.jpg -> me2.jpg on hover, revert on leave
  var profilePhoto = document.getElementById('profilePhoto');
  if (profilePhoto) {
    var _origSrc = profilePhoto.getAttribute('src');
    var _hoverSrc = _origSrc.replace('me1.jpg','me2.jpg');
    // fallback: if replace did nothing, try different case
    if (_hoverSrc === _origSrc) _hoverSrc = _origSrc.replace('me1.JPG','me2.jpg');

    // handle vertical offset change while hovered
    var photoContainer = profilePhoto.closest('.photo') || profilePhoto.parentElement;
    var _origOffset = null;
    if (photoContainer) {
      _origOffset = getComputedStyle(photoContainer).getPropertyValue('--photo-offset');
      _origOffset = (_origOffset || '').trim();
      if (_origOffset === '') _origOffset = null; // means CSS fallback
    }

    var applyHoverState = function(){
      profilePhoto.setAttribute('src', _hoverSrc);
      if (photoContainer) photoContainer.style.setProperty('--photo-offset', '-40px');
    };
    var applyNormalState = function(){
      profilePhoto.setAttribute('src', _origSrc);
      if (photoContainer) {
        if (_origOffset !== null) photoContainer.style.setProperty('--photo-offset', _origOffset);
        else photoContainer.style.removeProperty('--photo-offset');
      }
    };

    profilePhoto.addEventListener('mouseenter', applyHoverState);
    profilePhoto.addEventListener('mouseleave', applyNormalState);
    // keyboard accessibility
    profilePhoto.addEventListener('focus', applyHoverState);
    profilePhoto.addEventListener('blur', applyNormalState);
    // touch devices: toggle on touchstart / touchend
    profilePhoto.addEventListener('touchstart', function(e){ applyHoverState(); }, {passive:true});
    profilePhoto.addEventListener('touchend', function(e){ applyNormalState(); }, {passive:true});
  }

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