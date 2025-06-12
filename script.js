// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuIcon = document.getElementById('menuIcon');
    const closeMenu = document.getElementById('closeMenu');
    const navLinks = document.getElementById('navLinks');
    const navLinksItems = document.querySelectorAll('.nav-link');
    const contactFormApiUrl = 'https://p7hjkeqa74.execute-api.eu-north-1.amazonaws.com/prod/contactform';
    
    // Show mobile menu
    menuIcon.addEventListener('click', function() {
        navLinks.classList.add('active');
    });
    
    // Close mobile menu
    closeMenu.addEventListener('click', function() {
        navLinks.classList.remove('active');
    });
    
    // Close menu when a nav link is clicked
    navLinksItems.forEach(item => {
        item.addEventListener('click', function() {
            navLinks.classList.remove('active');
        });
    });
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.padding = '10px 5%';
            navbar.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.padding = '20px 5%';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });
    
    // Active Navigation Link Highlight
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - sectionHeight/3)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinksItems.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
    
    // Gallery Slider
    const slides = document.querySelectorAll('.gallery-slide');
    const thumbnails = document.querySelectorAll('.thumbnail');
    const prevSlide = document.getElementById('prev-slide');
    const nextSlide = document.getElementById('next-slide');
    let currentSlide = 0;
    const slideCount = slides.length;
    
    // Function to show a specific slide
    function showSlide(n) {
        // Hide all slides
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Remove active class from all thumbnails
        thumbnails.forEach(thumb => {
            thumb.classList.remove('active');
        });
        
        // Show the current slide
        slides[n].classList.add('active');
        thumbnails[n].classList.add('active');
        currentSlide = n;
    }
    
    // Event for previous slide button
    prevSlide.addEventListener('click', function() {
        currentSlide--;
        if (currentSlide < 0) {
            currentSlide = slideCount - 1;
        }
        showSlide(currentSlide);
    });
    
    // Event for next slide button
    nextSlide.addEventListener('click', function() {
        currentSlide++;
        if (currentSlide >= slideCount) {
            currentSlide = 0;
        }
        showSlide(currentSlide);
    });
    
    // Add click event to thumbnails
    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', function() {
            const slideIndex = parseInt(this.getAttribute('data-index'));
            showSlide(slideIndex);
        });
    });
    
    // Automatic slideshow
    function autoSlide() {
        currentSlide++;
        if (currentSlide >= slideCount) {
            currentSlide = 0;
        }
        showSlide(currentSlide);
    }
    
    // Change slide every 5 seconds
    let slideInterval = setInterval(autoSlide, 5000);
    
    // Pause slideshow when hovering over the gallery
    const galleryContainer = document.querySelector('.gallery-container');
    
    galleryContainer.addEventListener('mouseenter', function() {
        clearInterval(slideInterval);
    });
    
    galleryContainer.addEventListener('mouseleave', function() {
        slideInterval = setInterval(autoSlide, 5000);
    });
    
    // Floor Plan Tabs
    const tabButtons = document.querySelectorAll('.tab-button');
    const planContents = document.querySelectorAll('.plan-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            tabButtons.forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get the plan id
            const plan = this.getAttribute('data-plan');
            
            // Hide all plan contents first
            planContents.forEach(content => {
                content.classList.remove('active');
                // Remove any inline styles that might be interfering
                content.style.display = 'none';
            });
            
            // Show the selected plan content
            const selectedPlan = document.getElementById(plan);
            selectedPlan.classList.add('active');
            // Ensure the content is visible
            selectedPlan.style.display = 'flex';
            
            // Trigger animation for the newly displayed plan
            setTimeout(() => {
                selectedPlan.style.opacity = '1';
                selectedPlan.style.transform = 'translateY(0)';
            }, 50);
        });
    });
    
    // Brochure Modal
const brochureModal = document.getElementById('brochureModal');
const brochureButton = document.querySelector('.cta-button');
const closeBrochureModal = document.getElementById('closeBrochureModal');
const brochureForm = document.getElementById('brochureForm');

// Price Modal
const priceModal = document.getElementById('priceModal');
const priceButtons = document.querySelectorAll('.download-button');
const closePriceModal = document.getElementById('closePriceModal');
const priceForm = document.getElementById('priceForm');

function openModal(modalElement) {
    modalElement.style.display = 'flex';
    document.body.classList.add('modal-open');
  }
  
  function closeModal(modalElement) {
    modalElement.style.display = 'none';
    document.body.classList.remove('modal-open');
  }

// Open Brochure Modal
brochureButton.addEventListener('click', function (event) {
    event.preventDefault();
    openModal(brochureModal);
  });

//   Close Brochure Modal
  
  closeBrochureModal.addEventListener('click', function () {
    closeModal(brochureModal);
  });

