// Smooth scroll for links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetElement = document.querySelector(this.getAttribute('href'));
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Function to adjust layout based on screen size
function checkScreenSize() {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const navLinks = document.querySelector(".navbar-menu");

    // Adjust layout styles based on screen width
    navLinks.style.flexDirection = isMobile ? "column" : "row";
}

// Call the function on page load and on window resize
window.addEventListener("load", checkScreenSize);
window.addEventListener("resize", checkScreenSize);


// Call animations on page load (AOS Init)
document.addEventListener("DOMContentLoaded", () => {
    AOS.init(); // Initialize AOS (animation on scroll)
});

if (window.innerWidth <= 768) {
    // Disable or adjust smooth scrolling on mobile for better performance
    document.documentElement.style.scrollBehavior = 'auto'; // Reset smooth scrolling if needed
} else {
    document.documentElement.style.scrollBehavior = 'smooth';
}

// Initialize AOS
AOS.init();

// Modal functionality
const modals = document.querySelectorAll('.modal');
const learnMoreBtns = document.querySelectorAll('.learn-more');
const closeModalBtns = document.querySelectorAll('.close-modal');

learnMoreBtns.forEach(button => {
    button.addEventListener('click', () => {
        const targetModal = document.getElementById(button.getAttribute('data-target'));
        targetModal.classList.add('is-active');
    });
});

closeModalBtns.forEach(button => {
    button.addEventListener('click', () => {
        button.closest('.modal').classList.remove('is-active');
    });
});

// Navigation toggle function
function toggleNav() {
    const nav = document.getElementById('nav-links');
    nav.classList.toggle('is-active');
}