// Track the last scroll position
let lastScrollTop = 0;
const header = document.querySelector('header');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const whatsappText = document.querySelector('.whatsapp-text'); // Select the "Our WhatsApp" text

// Function to handle the header visibility
function handleHeader() {
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    if (currentScroll > lastScrollTop) {
        // Scrolling down
        header.classList.add('scrolled');
        if (whatsappText) {
            whatsappText.style.transform = 'scale(0.9)'; // Slightly reduce the size when scrolling down
        }
    } else {
        // Scrolling up
        header.classList.remove('scrolled');
        if (whatsappText) {
            whatsappText.style.transform = 'scale(1)'; // Reset size when scrolling up
        }
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
        if (whatsappText) {
            whatsappText.style.transform = 'scale(1)'; // Reset size if resizing the window
        }
    }
});
