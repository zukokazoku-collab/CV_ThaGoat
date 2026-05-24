// Interactions JS pour animations et panneaux
document.addEventListener('DOMContentLoaded',()=>{
  // elevation on hover via JS (keeps elevated while hovered)
  document.querySelectorAll('.card').forEach(card=>{
    card.addEventListener('mouseenter',()=>card.classList.add('elevated'))
    card.addEventListener('mouseleave',()=>card.classList.remove('elevated'))
  })

  // Profile photo hover swap (expects assets/photo-alt.jpg)
  const photo=document.getElementById('profilePhoto')
  if(photo){
    const orig=photo.src
    const alt=photo.src.replace('photo.jpg','photo-alt.jpg')
    photo.addEventListener('mouseenter',()=>{photo.src=alt})
    photo.addEventListener('mouseleave',()=>{photo.src=orig})
  }

  // Toggle personal panel
  const toggle=document.getElementById('togglePersonal')
  const personal=document.getElementById('personalPanel')
  const closePersonal=document.getElementById('closePersonal')
  toggle?.addEventListener('click',()=>{
    personal.classList.toggle('hidden')
    personal.classList.contains('hidden')?toggle.innerText='Mon côté perso':toggle.innerText='Fermer le perso'
  })
  closePersonal?.addEventListener('click',()=>personal.classList.add('hidden'))

  // Modal for 'lecture' gallery
  const lecture=document.getElementById('lecture')
  const modal=document.getElementById('modal')
  const closeModal=document.getElementById('closeModal')
  const modalContent=document.getElementById('modalContent')
  const galleryImages=['assets/book1.jpg','assets/book2.jpg'] // remplacer

  function openModal(images){
    modalContent.innerHTML=''
    images.forEach(src=>{
      const img=document.createElement('img')
      img.src=src;img.className='thumb';modalContent.appendChild(img)
    })
    modal.classList.remove('hidden')
  }
  lecture?.addEventListener('click',()=>openModal(galleryImages))
  closeModal?.addEventListener('click',()=>modal.classList.add('hidden'))
  modal?.addEventListener('click',e=>{if(e.target===modal)modal.classList.add('hidden')})

  // sparkle effect (simple CSS toggle)
  lecture?.addEventListener('mouseover',()=>lecture.classList.add('sparkle'))
  lecture?.addEventListener('mouseleave',()=>lecture.classList.remove('sparkle'))
})