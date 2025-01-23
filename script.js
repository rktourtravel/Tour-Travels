// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Function to Add 'Fade-In' Animation to Elements as They Come Into View
const fadeInElements = document.querySelectorAll('.hero-content, .destination-item, .service');

const isElementPartiallyInView = (el) => {
    const rect = el.getBoundingClientRect();
    return (
        rect.top < (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom > 0
    );
};

const handleScroll = () => {
    fadeInElements.forEach(element => {
        if (isElementPartiallyInView(element)) {
            element.classList.add('in-view');
        } else {
            element.classList.remove('in-view');
        }
    });
};

// Debounce Function to Limit Scroll Event Calls
const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), delay);
    };
};

// Scroll-to-Top Button Setup
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.textContent = '↑';
scrollToTopBtn.classList.add('scroll-to-top');
scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
document.body.appendChild(scrollToTopBtn);

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Toggle Scroll-to-Top Button Visibility
const toggleScrollToTopBtn = () => {
    if (window.scrollY > 300) {
        scrollToTopBtn.style.display = 'block';
    } else {
        scrollToTopBtn.style.display = 'none';
    }
};

// Event Listeners
window.addEventListener('scroll', debounce(() => {
    handleScroll();
    toggleScrollToTopBtn();
}, 50));

// Initial State on Page Load
document.addEventListener('DOMContentLoaded', () => {
    handleScroll();
    toggleScrollToTopBtn();
});
