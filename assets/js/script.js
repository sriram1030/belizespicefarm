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

        // Function to show a specific slide
        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.classList.toggle('active', i === index);
            });
            currentSlide = index;
        }

        // Function to go to the next slide
        function nextSlide() {
            const nextIndex = (currentSlide + 1) % slides.length;
            showSlide(nextIndex);
        }

        // Function to go to the previous slide
        function prevSlide() {
            const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(prevIndex);
        }

        // Function to start the automatic slide transition
        function startSlider() {
            clearInterval(slideInterval); // Clear existing interval to prevent speeding up
            slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
        }

        // Event listeners for arrow buttons
        nextButton.addEventListener('click', () => {
            nextSlide();
            startSlider(); // Restart timer on manual click
        });

        prevButton.addEventListener('click', () => {
            prevSlide();
            startSlider(); // Restart timer on manual click
        });
        
        // Optional: Pause slider on hover
        heroSlider.addEventListener('mouseenter', () => clearInterval(slideInterval));
        heroSlider.addEventListener('mouseleave', startSlider);

        // Initial setup
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

        // Create navigation dots dynamically
        dotsContainer.innerHTML = ''; // Clear any existing dots
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

        // Function to show a specific testimonial slide
        function showTestimonial(index) {
            testimonialSlides.forEach((slide, i) => {
                slide.classList.toggle('active', i === index);
            });
            testimonialDots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
            currentTestimonialSlide = index;
        }

        // Function to go to the next testimonial
        function nextTestimonial() {
            const nextIndex = (currentTestimonialSlide + 1) % testimonialSlides.length;
            showTestimonial(nextIndex);
        }

        // Function to start and restart the auto-play interval
        function startInterval() {
            testimonialInterval = setInterval(nextTestimonial, 7000); // Change testimonial every 7 seconds
        }

        function restartInterval() {
            clearInterval(testimonialInterval);
            startInterval();
        }

        // Initial setup
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
        // Mobile hamburger menu toggle
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('show');
        });
    }

    if (dropdownLink && dropdownMenu && navLinks) {
        // Mobile dropdown toggle for "Tours"
        dropdownLink.addEventListener('click', (event) => {
            // Only run this logic if the mobile menu is visible
            if (navLinks.classList.contains('show')) {
                event.preventDefault(); // Stop the link from trying to navigate
                
                // Toggle the visibility of the dropdown sub-menu
                const isDisplayed = dropdownMenu.style.display === 'block';
                dropdownMenu.style.display = isDisplayed ? 'none' : 'block';
            }
        });
    }
});