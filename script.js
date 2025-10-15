document.addEventListener('DOMContentLoaded', function() {

    //======================================//
    //======= 1. HERO SLIDER LOGIC =========//
    //======================================//
    const slides = document.querySelectorAll('.slide');
    const prevButton = document.querySelector('.prev-slide');
    const nextButton = document.querySelector('.next-slide');
    const heroSlider = document.querySelector('.hero-slider');

    if (slides.length > 0 && prevButton && nextButton && heroSlider) {
        let currentSlide = 0;
        let slideInterval;

        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.classList.toggle('active', i === index);
            });
            currentSlide = index;
        }

        function nextSlide() {
            const nextIndex = (currentSlide + 1) % slides.length;
            showSlide(nextIndex);
        }

        function prevSlide() {
            const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(prevIndex);
        }

        function startSlider() {
            clearInterval(slideInterval);
            slideInterval = setInterval(nextSlide, 5000);
        }

        nextButton.addEventListener('click', () => {
            nextSlide();
            startSlider();
        });

        prevButton.addEventListener('click', () => {
            prevSlide();
            startSlider();
        });
        
        heroSlider.addEventListener('mouseenter', () => clearInterval(slideInterval));
        heroSlider.addEventListener('mouseleave', startSlider);

        showSlide(0);
        startSlider();
    }

    //==============================================//
    //======= 2. TESTIMONIAL SLIDER LOGIC ==========//
    //==============================================//
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const dotsContainer = document.querySelector('.testimonial-dots');

    if (testimonialSlides.length > 0 && dotsContainer) {
        let currentTestimonialSlide = 0;
        let testimonialInterval;

        dotsContainer.innerHTML = '';
        testimonialSlides.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.classList.add('testimonial-dot');
            dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
            dot.addEventListener('click', () => {
                showTestimonial(index);
                restartInterval();
            });
            dotsContainer.appendChild(dot);
        });

        const testimonialDots = document.querySelectorAll('.testimonial-dot');

        function showTestimonial(index) {
            testimonialSlides.forEach((slide, i) => {
                slide.classList.toggle('active', i === index);
            });
            testimonialDots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
            currentTestimonialSlide = index;
        }

        function nextTestimonial() {
            const nextIndex = (currentTestimonialSlide + 1) % testimonialSlides.length;
            showTestimonial(nextIndex);
        }

        function startInterval() {
            testimonialInterval = setInterval(nextTestimonial, 7000);
        }

        function restartInterval() {
            clearInterval(testimonialInterval);
            startInterval();
        }

        showTestimonial(0);
        startInterval();
    }

    //==============================================//
    //======= 3. MOBILE NAVIGATION LOGIC ===========//
    //==============================================//
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const dropdownLink = document.querySelector('.dropdown > a');
    const dropdownMenu = document.querySelector('.dropdown-menu');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('show');
        });
    }

    if (dropdownLink && dropdownMenu && navLinks) {
        dropdownLink.addEventListener('click', (event) => {
            if (navLinks.classList.contains('show')) {
                event.preventDefault();
                const isDisplayed = dropdownMenu.style.display === 'block';
                dropdownMenu.style.display = isDisplayed ? 'none' : 'block';
            }
        });
    }
});