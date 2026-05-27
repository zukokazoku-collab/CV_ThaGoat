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
    { src: '../img/l1.jpg', title: 'Comment se faire des amis', summary: 'Une véritable claque sur l\'importance de l\'empathie au quotidien. J\'ai complètement revu ma façon d\'interagir avec les autres.' },
    { src: '../img/l2.jpg', title: 'système1 système2', summary: 'Ce livre m\'a fasciné en m\'expliquant pourquoi mon cerveau me joue parfois des tours. C\'est fou de réaliser à quel point nos biais cognitifs influencent nos choix.' },
    { src: '../img/l3.jpg', title: 'Ne coupez jamais la poire en deux', summary: 'Une approche de la négociation qui m\'a paru très contre-intuitive au départ, mais qui s\'avère redoutablement efficace.' },
    { src: '../img/l4.jpg', title: 'Influence et manipulation', summary: 'J\'ai dévoré cet ouvrage pour enfin décrypter les mécanismes psychologiques qu\'on utilise pour nous persuader. Ça m\'a donné un regard beaucoup plus critique.' },
    { src: '../img/l5.jpg', title: 'L\'égo est l\'enemi', summary: 'Une belle leçon d\'humilité qui m\'a rappelé que la fierté mal placée est souvent le plus grand frein à la réussite.' },
    { src: '../img/l6.jpg', title: 'L\'autoroute du millionaire', summary: 'Une perspective assez brutale mais nécessaire sur l\'entrepreneuriat. Ça a vraiment bousculé ma vision classique du monde du travail.' },
    { src: '../img/l7.jpg', title: 'Good strategy / Bad strategy', summary: 'Enfin un livre qui démythifie le mot "stratégie" et montre concrètement comment construire un plan d\'action qui tient la route.' },
    { src: '../img/l8.jpg', title: 'The Lean Startup', summary: 'C\'est devenu ma bible pour tout nouveau projet : tester vite, échouer vite et itérer. L\'idée du produit minimum viable a changé ma façon de développer.' },
    { src: '../img/l9.jpg', title: 'Tyrann', summary: 'J\'ai été happé par cet univers sombre et cette réflexion intense sur le pouvoir. Le genre de fiction qui laisse une trace bien après.' },
    { src: '../img/l10.jpg', title: 'Le robot qui rêvait', summary: 'Asimov a ce don de poser des questions éthiques vertigineuses sous couvert de science-fiction. J\'ai adoré me perdre dans ces réflexions sur la conscience artificielle.' },
    { src: '../img/l11.jpg', title: 'La mouche/ Dans la colonie pénitentiaire', summary: 'Deux nouvelles glaçantes qui m\'ont profondément marqué par leur atmosphère absurde et oppressante.' },
    { src: '../img/l12.jpg', title: 'La saga twilight', summary: 'Une petite pause coupable et réconfortante que j\'assume totalement. J\'aime juste me laisser porter par l\'histoire de temps en temps.' },
    { src: '../img/l13.jpg', title: 'Jojo\'s bizarre adventure part VII', summary: 'Sans doute l\'un de mes mangas préférés pour son originalité visuelle et son scénario imprévisible. La course à travers les États-Unis m\'a tenu en haleine jusqu\'au bout.' },
    { src: '../img/l14.jpg', title: 'L\'Homme le plus riche de Babylone', summary: 'Des principes financiers vieux comme le monde mais tellement bien racontés. C\'est grâce à ces paraboles que j\'ai commencé à vraiment gérer mon budget.' },
    { src: '../img/l15.jpg', title: 'A more beautiful question', summary: 'Ce livre m\'a fait réaliser qu\'on passe trop de temps à chercher des réponses au lieu de poser les bonnes questions.' },
    { src: '../img/l16.jpg', title: 'The dance of leadership', summary: 'Une lecture inspirante qui aborde le leadership non pas comme un statut, mais comme un art subtil et en mouvement.' },
    { src: '../img/l17.jpg', title: 'Mind, society and behaviour', summary: 'Plonger dans la psychologie comportementale à grande échelle m\'a ouvert les yeux sur la façon dont nos sociétés fonctionnent.' },
    { src: '../img/l18.jpg', title: 'Initiation à l\'algorithmique et aux structures de données', summary: 'Un incontournable qui m\'a fait transpirer mais m\'a donné des bases solides. Je me sens beaucoup plus confiant face à un problème logique complexe depuis.' },
    { src: '../img/l19.jpg', title: 'Quelques autres', summary: 'Juste un petit clin d\'œil à toutes ces autres lectures qui ont forgé mon esprit mais dont j\'ai oublié le titre ou prêté l\'exemplaire.' },
  ];
  var prods = [
    { src: '../img/img_prod/img1.png', title: 'Prod 1', summary: 'Une production de beat de rap avec quelques sonorités électros' },
    { src: '../img/img_prod/img2.png', title: 'Prod 2', summary: 'Une production inachevé dans le style maximaliste proche de celui de Kanye. Des prods à vous faire trembler des immeubles.' },
    { src: '../img/img_prod/img3.png', title: 'Prod 3', summary: 'Une mélodie calme avec des sons de flûtes.' },
    { src: '../img/img_prod/img4.png', title: 'Prod 4', summary: 'Une production plutôt apaisante me rappelant des vibes maritime (du genre de far solitaire perdu au milieu d\'un océan tranquille.)' }
  ];

  // normalize any paths that still start with ../ so they work from root index.html
  function _normalizePaths(items){
    if(!items) return;
    items.forEach(function(it){ if(it && it.src && it.src.indexOf('../')===0) it.src = it.src.replace(/^\.\.\//,''); });
  }
  _normalizePaths(books);
  _normalizePaths(prods);

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
      if (photoContainer) {
        var offset = window.innerWidth <= 680 ? '-15px' : '-40px';
        photoContainer.style.setProperty('--photo-offset', offset);
      }
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
  if(backBtn){
    backBtn.addEventListener('click', function(e){
      e.preventDefault();
      if(detailView) {
        detailView.classList.add('hidden');
        detailView.setAttribute('aria-hidden','true');
      }
      if(passionsList) passionsList.classList.remove('hidden');
      // return focus to passions list for accessibility
      if(passionsList) {
        var firstPassion = passionsList.querySelector('.passion');
        if(firstPassion && typeof firstPassion.focus === 'function') firstPassion.focus();
      }
    });
  }

  // Delegated handler as a fallback (works even if button is replaced dynamically)
  document.addEventListener('click', function(e){
    var btn = e.target.closest ? e.target.closest('#backToPassions') : null;
    if(!btn) return;
    e.preventDefault();
    if(detailView) {
      detailView.classList.add('hidden');
      detailView.setAttribute('aria-hidden','true');
    }
    if(passionsList) passionsList.classList.remove('hidden');
    if(passionsList) {
      var firstPassion = passionsList.querySelector('.passion');
      if(firstPassion && typeof firstPassion.focus === 'function') firstPassion.focus();
    }
  });

});