// Site scripts: navigation, forms, gallery lightbox, and theme switching
document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    // Brand Name Animation: reveals letters with a staggered effect
    const brandName = document.querySelector('.brand-name');
    if (brandName) {
        const text = brandName.textContent;
        brandName.textContent = '';
        
        const letters = text.split('');
        letters.forEach((letter, index) => {
            const span = document.createElement('span');
            span.textContent = letter;
            span.className = 'brand-letter';
            span.style.animationDelay = `${index * 0.1}s`;
            
            if (letter === ' ') {
                span.innerHTML = '&nbsp;';
            }
            
            brandName.appendChild(span);
        });
    }

    // Toggle Nav: open/close mobile navigation and animate links
    burger.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('nav-active');

        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        // Burger Animation
        burger.classList.toggle('toggle');
    });

    // Contact form: basic client-side handling (prevents page reload)
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your message. We will get back to you shortly.');
            contactForm.reset();
        });
    }

    // Gallery Lightbox: opens a modal with image and navigation
    const galleryItems = document.querySelectorAll('.gallery-item img');
    const lightbox = document.getElementById('lightbox');
    
    if (lightbox && galleryItems.length > 0) {
        const lightboxImg = document.getElementById('lightbox-img');
        const closeBtn = document.querySelector('.close-lightbox');
        const prevBtn = document.querySelector('.prev-slide');
        const nextBtn = document.querySelector('.next-slide');
        const caption = document.querySelector('.lightbox-caption');
        
        let currentIndex = 0;

        // Open lightbox with selected image
        const openLightbox = (index) => {
            currentIndex = index;
            const img = galleryItems[currentIndex];
            lightboxImg.src = img.src;
            caption.textContent = img.alt;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        };

        // Close lightbox and restore scroll
        const closeLightbox = () => {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto'; // Restore scrolling
        };

        // Navigate to previous/next image
        const changeSlide = (n) => {
            currentIndex += n;
            if (currentIndex >= galleryItems.length) {
                currentIndex = 0;
            } else if (currentIndex < 0) {
                currentIndex = galleryItems.length - 1;
            }
            openLightbox(currentIndex);
        };

        // Bind gallery items to open lightbox
        galleryItems.forEach((item, index) => {
            item.closest('.gallery-item').addEventListener('click', () => {
                openLightbox(index);
            });
        });

        // Lightbox controls
        closeBtn.addEventListener('click', closeLightbox);
        
        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent clicking on overlay from closing
            changeSlide(-1);
        });

        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            changeSlide(1);
        });

        // Close on outside click
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox || e.target.classList.contains('lightbox-content')) {
                closeLightbox();
            }
        });

        // Keyboard navigation when lightbox is open
        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('active')) return;
            
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') changeSlide(-1);
            if (e.key === 'ArrowRight') changeSlide(1);
        });
    }

    // Theme Switcher: persists user preference in localStorage
    const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);

        if (currentTheme === 'light') {
            toggleSwitch.checked = true;
        }
    }

    function switchTheme(e) {
        if (e.target.checked) {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        }    
    }

    if (toggleSwitch) {
        toggleSwitch.addEventListener('change', switchTheme, false);
    }
});
