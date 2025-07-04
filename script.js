// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Navigation
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on nav links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
    
    // Smooth Scrolling for Navigation Links
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerOffset = 80;
                const elementPosition = targetSection.offsetTop;
                const offsetPosition = elementPosition - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
            navbar.style.backdropFilter = 'blur(15px)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        }
        
        // Hide/show navbar on scroll
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });
    
    // Product Card Interactions
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        const quickViewBtn = card.querySelector('.quick-view');
        
        if (quickViewBtn) {
            quickViewBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                const productId = card.getAttribute('data-product');
                showProductQuickView(productId);
            });
        }
        
        // Add hover sound effect (optional)
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmission);
    }
    
    // Floating Elements Animation Enhancement
    const floatingElements = document.querySelectorAll('.element');
    floatingElements.forEach((element, index) => {
        // Add random movement
        setInterval(() => {
            const randomX = Math.random() * 20 - 10;
            const randomY = Math.random() * 20 - 10;
            element.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${Math.random() * 360}deg)`;
        }, 3000 + index * 1000);
    });
    
    // Scroll-triggered Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.product-card, .about-text, .contact-info, .stats');
    animateElements.forEach(el => observer.observe(el));
    
    // Dynamic Text Effects
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        // Add glitch effect on hover
        heroTitle.addEventListener('mouseenter', function() {
            this.classList.add('glitch-effect');
            setTimeout(() => {
                this.classList.remove('glitch-effect');
            }, 1000);
        });
    }
    
    // Shopping Cart Counter (placeholder)
    let cartCount = 0;
    const cartIcon = document.querySelector('.fa-shopping-cart');
    if (cartIcon) {
        cartIcon.addEventListener('click', function() {
            showCart();
        });
    }
    
    // Social Media Icons Animation
    const socialIcons = document.querySelectorAll('.nav-icons i');
    socialIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            this.style.transform = 'scale(1.3) rotate(360deg)';
            setTimeout(() => {
                this.style.transform = 'scale(1) rotate(0deg)';
            }, 300);
        });
    });
    
    // Parallax Effect for Hero Section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroBackground = document.querySelector('.hero-bg-video');
        if (heroBackground) {
            heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
    
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Close any open modals or menus
            hamburger?.classList.remove('active');
            navMenu?.classList.remove('active');
        }
    });
    
    // Initialize animations
    initializeAnimations();
});

// Form Submission Handler
function handleFormSubmission(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    // Show loading state
    const submitBtn = e.target.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'SENDING...';
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        submitBtn.textContent = 'MESSAGE SENT!';
        submitBtn.style.background = 'var(--accent-neon)';
        
        // Reset form
        e.target.reset();
        
        // Reset button after delay
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.style.background = '';
        }, 3000);
        
        // Show success notification
        showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
    }, 1500);
}

// Product Quick View Modal
function showProductQuickView(productId) {
    const products = {
        '1': {
            name: 'URBAN DECAY TEE',
            price: '$89',
            description: 'Premium cotton tee with distressed graphics. Born from the streets.',
            image: 'https://via.placeholder.com/400x500/ff073a/ffffff?text=URBAN+DECAY'
        },
        '2': {
            name: 'CHAOS HOODIE',
            price: '$129',
            description: 'Heavyweight hoodie with raw embroidered details. Comfort meets rebellion.',
            image: 'https://via.placeholder.com/400x500/00ff41/000000?text=CHAOS'
        },
        '3': {
            name: 'REBEL CARGO PANTS',
            price: '$149',
            description: 'Tactical-inspired cargo pants with multiple pockets. Function and style.',
            image: 'https://via.placeholder.com/400x500/ff6b35/ffffff?text=REBEL'
        },
        '4': {
            name: 'ANARCHY CAP',
            price: '$59',
            description: 'Adjustable snapback with 3D embroidered logo. Statement headwear.',
            image: 'https://via.placeholder.com/400x500/0a0a0a/00ff41?text=ANARCHY'
        }
    };
    
    const product = products[productId];
    if (!product) return;
    
    // Create modal HTML
    const modalHTML = `
        <div class="modal-overlay" id="quickViewModal">
            <div class="modal-content">
                <button class="modal-close">&times;</button>
                <div class="modal-product">
                    <div class="modal-image">
                        <img src="${product.image}" alt="${product.name}">
                    </div>
                    <div class="modal-info">
                        <h2>${product.name}</h2>
                        <p class="modal-price">${product.price}</p>
                        <p class="modal-description">${product.description}</p>
                        <div class="modal-actions">
                            <button class="add-to-cart-btn">ADD TO CART</button>
                            <button class="wishlist-btn">♡ WISHLIST</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Add modal to DOM
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Add modal styles if not already present
    if (!document.querySelector('#modal-styles')) {
        const modalStyles = `
            <style id="modal-styles">
                .modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.9);
                    z-index: 10000;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    opacity: 0;
                    animation: fadeIn 0.3s forwards;
                }
                
                .modal-content {
                    background: var(--secondary-black);
                    border-radius: var(--border-radius);
                    max-width: 800px;
                    width: 90%;
                    position: relative;
                    transform: translateY(50px);
                    animation: slideIn 0.3s forwards;
                }
                
                .modal-close {
                    position: absolute;
                    top: 1rem;
                    right: 1rem;
                    background: none;
                    border: none;
                    color: var(--text-white);
                    font-size: 2rem;
                    cursor: pointer;
                    z-index: 1;
                }
                
                .modal-product {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 2rem;
                    padding: 2rem;
                }
                
                .modal-image img {
                    width: 100%;
                    border-radius: var(--border-radius);
                }
                
                .modal-info h2 {
                    font-family: var(--font-heading);
                    color: var(--text-white);
                    margin-bottom: 1rem;
                }
                
                .modal-price {
                    font-size: 1.5rem;
                    color: var(--accent-neon);
                    font-weight: 700;
                    margin-bottom: 1rem;
                }
                
                .modal-description {
                    color: var(--text-gray);
                    margin-bottom: 2rem;
                    line-height: 1.6;
                }
                
                .modal-actions {
                    display: flex;
                    gap: 1rem;
                }
                
                .add-to-cart-btn, .wishlist-btn {
                    padding: 1rem 1.5rem;
                    border: none;
                    border-radius: var(--border-radius);
                    font-weight: 600;
                    cursor: pointer;
                    transition: var(--transition);
                }
                
                .add-to-cart-btn {
                    background: var(--accent-neon);
                    color: var(--primary-black);
                    flex: 1;
                }
                
                .wishlist-btn {
                    background: transparent;
                    color: var(--text-white);
                    border: 2px solid var(--text-white);
                }
                
                @keyframes fadeIn {
                    to { opacity: 1; }
                }
                
                @keyframes slideIn {
                    to { transform: translateY(0); }
                }
                
                @media (max-width: 768px) {
                    .modal-product {
                        grid-template-columns: 1fr;
                        gap: 1rem;
                        padding: 1rem;
                    }
                }
            </style>
        `;
        document.head.insertAdjacentHTML('beforeend', modalStyles);
    }
    
    // Add event listeners
    const modal = document.getElementById('quickViewModal');
    const closeBtn = modal.querySelector('.modal-close');
    const addToCartBtn = modal.querySelector('.add-to-cart-btn');
    
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    
    addToCartBtn.addEventListener('click', () => {
        addToCart(productId);
        closeModal();
    });
    
    function closeModal() {
        modal.style.opacity = '0';
        setTimeout(() => modal.remove(), 300);
    }
}

// Add to Cart Function
function addToCart(productId) {
    showNotification('Item added to cart!', 'success');
    // Update cart counter logic here
}

// Show Cart Function
function showCart() {
    showNotification('Cart functionality coming soon!', 'info');
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add notification styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: '2rem',
        right: '2rem',
        background: type === 'success' ? 'var(--accent-neon)' : 'var(--accent-orange)',
        color: 'var(--primary-black)',
        padding: '1rem 1.5rem',
        borderRadius: 'var(--border-radius)',
        fontWeight: '600',
        zIndex: '10001',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease'
    });
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after delay
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Initialize Animations
function initializeAnimations() {
    // Add CSS for scroll animations
    const animationStyles = `
        <style>
            .animate-in {
                animation: slideInUp 0.6s ease forwards;
            }
            
            @keyframes slideInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            .glitch-effect {
                animation: glitch 0.5s ease-in-out;
            }
            
            @keyframes glitch {
                0%, 100% { transform: translate(0); }
                20% { transform: translate(-2px, 2px); }
                40% { transform: translate(-2px, -2px); }
                60% { transform: translate(2px, 2px); }
                80% { transform: translate(2px, -2px); }
            }
        </style>
    `;
    
    if (!document.querySelector('#animation-styles')) {
        document.head.insertAdjacentHTML('beforeend', animationStyles);
    }
}

