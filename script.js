document.addEventListener('DOMContentLoaded', function() {
  // Initialize AOS animations
  AOS.init({
    duration: 800,
    easing: 'ease-in-out-quad',
    once: false,
    mirror: true,
    offset: 120
  });

  // Theme switching
  const themeToggle = document.querySelector('.theme-toggle');
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  
  // Check for saved theme or prefered scheme
  let currentTheme = localStorage.getItem('theme') || 
                    (prefersDarkScheme.matches ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', currentTheme);
  
  // Set initial icon state
  if (currentTheme === 'dark') {
    document.querySelector('.theme-toggle .fa-sun').style.opacity = '0';
    document.querySelector('.theme-toggle .fa-sun').style.transform = 'translateX(-10px)';
    document.querySelector('.theme-toggle .fa-moon').style.opacity = '1';
    document.querySelector('.theme-toggle .fa-moon').style.transform = 'translateX(0)';
  } else {
    document.querySelector('.theme-toggle .fa-moon').style.opacity = '0';
    document.querySelector('.theme-toggle .fa-moon').style.transform = 'translateX(10px)';
    document.querySelector('.theme-toggle .fa-sun').style.opacity = '1';
    document.querySelector('.theme-toggle .fa-sun').style.transform = 'translateX(0)';
  }
  
  themeToggle.addEventListener('click', () => {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('theme', currentTheme);
    
    // Animate icons
    if (currentTheme === 'dark') {
      document.querySelector('.theme-toggle .fa-sun').style.opacity = '0';
      document.querySelector('.theme-toggle .fa-sun').style.transform = 'translateX(-10px)';
      document.querySelector('.theme-toggle .fa-moon').style.opacity = '1';
      document.querySelector('.theme-toggle .fa-moon').style.transform = 'translateX(0)';
    } else {
      document.querySelector('.theme-toggle .fa-moon').style.opacity = '0';
      document.querySelector('.theme-toggle .fa-moon').style.transform = 'translateX(10px)';
      document.querySelector('.theme-toggle .fa-sun').style.opacity = '1';
      document.querySelector('.theme-toggle .fa-sun').style.transform = 'translateX(0)';
    }
  });

  // Navbar scroll effect
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Smooth scrolling for navigation links
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      // Close mobile menu if open
      navLinks.classList.remove('active');
      hamburger.classList.remove('open');
      
      window.scrollTo({
        top: targetSection.offsetTop - 70,
        behavior: 'smooth'
      });
    });
  });

  // Hamburger menu toggle
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  
  hamburger.addEventListener('click', function() {
    this.classList.toggle('open');
    navLinks.classList.toggle('active');
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.navbar .container') && navLinks.classList.contains('active')) {
      navLinks.classList.remove('active');
      hamburger.classList.remove('open');
    }
  });

  // Typewriter effect
  const typewriterTexts = [
    "Software Engineer",
    "Problem Solver",
    "JavaScript Expert",
    "Python Developer",
    "Tech Enthusiast"
  ];
  
  const typewriterElement = document.querySelector('.typewriter');
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let isEnd = false;
  
  function typeWriter() {
    const currentText = typewriterTexts[textIndex];
    
    if (isDeleting) {
      typewriterElement.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typewriterElement.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
    }
    
    if (!isDeleting && charIndex === currentText.length) {
      isEnd = true;
      isDeleting = true;
      setTimeout(typeWriter, 1500);
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % typewriterTexts.length;
      setTimeout(typeWriter, 500);
    } else {
      const speed = isDeleting ? 50 : 100;
      setTimeout(typeWriter, speed);
    }
  }
  
  // Start typewriter after a delay
  setTimeout(typeWriter, 1000);

  // Project filtering
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Update active button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      
      // Filter projects
      const filterValue = this.getAttribute('data-filter');
      
      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        
        if (filterValue === 'all' || filterValue === category) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // Animate skill bars when they come into view
  const skillBars = document.querySelectorAll('.skill-progress');
  
  function animateSkillBars() {
    skillBars.forEach(bar => {
      const rect = bar.getBoundingClientRect();
      const isVisible = (rect.top <= window.innerHeight && rect.bottom >= 0);
      
      if (isVisible && !bar.classList.contains('animated')) {
        const width = bar.getAttribute('data-width');
        bar.style.width = width;
        bar.classList.add('animated');
      }
    });
  }
  
  window.addEventListener('scroll', animateSkillBars);
  window.addEventListener('load', animateSkillBars);

  // Testimonial slider
  let testimonialIndex = 0;
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  
  function showTestimonial(index) {
    testimonialCards.forEach((card, i) => {
      card.classList.toggle('active', i === index);
    });
  }
  
  function nextTestimonial() {
    testimonialIndex = (testimonialIndex + 1) % testimonialCards.length;
    showTestimonial(testimonialIndex);
  }
  
  // Initialize and auto-rotate testimonials
  showTestimonial(0);
  setInterval(nextTestimonial, 5000);

  // Back to top button
  const backToTopButton = document.querySelector('.back-to-top');
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
      backToTopButton.classList.add('active');
    } else {
      backToTopButton.classList.remove('active');
    }
  });
  
  backToTopButton.addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Contact form submission
  const contactForm = document.getElementById('contact-form');
  
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const formData = new FormData(this);
    const formValues = Object.fromEntries(formData.entries());
    
    // Here you would typically send the data to a server
    console.log('Form submitted:', formValues);
    
    // Show success message
    alert('Thank you for your message! I will get back to you soon.');
    
    // Reset form
    this.reset();
  });

  // Custom cursor
  const cursor = document.querySelector('.cursor');
  const cursorFollower = document.querySelector('.cursor-follower');
  
  if (window.innerWidth > 576) {
    document.addEventListener('mousemove', (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
      
      setTimeout(() => {
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
      }, 100);
    });

    document.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursorFollower.style.width = '30px';
        cursorFollower.style.height = '30px';
        cursorFollower.style.backgroundColor = 'rgba(58, 90, 120, 0.5)';
      });
      
      el.addEventListener('mouseleave', () => {
        cursorFollower.style.width = '40px';
        cursorFollower.style.height = '40px';
        cursorFollower.style.backgroundColor = 'transparent';
      });
    });
  }

  // Particle animation for hero section
  const canvas = document.querySelector('.particles-canvas');
  if (canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const ctx = canvas.getContext('2d');
    const particles = [];
    const particleCount = window.innerWidth < 768 ? 30 : 60;
    
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.color = `rgba(58, 90, 120, ${Math.random() * 0.5 + 0.1})`;
      }
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      }
      
      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    function initParticles() {
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    }
    
    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.strokeStyle = `rgba(58, 90, 120, ${1 - distance / 100})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      
      requestAnimationFrame(animateParticles);
    }
    
    initParticles();
    animateParticles();
    
    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
  }
});