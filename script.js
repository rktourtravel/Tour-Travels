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

// Event Listeners for Scroll Events
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

// Selectors for Login Page Elements
const loginForm = document.querySelector(".login-box form");
const usernameInput = loginForm.querySelector('input[type="text"]');
const passwordInput = loginForm.querySelector('input[type="password"]');
const loginButton = loginForm.querySelector('button[type="submit"]');
const forgotPasswordLink = document.querySelector(".forgot-password");
const facebookLoginButton = document.querySelector(".facebook-login");

// Modal Elements
const modal = document.getElementById("loginModal");
const loginBtn = document.getElementById("loginBtn");
const closeBtn = document.querySelector(".close");

// Open Modal when Login Button is Clicked
loginBtn.onclick = function() {
    console.log('Login button clicked!');
    modal.style.display = "block";
    console.log('Modal display property:', modal.style.display);
}

// Close Modal when 'X' is Clicked
closeBtn.onclick = function() {
    console.log('Close button clicked!');
    modal.style.display = "none";
}

// Close Modal if Clicked Outside Modal Content
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Form Validation
loginForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent form from submitting

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if (!username || !password) {
        alert("Please enter both username and password.");
        return;
    }

    // Simulate login success
    alert(`Logged in as ${username}`);
    loginForm.reset(); // Clear form inputs
    toggleLoginButton(); // Update login button state
});

// Highlight Empty Fields on Blur
[usernameInput, passwordInput].forEach((input) => {
    input.addEventListener("blur", () => {
        if (!input.value.trim()) {
            input.style.border = "1px solid red";
        } else {
            input.style.border = "1px solid #dbdbdb";
        }
    });

    input.addEventListener("input", () => {
        input.style.border = "1px solid #dbdbdb"; // Reset border on typing
    });
});

// Forgot Password
forgotPasswordLink.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent default link behavior
    alert("Forgot Password feature is not implemented yet. Stay tuned!");
});

// Facebook Login
facebookLoginButton.addEventListener("click", () => {
    alert("Facebook login is currently unavailable.");
});

// Disable Login Button if Inputs are Empty
const toggleLoginButton = () => {
    if (usernameInput.value.trim() && passwordInput.value.trim()) {
        loginButton.disabled = false;
        loginButton.style.opacity = "1";
    } else {
        loginButton.disabled = true;
        loginButton.style.opacity = "0.5";
    }
};

// Attach Input Event Listeners
[usernameInput, passwordInput].forEach((input) => {
    input.addEventListener("input", toggleLoginButton);
});

// Initialize Login Button State
toggleLoginButton();
