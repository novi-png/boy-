const gallery = document.getElementById('gallery');
const buttons = document.querySelectorAll('.controls button');
const search = document.getElementById('search');
const cards = [...document.querySelectorAll('.card')];
const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lb-img');
const lbName = document.getElementById('lb-name');
const lbRole = document.getElementById('lb-role');
const closeBtn = document.getElementById('close');

// Filter
function filterGallery(filter){
  cards.forEach(card=>{
    const gender = card.dataset.gender;
    const name = card.dataset.name.toLowerCase();
    const q = search.value.trim().toLowerCase();
    const matchesFilter = (filter === 'all') || (filter === gender);
    const matchesSearch = q === '' || name.includes(q);
    card.style.display = (matchesFilter && matchesSearch) ? '' : 'none';
  });
}

buttons.forEach(btn=>{
  btn.addEventListener('click', ()=>{
    buttons.forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    filterGallery(btn.dataset.filter);
  });
});

search.addEventListener('input', ()=>{
  const active = document.querySelector('.controls button.active').dataset.filter;
  filterGallery(active);
});

// LIGHTBOX OPEN
cards.forEach(card=>{
  card.addEventListener('click', ()=>{
    const img = card.querySelector('img').src;
    const name = card.dataset.name;
    const role = card.querySelector('.role').textContent;

    lbImg.src = img.replace('360x480','720x960');
    lbImg.alt = name;
    lbName.textContent = name;
    lbRole.textContent = role;

    lightbox.setAttribute('aria-hidden','false');
    closeBtn.focus();
  });
});

// CLOSE
closeBtn.addEventListener('click', ()=>{
  lightbox.setAttribute('aria-hidden','true');
});

lightbox.addEventListener('click', (e)=>{
  if(e.target === lightbox){
    lightbox.setAttribute('aria-hidden','true');
  }
});

// ESC key
document.addEventListener('keydown', (e)=>{
  if(lightbox.getAttribute('aria-hidden') === 'false'){
    if(e.key === 'Escape'){
      lightbox.setAttribute('aria-hidden','true');
    }
  }
});

// Initial
filterGallery('all');