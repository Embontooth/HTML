// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('#navbar ul');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a nav item
document.querySelectorAll('#navbar ul li a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
});

// Active navigation item based on scroll position
window.addEventListener('scroll', () => {
  const scrollPosition = window.scrollY;
  const navLinks = document.querySelectorAll('#navbar ul li a');
  const sections = document.querySelectorAll('section');
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.clientHeight;
    const sectionId = section.getAttribute('id');
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + sectionId) {
          link.classList.add('active');
        }
      });
    }
  });
});

// Form submission handling
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    
    // You would typically send this data to a server
    // For now, we'll just show an alert
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Form validation
    if (!name || !email || !subject || !message) {
      alert('Please fill in all fields');
      return;
    }
    
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address');
      return;
    }
    
    // Simulate form submission
    alert(`Thank you for your message, ${name}! I'll get back to you soon.`);
    contactForm.reset();
  });
}

// Add animation to elements when they come into view
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Elements to animate
document.querySelectorAll('.project-card, .skill-item, .about-content, .contact-content').forEach(element => {
  element.classList.add('fade-in');
  observer.observe(element);
});

// Add this CSS for animations
document.head.insertAdjacentHTML('beforeend', `
  <style>
    .fade-in {
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .fade-in.animate {
      opacity: 1;
      transform: translateY(0);
    }
  </style>
`);

// Typing animation for home section
const typeText = () => {
  const text = "Web Developer";
  const typeSpeed = 100; // milliseconds
  const h2Element = document.querySelector('#home h2');
  
  if (h2Element) {
    h2Element.textContent = "";
    let i = 0;
    
    const typing = setInterval(() => {
      if (i < text.length) {
        h2Element.textContent += text.charAt(i);
        i++;
      } else {
        clearInterval(typing);
      }
    }, typeSpeed);
  }
};

// Run typing animation when page loads
window.addEventListener('load', typeText);
