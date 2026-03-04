// Navigation functionality
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Get the section ID from data attribute
        const sectionId = this.getAttribute('data-section');
        
        // Hide all sections
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.remove('active');
        });
        
        // Show the selected section
        const selectedSection = document.getElementById(sectionId);
        if (selectedSection) {
            selectedSection.classList.add('active');
        }
        
        // Update active nav link
        document.querySelectorAll('.nav-link').forEach(navLink => {
            navLink.classList.remove('active');
        });
        this.classList.add('active');
        
        // Scroll to top smoothly
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

// Image expansion functionality
function expandImage(event) {
    const figure = event.currentTarget;
    const imgTag = figure.querySelector('img');
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');

    // use the actual image source directly
    if (imgTag && imgTag.src) {
        modalImage.src = imgTag.src;
        modal.classList.add('show');
    }
}

// Close image modal
function closeImageModal(event) {
    const modal = document.getElementById('imageModal');
    
    // Close if clicking on the modal background or the close button
    if (!event || event.target === modal || event.target.classList.contains('close')) {
        modal.classList.remove('show');
    }
}

// Close modal when clicking outside the image
document.addEventListener('click', function(event) {
    const modal = document.getElementById('imageModal');
    const modalContent = modal.querySelector('.modal-content');
    
    if (event.target === modal) {
        modal.classList.remove('show');
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const modal = document.getElementById('imageModal');
        modal.classList.remove('show');
    }
});

// Smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const element = document.querySelector(href);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// Add some interactivity to achievement cards
document.querySelectorAll('.achievement-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.backgroundColor = '#e8e8e8';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.backgroundColor = '#f5f5f5';
    });
});

// Initialize - show the first section by default
window.addEventListener('load', function() {
    // Make sure the overview section is shown
    const overviewLink = document.querySelector('[data-section="overview"]');
    if (overviewLink) {
        overviewLink.click();
    }
});

// Add animation on scroll for elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.achievement-card, .timeline-item, .text-image-container').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
});
