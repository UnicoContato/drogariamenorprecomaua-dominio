const header = document.getElementById('siteHeader');
const menuButton = document.getElementById('menuButton');
const mobileMenu = document.getElementById('mobileMenu');
const privacyOpen = document.getElementById('privacyOpen');
const privacyModal = document.getElementById('privacyModal');
const privacyClose = document.getElementById('privacyClose');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;
  if (currentScroll > lastScroll && currentScroll > 120) {
    header.style.transform = 'translateY(-120%)';
  } else {
    header.style.transform = 'translateY(0)';
  }
  lastScroll = currentScroll;
});

menuButton.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('hidden') === false;
  menuButton.classList.toggle('menu-open', isOpen);
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('#mobileMenu a').forEach((link) => {
  link.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
    menuButton.classList.remove('menu-open');
    menuButton.setAttribute('aria-expanded', 'false');
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

const openModal = () => {
  privacyModal.classList.remove('hidden');
  privacyModal.classList.add('flex');
  document.body.style.overflow = 'hidden';
};

const closeModal = () => {
  privacyModal.classList.add('hidden');
  privacyModal.classList.remove('flex');
  document.body.style.overflow = '';
};

privacyOpen.addEventListener('click', openModal);
privacyClose.addEventListener('click', closeModal);

privacyModal.addEventListener('click', (event) => {
  if (event.target === privacyModal) {
    closeModal();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !privacyModal.classList.contains('hidden')) {
    closeModal();
  }
});
