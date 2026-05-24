// Interactions JS pour animations et panneaux

document.addEventListener('DOMContentLoaded', function() {
  try {
    // elevation on hover via JS (keeps elevated while hovered)
    document.querySelectorAll('.card').forEach(function(card){
      card.addEventListener('mouseenter', function(){ card.classList.add('elevated'); });
      card.addEventListener('mouseleave', function(){ card.classList.remove('elevated'); });
    });

    // Profile photo hover swap (expects assets/photo-alt.jpg)
    var photo = document.getElementById('profilePhoto');
    if (photo) {
      var orig = photo.src;
      var alt = orig.replace('photo.jpg', 'photo-alt.jpg');
      photo.addEventListener('mouseenter', function(){ photo.src = alt; });
      photo.addEventListener('mouseleave', function(){ photo.src = orig; });
    }

    // Toggle personal panel
    var toggle = document.getElementById('togglePersonal');
    var personal = document.getElementById('personalPanel');
    var closePersonal = document.getElementById('closePersonal');

    if (toggle && personal) {
      toggle.addEventListener('click', function(){
        personal.classList.toggle('hidden');
        if (personal.classList.contains('hidden')) {
          toggle.innerText = 'Mon côté perso';
        } else {
          toggle.innerText = 'Fermer le perso';
        }
      });
    } else {
      console.warn('toggle or personal panel not found', {toggle: !!toggle, personal: !!personal});
    }

    if (closePersonal && personal) {
      closePersonal.addEventListener('click', function(){ personal.classList.add('hidden'); });
    }

    // Modal for 'lecture' gallery
    var lecture = document.getElementById('lecture');
    var modal = document.getElementById('modal');
    var closeModal = document.getElementById('closeModal');
    var modalContent = document.getElementById('modalContent');
    var galleryImages = ['assets/book1.jpg','assets/book2.jpg']; // remplacer

    function openModal(images){
      if (!modal || !modalContent) return;
      modalContent.innerHTML = '';
      images.forEach(function(src){
        var img = document.createElement('img');
        img.src = src;
        img.className = 'thumb';
        modalContent.appendChild(img);
      });
      modal.classList.remove('hidden');
    }

    if (lecture) {
      lecture.addEventListener('click', function(){ openModal(galleryImages); });
      lecture.addEventListener('mouseover', function(){ lecture.classList.add('sparkle'); });
      lecture.addEventListener('mouseleave', function(){ lecture.classList.remove('sparkle'); });
    }

    if (closeModal && modal) {
      closeModal.addEventListener('click', function(){ modal.classList.add('hidden'); });
      modal.addEventListener('click', function(e){ if (e.target === modal) modal.classList.add('hidden'); });
    }

  } catch (err) {
    console.error('Error initializing UI interactions', err);
  }
});