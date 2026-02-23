// basic interactivity for the landing page

// smooth scroll is handled by CSS scroll-behavior but we can highlight active link
const navLinks = document.querySelectorAll('header nav a');

function setActiveLink() {
  const fromTop = window.scrollY + 100; // offset for header
  navLinks.forEach(link => {
    const section = document.querySelector(link.hash);
    if (section) {
      if (
        section.offsetTop <= fromTop &&
        section.offsetTop + section.offsetHeight > fromTop
      ) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    }
  });
}

window.addEventListener('scroll', setActiveLink);

// contact form validation
const contactForm = document.querySelector('#contact form');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = contactForm.querySelector('input[type=text]');
    const email = contactForm.querySelector('input[type=email]');
    if (!name.value.trim() || !email.value.trim()) {
      alert('Please fill in both your name and email');
      return;
    }
    // simple email pattern
    const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (!emailPattern.test(email.value)) {
      alert('Please enter a valid email address');
      return;
    }
    alert('Thank you for contacting us, ' + name.value + '!');
    contactForm.reset();
  });
}

// filter menu by availability
const availCheckbox = document.createElement('input');
availCheckbox.type = 'checkbox';
availCheckbox.id = 'show-available';
availCheckbox.style.marginBottom = '10px';
availCheckbox.nextSibling;
const availLabel = document.createElement('label');
availLabel.htmlFor = 'show-available';
availLabel.textContent = 'Show only available items';
availLabel.style.marginLeft = '5px';

const menuSection = document.querySelector('#menu');
if (menuSection) {
  menuSection.insertBefore(availCheckbox, menuSection.querySelector('table'));
  menuSection.insertBefore(availLabel, menuSection.querySelector('table'));
  availCheckbox.addEventListener('change', () => {
    const rows = menuSection.querySelectorAll('table tr');
    rows.forEach((row, idx) => {
      if (idx === 0) return; // header row
      const avail = row.cells[3].textContent.toLowerCase();
      if (availCheckbox.checked && avail !== 'yes') {
        row.classList.add('hidden');
      } else {
        row.classList.remove('hidden');
      }
    });
  });
}

// toggle branch details
const branchHeaders = document.querySelectorAll('#branchs h3');
branchHeaders.forEach(h => {
  h.style.cursor = 'pointer';
  const ul = h.nextElementSibling;
  if (ul) ul.classList.add('hidden');
  h.addEventListener('click', () => {
    if (ul) ul.classList.toggle('hidden');
  });
});

// simple image carousel for the dishes
(function(){
  const images = document.querySelectorAll('#images img');
  let current = 0;
  if (images.length > 1) {
    setInterval(() => {
      images[current].classList.add('hidden');
      current = (current + 1) % images.length;
      images[current].classList.remove('hidden');
    }, 3000);
  }
})();