// Open Price Modal
priceButtons.forEach(button => {
    button.addEventListener('click', function (event) {
      event.preventDefault();
      openModal(priceModal);
    });
  });

//   Close Price Modal
  
  closePriceModal.addEventListener('click', function () {
    closeModal(priceModal);
  });

// Show the Price Modal immediately on page load
window.addEventListener('load', function () {
    openModal(priceModal);
  });
  
  setInterval(function () {
    openModal(priceModal);
  }, 300000);
// Handle Brochure Form Submission
brochureForm.addEventListener('submit', function(event) {
    handleFormSubmission(event, 'brochureForm');
});

// Handle Price Form Submission
priceForm.addEventListener('submit', function(event) {
    handleFormSubmission(event, 'priceForm');
});

// Function to handle form submission
function handleFormSubmission(event, formId) {
    event.preventDefault();
    const formData = new FormData(document.getElementById(formId));
    const formDataObj = {};

    // Convert FormData to object
    for (const [key, value] of formData.entries()) {
        formDataObj[key] = value;
    }
    // Set default message if empty
    formDataObj.message = formDataObj.message?.trim() || "I am interested in Krisala Codename Big Heart.";

    // Send data to server
    fetch(contactFormApiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataObj),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Form submitted successfully:', data);
        alert('Thank you for your submission! We will contact you shortly.');
        
        // Reset form and close modal 
        if (formId === 'brochureForm') {
            brochureForm.reset();
            brochureModal.style.display = 'none';
        } else if (formId === 'priceForm') {
            priceForm.reset();
            priceModal.style.display = 'none';
        } else if (formId === 'inquiry-form') {
            inquiryForm.reset();
        }
    })
    .catch(error => {
        console.error('Error submitting form:', error);
        alert('There was an error submitting your form. Please try again later.');
    });
}
    
    // Form Submission
    
    const inquiryForm = document.getElementById('inquiry-form');

   

    // Initialize forms event listeners
    // interestForm.addEventListener('submit', (e) => handleFormSubmission(e, 'interest-form'));
    inquiryForm.addEventListener('submit', (e) => handleFormSubmission(e, 'inquiry-form'));
    

    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animate elements on scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('.about-content, .amenity-item, .key-point, .plan-content.active');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Set initial state for animation
    const animatedElements = document.querySelectorAll('.about-content, .amenity-item, .key-point, .plan-content');
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.8s ease';
    });
    
    // Set initial display state for floor plans
    planContents.forEach((content, index) => {
        if (index === 0) {
            content.style.display = 'flex';
            setTimeout(() => {
                content.style.opacity = '1';
                content.style.transform = 'translateY(0)';
            }, 100);
        } else {
            content.style.display = 'none';
        }
    });
    
    function handleResponsiveDisplay() {
        const width = window.innerWidth;
        
        if (width > 768) { // Desktop view
            menuIcon.style.display = "none"; // Hide hamburger menu
            closeMenu.style.display = "none"; // Hide close button
            navLinks.classList.remove("active"); // Ensure menu is closed
        } else { // Mobile view
            menuIcon.style.display = "block"; // Show hamburger menu
            closeMenu.style.display = ""; // Let CSS handle this
        }
    }
    
    // Run function on page load and window resize
    handleResponsiveDisplay();
    window.addEventListener("resize", handleResponsiveDisplay);
    
    // Run animation function on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
});


// Privacy Policy Pop Up
document.addEventListener('DOMContentLoaded', function() {
    // Get the privacy policy popup element
    const privacyPolicyPopup = document.getElementById('privacyPolicyPopup');
    const openPrivacyPolicyBtn = document.getElementById('openPrivacyPolicy');
    const closePrivacyBtn = document.getElementById('closePrivacyBtn');
    
    // Function to open privacy policy popup
    function openPrivacyPolicy() {
        privacyPolicyPopup.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent scrolling of body when popup is open
    }
    
    // Function to close privacy policy popup
    function closePrivacyPolicy() {
        privacyPolicyPopup.style.display = 'none';
        document.body.style.overflow = ''; // Re-enable scrolling of body
    }
    
    // Event listeners
    if (openPrivacyPolicyBtn) {
        openPrivacyPolicyBtn.addEventListener('click', function(e) {
            e.preventDefault();
            openPrivacyPolicy();
        });
    }
    
    if (closePrivacyBtn) {
        closePrivacyBtn.addEventListener('click', closePrivacyPolicy);
    }
    
    // Close popup when clicking outside of content
    privacyPolicyPopup.addEventListener('click', function(e) {
        if (e.target === privacyPolicyPopup) {
            closePrivacyPolicy();
        }
    });
    
    // Close popup when ESC key is pressed
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && privacyPolicyPopup.style.display === 'block') {
            closePrivacyPolicy();
        }
    });
});