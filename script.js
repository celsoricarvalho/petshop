/* ===================================================
   LÓGICA JAVASCRIPT - PETLOVER
=================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. MENU HAMBÚRGUER MOBILE
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  hamburgerBtn.addEventListener('click', () => {
    hamburgerBtn.classList.toggle('open');
    navMenu.classList.toggle('open');
  });

  // Fechar menu mobile ao clicar em um link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburgerBtn.classList.remove('open');
      navMenu.classList.remove('open');
    });
  });

  // 2. ATIVAÇÃO DE ABAS / LINKS AO ROLAR (SCROLL SPY)
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const targetLink = document.querySelector(`.nav-list a[href*="${sectionId}"]`);

      if (targetLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          targetLink.classList.add('active');
        } else {
          targetLink.classList.remove('active');
        }
      }
    });
  });

  // 3. CARROSSEL DESLIZANTE
  const slides = document.querySelectorAll('.slide');
  const indicators = document.querySelectorAll('.indicator');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');

  let currentSlide = 0;
  let carouselTimer = null;
  const slideInterval = 5000; // 5 segundos

  function goToSlide(index) {
    slides[currentSlide].classList.remove('active');
    indicators[currentSlide].classList.remove('active');

    currentSlide = (index + slides.length) % slides.length;

    slides[currentSlide].classList.add('active');
    indicators[currentSlide].classList.add('active');
  }

  function nextSlide() {
    goToSlide(currentSlide + 1);
  }

  function prevSlide() {
    goToSlide(currentSlide - 1);
  }

  function startAutoPlay() {
    stopAutoPlay();
    carouselTimer = setInterval(nextSlide, slideInterval);
  }

  function stopAutoPlay() {
    if (carouselTimer) clearInterval(carouselTimer);
  }

  // Eventos de clique do carrossel
  nextBtn.addEventListener('click', () => {
    nextSlide();
    startAutoPlay();
  });

  prevBtn.addEventListener('click', () => {
    prevSlide();
    startAutoPlay();
  });

  indicators.forEach(dot => {
    dot.addEventListener('click', () => {
      const targetIndex = parseInt(dot.getAttribute('data-index'), 10);
      goToSlide(targetIndex);
      startAutoPlay();
    });
  });

  // Pausar o carrossel no mouseover
  const carouselContainer = document.getElementById('carousel');
  carouselContainer.addEventListener('mouseenter', stopAutoPlay);
  carouselContainer.addEventListener('mouseleave', startAutoPlay);

  startAutoPlay();

  // 4. FORMULÁRIO DE AGENDAMENTO
  const form = document.getElementById('booking-form');
  const feedback = document.getElementById('form-feedback');

  // Definir data mínima como hoje no input date
  const dateInput = document.getElementById('data');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nome = document.getElementById('nome').value;
    const pet = document.getElementById('pet').value;
    const servico = document.getElementById('servico-select').value;
    const data = document.getElementById('data').value;

    feedback.className = 'form-feedback success';
    feedback.innerHTML = `Obrigado, <strong>${nome}</strong>! Agendamento de <em>${servico}</em> para o pet <strong>${pet}</strong> no dia <strong>${data}</strong> foi recebido com sucesso. Entraremos em contato via WhatsApp!`;

    form.reset();

    setTimeout(() => {
      feedback.style.display = 'none';
      feedback.className = 'form-feedback';
    }, 8000);
  });
});

// 5. CARRINHO DE COMPRAS SIMPLES (Global)
let cartTotal = 0;
let cartItemsCount = 0;

function addToCart(productName, price) {
  cartItemsCount++;
  cartTotal += price;

  const badge = document.getElementById('cart-count');
  badge.textContent = cartItemsCount;

  // Efeito de pulso no botão do carrinho
  const cartBtn = document.getElementById('cart-btn');
  cartBtn.style.transform = 'scale(1.25)';
  setTimeout(() => {
    cartBtn.style.transform = 'scale(1)';
  }, 200);

  alert(`"${productName}" adicionado ao carrinho!\nTotal: R$ ${cartTotal.toFixed(2).replace('.', ',')}`);
}

// 6. PREENCHER SERVIÇO AUTOMATICAMENTE AO CLICAR NO CARD
function selectService(serviceName) {
  const select = document.getElementById('servico-select');
  if (select) {
    select.value = serviceName;
  }
}
