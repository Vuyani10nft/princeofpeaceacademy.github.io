// JavaScript for fixed header and responsive navigation menu

// Track the last scroll position
let lastScrollTop = 0;
const header = document.querySelector('header');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

// Function to handle the header visibility
function handleHeader() {
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    if (currentScroll > lastScrollTop) {
        // Scrolling down
        header.classList.add('scrolled');
    } else {
        // Scrolling up
        header.classList.remove('scrolled');
    }

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // For mobile or negative scrolling
}

// Add scroll event listener to handle header visibility
window.addEventListener('scroll', handleHeader);

// Function to toggle the navigation menu
function toggleNavMenu() {
    navLinks.classList.toggle('active');
}

// Add click event listener to the navigation toggle button
navToggle.addEventListener('click', toggleNavMenu);

// Ensure the header is always visible on smaller screens
window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        // Reset styles if the screen is larger than 768px
        header.classList.remove('scrolled');
        navLinks.classList.remove('active');
    }
});
