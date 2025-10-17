// --- Modal image --
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImage');
const span = document.getElementsByClassName('close')[0];

if (modal && modalImg && span) {
  document.querySelectorAll('.persona-img').forEach(img => {
    img.addEventListener('click', function() {
      if (getComputedStyle(this).pointerEvents === 'none') return; // currently disabled
      modal.style.display = 'block';
      modalImg.src = this.src;
    });
  });

  span.onclick = function() { modal.style.display = 'none'; }
  modal.onclick = function(event) { if (event.target === modal) modal.style.display = 'none'; }
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') modal.style.display = 'none';
  });
}

// --- Flows carousel ---
let currentSlide = 0;
const carousel = document.getElementById('flowsCarousel');
const slides = document.querySelectorAll('#flowsCarousel .carousel-slide');
const dots = document.querySelectorAll('#flowsDots .carousel-dot');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

function updateCarousel() {
  if (!carousel) return;
  carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
  dots.forEach((dot, index) => dot.classList.toggle('active', index === currentSlide));
}

function nextSlide() { currentSlide = (currentSlide + 1) % slides.length; updateCarousel(); }
function prevSlide() { currentSlide = (currentSlide - 1 + slides.length) % slides.length; updateCarousel(); }

if (nextBtn && prevBtn) {
  nextBtn.addEventListener('click', nextSlide);
  prevBtn.addEventListener('click', prevSlide);
}

if (dots.length) {
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => { currentSlide = index; updateCarousel(); });
  });
}

document.addEventListener('keydown', function(event) {
  if (event.key === 'ArrowLeft') prevSlide();
  else if (event.key === 'ArrowRight') nextSlide();
});

let startX = 0;
const carouselContainer = document.querySelector('#flowsCarousel')?.closest('.carousel-container');
if (carouselContainer) {
  carouselContainer.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; }, { passive: true });
  carouselContainer.addEventListener('touchend', (e) => {
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;
    if (Math.abs(diff) > 50) diff > 0 ? nextSlide() : prevSlide();
  }, { passive: true });
  carouselContainer.addEventListener('mousedown', (e) => { e.preventDefault(); startX = e.clientX; });
  carouselContainer.addEventListener('mouseup', (e) => {
    const endX = e.clientX; const diff = startX - endX;
    if (Math.abs(diff) > 50) diff > 0 ? nextSlide() : prevSlide();
  });
}

document.querySelectorAll('.carousel-slide img').forEach(img => {
  img.addEventListener('dragstart', (e) => e.preventDefault());
});

// --- Hide header on scroll ---
(function initHideOnScrollHeader(){
  const headerEl = document.querySelector('header');
  if (!headerEl) return;
  const setHeaderHeight = () => {
    const h = headerEl.getBoundingClientRect().height;
    document.documentElement.style.setProperty('--header-height', h + 'px');
  };
  setHeaderHeight();
  window.addEventListener('resize', setHeaderHeight);

  let lastY = window.pageYOffset || document.documentElement.scrollTop;
  let ticking = false;
  const onScroll = () => {
    const y = window.pageYOffset || document.documentElement.scrollTop;
    const goingDown = y > lastY;
    if (goingDown && y > 10) headerEl.classList.add('header-hidden');
    else headerEl.classList.remove('header-hidden');
    lastY = y;
    ticking = false;
  };
  window.addEventListener('scroll', () => {
    if (!ticking) { window.requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });
})();

// --- Prototype carousel ---
let protoCurrent = 0;
const protoCarousel = document.getElementById('protoCarousel');
const protoSlides = document.querySelectorAll('#protoCarousel .carousel-slide');
const protoDots = document.querySelectorAll('#protoDots .carousel-dot');
const protoPrev = document.getElementById('protoPrevBtn');
const protoNext = document.getElementById('protoNextBtn');
const protoContainer = document.getElementById('protoCarouselContainer');

function updateProto(){
  if (!protoCarousel) return;
  protoCarousel.style.transform = `translateX(-${protoCurrent * 100}%)`;
  protoDots.forEach((dot, i)=> dot.classList.toggle('active', i === protoCurrent));
}

function protoNextSlide(){ protoCurrent = (protoCurrent + 1) % protoSlides.length; updateProto(); }
function protoPrevSlide(){ protoCurrent = (protoCurrent - 1 + protoSlides.length) % protoSlides.length; updateProto(); }

if (protoNext && protoPrev){
  protoNext.addEventListener('click', protoNextSlide);
  protoPrev.addEventListener('click', protoPrevSlide);
}

if (protoDots.length){
  protoDots.forEach((dot, i)=>{ dot.addEventListener('click', ()=>{ protoCurrent = i; updateProto(); }); });
}

let protoStartX = 0;
if (protoContainer){
  protoContainer.addEventListener('touchstart', (e)=>{ protoStartX = e.touches[0].clientX; }, {passive:true});
  protoContainer.addEventListener('touchend', (e)=>{
    const endX = e.changedTouches[0].clientX;
    const diff = protoStartX - endX;
    if (Math.abs(diff) > 50) { diff > 0 ? protoNextSlide() : protoPrevSlide(); }
  }, {passive:true});
  protoContainer.addEventListener('mousedown', (e)=>{ e.preventDefault(); protoStartX = e.clientX; });
  protoContainer.addEventListener('mouseup', (e)=>{
    const endX = e.clientX; const diff = protoStartX - endX;
    if (Math.abs(diff) > 50) { diff > 0 ? protoNextSlide() : protoPrevSlide(); }
  });
}
