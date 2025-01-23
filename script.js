// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetElement = document.querySelector(this.getAttribute('href'));
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
            });
        }
    });
});

// Add 'Fade-In' Animation to Elements as They Come Into View
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
scrollToTopBtn.style.display = 'none'; // Initially hidden
document.body.appendChild(scrollToTopBtn);

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
});

// Toggle Scroll-to-Top Button Visibility
const toggleScrollToTopBtn = () => {
    scrollToTopBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
};

// Event Listeners
window.addEventListener(
    'scroll',
    debounce(() => {
        handleScroll();
        toggleScrollToTopBtn();
    }, 50)
);

// Initial State on Page Load
document.addEventListener('DOMContentLoaded', () => {
    handleScroll();
    toggleScrollToTopBtn();
});

// Login Functionality
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('.login-form');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent form submission

            // Get input values
            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value.trim();

            // Validate inputs
            if (!username || !password) {
                alert('Please fill in both fields.');
                return;
            }

            // Simulate login process
            if (username === 'testuser' && password === '123456') {
                alert('Login successful! Welcome to Explore World.');
                // Redirect to the dashboard or another page
                window.location.href = '/dashboard'; // Change this URL as needed
            } else {
                alert('Invalid username or password. Please try again.');
            }
        });
    }
});
