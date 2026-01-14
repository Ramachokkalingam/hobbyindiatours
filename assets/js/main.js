// ===== Mobile Menu Toggle =====
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const toggle = document.querySelector('.mobile-menu-toggle');
    
    navMenu.classList.toggle('active');
    toggle.classList.toggle('active');
}

// ===== Hero Slider =====
let slideIndex = 1;
let slideInterval;

function showSlide(n) {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.dot');
    
    if (n > slides.length) slideIndex = 1;
    if (n < 1) slideIndex = slides.length;
    
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    slides[slideIndex - 1].classList.add('active');
    dots[slideIndex - 1].classList.add('active');
}

function changeSlide(n) {
    showSlide(slideIndex += n);
    resetSlideInterval();
}

function currentSlide(n) {
    showSlide(slideIndex = n);
    resetSlideInterval();
}

function resetSlideInterval() {
    clearInterval(slideInterval);
    startSlideInterval();
}

function startSlideInterval() {
    slideInterval = setInterval(() => {
        showSlide(slideIndex += 1);
    }, 5000);
}

// Start auto-slide when page loads
if (document.querySelector('.hero-slider')) {
    startSlideInterval();
}

// ===== Scroll Animations =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and sections
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.tour-card, .service-card, .feature-card, .stat-card');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
});

// ===== Counter Animation =====
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    
    if (!target || isNaN(target)) {
        console.error('Invalid target for counter:', element);
        return;
    }
    
    // Check if already animated
    if (element.classList.contains('animated')) return;
    element.classList.add('animated');
    
    let current = 0;
    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = target / steps;
    const stepDuration = duration / steps;
    
    const counter = setInterval(() => {
        current += increment;
        
        if (current >= target) {
            // Final value
            if (target === 100) {
                element.textContent = target + '%';
            } else if (target === 17) {
                element.textContent = target;
            } else {
                element.textContent = target.toLocaleString() + '+';
            }
            clearInterval(counter);
        } else {
            // Intermediate value
            element.textContent = Math.floor(current).toLocaleString();
        }
    }, stepDuration);
}

function startCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    console.log('Found counters:', counters.length);
    
    counters.forEach(counter => {
        console.log('Animating counter with target:', counter.getAttribute('data-target'));
        animateCounter(counter);
    });
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            console.log('Stats section is visible, starting animation');
            startCounterAnimation();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

// Initialize stats counter on page load
window.addEventListener('load', function() {
    console.log('Page loaded, initializing counter animation');
    const statsSection = document.querySelector('.stats-section');
    
    if (statsSection) {
        console.log('Stats section found');
        
        // Check if immediately visible
        setTimeout(() => {
            const rect = statsSection.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            console.log('Stats section visibility check:', isVisible);
            
            if (isVisible) {
                // Start animation immediately if visible
                startCounterAnimation();
            } else {
                // Observe for when it becomes visible
                statsObserver.observe(statsSection);
            }
        }, 500);
    } else {
        console.error('Stats section not found');
    }
});

// ===== Sticky Header on Scroll =====
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.05)';
    }
    
    lastScroll = currentScroll;
});

// ===== Smooth Scroll for Anchor Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== Form Handling =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('Looking for inquiry form...');
    const inquiryForm = document.getElementById('quickInquiryForm');
    
    if (inquiryForm) {
        console.log('Inquiry form found, attaching event listener');
        
        inquiryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Form submitted!');
            
            // Get form values
            const nameInput = this.querySelector('input[name="name"]');
            const emailInput = this.querySelector('input[name="email"]');
            const phoneInput = this.querySelector('input[name="phone"]');
            const destinationSelect = this.querySelector('select[name="destination"]');
            
            console.log('Form elements:', {nameInput, emailInput, phoneInput, destinationSelect});
            
            if (!nameInput || !emailInput || !phoneInput || !destinationSelect) {
                console.error('One or more form fields not found');
                alert('Form error. Please refresh the page and try again.');
                return;
            }
            
            const name = nameInput.value.trim();
            const email = emailInput.value.trim();
            const phone = phoneInput.value.trim();
            const destinationValue = destinationSelect.value;
            const destinationText = destinationSelect.options[destinationSelect.selectedIndex].text;
            
            console.log('Form values:', {name, email, phone, destinationValue, destinationText});
            
            // Validate
            if (!name || !email || !phone || !destinationValue) {
                alert('Please fill in all fields');
                return;
            }
            
            // Create WhatsApp message
            const messageText = `Hi! I'm interested in a tour package.\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nDestination: ${destinationText}\n\nPlease send me more details.`;
            const message = encodeURIComponent(messageText);
            const whatsappURL = `https://wa.me/919952211211?text=${message}`;
            
            console.log('WhatsApp URL:', whatsappURL);
            
            // Open WhatsApp
            window.open(whatsappURL, '_blank');
            
            // Reset form
            this.reset();
            
            // Show success message
            alert('Thank you! Opening WhatsApp...');
        });
    } else {
        console.error('Inquiry form not found!');
    }
});

// ===== Lazy Loading Images =====
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===== Page Load Animation =====
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// ===== Filter Tours (for tours.html page) =====
function filterTours(category, buttonElement) {
    console.log('filterTours called with:', category, buttonElement);
    
    const cards = document.querySelectorAll('.tour-card');
    const buttons = document.querySelectorAll('.filter-btn');
    
    console.log('Found', cards.length, 'tour cards');
    console.log('Found', buttons.length, 'filter buttons');
    
    // Update active button
    buttons.forEach(btn => btn.classList.remove('active'));
    if (buttonElement) {
        buttonElement.classList.add('active');
    } else {
        // Fallback: find button by category
        buttons.forEach(btn => {
            if (btn.onclick && btn.onclick.toString().includes(category)) {
                btn.classList.add('active');
            }
        });
    }
    
    // Filter cards
    cards.forEach(card => {
        const categories = (card.dataset.category || '').split(',').map(c => c.trim());
        console.log('Card categories:', categories, 'Filtering by:', category);
        const shouldShow = category === 'all' || categories.includes(category);
        
        if (shouldShow) {
            card.style.display = 'block';
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100);
        } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing filter');
    // Set first button as active
    const firstButton = document.querySelector('.filter-btn');
    if (firstButton) {
        firstButton.classList.add('active');
    }
});

// ===== Back to Top Button =====
const backToTopBtn = document.createElement('button');
backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
backToTopBtn.className = 'back-to-top';
backToTopBtn.style.cssText = `
    position: fixed;
    bottom: 100px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: var(--primary-color);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 999;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`;

document.body.appendChild(backToTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.style.opacity = '1';
        backToTopBtn.style.visibility = 'visible';
    } else {
        backToTopBtn.style.opacity = '0';
        backToTopBtn.style.visibility = 'hidden';
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===== Console Welcome Message =====
console.log('%c🌍 Welcome to Hobby India Tours! ', 'background: #1E40AF; color: white; font-size: 20px; padding: 10px;');
console.log('%cDiscover the world with us since 2009 🎉', 'color: #F59E0B; font-size: 14px;');
